import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/bytestore/", // Ensure correct base path for GitHub Pages
  plugins: [react()], // Tailwind doesn't need to be here
});
