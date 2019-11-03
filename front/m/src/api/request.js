import axios from 'axios'
import { Toast } from 'vant'
const qs = require('qs')

// 创建axios实例
const Axios = axios.create({
  // v2线上代理全棉接口
  baseURL: process.env.NODE_ENV === 'development' ? '/api' : '/v2', // 开发使用代理,注意后台有没有基础路径
  // baseURL: '',
  timeout: 10000, // 请求超时时间
  responseType: 'json',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
  }
})

// const CancelToken = axios.CancelToken
// const requestMap = new Map()

// 请求拦截
Axios.interceptors.request.use(config => {
  // 防重复提交
  // const keyString = qs.stringify(Object.assign({}, { url: config.url, method: config.method }, config.data))
  // if (requestMap.get(keyString)) {
  //   // 如果请求已提交取消当前请求
  //   config.cancelToken = new CancelToken((cancel) => {
  //     cancel('Please slow down a little')
  //   })
  // }
  // requestMap.set(keyString, true)
  // Object.assign(config, { _keyString: keyString })

  // 存储token
  // if (window.sessionStorage.getItem('token')) {
  //   config.headers.Authorization = `Bearer ${window.sessionStorage.getItem('token')}`
  // }
  if (
    config.method === 'post' ||
     config.method === 'put' ||
     config.method === 'delete' ||
     config.method === 'patch'
  ) {
    config.data = qs.stringify(config.data)
  } else {
    // get方式如果要加loading，需在请求参数里加上isLoading=true
    if (config.params.isLoading) {
      // 请求成功打开loading提示
      Toast.loading({
        mask: false,
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        type: 'loading',
        className: 'toast-loading'
        // message: '加载中...'
      })
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 正常响应走response，抛出的异常走error
Axios.interceptors.response.use(res => {
  // 重置requestMap
  // const config = res.config
  // requestMap.set(config._keyString, false)

  Toast.clear() // 响应成功关闭loading提示
  return res
}, error => {
  if (error.response !== undefined) {
    switch (error.response.status) {
      case 400:
        Toast(error.response.data)
        break
      case 401:
        Toast('会话已失效，请重新登录! ')
        break
      case 402:
        Toast('登陆超时，请重新登录！')
        break
      case 403:
        Toast('响应异常，没有权限！')
        break
      // ...忽略
      default:
        Toast('响应异常，请稍后在试')
    }
    return Promise.resolve(error.response)
  }
  return Promise.reject(error)
})

/**
 * @description
 * 请求
 * @param url
 * @param data
 * @param method
 */
// const request = (url, data = {}, method = 'post') => {
//   return Axios({
//     method,
//     url,
//     data,
//     params: method.toUpperCase() === 'GET' && data
//   })
// }

// export { request }
export default Axios