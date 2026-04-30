import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { CartContext } from "../context/CartContext";
import { SearchContext } from "../context/SearchContext";
import { WishlistContext } from "../context/WishlistContext";

const getFakeRating = (id) => {
  const hash = id ? id.charCodeAt(id.length - 1) % 5 : 0;
  return [4.1, 4.2, 4.3, 4.4, 4.5][hash];
};

const getFakeReviews = (id) => {
  const hash = id ? id.charCodeAt(id.length - 1) % 10 : 0;
  return [1200, 2300, 3400, 4500, 5600, 6700, 7800, 8900, 9100, 10200][hash];
};

export default function Products() {

  const { cart, addToCart, removeFromCart }           = useContext(CartContext);
  const { searchText }                                = useContext(SearchContext);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);

  const navigate = useNavigate();

  const [products, setProducts]                 = useState([]);
  const [categories, setCategories]             = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy]                     = useState("relevance");

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/users/products", {
          params: {
            search:   searchText,
            category: selectedCategory,
            sort:     sortBy
          }
        });
        setProducts(res.data);
      } catch (error) {
        console.log("Products fetch error:", error);
      }
    };
    fetchProducts();
  }, [searchText, selectedCategory, sortBy]); 


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/users/products");
        const cats = ["All", ...new Set(res.data.map(p => p.category).filter(Boolean))];
        setCategories(cats);
      } catch (error) {
        console.log("Categories fetch error:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleAddToCart = (product, isInCart) => {
    if (!isLoggedIn) { navigate("/login"); return; }
    isInCart ? removeFromCart(product._id) : addToCart(product);
  };

  const handleBuyNow = (product) => {
    if (!isLoggedIn) { navigate("/login"); return; }
    navigate(`/checkout/product/${product._id}`);
  };

  const handleWishlist = (product) => {
    if (!isLoggedIn) { navigate("/login"); return; }
    isInWishlist(product._id)
      ? removeFromWishlist(product._id)
      : addToWishlist(product);
  };

 
  const sortedProducts = sortBy === "rating"
    ? [...products].sort((a, b) => getFakeRating(b._id) - getFakeRating(a._id))
    : products;

  const sortOptions = [
    { value: "relevance",  label: "Relevance" },
    { value: "price-low",  label: "Price -- Low to High" },
    { value: "price-high", label: "Price -- High to Low" },
    { value: "rating",     label: "Popularity" },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">

      <div className="px-4 md:px-8 pt-4">
        <img src="/images/pic21.webp"
          className="w-full h-78 md:h-138 rounded-xl object-fill" alt="Banner" />
      </div>

      <div className="px-4 md:px-8 mt-4">
        <img src="/images/Brands.jpg"
          className="w-full h-16 md:h-28 object-contain rounded-xl bg-white px-4 py-2" alt="Brands" />
      </div>

      <div className="px-4 md:px-8 mt-4">
        <div className="bg-white rounded-xl shadow-sm px-4 py-3 flex gap-3 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-1.5 rounded-full text-sm font-medium whitespace-nowrap border transition
                ${selectedCategory === category
                  ? "bg-red-500 text-white border-red-500"
                  : "bg-white text-gray-600 border-gray-300 hover:border-red-400 hover:text-red-500"}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 md:px-8 mt-4 mb-3 bg-white rounded-xl shadow-sm py-3
                      flex flex-wrap items-center justify-between gap-3">

        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-red-500 rounded-full" />
          <h2 className="text-base font-bold text-gray-700">
            Showing
            <span className="text-red-500 mx-1">{sortedProducts.length}</span>
            results
          </h2>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-500 font-medium">Sort By:</span>
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSortBy(option.value)}
              className={`px-3 py-1 text-sm font-medium transition border-b-2
                ${sortBy === option.value
                  ? "border-red-500 text-red-500"
                  : "border-transparent text-gray-600 hover:text-red-500"}`}
            >
              {option.label}
            </button>
          ))}
        </div>

      </div>

      <div className="px-4 md:px-8 pb-10">
        {sortedProducts.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-4">😕</p>
            <p className="text-lg">No products found</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {sortedProducts.map((product) => {

              const isInCart   = cart.some((item) => item._id === product._id);
              const wishlisted = isInWishlist(product._id);
              const rating     = getFakeRating(product._id);
              const reviews    = getFakeReviews(product._id);
              const discount   = product.originalPrice && product.originalPrice > product.price
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : null;
              const specs = product.specs
                ? product.specs.split("\n").filter(Boolean).slice(0, 5)
                : [];

              return (
                <div
                  key={product._id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md
                             transition-shadow duration-200
                             flex flex-col sm:flex-row gap-4 p-4 md:p-5"
                >
                  <Link to={`/productsDet/${product._id}`} className="shrink-0">
                    <div className="w-full sm:w-48 h-48 flex items-center
                                    justify-center bg-gray-50 rounded-xl">
                      <img
                        src={`http://localhost:5002${product.image}`}
                        alt={product.name}
                        className="w-40 h-40 object-contain
                                   hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link to={`/productsDet/${product._id}`}>
                      <h3 className="text-base font-semibold text-blue-600
                                     hover:underline line-clamp-2 mb-1">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-green-600 text-white text-xs
                                       font-bold px-2 py-0.5 rounded flex items-center gap-1">
                        {rating} ★
                      </span>
                      <span className="text-xs text-gray-400">
                        {reviews.toLocaleString("en-IN")} Ratings
                      </span>
                    </div>

                    {specs.length > 0 && (
                      <ul className="space-y-1 mb-3">
                        {specs.map((spec, i) => (
                          <li key={i} className="text-sm text-gray-600
                                                  flex items-start gap-2">
                            <span className="text-gray-400 mt-0.5 text-xs">•</span>
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {product.category && (
                      <span className="inline-block bg-red-50 text-red-500
                                       text-xs font-semibold px-2 py-0.5
                                       rounded-full border border-red-200">
                        {product.category}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col sm:items-end justify-between
                                  sm:min-w-45 gap-3">
                    <div className="sm:text-right">
                      <p className="text-2xl font-bold text-gray-900">
                        ₹{product.price.toLocaleString("en-IN")}
                      </p>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <div className="flex sm:justify-end items-center gap-2 mt-0.5">
                          <p className="text-sm text-gray-400 line-through">
                            ₹{product.originalPrice.toLocaleString("en-IN")}
                          </p>
                          {discount && (
                            <span className="text-green-600 text-sm font-bold">
                              {discount}% off
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                      <button
                        onClick={() => handleWishlist(product)}
                        className={`flex items-center justify-center gap-1.5
                                    text-sm font-medium py-1.5 rounded-lg
                                    border transition w-full
                          ${wishlisted
                            ? "border-red-400 text-red-500 bg-red-50"
                            : "border-gray-300 text-gray-500 hover:border-red-400 hover:text-red-500"}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg"
                          className={`h-4 w-4 ${wishlisted ? "fill-red-500 stroke-red-500" : "fill-none stroke-current"}`}
                          viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        {wishlisted ? "Wishlisted ♥" : "Wishlist"}
                      </button>

                      <button
                        onClick={() => handleAddToCart(product, isInCart)}
                        className={`w-full py-2 rounded-lg text-sm font-semibold
                                    border transition
                          ${isInCart
                            ? "bg-green-500 text-white border-green-500"
                            : "bg-white text-red-500 border-red-400 hover:bg-red-50"}`}
                      >
                        {isInCart ? "Added ✓" : "Add to Cart"}
                      </button>

                      <button
                        onClick={() => handleBuyNow(product)}
                        className="w-full py-2 rounded-lg text-sm font-semibold
                                   bg-red-500 text-white hover:bg-red-600 transition"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
