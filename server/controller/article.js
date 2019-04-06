const Article = require('../model/article.js')
const { handleSuccess, handleError } = require('../utils/handle')
const fs = require('fs')

class articleController{
	// 发布文章
	static async release(ctx){
		// console.log(`http://${ctx.req.headers.host}`)
		console.log(ctx.req.files) // 获取批量上传数组
		console.log(ctx.req.body)
		let { title, type, content } = ctx.req.body
		const files = ctx.req.files
		if(!title){
			handleError({ ctx, msg: '标题不能为空！' })
			// if(files.length){
			// 	for(let item of files){
			// 		fs.unlinkSync(item.path) // 验证失败删除已上传的头像
			// 	}
			// }
			return false
		}
		if(files.length){
			let host = `http://${ctx.req.headers.host}/upload/article`
			let reg = /!\[(.*?)\]\((.*?)\)/g
			let originImgs = []
			let cacheImg = null
			while ((cacheImg = reg.exec(content)) !== null){
				originImgs.push(cacheImg[0])
			}
			for (let [index, item] of originImgs.entries()){
				content = content.replace(item, `![图片${index}](${host}/${files[index].filename})`)
			}
			// console.log(content)
		}
		let oneArticle = await Article
			.findOne({ 'title': title })
			.exec() // 执行sql语句
			.catch(err => {
				ctx.throw(500, '服务器内部错误-findOneArticle错误！')
			})
		if(oneArticle === null){
			const article = new Article({
				title,
				type: 1,
				content
			})
			let result = await article.save().catch((err) => {
				ctx.throw(500, '服务器内部错误-addArticle错误！')
			})
			handleSuccess({
				ctx, msg: '新增成功！',
				data: result
			})
		}
	}
}

module.exports = articleController