import React, { Component } from 'react';
import { 
    MapContainer, 
    Polygon, 
    Polyline, 
    TileLayer, 
    GeoJSON, 
    ZoomControl, 
    ImageOverlay } from "react-leaflet";
import * as parcelData from "./data/exemplu.json";
import L from "leaflet";
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';

class MyMap  extends Component {
    render() { 

        return (
        <MapContainer center={[43.90079915690249, 25.212335586547848
            ]} zoom={15} zoomControl={false}>
            <TileLayer
                attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                url="https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}@2x.jpg?key=MZ50Vh00lW3Wpy4qUbr7"
            />

            <ZoomControl position="topright"/> 

            <GeoJSON data={parcelData.features}/>

            {/* {parcelData.features.map(parcel => {
                var imageUrl = "";
                imageBounds = [parcel.geometry.coordinates];

                L.imageOverlay(imageUrl, imageBounds).addTo(map);
            }) */}

            
        </MapContainer>
        );
    }
}
 
export default MyMap;