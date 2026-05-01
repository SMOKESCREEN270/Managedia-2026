import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: ".",
  publicDir: "public",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index:  resolve(import.meta.dirname, "index.html"),
        events: resolve(import.meta.dirname, "events.html"),
        event:  resolve(import.meta.dirname, "event.html"),
      },
    },
  },
  server: {
    host: true,
  },
});
