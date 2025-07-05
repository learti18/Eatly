import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    // Manual chunks for better caching and loading performance
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          routing: ['react-router-dom'],
          ui: ['@tanstack/react-query', 'axios'],
          maps: ['mapbox-gl', 'react-map-gl'],
          forms: ['react-hook-form', '@hookform/resolvers', 'yup'],
          payments: ['@stripe/react-stripe-js', '@stripe/stripe-js'],
          firebase: ['firebase']
        }
      }
    }
  }
})
