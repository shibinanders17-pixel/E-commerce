
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

const getFakeRating = (id) => {
  const hash = id ? id.charCodeAt(id.length - 1) % 5 : 0;
  return [4.1, 4.2, 4.3, 4.4, 4.5][hash];
};

const getFakeReviews = (id) => {
  const hash = id ? id.charCodeAt(id.length - 1) % 10 : 0;
  return [1200, 2300, 3400, 4500, 5600, 6700, 7800, 8900, 9100, 10200][hash];
};

const getRatingStars = (rating) => {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return { full, half, empty };
};

export default function ProductsDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);

  const [product, setProduct]       = useState(null);
  const [selectedView, setSelectedView] = useState(0);
  const [qty, setQty]               = useState(1);

  const imageViews = [
    { transform: "scale-100",                label: "Front" },
    { transform: "scale-150",                label: "Zoom"  },
    { transform: "scale-150 translate-x-8",  label: "Right" },
    { transform: "scale-150 -translate-x-8", label: "Left"  },
  ];

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/users/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent
                          rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading product...</p>
        </div>
      </div>
    );
  }

  const isInCart  = cart.some(item => item._id === product._id);
  const wishlisted = isInWishlist(product._id);
  const rating    = getFakeRating(product._id);
  const reviews   = getFakeReviews(product._id);
  const stars     = getRatingStars(rating);
  const discount  = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const getDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 5);
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) { navigate("/login"); return; }
    isInCart ? removeFromCart(product._id) : addToCart(product);
  };

  const handleBuyNow = () => {
    if (!isLoggedIn) { navigate("/login"); return; }
    navigate(`/checkout/product/${product._id}`, { state: { qty } });
  };

  const handleWishlist = () => {
    if (!isLoggedIn) { navigate("/login"); return; }
    wishlisted ? removeFromWishlist(product._id) : addToWishlist(product);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-6 px-4 md:px-10">

      {/* Breadcrumb */}
      <p className="text-sm text-gray-400 mb-5 max-w-6xl mx-auto">
        <span className="hover:text-red-500 cursor-pointer transition" onClick={() => navigate("/")}>
          🏠 Home
        </span>
        <span className="mx-2">/</span>
        <span className="text-gray-500">{product.category}</span>
        <span className="mx-2">/</span>
        <span className="text-gray-700 font-medium">{product.name}</span>
      </p>

      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
          <div className="flex flex-col lg:flex-row">

            {/* ── LEFT — Image Section ──────────────────── */}
            <div className="lg:w-2/5 bg-linear-150-to-br from-gray-50 to-gray-100
                            flex flex-row p-5 gap-4 border-r border-gray-100">

              {/* Thumbnails */}
              <div className="flex flex-col gap-2.5">
                {imageViews.map((view, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedView(index)}
                    className={`w-16 h-16 rounded-xl border-2 cursor-pointer
                                flex items-center justify-center bg-white
                                overflow-hidden transition-all duration-200 shadow-sm
                      ${selectedView === index
                        ? "border-red-500 shadow-red-100 shadow-md"
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

              {/* Main Image */}
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex items-center justify-center flex-1
                                overflow-hidden rounded-2xl p-4 bg-white
                                shadow-inner min-h-72">
                  <img
                    src={`http://localhost:5002${product.image}`}
                    alt={product.name}
                    className={`w-full max-w-xs object-contain transition-transform
                                duration-500 ${imageViews[selectedView].transform}`}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 py-3 rounded-xl font-bold text-sm
                                flex items-center justify-center gap-2 transition
                      ${isInCart
                        ? "bg-green-500 text-white shadow-lg shadow-green-200"
                        : "bg-white border-2 border-red-500 text-red-500 hover:bg-red-50"}`}
                  >
                    🛒 {isInCart ? "Added ✓" : "Add to Cart"}
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 py-3 rounded-xl font-bold text-sm
                               bg-red-500 text-white hover:bg-red-600
                               shadow-lg shadow-red-200 transition
                               flex items-center justify-center gap-2"
                  >
                    ⚡ Buy Now
                  </button>
                </div>
              </div>
            </div>

            {/* ── RIGHT — Product Info ──────────────────── */}
            <div className="flex-1 p-6 md:p-8 flex flex-col gap-5">

              {/* Name + Wishlist + Category */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-2">
                  {product.category && (
                    <span className="inline-block bg-red-50 text-red-500
                                     text-xs font-bold px-3 py-1 rounded-full
                                     border border-red-200">
                      {product.category}
                    </span>
                  )}
                  {/* Wishlist */}
                  <button
                    onClick={handleWishlist}
                    className={`w-9 h-9 rounded-full flex items-center justify-center
                                transition shrink-0 shadow-sm
                      ${wishlisted
                        ? "bg-red-500 text-white"
                        : "bg-gray-100 hover:bg-red-50"}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 transition ${wishlisted
                        ? "fill-white stroke-white"
                        : "fill-none stroke-gray-500 hover:stroke-red-400"}`}
                      viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>

                <h1 className="text-2xl font-black text-gray-900 leading-tight">
                  {product.name}
                </h1>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-green-600
                                text-white text-sm font-bold px-3 py-1 rounded-lg">
                  <span>{rating}</span>
                  <span>★</span>
                </div>
                <div className="flex items-center gap-0.5">
                  {[...Array(stars.full)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-base">★</span>
                  ))}
                  {stars.half === 1 && <span className="text-yellow-400 text-base">½</span>}
                  {[...Array(stars.empty)].map((_, i) => (
                    <span key={i} className="text-gray-300 text-base">★</span>
                  ))}
                </div>
                <span className="text-sm text-gray-400">
                  {reviews.toLocaleString("en-IN")} Ratings
                </span>
              </div>

              {/* Price */}
              <div className="bg-gray-50 rounded-2xl p-4">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <p className="text-3xl font-black text-gray-900">
                    ₹ {product.price.toLocaleString("en-IN")}
                  </p>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <>
                      <p className="text-lg text-gray-400 line-through">
                        ₹ {product.originalPrice.toLocaleString("en-IN")}
                      </p>
                      {discount && (
                        <span className="bg-green-100 text-green-700
                                         text-sm font-bold px-2 py-0.5 rounded-lg">
                          {discount}% OFF
                        </span>
                      )}
                    </>
                  )}
                </div>
                {discount && (
                  <p className="text-xs text-green-600 font-medium mt-1">
                    🎉 You save ₹ {(product.originalPrice - product.price).toLocaleString("en-IN")}!
                  </p>
                )}
              </div>

              {/* Qty Selector */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-gray-600">Quantity:</span>
                <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="px-4 py-2 bg-gray-50 hover:bg-gray-100
                               font-bold text-gray-700 transition text-lg"
                  >
                    −
                  </button>
                  <span className="px-5 py-2 font-bold text-gray-800 text-base">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(q => q + 1)}
                    className="px-4 py-2 bg-gray-50 hover:bg-gray-100
                               font-bold text-gray-700 transition text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: "🚚", title: "Free Delivery",   desc: `By ${getDeliveryDate()}`  },
                  { icon: "↩️", title: "7 Day Return",    desc: "Easy returns"              },
                  { icon: "✅", title: "In Stock",        desc: "Ready to ship"             },
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                    <p className="text-xl mb-1">{item.icon}</p>
                    <p className="text-xs font-bold text-gray-700">{item.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="w-full h-px bg-gray-100" />

              {/* Specs */}
              {product.specs && (
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                    Specifications
                  </h3>
                  <div className="space-y-2">
                    {product.specs.split("\n").filter(Boolean).map((line, index) => (
                      <div key={index} className="flex items-start gap-3 py-2
                                                   border-b border-gray-50 last:border-0">
                        <span className="w-2 h-2 rounded-full bg-red-400 mt-1.5 shrink-0" />
                        <span className="text-sm text-gray-700">{line}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              {product.description && (
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                    Description
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed bg-gray-50
                                rounded-xl p-4 border border-gray-100">
                    {product.description}
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}