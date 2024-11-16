import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './', // Обов'язково використовуйте цей шлях для Electron
  plugins: [react()],
  build: {
    outDir: 'dist', // Переконайтесь, що це папка, яку використовує Electron
  },
});
