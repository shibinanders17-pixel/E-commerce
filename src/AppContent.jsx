gvhm
import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import ProductsDetails from "./pages/ProductsDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Wishlist from "./pages/Wishlist";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";

import CartProvider from "./context/CartContext";
import SearchProvider from "./context/SearchContext";
import WishlistProvider from "./context/WishlistContext";
import ProtectedRoutes from "./components/ProtectedRoutes";

import AdminLogin from "./admin/AdminLogin";
import AdminProtectedRoute from "./admin/AdminProtectedRoute";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import ProductManager from "./admin/ProductManager";
import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";
import AdminUsers from "./admin/AdminUsers";
import UserDetails from "./admin/UserDetails";
import AdminOrders from "./admin/AdminOrders";
import AdminOrderDetails from "./admin/AdminOrderDetails";

export default function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const location = useLocation();

  const shouldHideNavbar =
    location.pathname.startsWith("/admin") ||
    location.pathname === "/login" ||
    location.pathname === "/register";
    
  const shouldHideFooter = location.pathname.startsWith("/admin");

  return (
    <SearchProvider>
      <WishlistProvider>
        <CartProvider>
          {!shouldHideNavbar ? (
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          ) : null}
          <Routes>
            {/* ─── User Routes ──────────────────────────── */}
            <Route path="/" element={<Products />} />
            <Route path="/productsDet/:id" element={<ProductsDetails />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<Register />} />

            {/* ─── Protected User Routes ────────────────── */}
            <Route path="/cart" element={<ProtectedRoutes><Cart /></ProtectedRoutes>} />
            <Route path="/wishlist" element={<ProtectedRoutes><Wishlist /></ProtectedRoutes>} />
            <Route path="/checkout/product/:id" element={<ProtectedRoutes><Checkout /></ProtectedRoutes>} />
            <Route path="/checkout/cart" element={<ProtectedRoutes><Checkout /></ProtectedRoutes>} />
            <Route path="/success" element={<ProtectedRoutes><Success /></ProtectedRoutes>} />
            <Route path="/orders" element={<ProtectedRoutes><Orders /></ProtectedRoutes>} />
            <Route path="/orders/:id" element={<ProtectedRoutes><OrderDetails /></ProtectedRoutes>} />
            <Route path="/profile" element={<ProtectedRoutes><Profile /></ProtectedRoutes>} />

            {/* ─── Admin Routes ─────────────────────────── */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/*" element={<AdminProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="products-man" element={<ProductManager />} />
                <Route path="add-product" element={<AddProduct />} />
                <Route path="edit-product/:id" element={<EditProduct />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="users/:id" element={<UserDetails />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="orders/:id" element={<AdminOrderDetails />} />

                {/* ✅ Admin 404 route */}
                <Route path="*" element={
                  <div className="min-h-screen flex flex-col
                                  items-center justify-center">
                    <p className="text-6xl font-bold text-gray-300">404</p>
                    <p className="text-gray-500 mt-2">Page not found!</p>
                    <button
                      onClick={() => window.location.href = "/admin/dashboard"}
                      className="mt-4 px-6 py-2 bg-blue-600 text-white
                                 rounded-xl font-semibold hover:bg-blue-700"
                    >
                      Go to Dashboard
                    </button>
                  </div>
                } />
              </Route>
            </Route>

            {/* ─── User 404 route ───────────────────────── */}
            <Route path="*" element={
              <div className="min-h-screen flex flex-col
                              items-center justify-center">
                <p className="text-6xl font-bold text-gray-300">404</p>
                <p className="text-gray-500 mt-2">Page not found!</p>
                <button
                  onClick={() => window.location.href = "/"}
                  className="mt-4 px-6 py-2 bg-red-500 text-white
                             rounded-xl font-semibold hover:bg-red-600"
                >
                  Go Home
                </button>
              </div>
            } />
          </Routes>
          {!shouldHideFooter && <Footer />}
        </CartProvider>
      </WishlistProvider>
    </SearchProvider>
  );
}
