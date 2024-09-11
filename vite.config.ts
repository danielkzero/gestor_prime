import vue from '@vitejs/plugin-vue';

import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  plugins: [
    vue({}),
  ],
  define: { 'process.env': {
    VITE_APP_ENV: JSON.stringify(isProduction ? 'production' : 'development')
  } },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [
      '.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue',
    ],
  },
  server: {
    port: 3000,
    cors: true,
    proxy: {
      '/api': {
        target: 'http://192.168.102.9/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/comandos': {
        target: 'http://192.168.102.9/comandos',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/comandos/, ''),
      },
    },
  },
  base: './',
  build: {
    base: './',
    assetsDir: 'assets',
  },
})
