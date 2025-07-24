import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Menu from "../../assets/images/menu.svg";
import { BiHome } from "react-icons/bi";
import { GiFullPizza } from "react-icons/gi";
import { FaUserFriends, FaPlusCircle, FaClipboardList, FaHistory, FaTruck } from "react-icons/fa";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useSelector } from "react-redux";

const NavigationBar = () => {
  const [role, setRole] = useState(null);
  const storedRole = useSelector((state) => state.auth.role)

  useEffect(() => {
    setRole(storedRole);
  }, []);

  return (
    <div className="p-2 md:p-4">
      <Sheet>
        <SheetTrigger className="text-orange-600">
          <img 
            src={Menu} 
            height={32} 
            width={32} 
            className="h-8 w-8 md:h-10 md:w-10" 
            alt="menu" 
          />
        </SheetTrigger>

        <SheetContent
          side="left"
          className="w-[280px] sm:w-80 bg-gradient-to-b from-orange-50 via-amber-100 to-orange-200 shadow-lg"
        >
          <SheetHeader>
            <SheetTitle className="text-2xl sm:text-3xl font-bold text-orange-600">
              Pizza App
            </SheetTitle>
          </SheetHeader>

          <nav className="flex flex-col mt-6 sm:mt-8 space-y-3 sm:space-y-4 text-gray-800 font-semibold text-base sm:text-lg">
            <Link
              to="/"
              className="flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2 sm:py-3 rounded-md hover:bg-orange-100 transition"
            >
              <BiHome className="text-xl sm:text-2xl text-orange-500" />
              Home
            </Link>

            <Link
              to="/menu"
              className="flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2 sm:py-3 rounded-md hover:bg-orange-100 transition"
            >
              <GiFullPizza className="text-xl sm:text-2xl text-orange-500" />
              Menu
            </Link>

            <Link
              to="/about-us"
              className="flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2 sm:py-3 rounded-md hover:bg-orange-100 transition"
            >
              <FaUserFriends className="text-xl sm:text-2xl text-orange-500" />
              About Us
            </Link>

            {role === "admin" && (
              <>
                <div className="border-t pt-3 sm:pt-4 border-orange-300" />
                <Link
                  to="/admin/addProduct"
                  className="flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2 sm:py-3 rounded-md hover:bg-orange-100 transition"
                >
                  <FaPlusCircle className="text-xl sm:text-2xl text-orange-500" />
                  Add New Product
                </Link>
                <Link
                  to="/admin/pending-orders"
                  className="flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2 sm:py-3 rounded-md hover:bg-orange-100 transition"
                >
                  <FaClipboardList className="text-xl sm:text-2xl text-orange-500" />
                  Pending Orders
                </Link>
                <Link
                  to="/admin/delivered-orders"
                  className="flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2 sm:py-3 rounded-md hover:bg-orange-100 transition"
                >
                  <FaHistory className="text-xl sm:text-2xl text-orange-500" />
                  Delivered Orders
                </Link>
              </>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NavigationBar;