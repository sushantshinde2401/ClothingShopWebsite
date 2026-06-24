import { createContext, useContext, useMemo, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [toast, setToast] = useState('');

  const addToCart = (product, options = {}) => {
    const key = `${product.id}-${options.size || 'M'}-${options.color || product.colors?.[0] || 'Default'}`;
    setItems((current) => {
      const existing = current.find((item) => item.key === key);
      if (existing) {
        return current.map((item) => (item.key === key ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...current, { ...product, ...options, key, quantity: 1 }];
    });
    setToast(`${product.name} added to cart`);
  };

  const updateQty = (key, quantity) => {
    setItems((current) =>
      current
        .map((item) => (item.key === key ? { ...item, quantity: Math.max(1, quantity) } : item))
        .filter(Boolean),
    );
  };

  const removeFromCart = (key) => setItems((current) => current.filter((item) => item.key !== key));

  const value = useMemo(() => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return { items, count, subtotal, toast, setToast, addToCart, updateQty, removeFromCart };
  }, [items, toast]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
