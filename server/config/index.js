// 全局参数配置
let config = {
	admin: [{
		username: 'admin',
		password: '123456',
		role: 1,
		desc: '超级管理员',
		avatar: 'upload/avatar/default.png'
	}],
	jwt: {
		secret: 'test', //撒盐：加密的时候混淆
		expiresIn: '3600s' //以秒为单位，token到期时间 3600s
	},
	// 本地使用（连接本地mongodb）
	mongodb: {
		host: '127.0.0.1',
		database: 'test',
		port: 27017,
		user: '',
		password: ''
	},
	app: {
		ip: process.env.ip,
		port: process.env.PORT || 1008, // server端口
		routerBaseApi: '/v1' // 接口基础路径
	}
}

// 注意区分es6与commonJS导出模块的写法
module.exports = config