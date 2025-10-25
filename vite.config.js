import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: 'web',
  server: {
    host: '0.0.0.0',
    port: 5000,
    strictPort: true
  },
  resolve: {
    alias: {
      '@': '/src',
      '@assets': '/public/assets'
    }
  }
})
