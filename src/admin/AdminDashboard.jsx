import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    <div
      className="min-h-[90vh] flex flex-col items-center justify-center
                 bg-slate-100 px-4"
    >
      <h1
        className="text-4xl font-bold mb-8
                   text-blue-900 text-center"
      >
        Admin Dashboard
      </h1>

      <div className="flex flex-wrap gap-6 justify-center">

        <div className="w-80 h-32 bg-white rounded-lg p-5
                     text-center shadow-md
                     cursor-pointer
                     transition transform hover:-translate-y-1" >

          <h3 className="text-2xl text-gray-800 mb-1">
            Total Products
          </h3>

          <p className="text-2xl font-bold text-blue-600 my-1">
            {totalProducts}
          </p>

          <Link
            to="/admin/products-man"
            className="text-sm text-gray-600 underline" >
            Manage Products
          </Link>
        </div>

        <div className="w-80 h-32 bg-white rounded-lg p-5
                     text-center shadow-md
                     cursor-pointer
                     transition transform hover:-translate-y-1" >

          <h3 className="text-2xl text-gray-800 mb-1">
            Total Users
          </h3>

          <p className="text-2xl font-bold text-blue-600 my-1">
            {totalUsers}
          </p>

          <Link
            to="/admin/users"
            className="text-sm text-gray-600 underline" >
            View Users List
          </Link>
        </div>

        <div
          className="w-80 h-32 bg-white rounded-lg p-5
                     text-center shadow-md
                     cursor-pointer
                     transition transform hover:-translate-y-1" >
          <h3 className="text-2xl text-gray-800 mb-1">
            Total Orders
          </h3>

          <p className="text-2xl font-bold text-blue-600 my-1">
            {totalOrders}
          </p>

          <Link
            to="/admin/orders"
            className="text-sm text-gray-600 underline" >
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
