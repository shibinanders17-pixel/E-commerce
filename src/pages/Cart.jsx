// import { useContext } from "react";
// import { CartContext } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";

// export default function Cart() {

//   const navigate = useNavigate();

//   const {
//     cart,
//     removeFromCart,
//     increaseQty,
//     decreaseQty,
//   } = useContext(CartContext);

//   const total = cart.reduce(
//     (sum, item) => sum + item.price * item.qty, 0
//   );

//   if (cart.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <div className="text-center bg-white rounded-2xl shadow-sm p-12">
//           <div className="text-7xl mb-4">🛒</div>
//           <h2 className="text-xl font-bold text-gray-700 mb-2">
//             Your cart is empty!
//           </h2>
//           <p className="text-gray-400 mb-6">
//             Add items to get started
//           </p>
//           <button
//             onClick={() => navigate("/")}
//             className="px-6 py-2 bg-red-500 text-white
//                        rounded-xl font-semibold hover:bg-red-600 transition"
//           >
//             Shop Now
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const handleBuyNow = (item) => {
//     navigate("/checkout", { state: { product: item } });
//   };

//   const handlePlaceOrder = () => {
//     navigate("/checkout", { state: { cartItems: cart } });
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen py-6 px-4 md:px-10">

//       <p className="text-sm text-gray-400 mb-4">
//         <span
//           className="hover:text-red-500 cursor-pointer transition"
//           onClick={() => navigate("/")}
//         >
//           🏠 Home
//         </span>
//         <span className="mx-2">/</span>
//         <span className="text-gray-600 font-medium">My Cart</span>
//       </p>

//       <h2 className="text-xl font-bold text-gray-800 mb-4">
//         My Cart
//         <span className="text-sm font-normal text-gray-400 ml-2">
//           ({cart.length} {cart.length === 1 ? "item" : "items"})
//         </span>
//       </h2>

//       <div className="flex flex-col lg:flex-row gap-6">

//         <div className="flex-1 flex flex-col gap-4">

//           {cart.map((item) => {
//             const subtotal = item.price * item.qty;
//             return (
//               <div
//                 key={item._id}
//                 className="bg-white rounded-2xl shadow-sm p-4 md:p-5
//                            flex flex-col sm:flex-row gap-4 items-start"
//               >

//                 <div className="w-28 h-28 shrink-0 bg-gray-50
//                                 rounded-xl flex items-center justify-center">
//                   <img
//                     src={`http://localhost:5002${item.image}`}
//                     alt={item.name}
//                     className="w-24 h-24 object-contain"
//                   />
//                 </div>

//                 <div className="flex-1">

//                   <h3 className="text-base font-semibold text-gray-800">
//                     {item.name}
//                   </h3>

//                   <p className="text-lg font-bold text-red-500 mt-1">
//                     ₹ {item.price.toLocaleString("en-IN")}
//                   </p>

//                   <div className="flex items-center gap-3 mt-3">
//                     <span className="text-sm text-gray-500">Qty:</span>
//                     <div className="flex items-center border border-gray-300
//                                     rounded-lg overflow-hidden">
//                       <button
//                         onClick={() => decreaseQty(item._id)}
//                         className="px-3 py-1 bg-gray-100 hover:bg-gray-200
//                                    text-lg font-bold transition"
//                       >
//                         −
//                       </button>
//                       <span className="px-4 py-1 font-semibold text-gray-800">
//                         {item.qty}
//                       </span>
//                       <button
//                         onClick={() => increaseQty(item._id)}
//                         className="px-3 py-1 bg-gray-100 hover:bg-gray-200
//                                    text-lg font-bold transition"
//                       >
//                         +
//                       </button>
//                     </div>
//                   </div>


//                   <div className="flex flex-wrap items-center
//                                   justify-between mt-4 gap-3">

//                     <p className="text-sm text-gray-500">
//                       Subtotal:
//                       <span className="text-gray-800 font-bold ml-1">
//                         ₹ {subtotal.toLocaleString("en-IN")}
//                       </span>
//                     </p>

//                     <div className="flex gap-2">

//                       <button
//                         onClick={() => removeFromCart(item._id)}
//                         className="px-4 py-1.5 rounded-lg text-sm font-medium
//                                    border border-red-400 text-red-500
//                                    hover:bg-red-50 transition"
//                       >
//                         Remove
//                       </button>

//                       <button
//                         onClick={() => handleBuyNow(item)}
//                         className="px-4 py-1.5 rounded-lg text-sm font-medium
//                                    bg-red-500 text-white
//                                    hover:bg-red-600 transition"
//                       >
//                         Buy Now
//                       </button>

//                     </div>

//                   </div>

//                 </div>

//               </div>
//             );
//           })}

//         </div>

//         {/* Order Summary */}
//         <div className="lg:w-80">
//           <div className="bg-white rounded-2xl shadow-sm p-5 sticky top-24">

//             <h3 className="text-base font-bold text-gray-700 uppercase
//                            tracking-wider mb-4 pb-3 border-b border-gray-100">
//               Price Details
//             </h3>

//             <div className="space-y-3 text-sm text-gray-600">

//               <div className="flex justify-between">
//                 <span>Price ({cart.length} items)</span>
//                 <span>₹ {total.toLocaleString("en-IN")}</span>
//               </div>

//               <div className="flex justify-between">
//                 <span>Delivery Charges</span>
//                 <span className="text-green-600 font-medium">FREE</span>
//               </div>

//             </div>

//             <div className="border-t border-dashed border-gray-200 my-4" />

//             <div className="flex justify-between text-base font-bold text-gray-800">
//               <span>Total Amount</span>
//               <span>₹ {total.toLocaleString("en-IN")}</span>
//             </div>

//             <p className="text-xs text-green-600 mt-2 mb-4">
//               🎉 You will save on this order!
//             </p>

//             <button
//               onClick={handlePlaceOrder}
//               className="w-full py-3 bg-red-500 text-white font-bold
//                          rounded-xl hover:bg-red-600 transition text-sm"
//             >
//               Place Order
//             </button>

//           </div>
//         </div>

//       </div>

//     </div>
//   );
// }





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
    (sum, item) => sum + item.price * item.qty, 0
  );

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-sm p-12">
          <div className="text-7xl mb-4">🛒</div>
          <h2 className="text-xl font-bold text-gray-700 mb-2">
            Your cart is empty!
          </h2>
          <p className="text-gray-400 mb-6">
            Add items to get started
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-red-500 text-white
                       rounded-xl font-semibold hover:bg-red-600 transition"
          >
            Shop Now
          </button>
        </div>
      </div>
    );
  }

  const handleBuyNow = (item) => {
    navigate(`/checkout/product/${item._id}`);
  };

  const handlePlaceOrder = () => {
    navigate("/checkout/cart");
  };

  return (
    <div className="bg-gray-100 min-h-screen py-6 px-4 md:px-10">

      <p className="text-sm text-gray-400 mb-4">
        <span
          className="hover:text-red-500 cursor-pointer transition"
          onClick={() => navigate("/")}
        >
          🏠 Home
        </span>
        <span className="mx-2">/</span>
        <span className="text-gray-600 font-medium">My Cart</span>
      </p>

      <h2 className="text-xl font-bold text-gray-800 mb-4">
        My Cart
        <span className="text-sm font-normal text-gray-400 ml-2">
          ({cart.length} {cart.length === 1 ? "item" : "items"})
        </span>
      </h2>

      <div className="flex flex-col lg:flex-row gap-6">

        <div className="flex-1 flex flex-col gap-4">

          {cart.map((item) => {
            const subtotal = item.price * item.qty;
            return (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-sm p-4 md:p-5
                           flex flex-col sm:flex-row gap-4 items-start"
              >

                <div className="w-28 h-28 shrink-0 bg-gray-50
                                rounded-xl flex items-center justify-center">
                  <img
                    src={`http://localhost:5002${item.image}`}
                    alt={item.name}
                    className="w-24 h-24 object-contain"
                  />
                </div>

                <div className="flex-1">

                  <h3 className="text-base font-semibold text-gray-800">
                    {item.name}
                  </h3>

                  <p className="text-lg font-bold text-red-500 mt-1">
                    ₹ {item.price.toLocaleString("en-IN")}
                  </p>

                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-sm text-gray-500">Qty:</span>
                    <div className="flex items-center border border-gray-300
                                    rounded-lg overflow-hidden">
                      <button
                        onClick={() => decreaseQty(item._id)}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200
                                   text-lg font-bold transition"
                      >
                        −
                      </button>
                      <span className="px-4 py-1 font-semibold text-gray-800">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => increaseQty(item._id)}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200
                                   text-lg font-bold transition"
                      >
                        +
                      </button>
                    </div>
                  </div>


                  <div className="flex flex-wrap items-center
                                  justify-between mt-4 gap-3">

                    <p className="text-sm text-gray-500">
                      Subtotal:
                      <span className="text-gray-800 font-bold ml-1">
                        ₹ {subtotal.toLocaleString("en-IN")}
                      </span>
                    </p>

                    <div className="flex gap-2">

                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="px-4 py-1.5 rounded-lg text-sm font-medium
                                   border border-red-400 text-red-500
                                   hover:bg-red-50 transition"
                      >
                        Remove
                      </button>

                      <button
                        onClick={() => handleBuyNow(item)}
                        className="px-4 py-1.5 rounded-lg text-sm font-medium
                                   bg-red-500 text-white
                                   hover:bg-red-600 transition"
                      >
                        Buy Now
                      </button>

                    </div>

                  </div>

                </div>

              </div>
            );
          })}

        </div>

        {/* Order Summary */}
        <div className="lg:w-80">
          <div className="bg-white rounded-2xl shadow-sm p-5 sticky top-24">

            <h3 className="text-base font-bold text-gray-700 uppercase
                           tracking-wider mb-4 pb-3 border-b border-gray-100">
              Price Details
            </h3>

            <div className="space-y-3 text-sm text-gray-600">

              <div className="flex justify-between">
                <span>Price ({cart.length} items)</span>
                <span>₹ {total.toLocaleString("en-IN")}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="text-green-600 font-medium">FREE</span>
              </div>

            </div>

            <div className="border-t border-dashed border-gray-200 my-4" />

            <div className="flex justify-between text-base font-bold text-gray-800">
              <span>Total Amount</span>
              <span>₹ {total.toLocaleString("en-IN")}</span>
            </div>

            <p className="text-xs text-green-600 mt-2 mb-4">
              🎉 You will save on this order!
            </p>

            <button
              onClick={handlePlaceOrder}
              className="w-full py-3 bg-red-500 text-white font-bold
                         rounded-xl hover:bg-red-600 transition text-sm"
            >
              Place Order
            </button>

          </div>
        </div>

      </div>

    </div>
  );
}