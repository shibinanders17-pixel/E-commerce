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

import CartProvider from "./context/CartContext";
import SearchProvider from "./context/SearchContext";

import AdminLogin from "./admin/AdminLogin";
import AdminProtectedRoute from "./admin/AdminProtectedRoute";
import AdminLayout from "./admin/AdminLayout"
import AdminDashboard from "./admin/AdminDashboard";
import ProductManager from "./admin/ProductManager";
import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";
import AdminUsers from "./admin/AdminUsers";
import UserDetails from "./admin/UserDetails";
import AdminOrders from "./admin/AdminOrders";

export default function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const location = useLocation();
  const shouldHideNavbar =
  location.pathname.startsWith("/admin") || location.pathname === "/login" || location.pathname === "/register";

  return (
    <SearchProvider>
      <CartProvider>

      {!shouldHideNavbar ? ( <Navbar
          isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>) : null }

        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/productsDet/:id" element={<ProductsDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />

          
          <Route path="/admin" element={<AdminLogin />} />

          <Route element={<AdminProtectedRoute />}>
          <Route path="admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products-man" element={<ProductManager />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="edit-product/:id" element={<EditProduct />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="users/:id" element={<UserDetails />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>
         </Route>
        </Routes>

      </CartProvider>
    </SearchProvider>
  );
}
