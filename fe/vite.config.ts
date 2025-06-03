import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    host: true, // Để truy cập từ máy hostAdd commentMore actions
    watch: {
      usePolling: true, // Bắt buộc với Docker để theo dõi thay đổi file
    },
  },
});
