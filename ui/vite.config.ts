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
    //proxy: setupProxy(),
  }
});

// function setupProxy() {
//   const useProxy = import.meta.env.VITE_USE_PROXY === 'true';

//   if (useProxy) {
//     return {
//       '/api': {
//         target: 'http://localhost:3000',
//         changeOrigin: true,
//         rewrite: (path: string) => path.replace(/^\/api/, '')
//       }
//     };
//   }
//   return {};
// }