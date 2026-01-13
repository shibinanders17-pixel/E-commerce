import "./AdminDashboard.css";

export default function AdminDashboard() {
  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Products</h3>
          <p>25</p>
        </div>

        <div className="card">
          <h3>Total Users</h3>
          <p>12</p>
        </div>

        <div className="card">
          <h3>Total Orders</h3>
          <p>8</p>
        </div>
      </div>
    </div>
  );
}
