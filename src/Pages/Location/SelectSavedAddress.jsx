import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserAddresses, checkLocationDelivery } from '@/Redux/Slices/LocationSlice';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaPlus, FaMotorcycle } from 'react-icons/fa';

const SelectSavedAddress = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addresses, loadingAddresses } = useSelector((state) => state.location);
  const [initialLoad, setInitialLoad] = useState(true);
  const [currentAddress, setCurrentAddress] = useState(
    JSON.parse(localStorage.getItem('selectedAddress')) || null
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await dispatch(fetchUserAddresses());
        if (result?.error) {
          console.error('Failed to fetch addresses:', result.error);
        }
      } finally {
        setInitialLoad(false);
      }
    };
    loadData();
  }, [dispatch]);

  useEffect(() => {
    if (!initialLoad && !loadingAddresses && addresses.length === 0) {
      navigate('/select-address');
    }
  }, [addresses, loadingAddresses, navigate, initialLoad]);

  const handleDeliverHere = (address) => {
    localStorage.setItem('selectedAddress', JSON.stringify(address));
    setCurrentAddress(address);

    dispatch(checkLocationDelivery({
      lat: address.lat,
      lng: address.lng,
      placeName: address.placeName
    }));

     navigate('/');
  };

  if (loadingAddresses || initialLoad) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-orange-50 to-amber-100">
        <div className="flex flex-col items-center animate-pulse">
          <FaMotorcycle className="text-orange-500 text-4xl mb-4 animate-bounce" />
          <p className="text-orange-600 text-lg font-medium">Fetching your addresses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-orange-50 to-amber-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500 mb-10">
          Choose a Delivery Address
        </h2>

        {/* Selected Address Display */}
        {currentAddress && (
          <div className="mb-10 p-6 rounded-2xl shadow-xl bg-white border-4 border-orange-300 relative">
            <div className="absolute -top-3 -left-3 bg-orange-600 text-white p-2 rounded-full shadow-md">
              <FaMapMarkerAlt />
            </div>
            <p className="text-lg font-bold text-gray-800">
              {currentAddress.houseNumber}, {currentAddress.area}
            </p>
            {currentAddress.landmark && (
              <p className="text-sm text-gray-600">Near {currentAddress.landmark}</p>
            )}
            <p className="text-sm italic text-orange-500">{currentAddress.placeName}</p>
            <p className="mt-2 text-xs text-gray-500 font-semibold">
              <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-md">
                Currently Selected
              </span>
            </p>
          </div>
        )}

        {/* Address List */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {addresses.map((addr) => (
            <div
              key={addr._id}
              className="relative p-6 rounded-2xl shadow-lg bg-white border-2 border-orange-100 hover:shadow-orange-200 transition-all duration-200 hover:-translate-y-1"
            >
              <div className="absolute -top-3 -left-3 bg-orange-500 text-white p-2 rounded-full shadow-md">
                <FaMapMarkerAlt className="text-sm" />
              </div>
              <div>
                <p className="text-lg font-bold text-gray-800">{addr.houseNumber}, {addr.area}</p>
                {addr.landmark && <p className="text-sm text-gray-600 mt-1">Near {addr.landmark}</p>}
                <p className="text-sm text-orange-500 italic mt-1">{addr.placeName}</p>
                <button
                  className="mt-4 w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-2 px-6 rounded-full shadow transition-all duration-200 flex items-center justify-center group"
                  onClick={() => handleDeliverHere(addr)}
                >
                  <FaMotorcycle className="mr-2 group-hover:animate-bounce" />
                  Deliver Here
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Address Button */}
        <div className="text-center bg-white/80 rounded-xl p-6 border-2 border-orange-100 shadow-sm">
          <p className="text-gray-600 mb-4">Want to use a different address?</p>
          <button
            onClick={() => navigate('/select-address')}
            className="bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-bold py-3 px-8 rounded-full shadow-sm transition-all duration-200 flex items-center mx-auto group"
          >
            <FaPlus className="mr-2 group-hover:rotate-90 transition-transform" />
            Add New Address
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectSavedAddress;
