
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// IMPORTANT: If you deploy this to GitHub Pages, change the value below to your repo name.
const repoName = "project-showcase-github"; // <-- Updated to match your GitHub repo

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: `/${repoName}/`,  // <-- This enables deployment to GitHub Pages
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

