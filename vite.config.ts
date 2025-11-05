
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// IMPORTANT: Using custom domain, so base should be root
const repoName = "project-showcase-github-99193";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/',  // <-- Changed to root for custom domain
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

