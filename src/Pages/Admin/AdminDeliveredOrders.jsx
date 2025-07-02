import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDeliveredOrders } from '@/Redux/Slices/OrderSlice';
import { FaCheckCircle, FaSpinner, FaClock, FaUtensils, FaMotorcycle, FaBoxOpen, FaUser, FaPhone, FaReceipt } from 'react-icons/fa';
import { GiFullPizza, GiSodaCan } from 'react-icons/gi';
import { IoFastFoodOutline } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/Layouts/Layout';

const AdminDeliveredOrders = () => {
  const dispatch = useDispatch();
  const { adminOrders, loading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchDeliveredOrders());
  }, [dispatch]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return <FaCheckCircle className="text-green-500" />;
      case 'ordered': return <FaClock className="text-orange-500" />;
      case 'preparing': return <FaUtensils className="text-amber-500" />;
      case 'out_for_delivery': return <FaMotorcycle className="text-yellow-500" />;
      default: return <FaClock className="text-orange-500" />;
    }
  };

  const getItemIcon = (category) => {
    switch (category) {
      case 'veg': return <GiFullPizza className="text-orange-500 mr-2" />;
      case 'non-veg': return <IoFastFoodOutline className="text-red-500 mr-2" />;
      case 'drinks': return <GiSodaCan className="text-blue-500 mr-2" />;
      default: return <IoFastFoodOutline className="text-gray-500 mr-2" />;
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 to-amber-50">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <FaSpinner className="text-5xl text-orange-500" />
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between mb-8"
          >
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
              <FaCheckCircle className="inline mr-3" />
              Delivered Orders
            </h1>
            <motion.button 
              onClick={() => dispatch(fetchDeliveredOrders())}
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Refresh Orders
            </motion.button>
          </motion.div>

          <AnimatePresence>
            {adminOrders.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-2xl p-8 text-center shadow-xl border border-orange-100"
              >
                <FaBoxOpen className="mx-auto text-5xl text-orange-400 mb-4" />
                <h3 className="text-2xl font-medium text-gray-700">No deliveries yet!</h3>
                <p className="text-gray-500 mt-2">All completed orders will appear here</p>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid gap-6"
              >
                {adminOrders.map((order) => (
                  <motion.div
                    key={order._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-100 hover:shadow-2xl transition-shadow duration-300"
                  >
                    <div className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                        <div>
                          <h3 className="text-xl font-bold text-orange-700 flex items-center">
                            <FaReceipt className="mr-2 text-orange-500" />
                            Order #{order._id.slice(-6).toUpperCase()}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Delivered on {new Date(order.updatedAt).toLocaleString()}
                          </p>
                        </div>
                        <div className="mt-3 sm:mt-0">
                          <span className="px-4 py-2 rounded-full text-sm font-semibold flex items-center bg-green-100 text-green-800">
                            <FaCheckCircle className="mr-2" />
                            Delivered
                          </span>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-orange-50 rounded-xl p-4">
                          <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                            <FaUser className="mr-2 text-orange-500" />
                            Customer Details
                          </h4>
                          <p className="text-gray-800 font-medium">{order?.user?.firstName || 'Guest Customer'}</p>
                          {order?.user?.mobileNumber && (
                            <p className="text-sm text-gray-600 mt-1 flex items-center">
                              <FaPhone className="mr-2 text-orange-400" />
                              {order.user.mobileNumber}
                            </p>
                          )}
                          {order?.address && (
                            <p className="text-sm text-gray-600 mt-1">
                              {order.address.houseNumber}, {order.address.area}
                            </p>
                          )}
                        </div>

                        <div className="bg-amber-50 rounded-xl p-4">
                          <h4 className="font-medium text-gray-700 mb-3">Order Summary</h4>
                          <ul className="space-y-3">
                            {order.items.map((item, index) => (
                              <li key={index} className="flex justify-between items-center">
                                <span className="text-gray-800 flex items-center">
                                  {getItemIcon(item.product.category)}
                                  {item.product.name}
                                </span>
                                <span className="flex items-center">
                                  <span className="text-orange-600 font-medium mr-2">
                                    ₹{item.product.price} × {item.quantity}
                                  </span>
                                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-bold">
                                    ₹{item.product.price * item.quantity}
                                  </span>
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-orange-100">
                        <div className="mb-4 sm:mb-0">
                          <h4 className="text-lg font-bold text-gray-700">Total Amount</h4>
                          <p className="text-2xl font-extrabold text-orange-600">₹{order.totalPrice}</p>
                        </div>
                        <div className="text-sm text-gray-500">
                          Ordered on {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDeliveredOrders;