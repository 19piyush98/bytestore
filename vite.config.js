import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/bytestore/", // ✅ Ensures correct asset paths
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true, // ✅ Required for AntD's LESS styles
      },
    },
  },
});
