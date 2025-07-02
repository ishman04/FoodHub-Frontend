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
    <div className="p-4">
      <Sheet>
        {/* 👇 Menu icon trigger */}
        <SheetTrigger className="text-orange-600">
          <img src={Menu} height={40} width={40} alt="menu" />
        </SheetTrigger>

        {/* 👇 Sidebar drawer */}
        <SheetContent
          side="left"
          className="w-80 bg-gradient-to-b from-orange-50 via-amber-100 to-orange-200 shadow-lg"
        >
          <SheetHeader>
            <SheetTitle className="text-3xl font-bold text-orange-600">
              🍕 Pizza App
            </SheetTitle>
          </SheetHeader>

          <nav className="flex flex-col mt-8 space-y-4 text-gray-800 font-semibold text-lg">
            <Link
              to="/"
              className="flex items-center gap-4 px-4 py-3 rounded-md hover:bg-orange-100 transition"
            >
              <BiHome className="text-2xl text-orange-500" />
              Home
            </Link>

            <Link
              to="/menu"
              className="flex items-center gap-4 px-4 py-3 rounded-md hover:bg-orange-100 transition"
            >
              <GiFullPizza className="text-2xl text-orange-500" />
              Menu
            </Link>

            <Link
              to="/about-us"
              className="flex items-center gap-4 px-4 py-3 rounded-md hover:bg-orange-100 transition"
            >
              <FaUserFriends className="text-2xl text-orange-500" />
              About Us
            </Link>

            {role === "admin" && (
              <>
                <div className="border-t pt-4 border-orange-300" />
                <Link
                  to="/admin/addProduct"
                  className="flex items-center gap-4 px-4 py-3 rounded-md hover:bg-orange-100 transition"
                >
                  <FaPlusCircle className="text-2xl text-orange-500" />
                  Add New Product
                </Link>
                <Link
                  to="/admin/pending-orders"
                  className="flex items-center gap-4 px-4 py-3 rounded-md hover:bg-orange-100 transition"
                >
                  <FaClipboardList className="text-2xl text-orange-500" />
                  Pending Orders
                </Link>
                <Link
                  to="/admin/delivered-orders"
                  className="flex items-center gap-4 px-4 py-3 rounded-md hover:bg-orange-100 transition"
                >
                  <FaHistory className="text-2xl text-orange-500" />
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
