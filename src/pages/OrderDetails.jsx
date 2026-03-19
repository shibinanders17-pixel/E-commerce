import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

const statusConfig = {
  "Pending⏳":   { bg: "bg-amber-100",   text: "text-amber-700",   dot: "bg-amber-400"   },
  "Shipped🚚":   { bg: "bg-sky-100",     text: "text-sky-700",     dot: "bg-sky-400"     },
  "Delivered✅": { bg: "bg-emerald-100", text: "text-emerald-700", dot: "bg-emerald-400" },
  "Cancelled❌": { bg: "bg-rose-100",    text: "text-rose-700",    dot: "bg-rose-400"    },
};

const timelineSteps = [
  { label: "Order Placed", icon: "🧾", desc: "We received your order"   },
  { label: "Processing",   icon: "⏳", desc: "Order is being prepared"  },
  { label: "Shipped",      icon: "🚚", desc: "On the way to you"        },
  { label: "Delivered",    icon: "✅", desc: "Enjoy your purchase!"     },
];

const getActiveStep = (status) => {
  if (status?.includes("Delivered")) return 3;
  if (status?.includes("Shipped"))   return 2;
  if (status?.includes("Pending"))   return 1;
  return 0;
};

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder]         = useState(null);
  const [loading, setLoading]     = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving]       = useState(false);
  const [editForm, setEditForm]   = useState({
    userName: "", phone: "", address: "", pincode: ""
  });

  useEffect(() => { fetchOrder(); }, [id]);

  const fetchOrder = async () => {
    try {
      const res = await api.get(`/users/orders/${id}`);
      setOrder(res.data);
    } catch (err) { console.log(err); }
    finally { setLoading(false); }
  };

  const cancelOrder = async () => {
    if (!window.confirm("Cancel this order?")) return;
    try {
      const res = await api.put(`/users/orders/${id}/cancel`);
      const { paymentMethod, refundAmount } = res.data;
      if (paymentMethod === "UPI" || paymentMethod === "Card") {
        alert(`Order cancelled! ✅ ₹${refundAmount?.toLocaleString("en-IN")} refunded to your wallet 💰`);
      } else {
        alert("Order cancelled! ✅ (COD order — no refund applicable)");
      }
      fetchOrder();
    } catch { alert("Failed to cancel order!"); }
  };

  const handleEditClick = () => {
    setEditForm({ userName: order.userName, phone: order.phone, address: order.address, pincode: order.pincode || "" });
    setIsEditing(true);
  };

  const handleSaveDelivery = async () => {
    if (!editForm.userName || !editForm.phone || !editForm.address || !editForm.pincode) {
      alert("All fields are required!"); return;
    }
    if (editForm.phone.length !== 10) { alert("Phone must be 10 digits!"); return; }
    if (editForm.pincode.length !== 6) { alert("Pincode must be 6 digits!"); return; }
    try {
      setSaving(true);
      await api.put(`/users/orders/${id}/delivery`, editForm);
      alert("Delivery details updated! ✅");
      setIsEditing(false);
      fetchOrder();
    } catch { alert("Failed to update!"); }
    finally { setSaving(false); }
  };

  const getEstimatedDelivery = (purchaseDate) => {
    const date = new Date(purchaseDate);
    date.setDate(date.getDate() + 5);
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!order) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center p-12">
        <p className="text-6xl mb-4">📭</p>
        <h2 className="text-xl font-bold text-gray-700 mb-4">Order not found!</h2>
        <button onClick={() => navigate("/orders")}
          className="px-6 py-2 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition">
          Back to Orders
        </button>
      </div>
    </div>
  );

  const activeStep  = getActiveStep(order.status);
  const isCancelled = order.status?.includes("Cancelled");
  const isPending   = order.status?.includes("Pending");
  const sc          = statusConfig[order.status] || statusConfig["Pending⏳"];
  const progressPct = (activeStep / (timelineSteps.length - 1)) * 100;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Hero Banner ──────────────────────────────────── */}
      <div className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-5">
            <span className="cursor-pointer hover:text-white transition" onClick={() => navigate("/")}>Home</span>
            <span>/</span>
            <span className="cursor-pointer hover:text-white transition" onClick={() => navigate("/orders")}>My Orders</span>
            <span>/</span>
            <span className="text-white font-medium">Order Details</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
              <p className="text-2xl font-black tracking-tight font-mono">#{order._id.slice(-8).toUpperCase()}</p>
              <p className="text-xs text-gray-400 mt-1">
                Placed on {new Date(order.purchaseDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${sc.bg} ${sc.text}`}>
                <span className={`w-2 h-2 rounded-full ${sc.dot} animate-pulse`} />
                {order.status}
              </span>
              {isPending && (
                <button onClick={cancelOrder}
                  className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold rounded-full transition shadow-md">
                  Cancel Order
                </button>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            {[
              { label: "Total Amount", value: `₹ ${order.totalPrice?.toLocaleString("en-IN")}`, icon: "💰", color: "text-red-400"   },
              { label: "Quantity",     value: `${order.totalItems} Qty`,                          icon: "📦", color: "text-blue-400"  },
              { label: "Payment",      value: order.paymentMethod,                                icon: "💳", color: "text-green-400" },
            ].map((stat, i) => (
              <div key={i} className="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
                <p className="text-lg mb-0.5">{stat.icon}</p>
                <p className={`text-sm font-black ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Two Column Layout ────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* ── LEFT — Products + Policies ───────────────── */}
          <div className="flex flex-col gap-4">

            {/* Ordered Products */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>🛍️</span>
                  <p className="text-sm font-bold text-gray-800">Ordered Products</p>
                </div>
                <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">
                  {order.products?.length} item{order.products?.length > 1 ? "s" : ""}
                </span>
              </div>
              <div className="p-4 flex flex-col gap-3">
                {order.products?.map((product, index) => (
                  <div key={index}
                    onClick={() => navigate(`/productsDet/${product.productId}`)}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100
                               hover:border-red-200 hover:bg-red-50/30 transition cursor-pointer">
                    <div className="w-20 h-20 bg-white rounded-xl border border-gray-200
                                    flex items-center justify-center shrink-0 shadow-sm">
                      {product.image ? (
                        <img src={`http://localhost:5002${product.image}`} alt={product.name} className="w-16 h-16 object-contain" />
                      ) : <span className="text-3xl">📱</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-800 line-clamp-2">{product.name}</p>
                      <span className="inline-block mt-1 text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full font-medium">
                        Qty: {product.quantity}
                      </span>
                      <div className="mt-2">
                        <p className="text-base font-black text-red-500">₹ {product.price?.toLocaleString("en-IN")}</p>
                        <p className="text-xs text-gray-400">× {product.quantity} = ₹ {(product.price * product.quantity)?.toLocaleString("en-IN")}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Grand Total */}
                <div className="flex justify-between items-center pt-3 border-t-2 border-dashed border-gray-200">
                  <div>
                    <p className="text-xs text-gray-400">Grand Total</p>
                    <p className="text-xs text-green-600 font-medium">🚚 Free Delivery Included</p>
                  </div>
                  <p className="text-2xl font-black text-red-500">₹ {order.totalPrice?.toLocaleString("en-IN")}</p>
                </div>
              </div>
            </div>

            {/* ── Policies & Support ───────────────────────── */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2">
                <span>🛡️</span>
                <p className="text-sm font-bold text-gray-800">Policies & Support</p>
              </div>
              <div className="p-4 flex flex-col gap-3">
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                  <span className="text-xl shrink-0">↩️</span>
                  <div>
                    <p className="text-xs font-bold text-blue-700">Return Policy</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Eligible for return within 7 days of delivery. Item must be unused and in original packaging.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-xl border border-green-100">
                  <span className="text-xl shrink-0">🔧</span>
                  <div>
                    <p className="text-xs font-bold text-green-700">Warranty</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      1 Year manufacturer warranty included. Service centers available across India.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-xl border border-orange-100">
                  <span className="text-xl shrink-0">🎧</span>
                  <div>
                    <p className="text-xs font-bold text-orange-700">Need Help?</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Contact our support team for any order related queries. Available 24/7 for assistance.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ── RIGHT — Timeline + Delivery ──────────────── */}
          <div className="flex flex-col gap-4">

            {/* Delivery Date Banner */}
            {!isCancelled ? (
              <div className={`rounded-2xl px-5 py-4 flex items-center gap-3
                ${order.status?.includes("Delivered") ? "bg-emerald-50 border border-emerald-200" : "bg-amber-50 border border-amber-200"}`}>
                <span className="text-2xl">{order.status?.includes("Delivered") ? "🎉" : "🚀"}</span>
                <div>
                  <p className={`text-sm font-bold ${order.status?.includes("Delivered") ? "text-emerald-700" : "text-amber-700"}`}>
                    {order.status?.includes("Delivered") ? "Order Delivered Successfully!" : `Estimated Delivery: ${getEstimatedDelivery(order.purchaseDate)}`}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {order.status?.includes("Delivered") ? "We hope you love your purchase!" : "Delivery within 5 business days • Free shipping"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 flex items-center gap-4">
                <span className="text-3xl">❌</span>
                <div>
                  <p className="text-sm font-bold text-rose-700">Order Cancelled</p>
                  <p className="text-xs text-rose-500 mt-0.5">Refund will be processed if applicable.</p>
                </div>
              </div>
            )}

            {/* Order Timeline */}
            {!isCancelled && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <p className="text-sm font-bold text-gray-800 mb-6">Track Your Order</p>
                <div className="relative">
                  <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-100" />
                  <div className="absolute top-6 left-6 h-0.5 bg-linear-to-r from-red-400 to-red-500 transition-all duration-700"
                    style={{ width: `calc(${progressPct}% - 3rem)` }} />
                  <div className="relative flex justify-between">
                    {timelineSteps.map((step, index) => {
                      const done = index < activeStep;
                      const current = index === activeStep;
                      return (
                        <div key={index} className="flex flex-col items-center gap-2 flex-1">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg border-2 transition-all z-10
                            ${done || current ? "bg-red-500 border-red-500 shadow-lg shadow-red-200" : "bg-white border-gray-200"}`}
                            style={{ transform: current ? "scale(1.1)" : "scale(1)" }}>
                            {step.icon}
                          </div>
                          <div className="text-center">
                            <p className={`text-xs font-bold ${done || current ? "text-red-500" : "text-gray-400"}`}>{step.label}</p>
                            <p className="text-xs text-gray-400 hidden sm:block mt-0.5">{step.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Delivery Info */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>📍</span>
                  <p className="text-sm font-bold text-gray-800">Delivery Information</p>
                </div>
                {isPending && !isEditing && (
                  <button onClick={handleEditClick}
                    className="px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-semibold rounded-lg hover:bg-blue-100 transition">
                    ✏️ Edit
                  </button>
                )}
              </div>
              <div className="p-5">
                {isEditing ? (
                  <div className="flex flex-col gap-3">
                    {[
                      { label: "Name",    key: "userName", type: "text"     },
                      { label: "Phone",   key: "phone",    type: "tel"      },
                      { label: "Pincode", key: "pincode",  type: "text"     },
                    ].map((field) => (
                      <div key={field.key}>
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{field.label}</label>
                        <input
                          value={editForm[field.key]}
                          maxLength={field.key === "phone" ? 10 : field.key === "pincode" ? 6 : undefined}
                          onChange={(e) => setEditForm({ ...editForm, [field.key]: field.key === "phone" || field.key === "pincode" ? e.target.value.replace(/\D/g, "") : e.target.value })}
                          className="w-full mt-1 px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-red-400 focus:ring-1 focus:ring-red-200 transition"
                        />
                      </div>
                    ))}
                    <div>
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Address</label>
                      <textarea
                        value={editForm.address}
                        onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                        rows={3}
                        className="w-full mt-1 px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none resize-none focus:border-red-400 focus:ring-1 focus:ring-red-200 transition"
                      />
                    </div>
                    <div className="flex gap-2 mt-1">
                      <button onClick={handleSaveDelivery} disabled={saving}
                        className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm font-bold hover:bg-red-600 transition disabled:opacity-60">
                        {saving ? "Saving..." : "Save Changes"}
                      </button>
                      <button onClick={() => setIsEditing(false)}
                        className="flex-1 py-2.5 bg-gray-100 text-gray-600 rounded-xl text-sm font-semibold hover:bg-gray-200 transition">
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Name",    value: order.userName       },
                      { label: "Phone",   value: order.phone          },
                      { label: "Pincode", value: order.pincode || "—" },
                    ].map((item, i) => (
                      <div key={i}>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{item.label}</p>
                        <p className="text-sm font-semibold text-gray-800 mt-1">{item.value}</p>
                      </div>
                    ))}
                    <div className="col-span-2">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Delivery Address</p>
                      <p className="text-sm font-semibold text-gray-800 mt-1">{order.address}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Back Button */}
            <button onClick={() => navigate("/orders")}
              className="w-full py-3.5 bg-white border-2 border-gray-200 text-gray-600 rounded-2xl font-bold text-sm hover:border-red-300 hover:text-red-500 transition">
              ← Back to My Orders
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}