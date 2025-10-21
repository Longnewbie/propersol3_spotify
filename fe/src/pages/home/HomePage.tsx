import Topbar from "@/components/Topbar";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";
import FeaturedSection from "./components/FeaturedSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionGrid from "./components/SectionGrid";
import { usePlayerStore } from "@/stores/usePlayerStore";
import Footer from "./components/Footer";
import AlbumGrid from "./components/AlbumGrid";

const HomePage = () => {
  const {
    fetchFeaturedSongs,
    fetchMadeForYouSongs,
    fetchTrendingSongs,
    fetchHottestAlbums,
    isLoading,
    featuredSongs,
    madeForYouSongs,
    trendingSongs,
    hottestAlbums,
  } = useMusicStore();

  const { initializeQueue } = usePlayerStore();

  useEffect(() => {
    fetchFeaturedSongs();
    fetchMadeForYouSongs();
    fetchTrendingSongs();
    fetchHottestAlbums();
  }, [
    fetchFeaturedSongs,
    fetchMadeForYouSongs,
    fetchTrendingSongs,
    fetchHottestAlbums,
  ]);

  useEffect(() => {
    if (
      madeForYouSongs.length > 0 &&
      featuredSongs.length > 0 &&
      trendingSongs.length > 0
    ) {
      const allSongs = [...featuredSongs, ...madeForYouSongs, ...trendingSongs];
      initializeQueue(allSongs);
    }
  }, [initializeQueue, madeForYouSongs, featuredSongs, trendingSongs]);

  return (
    <main className="flex flex-col rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
      <Topbar />
      <ScrollArea className="flex-1 overflow-y-auto">
        <div className="p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">
            Chào buổi chiều
          </h1>
          <FeaturedSection />

          <div className="space-y-8">
            <AlbumGrid
              title="Album hot nhất"
              albums={hottestAlbums}
              isLoading={isLoading}
            />

            <SectionGrid
              title="Dành riêng cho bạn"
              songs={madeForYouSongs}
              isLoading={isLoading}
            />
            <SectionGrid
              title="Đang thịnh hành"
              songs={trendingSongs}
              isLoading={isLoading}
            />
          </div>
          <Footer />
        </div>
      </ScrollArea>
    </main>
  );
};

export default HomePage;
