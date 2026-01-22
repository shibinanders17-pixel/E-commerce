import { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/Logo.jpg";

import { CartContext } from "../context/CartContext";
import { SearchContext } from "../context/SearchContext";

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const { cart } = useContext(CartContext);
  const { searchText, setSearchText } = useContext(SearchContext);

  const navigate = useNavigate();
  const location = useLocation();
  const showSearchBox = location.pathname === "/";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav
      className="sticky top-0 z-10
                 flex items-center justify-between
                 px-16 py-6
                 bg-linear-to-b from-gray-300 to-transparent
                 border border-gray-800 rounded-lg
                 max-md:px-5 max-md:flex-wrap max-md:justify-center
                 max-sm:flex-col max-sm:gap-3"
    >
      <div className="flex items-center gap-3">
        <img
          src={Logo}
          alt="logo"
          className="h-12 w-17.5
                     max-sm:h-10 max-sm:w-13.75"
        />

        <h1
          className="text-3xl font-bold
                     bg-linear-to-r from-gray-200 to-transparent
                     rounded-md px-2 py-1
                     font-sans
                     max-md:text-xl max-sm:text-lg"
        >
          📱 Mobile World
        </h1>
      </div>

      {showSearchBox && (
        <input
          type="text"
          placeholder="Search products..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-100 p-2 rounded-md border
                     hover:border-red-600
                     max-md:w-62.5
                     max-sm:w-[90%]"
        />
      )}

      <ul
        className="flex items-center gap-11 list-none
                   max-md:gap-5 max-md:flex-wrap max-md:justify-center
                   max-sm:flex-col max-sm:gap-3"
      >
        <li>
          <Link
            to="/"
            className="text-lg text-black hover:underline"
          >
            Shop 🛍️
          </Link>
        </li>

        <li>
          <Link
            to="/cart"
            className="text-lg text-black hover:underline"
          >
            Cart 🛒 ({cart.length})
          </Link>
        </li>

        {isLoggedIn ? (
          <li>
            <button
              onClick={handleLogout}
              className="px-4 py-1 rounded-md
                         border border-gray-500
                         bg-white text-sm
                         hover:bg-linear-to-b
                         hover:from-blue-600 hover:to-green-400
                         hover:text-white transition"
            >
              Logout
            </button>
          </li>
        ) : (
          <li>
            <Link
              to="/login"
              className="px-4 py-1 rounded-md
                         border border-gray-500
                         bg-white text-sm
                         hover:bg-linear-to-b
                         hover:from-blue-600 hover:to-green-400
                         hover:text-white transition"
            >
              Login
            </Link>
          </li>
        )}

      </ul>
    </nav>
  );
}
