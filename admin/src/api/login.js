import request from '@/api/request'

// 登录
export async function login(data) {
  return await request({
    url: '/login',
    method: 'post',
    data: { ...data }
  })
}

// export function login (username, password) {
//   return request({
//     url: '/user/login',
//     method: 'post',
//     data: {
//       username,
//       password
//     }
//   })
// }

// 无需传token，直接header解析
export async function GetUserInfo () {
  return await request({
    url: '/getUserInfo',
    method: 'get',
    params: {}
  })
}

// 新增用户
// 注意上传文件不能用...运算符
export async function addUser(data) {
  return await request({
    headers: { 'Content-Type': 'multipart/form-data' },
    url: '/addAndUpload',
    method: 'post',
    data: data
  })
}

// 废弃 jwt无需服务端退出，前端清空存储的token即可
export function logout () {
  return request({
    url: '/logout',
    method: 'post'
  })
}
