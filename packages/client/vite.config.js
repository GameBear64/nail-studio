import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@tools': fileURLToPath(new URL('./src/toolbox', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@views': fileURLToPath(new URL('./src/views', import.meta.url)),
      '@form': fileURLToPath(new URL('./src/components/Form', import.meta.url)),
      '@store': fileURLToPath(new URL('./src/stores', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        rewrite: path => path.replace(/^\/api/, ''),
        changeOrigin: true,
        secure: false,
      },
    },
  },
});