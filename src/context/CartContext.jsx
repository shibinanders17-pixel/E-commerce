

import { createContext, useEffect, useState } from "react";
import api from "../services/api";

export const CartContext = createContext();

export default function CartProvider({ children }) {

  const [cart, setCart] = useState([]);

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // ─── Fetch cart from DB on login ──────────────────────────
  useEffect(() => {
    if (isLoggedIn) {
      fetchCart();
    } else {
      setCart([]);
    }
  }, [isLoggedIn]);

  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await api.get("/users/cart", {
        headers: { Authorization: token }
      });
      const mapped = res.data.map(item => ({
        _id:   item.productId,
        name:  item.name,
        price: item.price,
        image: item.image,
        qty:   item.qty
      }));
      setCart(mapped);
    } catch (error) {
      console.log("Cart fetch error:", error);
    }
  };

  const addToCart = async (product) => {
    const token = localStorage.getItem("token");
    try {
      await api.post("/users/cart", {
        productId: product._id,
        name:      product.name,
        price:     product.price,
        image:     product.image,
        qty:       1
      }, {
        headers: { Authorization: token }
      });
      setCart(prev => [...prev, { ...product, qty: 1 }]);
    } catch (error) {
      console.log("Add to cart error:", error);
    }
  };

  const removeFromCart = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await api.delete(`/users/cart/${id}`, {
        headers: { Authorization: token }
      });
      setCart(prev => prev.filter(item => item._id !== id));
    } catch (error) {
      console.log("Remove from cart error:", error);
    }
  };

  const increaseQty = async (id) => {
    const token = localStorage.getItem("token");
    const item = cart.find(i => i._id === id);
    if (!item) return;
    const newQty = item.qty + 1;
    try {
      await api.put(`/users/cart/${id}`, { qty: newQty }, {
        headers: { Authorization: token }
      });
      setCart(prev =>
        prev.map(i => i._id === id ? { ...i, qty: newQty } : i)
      );
    } catch (error) {
      console.log("Increase qty error:", error);
    }
  };

  const decreaseQty = async (id) => {
    const token = localStorage.getItem("token");
    const item = cart.find(i => i._id === id);
    if (!item) return;
    const newQty = item.qty - 1;
    try {
      await api.put(`/users/cart/${id}`, { qty: newQty }, {
        headers: { Authorization: token }
      });
      if (newQty <= 0) {
        setCart(prev => prev.filter(i => i._id !== id));
      } else {
        setCart(prev =>
          prev.map(i => i._id === id ? { ...i, qty: newQty } : i)
        );
      }
    } catch (error) {
      console.log("Decrease qty error:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        fetchCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}