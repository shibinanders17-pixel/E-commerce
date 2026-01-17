import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
      if (username === "admin" && password === "1234") {
       alert("login Successfully") 
          navigate("/admin/dashboard");
    } else {
      alert("Invalid Admin username / password");
    }
  };

  return (
    <div className="admin-login-container">
         <div className="admin-login-box">
             <h2>Admin Login</h2>

        <input
          type="text"
          placeholder="Admin Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>
        </div>
    </div>
  );
}
