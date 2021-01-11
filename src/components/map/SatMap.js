import React, { Component } from "react";
import {
    MapContainer,
    Polygon,
    Polyline,
    TileLayer,
    GeoJSON,
    ZoomControl,
} from "react-leaflet";
import * as parcelData from "./data/RO008629885_2021.json";
// import Control from 'react-leaflet-control';

class MyMap extends Component {
    state = {};
    render() {
        return (
            <MapContainer
                center={[43.825, 25.19]}
                zoom={15}
                zoomControl={false}
            >
                <TileLayer
                    attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                    url="https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}@2x.jpg?key=MZ50Vh00lW3Wpy4qUbr7"
                />
                <ZoomControl position="topright" />

                <GeoJSON data={parcelData.features} />

                {/* {parcelData.features.map(parcel => {
                <Polygon key={parcel.properties.FARM_ID}
                            pathOptions={{color: 'red'}}
                            positions={parcel.geometry.coordinates}
                            />

            })} */}
            </MapContainer>
        );
    }
}

export default MyMap;
