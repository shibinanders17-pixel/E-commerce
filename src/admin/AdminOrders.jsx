

import { useEffect, useState } from "react";
import api from "../services/api";

const STATUS_OPTIONS = [
  "Pending🕐",
  "Shipped🚚",
  "Delivered✅",
  "Cancelled❌",
];

const statusColors = {
  "Pending🕐": "bg-yellow-100 text-yellow-700",
  "Shipped🚚": "bg-blue-100 text-blue-700",
  "Delivered✅": "bg-green-100 text-green-700",
  "Cancelled❌": "bg-red-100 text-red-700",
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/admin/orders");
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, status) => {
    try {
      await api.put(`/admin/orders/${orderId}`, { status });
      fetchOrders();
    } catch (err) {
      console.log(err);
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

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-1 h-7 bg-blue-600 rounded-full" />
        <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
      </div>

      {/* Top Gradient Bar */}
      <div className="bg-linear-0 from-yellow-500 to-orange-500
                      rounded-2xl p-5 mb-6 shadow-sm
                      flex items-center justify-between">
        <div>
          <p className="text-white font-bold text-base">Orders List</p>
          <p className="text-yellow-100 text-xs mt-0.5">
            Manage and update order statuses
          </p>
        </div>
        <span className="text-4xl">🛒</span>
      </div>

      {/* Table */}
      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
          <p className="text-gray-400 text-lg">No orders placed yet!</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-4 py-3 text-left text-xs font-semibold
                                 text-gray-500 uppercase">Order ID</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold
                                 text-gray-500 uppercase">Customer</th>
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
                    className="border-b hover:bg-gray-50 transition">

                    {/* Order ID */}
                    <td className="px-4 py-3 text-xs text-gray-400 font-mono">
                      #{order._id.slice(-6).toUpperCase()}
                    </td>

                    {/* Customer */}
                    <td className="px-4 py-3">
                      <p className="text-sm font-semibold text-gray-800">
                        {order.userName}
                      </p>
                      <p className="text-xs text-gray-400">{order.phone}</p>
                    </td>

                    {/* Products */}
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

                    {/* Total */}
                    <td className="px-4 py-3 text-sm font-bold text-gray-800">
                      ₹ {order.totalPrice?.toLocaleString("en-IN")}
                    </td>

                    {/* Payment */}
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-gray-100 text-gray-600
                                       rounded-lg text-xs font-semibold">
                        {order.paymentMethod}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-4 py-3 text-xs text-gray-500">
                      {new Date(order.purchaseDate).toLocaleDateString("en-IN")}
                    </td>

                    {/* Status Dropdown */}
                    <td className="px-4 py-3">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusUpdate(order._id, e.target.value)
                        }
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold
                                   outline-none border-0 cursor-pointer
                                   ${statusColors[order.status] ||
                                     "bg-gray-100 text-gray-700"}`}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
