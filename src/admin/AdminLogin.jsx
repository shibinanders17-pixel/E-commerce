import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.get("/admin");
      const admin = res.data;

      if (
        username === admin.username &&
        password === admin.password
      ) {
      
        localStorage.setItem("isAdminLoggedIn", "true");

        alert("Login Successfully");
        navigate("/admin/dashboard");
      } else {
        alert("Invalid Admin username / password");
      }
    } catch (error) {
      alert("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center
                    bg-linear-to-br from-blue-100 to-sky-50">
      <div className="bg-white w-80 px-10 py-8
                      rounded-xl shadow-xl text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-5">
          Admin Login
        </h2>

        <input
          type="text"
          placeholder="Admin Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-3 border rounded-md text-sm
                     outline-none focus:border-blue-600"
        />

        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md text-sm
                     outline-none focus:border-blue-600"
        />

        <button
          onClick={handleLogin}
          className="w-full py-2 bg-green-500
                     text-white rounded-md text-sm
                     hover:bg-blue-700 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}
