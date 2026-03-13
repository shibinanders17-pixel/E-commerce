// import { useEffect, useState } from "react";
// import api from "../services/api";
// import { useNavigate } from "react-router-dom";

// export default function ProductManager() {
//   const [products, setProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [searchText, setSearchText] = useState("");

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = () => {
//       api.get("/products").then((res) => setProducts(res.data))
//       .catch((err) => console.log(err));
//   };

//   const filteredProducts = products.filter((product) => {
//     const matchesCategory = selectedCategory === "All" ||
//       product.category === selectedCategory;

//     const matchesSearch =
//       product.name.toLowerCase().includes(searchText.toLowerCase()) ||
//       product.specs.toLowerCase().includes(searchText.toLowerCase()) ||
//       product.description.toLowerCase().includes(searchText.toLowerCase());

//     return matchesCategory && matchesSearch;
//   });

//   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;

//   const currentProducts = filteredProducts.slice(startIndex, endIndex);

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//        api.delete(`/products/${id}`).then(() => {
//           alert("Product deleted"); 
//           fetchProducts();
//         })
//         .catch((err) => console.log(err));
//     }
//   };

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchText, selectedCategory]);

//   return (
//     <div className="min-h-screen bg-gray-50 py-6">

//       <div className="flex flex-col items-center gap-4 mb-6
//                       bg-purple-50 py-6 px-3">
//         <h2 className="text-2xl md:text-4xl font-extrabold
//                        text-purple-700 border-b-4
//                        border-purple-700 pb-1">
//           Product Manager
//         </h2>

//         <div className="flex flex-col md:flex-row gap-4 items-center">

//           <input
//             type="text"
//             placeholder="Search products..."
//             value={searchText}
//             onChange={(e) => setSearchText(e.target.value)}
//             className="px-3 py-2 border rounded-md text-sm
//                        w-60 outline-none
//                        focus:ring-2 focus:ring-purple-400" />

//           <select
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//             className="px-3 py-2 border rounded-md text-sm" >
//             <option value="All">All Brands</option>
//             <option value="iPhone">iPhone</option>
//             <option value="Samsung">Samsung</option>
//             <option value="Redmi">Redmi</option>
//             <option value="Realme">Realme</option>
//             <option value="Poco">Poco</option>
//             <option value="Vivo">Vivo</option>
//             <option value="Motorola">Motorola</option>
//           </select>

//           <button
//             onClick={() => navigate("/admin/add-product")}
//             className="px-5 py-2 bg-green-600 text-white
//                        rounded-md text-sm
//                        hover:bg-green-700" >
//             + Add Product
//           </button>
//         </div>
//       </div>

//       <div className="overflow-x-auto px-3">
//         <table
//           className="min-w-275 mx-auto bg-white
//                      border-collapse shadow-md
//                      rounded-lg overflow-hidden"
//         >
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border px-3 py-3 text-xs md:text-sm">Image</th>
//               <th className="border px-3 py-3 text-xs md:text-sm">Name</th>
//               <th className="border px-3 py-3 text-xs md:text-sm">Price</th>
//               <th className="border px-3 py-3 text-xs md:text-sm">Specs</th>
//               <th className="border px-3 py-3 text-xs md:text-sm">Description</th>
//               <th className="border px-3 py-3 text-xs md:text-sm">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {currentProducts.length === 0 ? (
//               <tr>
//                 <td colSpan="6" className="text-center py-6 text-gray-500">
//                   No products found
//                 </td>
//               </tr>
//             ) : (
//               currentProducts.map((product) => (
//                 <tr key={product.id} className="text-center hover:bg-gray-100">
//                   <td className="border px-2 py-2">
//                     <img
//                       src={product.image}
//                       alt={product.name}
//                       className="w-17.5 h-auto object-contain
//                                  mx-auto bg-gray-50 p-1 rounded"
//                     />
//                   </td>

//                   <td className="border px-2 py-2 text-xs md:text-sm">
//                     {product.name}
//                   </td>

//                   <td className="border px-2 py-2 text-xs md:text-sm">
//                     ₹ {product.price}
//                   </td>

//                   <td className="border px-2 py-2 max-w-70 truncate text-xs md:text-sm">
//                     {product.specs}
//                   </td>

//                   <td className="border px-2 py-2 max-w-70 truncate text-xs md:text-sm">
//                     {product.description}
//                   </td>

//                   <td className="border px-2 py-2">
//                     <div className="flex flex-col md:flex-row gap-2 justify-center">
//                       <button
//                         onClick={() =>
//                           navigate(`/admin/edit-product/${product.id}`)
//                         }
//                         className="px-3 py-1 bg-blue-600 text-white
//                                    rounded-md text-xs md:text-sm
//                                    hover:bg-blue-700"
//                       >
//                         Edit
//                       </button>

//                       <button
//                         onClick={() => handleDelete(product.id)}
//                         className="px-3 py-1 bg-red-600 text-white
//                                    rounded-md text-xs md:text-sm
//                                    hover:bg-red-700" > Delete
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {totalPages > 1 && (
//         <div className="flex justify-center gap-2 mt-6">
//           <button
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage((p) => p - 1)}
//             className="px-3 py-1 border rounded
//                        disabled:opacity-40"
//           >
//             Prev
//           </button>

//           {[...Array(totalPages)].map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setCurrentPage(i + 1)}
//               className={`px-3 py-1 border rounded
//                 ${currentPage === i + 1
//                   ? "bg-purple-600 text-white"
//                   : "bg-white"}`}
//             >
//               {i + 1}
//             </button>
//           ))}

//           <button
//             disabled={currentPage === totalPages}
//             onClick={() => setCurrentPage((p) => p + 1)}
//             className="px-3 py-1 border rounded
//                        disabled:opacity-40"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }



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
          category: selectedCategory !== "All" ? selectedCategory : undefined,
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
