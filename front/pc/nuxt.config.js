// const pkg = require('./package')

module.exports = {
  mode: 'universal',
  
  // 自定义端口号
  server: {
    port: 9527, // default: 9000
    // host: '0.0.0.0' // default: localhost
  },

  /*
  ** Headers of the page
  */
  head: {
    // 获取到package.json的name值
    // title: pkg.name,
    title: '赛柯-sycho | 前端，分享，自由',
    titleTemplate: '%s | 赛柯-sycho | vqlai',
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'cleartype', content: 'on' },
      { 'http-equiv': 'x-dns-prefetch-control', content: 'on' },
      { name: 'author', content: 'vqlai，695850246@qq.com' },
      { name: 'MobileOptimized', content: '320' },
      { name: 'HandheldFriendly', content: 'True' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
      { name: 'apple-mobile-web-app-title', content: 'sycho.cn' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no,viewport-fit=cover' },
      { name: 'baidu-site-verification', content: 'PrDb8KaI82' }, // 百度站点配置
      { hid: 'keywords', name: 'keywords', content: '赛柯-syhco，vqlai，vue全家桶开发，小程序开发，前端工程师，javascript，js/es6技术，html5/pixijs，wepy' },
      { hid: 'description', name: 'description', content: '日子匆匆，独留欢欣，赛柯-syhco。' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#1890ff' },

  /*
  ** Global CSS
  */
  css: [
    // 切记导入antd样式
    'ant-design-vue/dist/antd.css',
    // 项目里要使用的 LESS 文件
    '@/assets/less/reset.less',
    '@/assets/less/common.less',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    // '~/plugins/axios',
    { src: '~plugins/axios', ssr: true },
    // 注册antd框架
    { src: '~/plugins/antd', ssr: true }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  */
  // axios: {
  //   // See https://github.com/nuxt-community/axios-module#options
  //   // prefix: '/api/v1/', // 设置接口前缀，没有前缀可以去掉。
  //   // baseURL: '', // baseURL和proxy不能一起使用，需用prefix替代
  //   proxy: true,
  //   // credentials: true
  // },

  /*
  ** 代理
  */
  // proxy: {
  //   '/api': {
  //     // target: 'https://app.sycho.cn', // 代理地址
  //     target: 'http://127.0.0.1:1008/', // 代理地址
  //     // target: '',
  //     // changeOrigin: true,
  //     pathRewrite: {
  //       '^/api': '', //将 /api 替换掉
  //     }
  //   }
  // },
  
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    vendor: ['axios', 'antd'], // 在页面中使用axios，配置vendor使其只打包一次
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
