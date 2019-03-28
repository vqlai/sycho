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

export function getInfo (token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout () {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
