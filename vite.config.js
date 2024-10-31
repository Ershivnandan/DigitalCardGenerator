import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/firebase-endpoint': {
        target: 'https://diwalicardgenerator-default-rtdb.firebaseio.com/',
        changeOrigin: true,
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
            proxyReq.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
          });
        }
      }
    }
  }
})
