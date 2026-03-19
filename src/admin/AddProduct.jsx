import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AddProduct() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [name, setName]                 = useState("");
  const [price, setPrice]               = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [specs, setSpecs]               = useState("");
  const [description, setDescription]   = useState("");
  const [category, setCategory]         = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !specs || !description || !category || !imageFile) {
      alert("All fields are required!");
      return;
    }

    try {
      setLoading(true);

    
      const formData = new FormData();
      formData.append("image", imageFile);
      const uploadRes = await api.post("/admin/upload", formData);
      const imagePath = uploadRes.data.imagePath;

  
      await api.post("/admin/products", {
        name,
        price: Number(price),
        originalPrice: Number(originalPrice) || undefined,
        image: imagePath,
        specs,
        description,
        category,
      });

      alert("Product Added Successfully ");
      navigate("/admin/products-man");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-1 h-7 bg-blue-600 rounded-full" />
          <h1 className="text-2xl font-bold text-gray-800">Add Product</h1>
        </div>
        <button
          onClick={() => navigate("/admin/products-man")}
          className="px-4 py-2 bg-white border border-gray-200
                     text-gray-600 rounded-xl text-sm font-semibold
                     hover:bg-gray-50 transition shadow-sm"
        >
          ← Back to Products
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Card 1 — Basic Info */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-linear-0 from-blue-500 to-blue-600
                          px-5 py-3 flex items-center gap-2">
            <span className="text-lg">📋</span>
            <p className="text-white font-semibold text-sm">Basic Information</p>
          </div>
          <div className="p-5 space-y-4">

            {/* Name */}
            <div>
              <label className="text-shadow-xs font-semibold text-gray-500
                                 uppercase tracking-wider">
                Product Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. iPhone 15 Pro"
                className="w-full mt-1.5 px-4 py-2.5 border border-gray-400
                           rounded-xl text-sm outline-none
                           focus:border-blue-400 focus:ring-2 focus:ring-blue-100
                           transition"
              />
            </div>

            {/* Price + Original Price */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-shadow-xs font-semibold text-gray-500
                                   uppercase tracking-wider">
                  Price (₹)
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. 129999"
                  className="w-full mt-1.5 px-4 py-2.5 border border-gray-400
                             rounded-xl text-sm outline-none
                             focus:border-blue-400 focus:ring-2 focus:ring-blue-100
                             transition"
                />
              </div>
              <div>
                <label className="text-shadow-2xs font-semibold text-gray-500
                                   uppercase tracking-wider">
                  Original Price (₹)
                  <span className="ml-1 text-gray-400 normal-case font-normal">
                    (optional)
                  </span>
                </label>
                <input
                  type="number"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  placeholder="e.g. 139999"
                  className="w-full mt-1.5 px-4 py-2.5 border border-gray-400
                             rounded-xl text-sm outline-none
                             focus:border-blue-400 focus:ring-2 focus:ring-blue-100
                             transition"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="text-shadow-2xs font-semibold text-gray-500
                                 uppercase tracking-wider">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full mt-1.5 px-4 py-2.5 border border-gray-200
                           rounded-xl text-sm outline-none
                           focus:border-blue-400 focus:ring-2 focus:ring-blue-100
                           transition"
              >
                <option value="">Select Brand</option>
                <option value="iPhone">iPhone</option>
                <option value="Samsung">Samsung</option>
                <option value="Redmi">Redmi</option>
                <option value="Realme">Realme</option>
                <option value="Poco">Poco</option>
                <option value="Vivo">Vivo</option>
                <option value="Motorola">Motorola</option>
              </select>
            </div>

          </div>
        </div>

        {/* Card 2 — Image Upload */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-linear-0 from-green-500 to-green-600
                          px-5 py-3 flex items-center gap-2">
            <span className="text-lg">🖼️</span>
            <p className="text-white font-semibold text-sm">Product Image</p>
          </div>
          <div className="p-5">
            <div className="flex items-center gap-6">

              {/* Preview */}
              <div className="w-28 h-28 rounded-2xl border-2 border-dashed
                              border-gray-200 flex items-center justify-center
                              bg-gray-50 overflow-hidden shrink-0">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="preview"
                    className="w-full h-full object-contain p-2"
                  />
                ) : (
                  <span className="text-3xl">📷</span>
                )}
              </div>

              {/* Upload */}
              <div className="flex-1">
                <label className="text-xs font-semibold text-gray-500
                                   uppercase tracking-wider block mb-1.5">
                  Choose Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-sm text-gray-500
                             file:mr-4 file:py-2 file:px-4
                             file:rounded-xl file:border-0
                             file:text-sm file:font-semibold
                             file:bg-blue-50 file:text-blue-700
                             hover:file:bg-blue-100 transition"
                />
                <p className="text-xs text-gray-400 mt-2">
                  PNG, JPG, WEBP supported
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Card 3 — Product Details */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-linear-0 from-purple-500 to-purple-600
                          px-5 py-3 flex items-center gap-2">
            <span className="text-lg">📝</span>
            <p className="text-white font-semibold text-sm">Product Details</p>
          </div>
          <div className="p-5 space-y-4">

            <div>
              <label className="text-shadow-2xs font-semibold text-gray-500
                                 uppercase tracking-wider">
                Specs
              </label>
              <textarea
                rows="3"
                value={specs}
                onChange={(e) => setSpecs(e.target.value)}
                placeholder="e.g. 6.1 inch display, 128GB storage, 12MP camera..."
                className="w-full mt-1.5 px-4 py-2.5 border border-gray-400
                           rounded-xl text-sm outline-none
                           focus:border-purple-400 focus:ring-2 focus:ring-purple-100
                           transition resize-none"
              />
            </div>

            <div>
              <label className="text-shadow-2xs font-semibold text-gray-500
                                 uppercase tracking-wider">
                Description
              </label>
              <textarea
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write a detailed product description..."
                className="w-full mt-1.5 px-4 py-2.5 border border-gray-400
                           rounded-xl text-sm outline-none
                           focus:border-purple-400 focus:ring-2 focus:ring-purple-100
                           transition resize-none"
              />
            </div>

          </div>
        </div>

        {/* Card 4 — Actions */}
        <div className="bg-white rounded-2xl shadow-sm p-5
                        flex items-center justify-between">
          <p className="text-xs text-gray-400">
            ✅ All fields except Original Price are required
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate("/admin/products-man")}
              className="px-6 py-2.5 bg-gray-100 text-gray-700
                         rounded-xl text-sm font-semibold
                         hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-blue-600 text-white
                         rounded-xl text-sm font-bold
                         hover:bg-blue-700 transition disabled:opacity-60"
            >
              {loading ? "Adding..." : "Add Product"}
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}