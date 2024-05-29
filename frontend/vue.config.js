const { defineConfig } = require('@vue/cli-service')
const { GenerateSW } = require("workbox-webpack-plugin");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [new GenerateSW({
      maximumFileSizeToCacheInBytes: 10 * 1024 * 1024
    })]
  }
})
