// CheckoutPage.jsx
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCreditCard, FaLock, FaShoppingBag } from "react-icons/fa";
import CheckoutForm from "@/Components/Payment/CheckoutForm";
import { getCartDetails } from "@/Redux/Slices/CartSlice";

const CheckoutPage = () => {
  const cart = useSelector((state) => state.cart.cartsData);
  const address = JSON.parse(localStorage.getItem("selectedAddress"));
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getCartDetails());
  }, []);

  // Calculate total amount
  const totalAmount = cart?.items?.reduce(
    (acc, item) => acc + item?.quantity * item?.product?.price,
    0
  ) || 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 py-12 px-4">
      <motion.div
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h2 
            className="text-4xl font-extrabold text-transparent bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Secure Payment
          </motion.h2>
          <p className="text-orange-700">
            Complete your order with our safe and easy payment process
          </p>
        </div>

        {/* Order Summary Card */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-orange-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center mb-4">
            <div className="bg-orange-100 p-3 rounded-full mr-4">
              <FaShoppingBag className="text-orange-500 text-xl" />
            </div>
            <h3 className="text-xl font-bold text-orange-700">Order Summary</h3>
          </div>
          
          <div className="bg-orange-50 rounded-xl p-4 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-orange-700">Total Items:</span>
              <span className="font-medium text-orange-800">{cart?.items?.length || 0}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-orange-700">Total Amount:</span>
              <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text">
                ₹ {totalAmount}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Payment Form */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center mb-6">
            <div className="bg-orange-100 p-3 rounded-full mr-4">
              <FaCreditCard className="text-orange-500 text-xl" />
            </div>
            <h3 className="text-xl font-bold text-orange-700">Payment Details</h3>
          </div>
          
          <CheckoutForm 
            amount={totalAmount} 
            cartItems={cart?.items || []}
            addressId={address?._id}
          />
          
          <div className="mt-6 flex items-center justify-center text-orange-600 text-sm">
            <FaLock className="mr-2" />
            <span>Your payment is securely encrypted</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CheckoutPage;