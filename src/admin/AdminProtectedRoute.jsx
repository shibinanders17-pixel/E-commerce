import { Navigate, Outlet } from "react-router-dom";

export default function AdminProtectedRoute() {
  const isAdminLoggedIn =
    localStorage.getItem("isAdminLoggedIn") === "true";

  return isAdminLoggedIn ? <Outlet /> : <Navigate to="/admin" />;
}
