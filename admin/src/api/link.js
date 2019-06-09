import request from '@/api/request'

// 传参方式: post方式用 data: {...data} ，get方式用 params: {...params}
// 获取链接列表
export async function getLink(params) {
  return await request({
    url: '/link',
    method: 'get',
    params: { ...params }
  })
}

// 新增链接
export async function postLink(data) {
  return await request({
    url: '/link',
    method: 'post',
    data: { ...data }
  })
}

// 修改链接
export async function putLink(data) {
  return await request({
    url: `/link/${data._id}`,
    method: 'put',
    data: { ...data }
  })
}

// 删除链接
export async function deleteLink(data) {
  return await request({
    url: `/link/${data}`,
    method: 'delete',
  })
}