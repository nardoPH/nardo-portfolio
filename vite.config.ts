{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "tanstack-start-app",
  "compatibility_date": "2025-09-24",
  "compatibility_flags": ["nodejs_compat"],
  "main": "src/server.ts",
  // Add this build block below 👇
  "build": {
    "command": "npm run build",
    "watch_dir": "src"
  }
}
