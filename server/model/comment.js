/**
 * Created by laiweiqang on 2019/04/26
 */
// 评论表
const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  // 评论所在的文章_id，0代表系统留言板
  post_id: { type: Number, required: true },
  // pid，0代表默认评论,不是回复的评论
  pid: { type: Number, default: 0 },
  commentId: { type: String, required: true },
  userInfo: {
    nickName: { type: String, required: true },
    email: { type: String, required: true },
    ip: { type: String, required: true },
    client: { type: String, required: true }
  },
  type: { type: String, required: true },
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
  avator: { type: String, required: true },
  createTime: { type: String, required: true },
  // 发布日期
  createDate: { type: Date, default: Date.now() },
  // 最后修改日期
  updateDate: { type: Date, default: Date.now() }
})

// mongoose 会自动把表名变成复数
// 想要指定collection的名称，需要设置第三个参数
module.exports = mongoose.model('comment', commentSchema, 'comment')