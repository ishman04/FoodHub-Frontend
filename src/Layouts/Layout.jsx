import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import PizzaLogo from "../assets/images/Pizza-logo.png";
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
      <nav className="flex items-center justify-between px-6 shadow-md bg-white text-gray-700">
        {/* Sidebar */}
        <div>
          <NavigationBar />
        </div>

        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <img src={PizzaLogo} width={120} height={120} alt="Pizza logo" />
          <p className="text-6xl poppins-bold text-orange-600">Pizza App</p>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-6 text-lg">
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
                    <FaMapMarkerAlt className="text-2xl text-orange-500" />
                  </button>

                  <button
                    title="Your Orders"
                    onClick={() => navigate("/orders")}
                    className="hover:text-orange-500 transition transform hover:scale-110"
                  >
                    <FaBoxOpen className="text-2xl text-orange-500" />
                  </button>

                  <Link
                    to={"/cart"}
                    className="flex items-center gap-2 hover:text-orange-500 transition"
                  >
                    <img src={cart} className="w-7 h-7" />
                    <span className="text-base font-medium text-gray-800">
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
                    <FaClipboardList className="text-2xl text-orange-500" />
                  </button>

                  <button
                    title="Add Product"
                    onClick={() => navigate("/admin/addProduct")}
                    className="hover:text-orange-500 transition transform hover:scale-110"
                  >
                    <FaPlus className="text-2xl text-orange-500" />
                  </button>
                </>
              )}

              {/* Logout Button */}
              <Link
                onClick={handleLogout}
                className="hover:text-orange-500 transition"
              >
                Logout
              </Link>
            </>
          )}

          {!isLoggedIn && (
            <Link
              to={"/auth/login"}
              className="hover:text-orange-500 transition"
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
