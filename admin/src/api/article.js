import request from '@/api/request'

// 传参方式: post方式用 data: {...data} ，get方式用 params: {...params}
// 增删改查 post delete put get

// 根据id获取指定文章
export async function getArticleById(params) {
  return await request({
    url: `/article/${params._id}`,
    method: 'get',
    params: { ...params }
  })
}

// 获取文章列表
export async function getArticle(params) {
  // console.log(params)
  return await request({
    url: '/article',
    method: 'get',
    params: { ...params }
  })
}

// 新增文章
export async function postArticle(data) {
  return await request({
    url: '/article',
    method: 'post',
    data: { ...data }
  })
}

// 修改文章状态
export async function patchArticle(data) {
  return await request({
    url: `/article/${data._id}`,
    method: 'patch',
    data: { ...data }
  })
}

// 修改文章
export async function putArticle(data) {
  return await request({
    url: `/article/${data._id}`,
    method: 'put',
    data: { ...data }
  })
}

// 删除文章(注：delete方法只能再url上拼参数，无法将参数放在请求body里)
export async function deleteArticle(data) {
  return await request({
    url: `/article/${data}`,
    method: 'delete',
  })
}

// 批量上传文章图片
// 注意上传文件不能用...运算符,要设置文件类型头部
export async function uploadArticlePics(data) {
  return await request({
    headers: { 'Content-Type': 'multipart/form-data' },
    url: '/uploadArticlePics',
    method: 'post',
    data: data
  })
}

// 删除文章图片
export async function removeArticlePics(data) {
  return await request({
    url: `/removeArticlePics`,
    method: 'post',
    data: { ...data }
  })
}