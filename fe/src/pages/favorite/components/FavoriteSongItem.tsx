import AudioWave from "@/hooks/AudioWave";
import { Button } from "@/components/ui/button";
import { Heart, Play, Headphones } from "lucide-react";
import { Song } from "@/types";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useAuthStore } from "@/stores/useAuthStore";

const FavoriteSongItem = ({
  song,
  onPlay,
  index,
}: {
  song: Song;
  onPlay: () => void;
  index: number;
}) => {
  const { currentSong, isPlaying } = usePlayerStore();
  const { favoriteSongIds, toggleFavorite } = useAuthStore();

  const isCurrent = currentSong?._id === song._id;
  const isLiked = favoriteSongIds.has(song._id);

  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group relative overflow-hidden ${
        isCurrent
          ? "bg-gradient-to-r from-amber-500/20 to-orange-500/10 shadow-lg shadow-amber-500/10"
          : "hover:bg-zinc-800/60 hover:shadow-md"
      }`}
    >
      <div className="w-8 flex items-center justify-center flex-shrink-0 relative">
        {isCurrent && isPlaying ? (
          <AudioWave color="bg-amber-400" />
        ) : (
          <>
            <span
              className={`text-sm font-semibold absolute transition-all duration-200 ${
                isCurrent
                  ? "text-amber-400"
                  : "text-zinc-500 group-hover:opacity-0 group-hover:scale-75"
              }`}
            >
              {index + 1}
            </span>
            <Button
              size="icon"
              variant="ghost"
              className="size-8 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
              onClick={onPlay}
            >
              <Play className="size-4 text-white fill-white" />
            </Button>
          </>
        )}
      </div>

      <div className="relative flex-shrink-0 group/image">
        <img
          src={song.imageUrl}
          alt={song.title}
          className="w-14 h-14 rounded-lg object-cover"
        />
        {isCurrent && (
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/30 to-transparent rounded-lg" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div
          className={`font-semibold text-base truncate mb-1 transition-colors ${
            isCurrent
              ? "text-amber-400"
              : "text-white group-hover:text-amber-300"
          }`}
        >
          {song.title}
        </div>
        <div className="text-sm text-zinc-400 truncate flex items-center gap-2">
          <Headphones className="size-3" />
          {song.artist}
        </div>
      </div>

      <Button
        size="icon"
        variant="ghost"
        onClick={() => toggleFavorite(song._id)}
        className={`flex-shrink-0 transition-all duration-300 hover:scale-110 ${
          isLiked
            ? "text-red-500 hover:text-red-400"
            : "text-zinc-400 hover:text-white"
        }`}
      >
        <Heart
          className={`size-5 transition-all ${
            isLiked ? "fill-red-500 scale-110" : "hover:scale-110"
          }`}
        />
      </Button>
    </div>
  );
};

export default FavoriteSongItem;
