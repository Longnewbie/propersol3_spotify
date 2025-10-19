const FavoritesListSkeleton = () => {
  const SongSkeleton = () => (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-800/30 animate-pulse">
      <div className="w-8 h-8 bg-zinc-700/50 rounded" />
      <div className="w-14 h-14 bg-zinc-700/50 rounded-lg flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-zinc-700/50 rounded w-3/4" />
        <div className="h-3 bg-zinc-700/50 rounded w-1/2" />
      </div>
      <div className="w-5 h-5 bg-zinc-700/50 rounded" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black">
      {/* Header skeleton */}
      <div className="bg-gradient-to-b from-amber-900/20 to-zinc-900 pt-16 pb-8 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-zinc-800/50 p-4 rounded-2xl size-32 animate-pulse" />
            <div className="flex-1 space-y-3">
              <div className="h-4 bg-zinc-800/50 rounded w-24 animate-pulse" />
              <div className="h-8 bg-zinc-800/50 rounded w-48 animate-pulse" />
              <div className="h-4 bg-zinc-800/50 rounded w-32 animate-pulse" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="size-12 rounded-full bg-zinc-700/50 animate-pulse" />
        </div>
      </div>
      {/* Content skeleton */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8">
        <div className="space-y-2">
          {[...Array(6)].map((_, i) => (
            <SongSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoritesListSkeleton;
