/**
 * Created by laiweiqang on 2019/04/26
 */
// 用户表
const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const mongoosePaginate = require('mongoose-paginate')

// 自增ID初始化
autoIncrement.initialize(mongoose.connection)

const userSchema = new mongoose.Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
	role: { type: Number, required: true }, // 用户权限 1为普通用户 2为管理员 3为超级管理员
	desc: { type: String }, // 用户描述
	avatar: { type: String }, // 用户头像
	// 发布日期
	createDate: { type: Date, default: Date.now() },
	// 最后修改日期
	updateDate: { type: Date, default: Date.now() }
})

// 翻页 + 自增ID插件配置
userSchema.plugin(mongoosePaginate)
userSchema.plugin(autoIncrement.plugin, {
	model: 'user',
	field: 'id',
	startAt: 1,
	incrementBy: 1
})

// 时间更新
userSchema.pre('findOneAndUpdate', function (next) {
	this.findOneAndUpdate({}, { updateDate: Date.now() })
	next()
})

// mongoose 会自动把表名变成复数
// 想要指定collection的名称，需要设置第三个参数
// mongoose.model 执行在数据库创建表的操作
module.exports = mongoose.model('user', userSchema, 'user')