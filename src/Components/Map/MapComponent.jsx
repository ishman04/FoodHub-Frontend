import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

// Custom Icons
const driverIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3448/3448628.png', // A scooter icon
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
});

const restaurantIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/2928/2928828.png', // A pizza store icon
    iconSize: [35, 35],
    iconAnchor: [17, 35],
    popupAnchor: [0, -35],
});

// Component to auto-center the map view
function UpdateMapView({ center }) {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.setView(center, map.getZoom());
        }
    }, [center, map]);
    return null;
}


const MapComponent = ({ driverLocation, restaurantCoords, customerCoords }) => {
    return (
        <MapContainer center={[driverLocation.lat, driverLocation.lng]} zoom={15} style={{ height: '100%', width: '100%', borderRadius: '1rem' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {/* Driver Marker */}
            <Marker position={[driverLocation.lat, driverLocation.lng]} icon={driverIcon}>
                <Popup>Your driver is here!</Popup>
            </Marker>
            
            {/* Restaurant Marker */}
            {restaurantCoords && (
                 <Marker position={[restaurantCoords.latitude, restaurantCoords.longitude]} icon={restaurantIcon}>
                    <Popup>Restaurant</Popup>
                </Marker>
            )}

            {/* Customer Address Marker */}
            {customerCoords && (
                 <Marker position={[customerCoords.lat, customerCoords.lng]}>
                    <Popup>Your Location</Popup>
                </Marker>
            )}

            <UpdateMapView center={[driverLocation.lat, driverLocation.lng]} />
        </MapContainer>
    );
};

export default MapComponent;