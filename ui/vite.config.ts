import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import process from "process";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "build",
     rollupOptions: {
       external: ['xterm'],
    }
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
    proxy: setupProxy(),
  }
});

function setupProxy() {
  const useProxy = process.env.MODE === 'browser';

  if (useProxy) {
    return {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    };
  }
  return {};
}