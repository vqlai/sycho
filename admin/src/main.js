import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import '@/assets/css/element-variables.scss'
// import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n 英文语言包

import '@/assets/css/index.scss' // global css

import App from './App.vue'
import router from './router'
import store from './store'

import config from '@/assets/js/config.js'

import SvgIcon from '@/components/SvgIcon' // svg组件
Vue.component('svg-icon', SvgIcon) // register globally

// 注册全局函数和全局常量,在vue页面之间用this即可访问
Vue.prototype.reUrl = config.reUrl

// Vue.use(ElementUI, { locale }) // 英文版
// 中文版
Vue.use(ElementUI, {
  size: localStorage.getItem('size') || 'medium' // set element-ui default size
})

// import * as filters from './filters' // global filters
// register global utility filters
// Object.keys(filters).forEach(key => {
//   Vue.filter(key, filters[key])
// })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
