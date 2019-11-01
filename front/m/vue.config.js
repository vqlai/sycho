const path = require('path')
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

function resolve (dir) { return path.join(__dirname, dir) }

const name = '赛柯' // page title
// const isProduction = process.env.NODE_ENV === 'production'
// const isDevelopment = process.env.NODE_ENV === 'development'

// cdn,稳定不常修改的文件进行cdn优化 （SPA打开）
const cdn = {
  // 开发环境
  dev: {
    css: [
      'https://cdn.bootcss.com/animate.css/3.7.2/animate.min.css',
      // 'https://cdn.jsdelivr.net/npm/vant@2.1.4/lib/index.css'
      // 'https://cdn.bootcss.com/video.js/7.6.5/alt/video-js-cdn.min.css'
      // 'https://unpkg.com/driver.js/dist/driver.min.css'
    ],
    js: [
      // 'https://cdn.jsdelivr.net/npm/vant@2.1.4/lib/vant.min.js', // 暂未找到合适cdn，直接npm
      // 'https://cdn.bootcss.com/vue/2.6.10/vue.min.js', // 直接npm
      // 'https://cdn.bootcss.com/vue-router/3.1.2/vue-router.min.js', // 直接npm
      'https://cdn.bootcss.com/axios/0.19.0/axios.min.js',
      // 'https://res.wx.qq.com/open/js/jweixin-1.4.0.js', 
      // 'https://cdn.bootcss.com/moment.js/2.24.0/moment.min.js',
      // 'https://cdn.bootcss.com/pixi.js/5.1.1/pixi.min.js',
      'https://cdn.bootcss.com/EaselJS/1.0.2/easeljs.min.js',
      'https://cdn.bootcss.com/PreloadJS/1.0.1/preloadjs.min.js',
      // 'https://cdn.bootcss.com/SoundJS/1.0.2/soundjs.min.js',
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
      'https://cdn.bootcss.com/animate.css/3.7.2/animate.min.css',
      // 'https://cdn.jsdelivr.net/npm/vant@2.1.4/lib/index.css'
      // 'https://cdn.bootcss.com/video.js/7.6.5/alt/video-js-cdn.min.css'
      // 'https://unpkg.com/driver.js/dist/driver.min.css'
    ],
    js: [
      // 'https://cdn.jsdelivr.net/npm/vant@2.1.4/lib/vant.min.js', // 直接npm
      // 'https://cdn.bootcss.com/vue/2.6.10/vue.min.js', // 直接npm
      // 'https://cdn.bootcss.com/vue-router/3.1.2/vue-router.min.js', // 直接npm
      'https://cdn.bootcss.com/axios/0.19.0/axios.min.js',
      // 'https://res.wx.qq.com/open/js/jweixin-1.4.0.js', 
      // 'https://cdn.bootcss.com/moment.js/2.24.0/moment.min.js',
      // 'https://cdn.bootcss.com/pixi.js/5.1.1/pixi.min.js',
      'https://cdn.bootcss.com/EaselJS/1.0.2/easeljs.min.js',
      'https://cdn.bootcss.com/PreloadJS/1.0.1/preloadjs.min.js',
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
  // publicPath: process.env.NODE_ENV === 'development' ? '/' : '', // 部署应用包时的基本 URL。
  publicPath: '/', // 注意：history模式时，这里必须设置/
  outputDir: 'dist', // 当运行 vue-cli-service build 时生成的生产环境构建文件的目录。
  assetsDir: 'assets', // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  // indexPath: 'index.html', // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  // filenameHashing: false, // 关闭资源文件添加hash值
  lintOnSave: process.env.NODE_ENV === 'development', // 是否开启编译时不符合eslint提示
  productionSourceMap: false, // 设置为true，打包文件含有map文件
  css: {
    extract: true, // js提取css代码到文件
    sourceMap: !process.env.NODE_ENV === 'development', // 开启 CSS source maps? 配置true让样式找到源
    loaderOptions: { // css预设器配置项
      scss: {
        prependData: `
              @import "@/assets/scss/normalize.scss";
              @import "@/assets/scss/common.scss";
            `
      }
    },
    // 这个要设置为true，如为false的vant样式按需加载引入不进行来
    requireModuleExtension: true // 启用 CSS modules for all css / pre-processor files
  },
  // 代理服务
  devServer: {
    // host: '0.0.0.0',
    port: 9529, // 修改默认端口
    https: false, // https:{type:Boolean}
    open: false, // 配置自动启动浏览器
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: { // 配置开发代理
      '/api': {
        target: 'https://admin.sycho.cn/', // 代理线上
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  // vue-cli内部webpack配置
  configureWebpack: {
    name: name,
    resolve: {
      // 配置目录别名
      alias: {
        '@': resolve('src'),
        'assets': resolve('src/assets'),
        'views': resolve('src/views')
      }
    },
    plugins: []
  },
  // webpack自定义配置
  chainWebpack: config => {
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
      // 'jwx': 'jWeixin',
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
