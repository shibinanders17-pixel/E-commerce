import { Link, Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 h-screen sticky top-0
                        bg-slate-900 text-white p-6">
        <h2 className="text-xl font-bold mb-8 text-center
                       text-white border-b border-slate-700 pb-4">
          📱 Mobile World
          <p className="text-xs text-slate-400 font-normal mt-1">
            Admin Panel
          </p>
        </h2>

        <nav className="flex flex-col gap-2">
          <Link
            to="/admin/dashboard"
            className="px-4 py-2.5 rounded-lg text-sm
                       text-slate-300 hover:bg-slate-700
                       hover:text-white transition">
            📊 Dashboard
          </Link>
          <Link
            to="/admin/products-man"
            className="px-4 py-2.5 rounded-lg text-sm
                       text-slate-300 hover:bg-slate-700
                       hover:text-white transition">
            📦 Products
          </Link>
          <Link
            to="/admin/users"
            className="px-4 py-2.5 rounded-lg text-sm
                       text-slate-300 hover:bg-slate-700
                       hover:text-white transition">
            👥 Users
          </Link>
          <Link
            to="/admin/orders"
            className="px-4 py-2.5 rounded-lg text-sm
                       text-slate-300 hover:bg-slate-700
                       hover:text-white transition">
            🛒 Orders
          </Link>

          <button
            onClick={handleLogout}
            className="mt-6 px-4 py-2.5 bg-red-600
                       text-white rounded-lg text-sm
                       hover:bg-red-700 transition text-left">
            🚪 Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>

    </div>
  );
}