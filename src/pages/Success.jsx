import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>✅ Your Order Successful</h1>
      <p>Thanks for your order !!!</p>

      
      <Link to="/">
        <button style={{padding:"8px", borderRadius:"10px", background:"lightblue"}}>Continue Shopping</button>
      </Link>
    </div>
  );
}
