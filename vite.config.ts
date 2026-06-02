import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import lovableConfigPkg from "@lovable.dev/vite-tanstack-config";

// Dynamically handle Lovable's core bundle configuration rules cleanly
const lovableConfig = (lovableConfigPkg as any).default || lovableConfigPkg;

export default defineConfig((env) => {
  const baseConfig = typeof lovableConfig === "function" ? lovableConfig(env) : {};
  
  return {
    ...baseConfig,
    // This forces Vite to use TanStack's preset hooks if present, or fall back to standard React elements
    plugins: [
      ...(baseConfig.plugins || [react(), tsconfigPaths()])
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
  };
});
