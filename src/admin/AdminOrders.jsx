
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate(); 
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPayment, setFilterPayment] = useState("All");

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

  
  const filteredOrders = orders.filter((order) => {
    const matchSearch =
      order.userName?.toLowerCase().includes(searchText.toLowerCase()) ||
      order._id.slice(-6).toUpperCase().includes(searchText.toUpperCase());
    const matchStatus =
      filterStatus === "All" || order.status === filterStatus;
    const matchPayment =
      filterPayment === "All" || order.paymentMethod === filterPayment;
    return matchSearch && matchStatus && matchPayment;
  });

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

      {/* Top Gradient Bar — Search + Filters */}
      <div className="bg-linear-0 from-yellow-500 to-orange-500
                      rounded-2xl p-5 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-3 items-center">

          {/* Search */}
          <input
            type="text"
            placeholder="🔍 Search by name or order ID..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="px-4 py-2.5 rounded-xl text-sm outline-none
                       bg-white text-gray-700 placeholder-gray-400
                       border border-gray-200 w-full md:w-64
                       focus:border-yellow-400 transition"
          />

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 rounded-xl text-sm outline-none
                       bg-white text-gray-700
                       border border-gray-200
                       focus:border-yellow-400 transition"
          >
            <option value="All">All Status</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          {/* Payment Filter */}
          <select
            value={filterPayment}
            onChange={(e) => setFilterPayment(e.target.value)}
            className="px-4 py-2.5 rounded-xl text-sm outline-none
                       bg-white text-gray-700
                       border border-gray-200
                       focus:border-yellow-400 transition"
          >
            <option value="All">All Payments</option>
            <option value="UPI">UPI</option>
            <option value="Card">Card</option>
            <option value="COD">COD</option>
          </select>

          {/* Results count */}
          <p className="text-white text-xs font-semibold md:ml-auto whitespace-nowrap">
            {filteredOrders.length} orders found
          </p>

        </div>
      </div>

      {/* Table */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
          <p className="text-gray-400 text-lg">No orders found!</p>
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
                {filteredOrders.map((order) => (
                  // <tr key={order._id}
                  //   className="border-b hover:bg-gray-50 transition">
                  <tr key={order._id}
                      onClick={() => navigate(`/admin/orders/${order._id}`)}
                      className="border-b hover:bg-gray-50 transition cursor-pointer">

                    <td className="px-4 py-3 text-xs text-gray-400 font-mono">
                      #{order._id.slice(-6).toUpperCase()}
                    </td>

                    <td className="px-4 py-3">
                      <p className="text-sm font-semibold text-gray-800">
                        {order.userName}
                      </p>
                      <p className="text-xs text-gray-400">{order.phone}</p>
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
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusUpdate(order._id, e.target.value)
                          
                        }
                        onClick={(e) => e.stopPropagation()}
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