import { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/Logo.jpg";
import { CartContext } from "../context/CartContext";
import { SearchContext } from "../context/SearchContext";
import { WishlistContext } from "../context/WishlistContext";
import api from "../services/api";

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {

  const { cart } = useContext(CartContext);
  const { searchText, setSearchText } = useContext(SearchContext);
  const { wishlist } = useContext(WishlistContext);

  const navigate = useNavigate();
  const location = useLocation();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const dropdownRef = useRef(null);

  const showSearchBox = location.pathname === "/";

  // ─── Fetch User Data ───────────────────────────────────
  useEffect(() => {
    if (isLoggedIn) {
      fetchUser();
    } else {
      setUserData(null);
    }
  }, [isLoggedIn]);

  const fetchUser = async () => {
    try {
      const res = await api.get("/users/profile");
      setUserData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ─── Close dropdown on outside click ──────────────────
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setDropdownOpen(false);
    navigate("/login");
  };

  // ─── Avatar Component ──────────────────────────────────
  const Avatar = ({ size = "sm" }) => {
    const dimension = size === "sm" ? "w-9 h-9 text-sm" : "w-10 h-10 text-base";
    return (
      <div className={`${dimension} rounded-full overflow-hidden
                       bg-red-500 flex items-center justify-center
                       text-white font-bold`}>
        {userData?.profileImg ? (
          <img
            src={`http://localhost:5002${userData.profileImg}`}
            alt="profile"
            className="w-full h-full object-cover"
          />
        ) : (
          userData?.name?.charAt(0).toUpperCase() || "U"
        )}
      </div>
    );
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

          {/* Profile Dropdown / Login */}
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>

              {/* Avatar Button */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="hover:ring-2 hover:ring-red-400
                           rounded-full transition"
              >
                <Avatar size="sm" />
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56
                                bg-white rounded-2xl shadow-xl
                                border border-gray-100 z-50
                                overflow-hidden">

                  {/* Profile Info — Clickable! */}
                  <div
                    onClick={() => {
                      navigate("/profile");
                      setDropdownOpen(false);
                    }}
                    className="px-4 py-3 bg-red-50 border-b border-gray-100
                               cursor-pointer hover:bg-red-100 transition"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar size="lg" />
                      <div>
                        <p className="text-sm font-bold text-gray-800">
                          {userData?.name || "User"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {userData?.username || ""}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Wallet Balance */}
                  <div className="px-4 py-2.5 border-b border-gray-100
                                  flex items-center gap-3">
                    <span className="text-base">💰</span>
                    <div>
                      <p className="text-xs text-gray-400">Wallet Balance</p>
                      <p className="text-sm font-bold text-green-600">
                        ₹ {userData?.wallet || 0}
                      </p>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">

                    {/* My Orders */}
                    <button
                      onClick={() => {
                        navigate("/orders");
                        setDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-3
                                 px-4 py-2.5 text-sm text-gray-700
                                 hover:bg-gray-50 transition"
                    >
                      <span className="text-base">📦</span>
                      My Orders
                    </button>

                    {/* Divider */}
                    <div className="border-t border-gray-100 my-1" />

                    {/* Logout */}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3
                                 px-4 py-2.5 text-sm text-red-500
                                 hover:bg-red-50 transition font-semibold"
                    >
                      <span className="text-base">🚪</span>
                      Logout
                    </button>

                  </div>
                </div>
              )}
            </div>
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
