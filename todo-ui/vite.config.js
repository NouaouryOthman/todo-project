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
    origin: import.meta.env.VITE_UI_BASE_URL,
    allowedHosts: true,
    cors: true,
  },
});
