import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/users/profile");
      setUserData(res.data);
      setImagePreview(
        res.data.profileImg
          ? `http://localhost:5002${res.data.profileImg}`
          : null
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) return;
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("image", imageFile);
      await api.post("/users/profile/upload", formData);
      alert("Profile image updated! ✅");
      setImageFile(null);
      fetchProfile();
    } catch (error) {
      console.log(error);
      alert("Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="w-12 h-12 border-4 border-red-500
                        border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1 h-7 bg-red-500 rounded-full" />
          <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
        </div>

        {/* Profile Image Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-5">
          <div className="bg-linear-to-r from-red-500 to-red-600
                          px-5 py-3 flex items-center gap-2">
            <span className="text-lg">👤</span>
            <p className="text-white font-semibold text-sm">Profile Photo</p>
          </div>
          <div className="p-5 flex items-center gap-6">

            {/* Preview */}
            <div className="w-24 h-24 rounded-full overflow-hidden
                            border-4 border-red-100 shrink-0
                            bg-red-50 flex items-center justify-center">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-4xl font-bold text-red-400">
                  {userData?.name?.charAt(0).toUpperCase() || "U"}
                </span>
              )}
            </div>

            {/* Upload */}
            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-sm text-gray-500
                           file:mr-4 file:py-2 file:px-4
                           file:rounded-xl file:border-0
                           file:text-sm file:font-semibold
                           file:bg-red-50 file:text-red-700
                           hover:file:bg-red-100 transition mb-3"
              />
              {imageFile && (
                <button
                  onClick={handleImageUpload}
                  disabled={uploading}
                  className="px-5 py-2 bg-red-500 text-white
                             rounded-xl text-sm font-semibold
                             hover:bg-red-600 transition
                             disabled:opacity-60"
                >
                  {uploading ? "Uploading..." : "Upload Photo"}
                </button>
              )}
            </div>

          </div>
        </div>

        {/* User Info Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-5">
          <div className="bg-linear-to-r from-blue-500 to-blue-600
                          px-5 py-3 flex items-center gap-2">
            <span className="text-lg">📋</span>
            <p className="text-white font-semibold text-sm">Personal Information</p>
          </div>
          <div className="p-5 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Full Name
              </p>
              <p className="text-sm font-semibold text-gray-800 mt-1">
                {userData?.name || "—"}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Username
              </p>
              <p className="text-sm font-semibold text-gray-800 mt-1">
                {userData?.username || "—"}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Phone
              </p>
              <p className="text-sm font-semibold text-gray-800 mt-1">
                {userData?.phone || "—"}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Date of Birth
              </p>
              <p className="text-sm font-semibold text-gray-800 mt-1">
                {userData?.dob || "—"}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Pincode
              </p>
              <p className="text-sm font-semibold text-gray-800 mt-1">
                {userData?.pincode || "—"}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Member Since
              </p>
              <p className="text-sm font-semibold text-gray-800 mt-1">
                {new Date(userData?.accountCreatedDate).toLocaleDateString("en-IN")}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Address
              </p>
              <p className="text-sm font-semibold text-gray-800 mt-1">
                {userData?.address || "—"}
              </p>
            </div>
          </div>
        </div>

        {/* Wallet Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-5">
          <div className="bg-linear-to-r from-green-500 to-green-600
                          px-5 py-3 flex items-center gap-2">
            <span className="text-lg">💰</span>
            <p className="text-white font-semibold text-sm">Wallet</p>
          </div>
          <div className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Available Balance
              </p>
              <p className="text-3xl font-bold text-green-600 mt-1">
                ₹ {userData?.wallet || 0}
              </p>
            </div>
            <span className="text-5xl">💳</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/orders")}
            className="flex-1 py-3 bg-red-500 text-white
                       rounded-xl font-semibold text-sm
                       hover:bg-red-600 transition"
          >
            📦 My Orders
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex-1 py-3 bg-gray-100 text-gray-700
                       rounded-xl font-semibold text-sm
                       hover:bg-gray-200 transition"
          >
            🛍️ Continue Shopping
          </button>
        </div>

      </div>
    </div>
  );
}