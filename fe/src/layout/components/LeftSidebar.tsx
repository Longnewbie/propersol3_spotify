import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignedIn } from "@clerk/clerk-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HomeIcon, Library, MessageCircle } from "lucide-react";
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
      <div className="rounded-lg bg-zinc-900 p-2 sm:p-4">
        <div className="space-y-1 sm:space-y-2">
          <Link
            to={"/"}
            className={cn(
              buttonVariants({
                variant: "ghost",
                className:
                  "w-full justify-start text-white hover:bg-zinc-800 flex items-center gap-2",
              })
            )}
          >
            <HomeIcon className="size-5 sm:size-6" />
            {/* Tablet & Desktop: có text */}
            <span className="hidden sm:inline">Home</span>
          </Link>

          <SignedIn>
            <Link
              to={"/chat"}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className:
                    "w-full justify-start text-white hover:bg-zinc-800 flex items-center gap-2",
                })
              )}
            >
              <MessageCircle className="size-5 sm:size-6" />
              <span className="hidden sm:inline">Messages</span>
            </Link>
          </SignedIn>
        </div>
      </div>

      {/* library section */}
      <div className="flex-1 rounded-lg bg-zinc-900 p-2 sm:p-4">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center text-white px-1 sm:px-2">
            <Library className="size-5 sm:size-6 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Playlists</span>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-280px)] pr-1 sm:pr-4">
          <div className="space-y-1 sm:space-y-2">
            {isLoading ? (
              <PlaylistSkeleton />
            ) : (
              albums.map((album) => (
                <Link
                  to={`/albums/${album._id}`}
                  key={album._id}
                  className="p-2 hover:bg-zinc-800 rounded-md flex items-center gap-2 sm:gap-3 group cursor-pointer"
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
