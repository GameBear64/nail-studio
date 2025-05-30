import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@api': fileURLToPath(new URL('./src/api', import.meta.url)),
      '@tools': fileURLToPath(new URL('./src/toolbox', import.meta.url)),
      '@store': fileURLToPath(new URL('./src/toolbox/stores', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@partials': fileURLToPath(new URL('./src/partials', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: `http://localhost:3030/`,
        rewrite: (path) => path.replace(/^\/api/, ''),
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
