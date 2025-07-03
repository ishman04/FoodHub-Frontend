import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FaCheckCircle, FaHome, FaShoppingBag } from "react-icons/fa";
import Layout from "../../Layouts/Layout";
import OrderSuccessImage from "../../assets/Images/ordered-success.png";

function OrderSuccess() {
    const navigate = useNavigate();
    
    useEffect(() => {
        localStorage.removeItem("paymentSuccess");
    }, []);

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 flex items-center justify-center py-12 px-4">
                <motion.div 
                    className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center border border-orange-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex justify-center mb-6">
                        <div className="bg-orange-100 p-4 rounded-full">
                            <FaCheckCircle className="text-5xl text-orange-500" />
                        </div>
                    </div>
                    
                    <motion.img
                        src={OrderSuccessImage}
                        alt="Order Success"
                        className="w-64 h-64 mx-auto mb-8"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    />
                    
                    <motion.h1 
                        className="text-3xl md:text-4xl font-extrabold text-transparent bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        Order Confirmed!
                    </motion.h1>
                    
                    <motion.p 
                        className="text-lg text-orange-700 mb-8 max-w-md mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        Your delicious order has been placed successfully and will be with you soon!
                    </motion.p>
                    
                    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                        <motion.button
                            onClick={() => navigate('/')}
                            className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl hover:from-orange-600 hover:to-amber-600 shadow-lg transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaHome className="mr-2" />
                            Go Back Home
                        </motion.button>
                        
                        <motion.button
                            onClick={() => navigate('/orders')}
                            className="flex items-center justify-center px-6 py-3 bg-white text-orange-600 border border-orange-300 rounded-xl hover:bg-orange-50 shadow-lg transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaShoppingBag className="mr-2" />
                            View My Orders
                        </motion.button>
                    </div>
                    
                    <motion.div 
                        className="mt-10 pt-6 border-t border-orange-100 text-sm text-orange-500 flex items-center justify-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        Your order is secure and being processed
                    </motion.div>
                </motion.div>
            </div>
        </Layout>
    );
}

export default OrderSuccess;