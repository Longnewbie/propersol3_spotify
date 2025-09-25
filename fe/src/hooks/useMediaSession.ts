import { useEffect } from "react";
import { usePlayerStore } from "@/stores/usePlayerStore";

interface Song {
  title: string;
  artist: string;
  albumId: string;
  imageUrl: string;
}

export const useMediaSession = (song: Song | null) => {
  const { togglePlay, playNext, playPrevious, isPlaying } = usePlayerStore();

  useEffect(() => {
    if (!song || !("mediaSession" in navigator)) return;

    navigator.mediaSession.metadata = new MediaMetadata({
      title: song.title || "Unknown Title",
      artist: song.artist || "Unknown Artist",
      album: song.albumId || "",
      artwork: [
        { src: song.imageUrl, sizes: "96x96", type: "image/jpeg" },
        { src: song.imageUrl, sizes: "128x128", type: "image/jpeg" },
        { src: song.imageUrl, sizes: "192x192", type: "image/jpeg" },
        { src: song.imageUrl, sizes: "256x256", type: "image/jpeg" },
        { src: song.imageUrl, sizes: "512x512", type: "image/jpeg" },
      ],
    });

    // action media session
    navigator.mediaSession.setActionHandler("play", () => {
      if (!isPlaying) togglePlay();
    });

    navigator.mediaSession.setActionHandler("pause", () => {
      if (isPlaying) togglePlay();
    });

    navigator.mediaSession.setActionHandler("previoustrack", () => {
      playPrevious();
    });

    navigator.mediaSession.setActionHandler("nexttrack", () => {
      playNext();
    });

    // Disable default search actions
    navigator.mediaSession.setActionHandler("seekbackward", null);
    navigator.mediaSession.setActionHandler("seekforward", null);
  }, [song, isPlaying, togglePlay, playNext, playPrevious]);
};
