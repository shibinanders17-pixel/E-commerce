import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";

const getFakeRating = (id) => {
  const hash = id ? id.charCodeAt(id.length - 1) % 5 : 0;
  return [4.1, 4.2, 4.3, 4.4, 4.5][hash];
};

const getFakeReviews = (id) => {
  const hash = id ? id.charCodeAt(id.length - 1) % 10 : 0;
  return [1200, 2300, 3400, 4500, 5600, 6700, 7800, 8900, 9100, 10200][hash];
};

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const { cart, addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const isInCart = (id) => cart.some((item) => item._id === id);

  const handleMoveToCart = (item) => {
    if (!isInCart(item._id)) addToCart(item);
  };

  const handleBuyNow = (item) => {
    navigate("/checkout", { state: { product: item } });
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-4">
        <div className="bg-white rounded-2xl shadow p-12 flex flex-col items-center gap-4">
          <span className="text-7xl">🤍</span>
          <h2 className="text-2xl font-bold text-gray-700">Your Wishlist is Empty</h2>
          <p className="text-gray-400 text-sm">Save items you love to your wishlist</p>
          <button
            onClick={() => navigate("/")}
            className="mt-2 px-6 py-2.5 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
          >
            ← Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="bg-white shadow-sm px-4 md:px-8 py-4 flex items-center gap-4">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600 transition"
        >
          ← Continue Shopping
        </button>
        <h1 className="text-xl font-bold text-gray-800">
          My Wishlist 🤍
          <span className="ml-2 text-sm font-normal text-gray-400">
            ({wishlist.length} {wishlist.length === 1 ? "item" : "items"})
          </span>
        </h1>
      </div>


      <div className="px-4 md:px-8 py-5 flex flex-col gap-3 max-w-5xl mx-auto">
        {wishlist.map((item) => {
          const rating = getFakeRating(item._id);
          const reviews = getFakeReviews(item._id);
          const inCart = isInCart(item._id);
          const discount = item.originalPrice && item.originalPrice > item.price
            ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
            : null;
        
          return (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col sm:flex-row gap-4 p-4 md:p-5"
            >

              <div
                className="shrink-0 w-full sm:w-44 h-44 flex items-center justify-center bg-gray-50 rounded-xl cursor-pointer"
                onClick={() => navigate(`/productsDet/${item._id}`)}
              >
                <img
                  src={`http://localhost:5002${item.image}`}
                  alt={item.name}
                  className="w-36 h-36 object-contain hover:scale-105 transition-transform duration-200"
                />
              </div>

              <div className="flex-1 min-w-0">

                <h3
                  className="text-base font-semibold text-blue-600 hover:underline cursor-pointer line-clamp-2 mb-1"
                  onClick={() => navigate(`/productsDet/${item._id}`)}
                >
                  {item.name}
                </h3>

                {item.category && (
                  <span className="inline-block bg-red-50 text-red-500 text-xs font-semibold px-2 py-0.5 rounded-full border border-red-200 mb-2">
                    {item.category}
                  </span>
                )}

                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1">
                    {rating} ★
                  </span>
                  <span className="text-xs text-gray-400">
                    {reviews.toLocaleString("en-IN")} Ratings
                  </span>
                </div>

              </div>

              <div className="flex flex-col sm:items-end justify-between sm:min-w-44 gap-3">

                <div className="sm:text-right">
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{item.price.toLocaleString("en-IN")}
                  </p>
                  {item.originalPrice && item.originalPrice > item.price && (
                    <div className="flex sm:justify-end items-center gap-2 mt-0.5">
                      <p className="text-sm text-gray-400 line-through">
                        ₹{item.originalPrice.toLocaleString("en-IN")}
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
                    onClick={() => handleMoveToCart(item)}
                    className={`w-full py-2 rounded-lg text-sm font-semibold border transition
                      ${inCart
                        ? "bg-green-500 text-white border-green-500 cursor-default"
                        : "bg-white text-red-500 border-red-400 hover:bg-red-50"}`}
                  >
                    {inCart ? "Already in Cart ✓" : "🛒 Move to Cart"}
                  </button>

                  <button
                    onClick={() => handleBuyNow(item)}
                    className="w-full py-2 rounded-lg text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition"
                  >
                    Buy Now
                  </button>

                  <button
                    onClick={() => removeFromWishlist(item._id)}
                    className="w-full py-2 rounded-lg text-sm font-semibold border border-gray-300 text-gray-500 hover:border-red-400 hover:text-red-500 transition"
                  >
                    ✕ Remove
                  </button>

                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}