import req from './request.js'

// 通用的api集合
export async function getWxConfig (params) {
  return await req({
    url: '/mall/runway/initialization.ihtml',
    method: 'get',
    params: { ...params }
  })
}