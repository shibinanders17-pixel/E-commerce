import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();

  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
  } = useContext(CartContext);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  if (cart.length === 0) {
    return (
      <h2 className="p-5 text-center text-lg">
        Your cart is empty 🛒
      </h2>
    );
  }

  const handleBuyNow = (item) => {
    navigate("/checkout", {
      state: { product: item },
    });
  };

  return (
    <div className="p-5 bg-green-200 min-h-screen">
      <h2 className="text-2xl font-semibold mb-5 text-center">
        My Cart
      </h2>

      {cart.map((item) => {
        const subtotal = item.price * item.qty;

        return (
          <div
            key={item.id}
            className="flex flex-col md:flex-row gap-5 items-center
                       border border-gray-300
                       p-4 mb-4 rounded-xl
                       bg-white"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 md:w-32 h-auto object-contain"
            />

            <div className="flex-1">
              <h3 className="text-lg font-semibold">
                {item.name}
              </h3>

              <p className="font-bold my-2">
                ₹ {item.price.toLocaleString("en-IN")}
              </p>

              <div className="flex items-center gap-3 my-2">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="px-3 py-1 bg-gray-200 rounded text-lg"
                >
                  −
                </button>

                <span className="font-semibold">
                  {item.qty}
                </span>

                <button
                  onClick={() => increaseQty(item.id)}
                  className="px-3 py-1 bg-gray-200 rounded text-lg"
                >
                  +
                </button>
              </div>

              <p className="flex flex-col sm:flex-row gap-3 mt-2">
                Subtotal: ₹ {subtotal.toLocaleString("en-IN")}
              </p>

              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="px-4 py-1 bg-red-600
                             text-white rounded-md
                             hover:bg-red-700"
                >
                  Remove
                </button>

                <button
                  onClick={() => handleBuyNow(item)}
                  className="px-4 py-1 bg-green-600
                             text-white rounded-md
                             hover:bg-green-700"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        );
      })}

      <h2 className="mt-6 text-xl md:text-2xl font-bold text-center md:text-right">
        Total: ₹ {total.toLocaleString("en-IN")}
      </h2>
    </div>
  );
}
