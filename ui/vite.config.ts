import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "build",
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/_variables.scss";`,
        includePaths: ['node_modules'],
      },
    },
  },
  server: {
    host: "0.0.0.0",
    port: 4000,
    strictPort: true,
  }
});
