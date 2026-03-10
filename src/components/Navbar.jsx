
import { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/Logo.jpg";
import { CartContext } from "../context/CartContext";
import { SearchContext } from "../context/SearchContext";
import { WishlistContext } from "../context/WishlistContext";

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {

  const { cart } = useContext(CartContext);
  const { searchText, setSearchText } = useContext(SearchContext);
  const { wishlist } = useContext(WishlistContext);

  const navigate = useNavigate();
  const location = useLocation();

  const showSearchBox = location.pathname === "/";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">

      {/* Top bar */}
      <div className="flex items-center justify-between px-6 md:px-16 py-3 gap-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 min-w-fit">
          <img
            src={Logo}
            alt="logo"
            className="h-10 w-10 rounded-full object-cover"
          />
          <span className="hidden sm:flex items-baseline gap-0.5">
            <span className="text-xl font-extrabold text-gray-900 tracking-tight">Mobile</span>
            <span className="text-xl font-extrabold text-red-500 tracking-tight">World</span>
          </span>
        </Link>

        {/* Search Bar */}
        {showSearchBox && (
          <div className="flex flex-1 max-w-xl mx-4">
            <input
              type="text"
              placeholder="Search for mobiles, brands and more..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full px-4 py-2 border-2 border-red-500
                         rounded-l-md text-sm outline-none
                         focus:border-red-600"
            />
            <button className="bg-red-500 hover:bg-red-600
                               px-4 py-2 rounded-r-md transition">
              <svg xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round"
                  strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </button>
          </div>
        )}

        {/* Right Icons */}
        <div className="flex items-center gap-4 md:gap-6">

          {/* Wishlist */}
          <Link to="/wishlist" className="flex flex-col items-center group">
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700 group-hover:text-red-500 transition"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2
                                 bg-red-500 text-white text-[10px]
                                 rounded-full w-4 h-4
                                 flex items-center justify-center">
                  {wishlist.length}
                </span>
                
              )}
            </div>
            <span className="text-[11px] text-gray-600 group-hover:text-red-500 hidden md:block">
              Wishlist
            </span>
          </Link>

          {/* Cart */}
          <Link to="/cart" className="flex flex-col items-center group">
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700 group-hover:text-red-500 transition"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2
                                 bg-red-500 text-white text-[10px]
                                 rounded-full w-4 h-4
                                 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </div>
            <span className="text-[11px] text-gray-600 group-hover:text-red-500 hidden md:block">
              Cart
            </span>
          </Link>


          {/* Orders - only show when logged in */}
          {isLoggedIn && (
            <Link to="/orders" className="flex flex-col items-center group">
              <svg xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700 group-hover:text-red-500 transition"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              <span className="text-[11px] text-gray-600 group-hover:text-red-500 hidden md:block">
                Orders
              </span>
            </Link>
          )}

          {/* Login / Logout */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex flex-col items-center group"
            >
              <svg xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700 group-hover:text-red-500 transition"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="text-[11px] text-gray-600 group-hover:text-red-500 hidden md:block">
                Logout
              </span>
            </button>
          ) : (
            <Link to="/login" className="flex flex-col items-center group">
              <svg xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700 group-hover:text-red-500 transition"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-[11px] text-gray-600 group-hover:text-red-500 hidden md:block">
                Login
              </span>
            </Link>
          )}

        </div>

      </div>

      {/* Bottom red strip */}
      <div className="h-1 bg-red-500 w-full" />

    </nav>
  );
}