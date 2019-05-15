/**
 * Created by laiweiqang on 2019/04/26
 */
// 留言控制器
const Message = require('../model/message.js')
const { handleSuccess, handleError } = require('../utils/handle')
const geoip = require('geoip-lite')
const { CustomError, HttpError } = require('../utils/customError.js')
// const constants = require('../utils/constants.js')

class messageController {
  // 获取留言列表
  static async getMessage(ctx) {
    let { currentPage = 1, pageSize = 10, keyword = '', state = '' } = ctx.query

    // 过滤条件
    const options = { 
      sort: { createDate: -1 }, // 按时间倒序
      page: Number(currentPage), // 当前页
      limit: Number(pageSize) // 每页数
    }

    // 查询参数
    const querys = { name: new RegExp(keyword) }

    // 审核状态查询
    if (['0', '1', '2'].includes(state)) { querys.state = Number(state) }

    // 前台请求， 重置状态
    // if (!authIsVerified(ctx.request)) { querys.state = 1 }

    // 查询
    const result = await Message
      .paginate(querys, options)
      .catch(err => {
        // ctx.throw(500, '服务器内部错误')
        throw new CustomError(500, '服务器内部错误')
        return false
      })
    // console.log(result)
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

  // 获取指定id的留言
  static async getMessageById(ctx) {}

  // 新增留言
  static async postMessage(ctx) {
    let { body: message } = ctx.request
    // console.log(message)
    // 获取ip地址以及物理地理地址
    const ip = (ctx.req.headers['x-forwarded-for'] ||
      ctx.req.headers['x-real-ip'] ||
      ctx.req.connection.remoteAddress ||
      ctx.req.socket.remoteAddress ||
      ctx.req.connection.socket.remoteAddress ||
      ctx.req.ip ||
      ctx.req.ips[0]).replace('::ffff:', '');

    message.state = 0
    message.ip = ip
    message.agent = ctx.headers['user-agent'] || message.agent

    const ip_location = geoip.lookup(ip)
    if (ip_location) {
      message.city = ip_location.city,
      message.range = ip_location.range,
      message.country = ip_location.country
    }
    const result = await new Message(message)
      .save()
      .catch(err => {
        console.log(err)
        // ctx.throw(500, '服务器内部错误')
        // throw new CustomError(500, '服务器内部错误!')
        throw new CustomError(500, err.ValidationError)
        return false
      })
    // console.log(result)
    if (result) {
      handleSuccess({ ctx, msg: '留言已提交，请耐心等待审核~', data: result})
    } else {
      handleError({ ctx, msg: '提交留言失败' })
    }
  }

  // 修改留言状态
  static async patchMessage(ctx) {
    const { state, _id } = ctx.request.body

    if (!state) {
      // ctx.throw(401, '参数无效')
      throw new CustomError(401, '参数无效')
      return false
    }

    let result = await Message
      .update({ _id }, { state })
      .catch(err => ctx.throw(500, '服务器内部错误'))

    if (result){
      handleSuccess({ ctx, msg: '修改状态成功'})
    }else{
      handleError({ ctx, msg: '修改状态失败' })
    }
  }

  // 编辑留言
  static async putMessage(ctx) { }

  // 删除留言
  static async deleteMessage(ctx) {
    const _id = ctx.params.id

    if (!_id) {
      // handleError({ ctx, message: '无效参数' })
      throw new CustomError(401, '参数无效')
      return false
    }

    let result = await Message
      .findByIdAndRemove(_id)
      .catch(err => {
        // ctx.throw(500, '服务器内部错误')
        throw new CustomError(500, '服务器内部错误')
      })
    if (result){
      handleSuccess({ ctx, msg: '删除留言成功', data: result })
    }else{
      handleError({ ctx,  msg: '删除留言失败' })
    }
  }
}

module.exports = messageController