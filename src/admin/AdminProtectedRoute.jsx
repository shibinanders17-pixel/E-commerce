
import { Navigate, Outlet } from "react-router-dom";

export default function AdminProtectedRoute() {
  const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
  const adminToken = localStorage.getItem("adminToken");

  if (!isAdminLoggedIn || !adminToken) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}