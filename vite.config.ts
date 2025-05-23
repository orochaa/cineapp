/* eslint-disable import/no-default-export */
/* eslint-disable import/no-nodejs-modules */
import path from 'node:path'
import tailwind from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/**
 * https://vitejs.dev/config/
 */

export default defineConfig({
  plugins: [react(), tailwind()],
  build: {
    target: 'es2017',
    outDir: 'dist',
    minify: 'esbuild',
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
    },
  },
})
