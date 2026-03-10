import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

export default function ProductsDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);

  const [product, setProduct] = useState(null);
  const [selectedView, setSelectedView] = useState(0);

  const imageViews = [
    { transform: "scale-100",                         label: "Front" },
    { transform: "scale-150",                         label: "Zoom"  },
    { transform: "scale-150 translate-x-8",           label: "Right" },
    { transform: "scale-150 -translate-x-8",          label: "Left"  },
  ];

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get(`/users/products/${id}`, {
          headers: { Authorization: token }
        });
        setProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent
                          rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading product...</p>
        </div>
      </div>
    );
  }

  const isInCart = cart.some(item => item._id === product._id);
  const wishlisted = isInWishlist(product._id);

  const handleAddToCart = () => {
    if (!isLoggedIn) { navigate("/login"); return; }
    isInCart ? removeFromCart(product._id) : addToCart(product);
  };

  const handleBuyNow = () => {
    if (!isLoggedIn) { navigate("/login"); return; }
    navigate("/checkout", { state: { product } });
  };

  const handleWishlist = () => {
    if (!isLoggedIn) { navigate("/login"); return; }
    wishlisted ? removeFromWishlist(product._id) : addToWishlist(product);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-6 px-4 md:px-10">

      {/* Breadcrumb */}
      <p className="text-sm text-gray-400 mb-4">
        <span className="hover:text-red-500 cursor-pointer" onClick={() => navigate("/")}>
          Home
        </span>
        <span className="mx-2">/</span>
        <span className="text-gray-600">{product.name}</span>
      </p>

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-sm flex flex-col md:flex-row gap-0 overflow-hidden max-w-5xl mx-auto">

        {/* Left - Image Section */}
        <div className="md:w-2/5 bg-gray-50 flex flex-row border-r border-gray-100 p-4 gap-3">

          {/* Thumbnails - vertical left */}
          <div className="flex flex-col gap-2">
            {imageViews.map((view, index) => (
              <div
                key={index}
                onClick={() => setSelectedView(index)}
                className={`w-16 h-16 rounded-lg border-2 cursor-pointer
                            flex items-center justify-center bg-white overflow-hidden
                            transition-all duration-200
                  ${selectedView === index
                    ? "border-red-500 shadow-md"
                    : "border-gray-200 hover:border-red-300"}`}
              >
                <img
                  src={`http://localhost:5002${product.image}`}
                  alt={view.label}
                  className={`w-12 h-12 object-contain transition-transform duration-300 ${view.transform}`}
                />
              </div>
            ))}
          </div>

          {/* Main Image + Buttons */}
          <div className="flex-1 flex flex-col justify-between">

            {/* Main Image */}
            <div className="flex items-center justify-center flex-1 overflow-hidden rounded-xl p-2">
              <img
                src={`http://localhost:5002${product.image}`}
                alt={product.name}
                className={`w-full max-w-xs object-contain transition-transform duration-500 ${imageViews[selectedView].transform}`}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3 rounded-xl font-semibold text-sm
                            flex items-center justify-center gap-2 transition
                  ${isInCart
                    ? "bg-green-500 text-white"
                    : "bg-white border-2 border-red-500 text-red-500 hover:bg-red-50"}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {isInCart ? "Added ✓" : "Add to Cart"}
              </button>

              <button
                onClick={handleBuyNow}
                className="flex-1 py-3 rounded-xl font-semibold text-sm bg-red-500 text-white hover:bg-red-600 flex items-center justify-center gap-2 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Buy Now
              </button>
            </div>

          </div>

        </div>

        {/* Right - Product Info */}
        <div className="flex-1 p-6 md:p-8">

          {/* Name + Wishlist */}
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-800 leading-snug">
              {product.name}
            </h1>
            <button onClick={handleWishlist} title={wishlisted ? "Remove from Wishlist" : "Add to Wishlist"} className="mt-1 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg"
                className={`h-7 w-7 transition ${wishlisted ? "fill-red-500 stroke-red-500" : "fill-none stroke-gray-400 hover:stroke-red-400"}`}
                viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          {/* Price */}
          <p className="text-3xl font-bold text-red-500 mt-3">
            ₹ {product.price.toLocaleString("en-IN")}
          </p>

          <div className="w-full h-px bg-gray-100 my-4" />

          {/* Specs */}
          {product.specs && (
            <>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Specifications
              </h3>
              <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 leading-relaxed space-y-1">
                {product.specs.split("\n").map((line, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span>{line}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Description */}
          {product.description && (
            <>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mt-5 mb-2">
                Description
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </>
          )}

          {/* Category badge */}
          {product.category && (
            <div className="mt-5">
              <span className="inline-block bg-red-50 text-red-500 text-xs font-semibold px-3 py-1 rounded-full border border-red-200">
                {product.category}
              </span>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}