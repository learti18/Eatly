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
    // Optimize for production
    minify: 'terser',
    sourcemap: process.env.NODE_ENV === 'development',
    rollupOptions: {
      output: {
        // Manual chunks for better caching and loading performance
        manualChunks: {
          vendor: ['react', 'react-dom'],
          routing: ['react-router-dom'],
          ui: ['@tanstack/react-query', 'axios', 'sonner'],
          maps: ['mapbox-gl', 'react-map-gl'],
          forms: ['react-hook-form', '@hookform/resolvers', 'yup'],
          payments: ['@stripe/react-stripe-js', '@stripe/stripe-js', '@stripe/connect-js', '@stripe/react-connect-js'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/database'],
          editor: ['react-quill'],
          motion: ['framer-motion'],
          icons: ['lucide-react']
        }
      }
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Optimize dependencies
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    }
  },
  // Define environment variables
  define: {
    __DEV__: process.env.NODE_ENV === 'development',
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
      'axios',
      'firebase/app',
      'firebase/auth',
      'firebase/database',
      'mapbox-gl',
      'react-map-gl'
    ],
    exclude: ['firebase']
  }
})
