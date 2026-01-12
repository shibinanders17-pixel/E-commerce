import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div style={{
      width: "220px",
      background: "#222",
      color: "#fff",
      padding: "20px"
    }}>
      <h3>Admin Panel</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li><Link to="/admin/dashboard" style={{ color: "#fff" }}>Dashboard</Link></li>
        <li><Link to="/admin/products" style={{ color: "#fff" }}>Products</Link></li>
        <li><Link to="/admin/users" style={{ color: "#fff" }}>Users</Link></li>
        <li><Link to="/admin/add-product" style={{ color: "#fff" }}>Add Product</Link></li>
      </ul>
    </div>
  );
}
