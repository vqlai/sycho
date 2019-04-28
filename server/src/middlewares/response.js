// use: 用于给所有请求统一响应--统一响应中间件
// 在ctx对象上挂载方法，如果在调用的是有些参数没有出入，那么相当这个参数不存在，除非才有默认值的方式
module.exports = async (ctx, next) => {
	// 拦截接口请求异常或404,405,500错误处理
	try{
		// 请求成功时
		ctx.success = ({ data, msg, success, total, currentPage, pageSize,}) => {
			// 注意ctx.response.body可以简写为ctx.body但ctx.request.body不可以简写
			ctx.body = { code: 200, data, msg, success, total, currentPage, pageSize,};
		};
		// 传递到下一个中间件
		await next();
		// 请求路径错误处理
		// if (ctx.status === 404 || ctx.status === 405){
		// 	ctx.body = { code: 404, message: '无效的api请求',success: false}
		// }
		switch(ctx.status){
			case 400:
				ctx.body = { code: 400, message: error.message, success: false}
			case 401:
				ctx.body = { code: 401, message: error.message, success: false}
			case 404:
				ctx.body = { code: 404, message: '无效的api请求路径', success: false}
			case 405:
				ctx.body = { code: 405, message: error.message, success: false}
		}
	}catch(error){
		// 500 异常处理
		ctx.body = { code: 500, message: error.message, success: false}
	}
}