const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = {
  outputDir: path.resolve(__dirname, '../backend/public'),
  devServer: {
    proxy: {
      '/api/v1': {
        target: 'http://localhost:4000/api/v1'
      }
    }
  },
  transpileDependencies: true,
}
