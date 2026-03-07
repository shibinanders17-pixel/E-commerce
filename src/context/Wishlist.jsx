
import { useContext } from "react";
import { WishlistContext } from "./WishlistContext";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const { cart, addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  if (wishlist.length === 0) {
    return (
      <div className="p-5 bg-pink-50 min-h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="text-lg text-center">Your wishlist is empty 🤍</h2>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600 transition"
        >
          ← Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="p-5 bg-pink-50 min-h-screen">
      <div className="flex items-center justify-between mb-5 max-w-6xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600 transition"
        >
          ← Continue Shopping
        </button>
        <h2 className="text-2xl font-semibold text-center">
          My Wishlist 🤍
        </h2>
        <div className="w-36" /> {/* spacer */}
      </div>

      <div className="flex flex-wrap justify-center gap-5">
        {wishlist.map((item) => {
          const isInCart = cart.some(c => c._id === item._id);
          return (
            <div
              key={item._id}
              className="bg-white border border-gray-200 rounded-xl
                         p-4 w-full sm:w-[48%] md:w-[30%] lg:w-[22%]
                         text-center shadow-sm"
            >
              <img
                src={`http://localhost:5002${item.image}`}
                alt={item.name}
                className="w-full h-40 object-contain mb-3"
              />
              <h3 className="font-semibold text-gray-800">
                {item.name}
              </h3>
              <p className="text-green-700 font-bold my-2">
                ₹ {item.price.toLocaleString("en-IN")}
              </p>
              <div className="flex flex-col gap-2 mt-3">
                <button
                  onClick={() => {
                    if (!isInCart) addToCart(item);
                    navigate("/cart");
                  }}
                  className={`px-4 py-2 rounded-md text-sm text-white
                    ${isInCart
                      ? "bg-green-500"
                      : "bg-blue-500 hover:bg-blue-600"
                    }`}
                >
                  {isInCart ? "Already in Cart ✓" : "Move to Cart 🛒"}
                </button>
                <button
                  onClick={() => removeFromWishlist(item._id)}
                  className="px-4 py-2 rounded-md text-sm
                             bg-red-500 text-white hover:bg-red-600"
                >
                  Remove ❌
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}