import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useState, useRef } from "react";
import { axiosInstance } from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Music } from "lucide-react";
import { cn } from "@/lib/utils";
import NotFoundPage from "@/pages/404/NotFoundPage";
import { Song } from "@/types";
import BlurImage from "@/components/BlurImage";

// Reuse the same parseLRC function from original PlayBackControls
const parseLRC = (raw: string) => {
  if (!raw) return [{ time: 0, text: "Lời bài hát chưa có sẵn" }];
  const lines: { time: number; text: string }[] = [];
  const timeRegex = /\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/g;

  raw.split(/\r?\n/).forEach((line) => {
    let match: RegExpExecArray | null;
    let lastIndex = 0;
    const times: number[] = [];
    // extract all timestamps
    while ((match = timeRegex.exec(line)) !== null) {
      const min = Number.parseInt(match[1], 10);
      const sec = Number.parseInt(match[2], 10);
      const ms = match[3] ? Number.parseInt(match[3].padEnd(3, "0"), 10) : 0;
      times.push(min * 60 + sec + ms / 1000);
      lastIndex = match.index + match[0].length;
    }
    const text = line.slice(lastIndex).trim();
    if (times.length) {
      times.forEach((t) => lines.push({ time: t, text: text || "…" }));
    } else if (text) {
      // plain line without timestamp -> push with no time (will be treated as 0)
      lines.push({ time: 0, text });
    }
  });

  // sort by time
  lines.sort((a, b) => a.time - b.time);
  // if everything is time 0 and multiple lines, assign incremental times to avoid overlap
  if (lines.every((l) => l.time === 0) && lines.length > 1) {
    return lines.map((l, i) => ({ ...l, time: i * 3 })); // 3 seconds per line
  }
  return lines;
};

const LyricsPage = () => {
  const { currentSong, currentTime, isPlaying, setCurrentTime } =
    usePlayerStore();
  const [lyricsLines, setLyricsLines] = useState<
    { time: number; text: string }[]
  >([]);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);

  const lyricsContainerRef = useRef<HTMLDivElement | null>(null);

  const lyricLineRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = document.querySelector("audio");
  }, []);

  // Fetch lyrics when component mounts
  useEffect(() => {
    if (!currentSong) {
      setLyricsLines([]);
      return;
    }
    if (!currentSong._id) {
      setLyricsLines([{ time: 0, text: "Lời bài hát chưa có sẵn" }]);
      return;
    }

    // if the song object already contains lyrics from the DB, use it directly
    const existingLyrics = (currentSong as Song).lyrics;
    if (
      existingLyrics &&
      typeof existingLyrics === "string" &&
      existingLyrics.trim().length > 0
    ) {
      setLyricsLines(parseLRC(existingLyrics));
      setCurrentLyricIndex(0);
      return;
    }

    const fetchLyrics = async () => {
      try {
        const response = await axiosInstance.get(
          `/songs/${currentSong._id}/lyrics`
        );
        const raw = (response.data && response.data.lyrics) || "";
        setLyricsLines(parseLRC(raw));
        setCurrentLyricIndex(0);
      } catch (error: unknown) {
        console.error(error);
        setLyricsLines([{ time: 0, text: "Lời bài hát chưa có sẵn" }]);
      }
    };

    fetchLyrics();
  }, [currentSong]);

  // Update current lyric index based on currentTime
  useEffect(() => {
    if (!lyricsLines.length) return;
    let idx = 0;
    for (let i = 0; i < lyricsLines.length; i++) {
      if (currentTime >= lyricsLines[i].time) idx = i;
      else break;
    }
    setCurrentLyricIndex(idx);
  }, [currentTime, lyricsLines]);

  // Auto-scroll to current lyric
  useEffect(() => {
    const el = lyricLineRefs.current[currentLyricIndex];
    const container = lyricsContainerRef.current;
    if (el && container) {
      const containerRect = container.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      if (
        elRect.top < containerRect.top ||
        elRect.bottom > containerRect.bottom
      ) {
        container.scrollTo({
          top: el.offsetTop - container.clientHeight / 2,
          behavior: "smooth",
        });
      }
    }
  }, [currentLyricIndex]);

  const handleLyricClick = (line: { time: number; text: string }) => {
    if (line.text === "Lời bài hát chưa có sẵn" && line.time === 0) {
      return;
    }

    setCurrentTime(line.time);
    if (audioRef.current) {
      audioRef.current.currentTime = line.time;
    }
  };

  // Demo functionality to simulate time progression
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime(currentTime + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, currentTime, setCurrentTime]);

  if (!currentSong) {
    return <NotFoundPage />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Enhanced Header with Album Art */}
      <header className="sticky top-0 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.history.back()}
              className="text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>

            {/* Album Art */}
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-800 shrink-0">
              {currentSong.imageUrl ? (
                <BlurImage
                  src={currentSong?.imageUrl || "/placeholder.svg"}
                  alt={currentSong?.title}
                  className="w-full h-full object-cover transition-[filter] duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Music className="w-6 h-6 text-slate-400" />
                </div>
              )}
            </div>

            {/* Song Info */}
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-semibold truncate">
                {currentSong.title}
              </h1>
              <p className="text-sm text-slate-400 truncate">
                {currentSong.artist}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Lyrics Content */}
      <div className="container mx-auto px-4 py-8">
        <div
          ref={lyricsContainerRef}
          className="max-h-[calc(100vh-200px)] overflow-auto py-8 space-y-6 scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {lyricsLines.map((line, i) => (
            <div
              key={i}
              ref={(el) => (lyricLineRefs.current[i] = el)}
              className={cn(
                "text-center transition-all duration-200 cursor-pointer px-4 py-3 rounded-lg mx-auto max-w-3xl leading-relaxed",
                "hover:text-slate-200",
                i === currentLyricIndex
                  ? "text-lg sm:text-xl md:text-2xl text-white font-semibold drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]"
                  : "text-base sm:text-lg md:text-xl text-slate-400"
              )}
              onClick={() => handleLyricClick(line)}
            >
              {line.text}
            </div>
          ))}

          {/* Bottom spacing for better UX */}
          <div className="h-32" />
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default LyricsPage;
