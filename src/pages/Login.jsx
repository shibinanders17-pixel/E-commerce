import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
 import { useLocation } from "react-router-dom";

export default function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const message = location.state?.message;

  // ─── Already logged in check ───────────────────────────
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/", { replace: true });
    }
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Email and password required");
      return;
    }
    try {
      setLoading(true);
      const res = await api.post("/users/login", {
        username: email,
        password: password
      });
      const token = res.data.jwt_token;
      if (!token) {
        alert("Login failed");
        return;
      }
      localStorage.setItem("token", token);
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
      alert("login successfully 🎉");
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
      const msg = error.response?.data?.message;
      if (msg) {
        alert(msg);
      } else {
        alert("Invalid username or password");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-screen flex items-center justify-center
                 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/src/assets/95cdfeef.avif')" }}
    >
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 bg-white/95 backdrop-blur-sm
                      rounded-2xl shadow-2xl
                      w-full max-w-sm mx-4 p-8">

      {message && (
          <div className="bg-red-50 border border-red-200 
                          text-red-600 text-sm rounded-xl 
                          px-4 py-2 mb-4 text-center">
            {message}
          </div>
        )}

        <div className="text-center mb-6">
          <div className="text-4xl mb-2">📱</div>
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome Back!
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Login to Mobile World
          </p>
          <div className="w-12 h-1 bg-red-500 rounded-full mx-auto mt-3" />
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-3 border border-gray-200
                         rounded-xl text-sm outline-none
                         focus:border-red-400 focus:ring-1 focus:ring-red-200
                         transition"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full mt-1 px-4 py-3 border border-gray-200
                         rounded-xl text-sm outline-none
                         focus:border-red-400 focus:ring-1 focus:ring-red-200
                         transition"
            />
          </div>
        </div>
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full mt-6 py-3 bg-red-500 text-white
                     font-bold rounded-xl hover:bg-red-600
                     transition disabled:opacity-60 text-sm"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-red-500 font-semibold cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}