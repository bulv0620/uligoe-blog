import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path"//引入
import viteCompression from 'vite-plugin-compression'


// https://vitejs.dev/config/
export default defineConfig({
  base: "/admin/",

  // 代理
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
      "/upload":  {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },

  //在plugins配置数组里添加gzip插件
  plugins: [vue(), viteCompression({
    verbose: true,
    disable: false,
    threshold: 10240,
    algorithm: 'gzip',
    ext: '.gz',
  })],


  // 配置 @ 符号
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")// 在src文件下的相对路径都可以写成 @ 符号
    }
  },

  build: {
    chunkSizeWarningLimit: 1024,
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  },

  terserOptions: {
    compress: {
      drop_console: true,
      drop_debugger: true,
    },
  },
})