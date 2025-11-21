// SongsTable.tsx
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useMusicStore } from "@/stores/useMusicStore";
import {
  Calendar,
  Edit,
  Trash2,
  Search,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import UpdateSongDialog from "./UpdateSongDialog";
import { Song } from "@/types";
import { useDebounce } from "@/hooks/useDebounce";
import BlurImage from "@/components/BlurImage";

const ITEMS_PER_PAGE = 10; // Define items per page constant

const SongsTable = () => {
  const { songs, songPagination, isLoading, error, deleteSong, fetchSongs } =
    useMusicStore();

  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [query, setQuery] = useState("");
  const [loadingRefresh, setLoadingRefresh] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Local state for current page

  // Debounce the search query
  const debouncedQuery = useDebounce(query, 300);

  // Fetch songs when page or debounced query changes
  useEffect(() => {
    fetchSongs(currentPage, ITEMS_PER_PAGE, debouncedQuery);
  }, [fetchSongs, currentPage, debouncedQuery]);

  const handleEditClick = (song: Song) => {
    setSelectedSong(song);
    setIsUpdateDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsUpdateDialogOpen(false);
    setSelectedSong(null);
  };

  // Refresh fetches the *current* page again with the current query
  const handleRefresh = useCallback(async () => {
    setLoadingRefresh(true);
    try {
      await fetchSongs(currentPage, ITEMS_PER_PAGE, debouncedQuery);
    } finally {
      setLoadingRefresh(false);
    }
  }, [fetchSongs, currentPage, debouncedQuery]); // Add dependencies

  // Go to next page
  const handleNextPage = () => {
    if (currentPage < songPagination.totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // Go to previous page
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Reset page to 1 when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedQuery]);

  if (error && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="text-red-400 mb-4">{error}</div>
        <Button onClick={handleRefresh} disabled={loadingRefresh}>
          <RefreshCw
            className={`mr-2 size-4 ${loadingRefresh ? "animate-spin" : ""}`}
          />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Search and Refresh */}
      <div className="flex items-center mb-4 gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={`Tìm kiếm trong ${songPagination.totalItems} bài hát...`} // Dynamic placeholder
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 w-full"
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={handleRefresh}
          disabled={loadingRefresh || isLoading}
          title="Làm mới"
        >
          <RefreshCw
            className={`size-4 ${
              loadingRefresh ? "animate-spin text-emerald-500" : ""
            }`}
          />
        </Button>
      </div>

      {/* Table Area */}
      {isLoading ? (
        <div className="flex items-center justify-center py-16 text-zinc-400">
          Đang tải dữ liệu...
        </div>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-zinc-800/50 border-zinc-700">
                <TableHead className="w-[60px]">#</TableHead>
                <TableHead>Tiêu đề</TableHead>
                <TableHead>Nghệ sĩ</TableHead>
                <TableHead>Ngày phát hành</TableHead>
                <TableHead className="text-right w-[120px]">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {songs.length > 0 ? (
                songs.map((song) => (
                  <TableRow
                    key={song._id}
                    className="hover:bg-zinc-800/50 border-zinc-800"
                  >
                    <TableCell className="p-2">
                      <BlurImage
                        src={song?.imageUrl}
                        alt={song?.title}
                        className="size-11 rounded object-cover transition-[filter,opacity] duration-300"
                      />
                    </TableCell>
                    <TableCell className="font-medium max-w-[300px] truncate">
                      {song.title}
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {song.artist}
                    </TableCell>
                    <TableCell className="text-zinc-400">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="size-4" />
                        {new Intl.DateTimeFormat("en-GB").format(
                          new Date(song.createdAt)
                        )}
                      </span>
                    </TableCell>
                    <TableCell className="text-right p-2">
                      {/* Added padding */}
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant={"ghost"}
                          size={"icon"} // Changed to icon size
                          className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 size-8" // Explicit size
                          onClick={() => handleEditClick(song)}
                          title="Sửa"
                        >
                          <Edit className="size-4" />
                        </Button>
                        <Button
                          variant={"ghost"}
                          size={"icon"}
                          className="text-red-400 hover:text-red-300 hover:bg-red-400/10 size-8" // Explicit size
                          onClick={() => deleteSong(song._id)}
                          title="Xóa"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow className="border-zinc-800">
                  <TableCell
                    colSpan={5}
                    className="text-center text-zinc-500 py-10"
                  >
                    {query
                      ? "Không tìm thấy bài hát nào khớp."
                      : "Chưa có bài hát nào."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* --- Pagination Controls --- */}
          {songPagination.totalPages > 1 && (
            <div className="flex items-center justify-end space-x-2 py-4 mt-2 border-t border-zinc-800">
              <span className="text-sm text-zinc-500">
                Trang {songPagination.currentPage} / {songPagination.totalPages}{" "}
                (Tổng: {songPagination.totalItems})
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevPage}
                disabled={songPagination.currentPage <= 1 || isLoading}
              >
                <ChevronLeft className="size-4 mr-1" /> Quay lại
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={
                  songPagination.currentPage >= songPagination.totalPages ||
                  isLoading
                }
              >
                Tiếp theo <ChevronRight className="size-4 ml-1" />
              </Button>
            </div>
          )}
        </>
      )}

      <UpdateSongDialog
        song={selectedSong}
        open={isUpdateDialogOpen}
        onOpenChange={setIsUpdateDialogOpen}
        onClose={handleCloseDialog}
      />
    </>
  );
};

export default SongsTable;
