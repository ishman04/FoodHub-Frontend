import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  FaCashRegister,
  FaCreditCard,
  FaMapMarkerAlt,
  FaShoppingBag,
} from "react-icons/fa";

import Layout from "../../Layouts/Layout";
import { placeOrder } from "../../Redux/Slices/OrderSlice";

function Order() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartsData } = useSelector((state) => state.cart);

  const [details, setDetails] = useState({
    paymentMethod: "cash",
    address: JSON.parse(localStorage.getItem("selectedAddress")) || null,
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    if (!details.paymentMethod || !details.address) {
      toast.error("Please fill all the fields");
      return;
    }
    if (details.paymentMethod == "cash") {
      const response = await dispatch(placeOrder(details));
      if (response?.payload?.data) {
        toast.success("Order placed successfully");
        navigate("/order/success");
      } else {
        toast.error(response?.payload?.message || "Failed to place order");
      }
    }
    if (details.paymentMethod == "card") {
      navigate("/checkout");
    }
  }

  // Calculate total price
  const totalPrice =
    cartsData?.items?.reduce(
      (acc, item) => acc + item?.quantity * item?.product?.price,
      0
    ) || 0;

  return (
    <Layout>
      <div className="bg-gradient-to-b from-amber-50 to-orange-100 min-h-screen">
        <section className="container mx-auto px-4 py-16">
          {/* Header Section */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text mb-4">
              Almost There!
            </h1>
            <p className="text-lg text-orange-700 max-w-2xl mx-auto">
              Just one more step to enjoy your delicious meal
            </p>
          </motion.div>

          {/* Order Summary Card */}
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-6 mb-8 max-w-4xl mx-auto border border-orange-100"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-orange-100 p-3 rounded-full mr-4">
                <FaShoppingBag className="text-orange-500 text-xl" />
              </div>
              <h2 className="text-2xl font-bold text-orange-700">
                Order Summary
              </h2>
            </div>

            <div className="bg-orange-50 rounded-xl p-4 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-orange-700 font-medium">
                  Total Items:
                </span>
                <span className="text-orange-800 font-bold">
                  {cartsData?.items?.length || 0}
                </span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-orange-700 font-medium">
                  Total Price:
                </span>
                <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text">
                  ₹ {totalPrice}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Address and Payment Section */}
          <motion.form
            onSubmit={handleFormSubmit}
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Address Section */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-orange-100">
              <div className="flex items-center mb-4">
                <div className="bg-orange-100 p-3 rounded-full mr-4">
                  <FaMapMarkerAlt className="text-orange-500 text-xl" />
                </div>
                <h2 className="text-2xl font-bold text-orange-700">
                  Delivery Address
                </h2>
              </div>

              {details.address ? (
                <motion.div
                  className="bg-orange-50 rounded-xl p-4 border border-orange-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="bg-orange-100 p-3 rounded-full self-start">
                      <FaMapMarkerAlt className="text-orange-500 text-lg" />
                    </div>

                    <div className="flex-1">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <h3 className="text-sm font-semibold text-orange-600">
                            Delivery to
                          </h3>
                          <p className="text-lg font-bold text-orange-800">
                            {details.address.houseNumber},{" "}
                            {details.address.area}
                          </p>
                        </div>

                        <div>
                          <h3 className="text-sm font-semibold text-orange-600">
                            Landmark
                          </h3>
                          <p className="text-orange-700">
                            {details.address.landmark || "Not specified"}
                          </p>
                        </div>

                        <div className="md:col-span-2">
                          <h3 className="text-sm font-semibold text-orange-600">
                            Full Address
                          </h3>
                          <p className="text-orange-700">
                            {details.address.placeName}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex gap-3">
                        <motion.button
                          type="button"
                          onClick={() => navigate("/user-addresses")}
                          className="px-4 py-2 text-sm bg-white text-orange-600 border border-orange-300 rounded-lg hover:bg-orange-50 transition-colors"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          Change Address
                        </motion.button>

                        <motion.button
                          type="button"
                          onClick={() => {
                            // Open map with the coordinates
                            window.open(
                              `https://www.google.com/maps?q=${details.address.lat},${details.address.lng}`,
                              "_blank"
                            );
                          }}
                          className="px-4 py-2 text-sm bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors flex items-center gap-2"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <FaMapMarkerAlt className="text-orange-500" />
                          View on Map
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-orange-600 mb-4">No address selected</p>
                  <motion.button
                    type="button"
                    onClick={() => navigate("/address")}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Add Delivery Address
                  </motion.button>
                </div>
              )}
            </div>

            {/* Payment Method Section */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-orange-100">
              <div className="flex items-center mb-6">
                <div className="bg-orange-100 p-3 rounded-full mr-4">
                  {details.paymentMethod === "cash" ? (
                    <FaCashRegister className="text-orange-500 text-xl" />
                  ) : (
                    <FaCreditCard className="text-orange-500 text-xl" />
                  )}
                </div>
                <h2 className="text-2xl font-bold text-orange-700">
                  Payment Method
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    details.paymentMethod === "cash"
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 hover:border-orange-300"
                  }`}
                  onClick={() =>
                    setDetails({ ...details, paymentMethod: "cash" })
                  }
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center">
                    <div
                      className={`p-2 rounded-full mr-3 ${
                        details.paymentMethod === "cash"
                          ? "bg-orange-500 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <FaCashRegister />
                    </div>
                    <div>
                      <h3 className="font-bold text-orange-700">
                        Cash on Delivery
                      </h3>
                      <p className="text-sm text-orange-600">
                        Pay when you receive your order
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    details.paymentMethod === "card"
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 hover:border-orange-300"
                  }`}
                  onClick={() =>
                    setDetails({ ...details, paymentMethod: "card" })
                  }
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center">
                    <div
                      className={`p-2 rounded-full mr-3 ${
                        details.paymentMethod === "card"
                          ? "bg-orange-500 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <FaCreditCard />
                    </div>
                    <div>
                      <h3 className="font-bold text-orange-700">
                        Credit/Debit Card
                      </h3>
                      <p className="text-sm text-orange-600">
                        Secure online payment
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Submit Button */}
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                type="submit"
                disabled={!details.address}
                className={`w-full max-w-md py-4 px-6 rounded-xl text-lg font-semibold text-white shadow-lg transition-all ${
                  details.address
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {details.paymentMethod === "cash" ? (
                  <span>Place Order Now</span>
                ) : (
                  <span>Proceed to Payment</span>
                )}
              </button>
            </motion.div>
          </motion.form>
        </section>
      </div>
    </Layout>
  );
}

export default Order;
