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
import { Calendar, Edit, Trash2, Search, RefreshCw } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import UpdateSongDialog from "./UpdateSongDialog";
import { Song } from "@/types";

const SongsTable = () => {
  const { songs, isLoading, error, deleteSong, fetchSongs } = useMusicStore();

  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [query, setQuery] = useState("");
  const [loadingRefresh, setLoadingRefresh] = useState(false);

  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);

  const handleEditClick = (song: Song) => {
    setSelectedSong(song);
    setIsUpdateDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsUpdateDialogOpen(false);
    setSelectedSong(null);
  };

  const handleRefresh = async () => {
    try {
      setLoadingRefresh(true);
      await fetchSongs();
    } finally {
      setLoadingRefresh(false);
    }
  };

  const filteredSongs = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return songs;
    return songs.filter(
      (song) =>
        song.title.toLowerCase().includes(q) ||
        song.artist.toLowerCase().includes(q)
    );
  }, [songs, query]);

  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center py-8">
  //       <div className="text-zinc-400">Loading songs...</div>
  //     </div>
  //   );
  // }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center mb-3 gap-3">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 size-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Tìm kiếm bài hát..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-8 w-80"
          />
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={handleRefresh}
          disabled={loadingRefresh}
          title="Làm mới"
        >
          <RefreshCw
            className={`size-4 ${
              loadingRefresh ? "animate-spin text-emerald-500" : ""
            }`}
          />
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className="text-zinc-400">Đang tải dữ liệu...</div>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-zinc-800/50">
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead>Tiêu đề</TableHead>
              <TableHead>Nghệ sĩ</TableHead>
              <TableHead>Ngày phát hành</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredSongs.length > 0 ? (
              filteredSongs.map((song) => (
                <TableRow key={song._id} className="hover:bg-zinc-800/50">
                  <TableCell>
                    <img
                      src={song.imageUrl}
                      alt={song.title}
                      className="size-10 rounded object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{song.title}</TableCell>
                  <TableCell>{song.artist}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center gap-1 text-zinc-400">
                      <Calendar className="size-4" />
                      {new Intl.DateTimeFormat("en-GB").format(new Date(song.createdAt))}
                    </span>
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant={"ghost"}
                        size={"sm"}
                        className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"
                        onClick={() => handleEditClick(song)}
                      >
                        <Edit className="size-4" />
                      </Button>

                      <Button
                        variant={"ghost"}
                        size={"sm"}
                        className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                        onClick={() => deleteSong(song._id)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-zinc-500 py-6"
                >
                  Bài hát không tìm thấy.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      {/* Update Song Dialog */}
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
