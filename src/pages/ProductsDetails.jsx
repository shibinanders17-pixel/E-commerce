import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { CartContext } from "../context/CartContext";

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
    return <h2 className="p-5">Loading product...</h2>;
  }

  const isInCart = cart.some(item => item.id === product.id);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    isInCart ? removeFromCart(product.id) : addToCart(product);
  };

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    navigate("/checkout", { state: { product } });
  };

  return (
      <div className="max-w-full md:max-w-5xl mx-auto my-6 p-4 md:p-6
                flex flex-col md:flex-row gap-6
                bg-white rounded-xl shadow-md"
                >

     <div>
        <img
          src={product.image}
          alt={product.name}
          className="w-full max-w-70 md:w-72
             rounded-lg object-contain"
        />
      </div>

      <div className="flex-1">
        <h2 className="text-[26px] text-gray-800 m-0">
          {product.name}
        </h2>

        <p className="text-[22px] font-bold text-red-600 my-2">
          ₹ {product.price.toLocaleString("en-IN")}
        </p>

        <div className="bg-gray-100 p-3 rounded-lg
                        my-2 text-sm leading-relaxed">
          {product.specs?.split("\n").map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>

        <p className="mt-2 text-gray-600 leading-relaxed">
          {product.description}
        </p>

        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleAddToCart}
            className={`px-4 py-2 rounded-md text-sm mr-2
              ${
                isInCart
                  ? "bg-green-500 text-white cursor-not-allowed"
                  : "bg-orange-500 text-white hover:bg-orange-600"
              }`}
          >
            {isInCart ? "Added ✓" : "Add to Cart"}
          </button>

          <button
            onClick={handleBuyNow}
            className="px-4 py-2 rounded-md text-sm
                       bg-green-600 text-white
                       hover:bg-green-700">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
