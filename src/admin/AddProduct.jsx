import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./AddProduct.css";

export default function AddProduct() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [specs, setSpecs] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !image || !specs || !description || !category) {
      alert("All fields are required da!");
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
      alert("Something went wrong da");
    }
  };

  return (
    <div className="add-product-page">
      <div className="add-product-card">
        <h2>Add New Product</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Image URL</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Specs</label>
            <textarea
              rows="3"
              value={specs}
              onChange={(e) => setSpecs(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

           <div className="form-group">
            <label>Category</label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="btn-group">
            <button type="submit" className="btn-primary">
              Add Product
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/products-man")}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
