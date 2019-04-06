import request from '@/api/request'

// 传参方式: post方式用 data: {...data} ，get方式用 params: {...params}
// 获取链接列表
export function getLink(params) {
  return request({
    url: '/getLink',
    method: 'get',
    params: { ...params }
  })
}

// 新增链接
export async function addLink(data) {
  return await request({
    url: '/addLink',
    method: 'post',
    data: { ...data }
  })
}

// 修改链接
export async function editLink(data) {
  return await request({
    url: '/editLink',
    method: 'put',
    data: { ...data }
  })
}

// 删除链接
export async function deleteLink(data) {
  return await request({
    url: `/deleteLink/${data}`,
    method: 'delete',
  })
}