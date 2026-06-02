import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    cloudflare() as any
  ],
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    chunkSizeWarningLimit: 3000,
    minify: "esbuild",
    cssMinify: true,
    target: "esnext",
    outDir: "dist"
  }
});
