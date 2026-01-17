import { useEffect, useState } from "react";
import api from "../services/api"; 
import { useNavigate } from "react-router-dom";
import "./ProductManager.css"

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    api.get("/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filteredProducts =
  selectedCategory === "All"
    ? products
    : products.filter((p) => p.category === selectedCategory);


  // Delete product
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      api.delete(`/products/${id}`)
        .then(() => {
          alert("Product deleted");
          fetchProducts();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

return (
  <div className="pm-container">

    <div className="pm-header">
      <h2 className="pm-title">Product Manager</h2>

      <div className="pm-actions">
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          <option value="All">All Brands</option>
          <option value="iPhone">iPhone</option>
          <option value="Samsung">Samsung</option>
          <option value="Redmi">Redmi</option>
          <option value="Realme">Realme</option>
          <option value="OnePlus">OnePlus</option>
          <option value="Poco">Poco</option>
          <option value="Vivo">Vivo</option>
          <option value="Motorola">Motorola</option>
        </select>

        <button
          onClick={() => navigate("/admin/add-product")}
          className="add-btn"
        >
          + Add Product
        </button>
      </div>
    </div>

    <table className="pm-table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
          <th>Specs</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {filteredProducts.map((product) => (
          <tr key={product.id}>
            <td>
              <img src={product.image} className="pm-image" />
            </td>
            <td>{product.name}</td>
            <td>₹ {product.price}</td>
            <td className="specs-cell">{product.specs}</td>
            <td className="desc-cell">{product.description}</td>
            <td>
              <button
                onClick={() => navigate(`/admin/edit-product/${product.id}`)}
                className="edit-btn"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(product.id)}
                className="delete-btn"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

  </div>
);
};