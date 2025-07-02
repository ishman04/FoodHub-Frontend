import axiosInstance from "@/helpers/axiosInstance";
import { placeOrder } from "@/Redux/Slices/OrderSlice";

import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const CheckoutForm = ({ amount, cartItems,addressId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate()

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!stripe || !elements) return;
  setProcessing(true);

  try {
    const response = await axiosInstance.post(
      "/payment/create-payment-intent",
      { 
        amount,
        cart: cartItems.map((item) => ({
          product: item.product._id,
          quantity: item.quantity
        })),
        addressId,
        paymentMethod: 'card'
      }
    );
    const clientSecret = response.data.data.clientSecret;

    // Get the CardElement from Stripe Elements
    const cardElement = elements.getElement(CardElement);

    // Add payment_method_data when confirming payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: 'Customer Name', // Add customer name if available
          email: 'customer@example.com' // Add customer email if available
        },
      },
    });

    if (result.error) {
      toast.error(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        toast.success("Payment successful!");
        localStorage.setItem('paymentSuccess',true)
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="border p-2 rounded" />
      <button
        type="submit"
        disabled={!stripe || processing}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {processing ? "Processing..." : "Pay " + amount}
      </button>
    </form>
  );
};

export default CheckoutForm;
