import { createContext, useEffect, useState } from "react";
import api from "../services/api";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    if (isLoggedIn) {
      fetchCart();
    } else {
      setCart([]);
    }
  }, [isLoggedIn]);

  const fetchCart = async () => {
    try {
      const res = await api.get("/users/cart");
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
    try {
      await api.post("/users/cart", {
        productId: product._id,
        name:      product.name,
        price:     product.price,
        image:     product.image,
        qty:       1
      });
      setCart(prev => [...prev, { ...product, qty: 1 }]);
    } catch (error) {
      console.log("Add to cart error:", error);
    }
  }; 

  const removeFromCart = async (id) => {
    try {
      await api.delete(`/users/cart/${id}`);
      setCart(prev => prev.filter(item => item._id !== id));
    } catch (error) {
      console.log("Remove from cart error:", error);
    }
  };

  const increaseQty = async (id) => {
    const item = cart.find(i => i._id === id);
    if (!item) return;
    const newQty = item.qty + 1;
    try {
      await api.put(`/users/cart/${id}`, { qty: newQty });
      setCart(prev =>
        prev.map(i => i._id === id ? { ...i, qty: newQty } : i)
      );
    } catch (error) {
      console.log("Increase qty error:", error);
    }
  };

  const decreaseQty = async (id) => {
    const item = cart.find(i => i._id === id);
    if (!item) return;
    const newQty = item.qty - 1;
    try {
      await api.put(`/users/cart/${id}`, { qty: newQty });
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