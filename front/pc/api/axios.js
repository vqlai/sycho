import qs from 'querystring';

import axios from 'axios';
// import * as config from '../config.js';

const ax = axios.create({
  // baseURL: config.API_ROOT
  baseURL: process.env.NODE_ENV === 'production' ? 'https://admin.sycho.cn/v1' : 'http://127.0.0.1:1008/api/v1'
});

// 拦截器
ax.interceptors.request.use(
  data => {
    if (data.method === 'post' || data.method === 'put' || data.method === 'delete' || data.method === 'patch') {
      data.data = qs.stringify(data.data);
    }
    return data;
  },
  error => {
    return Promise.reject(error);
  }
);

ax.interceptors.response.use(
  response => {
    // if (response && response.data.code !== 1) {
    //   if (window) window.alert('出错了：' + response.data.message);
    // }

    return response;
  },
  error => {
    console.log(error)
    if (!error.response) {
      // 请求超时状态
      if (error.message.includes('timeout')) {
        console.log('超时了');
        // window.alert('请求超时，请检查网络是否连接正常');
      } else {
        // 可以展示断网组件
        console.log('断网了');
        // window.alert('请求失败，请检查网络是否已连接');
      }
    }
    return Promise.reject(error);
  }
);

export default ax;
