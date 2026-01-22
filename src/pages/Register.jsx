import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (
      !firstName ||
      !lastName ||
      !dob ||
      !email ||
      !password ||
      !phone ||
      !address ||
      !pincode
    ) {
      alert("All fields are required");
      return;
    }

    const newUser = {
      name: `${firstName} ${lastName}`,
      email,
      password,
      phone,
      address,
      pincode,
      dob,
    };

    try {
      await api.post("/users", newUser);
      alert("Registration successful 🎉");
      navigate("/login");
    } catch (error) {
      alert("Registration failed");
      console.log(error);
    }
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
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="px-3 py-2 w-64 border rounded outline-none"
      />

      <input
        type="text"
        placeholder="Last name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="px-3 py-2 w-64 border rounded outline-none"
      />

      <input
        type="date"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        className="px-3 py-2 w-64 border rounded outline-none"
      />

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

      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="px-3 py-2 w-64 border rounded outline-none"
      />

      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="px-3 py-2 w-64 border rounded outline-none"
      />

      <input
        type="text"
        placeholder="Pincode"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
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
