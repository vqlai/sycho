import request from '@/api/request'

// 根据id获取指定wenz
export function getMessageById(params) {
  return request({
    url: '/getMessageById',
    method: 'get',
    params: { ...params }
  })
}

// 获取文章列表
export function getMessages(params) {
  console.log(params)
  return request({
    url: '/getMessages',
    method: 'get',
    params: { ...params }
  })
}

// 新增文章
export async function addMessage(data) {
  return await request({
    url: '/addMessage',
    method: 'post',
    data: { ...data }
  })
}

// 修改文章
export async function editMessage(data) {
  return await request({
    url: '/editMessage',
    method: 'put',
    data: { ...data }
  })
}

// 删除文章(注：delete方法只能再url上拼参数，无法将参数放在请求body里)
export async function deleteMessage(data) {
  return await request({
    url: `/deleteMessage/${data}`,
    method: 'delete',
  })
}
