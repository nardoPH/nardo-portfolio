import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackViteConfig } from "@lovable.dev/vite-tanstack-config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tsconfigPaths(),
    ...tanstackViteConfig()
  ],
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    // This stops the compiler from stalling on massive images
    chunkSizeWarningLimit: 2000,
    minify: "esbuild",
    cssMinify: true,
    // Ensures server and client targets don't freeze the Cloudflare environment
    target: "esnext",
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
}));
