const config = require('../utils/config.js')
const jwt = require('jsonwebtoken')

module.exports = async (ctx, next) => {
	// 获取请求头内容
	const authorization = ctx.get('authorization') // 这两种方式都可以拿到atuhorization
	// const authorization = ctx.request.header.atuhorization
	console.log(authorization)
	if(authorization){
		let token = authorization.split(' ')[1]
		try{
			// 验证token
			let decoded = jwt.verify(token, config.jwt.secret)
			// console.log(decoded);返回如下
      // { id: '5934afe7adb12d30f0679b41',
      // iat: 1496629988,
      // exp: 1496633588 } 解析后的exp=创建token的时间+之前设置的过期时间
      // let deadline = new Date()/1000;
      // if(decoded.exp <= deadline){
      //     console.log('expired token');
      //     ctx.throw(401, 'expired token');
      // }else{
      //     console.log('鉴权成功!');
      //      await next();
      // }
		}catch(err){
			//token验证失败
			ctx.throw(401, 'expired token - token验证失败')
		}
	}else{
		//缺少token
		ctx.throw(401, 'no token detected in http header Authorization')
	}
	console.log("鉴权成功");
	await next()
}