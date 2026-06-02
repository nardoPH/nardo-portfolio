import { defineConfig } from "@tanstack/react-start/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  vite: {
    plugins: [
      tsconfigPaths()
    ],
    build: {
      chunkSizeWarningLimit: 3000,
      minify: "esbuild",
      cssMinify: true,
      target: "esnext"
    }
  }
});
