import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Products.css";
import { CartContext } from "../context/CartContext";
import { SearchContext } from "../context/SearchContext";


export default function Products() {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const { searchText } = useContext(SearchContext);

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    api.get("/products").then((res) => {
      setProducts(res.data);
    });
  }, []);


  const handleAddToCart = (product, isInCart) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    } 

    isInCart ? removeFromCart(product.id) : addToCart(product)};


  const handleBuyNow = (product) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    navigate("/checkout", {
      state: { product }
    });
  };

  const filteredProducts = products.filter((product) =>
  product.name.toLowerCase().includes(searchText.toLowerCase())
);

  return (
    <div>

      <div className="banner-wrapper">
        <img src="/images/fk.webp" className="banner-img" />
        <img src="/images/Brands.jpg" className="brand-banner"/>
      </div>

      <h2 className="product-headline">S h o p -- N o w ⬇️</h2>

      <div className="product-grid">
        {filteredProducts.map((product) => {
            const isInCart = cart.some(item => item.id === product.id);

            return (
              <div key={product.id} className="product-card">
                <img src={product.image} />
                <h3>{product.name}</h3>
                <p>₹ {product.price.toLocaleString("en-IN")}</p>


                <button onClick={() => handleAddToCart(product, isInCart)}
                  className={isInCart ? "added-btn" : ""}>
                    
                  {isInCart ? "Added ✓" : "Add to Cart"}
                </button>


                <button
                  className="buy-btn"
                  onClick={() => handleBuyNow(product)}
                >
                  Buy Now
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}
