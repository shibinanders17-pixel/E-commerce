import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Email and password required");
      return;
    }

    try {
      const res = await api.get(`/users?email=${email}`);
      const user = res.data[0];

      if (!user) {
        alert("User not found. Please register");
        return;
      }

      if (user.isBlocked) {
        alert("Your account is blocked by admin");
        return;
      }

      if (user.password !== password) {
        alert("Invalid password");
        return;
      }

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      setIsLoggedIn(true);

      alert("Login successful");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Login failed");
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center
                 w-screen h-screen gap-4
                 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/src/assets/95cdfeef.avif')",
      }}
    >
      <h2 className="text-3xl font-bold text-black">
        Login
      </h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="px-3 py-2 w-64 border rounded outline-none"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="px-3 py-2 w-64 border rounded outline-none"
      />

      <button
        onClick={handleLogin}
        className="px-5 py-2 bg-black text-white rounded
                   hover:bg-gray-800 transition"
      >
        Login
      </button>

      <span>if you don't have account? then you go to</span>
      <span
        className="text-blue-600 underline cursor-pointer"
        onClick={() => navigate("/register")}
      >
        register...
      </span>
    </div>
  );
}
