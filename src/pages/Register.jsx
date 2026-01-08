import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

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
      username : username,
      password : password
    };

    localStorage.setItem("user", JSON.stringify(user));
    alert("Registration successful");
    navigate("/login");
  };

  return (
    <div className="login-container">
      <h2>Register</h2>

      <label>First name: </label>
      <input type="text" placeholder="enter first name"  />

       <label>Last name: </label>
      <input type="text" placeholder="enter last name"  />

      <span>DOB: </span>
      <input type="date" placeholder="enter last name"  />
      
      <input
        type="text"
        placeholder="Set Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="login-input"
      />

      <input
        type="password"
        placeholder="Set New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="login-input"
      />
       <span>⬇️</span>
      <button onClick={handleRegister} className="login-button">
        Register
      </button>

      <p style={{ textAlign: "center" }}>
        Already have an account? →
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </p>
    </div>
  );
}




