import { resolve } from 'path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from "vite-plugin-singlefile"


// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile()],
  build: {
    rollupOptions: {
      input: {
        // main: resolve(__dirname, 'elefanto-memory-trends.html'),
        // realsee: resolve(__dirname, 'index.html'),
        // prosemirror: resolve(__dirname, 'prose-mirror.html'),
        // 'calendar-heatmap': resolve(__dirname, 'calendar-heatmap.html'),
        main: resolve(__dirname, 'calendar-heatmap.html'),

      }
    }
  },
  resolve: {
    alias: {
      '@shared-utils': resolve(__dirname, 'stories/shared-utils'),
    }
  }
})