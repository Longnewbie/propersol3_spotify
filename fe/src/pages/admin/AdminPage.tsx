import { useAuthStore } from "@/stores/useAuthStore";
import Header from "./components/Header";
import DashboardStats from "./components/DashboardStats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Album, Lock, Music } from "lucide-react";
import SongsTabContent from "./components/SongsTabContent";
import AlbumsTabContent from "./components/AlbumsTabContent";
import { useEffect } from "react";
import { useMusicStore } from "@/stores/useMusicStore";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AdminPage = () => {
  const { isAdmin, isLoading } = useAuthStore();
  const { fetchAlbums, fetchSongs, fetchStats } = useMusicStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAlbums();
    fetchSongs();
    fetchStats();
  }, [fetchAlbums, fetchSongs, fetchStats]);

  if (!isAdmin && !isLoading) {
    return (
      <div
        className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black 
                  text-zinc-100 flex items-center justify-center p-8"
      >
        <div className="bg-zinc-800/60 border border-zinc-700/50 rounded-xl p-8 max-w-md text-center shadow-lg backdrop-blur-sm">
          <div className="flex justify-center mb-4">
            <Lock className="size-16 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Truy cập bị từ chối
          </h1>
          <p className="text-zinc-400 mb-6">
            Bạn không có quyền quản trị viên để xem trang này.
          </p>
          <Button
            onClick={() => navigate("/")} // <-- Thêm onClick
            className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-6 py-2"
          >
            Quay về Trang chủ
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black 
    text-zinc-100 p-8 "
    >
      <Header />

      <DashboardStats />

      <Tabs defaultValue="songs" className="space-y-6">
        <TabsList className="p-1 bg-zinc-800/50">
          <TabsTrigger
            value="songs"
            className="data-[state=active]:bg-zinc-700"
          >
            <Music className="mr-2 size-4" />
            Bài hát
          </TabsTrigger>
          <TabsTrigger
            value="albums"
            className="data-[state=active]:bg-zinc-700"
          >
            <Album className="mr-2 size-4" />
            Album
          </TabsTrigger>
        </TabsList>

        <TabsContent value="songs">
          <SongsTabContent />
        </TabsContent>

        <TabsContent value="albums">
          <AlbumsTabContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
