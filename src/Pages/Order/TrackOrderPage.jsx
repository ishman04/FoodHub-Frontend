import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import Layout from '@/Layouts/Layout';
import MapComponent from '@/Components/Map/MapComponent';
import { useSelector } from 'react-redux';
import { FaMotorcycle, FaSpinner } from 'react-icons/fa';
import { restaurantLat, restaurantLng } from '@/helpers/constants';

const TrackOrderPage = () => {
    const { orderId } = useParams();
    const { ordersData } = useSelector((state) => state.order);

    const currentOrder = ordersData?.find(o => o._id === orderId);
    
    // The driver starts at the restaurant
    const restaurantCoords = { latitude: restaurantLat, longitude: restaurantLng };
    const [driverLocation, setDriverLocation] = useState({ lat: restaurantLat, lng: restaurantLng });
    const [isJourneyEnded, setIsJourneyEnded] = useState(false);
    
    useEffect(() => {
        // Ensure we have an orderId before connecting
        if (!orderId) return;

        const socket = io(import.meta.env.VITE_BACKEND_URL, {
            withCredentials: true,
        });

        socket.on('connect', () => {
            console.log('[Frontend] Connected to WebSocket!');
            const roomName = `order_${orderId}`;
            socket.emit('joinOrderRoom', roomName);
        });

        socket.on('locationUpdate', (newLocation) => {
            console.log("[Frontend] Received 'locationUpdate':", newLocation);
            setDriverLocation(newLocation);
        });
        
        socket.on('journeyEnded', (data) => {
            console.log("[Frontend] Received 'journeyEnded':", data.message);
            setIsJourneyEnded(true);
        });

        // Cleanup on component unmount
        return () => {
            socket.disconnect();
        };
    }, [orderId]);

    const customerCoords = currentOrder?.address;

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 py-8 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center gap-3">
                            <FaMotorcycle /> Tracking Your Order
                        </h1>
                        <p className="text-gray-600 mt-2">Order ID: #{orderId.slice(-6).toUpperCase()}</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl p-4 border border-orange-100 h-[60vh]">
                         {driverLocation ? (
                            <MapComponent 
                                driverLocation={driverLocation}
                                restaurantCoords={restaurantCoords}
                                customerCoords={customerCoords}
                             />
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <FaSpinner className="animate-spin text-4xl text-orange-500" />
                                <p className="ml-4 text-gray-600">Waiting for driver location...</p>
                            </div>
                        )}
                    </div>

                    {isJourneyEnded && (
                         <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg text-center font-semibold">
                            Your order has arrived! Please be ready to collect it.
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default TrackOrderPage;