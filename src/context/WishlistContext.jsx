import { createContext, useContext, useMemo, useState } from 'react';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([]);

  const toggleWishlist = (product) => {
    setItems((current) =>
      current.some((item) => item.id === product.id)
        ? current.filter((item) => item.id !== product.id)
        : [...current, product],
    );
  };

  const removeWishlist = (id) => setItems((current) => current.filter((item) => item.id !== id));
  const isWishlisted = (id) => items.some((item) => item.id === id);

  const value = useMemo(
    () => ({ items, count: items.length, toggleWishlist, removeWishlist, isWishlisted }),
    [items],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export const useWishlist = () => useContext(WishlistContext);
