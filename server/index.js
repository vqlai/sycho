// koa
const koa = require('koa') // web开发框架
// import koa from 'koa'
const cors = require('@koa/cors') // 跨域
// import cors from 'koa-cors'
const serve = require('koa-static') // 静态资源处理
// import static from 'koa-static' 

//配置文件
const config = require('./config')
const router = require('./route')
const mongodb = require('./mongodb')


const app = new koa()

// 连接数据库
mongodb()

// 处理cors中间件
const corsOpt = require('./middlewares/corsOpt.js')
app.use(corsOpt)

// bodyParser中间件 可以用来从请求的数据体里面提取键值对。
const bodyParser = require('koa-bodyparser') // 请求体JSON解析
app.use(bodyParser())

// 请求响应中间件(放在最前面)
// app.use可以直接执行引人文件里的module.export内容
// const response = require('./middlewares/response.js')
// app.use(response);

// 初始化admin数据中间件
const initAdmin = require('./middlewares/initAdmin.js')
app.use(initAdmin)

// api路由中间件
app.use(router.routes()).use(router.allowedMethods())

// 配置的静态文件夹地址, 用来访问图片，压缩后的前端代码等
// 前端访问时可以省略static这个目录
app.use(serve(__dirname + '/static'))

app.listen(config.app.port, ()=>{
	console.log('The server is running at http://localhost:' +config.app.port)
})
