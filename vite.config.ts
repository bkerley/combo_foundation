import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  root: './src',
  base: process.env.NODE_ENV === 'production' ? '/combo_foundation/' : '/',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: './src/index.html'
    }
  },
  server: {
    port: 3000,
    open: true
  }
})