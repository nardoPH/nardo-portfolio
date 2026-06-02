import { defineConfig } from 'vite';
import { tanstackBuildConfig } from '@lovable.dev/vite-tanstack-config';

export default defineConfig({
  ...tanstackBuildConfig,
  // This explicitly prevents Vite from searching for a missing index.html file
  build: {
    ...tanstackBuildConfig?.build,
    rollupOptions: {
      ...tanstackBuildConfig?.build?.rollupOptions,
    }
  }
});
