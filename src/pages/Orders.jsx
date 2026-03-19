
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

// Estimated delivery calculate
const getDeliveryInfo = (order) => {
  const orderDate = new Date(order.purchaseDate);
  const estimatedDate = new Date(orderDate);
  estimatedDate.setDate(orderDate.getDate() + 5);
  const formatted = estimatedDate.toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric"
  });

  if (order.status.includes("Cancelled")) return null;
  if (order.status.includes("Delivered"))
    return { label: "✅ Delivered on", date: orderDate.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }), color: "text-green-600" };
  if (order.status.includes("Shipped"))
    return { label: "🚚 Expected by", date: formatted, color: "text-blue-600" };
  return { label: "📦 Estimated delivery", date: formatted, color: "text-orange-500" };
};

export default function Orders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/users/orders");
      setOrders(res.data);
    } catch (error) {
      console.log("Orders fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId) => {
    if (!window.confirm("Cancel this order?")) return;
    try {
      const res = await api.put(`/users/orders/${orderId}/cancel`);
      const { paymentMethod, refundAmount } = res.data;
      if (paymentMethod === "UPI" || paymentMethod === "Card") {
        alert("Order cancelled! ✅ ₹" + refundAmount.toLocaleString("en-IN") + " refunded to your wallet 💰");
      } else {
        alert("Order cancelled! ✅ (COD order — no refund applicable)");
      }
      fetchOrders();
    } catch (error) {
      console.log("Cancel error:", error);
      alert("Failed to cancel order!");
    }
  };

  const getStatusColor = (status) => {
    if (status.includes("Pending")) return "bg-yellow-100 text-yellow-700";
    if (status.includes("Delivered")) return "bg-green-100 text-green-700";
    if (status.includes("Cancelled")) return "bg-red-100 text-red-700";
    if (status.includes("Shipped")) return "bg-blue-100 text-blue-700";
    return "bg-gray-100 text-gray-600";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent
                          rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-sm p-12">
          <div className="text-7xl mb-4">📦</div>
          <h2 className="text-xl font-bold text-gray-700 mb-2">
            No orders yet!
          </h2>
          <p className="text-gray-400 mb-6">
            Start shopping to see your orders here
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-red-500 text-white
                       rounded-xl font-semibold hover:bg-red-600 transition"
          >
            Shop Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-6 px-4 md:px-10">

      <p className="text-sm text-gray-400 mb-4">
        <span
          className="hover:text-red-500 cursor-pointer transition"
          onClick={() => navigate("/")}
        >
          🏠 Home
        </span>
        <span className="mx-2">/</span>
        <span className="text-gray-600 font-medium">My Orders</span>
      </p>

      <div className="flex items-center gap-2 mb-6">
        <div className="w-1 h-7 bg-red-500 rounded-full" />
        <h2 className="text-xl font-bold text-gray-800">
          My Orders
          <span className="text-sm font-normal text-gray-400 ml-2">
            ({orders.length} {orders.length === 1 ? "order" : "orders"})
          </span>
        </h2>
      </div>

      <div className="flex flex-col gap-4 max-w-4xl mx-auto">

        {orders.map((order, index) => (
          <div
            key={order._id}
            onClick={() => navigate(`/orders/${order._id}`)}
            className="bg-white rounded-2xl shadow-sm p-5
             hover:shadow-md transition-shadow cursor-pointer"
           >

            <div className="flex flex-wrap items-center justify-between
                            gap-3 mb-4 pb-3 border-b border-gray-100">
              <div>
                <p className="text-xs text-gray-400">
                  Order #{orders.length - index}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  📅 {new Date(order.purchaseDate).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold px-3 py-1
                                 rounded-full ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
                {order.status.includes("Pending") && (
                  <button
                    onClick={() => cancelOrder(order._id)}
                    className="text-xs font-semibold px-3 py-1 rounded-full
                               bg-red-50 text-red-500 border border-red-300
                               hover:bg-red-100 transition"
                  >
                    Cancel order
                  </button>
                )}
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <div className="w-20 h-20 bg-gray-50 rounded-xl
                              flex items-center justify-center shrink-0">
                {order.products?.[0]?.image ? (
                  <img
                    src={`http://localhost:5002${order.products[0].image}`}
                    alt={order.products[0].name}
                    className="w-16 h-16 object-contain"
                  />
                ) : (
                  <span className="text-3xl">📱</span>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">
                  {order.products?.[0]?.name}
                  {order.products?.length > 1 && (
                    <span className="text-sm text-gray-400 ml-1">
                      +{order.products.length - 1} more
                    </span>
                  )}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Total Items: {order.totalItems}
                </p>
                <p className="text-red-500 font-bold mt-1">
                  Total: ₹ {order.totalPrice?.toLocaleString("en-IN")}
                </p>
              </div>
            </div>

            {/* ✅ Delivery Info */}
            {getDeliveryInfo(order) && (
              <div className="mt-3 px-3 py-2 bg-gray-50 rounded-xl
                              flex items-center gap-2">
                <span className={`text-xs font-semibold ${getDeliveryInfo(order).color}`}>
                  {getDeliveryInfo(order).label}: {getDeliveryInfo(order).date}
                </span>
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-gray-100
                            grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  Deliver To
                </p>
                <p className="text-sm text-gray-700 mt-1 font-medium">
                  {order.userName}
                </p>
                <p className="text-xs text-gray-500">
                  {order.address}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  Phone
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  {order.phone}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  Payment
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  {order.paymentMethod === "COD" ? "💵 Cash on Delivery"
                    : order.paymentMethod === "UPI" ? "💳 UPI"
                    : "🏦 Card"}
                </p>
              </div>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}