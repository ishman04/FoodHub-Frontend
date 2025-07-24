import { checkLocationDelivery, createAddress } from '@/Redux/Slices/LocationSlice';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { FaMapMarkerAlt, FaSearch, FaHome, FaMapMarkedAlt, FaSave } from 'react-icons/fa';
import pizzaDelivery from '../../assets/images/pizza-delivery.jpg';
import { motion, AnimatePresence } from 'framer-motion';

let debounceTimer;

const LocationSearch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [location, setLocation] = useState(null);
  const [formData, setFormData] = useState({
    houseNumber: '',
    landmark: '',
    area: ''
  });

  async function handleSelect(place) {
    const lat = parseFloat(place.lat);
    const lng = parseFloat(place.lon);
    const placeName = place.display_name;

    const response = await dispatch(checkLocationDelivery({ lat, lng, placeName }));

    if (response.payload?.canDeliver) {
      setLocation({ lat, lng, placeName });
      setQuery(place.display_name);
      setResults([]);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location) return;

    const addressDetails = {
      ...location,
      ...formData
    };

    await dispatch(createAddress(addressDetails));
    navigate('/user-addresses');
  };

  const searchLocation = async (value) => {
    if (value.length < 3) return setResults([]);

    const res = await axios.get(`https://nominatim.openstreetmap.org/search`, {
      params: {
        q: value,
        format: 'json',
        addressdetails: 1,
        limit: 5,
        viewbox: '76.6500,30.7800,76.9000,30.6100',
        bounded: 1,
        'accept-language': 'en'
      },
    });

    setResults(res.data);
  };

  useEffect(() => {
    if (query.length < 3) {
      setResults([]);
      return;
    }

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      searchLocation(query);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 py-8 sm:py-12">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto px-4 sm:px-6">
        {/* Left Side - Illustration (Desktop only) */}
        <motion.div 
          className="hidden lg:flex flex-1 items-center justify-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-3xl p-6 w-full h-full flex flex-col items-center justify-center">
            <motion.img 
              src={pizzaDelivery} 
              alt="Pizza Delivery" 
              className="w-full max-w-xs rounded-2xl shadow-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.7, type: 'spring' }}
            />
            <motion.div
              className="text-center mt-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-orange-700">
                Fast Delivery to Your Doorstep
              </h3>
              <p className="text-orange-600 mt-2">
                We'll bring the pizza party to you!
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side - Form */}
        <div className="flex-1 flex items-center justify-center lg:pl-8">
          <motion.div
            className="w-full bg-white/90 backdrop-blur rounded-3xl shadow-lg border border-orange-100 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="p-6 sm:p-8">
              <motion.div 
                className="flex flex-col items-center mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center justify-center bg-orange-100 p-3 rounded-full mb-4">
                  <FaMapMarkerAlt className="text-orange-500 text-2xl" />
                </div>
                <h2 className="text-3xl font-extrabold text-transparent bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-center">
                  Delivery Address
                </h2>
                <p className="text-orange-600 mt-2 text-center">
                  Where should we deliver your delicious pizza?
                </p>
              </motion.div>

              <motion.div
                className="relative mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaSearch className="text-orange-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search for your address..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-base rounded-xl border-2 border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent shadow-sm placeholder-orange-300 text-orange-700"
                />
              </motion.div>

              <AnimatePresence>
                {results.length > 0 && (
                  <motion.div
                    className="mt-4"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ul className="bg-white rounded-xl shadow-md divide-y divide-orange-100 overflow-hidden max-h-80 overflow-y-auto border border-orange-200">
                      {results.map((place) => (
                        <motion.li
                          key={place.place_id}
                          onClick={() => handleSelect(place)}
                          className="px-4 py-3 text-orange-800 hover:bg-orange-50 cursor-pointer transition-colors duration-200 flex items-start"
                          whileHover={{ scale: 1.01 }}
                        >
                          <div className="flex items-start">
                            <div className="bg-orange-100 p-2 rounded-full mr-3">
                              <FaMapMarkedAlt className="text-orange-500" />
                            </div>
                            <div>
                              <p className="font-medium">{place.display_name.split(',')[0]}</p>
                              <p className="text-sm text-orange-600">{place.display_name.split(',').slice(1).join(',')}</p>
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {location && (
                  <motion.div
                    className="mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.div 
                      className="flex flex-col items-center mb-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-center">
                        Complete Your Address
                      </h3>
                      <p className="text-orange-500 mt-2 text-center">
                        Add details for perfect pizza delivery
                      </p>
                    </motion.div>

                    <motion.form 
                      className="space-y-4"
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {['houseNumber', 'landmark', 'area'].map((field, index) => (
                        <motion.div
                          key={field}
                          className="flex flex-col"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                        >
                          <label className="flex items-center text-orange-700 font-medium mb-2">
                            {field === 'houseNumber' && <FaHome className="mr-2 text-orange-500" />}
                            {field === 'landmark' && <FaMapMarkerAlt className="mr-2 text-orange-500" />}
                            {field === 'area' && <FaMapMarkedAlt className="mr-2 text-orange-500" />}
                            {field === 'houseNumber' ? 'House No. / Flat No.' : 
                             field === 'landmark' ? 'Landmark' : 'Area / Locality'}
                          </label>
                          <input
                            type="text"
                            placeholder={
                              field === 'houseNumber' ? "e.g. 123, Green Avenue" :
                              field === 'landmark' ? "e.g. Near Domino's, Behind Park" :
                              "e.g. Sector 15"
                            }
                            value={formData[field]}
                            onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                            className="w-full px-4 py-3 text-orange-800 border-2 border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
                            required={field !== 'landmark'}
                          />
                        </motion.div>
                      ))}

                      <motion.div
                        className="pt-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                      >
                        <button
                          type="submit"
                          className="w-full flex items-center justify-center bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <FaSave className="mr-2" />
                          Save Address & Continue to Menu
                        </button>
                      </motion.div>
                    </motion.form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LocationSearch;
