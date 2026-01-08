import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {

  const [cart, setCart] = useState(
    localStorage.getItem("cart") ?
    JSON.parse(localStorage.getItem("cart")) : []
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);

      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const increaseQty = (id) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(prev =>
      prev
        .map(item =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter(item => item.qty > 0)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

