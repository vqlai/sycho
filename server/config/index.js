// 全局参数配置
let config = {
	admin: [],
	jwt: {},
	// 本地使用（连接本地mongodb）
	mongodb: {
		host: '127.0.0.1',
		database: '',
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
