import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [specs, setSpecs] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => {
      const p = res.data;
      setName(p.name);
      setPrice(p.price);
      setImage(p.image);
      setSpecs(p.specs);
      setDescription(p.description);
      setCategory(p.category);
    });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name || !price || !image || !specs || !description || !category) {
      alert("All fields are required !");
      return;
    }

    const updatedProduct = {
      name,
      price: Number(price),
      image,
      specs,
      description,
      category,
    };

    try {
      await api.put(`/products/${id}`, updatedProduct);
      alert("Product Updated Successfully 🔥");
      navigate("/admin/products-man");
    } catch (error) {
      console.log(error);
      alert("Error updating product");
    }
  };

  return (
    <div className="min-h-screen bg-purple-50 py-10 px-4">

      <h1 className="text-center text-3xl font-extrabold text-purple-700 mb-8">
        Edit Product
      </h1>

       <div className="max-w-xl mx-auto bg-white rounded-xl shadow-2xl px-8 py-7">

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-10 px-3 border rounded-md
                         focus:outline-none focus:ring-2 focus:ring-purple-400" />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full h-10 px-3 border rounded-md
                         focus:outline-none focus:ring-2 focus:ring-purple-400" />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Image URL</label>
            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full h-10 px-3 border rounded-md
                         focus:outline-none focus:ring-2 focus:ring-purple-400" />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Specs</label>
            <textarea
              rows="4"
              value={specs}
              onChange={(e) => setSpecs(e.target.value)}
              className="w-full px-3 py-2 border rounded-md
                         focus:outline-none focus:ring-2 focus:ring-purple-400"/>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Description</label>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-md
                         focus:outline-none focus:ring-2 focus:ring-purple-400"/>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Category</label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-10 px-3 border rounded-md
                         focus:outline-none focus:ring-2 focus:ring-purple-400" />
          </div>

          <div className="flex justify-between pt-5">
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white
                         rounded-md hover:bg-green-700" >
              Update Product
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/products-man")}
              className="px-6 py-2 bg-gray-500 text-white
                         rounded-md hover:bg-gray-600" >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
