import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.js",
  },
  server: {
    port: 3000,
    host: true,
    origin: "http://localhost:3000",
    allowedHosts: true,
    cors: true,
    proxy: {
      "/api": {
        target: import.meta.env.VITE_API_BASE_URL,
        changeOrigin: true,
      },
    },
  },
});
