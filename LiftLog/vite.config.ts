import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Change this to your actual GitHub repo name
const repoName = "YOUR-REPO-NAME";

export default defineConfig({
  plugins: [
    react(),
    // Only include the runtime error overlay in development
    ...(process.env.NODE_ENV !== "production" ? [] : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"),
  base: `/${repoName}/`, // Required for GitHub Pages
  build: {
    outDir: path.resolve(__dirname, "dist"), // Simpler output for Actions
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});

