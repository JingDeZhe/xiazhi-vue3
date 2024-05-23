import { fileURLToPath, URL } from 'node:url'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Pages from 'vite-plugin-pages'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: { port: 5180 },
  plugins: [
    vue(),
    Pages({
      dirs: 'src/views',
      exclude: ['**/components/*.vue'],
    }),
    AutoImport({
      imports: ['vue', 'vue-router'],
    }),
    UnoCSS(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
