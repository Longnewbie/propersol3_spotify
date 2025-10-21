// AlbumsTable.tsx
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMusicStore } from "@/stores/useMusicStore";
import { Calendar, Music, Trash2, Edit } from "lucide-react";
import { useEffect, useState } from "react";
import ManageAlbumSongsDialog from "./ManageAlbumSongsDialog";
import { Album } from "@/types";

const AlbumsTable = () => {
  const { albums, deleteAlbum, fetchAlbums, fetchSongs } = useMusicStore();

  const [isManageOpen, setIsManageOpen] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

  useEffect(() => {
    fetchAlbums();
    fetchSongs(); // Gọi cả fetchSongs để Dialog có dữ liệu
  }, [fetchAlbums, fetchSongs]);

  const handleManageClick = (album: Album) => {
    setSelectedAlbum(album);
    setIsManageOpen(true);
  };

  const handleCloseDialog = () => {
    setIsManageOpen(false);
    setSelectedAlbum(null);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-zinc-800/50">
            <TableHead className="w-[50px]">#</TableHead>
            <TableHead>Tiêu đề</TableHead>
            <TableHead>Nghệ sĩ</TableHead>
            <TableHead>Năm phát hành</TableHead>
            <TableHead>Tổng bài hát</TableHead>
            <TableHead className="text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {albums.map((album) => (
            <TableRow key={album._id} className="hover:bg-zinc-800/50">
              <TableCell>
                <img
                  src={album.imageUrl}
                  alt={album.title}
                  className="size-10 rounded object-cover"
                />
              </TableCell>
              <TableCell className="font-medium">{album.title}</TableCell>
              <TableCell>{album.artist}</TableCell>
              <TableCell>
                <span className="inline-flex items-center gap-3 text-zinc-400">
                  <Calendar className="size-4" />
                  {album.releaseYear}
                </span>
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center gap-1 text-zinc-400">
                  <Music className="size-4" />
                  {album.songs.length} bài hát
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  {/* NÚT QUẢN LÝ MỚI */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleManageClick(album)}
                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"
                  >
                    <Edit className="size-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteAlbum(album._id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* RENDER DIALOG MỚI */}
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
