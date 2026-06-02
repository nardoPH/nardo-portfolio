import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [
    tanstackRouterVite() as any,
    react(),
    tsconfigPaths()
  ],
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    chunkSizeWarningLimit: 3000,
    minify: "esbuild",
    cssMinify: true,
    target: "esnext"
  }
});
