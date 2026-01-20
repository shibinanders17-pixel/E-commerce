import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      alert("No user found. Please register first");
      return;
    }

    if (
      username === storedUser.username &&
      password === storedUser.password
    ) {
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
      navigate("/");
    } else {
      alert("Invalid username or password");
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
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
