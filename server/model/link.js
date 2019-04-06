const mongoose = require('mongoose')

const linkSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  desc: { type: String, required: true },
  url: { type: String, required: true }, 
  createTime: { type: Date, default: Date.now } // 因为类型是Date，无法保存时间戳
})

// mongoose 会自动把表名变成复数
// 想要指定collection表的名称，需要设置第三个参数
module.exports = mongoose.model('link', linkSchema, 'link')