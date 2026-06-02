import { defineConfig } from "vite";
import { tanstackStartVite } from "@tanstack/start/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    // This connects TanStack Start directly to Cloudflare without relying on Lovable sandbox variables
    tanstackStartVite() as any,
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
