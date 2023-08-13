import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [
        ElementPlusResolver({
          // 自动引入修改主题色添加这一行，使用预处理样式，不添加将会导致使用ElMessage，ElNotification等组件时默认的主题色会覆盖自定义的主题色
          importStyle: 'sass',
        }),
      ],
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          // 自动引入修改主题色添加这一行，使用预处理样式，不添加将会导致使用ElMessage，ElNotification等组件时默认的主题色会覆盖自定义的主题色
          importStyle: 'sass',
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 配置别名；将 @ 指向'src'目录
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 自定义的主题色
        additionalData: `@use "@/assets/element/index.scss" as *;`,
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173, // 设置服务启动的端口号；如果端口已经被使用，Vite 会自动尝试下一个可用的端口
    open: true, // 服务启动后自动打开浏览器
    proxy: {
      // 代理
      '/list': {
        // target: 'http://192.168.0.143:4100',
        target: 'http://124.222.44.34:4100',

        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/list/, ''),
      },
    },
  },
});
