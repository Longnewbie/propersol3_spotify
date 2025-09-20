import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

function useDebouncedValue<T>(value: T, ms = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), ms);
    return () => clearTimeout(id);
  }, [value, ms]);

  return debounced;
}

const SearchBar = () => {
  const songs = useMusicStore((s) => s.songs);
  const fetchSongs = useMusicStore((s) => s.fetchSongs);
  const playAlbum = usePlayerStore((s) => s.playAlbum);
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 250);
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!songs || songs.length === 0) fetchSongs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let mounted = true;
    const q = debouncedQuery?.toString().trim();
    if (!q) return setResults([]);

    (async () => {
      try {
        const res = await axiosInstance.get(
          `/songs/search?q=${encodeURIComponent(q)}`
        );
        if (!mounted) return;
        setResults(res.data || []);
      } catch {
        setResults([]);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [debouncedQuery]);

  const onSelectSong = (selectedSong: any) => {
    if (selectedSong.album && selectedSong.album._id) {
      navigate(`/albums/${selectedSong.album._id}`);
    }

    const remainder = songs.length
      ? songs.filter((s) => s._id !== selectedSong._id)
      : [];
    const queue = [selectedSong, ...remainder];
    playAlbum(queue, 0);
    setQuery("");
    setOpen(false);
  };

  return (
    <div className="w-full max-w-md relative">
      <div className="relative w-full">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
          <Search size={18} />
        </span>

        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder="Tìm bài hát, nghệ sĩ..."
          className="w-full rounded-2xl pl-10 pr-4 py-2.5 bg-zinc-900/80 
               text-sm text-white placeholder:text-zinc-500 
               border border-zinc-700 focus:outline-none 
               focus:ring-2 focus:ring-zinc-500 
               focus:border-transparent transition-colors 
               hover:bg-zinc-800"
        />
      </div>

      {open && query && (
        <div className="absolute left-0 right-0 mt-2 bg-zinc-900 border border-zinc-700 rounded-md shadow-lg z-20">
          {results.length === 0 ? (
            <div className="p-2 text-sm text-zinc-400">Không có kết quả</div>
          ) : (
            <div>
              {/* scrollable area */}
              <div className="max-h-80 overflow-y-auto search-scrollbar">
                {(expanded ? results : results.slice(0, 8)).map((r) => (
                  <button
                    key={r._id}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => onSelectSong(r)}
                    className="w-full text-left px-3 py-2 hover:bg-zinc-800 flex gap-3 items-center"
                  >
                    <img
                      src={r.imageUrl}
                      alt={r.title}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm">{r.title}</span>
                      <span className="text-xs text-zinc-400">{r.artist}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* See more / Collapse control */}
              {results.length > 8 && (
                <div className="p-2 border-t border-zinc-800 flex justify-center">
                  <button
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => setExpanded((s) => !s)}
                    className="text-sm text-amber-400 hover:underline"
                  >
                    {expanded ? "Thu gọn" : `Xem thêm (${results.length - 8})`}
                  </button>
                </div>
              )}
            </div>
          )}
          {/* custom scrollbar styles for darker appearance */}
          <style>{`
            .search-scrollbar { scrollbar-width: thin; scrollbar-color: #374151 #0b1220; }
            .search-scrollbar::-webkit-scrollbar { width: 10px; }
            .search-scrollbar::-webkit-scrollbar-track { background: #0b1220; }
            .search-scrollbar::-webkit-scrollbar-thumb { background-color: #374151; border-radius: 9999px; border: 2px solid transparent; background-clip: padding-box; }
            .search-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #1f2937; }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
