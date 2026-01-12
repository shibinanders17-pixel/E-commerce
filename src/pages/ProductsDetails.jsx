import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { CartContext } from "../context/CartContext";
import "./ProductsDetails.css";

export default function ProductsDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => {
      setProduct(res.data);
    });
  }, [id]);

  if (!product) {
    return <h2 style={{ padding: "20px" }}>Loading product...</h2>;
  }
  const isInCart = cart.some(item => item.id === product.id);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (isInCart) {
      removeFromCart(product.id);
    }else{
      addToCart(product)
    }
  };

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    navigate("/checkout", {
      state: { product }
    });
  };

  return (
    <div className="product-details-container">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-info">
        <h2>{product.name}</h2>
        <p className="product-price">
          ₹ {product.price.toLocaleString("en-IN")}
        </p>

        <div className="product-specs">
          {product.specs?.split("\n").map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>

        <p className="product-description">{product.description}</p>

        <div className="product-actions">

          <button
            className="add-cart-btn"
            onClick={handleAddToCart}>

            {isInCart ? "Added ✓" : "Add to Cart"}
          </button>

          <button className="buy-now-btn" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}