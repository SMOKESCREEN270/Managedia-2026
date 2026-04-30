import { defineConfig } from "vite";
import path from "path";

const root = path.resolve(import.meta.dirname);

const rawPort = process.env.PORT;
const port = rawPort ? Number(rawPort) : 5173;
if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH || "/";

export default defineConfig({
  base: basePath,
  root,
  build: {
    outDir: path.resolve(root, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: path.resolve(root, "index.html"),
        events: path.resolve(root, "events.html"),
        event: path.resolve(root, "event.html"),
        campusReps: path.resolve(root, "campus-reps.html"),
        sponsors: path.resolve(root, "sponsors.html"),
      },
    },
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
  },
  preview: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
