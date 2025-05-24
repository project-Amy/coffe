import { CoffeCup } from "@/types/types";
import { create } from "zustand";

interface CartStore {
  coffe: CoffeCup[];
  addCoffe: (coffe: CoffeCup) => void;
  removeCoffe: (coffe: CoffeCup) => void;
  clearCart: () => void;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  coffe: [],
  addCoffe: (coffe) => set((state) => ({ coffe: [...state.coffe, coffe] })),
  removeCoffe: (coffe) =>
    set((state) => ({ coffe: state.coffe.filter((c) => c !== coffe) })),
  clearCart: () => set({ coffe: [] }),
  totalPrice: () => {
    const total = get().coffe.reduce((acc, coffe) => acc + coffe.price, 0);
    return total;
  },
}));

