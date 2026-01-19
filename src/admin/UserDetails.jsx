import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./UserDetails.css";

export default function UserDetails() {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  
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
      status: "Delivered",
    },
  ];

  useEffect(() => {
    fetchUserDetails();
  }, [id]);

  const fetchUserDetails = async () => {
    try {
        await api.get(`/users/${id}`).then((res)=>{
        setUser(res.data)
      });
    } catch (error) {
      console.log("Error fetching user details", error);
    };
};

  if (!user) {
    return <h2>User not found</h2>;
  }

  return (
    <div className="user-details-container">
      <h2 className="user-title">User Details 👤</h2>

      <div className="user-info">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Pincode:</strong> {user.pincode}</p>
        {user.address && (
          <p><strong>Address:</strong> {user.address}</p>
        )}
      </div>

      <h3 className="orders-title">Previous Orders</h3>

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
