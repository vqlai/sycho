/**
 * Created by laiweiqang on 2019/05/22
 */
// 文章控制器
const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const mongoosePaginate = require('mongoose-paginate')

// 自增ID初始化
autoIncrement.initialize(mongoose.connection)

const articleSchema = new mongoose.Schema({
	title: { type: String, required: true },
	desc: { type: String, required: false, default: '' },
	author: { type: String, required: true },
	type: { type: Number, required: true}, // 文章类型
	tag: { type: String, required: true}, // 文章标签
	// likeNum: { type: Number, required: true },
	// lookNum: { type: Number, required: true },
	// 状态 1 发布 2 草稿
	state: { type: Number, default: 1 },
	// 文章公开状态 1 公开 2 私密
	publish: { type: Number, default: 1 },
	// releaseTime: { type: String, required: true },
	thumb: String, // 文章缩略图 
	content: { type: String, required: true },
	createDate: { type: Date, default: Date.now }, // 因为类型是Date，无法保存时间戳,废弃Date类型
	updateDate: { type: Date, default: Date.now },
	// 其他元信息
	meta: {
		views: { type: Number, default: 0 },
		likes: { type: Number, default: 0 },
		dislikes: { type: Number, default: 0 },
		comments: { type: Number, default: 0 }
	}
})

// 转化成普通 JavaScript 对象
articleSchema.set('toObject', { getters: true })

// 翻页 + 自增ID插件配置
articleSchema.plugin(mongoosePaginate)
articleSchema.plugin(autoIncrement.plugin, {
	model: 'article',
	field: 'id',
	startAt: 1,
	incrementBy: 1
})

// 时间更新
articleSchema.pre('findOneAndUpdate', function (next) {
	this.findOneAndUpdate({}, { updateDate: Date.now() })
	next()
})

// mongoose 会自动把表名变成复数
// 想要指定collection的名称，需要设置第三个参数
module.exports = mongoose.model('article', articleSchema, 'article')