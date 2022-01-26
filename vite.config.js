import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

import ElementPlus from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: ['express', 'vue-demi', '@vite/client', '@vite/env']
  },
  build: {
    outDir: 'docs',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        // assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
        assetFileNames: chunkInfo => {
          let woffOrTtfFile = /\.(woff|ttf)$/.test(chunkInfo.name)
          if (woffOrTtfFile) {
            return 'assets/css/[name]-[hash].[ext]'
          }
          return 'assets/[ext]/[name]-[hash].[ext]'
        }
      }
    }
  },

  base: './',
  // 解决 使用process is not defined 的问题 history:createWebHistory(process.env.BASE_URL),
  define: { 'process.env': {} },
  // 配置前端服务地址和端口
  // server: {
  //   host: '0.0.0.0',
  //   port: 3000,
  //   https: true,
  //   open: false
  // },
  resolve: {
    alias: [
      {
        // '~/': `${path.resolve(__dirname, 'src')}/`
        // 配置别名，在引入资源时，可以用“@/”直接访问
        find: '@',
        replacement: path.resolve(__dirname, 'src')
      }
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/element/index.scss" as *;`
        }
      }
    }
  },
  plugins: [
    vue(),
    ElementPlus({
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass'
        })
      ]
    })
  ]
})
