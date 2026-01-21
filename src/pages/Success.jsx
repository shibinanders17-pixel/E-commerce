import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="min-h-screen flex items-center justify-center
                    bg-green-50 p-6">
      
      <div className="bg-white shadow-lg rounded-xl
                      px-10 py-8 text-center max-w-md w-full">
        
        <div className="text-5xl mb-4">✅</div>

        <h1 className="text-2xl font-bold text-green-700 mb-2">
          Order Successful
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for your order!  
          Your purchase has been placed successfully.
        </p>

        <Link to="/">
          <button
            className="px-6 py-2 rounded-lg
                       bg-blue-500 text-white
                       font-medium
                       hover:bg-blue-600
                       transition"
          >
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
}

