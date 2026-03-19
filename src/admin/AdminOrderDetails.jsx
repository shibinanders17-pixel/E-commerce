import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

const STATUS_OPTIONS = [
  "Pending⏳",
  "Shipped🚚",
  "Delivered✅",
  "Cancelled❌",
];

const statusColors = {
  "Pending⏳": "bg-yellow-100 text-yellow-700",
  "Shipped🚚": "bg-blue-100 text-blue-700",
  "Delivered✅": "bg-green-100 text-green-700",
  "Cancelled❌": "bg-red-100 text-red-700",
};

export default function AdminOrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const res = await api.get(`/admin/orders/${id}`);
      setOrder(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (status) => {
    try {
      await api.put(`/admin/orders/${id}`, { status });
      fetchOrder();
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

  if (!order) {
    return (
      <div className="p-6 text-center text-gray-400 text-lg">
        Order not found!
      </div>
    );
  }

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-1 h-7 bg-blue-600 rounded-full" />
          <h1 className="text-2xl font-bold text-gray-800">Order Details</h1>
        </div>
        <button
          onClick={() => navigate("/admin/orders")}
          className="px-4 py-2 bg-white border border-gray-200
                     text-gray-600 rounded-xl text-sm font-semibold
                     hover:bg-gray-50 transition shadow-sm"
        >
          ← Back to Orders
        </button>
      </div>

      {/* Order ID + Status Card */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-5">
        <div className="bg-linear-to-r from-yellow-500 to-orange-500
                        px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-white text-xs font-semibold opacity-80 uppercase tracking-wider">
              Order ID
            </p>
            <p className="text-white font-bold text-lg font-mono">
              #{order._id.slice(-8).toUpperCase()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-white text-xs font-semibold opacity-80 uppercase tracking-wider mb-1">
              Status
            </p>
            <select
              value={order.status}
              onChange={(e) => handleStatusUpdate(e.target.value)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold
                         outline-none border-0 cursor-pointer
                         ${statusColors[order.status] || "bg-gray-100 text-gray-700"}`}
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Order Date
            </p>
            <p className="text-sm font-semibold text-gray-800 mt-1">
              {new Date(order.purchaseDate).toLocaleDateString("en-IN", {
                day: "numeric", month: "short", year: "numeric"
              })}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Payment Method
            </p>
            <p className="text-sm font-semibold text-gray-800 mt-1">
              {order.paymentMethod === "COD" ? "💵 Cash on Delivery"
                : order.paymentMethod === "UPI" ? "💳 UPI"
                : "🏦 Card"}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Total Items
            </p>
            <p className="text-sm font-semibold text-gray-800 mt-1">
              {order.totalItems}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Total Amount
            </p>
            <p className="text-lg font-bold text-orange-600 mt-1">
              ₹ {order.totalPrice?.toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </div>

      {/* Customer Info Card */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-5">
        <div className="bg-linear-to-r from-green-500 to-green-600
                        px-5 py-3 flex items-center gap-2">
          <span className="text-lg">👤</span>
          <p className="text-white font-semibold text-sm">Customer & Delivery Info</p>
        </div>
        <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Customer Name
            </p>
            
            <p className="text-sm font-semibold text-gray-800 mt-1">
              {order.userName}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Email
           </p>
            <p className="text-sm font-semibold text-gray-800 mt-1">
              {order.userId?.username || "—"}
           </p>
        </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Phone
            </p>
            <p className="text-sm font-semibold text-gray-800 mt-1">
              {order.phone}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Pincode
            </p>
            <p className="text-sm font-semibold text-gray-800 mt-1">
              {order.pincode || "—"}
            </p>
          </div>
          <div className="md:col-span-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Delivery Address
            </p>
            <p className="text-sm font-semibold text-gray-800 mt-1">
              {order.address}
            </p>
          </div>
        </div>
      </div>

      {/* Products Card */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-linear-to-r from-blue-500 to-blue-600
                        px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">📦</span>
            <p className="text-white font-semibold text-sm">Ordered Products</p>
          </div>
          <span className="bg-white/20 text-white text-xs
                           font-bold px-3 py-1 rounded-full">
            {order.products?.length} product{order.products?.length > 1 ? "s" : ""}
          </span>
        </div>

        <div className="p-5 flex flex-col gap-4">
          {order.products?.map((product, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 bg-gray-50
                         rounded-xl border border-gray-100"
            >
              {/* Product Image */}
              <div className="w-16 h-16 bg-white rounded-xl
                              flex items-center justify-center
                              border border-gray-200 shrink-0">
                {product.image ? (
                  <img
                    src={`http://localhost:5002${product.image}`}
                    alt={product.name}
                    className="w-12 h-12 object-contain"
                  />
                ) : (
                  <span className="text-2xl">📱</span>
                )}
              </div>

              {/* Product Info */}
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">
                  {product.name}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Qty: {product.quantity}
                </p>
                <p className="text-xs text-blue-500 mt-0.5 cursor-pointer hover:underline"
                   onClick={() => navigate(`/productsDet/${product.productId}`, "_blank")}>
                  View Product →
               </p>
              </div>

              {/* Price */}
              <div className="text-right">
                <p className="text-sm font-bold text-gray-800">
                  ₹ {product.price?.toLocaleString("en-IN")}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Subtotal: ₹ {(product.price * product.quantity)?.toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          ))}

          {/* Total */}
          <div className="flex justify-between items-center
                          pt-4 border-t border-dashed border-gray-200">
            <p className="text-sm font-semibold text-gray-500">Grand Total</p>
            <p className="text-xl font-bold text-orange-600">
              ₹ {order.totalPrice?.toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}