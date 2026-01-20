import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const product = location.state?.product;

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  if (!product) {
    return <h2 className="p-5 text-center">No product selected ❌</h2>;
  }

  const handlePlaceOrder = async () => {
    if (!name || !address || !phone || !paymentMethod) {
      alert("Please fill all details and select payment method");
      return;
    }

    const orderData = {
      userName: name,
      address,
      phone,
      paymentMethod,
      productId: product.id,
      productName: product.name,
      price: product.price,
      quantity: product.qty || 1,
      totalAmount: product.price * (product.qty || 1),
      status: "Pending⏳",
      orderDate: new Date().toLocaleString(),
    };

    try {
      await api.post("/orders", orderData);
      alert("Order placed successfully 🎉");
      navigate("/success", { state: { order: orderData } });
    } catch (error) {
      console.log(error);
      alert("Something went wrong while placing order ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-6 grid md:grid-cols-2 gap-6">

        <div className="flex flex-col items-center text-center border rounded-lg p-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-52 rounded-lg border mb-4"
          />

          <h2 className="text-xl font-semibold mb-1">
            {product.name}
          </h2>

          <p className="text-green-700 text-lg font-bold">
            ₹ {(product.price * (product.qty || 1)).toLocaleString("en-IN")}
          </p>

          <p className="text-sm text-gray-500 mt-2">
            Quantity: {product.qty || 1}
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">
            Checkout Details
          </h2>

          <div className="space-y-3">
            <input
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-md text-sm
                         focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <textarea
              placeholder="Delivery Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows="3"
              className="w-full p-3 border rounded-md text-sm
                         focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <input
              type="number"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border rounded-md text-sm
                         focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <h3 className="mt-5 font-semibold">
            Payment Method
          </h3>

          <div className="mt-3 space-y-2">
            {["UPI", "Card", "COD"].map((method) => (
              <label
                key={method}
                className="flex items-center gap-2 cursor-pointer text-sm"
              >
                <input
                  type="radio"
                  name="payment"
                  value={method}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                {method === "COD" ? "Cash on Delivery" : method}
              </label>
            ))}
          </div>

          <button
            onClick={handlePlaceOrder}
            className="mt-6 w-full py-3 bg-orange-500
                       text-white text-lg rounded-lg
                       hover:bg-orange-600 transition"
          >
            Place Order
          </button>
        </div>

      </div>
    </div>
  );
}
