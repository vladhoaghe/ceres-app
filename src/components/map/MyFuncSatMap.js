import React, { useRef, useEffect } from "react";
import { Map, GeoJSON } from "react-leaflet";
import { CRS } from "leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import * as parcelData from "./data/exemplu.json";

export default () => {
    const mapRef = React.useRef(null);

    React.useEffect(() => {
        mapRef.current = L.map('map', {
        center: [43.90079915690249, 25.212335586547848],
        zoomControl: false,
        layers: [
            L.tileLayer('https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}@2x.jpg?key=MZ50Vh00lW3Wpy4qUbr7', {
            attribution:
                '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
            }),
        ]
        });
        console.log()

    }, []);

    const zoomControl = React.useRef(null);
    React.useEffect(() => {
        zoomControl.current = L.control.zoom({
            position:'topright'
       }).addTo(mapRef.current);
    }, []);

    const geoJsonLayer = React.useRef(null);
    React.useEffect(() => {
        geoJsonLayer.current = L.geoJSON(parcelData.features).addTo(mapRef.current);
    }, []);

    const dataLayer = React.useRef(null);
    React.useEffect(() => {
        parcelData.features.forEach(parcel => {
            var dataLink = parcel.data[0].link;
            var bounds = parcel.geometry.coordinates;
            var reversedBounds = parcel.geometry.coordinates[0].map(coordinate => {
                return coordinate.reverse();
            })

            dataLayer.current = L.imageOverlay(dataLink, reversedBounds).addTo(mapRef.current);

            mapRef.current.fitBounds(bounds);
        })
    }, [dataLayer]);

    

    return <div id="map"></div>
};
