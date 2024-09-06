import { defineConfig } from 'vite'

export default defineConfig({
  base: '/vom_dash/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
})