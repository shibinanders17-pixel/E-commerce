
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData]     = useState(null);
  const [loading, setLoading]       = useState(true);
  const [imageFile, setImageFile]   = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading]   = useState(false);

  // ─── Edit State ────────────────────────────────────────
  const [isEditing, setIsEditing]   = useState(false);
  const [saving, setSaving]         = useState(false);
  const [editForm, setEditForm]     = useState({
    name: "", phone: "", address: "", pincode: ""
  });

  useEffect(() => { fetchProfile(); }, []);

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

  // ─── Edit Handlers ─────────────────────────────────────
  const handleEditClick = () => {
    setEditForm({
      name:    userData?.name    || "",
      phone:   userData?.phone   || "",
      address: userData?.address || "",
      pincode: userData?.pincode || "",
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!editForm.name || !editForm.phone || !editForm.address || !editForm.pincode) {
      alert("All fields are required!");
      return;
    }
    if (editForm.phone.length !== 10) {
      alert("Phone must be 10 digits!");
      return;
    }
    if (editForm.pincode.length !== 6) {
      alert("Pincode must be 6 digits!");
      return;
    }
    try {
      setSaving(true);
      await api.put("/users/profile", editForm);
      alert("Profile updated! ✅");
      setIsEditing(false);
      fetchProfile();
    } catch (error) {
      console.log(error);
      alert("Update failed!");
    } finally {
      setSaving(false);
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
            <div className="w-24 h-24 rounded-full overflow-hidden
                            border-4 border-red-100 shrink-0
                            bg-red-50 flex items-center justify-center">
              {imagePreview ? (
                <img src={imagePreview} alt="profile"
                  className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl font-bold text-red-400">
                  {userData?.name?.charAt(0).toUpperCase() || "U"}
                </span>
              )}
            </div>
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
                             hover:bg-red-600 transition disabled:opacity-60"
                >
                  {uploading ? "Uploading..." : "Upload Photo"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Personal Info Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-5">
          <div className="bg-linear-to-r from-blue-500 to-blue-600
                          px-5 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">📋</span>
              <p className="text-white font-semibold text-sm">Personal Information</p>
            </div>
            {/* ✅ Edit button */}
            {!isEditing && (
              <button
                onClick={handleEditClick}
                className="px-3 py-1.5 bg-white/20 text-white
                           text-xs font-semibold rounded-lg
                           hover:bg-white/30 transition"
              >
                ✏️ Edit
              </button>
            )}
          </div>

          <div className="p-5">
            {isEditing ? (
              /* ── Edit Mode ─────────────────────────── */
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full mt-1 px-4 py-2.5 border border-gray-200
                               rounded-xl text-sm outline-none
                               focus:border-red-400 focus:ring-1 focus:ring-red-200 transition"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Phone
                  </label>
                  <input
                    value={editForm.phone}
                    maxLength={10}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value.replace(/\D/g, "") })}
                    className="w-full mt-1 px-4 py-2.5 border border-gray-200
                               rounded-xl text-sm outline-none
                               focus:border-red-400 focus:ring-1 focus:ring-red-200 transition"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Address
                  </label>
                  <textarea
                    value={editForm.address}
                    onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                    rows={3}
                    className="w-full mt-1 px-4 py-2.5 border border-gray-200
                               rounded-xl text-sm outline-none resize-none
                               focus:border-red-400 focus:ring-1 focus:ring-red-200 transition"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Pincode
                  </label>
                  <input
                    value={editForm.pincode}
                    maxLength={6}
                    onChange={(e) => setEditForm({ ...editForm, pincode: e.target.value.replace(/\D/g, "") })}
                    className="w-full mt-1 px-4 py-2.5 border border-gray-200
                               rounded-xl text-sm outline-none
                               focus:border-red-400 focus:ring-1 focus:ring-red-200 transition"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex-1 py-2.5 bg-red-500 text-white
                               rounded-xl text-sm font-bold
                               hover:bg-red-600 transition disabled:opacity-60"
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 py-2.5 bg-gray-100 text-gray-600
                               rounded-xl text-sm font-semibold
                               hover:bg-gray-200 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              /* ── View Mode ──────────────────────────── */
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Full Name</p>
                  <p className="text-sm font-semibold text-gray-800 mt-1">{userData?.name || "—"}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Username</p>
                  <p className="text-sm font-semibold text-gray-800 mt-1">{userData?.username || "—"}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Phone</p>
                  <p className="text-sm font-semibold text-gray-800 mt-1">{userData?.phone || "—"}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Date of Birth</p>
                  <p className="text-sm font-semibold text-gray-800 mt-1">{userData?.dob || "—"}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Pincode</p>
                  <p className="text-sm font-semibold text-gray-800 mt-1">{userData?.pincode || "—"}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Member Since</p>
                  <p className="text-sm font-semibold text-gray-800 mt-1">
                    {new Date(userData?.accountCreatedDate).toLocaleDateString("en-IN")}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Address</p>
                  <p className="text-sm font-semibold text-gray-800 mt-1">{userData?.address || "—"}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Wallet Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-5">
          <div className="bg-lineart-to-r from-green-500 to-green-600
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