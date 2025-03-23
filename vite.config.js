import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // This is important!
  ],
  theme: {
    extend: {},
  },
  base: "/bytestore/",
  plugins: [react(), tailwindcss()],
})
