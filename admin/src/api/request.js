import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/assets/js/auth'

// 后台已支持(content-type为application/x-www-form-urlencoded(表单提交方式)和application/json(json提交))
// let qs = require('qs')

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.publicPath, // api 的 base_url
  baseURL: process.env.NODE_ENV === 'production' ? '/v1' : '/api/v1', // 开发使用代理,注意后台有没有基础路径(注意：api是给代理替换，v1是后台的基础路径)
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // 请求超时时间
  headers: {}
})

// request拦截器
service.interceptors.request.use(
  config => {
    // config.method === 'post' ||
    // config.method === 'put' ||
    // config.method === 'delete' ||
    // config.method === 'patch'
    // if (['post', 'put', 'delete', 'patch'].includes(config.method)){
    //   // 注意上传文件不能用qs
    //   config.data = config.headers['Content-Type'] === 'multipart/form-data' ? config.data : qs.stringify(config.data)
    // }
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers.Authorization = `Bearer ${getToken()}`
      config.headers['Authorization'] = `Bearer ${getToken()}`
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response.data

    // if the custom code is not 200, it is judged as an error.
    if (res.code !== 200) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 3 * 1000
      })

      // 处理自定义异常,400,401,token不合法、过期等
      if (res.code === 401){
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      //   // to re-login
      //   MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
      //     confirmButtonText: 'Re-Login',
      //     cancelButtonText: 'Cancel',
      //     type: 'warning'
      //   }).then(() => {
      //     store.dispatch('user/resetToken').then(() => {
      //       location.reload()
      //     })
      //   })
      // }

      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    // 处理服务器抛出的异常,未知的异常
    console.log('err' + error) // for debug
    // Message({ message: error, type: 'error', duration: 3 * 1000 })
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
