"use client";

import { Button } from "@/components/ui/button";

import { X, Loader } from "lucide-react"; // Thêm Loader
import { cn, formatDuration } from "@/lib/utils";
import AudioWave from "@/hooks/AudioWave";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Link } from "react-router-dom";
import BlurImage from "@/components/BlurImage";

const AlbumContextSidebar = () => {
  const {
    contextAlbum,
    isAlbumContextSidebarOpen,
    hideAlbumContext,
    isContextLoading,
    currentSong,
    isPlaying,
    playAlbum,
  } = usePlayerStore();

  const handlePlayFromContext = (index: number) => {
    if (contextAlbum?.songs) {
      playAlbum(contextAlbum.songs, index);
    }
  };

  return (
    <div
      className={cn(
        "fixed top-[10px] right-0 h-[calc(100vh-115px)] w-full max-w-sm bg-gradient-to-b from-zinc-800 via-zinc-900 to-black shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-l border-zinc-700/50 flex flex-col",
        isAlbumContextSidebarOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="flex items-center justify-between p-5 border-b border-zinc-700/30 flex-shrink-0 bg-gradient-to-r from-zinc-800/90 via-zinc-800/70 to-zinc-900/60 backdrop-blur-md">
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-bold text-white truncate tracking-tight leading-tight">
            Danh sách phát tiếp theo
          </h2>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="ml-3 text-zinc-400 hover:text-white hover:bg-zinc-700/60 transition-all duration-200 rounded-lg"
          onClick={hideAlbumContext}
        >
          <X className="size-5" />
        </Button>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1 overflow-y-auto">
        {isContextLoading ? (
          <div className="flex items-center justify-center h-40">
            <Loader className="size-6 animate-spin text-green-400" />
          </div>
        ) : !contextAlbum || contextAlbum.songs.length === 0 ? (
          <p className="text-center text-zinc-500 py-12 px-4 text-sm">
            Không có bài hát nào trong album này.
          </p>
        ) : (
          <div className="p-4 space-y-3">
            <Link
              to={`/albums/${contextAlbum._id}`}
              className="flex-1 flex items-center gap-3 min-w-0"
            >
              <div className="flex items-center gap-3 p-4 mb-5 rounded-xl bg-gradient-to-br from-zinc-800/60 to-zinc-900/40 border border-zinc-700/40 hover:border-zinc-600/60 hover:bg-gradient-to-br hover:from-zinc-800/80 hover:to-zinc-900/60 transition-all duration-300 shadow-lg hover:shadow-xl group">
                <BlurImage
                  src={contextAlbum?.imageUrl || "/placeholder.svg"}
                  alt={contextAlbum?.title}
                  className="size-16 rounded-lg object-cover shadow-md flex-shrink-0 group-hover:shadow-lg transition-shadow duration-300"
                />
                <div className="min-w-0 flex-1">
                  <p className="max-w-[240px] text-sm font-bold text-white truncate group-hover:text-green-300 transition-colors duration-200">
                    {contextAlbum.title}
                  </p>
                  <p className="text-xs text-zinc-400 truncate mt-1.5 group-hover:text-zinc-300 transition-colors duration-200">
                    {contextAlbum.artist}
                  </p>
                </div>
              </div>
            </Link>

            <div className="space-y-1.5 px-1">
              {contextAlbum.songs.map((song, index) => {
                const isCurrent = song._id === currentSong?._id;
                return (
                  <div
                    key={`${song._id}-${index}`}
                    className={cn(
                      "grid grid-cols-[auto_1fr_auto] items-center gap-3 p-3.5 rounded-lg transition-all duration-200 group cursor-pointer",
                      isCurrent
                        ? "bg-gradient-to-r from-green-500/15 to-green-500/5 border border-green-500/40 shadow-md hover:shadow-lg"
                        : "border border-zinc-700/20 hover:bg-zinc-800/60 hover:border-zinc-600/40 hover:shadow-md"
                    )}
                    onClick={() => handlePlayFromContext(index)}
                  >
                    <div className="w-6 flex items-center justify-center flex-shrink-0">
                      {isCurrent && isPlaying ? (
                        <AudioWave color="bg-green-400" />
                      ) : (
                        <span
                          className={cn(
                            "text-xs font-semibold transition-all duration-200",
                            isCurrent
                              ? "text-green-400"
                              : "text-zinc-500 group-hover:text-zinc-300"
                          )}
                        >
                          {index + 1}
                        </span>
                      )}
                    </div>

                    <div className="min-w-0">
                      <p
                        className={cn(
                          "max-w-[200px] font-semibold truncate text-sm transition-all duration-200",
                          isCurrent
                            ? "text-green-400"
                            : "text-white group-hover:text-green-300"
                        )}
                      >
                        {song.title}
                      </p>
                      <p className="text-xs text-zinc-500 truncate mt-1 group-hover:text-zinc-400 transition-all duration-200">
                        {song.artist}
                      </p>
                    </div>

                    <div className="text-xs font-semibold text-zinc-500 group-hover:text-zinc-300 transition-all duration-200 flex-shrink-0">
                      {formatDuration(song.duration)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default AlbumContextSidebar;
