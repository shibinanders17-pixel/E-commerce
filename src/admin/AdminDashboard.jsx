import { Link } from "react-router-dom";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>

      <div className="dashboard-cards">
        
        {/* Products */}
        <Link to="/admin/products-man" className="card-link">
          <div className="card">
            <h3>Total Products List</h3>
            <p>25</p>
            <span>Manage Products</span>
          </div>
        </Link>

        {/* Users */}
        <Link to="/admin/users" className="card-link">
          <div className="card">
            <h3>Total Users</h3>
            <p>12</p>
            <span>View Users</span>
          </div>
        </Link>

        {/* Orders */}
        <Link to="/admin/orders" className="card-link">
          <div className="card">
            <h3>Total Orders</h3>
            <p>8</p>
            <span>View Orders</span>
          </div>
        </Link>

      </div>
    </div>
  );
}
