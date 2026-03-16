import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/admin/stats");
      setStats(res.data);
    } catch (error) {
      console.log("Error fetching stats", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: "📦",
      bg: "from-blue-500 to-blue-600",
      link: "/admin/products-man",
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: "👥",
      bg: "from-green-500 to-green-600",
      link: "/admin/users",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: "🛒",
      bg: "from-yellow-500 to-orange-500",
      link: "/admin/orders",
    },
    {
      title: "Total Revenue",
      value: `₹ ${stats.totalRevenue.toLocaleString("en-IN")}`,
      icon: "💰",
      bg: "from-purple-500 to-purple-600",
      link: "/admin/orders",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="w-12 h-12 border-4 border-blue-500
                        border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1 h-7 bg-blue-600 rounded-full" />
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        </div>
        <p className="text-gray-400 text-sm ml-3">
          Welcome back, Admin! Here's what's happening.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {statCards.map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(card.link)}
            className="cursor-pointer rounded-2xl overflow-hidden
                       shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Gradient Top */}
            <div className={`bg-linear-to-r ${card.bg} p-5`}>
              <div className="flex items-center justify-between">
                <p className="text-white text-sm font-semibold opacity-90">
                  {card.title}
                </p>
                <span className="text-2xl">{card.icon}</span>
              </div>
              <p className="text-white text-3xl font-bold mt-2">
                {card.value}
              </p>
            </div>

            {/* Bottom */}
            <div className="bg-white px-5 py-2.5">
              <p className="text-xs text-gray-400 font-medium">
                Click to view details →
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-base font-bold text-gray-700 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={() => navigate("/admin/add-product")}
            className="flex flex-col items-center gap-2 p-4
                       bg-blue-50 rounded-xl hover:bg-blue-100
                       transition text-blue-700"
          >
            <span className="text-2xl">➕</span>
            <span className="text-xs font-semibold">Add Product</span>
          </button>

          <button
            onClick={() => navigate("/admin/products-man")}
            className="flex flex-col items-center gap-2 p-4
                       bg-green-50 rounded-xl hover:bg-green-100
                       transition text-green-700"
          >
            <span className="text-2xl">📦</span>
            <span className="text-xs font-semibold">Manage Products</span>
          </button>

          <button
            onClick={() => navigate("/admin/orders")}
            className="flex flex-col items-center gap-2 p-4
                       bg-yellow-50 rounded-xl hover:bg-yellow-100
                       transition text-yellow-700"
          >
            <span className="text-2xl">🛒</span>
            <span className="text-xs font-semibold">View Orders</span>
          </button>

          <button
            onClick={() => navigate("/admin/users")}
            className="flex flex-col items-center gap-2 p-4
                       bg-purple-50 rounded-xl hover:bg-purple-100
                       transition text-purple-700"
          >
            <span className="text-2xl">👥</span>
            <span className="text-xs font-semibold">View Users</span>
          </button>
        </div>
      </div>

    </div>
  );
}
