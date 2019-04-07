import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n 英文语言包

import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/css/index.scss' // global css

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
