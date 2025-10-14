import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMusicStore } from "@/stores/useMusicStore";
import { Song } from "@/types";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import { axiosInstance } from "@/lib/axios";
import { useAuth } from "@clerk/clerk-react";

interface UpdateSongDialogProps {
  song: Song | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose?: () => void;
}

const UpdateSongDialog = ({
  song,
  open,
  onOpenChange,
  onClose,
}: UpdateSongDialogProps) => {
  const { getToken } = useAuth();

  const { isLoading, fetchSongs } = useMusicStore();

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    duration: 0,
    lyrics: "",
  });

  // Reset form when dialog is closed
  useEffect(() => {
    if (!open) {
      setFormData({
        title: "",
        artist: "",
        duration: 0,
        lyrics: "",
      });
    }
  }, [open]);

  // Reset form when song changes
  useEffect(() => {
    if (song) {
      setFormData({
        title: song.title || "",
        artist: song.artist || "",
        duration: song.duration || 0,
        lyrics: song.lyrics || "",
      });
    }
  }, [song]);

  const handleInputChange = (
    field: keyof typeof formData,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    const token = await getToken();
    if (!song?._id) return;

    if (!formData.title.trim() || !formData.artist.trim()) {
      toast.error("Title and artist are required");
      return;
    }

    try {
      await axiosInstance.put(`/admin/songs/${song._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Reset form
      setFormData({
        title: "",
        artist: "",
        duration: 0,
        lyrics: "",
      });

      fetchSongs();
      toast.success("Song updated successfully");
      onOpenChange(false);
      if (onClose) onClose();

      // Refresh songs list
      fetchSongs();
    } catch (error) {
      console.error("Failed to update song:", error);
    }
  };

  const handleCancel = () => {
    // Reset form to original values
    if (song) {
      setFormData({
        title: song.title || "",
        artist: song.artist || "",
        duration: song.duration || 0,
        lyrics: song.lyrics || "",
      });
    }
    onOpenChange(false);
    if (onClose) onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 border-zinc-700 max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-zinc-100">Update Song</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Update the song information. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-200">Title</label>
            <Input
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="bg-zinc-800 border-zinc-700 text-zinc-100"
              placeholder="Song title"
            />
          </div>

          {/* Artist */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-200">Artist</label>
            <Input
              value={formData.artist}
              onChange={(e) => handleInputChange("artist", e.target.value)}
              className="bg-zinc-800 border-zinc-700 text-zinc-100"
              placeholder="Artist name"
            />
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-200">
              Duration (seconds)
            </label>
            <Input
              type="number"
              min="0"
              value={formData.duration}
              onChange={(e) =>
                handleInputChange("duration", parseInt(e.target.value) || 0)
              }
              className="bg-zinc-800 border-zinc-700 text-zinc-100"
              placeholder="Duration in seconds"
            />
          </div>

          {/* Lyrics */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-200">
              Lyrics (Optional)
            </label>
            <Textarea
              value={formData.lyrics}
              onChange={(e) => handleInputChange("lyrics", e.target.value)}
              className="bg-zinc-800 border-zinc-700 text-zinc-100 min-h-[300px] resize-none"
              placeholder="Enter song lyrics here..."
            />
          </div>
        </div>

        {/* Footer Buttons */}
        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleCancel}
            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Updating..." : "Update Song"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateSongDialog;
