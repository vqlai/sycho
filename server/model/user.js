const mongoose = require('mongoose')
// const Schema = mongoose.Schema

const userSchema = new mongoose.Schema({
	username: {type: String, required: true},
	password: {type: String, required: true},
	role: {type: Number}, // 用户权限 1为超级管理员 2为管理员 3为普通用户
	desc: { type: String }, // 用户描述
	avatar: {type: String}, // 用户头像
	createTime: {type: Date, default: Date.now} // 因为类型是Date，无法保存时间戳
})

// mongoose 会自动把表名变成复数
// 想要指定collection的名称，需要设置第三个参数
// mongoose.model 执行在数据库创建表的操作
module.exports = mongoose.model('user', userSchema, 'user')