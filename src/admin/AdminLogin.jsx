import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "admin" && password === "admin123") {
      alert("Admin Login Success");
      navigate("/admin/dashboard");
    } else {
      alert("Invalid Admin Credentials");
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Admin Login</h2>

      <input
        type="text"
        placeholder="Admin Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ padding: "10px", margin: "10px" }}
      />

      <br />

      <input
        type="password"
        placeholder="Admin Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: "10px", margin: "10px" }}
      />

      <br />

      <button onClick={handleLogin} style={{ padding: "10px 20px" }}>
        Login
      </button>
    </div>
  );
}