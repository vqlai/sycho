// （MPA打开）
// const glob = require('glob')
// // 配置pages多页面获取当前文件夹下的html和js
// function getEntry(url) {
//   let entrys = {}
//   glob.sync(url).forEach(item => {
//     // splice(-3)取数组后三项
//     let urlArr = item.split('/').splice(-3)
//     entrys[urlArr[1]] = {
//       entry: 'src/pages/' + urlArr[1] + '/' + 'index.js',
//       template: 'src/pages/' + urlArr[1] + '/' + 'index.html',
//       filename: urlArr[1] + '.html',
//       title: 'pages-' + urlArr[1]
//     }
//   })
//   return entrys
// }
// let pages = getEntry('./src/pages/**?/*.html')

// webpack 读取文件路径
const path = require('path')
function resolve (dir) { return path.join(__dirname, dir) }

 // gzip压缩插件
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// 压缩删除js冗余代码插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const name = '全棉时代' // page title
const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = process.env.NODE_ENV === 'development'

// cdn,稳定不常修改的文件进行cdn优化 （SPA打开）
const cdn = {
  // 开发环境
  dev: {
    css: [
      // 'https://cdn.bootcss.com/animate.css/3.7.2/animate.min.css',
      // 'https://cdn.jsdelivr.net/npm/vant@2.1.4/lib/index.css'
      // 'https://cdn.bootcss.com/video.js/7.6.5/alt/video-js-cdn.min.css'
      // 'https://unpkg.com/driver.js/dist/driver.min.css'
    ],
    js: [
      // 'https://cdn.jsdelivr.net/npm/vant@2.1.4/lib/vant.min.js', // 暂未找到合适cdn，直接npm
      // 'https://cdn.bootcss.com/vue/2.6.10/vue.min.js', // 直接npm
      // 'https://cdn.bootcss.com/vue-router/3.1.2/vue-router.min.js', // 直接npm
      // 'https://cdn.bootcss.com/axios/0.19.0/axios.min.js',
      'https://m.purcotton.com/wap/h5/lib/axios.min.js',
      // 'https://res.wx.qq.com/open/js/jweixin-1.4.0.js',
      'https://m.purcotton.com/wap/h5/lib/jweixin-1.4.0.js',
      // 'https://cdn.bootcss.com/moment.js/2.24.0/moment.min.js',
      // 'https://cdn.bootcss.com/pixi.js/5.1.1/pixi.min.js',
      // 'https://cdn.bootcss.com/EaselJS/1.0.2/easeljs.min.js',
      'https://m.purcotton.com/wap/h5/lib/easeljs.min.js',
      // 'https://cdn.bootcss.com/SoundJS/1.0.2/soundjs.min.js',
      // 'https://cdn.bootcss.com/PreloadJS/1.0.1/preloadjs.min.js',
      'https://m.purcotton.com/wap/h5/lib/preloadjs.min.js',
      // 'https://unpkg.com/driver.js/dist/driver.min.js'
      // 'https://cdn.bootcss.com/tween.js/r14/Tween.min.js' // 补间动画，缓动函数，测试后不怎么好用
      // 'https://cdn.bootcss.com/animejs/2.2.0/anime.min.js' // 补间动画
      // 'https://cdn.bootcss.com/phaser/3.19.0/phaser.min.js' // 替补，主用pixi
      // 'https://cdn.bootcss.com/html2canvas/0.5.0-beta4/html2canvas.min.js', // html页面通过canvas截屏
      // 'https://cdn.bootcss.com/video.js/7.6.5/alt/video.core.min.js' // video库
      // 'https://cdn.bootcss.com/d3/5.12.0/d3.min.js', // 图表数据可视化
      // 'https://cdn.bootcss.com/three.js/r83/three.min.js', // 3D动画引擎
      // 'https://cdn.bootcss.com/echarts/4.3.0-rc.2/echarts.min.js' // echarts
      // 'https://cdn.bootcss.com/clipboard.js/2.0.4/clipboard.min.js' // 剪贴板
      // 'https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenMax.min.js', // 该cdn不稳定，通过npm安装
      // 'https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TimelineMax.min.js'
    ]
  },
  // 生产环境
  build: {
    css: [
      // 'https://cdn.bootcss.com/animate.css/3.7.2/animate.min.css',
      // 'https://cdn.jsdelivr.net/npm/vant@2.1.4/lib/index.css'
      // 'https://cdn.bootcss.com/video.js/7.6.5/alt/video-js-cdn.min.css'
      // 'https://unpkg.com/driver.js/dist/driver.min.css'
    ],
    js: [
      // 'https://cdn.jsdelivr.net/npm/vant@2.1.4/lib/vant.min.js', // 直接npm
      // 'https://cdn.bootcss.com/vue/2.6.10/vue.min.js', // 直接npm
      // 'https://cdn.bootcss.com/vue-router/3.1.2/vue-router.min.js', // 直接npm
      // 'https://cdn.bootcss.com/axios/0.19.0/axios.min.js',
      'https://m.purcotton.com/wap/h5/lib/axios.min.js',
      // 'https://res.wx.qq.com/open/js/jweixin-1.4.0.js', 
      'https://m.purcotton.com/wap/h5/lib/jweixin-1.4.0.js',
      // 'https://cdn.bootcss.com/moment.js/2.24.0/moment.min.js',
      // 'https://cdn.bootcss.com/pixi.js/5.1.1/pixi.min.js',
      // 'https://cdn.bootcss.com/EaselJS/1.0.2/easeljs.min.js',
      'https://m.purcotton.com/wap/h5/lib/easeljs.min.js',
      // 'https://cdn.bootcss.com/PreloadJS/1.0.1/preloadjs.min.js',
      'https://m.purcotton.com/wap/h5/lib/preloadjs.min.js',
      // 'https://cdn.bootcss.com/SoundJS/1.0.2/soundjs.min.js',
      // 'https://unpkg.com/driver.js/dist/driver.min.js'
      // 'https://cdn.bootcss.com/tween.js/r14/Tween.min.js' // 补间动画，缓动函数，测试后没gsap好用
      // 'https://cdn.bootcss.com/animejs/2.2.0/anime.min.js' // 补间动画
      // 'https://cdn.bootcss.com/phaser/3.19.0/phaser.min.js' // 替补，主用pixi
      // 'https://cdn.bootcss.com/html2canvas/0.5.0-beta4/html2canvas.min.js', // html页面通过canvas截屏
      // 'https://cdn.bootcss.com/video.js/7.6.5/alt/video.core.min.js' // video库
      // 'https://cdn.bootcss.com/d3/5.12.0/d3.min.js'，// 图表数据可视化
      // 'https://cdn.bootcss.com/three.js/r83/three.min.js', // 3D动画引擎
      // 'https://cdn.bootcss.com/echarts/4.3.0-rc.2/echarts.min.js' // echarts
      // 'https://cdn.bootcss.com/clipboard.js/2.0.4/clipboard.min.js' // 剪贴板
      // 'https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenMax.min.js', // 该cdn不稳定，通过npm安装
      // 'https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TimelineMax.min.js'
    ]
  }
}

module.exports = {
  // pages, // 多页配置
  publicPath: isDevelopment ? '/' : '', // 部署应用包时的基本 URL。
  outputDir: 'dist', // 当运行 vue-cli-service build 时生成的生产环境构建文件的目录。
  assetsDir: 'assets', // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  // indexPath: 'index.html', // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  // filenameHashing: false, // 关闭资源文件添加hash值
  lintOnSave: isDevelopment, // 是否开启编译时不符合eslint提示
  productionSourceMap: false, // 打包时不生成.map文件
  css: {
    extract: true, // js提取css代码到文件
    sourceMap: isDevelopment, // 开启 CSS source maps? 配置true让样式找到源
    loaderOptions: { // css预设器配置项
      sass: {
        data: `
              @import "@/assets/scss/normalize.scss";
              @import "@/assets/scss/common.scss";
            `
      }
    },
    modules: false // 启用 CSS modules for all css / pre-processor files
  },
  // 代理服务
  devServer: {
    // host: '0.0.0.0',
    port: 9528, // 修改默认端口
    https: false, // https:{type:Boolean}
    open: false, // 配置自动启动浏览器
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: { // 配置开发代理
      '/api': {
        target: 'https://m.purcotton.com/', // 代理线上wap接口
        // target: 'https://app.purcotton.com/', // 代理线上app端接口
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  // vue-cli内部webpack配置
  // configureWebpack: {
  //   name: name,
  //   resolve: {
  //     // 配置目录别名
  //     alias: {
  //       '@': resolve('src'),
  //       'assets': resolve('src/assets'),
  //       'views': resolve('src/views'),
  //       'api': resolve('src/api'),
  //       'components': resolve('src/components')
  //     }
  //   },
  //   plugins: []
  // },
  // configureWebpack简单的配置方式,如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
  // 如果这个值是一个函数，则会接收被解析的配置作为参数。
  configureWebpack: config => {
    config.name = name
    // 配置目录别名
    config.resolve.alias = {
      '@': resolve('src'),
      'assets': resolve('src/assets'),
      'views': resolve('src/views'),
      'api': resolve('src/api'),
      'components': resolve('src/components')
    }
    if(isProduction) {
      // 为生产环境修改配置...
      // 上线压缩去除console等信息
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            warnings: false,
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ['console.log'] // 移除console
            }
          },
          sourceMap: false,
          parallel: true
        })
      )
      // 开启gzip压缩
      const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      )
    }else{
      // 为开发环境修改配置...
    }
  },
  // chainWebpack链式操作webpack自定义配置，允许对内部的 webpack 配置进行更细粒度的修改。
  chainWebpack: config => {
    // 设置目录别名alias
    // config.resolve.alias
    //   .set('@', 'src')
    //   .set('assets', 'src/assets')
    //   .set('views', '@/views')
    //   .set('api', '@/api')
    //   .set('components', '@/components')

    // 压缩代码
    config.optimization.minimize(true)
    // 分割代码 （若为多页配置，会导致页面不渲染）
    // config.optimization.splitChunks({
    //   chunks: 'all'
    // })
    // 用cdn方式引入（SPA打开）
    // 格式为 'aaa' : 'bbb', 其中，aaa表示要引入的资源的名字，bbb表示该模块提供给外部引用的名字，由对应的库自定。
    // externals只适用于ES Module的默认导入
    config.externals({
      // 'vue': 'Vue', // 直接npm
      // 'vue-router': 'VueRouter',
      // 'moment': 'moment',
      'axios': 'axios',
      'jwx': 'jWeixin',
      // 'px': 'PIXI',
      'create': 'createjs',
      // 'dv': 'Driver'
      // 'tw': 'TWEEN', // 测试后不怎么好用
      // 'phr': 'Phaser'
      // 'tm': 'TweenMax',
      // 'tml': 'TimelineMax'
      // 'vant': 'vant' // vant测试无效
    })
    /**
     * 添加CDN参数到htmlWebpackPlugin配置中， 详见public/index.html 修改 （SPA打开）
     */
    config.plugin('html').tap(args => {
      if (process.env.NODE_ENV === 'production') {
        args[0].cdn = cdn.build
      }
      if (process.env.NODE_ENV === 'development') {
        args[0].cdn = cdn.dev
      }
      return args
    })
  },
  pluginOptions: {}
}
