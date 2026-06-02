import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import lovableConfigPkg from "@lovable.dev/vite-tanstack-config";

// Force load the proper full-stack compiler wrapper safely
const tanstackViteConfig = (lovableConfigPkg as any).tanstackViteConfig || lovableConfigPkg;

const baseConfig = typeof tanstackViteConfig === "function" ? tanstackViteConfig() : [];

export default defineConfig({
  plugins: [
    ...baseConfig
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
