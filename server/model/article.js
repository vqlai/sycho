const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
	title: {type: String, required: true},
	type: {type: Number}, // 文章类型
	// tag: {type: String}, // 文章标签
	content: {type: String, required: true},
	createTime: { type: String, default: new Date().getTime() } // 因为类型是Date，无法保存时间戳,废弃Date类型
})

// mongoose 会自动把表名变成复数
// 想要指定collection的名称，需要设置第三个参数
module.exports = mongoose.model('article', articleSchema, 'article')