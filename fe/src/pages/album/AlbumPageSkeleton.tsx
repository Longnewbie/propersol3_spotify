import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock } from "lucide-react";

const AlbumPageSkeleton = () => {
  return (
    <div className="h-full">
      {/* Desktop: custom scroll, Mobile/Tablet: native scroll */}
      <ScrollArea className="hidden md:block h-full rounded-md">
        <AlbumContentSkeleton />
      </ScrollArea>

      <div className="md:hidden h-full overflow-y-auto">
        <AlbumContentSkeleton />
      </div>
    </div>
  );
};

const AlbumContentSkeleton = () => {
  return (
    <div className="relative min-h-full">
      {/* bg gradient giữ RGB */}
      <div
        className="absolute inset-0 bg-gradient-to-b 
        from-[#5038a0]/80 via-zinc-900/80 to-zinc-900 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10">
        {/* Album info */}
        <div className="flex flex-col md:flex-row p-6 gap-6 pb-8 items-center md:items-end">
          {/* Album image skeleton */}
          <div className="w-40 h-40 md:w-[240px] md:h-[240px] shadow-xl rounded bg-zinc-700/50 animate-pulse" />
          
          <div className="flex flex-col justify-end text-center md:text-left flex-1 space-y-3">
            {/* Album type skeleton */}
            <div className="h-4 w-16 bg-zinc-700/50 rounded animate-pulse self-center md:self-start" />
            
            {/* Album title skeleton */}
            <div className="h-12 md:h-20 w-48 md:w-80 bg-zinc-600/50 rounded animate-pulse self-center md:self-start" />
            
            {/* Album info skeleton */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <div className="h-4 w-24 bg-zinc-700/50 rounded animate-pulse" />
              <div className="h-4 w-20 bg-zinc-700/50 rounded animate-pulse" />
              <div className="h-4 w-16 bg-zinc-700/50 rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* Play button skeleton */}
        <div className="px-6 pb-4 flex items-center gap-6">
          <div className="size-12 rounded-full bg-zinc-700/50 animate-pulse" />
        </div>

        {/* Song list */}
        <div className="bg-black/20 backdrop-blur-sm">
          {/* Table header */}
          <div className="hidden md:grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5">
            <div>#</div>
            <div>Title</div>
            <div>Released Date</div>
            <div className="flex justify-end">
              <Clock className="size-[18px]" />
            </div>
          </div>

          <div className="px-4 md:px-6">
            <div className="space-y-2 py-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[16px_1fr_auto] md:grid-cols-[16px_4fr_2fr_1fr] 
                  gap-4 px-2 md:px-4 py-3 text-sm"
                >
                  {/* Index number skeleton */}
                  <div className="flex items-center justify-center">
                    <div className="h-4 w-4 bg-zinc-700/50 rounded animate-pulse" />
                  </div>

                  {/* Song info skeleton */}
                  <div className="flex items-center gap-3">
                    <div className="size-10 bg-zinc-700/50 rounded animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-32 md:w-48 bg-zinc-600/50 rounded animate-pulse" />
                      <div className="h-3 w-24 bg-zinc-700/50 rounded animate-pulse" />
                    </div>
                  </div>

                  {/* Release date skeleton (hidden on mobile) */}
                  <div className="hidden md:flex items-center">
                    <div className="h-3 w-20 bg-zinc-700/50 rounded animate-pulse" />
                  </div>

                  {/* Duration skeleton */}
                  <div className="flex items-center justify-end">
                    <div className="h-3 w-10 bg-zinc-700/50 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumPageSkeleton;