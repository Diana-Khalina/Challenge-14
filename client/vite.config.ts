import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3015,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3007',
        changeOrigin: true,
        secure: false,
      },
      '/auth': {
        target: 'http://localhost:3007',
        changeOrigin: true,
        secure: false
      },
    },
  },
});
