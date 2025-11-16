import react from "@vitejs/plugin-react";
import tailwind from "tailwindcss";
import { defineConfig } from "vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react-router")) return "vendor-router";
            if (id.includes("react-helmet-async")) return "vendor-helmet";
            if (id.includes("lucide-react")) return "vendor-icons";
            if (id.includes("@sanity")) return "vendor-sanity";
            return "vendor";
          }
        },
      },
    },
  },
  css: {
    postcss: {
      plugins: [tailwind()],
    },
  },
});
