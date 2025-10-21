import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/axios";
import { useMusicStore } from "@/stores/useMusicStore";
import { Plus, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

interface NewSong {
  title: string;
  artist: string;
  duration: string;
}

const AddSongDialog = () => {
  const { getToken } = useAuth();
  const { fetchSongs } = useMusicStore();
  const [songDialogOpen, setSongDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // song details state
  const [newSong, setNewSong] = useState<NewSong>({
    title: "",
    artist: "",
    duration: "0",
  });

  // audio and image files
  const [files, setFiles] = useState<{
    audio: File | null;
    image: File | null;
  }>({
    audio: null,
    image: null,
  });

  const audioInputRef = useRef<HTMLInputElement>(null); // Ref for the audio input
  const imageInputRef = useRef<HTMLInputElement>(null); // Ref for the image input

  // handle form submission and file upload
  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const token = await getToken();

      if (!files.audio || !files.image) {
        return toast.error("Please upload both audio and image files.");
      }

      const formData = new FormData();

      formData.append("title", newSong.title);
      formData.append("artist", newSong.artist);
      formData.append("duration", newSong.duration);

      formData.append("audioFile", files.audio);
      formData.append("imageFile", files.image);

      await axiosInstance.post("/admin/songs", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setNewSong({
        title: "",
        artist: "",
        duration: "0",
      });

      setFiles({
        audio: null,
        image: null,
      });

      toast.success("Song added successfully");
      setSongDialogOpen(false); // Đóng dialog sau khi thêm thành công

      fetchSongs();
    } catch (error: any) {
      toast.error("Failed to add song: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={songDialogOpen} onOpenChange={setSongDialogOpen}>
      <DialogTrigger asChild>
        <Button className=" bg-emerald-500 hover:bg-emerald-600 text-black">
          <Plus className="mr-2 size-4" />
          Thêm bài hát
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-zinc-900 border-zinc-700 max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Thêm mới bài hát</DialogTitle>
          <DialogDescription>
            Thêm bài hát mới vào thư viện nhạc của bạn
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <input
            type="file"
            accept="audio/*"
            hidden
            ref={audioInputRef}
            onChange={(e) =>
              setFiles((prev) => ({ ...prev, audio: e.target.files![0] }))
            }
          />

          <input
            type="file"
            ref={imageInputRef}
            className="hidden"
            accept="image/*"
            onChange={(e) =>
              setFiles((prev) => ({ ...prev, image: e.target.files![0] }))
            }
          />

          {/* image upload */}
          <div
            className="flex items-center justify-center p-6 border-2 border-dashed 
          border-zinc-700 rounded-lg cursor-pointer"
            onClick={() => imageInputRef.current?.click()}
          >
            <div className="text-center">
              {files.image ? (
                <div className="space-y-2">
                  <div className="text-sm text-emerald-500">
                    Hình ảnh đã chọn:
                  </div>
                  <div className="text-xs text-zinc-400">
                    {files.image.name.slice(0, 20)}
                  </div>
                </div>
              ) : (
                <>
                  <div className="p-3 bg-zinc-800 rounded-full inline-block mb-2">
                    <Upload className="size-6 text-zinc-400" />
                  </div>
                  <div className="text-sm text-zinc-400 mb-2">Tải ảnh bìa</div>
                  <Button variant={"outline"} size={"sm"} className="text-xs">
                    Chọn file
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* audio upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Tệp âm thanh</label>
            <div className="flex items-center gap-2">
              <Button
                variant={"outline"}
                onClick={() => audioInputRef.current?.click()}
                className="w-full"
              >
                {files.audio
                  ? files.audio.name.slice(0, 20)
                  : "Chọn tệp âm thanh (.mp3)"}
              </Button>
            </div>
          </div>

          {/* other fields */}
          {/* title */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Tiêu đề</label>
            <Input
              value={newSong.title}
              onChange={(e) =>
                setNewSong({ ...newSong, title: e.target.value })
              }
              className="bg-zinc-800 border-zinc-700"
            />
          </div>

          {/* artist */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Nghệ sĩ</label>
            <Input
              value={newSong.artist}
              onChange={(e) =>
                setNewSong({ ...newSong, artist: e.target.value })
              }
              className="bg-zinc-800 border-zinc-700"
            />
          </div>

          {/* duration */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Thời lượng (Số giây - VD: 5 phút = 300 giây)
            </label>
            <Input
              type="number"
              min="0"
              value={newSong.duration}
              onChange={(e) =>
                setNewSong({
                  ...newSong,
                  duration: e.target.value || "0",
                })
              }
              className="bg-zinc-800 border-zinc-700"
            />
          </div>
        </div>

        {/* add song button and cancel button */}
        <DialogFooter>
          <Button
            variant={"outline"}
            onClick={() => setSongDialogOpen(false)}
            disabled={isLoading}
          >
            Hủy
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Đang tạo..." : "Thêm bài hát"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddSongDialog;
