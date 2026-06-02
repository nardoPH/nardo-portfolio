import { defineConfig } from 'vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { cloudflare } from '@cloudflare/vite-plugin';
import tsconfigPaths from 'vite-tsconfig-paths';

// We explicitly declare the configuration object to bypass compilation resolution issues
const config = defineConfig({
  plugins: [
    tsconfigPaths(),
    TanStackRouterVite(),
    react(),
    cloudflare(),
  ],
});

export default config;
