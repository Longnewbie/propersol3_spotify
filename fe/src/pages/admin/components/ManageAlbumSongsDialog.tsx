import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMusicStore } from "@/stores/useMusicStore";
import { Album } from "@/types";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { CirclePlus, RefreshCcw, Trash2, Loader } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Props {
  album: Album | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
}

const ManageAlbumSongsDialog = ({
  album: initialAlbum,
  open,
  onOpenChange,
}: Props) => {
  const [currentAlbumData, setCurrentAlbumData] = useState<Album | null>(
    initialAlbum
  );

  const {
    fetchAllSongList,
    allSongList,
    isAllSongsLoading,
    fetchAlbumsForAdmin,
  } = useMusicStore();

  const { getToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (open) {
      fetchAllSongList();
    }
  }, [open, fetchAllSongList]);

  useEffect(() => {
    setCurrentAlbumData(initialAlbum);
  }, [initialAlbum]);

  const { songsInAlbum, availableSongs } = useMemo(() => {
    if (!currentAlbumData || !allSongList || allSongList.length === 0) {
      return { songsInAlbum: [], availableSongs: [] };
    }

    const songIdsInAlbum = currentAlbumData.songs.map((id) => String(id));

    const inAlbum = allSongList
      .filter((song) => songIdsInAlbum.includes(song._id))
      .sort((a, b) => a.title.localeCompare(b.title));

    const available = allSongList
      .filter(
        (song) =>
          !songIdsInAlbum.includes(song._id) &&
          song.title.toLowerCase().includes(query.toLowerCase())
      )
      .sort((a, b) => a.title.localeCompare(b.title));

    return { songsInAlbum: inAlbum, availableSongs: available };
  }, [currentAlbumData, allSongList, query]);

  const updateLocalAlbumStateFromStore = useCallback(() => {
    if (!initialAlbum?._id) return;
    const updatedAlbumFromStore = useMusicStore
      .getState()
      .albums.find((a) => a._id === initialAlbum._id);

    if (updatedAlbumFromStore) {
      setCurrentAlbumData(updatedAlbumFromStore);
    } else {
      console.warn(
        "Album not found in store after fetch. It might be on a different page or deleted."
      );
    }
  }, [initialAlbum]);

  // Handler for the refresh button
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await fetchAllSongList();
      const currentPage = useMusicStore.getState().albumPagination.currentPage;
      const currentLimit = 10;
      const currentQuery = "";
      await fetchAlbumsForAdmin(currentPage, currentLimit, currentQuery);

      updateLocalAlbumStateFromStore();
      toast.success("Danh sách đã được làm mới!");
    } catch (error: any) {
      console.error("Refresh failed:", error);
      toast.error(error.response?.data?.message || "Làm mới thất bại");
    } finally {
      setIsRefreshing(false);
    }
  }, [fetchAllSongList, fetchAlbumsForAdmin, updateLocalAlbumStateFromStore]);

  const callApi = useCallback(
    async (url: string, songId: string, successMessage: string) => {
      if (!currentAlbumData?._id) return;
      setIsLoading(true);
      try {
        const token = await getToken();
        await axiosInstance.post(
          url,
          { albumId: currentAlbumData._id, songId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success(successMessage);

        // Refetch data to update the store
        await fetchAllSongList(); // Refetch all songs
        const currentPage =
          useMusicStore.getState().albumPagination.currentPage;
        const currentLimit = 10;
        const currentQuery = "";
        await fetchAlbumsForAdmin(currentPage, currentLimit, currentQuery); // Refetch current page of albums

        // Update the local dialog state from the refreshed store data
        updateLocalAlbumStateFromStore();
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Đã xảy ra lỗi");
      } finally {
        setIsLoading(false);
      }
    },
    [
      currentAlbumData,
      getToken,
      fetchAlbumsForAdmin,
      fetchAllSongList,
      updateLocalAlbumStateFromStore,
    ]
  );

  // Specific handlers for adding and removing songs
  const handleAddSong = useCallback(
    (songId: string) => {
      callApi("/admin/albums/add-song", songId, "Đã thêm bài hát vào album");
    },
    [callApi]
  );

  const handleRemoveSong = useCallback(
    (songId: string) => {
      callApi("/admin/albums/remove-song", songId, "Đã gỡ bài hát khỏi album");
    },
    [callApi]
  );

  if (!currentAlbumData) return null;

  const showListLoader = isAllSongsLoading;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 border-zinc-700 max-w-5xl max-h-[80vh] flex flex-col">
        {/* Dialog Header */}
        <DialogHeader>
          <DialogTitle>
            Quản lý bài hát cho Album: {currentAlbumData.title}
          </DialogTitle>
          <DialogDescription>
            Thêm hoặc gỡ các bài hát khỏi album này.
          </DialogDescription>
        </DialogHeader>

        {/* Main Content Grid (Two Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 min-h-0">
          {/* Column 1: Songs In Album */}
          <div className="flex flex-col gap-3 min-h-0">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">
                Bài hát trong Album (
                {showListLoader ? "..." : songsInAlbum.length})
              </h3>
              <Button
                variant="ghost"
                size="icon"
                className="text-emerald-500 hover:text-emerald-400 size-8"
                onClick={handleRefresh}
                disabled={isLoading || isRefreshing || isAllSongsLoading}
                title="Làm mới"
              >
                <RefreshCcw
                  className={cn(
                    "size-4",
                    (isRefreshing || isAllSongsLoading) &&
                      "animate-spin text-emerald-500"
                  )}
                />
              </Button>
            </div>
            {/* Scrollable list for songs in album */}
            <ScrollArea className="flex-1 border border-zinc-700 rounded-md p-3">
              {showListLoader ? (
                // Show loader if the main song list is loading
                <div className="flex items-center justify-center h-20">
                  <Loader className="size-5 animate-spin text-zinc-400" />
                </div>
              ) : songsInAlbum.length > 0 ? (
                // Render list items if available
                songsInAlbum.map((song) => (
                  <div
                    key={song._id}
                    className="flex items-center justify-between p-2 rounded hover:bg-zinc-800 mb-1"
                  >
                    <span className="truncate">{song.title}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-400 size-8"
                      onClick={() => handleRemoveSong(song._id)}
                      disabled={isLoading || isRefreshing}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-zinc-500 text-center p-4">
                  Chưa có bài hát nào.
                </p>
              )}
            </ScrollArea>
          </div>

          {/* Column 2: Available Songs */}
          <div className="flex flex-col gap-3 min-h-0">
            <h3 className="font-semibold">Bài hát có thể thêm (Tất cả)</h3>
            {/* Search Input */}
            <Input
              placeholder="Tìm bài hát..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-zinc-800 border-zinc-700"
            />
            {/* Scrollable list for available songs */}
            <ScrollArea className="flex-1 border border-zinc-700 rounded-md p-3">
              {showListLoader ? (
                // Show loader if the main song list is loading
                <div className="flex items-center justify-center h-20">
                  <Loader className="size-5 animate-spin text-zinc-400" />
                </div>
              ) : availableSongs.length > 0 ? (
                // Render list items if available
                availableSongs.map((song) => (
                  <div
                    key={song._id}
                    // Specific padding for better spacing near scrollbar
                    className="flex items-center justify-between pl-2 py-2 pr-4 rounded hover:bg-zinc-800 mb-1"
                  >
                    <span className="truncate">{song.title}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-emerald-500 hover:text-emerald-400 size-8"
                      onClick={() => handleAddSong(song._id)}
                      // Disable button during local add/remove or refresh
                      disabled={isLoading || isRefreshing}
                    >
                      <CirclePlus className="size-4" />
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-zinc-500 text-center p-4">
                  {query
                    ? "Không tìm thấy bài hát khớp."
                    : "Không có bài hát nào để thêm."}
                </p>
              )}
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ManageAlbumSongsDialog;
