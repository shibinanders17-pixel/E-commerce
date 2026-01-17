import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    fetchCounts();
  }, []);


  const fetchCounts = async () => {
    try{
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
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Products</h3>
          <p>{totalProducts}</p>
          <Link to="/admin/products-man">Manage Products</Link>
        </div>

        <div className="card">
          <h3>Total Users</h3>
          <p>{totalUsers}</p>
          <Link to="/admin/users">View Specific Users Lists</Link>
        </div>

        <div className="card">
          <h3>Total Orders Details</h3>
          <p>{totalOrders}</p>
          <Link to="/admin/orders">View Orders</Link>
        </div>
      </div>
    </div>
  );
}
