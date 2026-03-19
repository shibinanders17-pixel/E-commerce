
import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center
                    bg-linear-to-br from-green-50 to-emerald-100 p-6">

      <div className="bg-white shadow-xl rounded-3xl
                      px-10 py-10 text-center max-w-md w-full">

        {/* Animated Check */}
        <div className="w-20 h-20 bg-green-100 rounded-full
                        flex items-center justify-center mx-auto mb-5
                        animate-bounce">
          <span className="text-4xl">✅</span>
        </div>

        <h1 className="text-2xl font-black text-gray-800 mb-2">
          Order Placed Successfully!
        </h1>

        <p className="text-gray-500 text-sm mb-2">
          Thank you for your purchase! 🎉
        </p>
        <p className="text-gray-400 text-xs mb-8">
          We'll deliver your order within 5 business days.
        </p>

        {/* Divider */}
        <div className="border-t border-dashed border-gray-200 mb-6" />

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/orders")}
            className="w-full py-3 bg-red-500 text-white
                       font-bold rounded-xl hover:bg-red-600
                       transition text-sm"
          >
            📦 View My Orders
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full py-3 bg-gray-100 text-gray-700
                       font-semibold rounded-xl hover:bg-gray-200
                       transition text-sm"
          >
            🛍️ Continue Shopping
          </button>
        </div>

      </div>

    </div>
  );
}