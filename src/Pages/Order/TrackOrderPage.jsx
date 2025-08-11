import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import Layout from '@/Layouts/Layout';
import MapComponent from '@/Components/Map/MapComponent';
import { useSelector } from 'react-redux';
import { FaMotorcycle, FaSpinner, FaExclamationCircle } from 'react-icons/fa';
import { restaurantLat, restaurantLng } from '@/helpers/constants';

const TrackOrderPage = () => {
    // 1. Get orderId from the URL parameters
    const { orderId } = useParams();
    
    // 2. Get order details from Redux store to find the customer's address
    const { ordersData } = useSelector((state) => state.order);
    const currentOrder = ordersData?.find(o => o._id === orderId);

    // 3. Set up state
    const restaurantCoords = { latitude: restaurantLat, longitude: restaurantLng };
    const [driverLocation, setDriverLocation] = useState(null); // Start as null to show a loading state
    const [isJourneyEnded, setIsJourneyEnded] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // --- KEY FIX: Defensive Programming ---
        // If there's no orderId, don't do anything.
        if (!orderId) {
            console.error("[TrackOrderPage] No orderId provided in the URL.");
            setError("No order ID found. Cannot track order.");
            return;
        }

        console.log(`[TrackOrderPage] Mounting for orderId: ${orderId}`);

        // Set the initial location so the map can render immediately
        setDriverLocation({ lat: restaurantCoords.latitude, lng: restaurantCoords.longitude });

        // --- Initialize Socket.IO connection ---
        const socket = io(import.meta.env.VITE_BACKEND_URL, {
            withCredentials: true,
        });

        // --- Define Event Handlers ---
        const onConnect = () => {
            console.log(`[Socket.IO] Frontend connected with ID: ${socket.id}`);
            const roomToJoin = `order_${orderId}`;
            console.log(`[Socket.IO] Emitting 'joinOrderRoom' to join room: '${roomToJoin}'`);
            socket.emit('joinOrderRoom', roomToJoin);
        };

        const onLocationUpdate = (newLocation) => {
            console.log("[Socket.IO] Received 'locationUpdate' event with data:", newLocation);
            setDriverLocation(newLocation);
        };

        const onJourneyEnded = (data) => {
            console.log("[Socket.IO] Received 'journeyEnded' event:", data.message);
            setIsJourneyEnded(true);
        };

        // --- Attach Event Handlers ---
        socket.on('connect', onConnect);
        socket.on('locationUpdate', onLocationUpdate);
        socket.on('journeyEnded', onJourneyEnded);

        // --- Cleanup Logic ---
        // This function will be called when the component is unmounted
        return () => {
            console.log("[TrackOrderPage] Unmounting. Disconnecting socket.");
            // Detach all listeners to prevent memory leaks
            socket.off('connect', onConnect);
            socket.off('locationUpdate', onLocationUpdate);
            socket.off('journeyEnded', onJourneyEnded);
            socket.disconnect();
        };

    }, [orderId]); // The useEffect hook correctly depends on orderId

    const customerCoords = currentOrder?.address;

    // --- RENDER LOGIC ---
    if (error) {
        return (
            <Layout>
                <div className="flex items-center justify-center h-[70vh] text-red-500">
                    <FaExclamationCircle className="mr-3 text-2xl" />
                    <span className="text-xl">{error}</span>
                </div>
            </Layout>
        );
    }
    
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
                                <p className="ml-4 text-gray-600">Initializing map and waiting for location...</p>
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