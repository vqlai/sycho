/**
 * @file ant-design-vue 
 * @module plugins/ant-design-vue
 * @author vqlai
 */

import Vue from 'vue'

// 全部引入
// import AntDesignVue from 'ant-design-vue'
// Vue.use(AntDesignVue)

// 按需引入
import Button from 'ant-design-vue/lib/button'
import Menu from 'ant-design-vue/lib/menu'
import Icon from 'ant-design-vue/lib/icon'
import List from 'ant-design-vue/lib/list'
import Avatar from 'ant-design-vue/lib/avatar'

Vue.use(Button)
Vue.use(Menu)
Vue.use(Icon)
Vue.use(List)
Vue.use(Avatar)