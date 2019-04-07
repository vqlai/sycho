const Link = require('../model/link.js')
const { handleSuccess, handleError } = require('../utils/handle')

// 获取参数，get通过ctx.query;post通过ctx.request.body
class linkController {
  // 根据搜索条件获取链接列表
  static async getLinks(ctx){
    console.log(ctx.query)
    console.log(ctx.query.currentPage)
    let currentPage = parseInt(ctx.query.currentPage)
    let pageSize = parseInt(ctx.query.pageSize)
    let queryName = ctx.query.queryName
    let queryType = ctx.query.queryType
    if (currentPage <= 0) currentPage = 1
    let result = null, total = 0
    // 组合搜索内容
    const querys = {}
    // 名字查询
    if (queryName) {
      querys['$or'] = [
        { 'name': { $regex: queryName } } // 使用正则模糊搜索,可在数组添加多个条件
      ]
    }
    // 权限查询
    if (['1', '2', '3', '4'].includes(queryType)) {
      querys.type = parseInt(queryType)
    }
    result = await Link
      .find(querys) // 模糊搜索
      .sort({ 'createTime': -1 }) // 排序，-1为倒序
      .skip(pageSize * (currentPage - 1)) // 跳过数
      .limit(pageSize) // 限制每页显示数
      .exec() // 执行sql语句
      .catch(err => {
        ctx.throw(500, '服务器内部错误-getLink错误！')
      })
    // console.log(result)
    if(result.length){
      total = await Link // 获取分页总数
        // .count() // 5.2版本已废弃
        .countDocuments()
        .exec()
        .catch(err => {
          ctx.throw(500, '服务器内部错误-Link分页总数查询错误!')
        })
    }
    if (result) {
      handleSuccess({
        ctx, msg: '数据获取成功！',
        data: {
          pagination: {
            total,
            currentPage,
            pageSize
          },
          list: result
        }
      })
    } else {
      handleError({ ctx, msg: '数据获取失败！' })
    }
  }
  // 新增链接
  static async addLink(ctx) {
    // console.log(ctx.request.body)
    //es6对象解构赋值
    const { name, type, desc, url } = ctx.request.body //请求参数放在请求体
    if (!name) {
      handleError({ ctx, msg: '链接名不能为空！' })
      return false
    }
    if (!type) {
      handleError({ ctx, msg: '链接类型不能为空！' })
      return false
    }
    if (!url) {
      handleError({ ctx, msg: '链接地址不能为空！' })
      return false
    }
    let oneLink = await Link
      .findOne({ 'name': name })
      .exec() // 执行sql语句
      .catch(err => {
        ctx.throw(500, '服务器内部错误-findOneLink错误！')
      })
    // console.log(oneLink)
    if (oneLink === null) {
      const link = new Link({
        name,
        type,
        desc,
        url,
        createTime: new Date().getTime()
      })
      let result = await link.save().catch((err) => {
        ctx.throw(500, '服务器内部错误-addLink错误！')
      })
      handleSuccess({
        ctx, msg: '新增链接成功！',
        data: result
      })
    } else {
      handleError({ ctx, msg: '链接名已存在！' })
    }
  }

  // 删除链接
  static async deleteLink(ctx) {
    const id = ctx.params.id
    if (!id) {
      handleError({ ctx, msg: '参数无效，删除失败！' })
      return false
    }
    const result = await Link
      .findByIdAndRemove(id)
      .catch(err => {
        ctx.throw(500, '服务器内部错误-deleteLink错误！')
      })
    if (result) handleSuccess({ ctx, msg: '删除成功！', data: result })
    else handleError({ ctx, msg: '删除失败！' })
  }

  // 修改链接
  static async editLink(ctx){
    // console.log(ctx.request.body)
    //es6对象解构赋值
    const { id, name, type, desc, url } = ctx.request.body //请求参数放在请求体
    if (!name) {
      handleError({ ctx, msg: '链接名不能为空！' })
      return false
    }
    if (!type) {
      handleError({ ctx, msg: '链接类型不能为空！' })
      return false
    }
    if (!url) {
      handleError({ ctx, msg: '链接地址不能为空！' })
      return false
    }
    let result = null
    if(id){
      result = await Link.findByIdAndUpdate(id, {
        name,
        type,
        desc,
        url
      }, { new: true })
        .exec() // 执行查询，并将查询结果传入回调函数,可以传人一个函数，会返回成为一个完整的 promise 对象
        .catch((err) => {
          ctx.throw(500, '服务器内部错误-findByIdAndUpdate错误!')
        })
      if(result){
        handleSuccess({
          ctx, msg: '修改成功！',
          data: result
        })
      }
    }
  }
}

// 注意区分es6与commonJS导入导出模块的写法
module.exports = linkController