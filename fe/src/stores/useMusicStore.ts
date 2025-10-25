import { axiosInstance } from "@/lib/axios";
import { Album, Song, Stats } from "@/types";
import toast from "react-hot-toast";
import { create } from "zustand";

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

interface MusicStore {
  songs: Song[]; // Dành cho danh sách phân trang (SongsTable)
  songPagination: PaginationInfo;
  allSongList: Song[];
  isAllSongsLoading: boolean;
  albums: Album[];
  albumPagination: PaginationInfo;
  isLoading: boolean;
  error: string | null;
  currentAlbum: Album | null;
  featuredSongs: Song[];
  madeForYouSongs: Song[];
  trendingSongs: Song[];
  hottestAlbums: Album[];
  stats: Stats;

  fetchAlbums: () => Promise<void>;
  fetchAlbumsForAdmin: (
    page?: number,
    limit?: number,
    query?: string
  ) => Promise<void>;
  fetchAlbumById: (id: string) => Promise<void>;
  fetchFeaturedSongs: () => Promise<void>;
  fetchMadeForYouSongs: () => Promise<void>;
  fetchTrendingSongs: () => Promise<void>;
  fetchHottestAlbums: () => Promise<void>;
  fetchStats: () => Promise<void>;
  fetchSongs: (page?: number, limit?: number, query?: string) => Promise<void>;
  fetchAllSongList: () => Promise<void>;
  deleteSong: (id: string) => Promise<void>;
  deleteAlbum: (id: string) => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  albumPagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  },
  songs: [],
  songPagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  },
  allSongList: [], // all songs for ManageAlbumSongsDialog
  isAllSongsLoading: false,
  isLoading: false,
  error: null,
  currentAlbum: null,
  featuredSongs: [],
  madeForYouSongs: [],
  trendingSongs: [],
  hottestAlbums: [],
  stats: {
    totalSongs: 0,
    totalAlbums: 0,
    totalUsers: 0,
    totalArtists: 0,
  },

  deleteSong: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.delete(`/admin/songs/${id}`);

      set((state) => ({
        // update the state
        songs: state.songs.filter((song) => song._id !== id),
      }));

      toast.success("Song deleted successfully");
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteAlbum: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.delete(`/admin/albums/${id}`);

      set((state) => {
        const updatedAlbums = state.albums.filter((album) => album._id !== id);

        const updatedSongs = state.songs.map((song) => {
          if (song.albums && song.albums.includes(id)) {
            const newAlbumsForSong = song.albums.filter(
              (albumId) => albumId !== id
            );
            return { ...song, albums: newAlbumsForSong };
          }
          return song;
        });

        return {
          albums: updatedAlbums,
          songs: updatedSongs,
        };
      });

      toast.success("Album deleted successfully");
    } catch (error: any) {
      toast.error(
        "Failed to delete album: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      set({ isLoading: false });
    }
  },

  // Fetch paginated songs for SongsTable with optional search query for Admin
  fetchSongs: async (page = 1, limit = 10, query = "") => {
    set({ isLoading: true, error: null });
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        q: query,
      });
      const res = await axiosInstance.get(`/songs?${params.toString()}`);
      set({
        songs: res.data.songs,
        songPagination: {
          currentPage: res.data.currentPage,
          totalPages: res.data.totalPages,
          totalItems: res.data.totalSongs,
        },
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error?.response?.data?.message || "Failed to fetch songs",
        isLoading: false,
      });
    }
  },

  // fetch all song list for ManagerAlbumSongsDialog
  fetchAllSongList: async () => {
    set({ isAllSongsLoading: true, error: null });
    try {
      const res = await axiosInstance.get("/songs");
      set({ allSongList: res.data, isAllSongsLoading: false });
    } catch (error: any) {
      console.error("Failed to fetch all songs:", error);
      set({
        error: error?.response?.data?.message || "Failed to fetch all songs",
        isAllSongsLoading: false,
      });
    }
  },

  fetchStats: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get("/stats");
      set({ stats: res.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  // Fetch all albums (non-paginated) for user view
  fetchAlbums: async () => {
    set({
      isLoading: true,
      error: null,
    });
    try {
      const res = await axiosInstance.get("/albums");
      set({ albums: res.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  // Fetch paginated albums for admin with optional search query AlbumsTable
  fetchAlbumsForAdmin: async (page = 1, limit = 10, query = "") => {
    set({
      isLoading: true,
      error: null,
    });
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        q: query,
      });
      const res = await axiosInstance.get(`/admin/albums?${params.toString()}`);
      set({
        albums: res.data.albums,
        albumPagination: {
          currentPage: res.data.currentPage,
          totalPages: res.data.totalPages,
          totalItems: res.data.totalAlbums,
        },
        isLoading: false,
      });
    } catch (error: any) {
      console.error("Failed to fetch albums:", error);
      set({
        error: error?.response?.data?.message || "Failed to fetch albums",
        isLoading: false,
      });
    }
  },

  fetchAlbumById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get(`/albums/${id}`);
      set({ currentAlbum: res.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchFeaturedSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get("/songs/featured");
      set({ featuredSongs: res.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchMadeForYouSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get("/songs/made-for-you");
      set({ madeForYouSongs: res.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchTrendingSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get("/songs/trending");
      set({ trendingSongs: res.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchHottestAlbums: async () => {
    // Không cần set isLoading ở đây nếu HomePage đã xử lý
    // set({ isLoading: true, error: null });
    try {
      // Gọi API backend mới của bạn
      const res = await axiosInstance.get("/albums/hottest");
      set({ hottestAlbums: res.data });
    } catch (error: any) {
      console.error("Failed to fetch hottest albums:", error);
      // Có thể set lỗi nếu cần
      // set({ error: error?.response?.data?.message || "Failed to fetch hottest albums" });
    } finally {
      // set({ isLoading: false });
    }
  },
}));
