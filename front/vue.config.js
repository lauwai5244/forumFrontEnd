const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,

  devServer: {
    proxy: {
      '/22911': {
        target: 'http://localhost:22911',
        pathRewrite: { '^/22911': '' },
        // ws:true,  // 用于支持websocket
        // changeOrigin: true // 用于控制请求头中的host值
      },
      '/8080': {
        target: 'http://localhost:8080',
        pathRewrite: { '^/8080': '' },
        // ws:true,  // 用于支持websocket
        // changeOrigin: true // 用于控制请求头中的host值
      },
      '/5001': {
        target: 'http://localhost:5001',
        pathRewrite: { '^/5001': '' },
        // ws:true,  // 用于支持websocket
        // changeOrigin: true // 用于控制请求头中的host值
      }
    }
  }
})



