import { checkLocationDelivery, createAddress } from '@/Redux/Slices/LocationSlice';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

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
    navigate('/user-addresses')
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
    <div className="min-h-screen py-12 bg-gradient-to-b from-orange-50 to-amber-50">
      <div className="w-full max-w-2xl mx-auto p-8 rounded-2xl bg-white shadow-xl border border-orange-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-transparent bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text">
            Where should we deliver your pizza?
          </h2>
          <p className="mt-2 text-orange-600">Enter your address to check delivery availability</p>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Start typing your address..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-5 py-4 text-lg rounded-xl border-2 border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent shadow-sm placeholder-orange-300 text-orange-700"
          />
          <svg
            className="absolute right-3 top-4 h-6 w-6 text-orange-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {results.length > 0 && (
          <ul className="mt-4 bg-white rounded-xl shadow-lg divide-y divide-orange-100 overflow-hidden max-h-80 overflow-y-auto border border-orange-200">
            {results.map((place) => (
              <li
                key={place.place_id}
                onClick={() => handleSelect(place)}
                className="px-5 py-4 text-orange-800 hover:bg-orange-50 cursor-pointer transition-colors duration-200 flex items-start"
              >
                <svg className="h-5 w-5 text-orange-400 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{place.display_name}</span>
              </li>
            ))}
          </ul>
        )}

        {location && (
          <div className="mt-8 bg-gradient-to-br from-white to-amber-50 p-6 rounded-2xl shadow-lg border border-orange-200">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text">
                Almost there!
              </h3>
              <p className="text-orange-500 mt-1">Add some details to complete your address</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-orange-700 font-semibold mb-2 text-lg">House No. / Flat No.</label>
                <input
                  type="text"
                  placeholder="e.g. 123, Green Avenue"
                  value={formData.houseNumber}
                  onChange={(e) => setFormData({ ...formData, houseNumber: e.target.value })}
                  className="w-full px-5 py-3 text-orange-800 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:outline-none shadow-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-orange-700 font-semibold mb-2 text-lg">Landmark</label>
                <input
                  type="text"
                  placeholder="e.g. Near Domino's, Behind Park"
                  value={formData.landmark}
                  onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                  className="w-full px-5 py-3 text-orange-800 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:outline-none shadow-sm"
                />
              </div>

              <div>
                <label className="block text-orange-700 font-semibold mb-2 text-lg">Area / Locality</label>
                <input
                  type="text"
                  placeholder="e.g. Sector 15"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full px-5 py-3 text-orange-800 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:outline-none shadow-sm"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-lg"
                >
                  Save Address & Continue
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationSearch;