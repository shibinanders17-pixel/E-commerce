
import { Navigate, Outlet } from "react-router-dom";

export default function AdminProtectedRoute() {
  const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
  const adminToken = localStorage.getItem("adminToken");

  return (isAdminLoggedIn && adminToken)
    ? <Outlet />
    : <Navigate to="/admin" />;
}