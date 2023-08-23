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
        target: 'https://7a8602fd99a963f527086ad477fd06e2-app.1024paas.com',	//实际请求地址
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
