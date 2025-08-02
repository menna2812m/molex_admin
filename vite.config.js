import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "url";

export default defineConfig({
  optimizeDeps: false,
  plugins: [vue()],
  server: {
    port: 3000,
  },
  base: process.env.NODE_ENV === "production" ? "/" : "/",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    chunkSizeWarningLimit: 160000,
    outDir: "dist",
    assetsDir: "assets",
    esbuild: false,
    // Additional optimizations for production
    minify: "false",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["vue"],
        },
      },
    },
  },
  // Production-specific settings
  define: {
    __VUE_PROD_DEVTOOLS__: false,
  },
});
