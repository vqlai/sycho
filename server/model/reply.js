/**
 * Created by laiweiqang on 2019/04/26
 */
// 回复表
const mongoose = require('mongoose')

const replySchema = new mongoose.Schema({
  replyId: { type: String, required: true },
  commentId: { type: String, required: true },
  nickName: { type: String, required: true },
  email: { type: String, required: true },
  ip: { type: String, required: true },
  client: { type: String, required: true },
  type: { type: String, required: true },
  content: { type: String, required: true },
  avator: { type: String, required: true },
  create_time: { type: String, required: true }
})

// mongoose 会自动把表名变成复数
// 想要指定collection的名称，需要设置第三个参数
module.exports = mongoose.model('reply', replySchema, 'reply')