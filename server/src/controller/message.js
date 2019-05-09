/**
 * Created by laiweiqang on 2019/04/26
 */
// 留言控制器
const Message = require('../model/message.js')
const { response } = require('../utils/handle')
const geoip = require('geoip-lite')
const { CustomError, HttpError } = require('../utils/customError.js')
const constants = require('../utils/constants.js')

class messageController {
  // 获取评论列表
  static async getMessages(ctx) {
    let { current_page = 1, page_size = 12, keyword = '', state = '' } = ctx.query

    // 过滤条件
    const options = { sort: { _id: +1 }, page: Number(current_page), limit: Number(page_size) }

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
    console.log(result)
    if (result) {
      // handleSuccess({
      //   ctx,
      //   result: {
      //     pagination: {
      //       total: result.total,
      //       current_page: result.page,
      //       total_page: result.pages,
      //       page_size: result.limit
      //     },
      //     list: result.docs
      //   },
      //   message: '列表数据获取成功!'
      // })
      response({
        ctx, success: true, msg: '列表数据获取成功!', data: {
          pagination: {
            total: result.total,
            current_page: result.page,
            total_page: result.pages,
            page_size: result.limit
          },
          list: result.docs
        }
      })
    } else {
      // handleError({ ctx, message: '获取列表数据失败' })
      response({ ctx, success: false, msg: '获取列表数据失败!' })
    }
  }
  // 获取指定id的评论
  static async getMessageById(ctx) { }
  // 新增评论
  static async addMessage(ctx) {
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
    // console.log(geoip)
    // console.log(ip_location)
    if (ip_location) {
      message.city = ip_location.city,
      message.range = ip_location.range,
      message.country = ip_location.country
    }
    // console.log(message)
    
    const res = await new Message(message)
      .save()
      .catch(err => {
        console.log(err)
        // ctx.throw(500, '服务器内部错误')
        // throw new CustomError(500, '服务器内部错误!')
        throw new CustomError(500, err.ValidationError)
        return false
      })
    // console.log(res)
    if (res) {
      // handleSuccess({ ctx, message: '数据提交审核成功，请耐心等待' })
      response({ ctx, success: true, msg: '数据提交审核成功，请耐心等待!', data: res})
    } else {
      // handleError({ ctx, message: '提交数据失败' })
      response({ ctx, success: false, msg: '数据提交审核成功，请耐心等待!' })
    }

    
  }
  // 编辑评论
  static async editMessage(ctx) {}
  // 删除评论
  static async deleteMessage(ctx) {}
}

module.exports = messageController