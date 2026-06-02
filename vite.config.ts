import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackStartVite } from "@tanstack/react-start/vite";

export default defineConfig({
  plugins: [
    // This connects TanStack Start directly to Cloudflare without relying on Lovable sandbox variables
    tanstackStartVite(),
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
