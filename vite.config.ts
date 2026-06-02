export default defineConfig({
  plugins: [
    // your plugins like TanStackRouterVite(), react()
  ],
  ssr: {
    noExternal: ['@tanstack/start', '@tanstack/start-server-core'],
  },
  optimizeDeps: {
    include: ['@tanstack/start', '@tanstack/start-server-core'],
  }
});
