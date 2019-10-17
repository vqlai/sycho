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
  }

  // 新增链接
  static async postLink(ctx) {
    //es6对象解构赋值
    const { name, type, typeText, desc, url, logo, color } = ctx.request.body //请求参数放在请求体
    const result = await new Link({ name, type, typeText, desc, url, logo, color })
      .save()
      .catch(err => {
        throw new CustomError(500, '服务器内部错误')
        return false
      })
    if (result) handleSuccess({ ctx, msg: '新增链接成功', data: result })
    else handleError({ ctx, msg: '新增链接失败' })
  }

  // 修改链接
  static async putLink(ctx) {
    const _id = ctx.params.id

    const { name, type, typeText, desc, url, logo } = ctx.request.body

    if (!_id) {
      throw new CustomError(500, '无效参数')
      return false
    }

    const result = await Link
      .findByIdAndUpdate(_id, { name, type, typeText, desc, url, logo }, { new: true }) // new: true ？？？
      .catch(err => {
        throw new CustomError(500, '服务器内部错误')
        return false
      })
    if (result) handleSuccess({ ctx, msg: '修改数据成功', data: result })
    else handleError({ ctx, msg: '修改数据失败' })
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
        // ctx.throw(500, '服务器内部错误-deleteLink错误！')
        throw new CustomError(500, '服务器内部错误')
        return false
      })
    if (result) handleSuccess({ ctx, msg: '删除成功', data: result })
    else handleError({ ctx, msg: '删除失败' })
  }
}

// 注意区分es6与commonJS导入导出模块的写法
module.exports = linkController