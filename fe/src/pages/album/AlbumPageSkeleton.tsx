import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock } from "lucide-react";

// Custom shimmer animation
const shimmerKeyframes = `
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

const AlbumPageSkeleton = () => {
  return (
    <>
      <style>{shimmerKeyframes}</style>
      <div className="h-full">
        <ScrollArea className="h-full rounded-md">
          {/* main content */}
          <div className="relative min-h-full">
            {/* bg gradient */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80
						 to-zinc-900 pointer-events-none"
              aria-hidden="true"
            />

            {/* content */}
            <div className="relative z-10">
              <div className="flex p-6 gap-6 pb-8">
                {/* Album image skeleton */}
                <div className="w-[240px] h-[240px] bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-900 animate-pulse rounded shadow-2xl transform hover:scale-105 transition-transform duration-300 relative overflow-hidden">
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>

                <div className="flex flex-col justify-end">
                  {/* Album label skeleton */}
                  <div className="w-12 h-4 bg-gradient-to-r from-zinc-700 to-zinc-600 animate-pulse rounded mb-1 shadow-sm relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                  </div>

                  {/* Album title skeleton */}
                  <div className="relative">
                    <div className="w-96 h-16 bg-gradient-to-r from-zinc-700 via-zinc-600 to-zinc-700 animate-pulse rounded my-4 shadow-lg relative overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </div>
                  </div>

                  {/* Album info skeleton */}
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-4 bg-gradient-to-r from-zinc-700 to-zinc-600 animate-pulse rounded shadow-sm relative overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                    </div>
                    <span className="text-zinc-400">•</span>
                    <div className="w-16 h-4 bg-gradient-to-r from-zinc-700 to-zinc-600 animate-pulse rounded shadow-sm relative overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                    </div>
                    <span className="text-zinc-400">•</span>
                    <div className="w-12 h-4 bg-gradient-to-r from-zinc-700 to-zinc-600 animate-pulse rounded shadow-sm relative overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                    </div>
                  </div>
                </div>
              </div>

              {/* play button skeleton */}
              <div className="px-6 pb-4 flex items-center gap-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-zinc-600 via-zinc-700 to-zinc-800 animate-pulse shadow-xl border border-zinc-600/50 relative overflow-hidden">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent" />
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
                </div>
              </div>

              {/* table section */}
              <div className="bg-black/20 backdrop-blur-sm">
                {/* table header */}
                <div
                  className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm 
                text-zinc-400 border-b border-white/5"
                >
                  <div>#</div>
                  <div>Title</div>
                  <div>Released Date</div>
                  <div>
                    <Clock className="size-4" />
                  </div>
                </div>

                {/* song list skeleton */}
                <div className="px-6">
                  <div className="space-y-2 py-4">
                    {Array.from({ length: 7 }).map((_, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm
                            text-zinc-400 rounded-md hover:bg-white/5 transition-colors duration-200 group"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {/* Track number skeleton */}
                        <div className="flex items-center justify-center">
                          <div className="w-3 h-4 bg-gradient-to-r from-zinc-700 to-zinc-600 animate-pulse rounded shadow-sm relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                          </div>
                        </div>

                        {/* Song info skeleton */}
                        <div className="flex items-center gap-3">
                          <div className="size-10 bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-900 animate-pulse rounded shadow-md relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                          </div>
                          <div className="space-y-2">
                            <div className="w-32 h-4 bg-gradient-to-r from-zinc-700 via-zinc-600 to-zinc-700 animate-pulse rounded shadow-sm relative overflow-hidden">
                              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                            </div>
                            <div className="w-24 h-3 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 animate-pulse rounded shadow-sm relative overflow-hidden">
                              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                            </div>
                          </div>
                        </div>

                        {/* Release date skeleton */}
                        <div className="flex items-center">
                          <div className="w-20 h-4 bg-gradient-to-r from-zinc-700 to-zinc-600 animate-pulse rounded shadow-sm relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                          </div>
                        </div>

                        {/* Duration skeleton */}
                        <div className="flex items-center">
                          <div className="w-10 h-4 bg-gradient-to-r from-zinc-700 to-zinc-600 animate-pulse rounded shadow-sm relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

export default AlbumPageSkeleton;
