import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function UserDetails() {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const orders = [
    {
      id: 101,
      product: "iPhone 15",
      price: 80000,
      status: "Delivered",
    },
    {
      id: 102,
      product: "Samsung S24",
      price: 65000,
      status: "Delivered",
    },
  ];

  useEffect(() => {
    fetchUserDetails();
  }, [id]);

  const fetchUserDetails = async () => {
    try {
      await api.get(`/users/${id}`).then((res) => {
        setUser(res.data);
      });
    } catch (error) {
      console.log("Error fetching user details", error);
    }
  };

  if (!user) {
    return (
      <h2 className="text-center text-xl font-semibold p-6">
        User not found
      </h2>
    );
  }

  return (
    <div
      className="min-h-screen p-8 text-center
                 bg-red-50"
    >
      <h2
        className="text-4xl font-extrabold text-black
                   border-b-4 border-purple-700
                   inline-block pb-2 mb-6"
      >
        User Details 👤
      </h2>

      <div
        className="max-w-md mx-auto mb-10
                   bg-white rounded-xl shadow-xl
                   px-8 py-6 text-left"
      >
        <p className="mb-2">
          <strong>Name:</strong> {user.name}
        </p>
        <p className="mb-2">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="mb-2">
          <strong>Phone:</strong> {user.phone}
        </p>
        <p className="mb-2">
          <strong>Pincode:</strong> {user.pincode}
        </p>
         <p className="mb-2">
            <strong>Address:</strong> {user.address}
        </p>
       </div>

      <h3 className="text-2xl font-bold text-red-700 mb-4">
        Previous Orders
      </h3>

      <div className="overflow-x-auto">
        <table
          className="w-[50%] mx-auto bg-white
                     border-collapse
                     shadow-lg rounded-lg overflow-hidden"
        >
          <thead>
            <tr className="bg-purple-100">
              <th className="border px-4 py-2">Order ID</th>
              <th className="border px-4 py-2">Product</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-purple-50 transition"
              >
                <td className="border px-4 py-2">
                  {order.id}
                </td>
                <td className="border px-4 py-2">
                  {order.product}
                </td>
                <td className="border px-4 py-2">
                  ₹ {order.price}
                </td>
                <td className="border px-4 py-2 font-semibold text-green-700">
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="mt-8 px-6 py-2
                   bg-blue-600 text-white
                   rounded-md font-semibold
                   hover:bg-blue-700"
      >
        ← Back
      </button>
    </div>
  );
}
