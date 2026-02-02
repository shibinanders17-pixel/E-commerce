import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    localStorage.getItem("isAdminLoggedIn") === "true"
  );

  const handleLogin = async () => {
    try {
      const res = await api.get("/admin");
      const admin = res.data;

      if (username === admin.username && password === admin.password) {
        localStorage.setItem("isAdminLoggedIn", "true");

        setIsAdminLoggedIn(true);

        alert("Admin login successful");
      } else {
        alert("Invalid admin credentials");
      }
    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    setIsAdminLoggedIn(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center
                    bg-linear-to-br from-blue-100 to-blue-200">

      {!isAdminLoggedIn ? (
        <div className="bg-white p-8 rounded-xl shadow-lg w-80 text-center">
          <h2 className="text-2xl font-bold mb-4">Admin Login</h2>

          <input
            type="text"
            placeholder="Admin Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mb-3 border rounded"  />

          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded"  />

          <button
            onClick={handleLogin}
            className="w-full bg-green-500 text-white py-2 rounded
                       hover:bg-green-600">
            Login
          </button>
        </div>

        ) : (

        <div className="bg-white p-10 rounded-xl shadow-lg text-center w-96">
          <h1 className="text-3xl font-bold text-blue-800 mb-3">
            Welcome to Admin Page !
          </h1>

          <p className="text-gray-600 mb-6">
            You are currently logged in
          </p>

          <button
            onClick={() => navigate("/admin/dashboard")}
            className="px-6 py-2 bg-blue-600 text-white rounded
                       hover:bg-blue-700 mr-3">
            Go to AdminPanel
          </button>

          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 text-white rounded
                       hover:bg-red-700" >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
