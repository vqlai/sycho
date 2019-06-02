import request from '@/api/request'

// 上传鉴权
export function getSts(params) {
  return request({
    url: '/sts',
    method: 'get',
    params: { ...params }
  })
}