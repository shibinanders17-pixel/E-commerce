
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {

    if (!firstName || !lastName || !dob || !email || !password || !phone || !address || !pincode) {
      alert("All fields are required");
      return;
    }

    if (phone.length !== 10) {
      alert("Enter valid 10 digit phone number");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/users/register", {
        username: email,
        password,
        name: `${firstName} ${lastName}`,
        phone,
        address,
        pincode,
        dob
      });

      if (res.data.status === "success") {
        alert("Registration successful 🎉");
        navigate("/login");
      } else {
        alert("Registration failed");
      }

    } catch (error) {
      console.log(error);
      alert("User already exists or registration failed");
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

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Card */}
      <div className="relative z-10 bg-white/95 backdrop-blur-sm
                      rounded-2xl shadow-2xl
                      w-full max-w-md mx-4 p-8">

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Create Account
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Join Mobile World today!
          </p>
          <div className="w-12 h-1 bg-red-500 rounded-full mx-auto mt-3" />
        </div>

        {/* Form */}
        <div className="space-y-3">

          {/* Name row */}
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-1/2 px-4 py-2.5 border border-gray-200
                         rounded-xl text-sm outline-none
                         focus:border-red-400 focus:ring-1 focus:ring-red-200
                         transition"
            />
            <input
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-1/2 px-4 py-2.5 border border-gray-200
                         rounded-xl text-sm outline-none
                         focus:border-red-400 focus:ring-1 focus:ring-red-200
                         transition"
            />
          </div>

          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200
                       rounded-xl text-sm outline-none text-gray-500
                       focus:border-red-400 focus:ring-1 focus:ring-red-200
                       transition"
          />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200
                       rounded-xl text-sm outline-none
                       focus:border-red-400 focus:ring-1 focus:ring-red-200
                       transition"
          />

          <input
            type="password"
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200
                       rounded-xl text-sm outline-none
                       focus:border-red-400 focus:ring-1 focus:ring-red-200
                       transition"
          />

          <input
            type="text"
            placeholder="Phone number (10 digits)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200
                       rounded-xl text-sm outline-none
                       focus:border-red-400 focus:ring-1 focus:ring-red-200
                       transition"
          />

          <input
            type="text"
            placeholder="Delivery address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200
                       rounded-xl text-sm outline-none
                       focus:border-red-400 focus:ring-1 focus:ring-red-200
                       transition"
          />

          <input
            type="text"
            placeholder="Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200
                       rounded-xl text-sm outline-none
                       focus:border-red-400 focus:ring-1 focus:ring-red-200
                       transition"
          />

        </div>

        {/* Register Button */}
        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full mt-5 py-3 bg-red-500 text-white
                     font-bold rounded-xl hover:bg-red-600
                     transition disabled:opacity-60 text-sm"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>

        {/* Login link */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-red-500 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>

    </div>
  );
}