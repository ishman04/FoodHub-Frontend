import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCartDetails, removeProductFromCart } from "../../Redux/Slices/CartSlice";
import Layout from "../../Layouts/Layout";
import { Link } from "react-router-dom";

// useState and Re-renders:
// useState triggers a re-render of the entire component when the state value changes.
// When you call a state updater function (like setCount or setName), React schedules a re-render of the component to reflect the new state.
// However, when the component re-renders, React doesn't re-execute the entire component function from scratch. Instead, React will:

// Re-render the component.
// Preserve the component's state and variables between renders (React internally optimizes this with its virtual DOM).
// Execute any useEffect hooks based on dependency changes.
// 2. useEffect and Re-renders:
// useEffect does not trigger a re-render. It simply runs the code inside it after the component has been rendered or after specific dependencies have changed.
// useEffect allows you to perform side effects, such as data fetching or updating the DOM, but it does not re-render the component. It runs after React updates the DOM following a state change.
// Key Differences:
// State Change (useState):
// When you call setState, React re-renders the component because it needs to reflect the updated state.

// Effect (useEffect):
// When a dependency of useEffect changes, the effect runs again. But it does not trigger a full re-render of the component. Instead, React updates the DOM based on state/prop changes, and the effect runs to handle the side effects.
function CartDetails() {
  const [cartDetails, setCartDetails] = useState(null);
  const dispatch = useDispatch();

  // Fetch cart details
  useEffect(() => {
    const fetchCartDetails = async () => {
      const details = await dispatch(getCartDetails());
      setCartDetails(details?.payload?.data || {});
    };
    fetchCartDetails();
  }, [dispatch]);

  // Handle product removal
  async function handleRemove(productId) {
    const response = await dispatch(removeProductFromCart(productId));
    if (response?.payload?.data) {
      const updatedDetails = await dispatch(getCartDetails());
      setCartDetails(updatedDetails?.payload?.data || {});
    }
  }
//calculated after each re render of component
  const cartItems = cartDetails?.items || [];
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item?.quantity * item?.product?.price,
    0
  );

  return (
    <Layout>
      <section className="py-8 md:py-16 antialiased">
        <div className="max-w-screen-xl px-4 mx-auto">
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">Cart Details</h2>

          {cartItems.length > 0 ? (
            <div className="mt-6 lg:flex lg:items-start lg:gap-6">
              {/* Cart Items */}
              <div className="lg:w-2/3 space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="p-4 bg-gradient-to-r from-amber-50 to-orange-300 rounded-lg shadow-sm border"
                  >
                    <div className="md:flex md:items-center md:gap-6">
                      <img
                        className="w-20 h-20 rounded-md"
                        src={item?.product?.productImage}
                        alt={item?.product?.name || "Product"}
                      />
                      <div className="flex-1">
                        <Link
                          to={`/product/${item?._id}`}
                          className="text-base font-medium text-gray-900 hover:underline"
                        >
                          {item?.product?.name}
                        </Link>
                        <p className="text-sm">{item?.product?.description}</p>
                        <p className="text-sm font-semibold">
                          ₹{item?.product?.price} x {item?.quantity}
                        </p>
                        <button
                          onClick={() => handleRemove(item?.product?._id)}
                          className="text-red-600 hover:underline text-sm font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:w-1/3 p-6 bg-gradient-to-r from-amber-50 to-orange-300 rounded-lg shadow-sm border">
                <h3 className="text-xl font-semibold">Order Summary</h3>
                <div className="space-y-4 mt-4">
                  {cartItems.map((item) => (
                    <div key={item.product._id} className="flex justify-between">
                      <p>
                        {item?.product?.name} x {item?.quantity}
                      </p>
                      <p>₹{item?.quantity * item?.product?.price}</p>
                    </div>
                  ))}
                  <div className="border-t pt-4 flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{totalPrice}</span>
                  </div>
                </div>

                <Link
                  to="/order"
                  className="block text-center bg-yellow-400 text-white rounded-md mt-6 py-2 hover:bg-yellow-500"
                >
                  Proceed to Checkout
                </Link>
                <Link
                  to="/"
                  className="block text-center text-sm font-medium text-primary-700 mt-4 underline"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          ) : (
            <p className="mt-6 text-center text-gray-700">Your cart is empty.</p>
          )}
        </div>
      </section>
    </Layout>
  );
}

export default CartDetails;

