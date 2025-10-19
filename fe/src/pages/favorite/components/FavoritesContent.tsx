import { FaPause, FaPlay } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Heart, Music } from "lucide-react";
import { Song } from "@/types";
import { usePlayerStore } from "@/stores/usePlayerStore";
import FavoriteSongItem from "./FavoriteSongItem";

const FavoritesContent = ({
  displayedSongs,
  handlePlaySong,
}: {
  displayedSongs: Song[];
  handlePlaySong: (song: Song, index: number) => void;
}) => {
  const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore();

  const isCurrentListPlaying = displayedSongs.some(
    (song) => song._id === currentSong?._id
  );

  const handlePlayFavorites = () => {
    if (displayedSongs.length === 0) return;

    if (isCurrentListPlaying) {
      togglePlay();
    } else {
      playAlbum(displayedSongs, 0);
    }
  };

  return (
    <div className="relative min-h-full bg-gradient-to-b from-zinc-900 via-zinc-900 to-black">
      {/* Header */}
      <div className="bg-gradient-to-b from-amber-900/30 to-zinc-900 pt-16 pb-8 px-4 sm:px-8 border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-4 rounded-2xl shadow-2xl shadow-amber-500/20">
              <Heart className="size-24 text-white fill-white" />
            </div>
            <div>
              <p className="text-sm text-zinc-400 mb-1 uppercase tracking-wider font-semibold flex items-center gap-2">
                Playlist
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
                Bài hát Yêu thích
              </h1>
              {displayedSongs.length > 0 && (
                <p className="text-zinc-400 flex items-center gap-2">
                  <Music className="size-4" />
                  <span className="font-semibold text-amber-400">
                    {displayedSongs.length}
                  </span>{" "}
                  bài hát
                </p>
              )}
            </div>
          </div>
        </div>

        {/* play button */}
        <div className="flex items-center gap-6">
          {displayedSongs.length > 0 && (
            <Button
              onClick={handlePlayFavorites}
              size="icon"
              className="size-12 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all"
            >
              {isCurrentListPlaying && isPlaying ? (
                <FaPause className="h-7 w-7 text-black" />
              ) : (
                <FaPlay className="h-7 w-7 text-black" />
              )}
            </Button>
          )}
        </div>
      </div>

      {/* List of songs */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8">
        {displayedSongs.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-16 text-center">
            <div className="bg-zinc-800/50 backdrop-blur-sm rounded-3xl p-12 max-w-md border border-zinc-700/50">
              <div className="bg-zinc-700/50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="size-10 text-zinc-500" />
              </div>
              <p className="text-xl font-semibold text-white mb-3">
                Chưa có bài hát yêu thích
              </p>
              <p className="text-zinc-400 leading-relaxed">
                Hãy nhấn vào biểu tượng{" "}
                <Heart className="size-4 inline text-red-500 fill-red-500" /> để
                thêm những bài hát yêu thích của bạn vào đây!
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {displayedSongs.map((song, index) => (
              <FavoriteSongItem
                key={song._id}
                song={song}
                index={index}
                onPlay={() => handlePlaySong(song, index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesContent;
