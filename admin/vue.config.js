'use strict'
const path = require('path')
const pkg = require('./package.json')

function resolve(dir) {
  return path.join(__dirname, dir)
}
const name = pkg.name || 'sycho-admin' // page title
const port = 9527 // dev port

// 自定义webpack的配置，该文件会合并入最终的 webpack 配置
module.exports = {
  // publicPath: process.env.NODE_ENV !== 'production' ? '/' : '', // 部署打包时的基本 URL。
  publicPath: '/', // 部署打包时的基本 URL。
  outputDir: 'dist', // 当运行 vue-cli-service build 时生成的生产环境构建文件的目录。
  // assetsDir: 'assets', // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: 'static',
  // indexPath: 'index.html', // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  // filenameHashing: false, // 关闭资源文件添加hash值
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  lintOnSave: process.env.NODE_ENV === 'development', // 是否开启eslint检查,只在开发环境开启
  devServer: {
    port: port, // 修改默认端口
    https: false, // https:{type:Boolean}
    open: false, // 配置自动启动浏览器
    proxy: {
      // 配置开发代理
      '/api': {
        // target: 'http://localhost:3002/api/', // 代理本地接口接口
        target: 'http://127.0.0.1:1008/', // 代理本地接口接口
        // target: 'https://app.sycho.cn/api/', // 代理线上wap接口
        // target: 'https://m-test.purcotton.com/', // 代理测试wap接口
        // target: 'https://app.purcotton.com/',  // 代理线上app端接口
        // target: 'https://app-test.purcotton.com/', // 代理测试app接口
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  css: {},
  pluginOptions: {},
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {}
}
