import { create } from "zustand";
import { Song } from "@/types";
import { useChatStore } from "./useChatStore";

type RepeatMode = "off" | "all" | "one";

interface PlayerStore {
  currentSong: Song | null;
  isPlaying: boolean;
  queue: Song[];
  currentIndex: number;
  shuffle: boolean;
  repeatMode: RepeatMode;
  currentTime: number; // Add this line

  initializeQueue: (songs: Song[]) => void;
  playAlbum: (songs: Song[], startIndex?: number) => void;
  setCurrentSong: (song: Song | null) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;

  toggleShuffle: () => void;
  cycleRepeatMode: () => void; // off -> all -> one -> off
  setCurrentTime: (time: number) => void; // Add this action
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentSong: null,
  isPlaying: false,
  queue: [],
  currentIndex: -1,
  shuffle: false,
  repeatMode: "off",
  currentTime: 0, // Add initial state

  initializeQueue: (songs: Song[]) => {
    set({
      queue: songs,
      currentSong: get().currentSong || songs[0],
      currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex,
    });
  },

  playAlbum: (songs: Song[], startIndex = 0) => {
    if (songs.length === 0) return;

    const song = songs[startIndex];

    const socket = useChatStore.getState().socket;
    if (socket.auth) {
      socket.emit("update_activity", {
        userId: socket.auth.userId,
        activity: `Playing ${song.title} by ${song.artist}`,
      });
    }

    set({
      queue: songs,
      currentSong: song,
      currentIndex: startIndex,
      isPlaying: true,
    });
  },

  setCurrentSong: (song: Song | null) => {
    if (!song) return;

    const socket = useChatStore.getState().socket;
    if (socket.auth) {
      socket.emit("update_activity", {
        userId: socket.auth.userId,
        activity: `Playing ${song.title} by ${song.artist}`,
      });
    }

    const songIndex = get().queue.findIndex((s) => s._id === song._id);
    set({
      currentSong: song,
      isPlaying: true,
      currentIndex: songIndex !== -1 ? songIndex : get().currentIndex,
    });
  },

  togglePlay: () => {
    const willStartPlaying = !get().isPlaying;

    const currentSong = get().currentSong;
    const socket = useChatStore.getState().socket;
    if (socket.auth) {
      socket.emit("update_activity", {
        userId: socket.auth.userId,
        activity:
          willStartPlaying && currentSong
            ? `Playing ${currentSong.title} by ${currentSong.artist}`
            : "Idle",
      });
    }

    set({ isPlaying: willStartPlaying });
  },

  playNext: () => {
    const { currentIndex, queue, shuffle, repeatMode } = get();

    // if shuffle -> choose random index (allow repeat of same if queue length ===1)
    if (shuffle && queue.length > 1) {
      let nextIndex = currentIndex;
      // pick until different
      while (nextIndex === currentIndex) {
        nextIndex = Math.floor(Math.random() * queue.length);
      }
      const nextSong = queue[nextIndex];
      set({
        currentSong: nextSong,
        currentIndex: nextIndex,
        isPlaying: true,
      });
      return;
    }

    // if repeat one -> handled in AudioPlayer ended; but keep fallback:
    if (repeatMode === "one" && queue.length > 0) {
      // keep same song playing (store-level no change)
      set({ isPlaying: true });
      return;
    }

    const nextIndex = currentIndex + 1;

    // there is a next song
    if (nextIndex < queue.length) {
      const nextSong = queue[nextIndex];

      const socket = useChatStore.getState().socket;
      if (socket.auth) {
        socket.emit("update_activity", {
          userId: socket.auth.userId,
          activity: `Playing ${nextSong.title} by ${nextSong.artist}`,
        });
      }

      set({
        currentSong: nextSong,
        currentIndex: nextIndex,
        isPlaying: true,
      });
    } else {
      // end of queue
      if (repeatMode === "all" && queue.length > 0) {
        const nextSong = queue[0];
        const socket = useChatStore.getState().socket;
        if (socket.auth) {
          socket.emit("update_activity", {
            userId: socket.auth.userId,
            activity: `Playing ${nextSong.title} by ${nextSong.artist}`,
          });
        }
        set({
          currentSong: nextSong,
          currentIndex: 0,
          isPlaying: true,
        });
      } else {
        set({ isPlaying: false });
        const socket = useChatStore.getState().socket;
        if (socket.auth) {
          socket.emit("update_activity", {
            userId: socket.auth.userId,
            activity: "Idle",
          });
        }
      }
    }
  },

  playPrevious: () => {
    const { currentIndex, queue, shuffle } = get();

    if (shuffle && queue.length > 1) {
      let prevIndex = currentIndex;
      while (prevIndex === currentIndex) {
        prevIndex = Math.floor(Math.random() * queue.length);
      }
      const prevSong = queue[prevIndex];
      set({
        currentSong: prevSong,
        currentIndex: prevIndex,
        isPlaying: true,
      });
      return;
    }

    const prevIndex = currentIndex - 1;

    if (prevIndex >= 0) {
      const prevSong = queue[prevIndex];

      const socket = useChatStore.getState().socket;
      if (socket.auth) {
        socket.emit("update_activity", {
          userId: socket.auth.userId,
          activity: `Playing ${prevSong.title} by ${prevSong.artist}`,
        });
      }

      set({
        currentSong: prevSong,
        currentIndex: prevIndex,
        isPlaying: true,
      });
    } else {
      // no previous -> stop or keep idle
      set({ isPlaying: false });
      const socket = useChatStore.getState().socket;
      if (socket.auth) {
        socket.emit("update_activity", {
          userId: socket.auth.userId,
          activity: "Idle",
        });
      }
    }
  },

  // new actions
  toggleShuffle: () => {
    set((s) => ({ shuffle: !s.shuffle }));
  },

  cycleRepeatMode: () =>
  set((state) => {
    // 1. Nếu đang là "Lặp lại tất cả" -> chuyển sang "Lặp lại một bài"
    if (state.repeatMode === "all") {
      return { repeatMode: "one" };
    }
    
    // 2. Nếu đang là "Lặp lại một bài" -> chuyển sang "Tắt"
    if (state.repeatMode === "one") {
      return { repeatMode: "off" };
    }
    
    // 3. Nếu đang là "Tắt" (hoặc bất cứ gì khác) -> chuyển về "Lặp lại tất cả"
    return { repeatMode: "all" };
  }),

  setCurrentTime: (time: number) => {
    set({ currentTime: time });
  },
}));
