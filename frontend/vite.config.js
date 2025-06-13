import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

export default defineConfig({
  
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  

  plugins: [react()],
  

  server: {
    proxy: {
      '/api': {
        target: 'https://ai-content-generator-server-z1e2.onrender.com',
        changeOrigin: true,
      },
    },
  },
})