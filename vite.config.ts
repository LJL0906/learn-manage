/*
 * @Date: 2025-03-18 08:23:05
 * @LastEditors: e_liujianlong 2941140415@qq.com
 * @LastEditTime: 2025-03-18 08:46:04
 * @FilePath: \manage\vite.config.ts
 * @Description: Do not edit
 */
import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    })],
  resolve: {
    // 设置路径别名
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@views': resolve(__dirname, 'src/views'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@hooks': resolve(__dirname, 'src/hooks'),
    },
  },
  server: {
    open: true,
    port: 6900
  }
})
