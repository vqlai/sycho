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
// import Button from 'ant-design-vue/lib/button'
// import Menu from 'ant-design-vue/lib/menu'
// import Icon from 'ant-design-vue/lib/icon'
// import List from 'ant-design-vue/lib/list'
// import Avatar from 'ant-design-vue/lib/avatar'
// import Carousel  from 'ant-design-vue/lib/carousel'
// import Message  from 'ant-design-vue/lib/message'
import { Button, Menu, Icon, List, Avatar, Carousel, message, Row, Col, Input } from 'ant-design-vue'

Vue.use(Button).use(Menu).use(Icon).use(List).use(Avatar).use(Carousel).use(Row).use(Col).use(Input)
Vue.prototype.$message = message