import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Default root bude "./apps/tabs", ale můžeme ho přepsat přes NODE_APP
const appRoot = process.env.NODE_APP || "apps/tabs";

export default defineConfig({
  root: path.resolve(__dirname, appRoot),
  plugins: [react()],
  server: {
    port: 5173
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, `${appRoot}/src`)
    }
  },
  css: {
    postcss: path.resolve(__dirname, "postcss.config.js")
  }
});
