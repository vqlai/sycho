/**
 * @file Axios 扩展服务 / ES module
 * @module plugins/axios
 * @author vqlai
 */

// import * as axios from 'axios'

// let options ={}
// // The server-side needs a full url to works
// // if (process.server) {
// //   options.baseURL = `https://app.sycho.com/`
// // }
// // options.baseURL = `https://${process.env.HOST || 'app.sycho.com/'}:${process.env.PORT || 3008}`

// export default axios.create(options)

export default function ({ $axios, redirect }) {
  // 基本配置
  $axios.defaults.timeout = 10000
  $axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

  // 请求回调
  $axios.onRequest(config => {
    console.log('request ' + config.url)
  })

  // 响应回调
  $axios.onResponse(res => {
    console.log('response ' + res)
    // this.$message.info('This is a normal message');
  })

  // 错误回调
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}