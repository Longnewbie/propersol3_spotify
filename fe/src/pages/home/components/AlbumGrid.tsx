import type { Album } from "@/types";
import { Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import SectionGridSkeleton from "./skeleton/SectionGridSkeleton";
import BlurImage from "@/components/BlurImage";

type AlbumGridProps = {
  title: string;
  albums: Album[];
  isLoading: boolean;
};

const getPageSize = (width: number): number => {
  if (width >= 1024) return 4;
  if (width >= 640) return 2;
  return 1;
};

const AlbumGrid = ({ albums, title, isLoading }: AlbumGridProps) => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(4);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const newSize = getPageSize(window.innerWidth);
      setPageSize(newSize);
      setPage(0);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.max(1, Math.ceil(albums.length / pageSize));
  const start = page * pageSize;
  const visibleAlbums = albums.slice(start, start + pageSize);

  const prev = useCallback(() => {
    if (page > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setPage((p) => Math.max(0, p - 1));
        setIsAnimating(false);
      }, 150);
    }
  }, [page]);

  const next = useCallback(() => {
    if (page < totalPages - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setPage((p) => Math.min(totalPages - 1, p + 1));
        setIsAnimating(false);
      }, 150);
    }
  }, [page, totalPages]);

  if (isLoading) {
    return <SectionGridSkeleton />;
  }

  return (
    <div className="mb-8 relative group">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
      </div>

      {totalPages > 1 && (
        <>
          <Button
            aria-label="Previous albums"
            onClick={prev}
            disabled={page === 0 || isAnimating}
            variant="ghost"
            size="icon"
            className={cn(
              `absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full
                       bg-black/50 text-white transition-all duration-300
                       opacity-0 group-hover:opacity-100 focus:opacity-100
                       disabled:opacity-20 disabled:cursor-not-allowed
                       hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white/50`,
              "w-10 h-10"
            )}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button
            aria-label="Next albums"
            onClick={next}
            disabled={page >= totalPages - 1 || isAnimating}
            variant="ghost"
            size="icon"
            className={cn(
              `absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full
                        bg-black/50 text-white transition-all duration-300
                        opacity-0 group-hover:opacity-100 focus:opacity-100
                        disabled:opacity-20 disabled:cursor-not-allowed
                        hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white/50`,
              "w-10 h-10"
            )}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </>
      )}

      <div
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-opacity duration-300",
          isAnimating ? "opacity-0" : "opacity-100"
        )}
      >
        {visibleAlbums.map((album, index) => {
          const absoluteIndex = start + index;

          return (
            <Link
              key={album._id}
              to={`/albums/${album._id}`}
              className="bg-zinc-800/40 p-4 rounded-md hover:bg-zinc-700/40
                       transition-all group/item cursor-pointer block"
            >
              <div className="relative mb-4">
                <div className="aspect-square rounded-md shadow-lg overflow-hidden relative">
                  <BlurImage
                    src={album.imageUrl || "/placeholder.svg"}
                    alt={album.title}
                    className="absolute inset-0 w-full h-full object-cover transform-gpu transition-[transform,filter,opacity]
                              duration-300 group-hover/item:scale-105"
                  />
                  <div className="absolute bottom-2 right-2 text-2xl font-bold text-white/60">
                    #{absoluteIndex + 1}
                  </div>
                </div>
              </div>
              <h3 className="font-medium mb-1 truncate text-white">
                {album.title}
              </h3>
              <p className="text-sm text-zinc-400 truncate">
                Album • {album.artist}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AlbumGrid;
