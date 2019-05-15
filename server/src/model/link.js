/**
 * Created by laiweiqang on 2019/05/15
 */
// 链接表
const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const mongoosePaginate = require('mongoose-paginate')

// 自增ID初始化
autoIncrement.initialize(mongoose.connection)

const linkSchema = new mongoose.Schema({
  name: { type: String, required: true, validate: /\S+/ },
  type: { type: String, required: true },
  url: { type: String, required: true }, 
  // 描述
  desc: { type: String},
  // 发布日期
  createDate: { type: Date, default: Date.now() },
  // 最后修改日期
  updateDate: { type: Date, default: Date.now() }
})

// 翻页
linkSchema.plugin(mongoosePaginate)
// ID自增
linkSchema.plugin(autoIncrement.plugin, {
  model: 'link',
  field: 'id',
  startAt: 1,
  incrementBy: 1
})

// 时间更新
linkSchema.pre('findOneAndUpdate', function (next) {
  this.findOneAndUpdate({}, { updateDate: Date.now() })
  next()
})

// mongoose 会自动把表名变成复数
// 想要指定collection表的名称，需要设置第三个参数
module.exports = mongoose.model('link', linkSchema, 'link')