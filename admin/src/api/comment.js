import request from '@/api/request'

// 根据id获取指定wenz
export function getCommentById(params) {
  return request({
    url: '/getCommentById',
    method: 'get',
    params: { ...params }
  })
}

// 获取文章列表
export function getComment(params) {
  console.log(params)
  return request({
    url: '/comment',
    method: 'get',
    params: { ...params }
  })
}

// 新增文章
export async function postComment(data) {
  return await request({
    url: '/comment',
    method: 'post',
    data: { ...data }
  })
}

// 修改文章
export async function putComment(data) {
  return await request({
    url: `/comment/${data._id}`,
    method: 'put',
    data: { ...data }
  })
}

// 删除文章(注：delete方法只能再url上拼参数，无法将参数放在请求body里)
export async function deleteComment(data) {
  return await request({
    url: `/deleteComment/${data}`,
    method: 'delete',
  })
}
