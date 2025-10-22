import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Clock } from "lucide-react";
import { FaPlay, FaPause } from "react-icons/fa6";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import AlbumPageSkeleton from "./AlbumPageSkeleton";
import AudioWave from "@/hooks/AudioWave";
import { Album } from "@/types";
import { formatDuration } from "@/lib/utils";

interface AlbumContentProps {
  currentAlbum: Album | null;
  currentSong: { _id: string } | null;
  isPlaying: boolean;
  handlePlayAlbum: () => void;
  handlePlaySong: (index: number) => void;
}

const AlbumPage = () => {
  const { albumId } = useParams();
  const { currentAlbum, fetchAlbumById, isLoading } = useMusicStore();
  const { currentSong, playAlbum, isPlaying, togglePlay } = usePlayerStore();

  useEffect(() => {
    if (albumId) fetchAlbumById(albumId);
  }, [fetchAlbumById, albumId]);

  if (isLoading) return <AlbumPageSkeleton />;

  const handlePlayAlbum = () => {
    if (!currentAlbum) return;

    const isCurrentAlbumPlaying = currentAlbum?.songs.some(
      (song) => song._id === currentSong?._id
    );

    if (isCurrentAlbumPlaying) {
      togglePlay();
    } else {
      // play first song
      playAlbum(currentAlbum?.songs, 0);
    }
  };

  const handlePlaySong = (index: number) => {
    if (!currentAlbum) return;

    playAlbum(currentAlbum?.songs, index);
  };

  return (
    <div className="h-full">
      {/* Desktop: custom scroll, Mobile/Tablet: native scroll */}
      <ScrollArea className="hidden md:block h-full rounded-md">
        <AlbumContent
          currentAlbum={currentAlbum}
          currentSong={currentSong}
          isPlaying={isPlaying}
          handlePlayAlbum={handlePlayAlbum}
          handlePlaySong={handlePlaySong}
        />
      </ScrollArea>

      <div className="md:hidden h-full overflow-y-auto">
        <AlbumContent
          currentAlbum={currentAlbum}
          currentSong={currentSong}
          isPlaying={isPlaying}
          handlePlayAlbum={handlePlayAlbum}
          handlePlaySong={handlePlaySong}
        />
      </div>
    </div>
  );
};

const AlbumContent = ({
  currentAlbum,
  currentSong,
  isPlaying,
  handlePlayAlbum,
  handlePlaySong,
}: AlbumContentProps) => {
  return (
    <div className="relative min-h-full">
      {/* bg gradient giữ RGB */}
      <div
        className="absolute inset-0 bg-gradient-to-b 
        from-[#5038a0]/80 via-zinc-900/80 to-zinc-900 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10">
        {/* Album info */}
        <div className="flex flex-col md:flex-row p-6 gap-6 pb-8 items-center md:items-end">
          <img
            src={currentAlbum?.imageUrl}
            alt={currentAlbum?.title}
            className="w-40 h-40 md:w-[240px] md:h-[240px] object-cover shadow-xl rounded"
          />
          <div className="flex flex-col justify-end text-center md:text-left">
            <p className="text-sm md:text-base font-medium">Album</p>
            <h1 className="text-3xl md:text-7xl font-bold my-4">
              {currentAlbum?.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-sm text-zinc-100">
              <span className="font-medium text-white">
                {currentAlbum?.artist}
              </span>
              <span> • {currentAlbum?.songs.length} bài hát</span>
              <span> • {currentAlbum?.releaseYear} </span>
            </div>
          </div>
        </div>

        {/* play button */}
        <div className="px-6 pb-4 flex items-center gap-6">
          <Button
            onClick={handlePlayAlbum}
            size="icon"
            className="size-12 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all"
          >
            {isPlaying &&
            currentAlbum?.songs.some(
              (song) => song._id === currentSong?._id
            ) ? (
              <FaPause className="h-7 w-7 text-black" />
            ) : (
              <FaPlay className="h-7 w-7 text-black" />
            )}
          </Button>
        </div>

        {/* Song list */}
        <div className="bg-black/20 backdrop-blur-sm">
          {/* table header */}
          <div className="hidden md:grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5">
            <div>#</div>
            <div>Tiêu đề</div>
            <div>Ngày phát hành</div>
            <div className="flex justify-end">
              <Clock className="size-[18px]" />
            </div>
          </div>

          <div className="px-4 md:px-6">
            <div className="space-y-2 py-4">
              {currentAlbum?.songs.map((song, index) => {
                const isCurrentSong = currentSong?._id === song._id;

                return (
                  <div
                    key={song._id}
                    onClick={() => handlePlaySong(index)}
                    className="grid grid-cols-[16px_1fr_auto] md:grid-cols-[16px_4fr_2fr_1fr] 
                    gap-4 px-2 md:px-4 py-2 text-sm text-zinc-400 
                    hover:bg-white/5 rounded-md group cursor-pointer"
                  >
                    <div className="flex items-center justify-center">
                      {isCurrentSong && isPlaying ? (
                        <AudioWave color="bg-green-400" />
                      ) : (
                        <span className="group-hover:hidden">{index + 1}</span>
                      )}
                      {!isCurrentSong && (
                        <FaPlay className="size-4 hidden group-hover:block" />
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <img
                        src={song.imageUrl}
                        alt={song.title}
                        className="size-10 object-cover"
                      />
                      <div>
                        <div className="font-medium text-white">
                          {song.title}
                        </div>
                        <div className="text-xs md:text-sm">{song.artist}</div>
                      </div>
                    </div>

                    {/* Mobile: hide release date, only duration */}
                    <div className="hidden md:flex items-center">
                      {new Intl.DateTimeFormat("en-GB").format(
                        new Date(song.createdAt)
                      )}
                    </div>
                    <div className="flex items-center justify-end">
                      {formatDuration(song.duration)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumPage;
