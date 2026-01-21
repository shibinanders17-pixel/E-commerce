import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AddProduct() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [specs, setSpecs] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !image || !specs || !description || !category) {
      alert("All fields are required must!");
      return;
    }

    const newProduct = {
      name,
      price: Number(price),
      image,
      specs,
      description,
      category,
    };

    try {
      await api.post("/products", newProduct);
      alert("Product Added Successfully 🔥");
      navigate("/admin/products-man");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f3fb] flex flex-col items-center pt-10">

      <h1 className="text-3xl font-extrabold text-green-800
                     border-b-4 border-green-600 pb-2 mb-6">
        Add New Product
      </h1>

      <div className="bg-white w-full max-w-xl p-4 md:p-8
                rounded-xl shadow-xl">

        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-3 py-2 border rounded-md text-sm
                         focus:outline-none focus:border-green-600
                         focus:ring-1 focus:ring-green-600"/>
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">
              Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="px-3 py-2 border rounded-md text-sm
                         focus:outline-none focus:border-green-600
                         focus:ring-1 focus:ring-green-600"/>
           </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="px-3 py-2 border rounded-md text-sm
                         focus:outline-none focus:border-green-600
                         focus:ring-1 focus:ring-green-600"/>
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">
              Specs
            </label>
            <textarea
              rows="3"
              value={specs}
              onChange={(e) => setSpecs(e.target.value)}
              className="px-3 py-2 border rounded-md text-sm
                         focus:outline-none focus:border-green-600
                         focus:ring-1 focus:ring-green-600" />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="px-3 py-2 border rounded-md text-sm
                         focus:outline-none focus:border-green-600
                         focus:ring-1 focus:ring-green-600"/>
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">
              Category
            </label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-2 border rounded-md text-sm
                         focus:outline-none focus:border-green-600
                         focus:ring-1 focus:ring-green-600" />
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="submit"
              className="bg-green-600 text-white
                         px-6 py-2 rounded-md font-semibold
                         hover:bg-green-700">
              Add Product
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/products-man")}
              className="bg-gray-500 text-white
                         px-6 py-2 rounded-md font-semibold
                         hover:bg-gray-600">
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

