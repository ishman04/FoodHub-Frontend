import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import PizzaLogo from "../assets/images/pizza-logo.png";
import Footer from "../Components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../Redux/Slices/AuthSlice";
import cart from "../Components/SVGs/undraw_empty_cart_co35.svg";
import NavigationBar from "@/Components/Navigation Bar/NavigationBar";
import {
  FaBoxOpen,
  FaMapMarkerAlt,
  FaPlus,
  FaClipboardList,
} from "react-icons/fa";

function Layout({ children }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { cartsData } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  async function handleLogout(e) {
    e.preventDefault();
    await dispatch(logout());
  }

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* NAVBAR */}
      <nav className="flex items-center px-4 sm:px-6 py-2 shadow-md bg-white text-gray-700">
        {/* Sidebar - left */}
        <div className="flex-1 flex justify-start">
          <NavigationBar />
        </div>

        {/* Logo - center */}
        <div
          onClick={() => navigate("/")}
          className="flex-1 flex items-center justify-center gap-3 cursor-pointer"
        >
          <img src={PizzaLogo} width={80} height={80} alt="Pizza logo" />
          <p className="text-3xl sm:text-4xl poppins-bold text-orange-600">
            Pizza App
          </p>
        </div>

        {/* Right Section - right */}
        <div className="flex-1 flex items-center justify-end gap-4 text-base sm:text-lg flex-wrap overflow-x-auto whitespace-nowrap">
          {isLoggedIn && (
            <>
              {/* For Users */}
              {role === "user" && (
                <>
                  <button
                    title="Your Addresses"
                    onClick={() => navigate("/user-addresses")}
                    className="hover:text-orange-500 transition transform hover:scale-110"
                  >
                    <FaMapMarkerAlt className="text-xl sm:text-2xl text-orange-500" />
                  </button>

                  <button
                    title="Your Orders"
                    onClick={() => navigate("/orders")}
                    className="hover:text-orange-500 transition transform hover:scale-110"
                  >
                    <FaBoxOpen className="text-xl sm:text-2xl text-orange-500" />
                  </button>

                  <Link
                    to={"/cart"}
                    className="flex items-center gap-2 hover:text-orange-500 transition relative"
                  >
                    <img src={cart} className="w-6 h-6 sm:w-7 sm:h-7" />
                    <span className="text-sm font-medium text-gray-800">
                      {cartsData?.items?.length || 0}
                    </span>
                  </Link>
                </>
              )}

              {/* For Admin */}
              {role === "admin" && (
                <>
                  <button
                    title="Pending Orders"
                    onClick={() => navigate("/admin/pending-orders")}
                    className="hover:text-orange-500 transition transform hover:scale-110"
                  >
                    <FaClipboardList className="text-xl sm:text-2xl text-orange-500" />
                  </button>

                  <button
                    title="Add Product"
                    onClick={() => navigate("/admin/addProduct")}
                    className="hover:text-orange-500 transition transform hover:scale-110"
                  >
                    <FaPlus className="text-xl sm:text-2xl text-orange-500" />
                  </button>
                </>
              )}

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="hover:text-orange-500 transition px-2 py-1 rounded hover:bg-orange-50 text-sm sm:text-base"
              >
                Logout
              </button>
            </>
          )}

          {!isLoggedIn && (
            <Link
              to={"/auth/login"}
              className="hover:text-orange-500 transition px-2 py-1 rounded hover:bg-orange-50 text-sm sm:text-base"
            >
              Login
            </Link>
          )}
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-1">{children}</main>

      {/* FOOTER */}
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}

export default Layout;
