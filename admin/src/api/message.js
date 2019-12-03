import request from '@/api/request'

// 获取留言列表
export function getMessage(params) {
  return request({
    url: '/message',
    method: 'get',
    params: { ...params }
  })
}

// 新增留言
export async function postMessage(data) {
  return await request({
    url: '/message',
    method: 'post',
    data: { ...data }
  })
}

// 编辑留言状态
export async function patchMessage(data) {
  return await request({
    url: '/message',
    method: 'patch',
    data: { ...data }
  })
}

// 删除留言(注：delete方法只能再url上拼参数，无法将参数放在请求body里)
export async function deleteMessage(data) {
  return await request({
    url: `/message/${data}`,
    method: 'delete',
  })
}

// 根据id获取指定留言
// export function getMessageById(params) {
//   return request({
//     url: '/getMessageById',
//     method: 'get',
//     params: { ...params }
//   })
// }

// 修改留言
// export async function putMessage(data) {
//   return await request({
//     url: '/message',
//     method: 'put',
//     data: { ...data }
//   })
// }