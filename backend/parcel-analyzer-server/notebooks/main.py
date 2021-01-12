from kafka import KafkaConsumer
import json

import os
import sys
import geopandas as gpd
import xarray as xr
import numpy as np
from PIL import Image
from matplotlib import cm
import requests

import datacube
from datacube.utils import geometry

from satsearch import Search
import boto3
from botocore.exceptions import ClientError


from server.stac_api_to_dc import stac_api_to_odc
from server.deafrica_datahandling import load_ard
from server.deafrica_bandindices import calculate_indices
from server.deafrica_spatialtools import xr_rasterize
from server.deafrica_plotting import rgb, map_shapefile

dc = datacube.Datacube(app='Parcel-Analyzer')

consumer = KafkaConsumer(
    'parcels', 
    group_id='parcels-group', 
    bootstrap_servers=['kafka:9092']
)

def consume_loop(consumer):
    for msg in consumer:
        msg_process(msg)

def index_data(bbox):
    start_date  = '2020-05-01'
    end_date    = '2021-01-06'
    
    print(bbox)

    collections = ['sentinel-s2-l2a-cogs']
    
    config = {
        'collections': collections,
        'bbox': bbox,
        'datetime': f"{start_date}/{end_date}"
    }

    STAC_API_URL = 'https://explorer.sandbox.dea.ga.gov.au/stac/'
    os.environ['STAC_API_URL'] = STAC_API_URL

    srch = Search().search(**config)
    found_items = srch.found()
    print(f"Found {found_items} items that can be indexed")

    dc = datacube.Datacube()

    indexed, failed = stac_api_to_odc(dc, 's2_l2a', None, False, False, config)
    print(f"Indexed {indexed} out of {found_items} with {failed} failures.")

def get_bbox(coord_list):
    lon_min, lon_max = 181, -181
    lat_min, lat_max = 91, -91
    
    for point in coord_list:
        (lon, lat) = point
        lon_min = min(lon_min, lon)
        lon_max = max(lon_max, lon)
        
        lat_min = min(lat_min, lat)
        lat_max = max(lat_max, lat)
        
    return [lon_min, lat_max, lon_max, lat_min]


def upload_file(file_name, bucket, object_name=None):
    """Upload a file to an S3 bucket

    :param file_name: File to upload
    :param bucket: Bucket to upload to
    :param object_name: S3 object name. If not specified then file_name is used
    :return: True if file was uploaded, else False
    """

    # If S3 object_name was not specified, use file_name
    if object_name is None:
        object_name = file_name

    # Upload the file
    s3_client = boto3.client(
        's3', 
        aws_access_key_id='AKIA6IGHWHJBX3DSQEWP',
        aws_secret_access_key='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'
    )
    try:
        response = s3_client.upload_file(file_name, bucket, object_name)
        print(response)
    except ClientError as e:
        logging.error(e)
        return False
    return True


def analyze_parcel(_id, uid, coords, bbox):
    print("Starting analysis for: " + _id)

    time_range=('2020-08-17', '2020-08-31')
    products = ['s2_l2a']
    measurements = ['red', 'green', 'blue', 'nir']
    resolution = [-10, 10]
    output_crs = 'EPSG:31700'
    attribute_col = 'id'

    data = {
        "type": "FeatureCollection",
        "bbox": bbox,
        "features": [{
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": [coords]
            }
        }]
    }

    filename = "/tmp/" + _id + ".geojson" 
    with open(filename, "w") as tmpfile:
        json.dump(data, tmpfile, ensure_ascii=False, indent=4)

    gdf = gpd.read_file(filename)
    gdf['id'] = range(0, len(gdf))

    query = {
        'time': time_range,
        'measurements': measurements,
        'resolution': resolution,
        'output_crs': output_crs
    }

    # Dictionary to save results
    results = {}

    # Progress indicator
    i = 0
    
    # Loop through polygons in geodataframe and extract satellite data
    for index, row in gdf.iterrows():
        print(" Feature {:02}/{:02}\r".format(i + 1, len(gdf)),
                    end='')
        
        # Get the geometry
        geom = geometry.Geometry(row.geometry.__geo_interface__,
                                geometry.CRS(f'EPSG:{gdf.crs.to_epsg()}'))
        
        # Update dc query with geometry      
        query.update({'geopolygon': geom}) 
        
        # Load landsat (hide print statements)
        ds = load_ard(dc=dc, 
                        products=products,
                        group_by='solar_day',
                        **query)

        # Generate a polygon mask to keep only data within the polygon:
        mask = xr_rasterize(gdf.iloc[[index]], ds)
        
        # Mask dataset to set pixels outside the polygon to `NaN`
        ds = ds.where(mask)
        
        # Append results to a dictionary using the attribute
        # column as an key
        results.update({str(row[attribute_col]) : ds})
        
        # Update counter
        i += 1

    polygon_result = results['0']

    ndvi = calculate_indices(results['0'], index='NDVI', collection='c1')
    ndwi = calculate_indices(results['0'], index='NDWI', collection='c1')
    savi = calculate_indices(results['0'], index='SAVI', collection='c1')

    ndvi_result = ndvi.NDVI.values
    ndwi_result = ndwi.NDWI.values
    savi_result = savi.SAVI.values

    t, h, w = ndvi_result.shape
    for timestep in range(0, t):
        ndvi_img = Image.fromarray(np.uint8(cm.get_cmap("YlGn")(ndvi_result[timestep]) * 255))
        
        filename = _id + timestep.__str__() + ".ndvi.png"
        ndvi_img.save(filename)
        bucket = 'ceres-analyzed-data'

        upload_file(filename, bucket)

        link = 'https://ceres-analyzed-data.s3.eu-central-1.amazonaws.com/' + filename
        date = '2020-08-15'

        payload = {
            "date": date,
            "link": link
        }

        url = 'http://parcel-manager-server:8080/parcels/' + uid.__str__() + '/' + _id.__str__()

        requests.patch(url, json=payload)
    
 
def msg_process(msg):
    data = json.loads(msg.value)
    
    geometry = data['geometry']
    coordinates = geometry['coordinates']

    for coord in coordinates:
        bbox = get_bbox(coord)
        
        index_data(bbox)

        analyze_parcel(data['_id'], data['uid'], coord, bbox)
    

def main():
    consume_loop(consumer=consumer)

if __name__ == "__main__":
    main()
