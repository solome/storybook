import { resolve } from 'path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from "vite-plugin-singlefile"


// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile()],
  build: {
    emptyOutDir: false,
    rollupOptions: {
      input: {
        // 'calendar-heatmap': resolve(__dirname, 'calendar-heatmap.html'),
        'file-tree': resolve(__dirname, 'file-tree.html'),
      },
      output: {
        dir: 'demo',
        // inlineDynamicImports: false,
      },
    },
  },
  resolve: {
    alias: {
      '@shared-utils': resolve(__dirname, 'stories/shared-utils'),
    }
  }
})