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
  Music,
  Trash2,
  Edit,
  Search,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import ManageAlbumSongsDialog from "./ManageAlbumSongsDialog";
import { Album } from "@/types";
import { useDebounce } from "@/hooks/useDebounce";

const ITEMS_PER_PAGE = 10; // Define items per page constant

const AlbumsTable = () => {
  const {
    albums,
    albumPagination,
    isLoading,
    error,
    deleteAlbum,
    fetchAlbumsForAdmin,
    fetchSongs,
  } = useMusicStore();

  const [isManageOpen, setIsManageOpen] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [query, setQuery] = useState("");
  const [loadingRefresh, setLoadingRefresh] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Local state for current page

  const debouncedQuery = useDebounce(query, 300);

  // Fetch albums when page or debounced query changes
  useEffect(() => {
    fetchAlbumsForAdmin(currentPage, ITEMS_PER_PAGE, debouncedQuery);
    fetchSongs();
  }, [fetchAlbumsForAdmin, fetchSongs, currentPage, debouncedQuery]);

  const handleManageClick = (album: Album) => {
    setSelectedAlbum(album);
    setIsManageOpen(true);
  };

  const handleCloseDialog = () => {
    setIsManageOpen(false);
    setSelectedAlbum(null);
  };

  // Refresh fetches the current page
  const handleRefresh = useCallback(async () => {
    setLoadingRefresh(true);
    try {
      await fetchAlbumsForAdmin(currentPage, ITEMS_PER_PAGE, debouncedQuery);
      await fetchSongs();
    } finally {
      setLoadingRefresh(false);
    }
  }, [fetchAlbumsForAdmin, fetchSongs, currentPage, debouncedQuery]);

  // Go to next page
  const handleNextPage = () => {
    if (currentPage < albumPagination.totalPages) {
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
            placeholder={`Tìm kiếm trong ${albumPagination.totalItems} albums...`}
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
                <TableHead>Năm</TableHead>
                <TableHead>Bài hát</TableHead>
                <TableHead className="text-right w-[120px]">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {albums.length > 0 ? (
                albums.map((album) => (
                  <TableRow
                    key={album._id}
                    className="hover:bg-zinc-800/50 border-zinc-800"
                  >
                    <TableCell className="p-2">
                      <img
                        src={album.imageUrl}
                        alt={album.title}
                        className="size-11 rounded object-cover"
                      />
                    </TableCell>
                    <TableCell className="font-medium max-w-[300px] truncate">
                      {album.title}
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {album.artist}
                    </TableCell>
                    <TableCell className="text-zinc-400">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="size-4" />
                        {album.releaseYear}
                      </span>
                    </TableCell>
                    <TableCell className="text-zinc-400">
                      <span className="inline-flex items-center gap-1">
                        <Music className="size-4" />
                        {album.songs?.length ?? 0}
                      </span>
                    </TableCell>
                    <TableCell className="text-right p-2">
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant={"ghost"}
                          size={"icon"}
                          className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 size-8"
                          onClick={() => handleManageClick(album)}
                          title="Quản lý bài hát"
                        >
                          <Edit className="size-4" />
                        </Button>
                        <Button
                          variant={"ghost"}
                          size={"icon"}
                          className="text-red-400 hover:text-red-300 hover:bg-red-400/10 size-8"
                          onClick={() => deleteAlbum(album._id)}
                          title="Xóa Album"
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
                    colSpan={6}
                    className="text-center text-zinc-500 py-10"
                  >
                    {query
                      ? "Không tìm thấy album nào khớp."
                      : "Chưa có album nào."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination Controls */}
          {albumPagination.totalPages > 1 && (
            <div className="flex items-center justify-end space-x-2 py-4 mt-2 border-t border-zinc-800">
              <span className="text-sm text-zinc-500">
                Trang {albumPagination.currentPage} /{" "}
                {albumPagination.totalPages} (Tổng: {albumPagination.totalItems}
                )
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevPage}
                disabled={albumPagination.currentPage <= 1 || isLoading}
              >
                <ChevronLeft className="size-4 mr-1" /> Quay lại
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={
                  albumPagination.currentPage >= albumPagination.totalPages ||
                  isLoading
                }
              >
                Tiếp theo <ChevronRight className="size-4 ml-1" />
              </Button>
            </div>
          )}
        </>
      )}

      <ManageAlbumSongsDialog
        album={selectedAlbum}
        open={isManageOpen}
        onOpenChange={setIsManageOpen}
        onClose={handleCloseDialog}
      />
    </>
  );
};

export default AlbumsTable;
