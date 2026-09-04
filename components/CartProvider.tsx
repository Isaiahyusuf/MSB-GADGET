"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { CartItem, Listing } from "@/types/marketplace";

type CartContextValue = {
  items: CartItem[];
  add: (listing: Listing, quantity?: number) => void;
  remove: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  total: number;
  count: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "msb_guest_cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = window.localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items]);

  function add(listing: Listing, quantity = 1) {
    setItems((current) => {
      const existing = current.find((item) => item.id === listing.id);
      if (existing) {
        return current.map((item) => item.id === listing.id ? { ...item, cartQuantity: Math.min(item.cartQuantity + quantity, listing.quantity) } : item);
      }
      return [...current, { ...listing, cartQuantity: Math.min(quantity, listing.quantity) }];
    });
  }

  function setQuantity(id: string, quantity: number) {
    if (quantity <= 0) return remove(id);
    setItems((current) => current.map((item) => item.id === id ? { ...item, cartQuantity: Math.min(quantity, item.quantity) } : item));
  }

  function remove(id: string) { setItems((current) => current.filter((item) => item.id !== id)); }

  return <CartContext.Provider value={{ items, add, remove, setQuantity, total: items.reduce((sum, item) => sum + item.price * item.cartQuantity, 0), count: items.reduce((sum, item) => sum + item.cartQuantity, 0) }}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}