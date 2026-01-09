import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom"
import "./Cart.css";

export default function Cart() {

  const navigate  = useNavigate();

  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty
  } = useContext(CartContext);
  
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  if (cart.length === 0) {
    return <h2 style={{ padding: "20px", textAlign:"center"}}>Your cart is empty 🛒</h2>;
  }

  const handleBuyNow = (item) => {
    navigate("/checkout", {
      state : {product : item}
    });
  }; 

  return (
    <div className="cart-page">
      <h2>My Cart</h2>

      {cart.map(item => {
        const subtotal = item.price * item.qty;

        return ( 
          <div key={item.id} className="cart-item">
            <img src={item.image} />

            <div className="cart-details">
              <h3>{item.name}</h3>
              <p>₹ {item.price.toLocaleString("en-IN")}</p>

              <div className="qty-controls">
                <button onClick={() => decreaseQty(item.id)}>−</button>
                <span>{item.qty}</span>
                <button onClick={() => increaseQty(item.id)}>+</button>
              </div>

              <p>
                <strong>
                  Subtotal: ₹ {subtotal.toLocaleString("en-IN")}
                </strong>
              </p>

              <button onClick={() => removeFromCart(item.id)}> Remove </button>   
              <span>{" "}</span>
              <button onClick={()=> handleBuyNow(item)} > Buy Now </button>
            </div>
          </div>
        );
      })}

      <h2 className="cart-total">
        Total: ₹ {total.toLocaleString("en-IN")}
      </h2>
    </div>
  );
}
