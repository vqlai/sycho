/**
 * Created by laiweiqang on 2019/04/26
 */

// 因没有使用babel转换，故无法使用es6的import/export，只能用nodejs的commonjs规范使用
// koa
const koa = require('koa') // web开发框架
// import koa from 'koa'
const cors = require('@koa/cors') // 跨域
// import cors from 'koa-cors'
const serve = require('koa-static') // 静态资源处理
// import static from 'koa-static'
const mongoosePaginate = require('mongoose-paginate')

//配置文件
const config = require('./utils/config.js')
const router = require('./router')
const mongodb = require('./mongodb')
// const redis = require('./redis')

// 处理自动抛出的异常
const { CustomError, HttpError } = require('./utils/customError.js')

const app = new koa()

// 连接数据库
mongodb()

mongoosePaginate.paginate.options = {
	limit: config.app.LIMIT
}

// 处理cors中间件
const corsOpt = require('./middlewares/corsOpt.js')
app.use(corsOpt)

// bodyParser中间件 可以用来从请求的数据体里面提取键值对。
const bodyParser = require('koa-bodyparser') // 请求体JSON解析
app.use(bodyParser())
const logger = require('koa-logger')
// 默认控制台输出logger
app.use(logger())
// 处理自动抛出的异常
app.use((ctx, next) => {
	return next().catch((err) => {
		let code = 500
		let msg = 'unknown error'

		if (err instanceof CustomError || err instanceof HttpError) {
			const res = err.getCodeMsg()
			ctx.status = err instanceof HttpError ? res.code : 200
			code = res.code
			msg = res.msg
		} else {
			ctx.status = code
			console.error('err', err)
		}
		ctx.body = { success: false, code, msg, data: {} } 
	})
})

// 初始化admin数据中间件
const initAdmin = require('./middlewares/initAdmin.js')
app.use(initAdmin)

// api路由中间件
app.use(router.routes()).use(router.allowedMethods())


// 配置的静态文件夹地址, 用来访问图片，压缩后的前端代码等
// 前端访问时可以省略static这个目录
app.use(serve(__dirname + '/static'))

// (port, hostname[, callback])
app.listen(config.app.port, '127.0.0.1', ()=>{
	// console.log(process.env)
	// console.log('The server is running at http://localhost:' +config.app.port)
	console.log(`The server is running at http://127.0.0.1:${config.app.port}`)
})
