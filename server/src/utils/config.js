// 全局参数配置
let config = {
	admin: [{
		username: 'test1',
		password: '4371639',
		role: '3',
		desc: '超级管理员',
		avatar: 'upload/avatar/default.png'
	},{
		username: 'test2',
		password: '123456',
		role: '2',
		desc: '管理员',
		avatar: 'upload/avatar/default.png'
	},{
		username: 'test3',
		password: '123456',
		role: '1',
		desc: '普通用户',
		avatar: 'upload/avatar/default.png'
	}],
	jwt: {
		secret: '123456', //撒盐：加密的时候混淆
		expiresIn: '10800s' //以秒为单位，token到期时间 3600s
	},
	// 本地使用（连接本地mongodb）
	mongodb: {
		host: '127.0.0.1',
		database: 'test',
		port: 27017,
		user: '',
		password: ''
	},
	// 线上使用
	// mongodb: {
	// 	host: '127.0.0.1', // 线上连接centos的mongodb用127.0.0.1/172.16.0.11   本地用127.0.0.1
	// 	database: 'test',
	// 	port: 26789,
	// 	user: 'test',
	// 	password: '123456'
	// },
	app: {
		ip: process.env.ip,
		port: process.env.PORT || 1008, // server端口
		routerBaseApi: '/v1', // 接口基础路径
		LIMIT: 16,
	},
	BAIDU: {
		site: 'your_baidu_site',
		token: 'your_baidu_token'
	},
	INFO: {
		name: 'sycho_blog',
		version: '1.0.0',
		author: 'vqlai',
		site: 'https://sycho.cn',
		powered: ['Vue2', 'Nuxt.js', 'Node.js', 'MongoDB', 'koa', 'Nginx']
	}
}

// 注意区分es6与commonJS导出模块的写法
module.exports = config