// store.js
import { create } from "zustand";

const useStore = create((set) => ({
  cartItem: [], // initial state
  setCartItem: (newCart) => set({ cartItem: newCart }), // state ni yangilash
}));

export default useStore;
