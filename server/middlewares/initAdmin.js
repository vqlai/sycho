const config = require('../config')
const User = require('../model/user')
const md5 = require('md5')

// 初始化管理员中间件
// 注意throw抛出错误后就不会往下执行
module.exports = async(ctx, next) => {
	let result = await User.find().exec().catch(err=>{
		ctx.throw(500, '服务器内部错误-查找管理员数据错误！')
	})
	if(result.length === 0){
		for(let item of config.admin){
			let username = item.username
			let password = md5(item.password)
			let role = item.role
			let desc = item.desc
			let avatar = item.avatar
			let user = new User({
				username,
				password,
				role,
				desc,
				avatar
			})
			await user.save().catch(err => {
				ctx.throw(500, '服务器内部错误-存储管理员数据错误！')
			})
			console.log('初始化管理员完成！')
		}
	}
	await next()
}