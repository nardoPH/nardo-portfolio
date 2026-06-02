import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
// Import via default export to safely handle CommonJS modules outside Lovable's environment
import lovableConfigPkg from "@lovable.dev/vite-tanstack-config";

const tanstackViteConfig = (lovableConfigPkg as any).tanstackViteConfig || lovableConfigPkg;

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tsconfigPaths(),
    ...(typeof tanstackViteConfig === "function" ? tanstackViteConfig() : [])
  ],
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    chunkSizeWarningLimit: 2000,
    minify: "esbuild",
    cssMinify: true,
    target: "esnext",
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
}));
