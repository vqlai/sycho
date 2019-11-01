import req from './request.js'

export async function getInitData (params) {
  return await req({
    url: '/mall/runway/initialization.ihtml',
    method: 'get',
    params: { ...params }
  })
}