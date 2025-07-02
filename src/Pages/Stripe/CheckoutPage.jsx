import CheckoutForm from "@/Components/Payment/CheckoutForm";
import { getCartDetails } from "@/Redux/Slices/CartSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const CheckoutPage = () => {
  const cart = useSelector((state) => state.cart.cartsData);
   const address = JSON.parse(localStorage.getItem("selectedAddress"))
  const dispatch  = useDispatch();
  useEffect(() => {
    dispatch(getCartDetails());
  },[])


  return (
    <div className="p-4 max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Complete your payment</h2>
      <CheckoutForm 
        amount={cart.totalPrice} 
        cartItems= {cart.items}
        addressId = {address._id}
      />
    </div>
  );
};

export default CheckoutPage