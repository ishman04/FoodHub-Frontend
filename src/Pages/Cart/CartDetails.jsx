import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCartDetails, removeProductFromCart } from "../../Redux/Slices/CartSlice";
import Layout from "../../Layouts/Layout";
import { Link } from "react-router-dom";
import { FaTrash, FaShoppingBag, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';

function CartDetails() {
  const [cartDetails, setCartDetails] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCartDetails = async () => {
      const details = await dispatch(getCartDetails());
      setCartDetails(details?.payload?.data || {});
    };
    fetchCartDetails();
  }, [dispatch]);

  async function handleRemove(productId) {
    const response = await dispatch(removeProductFromCart(productId));
    if (response?.payload?.data) {
      const updatedDetails = await dispatch(getCartDetails());
      setCartDetails(updatedDetails?.payload?.data || {});
    }
  }

  const cartItems = cartDetails?.items || [];
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item?.quantity * item?.product?.price,
    0
  );

  return (
    <Layout>
      <section className="py-8 md:py-16 bg-gradient-to-b from-amber-50 to-orange-50 min-h-screen">
        <div className="max-w-screen-xl px-4 mx-auto">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500 mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Your Pizza Cart
          </motion.h2>
          <p className="text-orange-600 mb-8">Review your delicious selections</p>

          {cartItems.length > 0 ? (
            <motion.div 
              className="mt-6 lg:flex lg:items-start lg:gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Cart Items */}
              <div className="lg:w-2/3 space-y-6">
                {cartItems.map((item) => (
                  <motion.div
                    key={item._id}
                    className="p-6 bg-white rounded-xl shadow-md border border-orange-100 hover:shadow-lg transition-shadow"
                    whileHover={{ y: -5 }}
                  >
                    <div className="md:flex md:items-center md:gap-6">
                      <img
                        className="w-24 h-24 rounded-lg object-cover border-2 border-orange-200"
                        src={item?.product?.productImage}
                        alt={item?.product?.name || "Product"}
                      />
                      <div className="flex-1 mt-4 md:mt-0">
                        <Link
                          to={`/product/${item?._id}`}
                          className="text-lg font-bold text-orange-700 hover:underline"
                        >
                          {item?.product?.name}
                        </Link>
                        <p className="text-orange-600 text-sm mt-1">{item?.product?.description}</p>
                        <div className="flex items-center justify-between mt-3">
                          <p className="text-orange-800 font-semibold">
                            ₹{item?.product?.price} × {item?.quantity}
                          </p>
                          <motion.button
                            onClick={() => handleRemove(item?.product?._id)}
                            className="text-red-500 hover:text-red-600 flex items-center text-sm font-medium"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <FaTrash className="mr-1" /> Remove
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:w-1/3 mt-6 lg:mt-0">
                <div className="p-6 bg-white rounded-xl shadow-md border border-orange-100">
                  <h3 className="text-xl font-bold text-orange-700 flex items-center">
                    <FaShoppingBag className="mr-2 text-orange-500" />
                    Order Summary
                  </h3>
                  <div className="space-y-4 mt-4">
                    {cartItems.map((item) => (
                      <div key={item.product._id} className="flex justify-between items-center">
                        <p className="text-orange-800">
                          {item?.product?.name} × {item?.quantity}
                        </p>
                        <p className="font-medium text-orange-700">₹{item?.quantity * item?.product?.price}</p>
                      </div>
                    ))}
                    <div className="border-t border-orange-200 pt-4 flex justify-between font-bold text-lg">
                      <span className="text-orange-800">Total</span>
                      <span className="text-orange-600">₹{totalPrice}</span>
                    </div>
                  </div>

                  <motion.div
                    className="mt-6 space-y-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Link
                      to="/order"
                      className="block w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl py-3 px-4 text-center font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center"
                    >
                      Proceed to Checkout <FaArrowRight className="ml-2" />
                    </Link>
                    <Link
                      to="/"
                      className="block w-full text-center text-orange-600 hover:text-orange-700 font-medium mt-2 flex items-center justify-center"
                    >
                      <FaArrowLeft className="mr-2" /> Continue Shopping
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              className="mt-12 bg-white p-8 rounded-xl shadow-md border border-orange-100 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <h3 className="text-xl font-bold text-orange-700 mb-2">Your cart is empty</h3>
              <p className="text-orange-600 mb-4">Add some delicious pizzas to get started!</p>
              <Link
                to="/menu"
                className="inline-block bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl py-2 px-6 font-medium shadow-md hover:shadow-lg transition-all"
              >
                Browse Menu
              </Link>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
}

export default CartDetails;