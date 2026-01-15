import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "./EditProduct.css";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [specs, setSpecs] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("")

  // Fetch existing product
  useEffect(() => {
    api.get(`/products/${id}`)
      .then((res) => {
        const p = res.data;
        setName(p.name);
        setPrice(p.price);
        setImage(p.image);
        setSpecs(p.specs);
        setDescription(p.description);
        setCategory(p.category)
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to load product");
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
    <div className="edit-container">
      <div className="edit-card">
        <h2 className="edit-title">Edit Product</h2>

        <form onSubmit={handleUpdate}>
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />

          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <label>Image URL</label>
          <input value={image} onChange={(e) => setImage(e.target.value)} />

          <label>Specs</label>
          <textarea
            rows="4"
            value={specs}
            onChange={(e) => setSpecs(e.target.value)}
          />

          <label>Description</label>
          <textarea
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

           <label>Description</label>
          <input
            value={category}
            onChange={(e) => setDescription(e.target.value)}
          />
          
          <div className="edit-actions">
            <button type="submit" className="update-btn">
              Update Product
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/admin/products-man")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
