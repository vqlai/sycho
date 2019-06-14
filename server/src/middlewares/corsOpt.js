module.exports = async (ctx, next) => {
	// cors跨域拦截器 3100-server 3200-admin 3300-front
	const allowedOrigins = ['http://localhost:9527', 'http://192.168.0.103:9527', 'http://localhost:9000', 'http://127.0.0.1:9000',
		'http://www.sycho.cn', 'https://www.sycho.cn', 'http://m.sycho.cn', 'https://m.sycho.cn', 'http://app.sycho.cn', 'https://app.sycho.cn'];
	const origin = ctx.request.headers.origin || '';
	if (allowedOrigins.includes(origin) || origin.includes('localhost')) {
		ctx.set('Access-Control-Allow-Origin', origin);
	};

	ctx.set({
		'Access-Control-Allow-Headers': 'Authorization, Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With',
		'Access-Control-Allow-Methods': 'PUT,PATCH,POST,GET,DELETE,OPTIONS',
		'Access-Control-Max-Age': '1728000',
		'Content-Type': 'application/json;charset=utf-8',
		'X-Powered-By': 'sycho v1.0.0'
	});

	// Form Data简单请求不会发起OPTIONS请求
	// Request Payload复杂请求会发起OPTIONS请求
	// 设置Access-Control-Max-Age时间，可以避免每个请求都发起OPTIONS
	// OPTIONS
	if (ctx.request.method == 'OPTIONS') {
		ctx.status = 200;
		return false;
	};

	// 传递到下一个中间件
	await next();
}