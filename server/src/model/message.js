/**
 * Created by laiweiqang on 2019/04/26
 */
// 留言表
const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const mongoosePaginate = require('mongoose-paginate')

// 自增ID初始化
autoIncrement.initialize(mongoose.connection)

const messageSchema = new mongoose.Schema({
  postId: { type: Number, default: 0 }, // 0对应留言板留言回复，其他id对应文章的留言评论
  postType: { type: String, default: 'message' }, // message留言板留言 article 文章评论
  // 名称
  name: { type: String, required: true },
  email: { type: String, required: true },
  url: { type: String, required: true },
  // 内容
  content: { type: String, required: true, validate: /\S+/ },
  avator: { type: String, default: '' }, // 头像背景图片
  color: { type: String, default: '' }, // 头像背景颜色
  likes: { type: Number, default: 0 }, // 点赞数
  dislikes: { type: Number, default: 0 }, // 不点赞数
  // 无法计算楼层
  // floor: { type: String, default: '' }, // 楼层，未通过审核的评论/留言楼层为空，通过了才会更新累计楼层，为保证楼层准确，后台审核时务必按顺序最先提交的优先审核
  replyId: { type: String, default: '' }, // 回复关联的评论id
  replyFloor: { type: String, default: ''}, //  回复编号
  isReply: { type: Boolean, default: false }, // 是否回复
  replyName: { type: String, required: false, default: '' },
  replyContent: { type: String, required: false, default: '' },
  // 状态  0 待审核，1 审核通过， 2 审核不通过
  state: { type: Number, default: 0 },
  // ip
  ip: { type: String },
  // ip 物理地址
  city: { type: String },
  range: { type: String },
  country: { type: String },
  // 用户ua
  agent: { type: String, validate: /\S+/ },
  // 发布日期
  createDate: { type: Date, default: Date.now },
  // 最后修改日期
  updateDate: { type: Date, default: Date.now }
})

// 翻页 + 自增ID插件配置
messageSchema.plugin(mongoosePaginate)
messageSchema.plugin(autoIncrement.plugin, {
  model: 'message',
  field: 'id',
  startAt: 1,
  incrementBy: 1
})

// 时间更新
messageSchema.pre('findOneAndUpdate', function (next) {
  this.findOneAndUpdate({}, { updateDate: Date.now() })
  next()
})

// 留言模型
const message = mongoose.model('message', messageSchema, 'message')
// mongoose 会自动把表名变成复数
// 想要指定collection的名称，需要设置第三个参数
module.exports = message