import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

interface AuthStore {
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;
  favoriteSongIds: Set<string>;

  checkAdminStatus: () => Promise<void>;
  reset: () => void;
  fetchFavorites: () => Promise<void>;
  toggleFavorite: (songId: string) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  isAdmin: false,
  isLoading: false,
  error: null,
  favoriteSongIds: new Set(),

  checkAdminStatus: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get("/admin/check");
      set({ isAdmin: res.data.admin });
    } catch (error: any) {
      set({
        isAdmin: false,
        error: error.response?.data?.message || "Failed to check admin status",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchFavorites: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get<string[]>("/users/favorites");
      set({ favoriteSongIds: new Set(res.data), isLoading: false });
    } catch (error: any) {
      console.error("Failed to fetch favorites:", error);
      set({
        error: "Failed to load favorites",
        isLoading: false,
      });
    }
  },

  toggleFavorite: async (songId: string) => {
    const currentFavorites = new Set(get().favoriteSongIds);
    const isFavorite = currentFavorites.has(songId);

    if (isFavorite) {
      currentFavorites.delete(songId);
    } else {
      currentFavorites.add(songId);
    }
    set({ favoriteSongIds: currentFavorites });

    // Gọi API backend /users/toggle-favorite
    try {
      await axiosInstance.post("/users/toggle-favorite", { songId });
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
      const oldFavorites = new Set(get().favoriteSongIds);
      if (isFavorite) {
        oldFavorites.add(songId); // Lúc nãy lỡ xóa, giờ thêm lại
      } else {
        oldFavorites.delete(songId); // Lúc nãy lỡ thêm, giờ xóa đi
      }
      set({
        favoriteSongIds: oldFavorites,
        error: "Failed to update favorite",
      });
    }
  },

  reset: () => {
    set({
      isAdmin: false,
      isLoading: false,
      error: null,
      favoriteSongIds: new Set(),
    });
  },
}));
