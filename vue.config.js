const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 反向代理
  devServer: {
    proxy: {
      '/adminapi': {
        target: 'http://localhost:3333',
        // target: 'http://118.89.20.214:3333',
        changeOrigin: true
      }
    }
  }
})
