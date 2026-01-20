import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!username || !password) {
      alert("All fields are required");
      return;
    }

    const user = {
      username,
      password,
    };

    localStorage.setItem("user", JSON.stringify(user));
    alert("Registration successful 🎉");
    navigate("/login");
  };

  return (
    <div
      className="flex flex-col items-center justify-center
                 w-screen h-screen gap-3
                 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/src/assets/95cdfeef.avif')",
      }}
    >
      <h2 className="text-3xl font-bold text-black mb-2">
        Register
      </h2>

      <input
        type="text"
        placeholder="First name"
        className="px-3 py-2 w-64 border rounded outline-none"
      />

      <input
        type="text"
        placeholder="Last name"
        className="px-3 py-2 w-64 border rounded outline-none"
      />

      <input
        type="date"
        className="px-3 py-2 w-64 border rounded outline-none"
      />

      <input
        type="text"
        placeholder="Set Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="px-3 py-2 w-64 border rounded outline-none"
      />

      <input
        type="password"
        placeholder="Set New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="px-3 py-2 w-64 border rounded outline-none"
      />

      <button
        onClick={handleRegister}
        className="px-5 py-2 mt-2 bg-black text-white rounded
                   hover:bg-gray-800 transition"
      >
        Register
      </button>

      <p className="text-sm">
        Already have an account?{" "}
        <span
          className="text-blue-600 underline cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </p>
    </div>
  );
}

