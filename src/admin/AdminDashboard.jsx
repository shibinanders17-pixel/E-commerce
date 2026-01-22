import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminDashboard() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const productsRes = await api.get("/products");
      setTotalProducts(productsRes.data.length);

      const usersRes = await api.get("/users");
      setTotalUsers(usersRes.data.length);

      const ordersRes = await api.get("/orders");
      setTotalOrders(ordersRes.data.length);
    } catch (error) {
      console.log("Error fetching dashboard counts", error);
    }
  };

  return (
    <div className="min-h-[90vh] bg-slate-100 px-6 py-8">

      <h1 className="text-4xl font-bold mb-10
                     text-blue-900 text-center">
        Admin Dashboard
      </h1>

      <div className="flex flex-wrap gap-8 justify-center">

          <div className="w-80 h-32 bg-white rounded-lg p-6
                        text-center shadow-md">
          <h3 className="text-2xl text-gray-800 mb-2">
            Total Products
          </h3>

          <p className="text-3xl font-bold text-blue-600">
            {totalProducts}
          </p>

          <p className="text-sm text-gray-500 mt-1">
            Products available in store
          </p>
        </div>

         <div className="w-80 h-32 bg-white rounded-lg p-6
                        text-center shadow-md">
          <h3 className="text-2xl text-gray-800 mb-2">
            Total Users
          </h3>

          <p className="text-3xl font-bold text-blue-600">
            {totalUsers}
          </p>

          <p className="text-sm text-gray-500 mt-1">
            Registered users
          </p>
        </div>

         <div className="w-80 h-32 bg-white rounded-lg p-6
                        text-center shadow-md">
          <h3 className="text-2xl text-gray-800 mb-2">
            Total Orders
          </h3>

          <p className="text-3xl font-bold text-blue-600">
            {totalOrders}
          </p>

          <p className="text-sm text-gray-500 mt-1">
            Orders placed so far
          </p>
        </div>

      </div>
    </div>
  );
}
