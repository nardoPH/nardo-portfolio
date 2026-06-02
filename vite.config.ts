import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import lovableConfigPkg from "@lovable.dev/vite-tanstack-config";

// Force load the configuration object layout safely safely
const configFn = (lovableConfigPkg as any).default || lovableConfigPkg;

export default defineConfig((env) => {
  // If Lovable's compiler returns a config, use it. Otherwise, fall back safely.
  const baseConfig = typeof configFn === "function" ? configFn(env) : {};
  
  return {
    ...baseConfig,
    plugins: [
      ...(baseConfig.plugins || [react(), tsconfigPaths()]),
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
