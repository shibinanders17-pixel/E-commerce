// import { useEffect, useState } from "react";
// import api from "../services/api";   // same api file you use in user side
// import { useNavigate } from "react-router-dom";

// export default function ProductManager() {
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();

//   // Get all products
//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = () => {
//     api.get("/products")
//       .then((res) => {
//         setProducts(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   // Delete product
//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       api.delete(`/products/${id}`)
//         .then(() => {
//           alert("Product deleted");
//           fetchProducts(); // refresh list
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//   };

//   return (
//     <div>
//       <h2>Product Manager</h2>

//       <button
//         onClick={() => navigate("/admin/add-product")}
//         style={{
//           padding: "8px 15px",
//           marginBottom: "20px",
//           background: "green",
//           color: "white",
//           border: "none",
//           borderRadius: "5px",
//           cursor: "pointer"
//         }}
//       >
//         + Add Product
//       </button>

//       <table border="1" cellPadding="10" style={{ width: "100%", textAlign: "center" }}>
//         <thead>
//           <tr>
//             <th>Image</th>
//             <th>Name</th>
//             <th>Price</th>
//             <th>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {products.map((product) => (
//             <tr key={product.id}>
//               <td>
//                 <img src={product.image} width="60" />
//               </td>
//               <td>{product.name}</td>
//               <td>₹ {product.price}</td>
//               <td>
//                 <button
//                   onClick={() => navigate(`/admin/edit-product/${product.id}`)}
//                   style={{ marginRight: "10px" }}
//                 >
//                   Edit
//                 </button>

//                 <button
//                   onClick={() => handleDelete(product.id)}
//                   style={{ background: "red", color: "white" }}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/products")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Delete this product?")) return;

    api.delete(`/products/${id}`).then(() => {
      setProducts(products.filter(p => p.id !== id));
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Product Manager</h2>
        <button
          onClick={() => navigate("/admin/add-product")}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          + Add Product
        </button>
      </div>

      {/* Table Wrapper */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-3">Image</th>
              <th className="border p-3">Name</th>
              <th className="border p-3">Price</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="border p-3 text-center">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-16 h-16 object-contain mx-auto"
                  />
                </td>

                <td className="border p-3 text-center font-semibold">
                  {p.name}
                </td>

                <td className="border p-3 text-center text-green-600 font-bold">
                  ₹ {p.price}
                </td>

                <td className="border p-3 text-center">
                  <button
                    onClick={() => navigate(`/admin/edit-product/${p.id}`)}
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No products available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
