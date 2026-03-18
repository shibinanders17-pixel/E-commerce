import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [currentPage, searchText, selectedCategory]);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/admin/products", {
        params: {
          page: currentPage,
          limit: 5,
          search: searchText || undefined,
          category: selectedCategory !== "All" ? selectedCategory : undefined
        },
      });
      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.delete(`/admin/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, selectedCategory]);

  const categoryColors = {
    iPhone: "bg-blue-100 text-blue-700",
    Samsung: "bg-cyan-100 text-cyan-700",
    Redmi: "bg-orange-100 text-orange-700",
    Realme: "bg-yellow-100 text-yellow-700",
    Poco: "bg-gray-100 text-gray-700",
    Vivo: "bg-purple-100 text-purple-700",
    Motorola: "bg-green-100 text-green-700",
  };

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-1 h-7 bg-blue-600 rounded-full" />
        <h1 className="text-2xl font-bold text-gray-800">Products</h1>
      </div>

      {/* Top Card — Gradient like Dashboard */}
      <div className="bg-linear-to-r from-blue-500 to-blue-600
                      rounded-2xl p-5 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-3 items-center">
          <input
            type="text"
            placeholder="🔍 Search products..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
              className="px-4 py-2.5 rounded-xl text-sm outline-none
           bg-white text-gray-700 placeholder-gray-400
           border border-gray-200 w-full md:w-64
           focus:border-blue-400 transition"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2.5 rounded-xl text-sm outline-none
           bg-white text-gray-700
           border border-gray-200
           focus:border-blue-400 transition"
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
            className="px-5 py-2.5 bg-white text-blue-600
                       rounded-xl text-sm font-bold
                       hover:bg-yellow-400 transition md:ml-auto
                       whitespace-nowrap"
          >
            + Add Product
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-linear-to-r from-gray-50 to-gray-100 border-b">
                <th className="px-4 py-3 text-left text-xs font-semibold
                               text-gray-500 uppercase">Image</th>
                <th className="px-4 py-3 text-left text-xs font-semibold
                               text-gray-500 uppercase">Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold
                               text-gray-500 uppercase">Category</th>
                <th className="px-4 py-3 text-left text-xs font-semibold
                               text-gray-500 uppercase">Price</th>
                <th className="px-4 py-3 text-left text-xs font-semibold
                               text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-gray-400">
                    No products found
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product._id}
                    className="border-b hover:bg-blue-50 transition">
                    <td className="px-4 py-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-14 h-14 object-contain
                                   rounded-xl bg-gray-50 p-1"
                      />
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-800">
                      {product.name}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${categoryColors[product.category] || "bg-gray-100 text-gray-700"}`}>
                        {product.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-bold text-gray-800">
                      ₹ {product.price.toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/admin/edit-product/${product._id}`)}
                          className="px-3 py-1.5 bg-blue-600 text-white
                                     rounded-lg text-xs font-semibold
                                     hover:bg-blue-700 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="px-3 py-1.5 bg-red-500 text-white
                                     rounded-lg text-xs font-semibold
                                     hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1.5 border rounded-lg text-sm
                       disabled:opacity-40 hover:bg-gray-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1.5 border rounded-lg text-sm
                ${currentPage === i + 1
                  ? "bg-blue-600 text-white border-blue-600"
                  : "hover:bg-gray-50"}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1.5 border rounded-lg text-sm
                       disabled:opacity-40 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}



