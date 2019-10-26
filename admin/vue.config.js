'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}
const name = defaultSettings.title || 'sychoAdmin' // page title
// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
const port = 9528 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
// 自定义webpack的配置，该文件会合并入最终的 webpack 配置
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  // publicPath: process.env.NODE_ENV !== 'production' ? '/' : '', // 部署打包时的基本 URL。
  publicPath: '/', // 部署打包时的基本 URL。
  outputDir: 'dist', // 当运行 vue-cli-service build 时生成的生产环境构建文件的目录。
  assetsDir: 'static',
  // assetsDir: 'assets', // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  // indexPath: 'index.html', // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  // filenameHashing: false, // 关闭资源文件添加hash值
  lintOnSave: process.env.NODE_ENV === 'development', // 是否开启eslint检查,只在开发环境开启
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  devServer: {
    port: port, // 修改默认端口
    https: false, // https:{type:Boolean}
    open: false, // 配置自动启动浏览器
    overlay: {
      warnings: false,
      errors: true
    },
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
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    // 启用 CSS modules for all css / pre-processor files.
    modules: false,
    // sass: {
    //   // data: '@import "style/_mixin.scss";@import "style/_variables.scss";' // 全局引入
    //   data: '@import "assets/css/index.scss";' // 全局引入
    // }
  },
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
  pluginOptions: {},
  chainWebpack(config) {}
}
