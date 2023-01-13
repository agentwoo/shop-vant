import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  server: {
    host: true, // 监听局域网和公网地址
    strictPort: false, // 端口占用则尝试下一个端口
    proxy: {
      '/api/': {
        target: 'http://127.0.0.1:3000',  // 代理目标
        changeOrigin: true,  // 将主机头的来源更改为目标 URL
        ws: true, // 代理 websocket
      },
    },
  },
})