import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
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
    isInCart ? removeFromCart(product.id) : addToCart(product);
  };

  const handleBuyNow = (product) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    navigate("/checkout", { state: { product } });
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
        <div className="flex flex-col gap-5 my-5 w-full">
        <img
          src="/images/fk.webp"
          className="w-full h-62 md:h-87
                     rounded-lg object-cover px-6"
          alt="Banner"
        />

        <img
          src="/images/Brands.jpg"
          className="w-full h-25 md:h-62
                     object-contain rounded-xl
                     bg-linear-to-b from-green-300 to-sky-300 p-6"
          alt="Brands"
        />
      </div>

      <h2 className="text-center py-2 font-cursive underline
                     text-red-600 bg-[#12263d]">
        S h o p -- N o w ⬇
      </h2>

      <div className="flex flex-wrap justify-center gap-5
                      px-3 sm:px-6 md:px-10 py-5">
        {filteredProducts.map((product) => {
          const isInCart = cart.some((item) => item.id === product.id);

          return (
            <div
              key={product.id}
              className="border border-gray-300 bg-white
                         rounded-lg p-4 text-center
                         w-full sm:w-[48%] md:w-[30%] lg:w-[22%]"
            >

              <Link to={`/productsDet/${product.id}`}>
                <div className="h-55 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </Link>

              <h3 className="font-sans font-semibold mt-2">
                <Link to={`/productsDet/${product.id}`}>
                  {product.name}
                </Link>
              </h3>

              <p className="text-[18px] bg-[#383229] text-white my-2">
                ₹ {product.price.toLocaleString("en-IN")}
              </p>

                   <div className="mt-3 flex flex-col sm:flex-row
                              gap-2 justify-center">
                
                <button onClick={() => handleAddToCart(product, isInCart)}
                  className={`px-3 py-2 rounded
                    ${
                      isInCart
                        ? "bg-green-500 text-white cursor-not-allowed"
                        : "border text-pink-500 hover:bg-pink-50"
                    }`}
                >
                  {isInCart ? "Added ✓" : "Add to Cart"}
                </button>

                <button
                  onClick={() => handleBuyNow(product)}
                  className="px-3 py-2 rounded
                             border text-blue-600
                             hover:bg-blue-50"
                >
                  Buy Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
