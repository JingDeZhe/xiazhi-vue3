import { fileURLToPath, URL } from 'node:url'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Pages from 'vite-plugin-pages'
import cdn from 'vite-plugin-cdn-import'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/xiazhi-vue3/',
  server: { port: 5180 },
  plugins: [
    vue(),
    UnoCSS(),
    Pages({
      dirs: [{ dir: 'src/views', baseRoute: '', filePattern: '**/*.vue' }],
      exclude: ['**/components/*.vue'],
    }),
    AutoImport({
      imports: ['vue', 'vue-router'],
    }),
    cdn({
      modules: [
        'vue',
        'vue-router',
        {
          name: 'element-plus',
          var: 'ElementPlus',
          css: 'https://cdnjs.cloudflare.com/ajax/libs/element-plus/2.7.5/index.min.css',
          path: 'https://cdnjs.cloudflare.com/ajax/libs/element-plus/2.7.5/index.full.min.js',
        },
        {
          name: 'p5',
          var: 'p5',
          path: 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.4/p5.min.js',
        },
        {
          name: '@antv/g6',
          var: 'G6',
          path: 'https://cdnjs.cloudflare.com/ajax/libs/antv-g6/5.0.1/g6.min.js',
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('codemirror')) {
            return 'codemirror'
          }
          if (id.includes('tiptap')) {
            return 'tiptap'
          }
        },
      },
    },
  },
})
