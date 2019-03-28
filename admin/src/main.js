import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n 英文语言包

import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/css/index.scss' // global css

/**
 * This project originally used easy-mock to simulate data,
 * but its official service is very unstable,
 * and you can build your own service if you need it.
 * So here I use Mock.js for local emulation,
 * it will intercept your request, so you won't see the request in the network.
 * If you remove `../mock` it will automatically request easy-mock data.
 */
// import '@/assets/mock' // simulation data

import SvgIcon from '@/components/SvgIcon' // svg组件
Vue.component('svg-icon', SvgIcon) // register globally

// Vue.use(ElementUI, { locale }) // 英文版
Vue.use(ElementUI) // 中文版

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
