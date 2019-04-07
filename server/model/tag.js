const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema({
  name: { type: String, required: true },
  count: { type: Number, required: true, default: 0 },
  createTime: { type: String, default: new Date().getTime() } // 因为类型是Date，无法保存时间戳,废弃Date类型
})

// mongoose 会自动把表名变成复数
// 想要指定collection表的名称，需要设置第三个参数
module.exports = mongoose.model('tag', tagSchema, 'tag')