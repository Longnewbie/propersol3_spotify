import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { FaPlay, FaPause } from "react-icons/fa6";
import {
  Laptop2,
  ListMusic,
  Mic2,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume1,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
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
  } = usePlayerStore();

  const [volume, setVolume] = useState(75);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = document.querySelector("audio");

    const audio = audioRef.current;

    if (!audio) return;

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
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [currentSong]);

  const handleSeek = (value: number[]) => {
    if (audioRef.current) audioRef.current.currentTime = value[0];
  };

  return (
    <footer className="h-20 sm:h-24 bg-zinc-900 border-t border-zinc-800 px-4">
      <div className="flex justify-between items-center h-full max-w-[1800px] mx-auto">
        {/* current playing song */}
        <div className="hidden sm:flex items-center gap-4 min-w-[180px] w-[30%]">
          {currentSong && (
            <>
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
            </>
          )}
        </div>

        {/* player controls */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-full sm:max-w-[45%]">
          <div className="flex items-center gap-4 sm:gap-6">
            <Button
              size={"icon"}
              variant={"ghost"}
              className={`hidden sm:inline-flex transition-colors ${
                shuffle ? "text-amber-400" : "text-zinc-400 hover:text-white"
              }`}
              onClick={toggleShuffle}
              title="Shuffle"
            >
              <Shuffle className="size-4" />
            </Button>

            <Button
              size={"icon"}
              variant={"ghost"}
              className="hover:text-white text-zinc-400"
              onClick={playPrevious}
              disabled={!currentSong}
            >
              <SkipBack className="size-4" />
            </Button>

            <Button
              size={"icon"}
              className="bg-white hover:bg-white/80 text-black rounded-full size-8"
              onClick={togglePlay}
              disabled={!currentSong}
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
            >
              <SkipForward className="size-4" />
            </Button>

            <Button
              size={"icon"}
              variant={"ghost"}
              className={`hidden sm:inline-flex relative transition-colors ${
                repeatMode !== "off"
                  ? "text-amber-400"
                  : "text-zinc-400 hover:text-white"
              }`}
              onClick={cycleRepeatMode}
              title={`Repeat: ${repeatMode}`}
            >
              <Repeat className="size-4" />
              {repeatMode === "one" && (
                <span className="absolute -top-1 -right-1 text-[10px] bg-amber-400 text-black rounded-full px-[5px] leading-4">
                  1
                </span>
              )}
            </Button>
          </div>

          <div className="hidden sm:flex items-center gap-2 w-full">
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
            <div className="text-xs text-zinc-400">{formatTime(duration)}</div>
          </div>
        </div>

        {/* volume controls */}
        <div className="hidden sm:flex items-center gap-4 min-w-[180px] w-[30%] justify-end">
          <Button
            size={"icon"}
            variant={"ghost"}
            className="hover:text-white text-zinc-400"
          >
            <Mic2 className="size-4" />
          </Button>

          <Button
            size={"icon"}
            variant={"ghost"}
            className="hover:text-white text-zinc-400"
          >
            <ListMusic className="size-4" />
          </Button>

          <Button
            size={"icon"}
            variant={"ghost"}
            className="hover:text-white text-zinc-400"
          >
            <Laptop2 className="size-4" />
          </Button>

          <Button
            size={"icon"}
            variant={"ghost"}
            className="hover:text-white text-zinc-400"
          >
            <Volume1 className="size-4" />
          </Button>

          <Slider
            value={[volume]}
            max={100}
            step={1}
            className="w-24 hover:cursor-grab active:cursor-grabbing"
            onValueChange={(value) => {
              setVolume(value[0]);
              if (audioRef.current) {
                audioRef.current.volume = value[0] / 100;
              }
            }}
          />
        </div>
      </div>
    </footer>
  );
};

export default PlayBackControls;
