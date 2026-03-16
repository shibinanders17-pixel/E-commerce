
// import { useLocation, useNavigate } from "react-router-dom";
// import { useState, useContext } from "react";
// import api from "../services/api";
// import { CartContext } from "../context/CartContext";

// export default function Checkout() {

//   const location = useLocation();
//   const navigate = useNavigate();

//   const { fetchCart } = useContext(CartContext);

//   const singleProduct = location.state?.product;
//   const cartItems     = location.state?.cartItems;  

//   const orderProducts = singleProduct
//     ? [{ ...singleProduct, qty: singleProduct.qty || 1 }]
//     : cartItems || [];

//   const [name, setName]                 = useState("");
//   const [address, setAddress]           = useState("");
//   const [phone, setPhone]               = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [loading, setLoading]           = useState(false);

//   if (orderProducts.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <div className="text-center bg-white rounded-2xl shadow-sm p-12">
//           <div className="text-6xl mb-4">❌</div>
//           <h2 className="text-xl font-bold text-gray-700 mb-4">No product selected</h2>
//           <button
//             onClick={() => navigate("/")}
//             className="px-6 py-2 bg-red-500 text-white rounded-xl
//                        font-semibold hover:bg-red-600 transition"
//           >
//             Back to Shop
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const totalPrice = orderProducts.reduce(
//     (sum, item) => sum + item.price * (item.qty || 1), 0
//   );

//   const totalItems = orderProducts.reduce(
//     (sum, item) => sum + (item.qty || 1), 0
//   );

//   const handlePlaceOrder = async () => {

//     if (!name || !address || !phone || !paymentMethod) {
//       alert("Please fill all details and select payment method");
//       return;
//     }

//     const orderData = {
//       userName: name,
//       address,
//       phone,
//       paymentMethod,
//       products: orderProducts.map(item => ({
//         productId: item._id,
//         name:      item.name,
//         image:     item.image,
//         price:     item.price,
//         quantity:  item.qty || 1
//       })),
//       totalPrice,
//       totalItems,
//       status:       "Pending⏳",
//       purchaseDate: new Date().toISOString()
//     };

//     try {
//       setLoading(true);
//       await api.post("/users/orders", orderData);
//       if (fetchCart) fetchCart();
//       navigate("/success");
//     } catch (error) {
//       console.log(error);
//       alert("Something went wrong while placing order ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const paymentOptions = [
//     { value: "UPI",  label: "UPI",                  icon: "💳" },
//     { value: "Card", label: "Credit / Debit Card",  icon: "🏦" },
//     { value: "COD",  label: "Cash on Delivery",     icon: "💵" },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-100 py-6 px-4 md:px-10">


//       <p className="text-sm text-gray-400 mb-4">
//         <span className="hover:text-red-500 cursor-pointer" onClick={() => navigate("/cart")}>
//           Cart
//         </span>
//         <span className="mx-2">/</span>
//         <span className="text-gray-600 font-medium">Checkout</span>
//       </p>

//       <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">

//         <div className="md:col-span-2 flex flex-col gap-5">

//           <div className="bg-white rounded-2xl shadow-sm p-6">

//             <div className="flex items-center gap-2 mb-4">
//               <div className="w-1 h-6 bg-red-500 rounded-full" />
//               <h2 className="text-lg font-bold text-gray-800">Delivery Details</h2>
//             </div>

//             <div className="space-y-3">

//               <input
//                 placeholder="Full Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-200
//                            rounded-xl text-sm outline-none
//                            focus:border-red-400 focus:ring-1 focus:ring-red-200 transition"
//               />

//               <textarea
//                 placeholder="Delivery Address"
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//                 rows="3"
//                 className="w-full px-4 py-3 border border-gray-200
//                            rounded-xl text-sm outline-none
//                            focus:border-red-400 focus:ring-1 focus:ring-red-200
//                            transition resize-none"
//               />

//               <input
//                 type="number"
//                 placeholder="Phone Number"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-200
//                            rounded-xl text-sm outline-none
//                            focus:border-red-400 focus:ring-1 focus:ring-red-200 transition"
//               />

//             </div>

//           </div>

//           <div className="bg-white rounded-2xl shadow-sm p-6">

//             <div className="flex items-center gap-2 mb-4">
//               <div className="w-1 h-6 bg-red-500 rounded-full" />
//               <h2 className="text-lg font-bold text-gray-800">Payment Method</h2>
//             </div>

//             <div className="space-y-3">
//               {paymentOptions.map((option) => (
//                 <label
//                   key={option.value}
//                   className={`flex items-center gap-4 p-4 rounded-xl
//                               border-2 cursor-pointer transition
//                     ${paymentMethod === option.value
//                       ? "border-red-500 bg-red-50"
//                       : "border-gray-200 hover:border-red-300"
//                     }`}
//                 >
//                   <input
//                     type="radio"
//                     name="payment"
//                     value={option.value}
//                     checked={paymentMethod === option.value}
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                     className="accent-red-500"
//                   />
//                   <span className="text-xl">{option.icon}</span>
//                   <span className="text-sm font-medium text-gray-700">
//                     {option.label}
//                   </span>
//                 </label>
//               ))}
//             </div>

//           </div>

//         </div>

//         <div className="flex flex-col gap-5">

//           <div className="bg-white rounded-2xl shadow-sm p-5">

//             <div className="flex items-center gap-2 mb-4">
//               <div className="w-1 h-6 bg-red-500 rounded-full" />
//               <h2 className="text-base font-bold text-gray-800">
//                 Order Summary
//                 <span className="text-xs font-normal text-gray-400 ml-1">
//                   ({orderProducts.length} {orderProducts.length === 1 ? "item" : "items"})
//                 </span>
//               </h2>
//             </div>

//             <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-1">
//               {orderProducts.map((item) => (
//                 <div key={item._id} className="flex gap-3 items-center">
//                   <div className="w-14 h-14 bg-gray-50 rounded-xl
//                                   flex items-center justify-center shrink-0">
//                     <img
//                       src={`http://localhost:5002${item.image}`}
//                       alt={item.name}
//                       className="w-10 h-10 object-contain"
//                     />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <h3 className="text-xs font-semibold text-gray-800 line-clamp-2">
//                       {item.name}
//                     </h3>
//                     <p className="text-red-500 font-bold text-xs mt-0.5">
//                       ₹ {item.price.toLocaleString("en-IN")}
//                     </p>
//                     <p className="text-xs text-gray-400">
//                       Qty: {item.qty || 1}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//           </div>

//           <div className="bg-white rounded-2xl shadow-sm p-5">

//             <h3 className="text-sm font-bold text-gray-500 uppercase
//                            tracking-wider mb-3 pb-2 border-b border-gray-100">
//               Price Details
//             </h3>

//             <div className="space-y-2 text-sm text-gray-600">
//               <div className="flex justify-between">
//                 <span>Total Items</span>
//                 <span>{totalItems}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Delivery</span>
//                 <span className="text-green-600 font-medium">FREE</span>
//               </div>
//             </div>

//             <div className="border-t border-dashed border-gray-200 my-3" />

//             <div className="flex justify-between font-bold text-gray-800">
//               <span>Total</span>
//               <span>₹ {totalPrice.toLocaleString("en-IN")}</span>
//             </div>

//             <button
//               onClick={handlePlaceOrder}
//               disabled={loading}
//               className="w-full mt-5 py-3 bg-red-500 text-white
//                          font-bold rounded-xl hover:bg-red-600
//                          transition disabled:opacity-60 text-sm"
//             >
//               {loading ? "Placing Order..." : "Place Order 🎉"}
//             </button>

//             <p className="text-xs text-gray-400 text-center mt-2">
//               Safe & Secure Payments 🔒
//             </p>

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }




import { useNavigate, useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import api from "../services/api";
import { CartContext } from "../context/CartContext";

export default function Checkout() {

  const { id } = useParams();
  const navigate = useNavigate();
  const isCartCheckout = !id; // /checkout/cart route

  const { fetchCart } = useContext(CartContext);

  const [orderProducts, setOrderProducts] = useState([]);
  const [name, setName]                   = useState("");
  const [address, setAddress]             = useState("");
  const [phone, setPhone]                 = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading]             = useState(false);
  const [fetching, setFetching]           = useState(true);

  useEffect(() => {
    if (isCartCheckout) {
      fetchCartProducts();
    } else {
      fetchSingleProduct();
    }
  }, [id]);

  const fetchSingleProduct = async () => {
    try {
      const res = await api.get(`/users/products/${id}`);
      setOrderProducts([{ ...res.data, qty: 1 }]);
    } catch (error) {
      console.log(error);
    } finally {
      setFetching(false);
    }
  };

  const fetchCartProducts = async () => {
    try {
      const res = await api.get("/users/cart");
      const mapped = res.data.map(item => ({
        _id:   item.productId,
        name:  item.name,
        price: item.price,
        image: item.image,
        qty:   item.qty
      }));
      setOrderProducts(mapped);
    } catch (error) {
      console.log(error);
    } finally {
      setFetching(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-red-500
                        border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (orderProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-sm p-12">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-xl font-bold text-gray-700 mb-4">No product selected</h2>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-red-500 text-white rounded-xl
                       font-semibold hover:bg-red-600 transition"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const totalPrice = orderProducts.reduce(
    (sum, item) => sum + item.price * (item.qty || 1), 0
  );

  const totalItems = orderProducts.reduce(
    (sum, item) => sum + (item.qty || 1), 0
  );

  const handlePlaceOrder = async () => {

    if (!name || !address || !phone || !paymentMethod) {
      alert("Please fill all details and select payment method");
      return;
    }

    const orderData = {
      userName: name,
      address,
      phone,
      paymentMethod,
      products: orderProducts.map(item => ({
        productId: item._id,
        name:      item.name,
        image:     item.image,
        price:     item.price,
        quantity:  item.qty || 1
      })),
      totalPrice,
      totalItems,
      status:       "Pending⏳",
      purchaseDate: new Date().toISOString()
    };

    try {
      setLoading(true);
      await api.post("/users/orders", orderData);
      if (fetchCart) fetchCart();
      navigate("/success");
    } catch (error) {
      console.log(error);
      alert("Something went wrong while placing order ❌");
    } finally {
      setLoading(false);
    }
  };

  const paymentOptions = [
    { value: "UPI",  label: "UPI",                  icon: "💳" },
    { value: "Card", label: "Credit / Debit Card",  icon: "🏦" },
    { value: "COD",  label: "Cash on Delivery",     icon: "💵" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 md:px-10">


      <p className="text-sm text-gray-400 mb-4">
        <span className="hover:text-red-500 cursor-pointer" onClick={() => navigate("/cart")}>
          Cart
        </span>
        <span className="mx-2">/</span>
        <span className="text-gray-600 font-medium">Checkout</span>
      </p>

      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">

        <div className="md:col-span-2 flex flex-col gap-5">

          <div className="bg-white rounded-2xl shadow-sm p-6">

            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-red-500 rounded-full" />
              <h2 className="text-lg font-bold text-gray-800">Delivery Details</h2>
            </div>

            <div className="space-y-3">

              <input
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200
                           rounded-xl text-sm outline-none
                           focus:border-red-400 focus:ring-1 focus:ring-red-200 transition"
              />

              <textarea
                placeholder="Delivery Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows="3"
                className="w-full px-4 py-3 border border-gray-200
                           rounded-xl text-sm outline-none
                           focus:border-red-400 focus:ring-1 focus:ring-red-200
                           transition resize-none"
              />

              <input
                type="number"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200
                           rounded-xl text-sm outline-none
                           focus:border-red-400 focus:ring-1 focus:ring-red-200 transition"
              />

            </div>

          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">

            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-red-500 rounded-full" />
              <h2 className="text-lg font-bold text-gray-800">Payment Method</h2>
            </div>

            <div className="space-y-3">
              {paymentOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center gap-4 p-4 rounded-xl
                              border-2 cursor-pointer transition
                    ${paymentMethod === option.value
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 hover:border-red-300"
                    }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={option.value}
                    checked={paymentMethod === option.value}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-red-500"
                  />
                  <span className="text-xl">{option.icon}</span>
                  <span className="text-sm font-medium text-gray-700">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>

          </div>

        </div>

        <div className="flex flex-col gap-5">

          <div className="bg-white rounded-2xl shadow-sm p-5">

            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-red-500 rounded-full" />
              <h2 className="text-base font-bold text-gray-800">
                Order Summary
                <span className="text-xs font-normal text-gray-400 ml-1">
                  ({orderProducts.length} {orderProducts.length === 1 ? "item" : "items"})
                </span>
              </h2>
            </div>

            <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-1">
              {orderProducts.map((item) => (
                <div key={item._id} className="flex gap-3 items-center">
                  <div className="w-14 h-14 bg-gray-50 rounded-xl
                                  flex items-center justify-center shrink-0">
                    <img
                      src={`http://localhost:5002${item.image}`}
                      alt={item.name}
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-semibold text-gray-800 line-clamp-2">
                      {item.name}
                    </h3>
                    <p className="text-red-500 font-bold text-xs mt-0.5">
                      ₹ {item.price.toLocaleString("en-IN")}
                    </p>
                    <p className="text-xs text-gray-400">
                      Qty: {item.qty || 1}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          <div className="bg-white rounded-2xl shadow-sm p-5">

            <h3 className="text-sm font-bold text-gray-500 uppercase
                           tracking-wider mb-3 pb-2 border-b border-gray-100">
              Price Details
            </h3>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Total Items</span>
                <span>{totalItems}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="text-green-600 font-medium">FREE</span>
              </div>
            </div>

            <div className="border-t border-dashed border-gray-200 my-3" />

            <div className="flex justify-between font-bold text-gray-800">
              <span>Total</span>
              <span>₹ {totalPrice.toLocaleString("en-IN")}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="w-full mt-5 py-3 bg-red-500 text-white
                         font-bold rounded-xl hover:bg-red-600
                         transition disabled:opacity-60 text-sm"
            >
              {loading ? "Placing Order..." : "Place Order 🎉"}
            </button>

            <p className="text-xs text-gray-400 text-center mt-2">
              Safe & Secure Payments 🔒
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}