import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from 'url'
export default defineConfig({
  optimizeDeps: false,
  plugins: [vue()],
  server: {
    port: 3000,
  },
  base: '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    chunkSizeWarningLimit: 160000,
  },
});

