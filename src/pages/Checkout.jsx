import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Checkout.css"


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

  const handlePlaceOrder = () => {
  if (!name || !address || !phone || !paymentMethod) {
    alert("Please fill all details and select payment method");
    return;
  }

  navigate("/payment",{state : {product}});
};


  return (
    <div className="checkout">
      <img
        src={product.image}
        alt={product.name}
        width="200"
        style={{ display: "block", marginBottom: "10px" }}
      />

      <h2>{product.name}</h2>

   
      <h3>Price: ₹ {(product.price * (product.qty || 1)).toLocaleString("en-IN")}</h3>
      
      <hr />
      <br />

      <h2>Delivery Address & Details </h2>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}/>

      <input
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}/>

      <input
       type="number"
       placeholder="Phone"
       value={phone}
       onChange={(e) => setPhone(e.target.value)}/>

      <h2 className="payment-section"> Payment Method : </h2>
      <br />
  
      <label>
  <input
    type="radio"
    name="payment"
    value="upi"
    onChange={(e) => setPaymentMethod(e.target.value)}
  />
  UPI
</label>

<label>
  <input
    type="radio"
    name="payment"
    value="card"
    onChange={(e) => setPaymentMethod(e.target.value)}
  />
  Card
</label>

<label>
  <input
    type="radio"
    name="payment"
    value="cod"
    onChange={(e) => setPaymentMethod(e.target.value)}
  />
  Cash on Delivery
</label>


      <br /><br />

     <button onClick={handlePlaceOrder} className="place-order">
          Place Order
     </button>
    </div>
  );
}
