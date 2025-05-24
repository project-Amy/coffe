import { create } from "zustand";

interface FavoriteStore {
  favorites: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  allFavorites: () => string[];
}

export const useFavoriteStore = create<FavoriteStore>((set, get) => ({
  favorites: [],
  addFavorite: (id) => set((state) => ({ favorites: [...state.favorites, id] })),
  removeFavorite: (id) => set((state) => ({ favorites: state.favorites.filter((f) => f !== id) })),
  allFavorites: () => get().favorites,
}));

