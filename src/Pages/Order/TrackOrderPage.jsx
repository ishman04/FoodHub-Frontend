import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import Layout from '@/Layouts/Layout';
import MapComponent from '@/Components/Map/MapComponent';
import { useSelector } from 'react-redux';
import { FaMotorcycle, FaSpinner, FaClock, FaRoute } from 'react-icons/fa';
import { restaurantLat, restaurantLng } from '@/helpers/constants';

const TrackOrderPage = () => {
    const { orderId } = useParams();
    const { ordersData } = useSelector((state) => state.order);
    const currentOrder = ordersData?.find(o => o._id === orderId);

    const restaurantCoords = { latitude: restaurantLat, longitude: restaurantLng };

    // Initialize state with a valid, non-null location to prevent crashes
    const [driverLocation, setDriverLocation] = useState({ 
        lat: restaurantCoords.latitude, 
        lng: restaurantCoords.longitude 
    });
    
    const [route, setRoute] = useState([]);
    const [eta, setEta] = useState(0);
    const [distance, setDistance] = useState(0);
    const [trackingStatus, setTrackingStatus] = useState('Connecting...');

    useEffect(() => {
    if (!orderId) return;

    // Set initial state to prevent crashes
    setDriverLocation({ lat: restaurantCoords.latitude, lng: restaurantCoords.longitude });

    const socket = io(import.meta.env.VITE_BACKEND_URL, { withCredentials: true });

    socket.on('connect', () => {
        setTrackingStatus('Waiting for driver route...');
        socket.emit('joinOrderRoom', `order_${orderId}`);
    });

    // --- KEY CHANGE: ADD A LOG HERE ---
    socket.on('trackingStarted', (data) => {
        // This log is the most important for debugging this feature.
        console.log("[Frontend] Received 'trackingStarted' event with data:", data);
        
        if (data?.route) {
            setRoute(data.route);
            setEta(data.duration);
            setDistance(data.distance);
            setTrackingStatus('Out for Delivery');
            if (data.route.length > 0) {
                setDriverLocation({ lat: data.route[0][0], lng: data.route[0][1] });
            }
        }
    });

    socket.on('locationUpdate', (newLocation) => {
        setDriverLocation(newLocation);
    });
    
    socket.on('journeyEnded', () => { setTrackingStatus('Delivered'); });
    socket.on('tracking_error', (error) => { setTrackingStatus(error.message); });

    return () => { socket.disconnect(); };
}, [orderId]);

    // Helper functions for formatting
    const formatEta = (seconds) => { /* ... */ };
    const formatDistance = (meters) => { /* ... */ };

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 py-8 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header and Info Panel... */}
                    <div className="bg-white rounded-2xl shadow-xl p-2 border border-orange-100 h-[60vh]">
                        {driverLocation ? (
                            <MapComponent 
                                driverLocation={driverLocation}
                                restaurantCoords={restaurantCoords}
                                customerCoords={currentOrder?.address}
                                routePolyline={route}
                             />
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <FaSpinner className="animate-spin text-4xl text-orange-500" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default TrackOrderPage;