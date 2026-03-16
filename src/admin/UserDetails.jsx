import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

const statusColors = {
  "Pending🕐": "bg-yellow-100 text-yellow-700",
  "Shipped🚚": "bg-blue-100 text-blue-700",
  "Delivered✅": "bg-green-100 text-green-700",
  "Cancelled❌": "bg-red-100 text-red-700",
};

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserDetails();
  }, [id]);

  const fetchUserDetails = async () => {
    try {
      const res = await api.get(`/admin/users/${id}`);
      setUser(res.data.user);
      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="w-12 h-12 border-4 border-blue-500
                        border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6 text-center text-gray-400">
        User not found!
      </div>
    );
  }

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-1 h-7 bg-blue-600 rounded-full" />
          <h1 className="text-2xl font-bold text-gray-800">User Details</h1>
        </div>
        <button
          onClick={() => navigate("/admin/users")}
          className="px-4 py-2 bg-white border border-gray-200
                     text-gray-600 rounded-xl text-sm font-semibold
                     hover:bg-gray-50 transition shadow-sm"
        >
          ← Back to Users
        </button>
      </div>

      {/* User Info Card */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-5">

        {/* Gradient Header */}
        <div className="bg-linear-0 from-green-500 to-green-600
                        p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-white/30
                          flex items-center justify-center
                          text-white font-bold text-2xl">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-white font-bold text-lg">{user.name}</p>
            <p className="text-green-100 text-xs">{user.email}</p>
          </div>
        </div>

        {/* User Details */}
        <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Phone
            </p>
            <p className="text-sm font-semibold text-gray-800 mt-1">
              {user.phone || "—"}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Pincode
            </p>
            <p className="text-sm font-semibold text-gray-800 mt-1">
              {user.pincode || "—"}
            </p>
          </div>

            <div>
               <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                 Email
              </p>
              <p className="text-sm font-semibold text-gray-800 mt-1">
                {user.username || "—"}
             </p>
          </div>

          <div className="col-span-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Address
            </p>
            <p className="text-sm font-semibold text-gray-800 mt-1">
              {user.address || "—"}
            </p>
          </div>
        </div>

      </div>

      {/* Orders Card */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

        {/* Gradient Header */}
        <div className="bg-linear-0 from-blue-500 to-blue-600
                        px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🛒</span>
            <p className="text-white font-semibold text-sm">Order History</p>
          </div>
          <span className="bg-white/20 text-white text-xs
                           font-bold px-3 py-1 rounded-full">
            {orders.length} orders
          </span>
        </div>

        {orders.length === 0 ? (
          <div className="p-10 text-center text-gray-400">
            No orders placed yet!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-4 py-3 text-left text-xs font-semibold
                                 text-gray-500 uppercase">Order ID</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold
                                 text-gray-500 uppercase">Products</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold
                                 text-gray-500 uppercase">Total</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold
                                 text-gray-500 uppercase">Payment</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold
                                 text-gray-500 uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold
                                 text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}
                    className="border-b hover:bg-blue-50 transition">

                    <td className="px-4 py-3 text-xs text-gray-400 font-mono">
                      #{order._id.slice(-6).toUpperCase()}
                    </td>

                    <td className="px-4 py-3">
                      <p className="text-sm text-gray-700">
                        {order.products?.[0]?.name}
                      </p>
                      {order.products?.length > 1 && (
                        <p className="text-xs text-gray-400">
                          +{order.products.length - 1} more
                        </p>
                      )}
                    </td>

                    <td className="px-4 py-3 text-sm font-bold text-gray-800">
                      ₹ {order.totalPrice?.toLocaleString("en-IN")}
                    </td>

                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-gray-100 text-gray-600
                                       rounded-lg text-xs font-semibold">
                        {order.paymentMethod}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-xs text-gray-500">
                      {new Date(order.purchaseDate).toLocaleDateString("en-IN")}
                    </td>

                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${statusColors[order.status] || "bg-gray-100 text-gray-700"}`}>
                        {order.status}
                      </span>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}

