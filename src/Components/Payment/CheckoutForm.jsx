// CheckoutForm.jsx
import { motion } from "framer-motion";
import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import axiosInstance from "@/helpers/axiosInstance";
import { placeOrder } from "@/Redux/Slices/OrderSlice";
import toast from "react-hot-toast";
import { FaLock, FaCreditCard } from "react-icons/fa";
import {v4 as uuidv4} from 'uuid'

const CheckoutForm = ({ amount, cartItems, addressId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setProcessing(true);

    try {
      const idempotencyKey = uuidv4()
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
          idempotencyKey
        }
      );
      const clientSecret = response.data.data.clientSecret;
      const cardElement = elements.getElement(CardElement);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: 'Customer Name',
            email: 'customer@example.com'
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
      toast.error("Payment failed");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <label className="block text-orange-700 font-medium mb-2">
          Card Details
        </label>
        <div className="border border-orange-200 rounded-xl p-3 bg-orange-50">
          <CardElement 
            options={{
              style: {
                base: {
                  fontSize: '16px',
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
        className={`w-full py-3 px-6 rounded-xl text-lg font-semibold text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
          processing 
            ? 'bg-amber-400' 
            : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600'
        }`}
        whileHover={!processing ? { scale: 1.02 } : {}}
        whileTap={!processing ? { scale: 0.98 } : {}}
      >
        {processing ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </>
        ) : (
          <>
            <FaCreditCard />
            Pay ₹{amount}
          </>
        )}
      </motion.button>

      <div className="flex items-center text-sm text-orange-600">
        <FaLock className="mr-2" />
        <span>Your transaction is secured with 256-bit encryption</span>
      </div>
    </form>
  );
};

export default CheckoutForm;