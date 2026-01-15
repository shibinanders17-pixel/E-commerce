import { useParams, useNavigate } from "react-router-dom";
import "./UserDetails.css";

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Same fake users data (AdminUsers la use panninathu)
  const users = [
    {
      id: 1,
      name: "Shibin Anderson",
      email: "shibin@gmail.com",
      phone: "9876543210",
    },
    {
      id: 2,
      name: "Arun Kumar",
      email: "arun@gmail.com",
      phone: "9123456780",
    },
    {
      id: 3,
      name: "Vignesh",
      email: "vignesh@gmail.com",
      phone: "9988776655",
    },
  ];

  // Hard coded orders
  const orders = [
    {
      id: 101,
      product: "iPhone 15",
      price: 80000,
      status: "Delivered",
    },
    {
      id: 102,
      product: "Samsung S24",
      price: 65000,
      status: "Shipped",
    },
  ];

  const user = users.find((u) => u.id === Number(id));

  if (!user) {
    return <h2>User not found</h2>;
  }

  return (
    <div className="user-details-container">
      <h2 className="user-title">User Details</h2>

      <div className="user-info">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
      </div>

      <h3 className="orders-title">Orders</h3>

      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.product}</td>
              <td>₹ {order.price}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>
    </div>
  );
}
