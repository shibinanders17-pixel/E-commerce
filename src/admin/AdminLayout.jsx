import { Link, Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">

      <aside className="w-64 h-screen sticky top-0
                  bg-slate-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Admin Panel
        </h2>

        <nav className="flex flex-col gap-4">
          <Link to="/admin/dashboard" className="hover:text-blue-400">
            Dashboard
          </Link>
          <Link to="/admin/products-man" className="hover:text-blue-400">
            Products lists
          </Link>
          <Link to="/admin/users" className="hover:text-blue-400">
            Users details
          </Link>
          <Link to="/admin/orders" className="hover:text-blue-400">
            Orders lists
          </Link>

          <button
            onClick={handleLogout}
            className="mt-6 bg-red-600 py-2 rounded-md text-sm
                       hover:bg-red-700"
          >
            Logout
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>

    </div>
  );
}
