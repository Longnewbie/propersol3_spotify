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
import { CirclePlus, RefreshCcw, Trash2 } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";

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

  const { songs: allSongs, fetchSongs, fetchAlbums } = useMusicStore();
  const { getToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Cập nhật state cục bộ khi initialAlbum thay đổi
  useEffect(() => {
    setCurrentAlbumData(initialAlbum);
  }, [initialAlbum]);

  const { songsInAlbum, availableSongs } = useMemo(() => {
    if (!currentAlbumData) {
      return { songsInAlbum: [], availableSongs: [] };
    }

    const songIdsInAlbum = currentAlbumData.songs.map((id) => String(id));

    const inAlbum = allSongs
      .filter((song) => songIdsInAlbum.includes(song._id)) // So sánh string[] với string
      .sort((a, b) => a.title.localeCompare(b.title));

    const available = allSongs
      .filter(
        (song) =>
          !songIdsInAlbum.includes(song._id) && // So sánh string[] với string
          song.title.toLowerCase().includes(query.toLowerCase())
      )
      .sort((a, b) => a.title.localeCompare(b.title));

    return { songsInAlbum: inAlbum, availableSongs: available };
  }, [currentAlbumData, allSongs, query]); // Tính lại khi album cục bộ, allSongs, hoặc query thay đổi

  // Hàm tìm và cập nhật state album cục bộ từ store (sau khi fetch)
  const updateLocalAlbumStateFromStore = () => {
    if (!initialAlbum) return; // Cần ID gốc để tìm
    // Lấy state mới nhất từ store sau khi fetch
    const updatedAlbumFromStore = useMusicStore
      .getState()
      .albums.find((a) => a._id === initialAlbum._id);
    if (updatedAlbumFromStore) {
      setCurrentAlbumData(updatedAlbumFromStore); // Cập nhật state cục bộ
    } else {
      console.warn("Album not found in store after fetch.");
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await fetchSongs();
      await fetchAlbums();

      updateLocalAlbumStateFromStore();
    } catch (error: any) {
      console.error("Refresh failed:", error);
      toast.error(error.response?.data?.message || "Làm mới thất bại");
    } finally {
      setIsRefreshing(false);
    }
  };

  const fetchAPI = async (
    url: string,
    songId: string,
    successMessage: string
  ) => {
    if (!currentAlbumData) return;
    setIsLoading(true);
    try {
      const token = await getToken();
      await axiosInstance.post(
        url,
        { albumId: currentAlbumData._id, songId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(successMessage);

      await fetchAlbums();
      await fetchSongs();

      // Cập nhật state cục bộ từ store
      updateLocalAlbumStateFromStore();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Đã xảy ra lỗi");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddSong = (songId: string) => {
    fetchAPI("/admin/albums/add-song", songId, "Đã thêm bài hát vào album");
  };

  const handleRemoveSong = (songId: string) => {
    fetchAPI("/admin/albums/remove-song", songId, "Đã gỡ bài hát khỏi album");
  };

  // Check state cục bộ trước khi render
  if (!currentAlbumData) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 border-zinc-700 max-w-5xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          {/* Dùng state cục bộ */}
          <DialogTitle>
            Quản lý bài hát cho Album: {currentAlbumData.title}
          </DialogTitle>
          <DialogDescription>
            Thêm hoặc gỡ các bài hát khỏi album này.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 min-h-0">
          <div className="flex flex-col gap-3 min-h-0">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">
                {/* Dùng kết quả từ useMemo */}
                Bài hát trong Album ({songsInAlbum.length})
              </h3>
              <Button
                variant="ghost"
                size="icon"
                className="text-emerald-500 hover:text-emerald-400 size-8"
                onClick={handleRefresh}
                disabled={isLoading || isRefreshing}
                title="Làm mới"
              >
                <RefreshCcw
                  className={`size-4 ${
                    isRefreshing ? "animate-spin text-emerald-500" : ""
                  }`}
                />
              </Button>
            </div>
            {/* Dùng kết quả từ useMemo */}
            <ScrollArea className="flex-1 border border-zinc-700 rounded-md p-3">
              {songsInAlbum.length > 0 ? (
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

          <div className="flex flex-col gap-3 min-h-0">
            <h3 className="font-semibold">Bài hát có thể thêm (Tất cả)</h3>
            <Input
              placeholder="Tìm bài hát..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-zinc-800 border-zinc-700"
            />
            {/* Dùng kết quả từ useMemo */}
            <ScrollArea className="flex-1 border border-zinc-700 rounded-md p-3">
              {availableSongs.length > 0 ? (
                availableSongs.map((song) => (
                  <div
                    key={song._id}
                    className="flex items-center justify-between p-2 rounded hover:bg-zinc-800 mb-1"
                  >
                    <span className="truncate">{song.title}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-emerald-500 hover:text-emerald-400 size-8"
                      onClick={() => handleAddSong(song._id)}
                      disabled={isLoading || isRefreshing}
                    >
                      <CirclePlus className="size-4" />
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-zinc-500 text-center p-4">
                  Không tìm thấy bài hát nào.
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
