/**
 * Created by laiweiqang on 2019/04/26
 */
// 链接控制器
const Link = require('../model/link.js')
const { handleSuccess, handleError } = require('../utils/handle')
const { CustomError, HttpError } = require('../utils/customError.js')

// 获取参数，get通过ctx.query;post通过ctx.request.body
class linkController {
  // 根据搜索条件获取链接列表
  static async getLink(ctx) {
    let { currentPage = 1, pageSize = 10, keyword = '', type = '' } = ctx.query
    // 过滤条件
    const options = {
      sort: { id: -1 }, // 按id倒序
      page: Number(currentPage), // 当前页
      limit: Number(pageSize) // 每页数
    }
    // 参数
    const querys = { name: new RegExp(keyword) }
    // 链接类型查询
    if (['1', '2', '3', '4'].includes(type)) { querys.type = Number(type) }
    // 查询
    const result = await Link
      .paginate(querys, options)
      .catch(err => {
        throw new CustomError(500, '服务器内部错误')
        return false
      })

    if (result) {
      handleSuccess({
        ctx, msg: '列表数据获取成功', data: {
          pagination: {
            currentPage: result.page, // 当前页
            pageSize: result.limit, // 分页大小 
            totalPage: result.pages, // 总页数
            total: result.total, // 总条数
          },
          list: result.docs
        }
      })
    } else {
      handleError({ ctx, msg: '获取列表数据失败' })
    }

    // console.log(ctx.query)
    // console.log(ctx.query.currentPage)
    // let currentPage = parseInt(ctx.query.currentPage)
    // let pageSize = parseInt(ctx.query.pageSize)
    // let queryName = ctx.query.queryName
    // let queryType = parseInt(ctx.query.queryType)
    // let result = null, total = 0
    // if (currentPage <= 0) currentPage = 1
    // // 组合搜索内容
    // const querys = {}
    // // 名字查询
    // if (queryName) {
    //   querys['$or'] = [
    //     { 'name': { $regex: queryName } } // 使用正则模糊搜索,可在数组添加多个条件
    //   ]
    // }
    // // 权限查询
    // // if (['1', '2', '3', '4'].includes(queryType)) {
    // //   querys.type = parseInt(queryType)
    // // }
    // if (queryType) { querys.type = queryType }
    // result = await Link
    //   .find(querys) // 模糊搜索
    //   .sort({ 'createTime': -1 }) // 排序，-1为倒序
    //   .skip(pageSize * (currentPage - 1)) // 跳过数
    //   .limit(pageSize) // 限制每页显示数
    //   .exec() // 执行sql语句
    //   .catch(err => {
    //     ctx.throw(500, '服务器内部错误-getLink错误！')
    //   })
    // // console.log(result)
    // if(result.length){
    //   total = await Link // 获取分页总数
    //     // .count() // 5.2版本已废弃
    //     .countDocuments()
    //     .exec()
    //     .catch(err => {
    //       ctx.throw(500, '服务器内部错误-Link分页总数查询错误!')
    //     })
    // }
    // if (result) {
    //   handleSuccess({
    //     ctx, msg: '数据获取成功！',
    //     data: {
    //       pagination: {
    //         total,
    //         currentPage,
    //         pageSize
    //       },
    //       list: result
    //     }
    //   })
    // } else {
    //   handleError({ ctx, msg: '数据获取失败！' })
    // }
  }

  // 新增链接
  static async postLink(ctx) {
    //es6对象解构赋值
    const { name, type, desc, url } = ctx.request.body //请求参数放在请求体
    const result = await new Link({ name, type, desc, url })
      .save()
      .catch(err => {
        throw new CustomError(500, '服务器内部错误')
        return false
      })
    if (result) handleSuccess({ ctx, msg: '新增链接成功', data: result })
    else handleError({ ctx, msg: '新增链接失败' })

    // if (!name) {
    //   throw new CustomError(500, '链接名不能为空！')
    //   return false
    // }
    // if (!type) {
    //   throw new CustomError(500, '链接类型不能为空！')
    //   return false
    // }
    // if (!url) {
    //   throw new CustomError(500, '链接地址不能为空！')
    //   return false
    // }
    // let oneLink = await Link
    //   .findOne({ 'name': name })
    //   .exec() // 执行sql语句
    //   .catch(err => {
    //     ctx.throw(500, '服务器内部错误-findOneLink错误！')
    //   })
    // // console.log(oneLink)
    // if (oneLink === null) {
    //   const link = new Link({
    //     name,
    //     type,
    //     desc,
    //     url,
    //     createTime: new Date().getTime()
    //   })
    //   let result = await link.save().catch((err) => {
    //     ctx.throw(500, '服务器内部错误-addLink错误！')
    //   })
    //   handleSuccess({
    //     ctx, msg: '新增链接成功！',
    //     data: result
    //   })
    // } else {
    //   handleError({ ctx, msg: '链接名已存在！' })
    // }
  }

  // 修改链接
  static async putLink(ctx) {
    const _id = ctx.params.id

    const { name, type, url, desc } = ctx.request.body

    if (!_id) {
      throw new CustomError(500, '无效参数')
      return false
    }

    const result = await Link
      .findByIdAndUpdate(_id, { name, type, url, desc }, { new: true }) // new: true ？？？
      .catch(err => {
        throw new CustomError(500, '服务器内部错误')
        return false
      })
    if (result) handleSuccess({ ctx, msg: '修改数据成功', data: result })
    else handleError({ ctx, msg: '修改数据失败' })

    // console.log(ctx.request.body)
    //es6对象解构赋值
    // const { id, name, type, desc, url } = ctx.request.body //请求参数放在请求体
    // if (!name) {
    //   handleError({ ctx, msg: '链接名不能为空！' })
    //   return false
    // }
    // if (!type) {
    //   handleError({ ctx, msg: '链接类型不能为空！' })
    //   return false
    // }
    // if (!url) {
    //   handleError({ ctx, msg: '链接地址不能为空！' })
    //   return false
    // }
    // let result = null
    // if (id) {
    //   result = await Link.findByIdAndUpdate(id, {
    //     name,
    //     type,
    //     desc,
    //     url
    //   }, { new: true })
    //     .exec() // 执行查询，并将查询结果传入回调函数,可以传人一个函数，会返回成为一个完整的 promise 对象
    //     .catch((err) => {
    //       ctx.throw(500, '服务器内部错误-findByIdAndUpdate错误!')
    //     })
    //   if (result) {
    //     handleSuccess({
    //       ctx, msg: '修改成功！',
    //       data: result
    //     })
    //   }
    // }
  }

  // 删除链接
  static async deleteLink(ctx) {
    const _id = ctx.params.id
    if (!_id) {
      throw new CustomError(500, '无效参数')
      return false
    }
    const result = await Link
      .findByIdAndRemove(_id)
      .catch(err => {
        ctx.throw(500, '服务器内部错误-deleteLink错误！')
      })
    if (result) handleSuccess({ ctx, msg: '删除成功', data: result })
    else handleError({ ctx, msg: '删除失败' })
  }
}

// 注意区分es6与commonJS导入导出模块的写法
module.exports = linkController