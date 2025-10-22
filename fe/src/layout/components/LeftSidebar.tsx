import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignedIn } from "@clerk/clerk-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookHeart, HomeIcon, Library, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useMusicStore } from "@/stores/useMusicStore";

const LeftSidebar = () => {
  const { albums, isLoading, fetchAlbums } = useMusicStore();

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  return (
    <div className="h-full flex flex-col gap-2">
      {/* navigation menu */}
      <div className="rounded-lg bg-zinc-900 p-4 sm:p-2">
        <div className="space-y-1 sm:space-y-2">
          <Link
            to={"/"}
            className={cn(
              buttonVariants({
                variant: "ghost",
                className:
                  // centered on mobile, left-aligned on sm+
                  "w-full justify-center sm:justify-start text-white hover:bg-zinc-800 flex items-center gap-2",
              })
            )}
          >
            <HomeIcon className="size-5 sm:size-6" />
            {/* Tablet & Desktop: có text */}
            <span className="hidden sm:inline">Trang chủ</span>
          </Link>

          <SignedIn>
            <Link
              to={"/chat"}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className:
                    "w-full justify-center sm:justify-start text-white hover:bg-zinc-800 flex items-center gap-2",
                })
              )}
            >
              <MessageCircle className="size-5 sm:size-6" />
              <span className="hidden sm:inline">Tin nhắn</span>
            </Link>
            <Link
              to={"/favorites"}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className:
                    "w-full justify-center sm:justify-start text-white hover:bg-zinc-800 flex items-center gap-2",
                })
              )}
            >
              <BookHeart className="size-5 sm:size-6" />
              <span className="hidden sm:inline">Bài hát đã thích</span>
            </Link>
          </SignedIn>
        </div>
      </div>

      {/* library section */}
      <div className="flex flex-col min-h-0 flex-1 rounded-lg bg-zinc-900 p-2 sm:p-4">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center text-white px-1 sm:px-2 justify-center sm:justify-start">
            <Library className="size-5 sm:size-6 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Danh sách phát</span>
          </div>
        </div>

        <ScrollArea className="flex-1 pr-1 sm:pr-4">
          <div className="space-y-1 sm:space-y-2">
            {isLoading ? (
              <PlaylistSkeleton />
            ) : (
              albums.map((album) => (
                <Link
                  to={`/albums/${album._id}`}
                  key={album._id}
                  className="p-1 sm:p-2 hover:bg-zinc-800 rounded-md flex items-center gap-2 sm:gap-3 group cursor-pointer justify-center sm:justify-start"
                >
                  <img
                    src={album.imageUrl}
                    alt="playlist img"
                    className="size-11 sm:size-12 rounded-md flex-shrink-0 object-cover"
                  />

                  {/* Mobile, Tablet */}
                  <div className="flex-1 min-w-0 hidden sm:block">
                    <p className="font-medium text-sm md:text-base ">
                      {album.title}
                    </p>
                    <p className="hidden md:block text-sm text-zinc-400 truncate">
                      Album • {album.artist}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default LeftSidebar;
