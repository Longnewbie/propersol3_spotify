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
import { Calendar, Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import UpdateSongDialog from "./UpdateSongDialog";
import { Song } from "@/types";

const SongsTable = () => {
  const { songs, isLoading, error, deleteSong, fetchSongs } = useMusicStore();

  // State for update dialog
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-zinc-400">Loading songs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-zinc-800/50">
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Artist</TableHead>
            <TableHead>Release Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {songs.map((song) => (
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
                  {song.createdAt.split("T")[0]}
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
          ))}
        </TableBody>
      </Table>

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
