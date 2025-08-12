import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import AnimatedMarker from './AnimatedMarker';

// --- KEY FIX: DEFINE ICONS OUTSIDE THE COMPONENT ---
// This makes them stable singletons, immune to re-renders and Strict Mode cycles.

// 1. Fix the default icon path issue with Leaflet and bundlers like Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

// 2. Define our custom icons as stable constants
const driverIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3448/3448628.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
});

const restaurantIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/2928/2928828.png',
    iconSize: [35, 35],
    iconAnchor: [17, 35],
    popupAnchor: [0, -35],
});
// --- END OF ICON DEFINITIONS ---


// Helper component to auto-fit the map (no changes needed)
function UpdateMapView({ routePolyline }) {
    const map = useMap();
    useEffect(() => {
        if (routePolyline?.length > 0) {
            const bounds = L.latLngBounds(routePolyline);
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [routePolyline, map]);
    return null;
}

// The MapComponent itself now just uses the stable icon constants.
const MapComponent = ({ driverLocation, restaurantCoords, customerCoords, routePolyline }) => {
    return (
        <MapContainer center={[driverLocation.lat, driverLocation.lng]} zoom={15} style={{ height: '100%', width: '100%', borderRadius: '1rem' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            <AnimatedMarker 
                position={{ lat: driverLocation.lat, lng: driverLocation.lng }} 
                icon={driverIcon} // Use the stable icon
            />
            
            {routePolyline?.length > 0 && (
                <Polyline positions={routePolyline} color="#3b82f6" weight={5} />
            )}
            
            {restaurantCoords && (
                 <Marker position={[restaurantCoords.latitude, restaurantCoords.longitude]} icon={restaurantIcon}>
                    <Popup>Restaurant</Popup>
                </Marker>
            )}

            {customerCoords && (
                 <Marker position={[customerCoords.lat, customerCoords.lng]}>
                    <Popup>Your Location</Popup>
                </Marker>
            )}

            <UpdateMapView routePolyline={routePolyline} />
        </MapContainer>
    );
};

export default MapComponent;