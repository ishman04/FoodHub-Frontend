import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaClock, FaMapMarkerAlt, FaShoppingBasket, FaRupeeSign, FaRoute } from "react-icons/fa";
import { fetchAllOrders } from "@/Redux/Slices/OrderSlice";
import Layout from "@/Layouts/Layout";
import { Link } from "react-router-dom";

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.ordersData);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, []);

  if (!orders) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 pt-20">
        <div className="text-center text-orange-600 text-xl font-medium">
          Loading your delicious orders...
        </div>
      </div>
    );
  }

  const pendingOrders = orders.filter((o) => o.status === "out_for_delivery" || o.status === "ordered" || o.status === "preparing");
  const otherOrders = orders.filter((o) => o.status ==="delivered");

  const renderOrder = (order, isHighlighted = false) => (
    <div
      key={order._id}
      className={`p-6 rounded-2xl shadow-lg mb-5 transition-all duration-200 hover:shadow-xl ${
        isHighlighted 
          ? "bg-gradient-to-r from-amber-50 to-orange-100 border-l-4 border-orange-500" 
          : "bg-white"
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-xl text-orange-800 flex items-center">
            <FaShoppingBasket className="mr-2 text-orange-500" />
            Order #{order._id.slice(-6).toUpperCase()}
          </h3>
          
          <div className="mt-3 flex items-center">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              order.status === "pending" || order.status === "ordered"
                ? "bg-orange-100 text-orange-700"
                : order.status === "delivered"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-700"
            }`}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-lg font-bold text-orange-600 flex items-center justify-end">
            <FaRupeeSign className="mr-1" />
            {order.totalPrice}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <div className="bg-orange-50 rounded-lg p-3">
          <h4 className="font-medium text-orange-700 flex items-center mb-1">
            <FaShoppingBasket className="mr-2 text-orange-500" />
            Your Pizza Feast:
          </h4>
          <ul className="list-disc list-inside text-sm text-orange-800 pl-4">
            {order.items.map((item, index) => (
              <li key={index}>
                {item.quantity}x {item.product.name}
              </li>
            ))}
          </ul>
        </div>

        {order.address && (
          <div className="mt-3 flex items-start">
            <FaMapMarkerAlt className="text-orange-400 mt-1 mr-2 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-700">{order.address.houseNumber}</p>
              <p className="text-sm text-gray-600">{order.address.area}</p>
              {order.address.landmark && (
                <p className="text-xs text-gray-500 italic">Near {order.address.landmark}</p>
              )}
            </div>
          </div>
        )}
      </div>
      {order.status === 'out_for_delivery' && (
        <div className="mt-4 pt-4 border-t border-orange-100">
            <Link to={`/track/${order._id}`}>
                 <button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2">
                    <FaRoute />
                    Track Your Order Live
                </button>
            </Link>
        </div>
      )}
    </div>
  );

  return (
    <Layout>

    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500 mb-3">
            <FaClock className="inline mr-3 text-amber-500" />
            Your Pizza Journey
          </h1>
          <p className="text-orange-600">Track all your delicious orders in one place</p>
        </div>

        {pendingOrders.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500 mb-5 flex items-center">
              <FaClock className="mr-2 text-amber-500" />
              Current Orders
            </h2>
            {pendingOrders.map((order) => renderOrder(order, true))}
          </div>
        )}

        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-700 mb-5">Order History</h2>
          {otherOrders.length > 0 ? (
            otherOrders.map((order) => renderOrder(order))
          ) : (
            <div className="bg-white rounded-2xl p-8 text-center shadow-md">
              <div className="text-orange-400 text-5xl mb-4">🍕</div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">No past orders yet</h3>
              <p className="text-gray-500">Your delicious pizza adventures will appear here!</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Orders;