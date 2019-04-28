/**
 * Created by laiweiqang on 2019/04/26
 */
// 评论逻辑处理
const Comment = require('../model/comment.js')
const { response } = require('../utils/handle')
const { CustomError, HttpError } = require('../utils/customError.js')
const constants = require('../utils/constants.js')

class commentController {
  // 获取评论列表
  static async getComments(ctx) { }
  // 获取指定id的评论
  static async getCommentById(ctx) { }
  // 新增评论
  static async addComment(ctx) {
    const { nickName, email, client, type, content } = ctx.request.body //请求参数放在请求体
    console.log(ctx.request.body)
    const ip = ctx.request.get('X-Forwarded-For') || ctx.request.get('X-Real-IP')
    console.log(ip)
    response({
      ctx, 
      msg: '评论成功!'
    })
  }
  // 编辑评论
  static async editComment(ctx) {}
  // 删除评论
  static async deleteComment(ctx) {}
}

module.exports = commentController