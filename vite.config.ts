import { defineConfig } from "vinxi";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  routers: [
    {
      name: "public",
      type: "static",
      dir: "./dist/client",
      base: "/",
    },
    {
      name: "api",
      type: "http",
      base: "/api",
      handler: "./src/routes/api/chat.ts", // Targets your custom chatbot API code path cleanly
    }
  ],
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
