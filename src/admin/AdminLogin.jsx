import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  const adminToken = localStorage.getItem("adminToken");
  const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
  if (adminToken && isAdminLoggedIn) {
    navigate("/admin/dashboard", { replace: true });
  }
}, []);

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Username and password required");
      return;
    }
    try {
      setLoading(true);
      const res = await api.post("/admin/login", {
        username,
        password
      });
      const token = res.data.jwt_token;
      if (!token) {
        alert("Login failed");
        return;
      }
      localStorage.setItem("adminToken", token);
      localStorage.setItem("isAdminLoggedIn", "true");
      navigate("/admin/dashboard", {replace : true});
    } catch (error) {
      console.log(error);
      alert("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🔐</div>
          <h2 className="text-2xl font-bold text-gray-800">
            Admin Login
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Mobile World Admin Panel
          </p>
          <div className="w-12 h-1 bg-blue-600 rounded-full mx-auto mt-3" />
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter admin username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mt-1 px-4 py-3 border border-gray-200
                         rounded-xl text-sm outline-none
                         focus:border-blue-400 focus:ring-1 focus:ring-blue-200
                         transition"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full mt-1 px-4 py-3 border border-gray-200
                         rounded-xl text-sm outline-none
                         focus:border-blue-400 focus:ring-1 focus:ring-blue-200
                         transition"
            />
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full mt-6 py-3 bg-blue-600 text-white
                     font-bold rounded-xl hover:bg-blue-700
                     transition disabled:opacity-60 text-sm"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </div>
    </div>
  );
}