import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import ProductsDetails from "./pages/ProductsDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import Success from "./pages/Success";
import CartProvider from "./context/CartContext";
import SearchProvider from "./context/SearchContext";

import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AdminLayout from "./admin/AdminLayout";
// import ProductManager from "./admin/ProductManager";
import AdminSidebar from "./admin/AdminSidebar"

export default function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <SearchProvider>
      <CartProvider>
        
        {!isAdminRoute && (
          <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        )}

        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/productsDet/:id" element={<ProductsDetails/>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/success" element={<Success />} />

          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/layout" element={<AdminLayout />} />
          <Route path="/admin/sidebar" element={<AdminSidebar />} />
          {/* <Route path="/admin/products-man" element={<ProductManager />} /> */}
          {/* <Route path="/admin/users-list" element={<UserList />} />
          <Route path="/admin/add-product" element={<AddProduct />} /> */}
        </Routes>
      </CartProvider>
    </SearchProvider>
  );
}