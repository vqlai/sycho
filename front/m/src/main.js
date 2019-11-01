import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { Loading, Toast, Lazyload, Field, Cell, CellGroup, Button, Popup, Row, Col, Icon, Image } from 'vant'
// import Vconsole from 'vconsole'
import Throttle from '@/components/throttle.js' // 防抖组件

// vConsole在IE9无法正常使用，会报错  vConsole无法在安卓webview使用，报错mSwiper
// Vue.prototype.$vConsole = new Vconsole()

Vue.component('Throttle', Throttle) // 全局注册组件

// 全局注册通用vant组件
Vue.use(Loading).use(Toast).use(Lazyload).use(Field).use(Cell).use(CellGroup).use(Button).use(Popup).use(Row).use(Col).use(Icon).use(Image)

// 设置false关闭生产模式的提示
Vue.config.productionTip = (process.env.NODE_ENV === 'development')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
