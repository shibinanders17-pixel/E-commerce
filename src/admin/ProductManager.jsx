import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    api
      .get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      api
        .delete(`/products/${id}`)
        .then(() => {
          alert("Product deleted");
          fetchProducts();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">

      <div className="flex flex-col items-center gap-4 mb-6
                      bg-purple-50 py-6 px-3">
        <h2 className="text-2xl md:text-4xl font-extrabold
                       text-purple-700 border-b-4
                       border-purple-700 pb-1">
          Product Manager
        </h2>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm"
          >
            <option value="All">All Brands</option>
            <option value="iPhone">iPhone</option>
            <option value="Samsung">Samsung</option>
            <option value="Redmi">Redmi</option>
            <option value="Realme">Realme</option>
            <option value="Poco">Poco</option>
            <option value="Vivo">Vivo</option>
            <option value="Motorola">Motorola</option>
          </select>

          <button
            onClick={() => navigate("/admin/add-product")}
            className="px-5 py-2 bg-green-600 text-white
                       rounded-md text-sm
                       hover:bg-green-700"
          >
            + Add Product
          </button>
        </div>
      </div>

      <div className="overflow-x-auto px-3">
        <table
          className="min-w-275 mx-auto bg-white
                     border-collapse shadow-md
                     rounded-lg overflow-hidden"
        >
           <thead>
            <tr className="bg-gray-100">
              <th className="border px-3 py-3 md:px-3 md:py-3
                         text-xs md:text-sm">Image</th>
              <th className="border px-3 py-3 md:px-3 md:py-3
                         text-xs md:text-sm">Name</th>
              <th className="border px-3 py-3 md:px-3 md:py-3
                         text-xs md:text-sm">Price</th>
              <th className="border px-3 py-3 md:px-3 md:py-3
                         text-xs md:text-sm">Specs</th>
              <th className="border px-3 py-3 md:px-3 md:py-3
                         text-xs md:text-sm">Description</th>
              <th className="border px-3 py-3 md:px-3 md:py-3
                         text-xs md:text-sm">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product) => (
              <tr
                key={product.id}
                className="text-center hover:bg-gray-100"
              >
                <td className="border px-2 py-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-17.5 h-auto
                               object-contain mx-auto
                               bg-gray-50 p-1 rounded"
                  />
                </td>

                <td className="border px-2 py-2 text-xs md:text-sm">
                  {product.name}
                </td>

                <td className="border px-2 py-2 text-xs md:text-sm">
                  ₹ {product.price}
                </td>

                <td className="border px-2 py-2 max-w-70
                               truncate text-xs md:text-sm">
                  {product.specs}
                </td>

                <td className="border px-2 py-2 max-w-70
                               truncate text-xs md:text-sm">
                  {product.description}
                </td>

                <td className="border px-2 py-2">
                  <div className="flex flex-col md:flex-row
                                  gap-2 justify-center">
                    <button
                      onClick={() =>
                        navigate(`/admin/edit-product/${product.id}`)
                      }
                      className="px-3 py-1 bg-blue-600 text-white
                                 rounded-md text-xs md:text-sm
                                 hover:bg-blue-700"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(product.id)}
                      className="px-3 py-1 bg-red-600 text-white
                                 rounded-md text-xs md:text-sm
                                 hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
