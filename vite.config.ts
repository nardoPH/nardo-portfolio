import { defineConfig } from 'vite';
import lovableConfigPkg from '@lovable.dev/vite-tanstack-config';

// Extract the configuration safely using the default package export
const lovableConfig = lovableConfigPkg.tanstackBuildConfig || lovableConfigPkg;

export default defineConfig({
  ...lovableConfig,
});
