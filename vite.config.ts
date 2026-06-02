import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import lovableConfigPkg from "@lovable.dev/vite-tanstack-config";

// Safely extract the custom TanStack router bundle hook from the CommonJS package wrapper
const tanstackViteConfig = (lovableConfigPkg as any).tanstackViteConfig || lovableConfigPkg;

export default defineConfig(({ mode }) => ({
  plugins: [
    // This spreads the default TanStack Start compilation pipelines
    ...(typeof tanstackViteConfig === "function" ? tanstackViteConfig() : [react(), tsconfigPaths()]),
  ],
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    chunkSizeWarningLimit: 2000,
    minify: "esbuild",
    cssMinify: true,
    target: "esnext"
  }
}));
