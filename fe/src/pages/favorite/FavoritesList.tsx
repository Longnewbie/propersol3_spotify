import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { Song } from "@/types";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useAuthStore } from "@/stores/useAuthStore";

import { Heart } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import FavoritesListSkeleton from "./skeleton/FavoritesListSkeleton";
import FavoritesContent from "./components/FavoritesContent";

const FavoritesList = () => {
  const [fetchedSongs, setFetchedSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { playAlbum } = usePlayerStore();
  const { favoriteSongIds } = useAuthStore();

  useEffect(() => {
    const fetchFavoriteSongs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axiosInstance.get("/users/favorites/details");
        setFetchedSongs(res.data);
      } catch (err: any) {
        setError("Không thể tải danh sách yêu thích.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavoriteSongs();
  }, []);

  // filter favorite songs
  const displayedSongs = fetchedSongs.filter((song) =>
    favoriteSongIds.has(song._id)
  );

  // handle play song
  const handlePlaySong = (_song: Song, index: number) => {
    playAlbum(displayedSongs, index);
  };

  if (isLoading) {
    return <FavoritesListSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black flex items-center justify-center p-10">
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 max-w-md text-center">
          <div className="bg-red-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="size-8 text-red-500" />
          </div>
          <p className="text-red-400 font-semibold mb-2">{error}</p>
          <p className="text-zinc-400 text-sm">Vui lòng thử làm mới trang.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      {/* Desktop: custom scroll */}
      <ScrollArea className="hidden md:block h-full rounded-md">
        <FavoritesContent
          displayedSongs={displayedSongs}
          handlePlaySong={handlePlaySong}
        />
      </ScrollArea>

      {/* Mobile/Tablet: native scroll */}
      <div className="md:hidden h-full overflow-y-auto">
        <FavoritesContent
          displayedSongs={displayedSongs}
          handlePlaySong={handlePlaySong}
        />
      </div>
    </div>
  );
};

export default FavoritesList;
