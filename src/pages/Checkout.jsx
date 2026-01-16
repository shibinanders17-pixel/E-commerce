import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";
import "./Checkout.css";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const product = location.state?.product;

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  if (!product) {
    return <h2 style={{ padding: "20px" }}>No product selected ❌</h2>;
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
      orderDate: new Date().toLocaleString()
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
    <div className="checkout">
      <img src={product.image} alt={product.name} />

      <h2>{product.name}</h2>
      <h3>
        Price: ₹ {(product.price * (product.qty || 1)).toLocaleString("en-IN")}
      </h3>

      <hr />
      <h2>Delivery Address & Details</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <input
        type="number"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <h2 className="payment-section">Payment Method :</h2>

      <div className="payment">
        <label>
          <input
            type="radio"
            name="payment"
            value="UPI"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          UPI
        </label>

        <label>
          <input
            type="radio"
            name="payment"
            value="Card"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Card
        </label>

        <label>
          <input
            type="radio"
            name="payment"
            value="COD"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Cash on Delivery
        </label>
      </div>

      <button onClick={handlePlaceOrder} className="place-order">
        Place Order
      </button>
    </div>
  );
}