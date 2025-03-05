import { create } from "zustand";
import { Book } from "../type"; // Ensure you have a `Product` type

interface CartState {
  cartItems: Book[];
  addToCart: (book: Book) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

// ✅ Zustand Store for Global Cart Management
export const useCartStore = create<CartState>((set) => ({
  cartItems: [],

  addToCart: (product) =>
    set((state) => {
      const existingItem = state.cartItems.find((item) => item._id === product._id);
      if (existingItem) return state; // Prevent duplicate items
      return { cartItems: [...state.cartItems, product] };
    }),

  removeFromCart: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item._id !== id),
    })),

  clearCart: () => set({ cartItems: [] }),
}));