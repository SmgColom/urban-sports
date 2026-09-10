/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    // Separa dependencias grandes en su propio chunk: mejor cacheo,
    // el navegador solo revalida el bundle de la app cuando cambia.
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          apollo: ['@apollo/client', 'graphql'],
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    css: false,
  },
});
