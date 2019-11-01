import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 路由懒加载
const getComponent = (name) => () => import(`@/views/${name}.vue`)

// 双11
const mainRouter = [
  { path: '/', redirect: '/home' },
  { path: '/home', name: 'home', meta: { title: '首页', bg: '#f4f5f5' }, component: getComponent('home') }
]

// 测试路由
const testRouter = [
  { path: '/test', redirect: '/test/test' },
  { path: '/test/test', name: 'test', meta: { title: 'test', bg: '#39b5a0' }, component: getComponent('test/test') },
  { path: '/test/pixi', name: 'pixi', meta: { title: 'pixi测试', bg: '#39b5a0' }, component: getComponent('test/pixi') },
  { path: '/test/comp', name: 'comp', meta: { title: 'comp', bg: '#39b5a0' }, component: getComponent('test/comp') },
  { path: '/test/wa', name: 'wa', meta: { title: 'web animation接口测试', bg: '#39b5a0' }, component: getComponent('test/wa') },
  { path: '/test/css3', name: 'css3', meta: { title: 'css3', bg: '#39b5a0' }, component: getComponent('test/css3') },
  { path: '/test/create', name: 'create', meta: { title: 'createjs测试', bg: '#39b5a0' }, component: getComponent('test/create') },
  { path: '/test/vant', name: 'vant', meta: { title: 'vant测试', bg: '#39b5a0' }, component: getComponent('test/vant') },
  { path: '/test/wx', name: 'wx', meta: { title: '微信api测试', bg: '#39b5a0' }, component: getComponent('test/wx') }
]

// 动画路由测试
const gameTestRouter = [
  { path: '/game/clawBaby', name: 'clawBaby', meta: { title: '抓娃娃', bg: '#39b5a0' }, component: getComponent('game/clawBaby') },
  { path: '/game/crushGoldenEggs', name: 'crushGoldenEggs', meta: { title: '砸金蛋', bg: '#39b5a0' }, component: getComponent('game/crushGoldenEggs') },
  { path: '/game/scratchCard', name: 'scratchCard', meta: { title: '刮刮乐', bg: '#39b5a0' }, component: getComponent('game/scratchCard') }
]

const baseRouter = [
  { path: '/', redirect: '/index' },
  { path: '/401', name: '401', meta: { title: 'NoAuth', bg: '#fff' }, component: getComponent('error/401') }, // 没有权限跳到401
  { path: '*', name: '404', meta: { title: 'NoFound', bg: '#fff' }, component: getComponent('error/404') } // 未匹配到的路由跳到404
]

const router = new Router({
  // mode: 'hash',
  mode: 'history', // 后端支持可开
  base: process.env.BASE_URL,
  routes: [
    ...mainRouter,
    ...testRouter,
    ...gameTestRouter,
    ...baseRouter
  ],
  // scrollBehavior只在history和hash模式都有效 
  // 注意: 这个功能只在支持 history.pushState 的浏览器中可用。
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) { // 如果savedPosition存在，滚动条会自动跳到记录的值的地方
      return savedPosition
    } else {
      return { x: 0, y: 0 } // savedPosition也是一个记录x轴和y轴位置的对象
    }
  }
})

// 路由跳转前
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
// 路由跳转后
router.afterEach(() => { })

export default router
