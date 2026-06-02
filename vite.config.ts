import { defineConfig } from "vite";
import lovableConfigPkg from "@lovable.dev/vite-tanstack-config";

// Directly extract and execute the exact core configuration bundler engine
const configFn = (lovableConfigPkg as any).default || lovableConfigPkg;

export default defineConfig((env) => {
  const baseConfig = typeof configFn === "function" ? configFn(env) : {};
  
  return {
    ...baseConfig,
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
