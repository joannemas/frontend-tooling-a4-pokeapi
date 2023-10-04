// vite.config.js
export default {
  root: 'src',
  build: {
    outDir: 'dist'
  },
  server: {
    port: 3000
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: "@import '@/styles/variables.scss';"
      }
    }
  }
}
