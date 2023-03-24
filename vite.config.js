import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import postcss from './postcss.config.cjs';

const SERVER = 'http://localhost:3000';

export default defineConfig({
  plugins: [
    react({
      include: '**/*.{jsx,tsx}',
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/components/_variables.scss";`,
        includePaths: ['node_modules'],
      },
    },
    postcss,
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
  },
  root: 'src/renderer',
  build: {
    outDir: '../dist',
    lib: {
      entry: path.resolve(__dirname, 'src/renderer/index.ts'),
    },
  },
  server: {
    host: '0.0.0.0',
    hmr: {
      clientPort: 4000,
    },
    port: 4000,
    watch: {
      usePolling: true,
    },
    proxy: {
      '/api': {
        target: SERVER,
        changeOrigin: true,
      },
    },
  },
});
