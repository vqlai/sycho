import Vue from 'vue'
import Router from 'vue-router'

import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
// import { Message } from 'element-ui'
import { getToken } from '@/assets/js/auth' // getToken from localstroge
import getPageTitle from '@/assets/js/get-page-title'

/* Layout */
import Layout from '@/views/layout'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
* constantRoutes
* a base page that does not have permission requirements
* all roles can be accessed
*/
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    hidden: false, // 隐藏侧边栏item，默认值是false，不隐藏
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'Dashboard',
      meta: { title: 'Dashboard', icon: 'dashboard', affix: true },
    }]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/article',
    component: Layout,
    redirect: '/article/list',
    // alwaysShow: true, // will always show the root menu
    name: 'Article',
    meta: {
      title: 'Article',
      icon: 'article',
      roles: ['2', '3'] // you can set roles in root nav
    },
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/article/list'),
        meta: { title: 'List', icon: 'article-list' }
      }, {
        path: 'create',
        name: 'Create',
        component: () => import('@/views/article/create'),
        meta: { title: 'Create', icon: 'article-edit' }
      }, {
        // path: 'edit/:id(\\d+)',
        path: 'edit/:id',
        name: 'Edit',
        component: () => import('@/views/article/edit'),
        meta: { title: 'Edit', icon: 'article-edit', noCache: true, activeMenu: '/article/list' },
        hidden: true,
      }
    ]
  },

  {
    path: '/message',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Message',
        component: () => import('@/views/message/index'),
        meta: { title: 'Message', icon: 'message', roles: ['2', '3'] }
      }
    ]
  },

  {
    path: '/link',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Link',
        component: () => import('@/views/link/index'),
        meta: { title: 'Link', icon: 'link', roles: ['2', '3'] }
      }
    ]
  },

  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'User',
        component: () => import('@/views/user/index'),
        meta: { title: 'User', icon: 'user', roles: ['3'] }
      }
    ]
  },

  {
    path: '/comment',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Comment',
        component: () => import('@/views/comment/index'),
        meta: { title: 'Comment', icon: 'message' },
        roles: ['2', '3']
      }
    ]
  },

  {
    path: '/tag',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Tag',
        component: () => import('@/views/tag/index'),
        meta: { title: 'Tag', icon: 'tag' },
        roles: ['2', '3']
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://www.sycho.cn',
        meta: { title: 'sycho', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!! 必须放在最后
  { path: '*', redirect: '/404', hidden: true }
]

// const router = new Router({
//   // mode: 'history', // 后端支持可开
//   scrollBehavior: () => ({ y: 0 }),
//   routes: [
//     ...constantRoutes,
//     // ...asyncRoutes,
//     // ...testRouters // 测试路由
//   ]
// })

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

NProgress.configure({ showSpinner: false }) // NProgress configuration

const whiteList = ['/login', '/auth-redirect'] // 不重定向白名单

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  if (getToken()) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger afterEach hook, so manually handle it
    } else {
      // 路由跳转前判断用户角色是否为空拉取用户信息
      // vuex一刷新数据就被清空，这里每次刷新页面就会调用后台接口
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      }else{
        try {
          // get user info
          // note: roles must be a object array!
          const { data } = await store.dispatch('user/getUserInfo')
          // debugger

          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/generateRoutes', data.role.split(',').map(item => Number(item)))
          // dynamically add accessible routes
          router.addRoutes(accessRoutes)
          // debugger

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (err) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          // Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token */
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})

export default router
