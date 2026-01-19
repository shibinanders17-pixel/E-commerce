import { useEffect, useState } from "react";
import api from "../services/api";
import "./AdminOrders.css";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this order?")) {
      try {
        await api.delete(`/orders/${id}`);
        fetchOrders();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="orders-container">
      <h2 className="orders-title">Orders List</h2>

      {orders.length === 0 ? (
        <p className="no-orders">No orders placed yet ❌</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.userName}</td>
                <td>{order.productName}</td>
                <td>{order.quantity}</td>
                <td>₹ {order.totalAmount}</td>
                <td>{order.paymentMethod}</td>
                <td>{order.status}</td>
                <td>{order.orderDate}</td>
                <td>
                  <button
                    className="delete-order-btn"
                    onClick={() => handleDelete(order.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}