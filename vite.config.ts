import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        index: resolve(import.meta.dirname, 'index.html'),
        about: resolve(import.meta.dirname, 'about.html'),
        terms: resolve(import.meta.dirname, 'terms.html'),
        privacy: resolve(import.meta.dirname, 'privacy.html'),
      },
    },
  },
});
