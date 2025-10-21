import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { FaPlay, FaPause } from "react-icons/fa6";
import {
  Heart,
  ListMusic,
  LogIn,
  Mic2,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume1,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { useAuthStore } from "@/stores/useAuthStore";
import toast from "react-hot-toast";

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const repeatModeTooltips = {
  off: "Bật lặp lại tất cả",
  all: "Bật lặp lại một bài",
  one: "Tắt lặp lại",
};

const PlayBackControls = () => {
  const {
    currentSong,
    isPlaying,
    togglePlay,
    playNext,
    playPrevious,
    shuffle,
    repeatMode,
    toggleShuffle,
    cycleRepeatMode,
    currentTime,
    setCurrentTime,
  } = usePlayerStore();

  const { userId } = useAuth();
  const { favoriteSongIds, fetchFavorites, toggleFavorite } = useAuthStore();
  const navigate = useNavigate();
  const [volume, setVolume] = useState(75);
  const [lastVolume, setLastVolume] = useState(75); // Thêm state để nhớ âm lượng
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // khi user login thì lấy ds yêu thích
  useEffect(() => {
    if (userId) {
      fetchFavorites();
    }
  }, [userId, fetchFavorites]);

  useEffect(() => {
    audioRef.current = document.querySelector("audio");

    const audio = audioRef.current;

    if (!audio) return;

    // Set âm lượng ban đầu
    audio.volume = volume / 100;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    const handlePlay = () => usePlayerStore.setState({ isPlaying: true });
    const handlePause = () => usePlayerStore.setState({ isPlaying: false });

    const handleEnded = () => {
      usePlayerStore.setState({ isPlaying: false });
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [currentSong, setCurrentTime, volume]); // Thêm volume vào dependency

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleVolumeChange = (value: number) => {
    setVolume(value);
    if (value > 0) {
      setLastVolume(value); // Lưu lại giá trị nếu nó lớn hơn 0
    }
    if (audioRef.current) {
      audioRef.current.volume = value / 100;
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      handleVolumeChange(lastVolume);
    } else {
      handleVolumeChange(0);
    }
  };

  const isLiked = currentSong ? favoriteSongIds.has(currentSong._id) : false;

  const handleLike = () => {
    if (!userId) {
      toast.error("Đăng nhập để thêm vào danh sách yêu thích.", {
        icon: <LogIn className="size-5 text-white" />,
        style: {
          borderRadius: "12px",
          background: "linear-gradient(135deg, #2a2a2a, #1a1a1a)",
          color: "#fff",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.4)",
          fontSize: "15px",
          fontWeight: 500,
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#2a2a2a",
        },
        position: "top-center",
      });
      return;
    }
    if (currentSong) {
      toggleFavorite(currentSong._id);
    }
  };

  if (!currentSong) {
    return (
      <footer className="h-20 sm:h-24 bg-zinc-900 border-t border-zinc-800 px-4">
        <div className="flex justify-center items-center h-full">
          <p className="text-zinc-400 text-sm">No song playing</p>
        </div>
      </footer>
    );
  }

  return (
    <>
      {/* Desktop Layout */}
      <footer className="hidden lg:block h-24 bg-zinc-900 border-t border-zinc-800 px-4">
        <div className="flex justify-between items-center h-full max-w-[1800px] mx-auto">
          {/* current playing song */}
          <div className="flex items-center gap-4 min-w-[180px] w-[30%]">
            <img
              src={currentSong.imageUrl}
              alt={currentSong.title}
              className="w-14 h-14 object-cover rounded-md"
            />
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate hover:underline cursor-pointer">
                {currentSong.title}
              </div>
              <div className="text-sm text-zinc-400 truncate hover:underline cursor-pointer">
                {currentSong.artist}
              </div>
            </div>
          </div>

          {/* player controls */}
          <div className="flex flex-col items-center gap-2 flex-1 max-w-[45%]">
            <div className="flex items-center gap-6">
              <Button
                size={"icon"}
                variant={"ghost"}
                className={`transition-colors ${
                  shuffle ? "text-amber-400" : "text-zinc-400 hover:text-white"
                }`}
                onClick={toggleShuffle}
                title="Bật trộn bài"
              >
                <Shuffle className="size-4" />
              </Button>

              <Button
                size={"icon"}
                variant={"ghost"}
                className="hover:text-white text-zinc-400"
                onClick={playPrevious}
                disabled={!currentSong}
                title="Trước"
              >
                <SkipBack className="size-4" />
              </Button>

              <Button
                size={"icon"}
                className="bg-white hover:bg-white/80 text-black rounded-full size-8"
                onClick={togglePlay}
                disabled={!currentSong}
                title={`${isPlaying ? "Tạm dừng" : "Phát"}`}
              >
                {isPlaying ? (
                  <FaPause className="size-5" />
                ) : (
                  <FaPlay className="size-5" />
                )}
              </Button>

              <Button
                size={"icon"}
                variant={"ghost"}
                className="hover:text-white text-zinc-400"
                onClick={playNext}
                disabled={!currentSong}
                title="Tiếp"
              >
                <SkipForward className="size-4" />
              </Button>

              <Button
                size={"icon"}
                variant={"ghost"}
                className={`relative transition-colors ${
                  repeatMode !== "off"
                    ? "text-amber-400"
                    : "text-zinc-400 hover:text-white"
                }`}
                onClick={cycleRepeatMode}
                title={repeatModeTooltips[repeatMode] || "Lặp lại"}
              >
                <Repeat className="size-4" />
                {repeatMode === "one" && (
                  <span className="absolute -top-1 -right-1 text-[10px] bg-amber-400 text-black rounded-full px-[5px] leading-4">
                    1
                  </span>
                )}
              </Button>
            </div>

            <div className="flex items-center gap-2 w-full">
              <div className="text-xs text-zinc-400">
                {formatTime(currentTime)}
              </div>

              <Slider
                value={[currentTime]}
                max={duration || 100}
                step={1}
                className="w-full hover:cursor-grab active:cursor-grabbing"
                onValueChange={handleSeek}
              />
              <div className="text-xs text-zinc-400">
                {formatTime(duration)}
              </div>
            </div>
          </div>

          {/* volume controls */}
          <div className="flex items-center gap-4 min-w-[180px] w-[30%] justify-end">
            <Button
              size={"icon"}
              variant={"ghost"}
              className="hover:text-white text-zinc-400"
              onClick={() => navigate(`/${currentSong._id}/lyrics`)}
              title="Lời bài hát"
              disabled={!currentSong}
            >
              <Mic2 className="size-4" />
            </Button>

            <Button
              size={"icon"}
              variant={"ghost"}
              className="hover:text-white text-zinc-400"
              onClick={() => {
                if (currentSong?.albums && currentSong.albums.length > 0) {
                  navigate(`/albums/${currentSong.albums[0]}`);
                }
              }}
              title="Dah sách phát"
              disabled={!currentSong?.albums || currentSong.albums.length === 0}
            >
              <ListMusic className="size-4" />
            </Button>

            <Button
              size={"icon"}
              variant={"ghost"}
              className={`transition-colors ${
                isLiked
                  ? "text-red-500 fill-red-500"
                  : "text-zinc-400 hover:text-white"
              }`}
              onClick={handleLike}
              disabled={!currentSong}
              title={isLiked ? "Xóa khỏi Yêu thích" : "Thêm vào Yêu thích"}
            >
              <Heart className={`size-4 ${isLiked ? "fill-red-500" : ""}`} />
            </Button>

            <Button
              size={"icon"}
              variant={"ghost"}
              className="hover:text-white text-zinc-400"
              onClick={toggleMute}
              title={volume === 0 ? "Hủy tắt tiếng" : "Tắt tiếng"}
            >
              {volume === 0 ? (
                <VolumeX className="size-4" />
              ) : volume <= 50 ? (
                <Volume1 className="size-4" />
              ) : (
                <Volume2 className="size-4" />
              )}
            </Button>

            <Slider
              value={[volume]}
              max={100}
              step={1}
              className="w-24 hover:cursor-grab active:cursor-grabbing"
              onValueChange={(value) => handleVolumeChange(value[0])}
            />
          </div>
        </div>
      </footer>

      {/* Mobile & Tablet Layout */}
      <footer className="lg:hidden bg-zinc-900 border-t border-zinc-800">
        {/* Progress Bar - Always visible at top */}
        <div className="px-4 py-4">
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={1}
            className="w-full hover:cursor-grab active:cursor-grabbing"
            onValueChange={handleSeek}
          />
          <div className="flex justify-between text-xs text-zinc-400 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 pb-4">
          {/* Song Info */}
          <div className="flex items-center gap-4 mb-4">
            <img
              src={currentSong.imageUrl}
              alt={currentSong.title}
              className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg shadow-lg"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white truncate text-base sm:text-lg">
                {currentSong.title}
              </h3>
              <p className="text-zinc-400 truncate text-sm sm:text-base">
                {currentSong.artist}
              </p>
            </div>

            {/* Show Lyrics button - navigates to lyrics page */}
            <Button
              size="icon"
              variant="ghost"
              className="text-zinc-400 hover:text-white transition-colors"
              onClick={() => navigate(`/${currentSong._id}/lyrics`)}
              disabled={!currentSong}
            >
              <Mic2 className="size-5" />
            </Button>

            {/* Volume Control - Tablet only */}
            <div className="hidden sm:flex lg:hidden items-center justify-center gap-3">
              <Button
                size="icon"
                variant="ghost"
                className="text-zinc-400 hover:text-white"
                onClick={toggleMute}
                title={volume === 0 ? "Unmute" : "Mute"}
              >
                {volume === 0 ? (
                  <VolumeX className="size-4" />
                ) : (
                  <Volume1 className="size-4" />
                )}
              </Button>
              <Slider
                value={[volume]}
                max={100}
                step={1}
                className="w-32 hover:cursor-grab active:cursor-grabbing"
                onValueChange={(value) => handleVolumeChange(value[0])}
              />
              <span className="text-xs text-zinc-400 w-8 text-right">
                {volume}
              </span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-center gap-6 sm:gap-8 mb-4">
            <Button
              size="icon"
              variant="ghost"
              className={`transition-colors ${
                shuffle ? "text-amber-400" : "text-zinc-400 hover:text-white"
              }`}
              onClick={toggleShuffle}
            >
              <Shuffle className="size-5" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="text-zinc-400 hover:text-white transition-colors"
              onClick={playPrevious}
            >
              <SkipBack className="size-6" />
            </Button>

            <Button
              size="icon"
              className="bg-white hover:bg-white/90 text-black rounded-full size-14 sm:size-16 transition-transform active:scale-95"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <FaPause className="size-6 sm:size-7" />
              ) : (
                <FaPlay className="size-6 sm:size-7 ml-1" />
              )}
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="text-zinc-400 hover:text-white transition-colors"
              onClick={playNext}
            >
              <SkipForward className="size-6" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className={`relative transition-colors ${
                repeatMode !== "off"
                  ? "text-amber-400"
                  : "text-zinc-400 hover:text-white"
              }`}
              onClick={cycleRepeatMode}
            >
              <Repeat className="size-5" />
              {repeatMode === "one" && (
                <span className="absolute -top-1 -right-1 text-[10px] bg-amber-400 text-black rounded-full px-1.5 py-0.5 leading-3 font-semibold">
                  1
                </span>
              )}
            </Button>
          </div>
        </div>
      </footer>
    </>
  );
};

export default PlayBackControls;
