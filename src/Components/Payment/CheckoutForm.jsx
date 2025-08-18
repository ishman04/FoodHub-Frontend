import { motion } from "framer-motion";
import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import axiosInstance from "@/helpers/axiosInstance";
import { placeOrder } from "@/Redux/Slices/OrderSlice";
import toast from "react-hot-toast";
import { FaLock, FaCreditCard } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';

const CheckoutForm = ({ amount, cartItems, addressId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [idempotencyKey] = useState(uuidv4());

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setProcessing(true);

    try {
      // ❌ The key is no longer generated here.
      const response = await axiosInstance.post(
        "/payment/create-payment-intent",
        {
          amount,
          cart: cartItems.map((item) => ({
            product: item.product._id,
            quantity: item.quantity
          })),
          addressId,
          paymentMethod: 'card',
          idempotencyKey // ✅ Using the key from state
        }
      );
      const clientSecret = response.data.data.clientSecret;
      const cardElement = elements.getElement(CardElement);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: 'Customer Name', // Recommended: Use actual customer name from state/props
            email: 'customer@example.com' // Recommended: Use actual customer email
          },
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          toast.success("Payment successful!");
          localStorage.setItem('paymentSuccess', true);
          navigate("/order/success");
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <label className="block text-orange-700 font-medium mb-2 text-sm md:text-base">
          Card Details
        </label>
        <div className="border border-orange-200 rounded-lg md:rounded-xl p-2 md:p-3 bg-orange-50">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '14px',
                  color: '#92400e',
                  '::placeholder': {
                    color: '#d97706',
                  },
                },
                invalid: {
                  color: '#dc2626',
                },
              },
            }}
          />
        </div>
      </motion.div>

      <motion.button
        type="submit"
        disabled={!stripe || processing}
        className={`w-full py-2 md:py-3 px-4 md:px-6 rounded-lg md:rounded-xl text-base md:text-lg font-semibold text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
          processing
            ? 'bg-amber-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600'
        }`}
        whileHover={!processing ? { scale: 1.02 } : {}}
        whileTap={!processing ? { scale: 0.98 } : {}}
      >
        {processing ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 md:h-5 md:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </>
        ) : (
          <>
            <FaCreditCard className="text-sm md:text-base" />
            Pay ₹{amount}
          </>
        )}
      </motion.button>

      <div className="flex items-center text-xs md:text-sm text-orange-600">
        <FaLock className="mr-1 md:mr-2 text-xs md:text-sm" />
        <span>Your transaction is secured with 256-bit encryption</span>
      </div>
    </form>
  );
};

export default CheckoutForm;