import { defineConfig } from 'vite'

export default defineConfig({
  base: '/vom_dash/',
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  // other configurations...
})