import { useEffect, useState } from "react";
import api from "../services/api";

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
    <div
      className="min-h-screen p-8
                 bg-linear-to-l from-emerald-400 to-teal-500"
    >
      <h2
        className="text-center text-4xl font-extrabold text-gray-800
                   mb-8 border-b-4 border-gray-800 inline-block pb-2"
      >
        Orders List
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-lg font-semibold text-gray-700 mt-10">
          No orders placed yet ❌
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table
            className="w-full bg-white border-collapse
                       shadow-xl rounded-lg overflow-hidden"
          >
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-3">ID</th>
                <th className="border px-4 py-3">User</th>
                <th className="border px-4 py-3">Product</th>
                <th className="border px-4 py-3">Qty</th>
                <th className="border px-4 py-3">Total</th>
                <th className="border px-4 py-3">Payment</th>
                <th className="border px-4 py-3">Status</th>
                <th className="border px-4 py-3">Date</th>
                <th className="border px-4 py-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 transition  text-center"
                >
                  <td className="border px-4 py-2">{order.id}</td>
                  <td className="border px-4 py-2">{order.userName}</td>
                  <td className="border px-4 py-2">{order.productName}</td>
                  <td className="border px-4 py-2">{order.quantity}</td>
                  <td className="border px-4 py-2 font-semibold">
                    ₹ {order.totalAmount}
                  </td>
                  <td className="border px-4 py-2">{order.paymentMethod}</td>

                  <td className="border px-4 py-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold
                        bg-yellow-200 text-yellow-800">
                            {order.status}
                   </span>
                  </td>

                  <td className="border px-4 py-2">{order.orderDate}</td>

                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="px-4 py-1.5 bg-red-600 text-white
                                 rounded-md text-sm font-semibold
                                 hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
