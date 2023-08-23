import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: 8080,

    proxy: {
      '/api': {
        target: 'https://5cbd5423ea908a75850bfb7d9e92d2a4-app.1024paas.com',	//实际请求地址
        changeOrigin: true,
      }
    }
  },
  resolve: {
    alias: {
      // 关键代码
      '@': path.resolve(__dirname, './src')
    },
    extensions: [".ts", ".vue", ".js", ".jsx", ".jsx"]
  }
})
