import { useLocation, useNavigate } from "react-router-dom";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const product = location.state?.product;

  if (!product) {
    return <h2 style={{ padding: "20px" }}>No payment data found ❌</h2>;
  }

  return (
    <div style={{ padding: "20px", textAlign: "center", fontFamily:"cursive", backgroundColor:"lightblue", height:"100vh"}}>
      <h2>Payment</h2>

      <p>Amount to Pay</p>
      <h1>₹ {product.price.toLocaleString("en-IN")}</h1>

      <br />

      <button  onClick={() => navigate("/success")} style={{padding:"8px", borderRadius:"5px", backgroundColor:"greenyellow"}}>
        Pay ₹ {product.price}
      </button>
    </div>
  );
}

