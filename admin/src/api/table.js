import request from '@/assets/js/request'

export function getList (params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}
