// import { defineConfig } from 'vite'

// export default defineConfig({
//   base: './',
//   build: {
//     outDir: 'dist',
//   }
// })


// use this just for deployment
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/vom_dash/',  // Replace with your repo name
  build: {
    outDir: 'dist',
  }
})