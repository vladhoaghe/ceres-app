import sys

import datacube
import matplotlib.pyplot as plt
import geopandas as gpd
import json

from geojson import Feature, Point, FeatureCollection

from datacube.utils import geometry

class PolygonAnalyzer():
    def __init__(self):
        self.dc = datacube.Datacube(app="Ceres")

    def analyze_polygon(self, time_range, geojson):
        products = ['s2_l2a']
        measurements = ['red', 'green', 'blue', 'nir']
        resolution = (-10, 10)
        output_crs = 'EPSG:31700'
        attribute_col = 'id'
        align = (15, 15)

        data = {"type":"FeatureCollection","bbox":[25.180203103766807,43.887032514375015,25.2635575504053,43.94211084342957],"features":[{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[25.212335595303852,43.900799158713454],[25.247268685500114,43.92194624393903],[25.263404854927312,43.90815820742224],[25.228557595419495,43.88694436383724],[25.212335595303852,43.900799158713454]]]},"properties":{"FID":"0"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[25.220146187952235,43.929488122694266],[25.242290505570516,43.942158798453306],[25.250530251660987,43.93548385212162],[25.228986748861814,43.92231717836812],[25.220146187952235,43.929488122694266]]]},"properties":{"FID":"1"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[25.180320748514795,43.925284570527225],[25.19190789145459,43.931898849459735],[25.205125817474737,43.92095707416847],[25.1934528438465,43.913785101445875],[25.180320748514795,43.925284570527225]]]},"properties":{"FID":"2"}}]}

        with open("/tmp/data.geojson", "w") as tmpfile:
            json.dump(data, tmpfile, ensure_ascii=False, indent=4)

        

        gdf = gpd.read_file("/tmp/data.geojson")
        # gdf = gpd.GeoDataFrame.from_features(data)

        gdf['id'] = range(0, len(gdf))

        return gdf





