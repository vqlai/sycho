const pkg = require('./package')

module.exports = {
  mode: 'universal',
  
  // 自定义端口号
  server: {
    port: 9000, // default: 9000
    host: '0.0.0.0' // default: localhost
  },

  /*
  ** Headers of the page
  */
  head: {
    // 获取到package.json的name值
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#0088f5' },

  /*
  ** Global CSS
  */
  css: [
    // 项目里要使用的 LESS 文件
    '@/assets/less/reset.less',
    // 切记导入antd样式
    'ant-design-vue/dist/antd.css', 
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
