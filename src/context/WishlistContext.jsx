import { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const WishlistContext = createContext();

export default function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    if (isLoggedIn) {
      fetchWishlist();
    } else {
      setWishlist([]);
    }
  }, [isLoggedIn]);

  const fetchWishlist = async () => {
    try {
      const res = await api.get("/users/wishlist");
      const mapped = res.data.map(item => ({
        _id:      item.productId,
        name:     item.name,
        price:    item.price,
        image:    item.image,
        category: item.category
      }));
      setWishlist(mapped);
    } catch (error) {
      console.log("Wishlist fetch error:", error);
    }
  };

  const addToWishlist = async (product) => {
    try {
      await api.post("/users/wishlist", {
        productId: product._id,
        name:      product.name,
        price:     product.price,
        image:     product.image,
        category:  product.category
      });
      setWishlist(prev => [...prev, product]);
    } catch (error) {
      console.log("Add to wishlist error:", error);
    }
  };

  const removeFromWishlist = async (id) => {
    try {
      await api.delete(`/users/wishlist/${id}`);
      setWishlist(prev => prev.filter(item => item._id !== id));
    } catch (error) {
      console.log("Remove from wishlist error:", error);
    }
  };

  const isInWishlist = (id) => {
    return wishlist.some(item => item._id === id);
  };


  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        fetchWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}