import { Song } from "@/types";
import SectionGridSkeleton from "./skeleton/SectionGridSkeleton";
import PlayButton from "./PlayButton";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";

type SectionGridProps = {
  title: string;
  songs: Song[];
  isLoading: boolean;
};

const INITIAL_DISPLAY_COUNT = 8;
const INCREMENT_COUNT = 4;

const SectionGrid = ({ songs, title, isLoading }: SectionGridProps) => {
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT);

  const handleShowMore = () => {
    setDisplayCount((prevCount) => prevCount + INCREMENT_COUNT);
  };

  const handleShowLess = () => {
    setDisplayCount(INITIAL_DISPLAY_COUNT);
  };

  const songsToDisplay = useMemo(
    () => songs.slice(0, displayCount),
    [songs, displayCount]
  );

  if (isLoading) return <SectionGridSkeleton />;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
        <div className="flex items-center gap-2">
          {/* show less */}
          {displayCount > INITIAL_DISPLAY_COUNT && (
            <Button
              variant="link"
              className="text-sm text-zinc-400 hover:text-white"
              onClick={handleShowLess}
            >
              Thu gọn
            </Button>
          )}

          {/* show more */}
          {displayCount < songs.length && (
            <Button
              variant="link"
              className="text-sm text-zinc-400 hover:text-white"
              onClick={handleShowMore}
            >
              Xem thêm
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {songsToDisplay.map((song) => (
          <div
            key={song._id}
            className="bg-zinc-800/40 p-4 rounded-md hover:bg-zinc-700/40
            transition-all group cursor-pointer"
          >
            <div className="relative mb-4">
              <div className="aspect-square rounded-md shadow-lg overflow-hidden relative">
                <img
                  src={song.imageUrl}
                  alt={song.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 transform-gpu group-hover:scale-105"
                />
              </div>

              <PlayButton song={song} />
            </div>
            <h3 className="font-medium mb-2 truncate">{song.title}</h3>
            <p className="text-sm text-zinc-400 truncate">{song.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionGrid;
