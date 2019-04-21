const Article = require('../model/article.js')
const { handleSuccess, handleError } = require('../utils/handle')
const fs = require('fs')

class articleController{

	// 上传文章图片
	static async uploadArticlePics(ctx) {
		// console.log(`http://${ctx.req.headers.host}`)
		console.log(123)
		console.log(ctx.req.files) // 获取批量上传数组
		console.log(ctx.req.body)
		console.log(123)
		const files = ctx.req.files
		// if (files.length) {
		// 	let host = `http://${ctx.req.headers.host}/upload/article`
		// 	let reg = /!\[(.*?)\]\((.*?)\)/g
		// 	let originImgs = []
		// 	let cacheImg = null
		// 	while ((cacheImg = reg.exec(content)) !== null) {
		// 		originImgs.push(cacheImg[0])
		// 	}
		// 	for (let [index, item] of originImgs.entries()) {
		// 		content = content.replace(item, `![图片${index}](${host}/${files[index].filename})`)
		// 	}
		// } 
		let result = []
		for(let item of files){
			let obj = {}
			obj.url = `upload/article/${item.filename}`
			obj.name = item.filename
			result.push(obj)
		}
		handleSuccess({
			ctx, msg: '批量上传图片成功！',
			data: result
		})
		
	}

	// 删除文章图片
	static async removeArticlePics(ctx) {
		console.log(ctx.req.body)
	}

	// 获取文章内容
	static async getArticleById(ctx) {
		let id = ctx.query.id
		if (!id) {
			handleError({ ctx, msg: '参数无效，删除失败！' })
			return false
		}
		const result = await Article
			.findOne({'_id': id})
			.exec() // 执行sql语句
			.catch(err => {
				ctx.throw(500, '服务器内部错误-findArticleById错误！')
			})
		console.log(result)
		if (result) {
			handleSuccess({
				ctx, msg: '数据获取成功！',
				data: result
			})
		} else {
			handleError({ ctx, msg: '数据获取失败！' })
		}
	}

	// 获取文章列表
	static async getArticles(ctx) {
		console.log(ctx.query)
		console.log(ctx.query.currentPage)
		let currentPage = parseInt(ctx.query.currentPage)
		let pageSize = parseInt(ctx.query.pageSize)
		let queryTitle = ctx.query.queryTitle
		let queryType = parseInt(ctx.query.queryType)
		let queryTag = parseInt(ctx.query.queryTag)
		let result = null, total = 0
		currentPage = currentPage <= 0 ? 1 : currentPage
		// 组合搜索内容
		const querys = {}
		// 组合查询
		if (queryTitle) {
			querys['$or'] = [
				{ 'title': { $regex: queryTitle } }, // 使用正则模糊搜索,可在数组添加多个条件
			]
		}
		// 权限查询
		if (queryType) { querys.type = queryType }
		if (queryTag) { 
			querys.tag = { $regex: queryTag } // 使用正则模糊搜索,可在数组添加多个条件
		}
		console.log(querys)
		result = await Article
			.find(querys) // 模糊搜索
			.sort({ 'createTime': -1 }) // 排序，-1为倒序
			.skip(pageSize * (currentPage - 1)) // 跳过数
			.limit(pageSize) // 限制每页显示数
			.exec() // 执行sql语句
			.catch(err => {
				ctx.throw(500, '服务器内部错误-getArticles错误！')
			})
		console.log(result)
		if (result.length) {
			total = await Article // 获取分页总数
				// .count() // 5.2版本已废弃
				.countDocuments()
				.exec()
				.catch(err => {
					ctx.throw(500, '服务器内部错误-Article分页总数查询错误!')
				})
		}
		if (result) {
			handleSuccess({
				ctx, msg: '数据获取成功！',
				data: {
					pagination: {
						total,
						currentPage,
						pageSize
					},
					list: result
				}
			})
		} else {
			handleError({ ctx, msg: '数据获取失败！' })
		}
	}

	// 发布文章
	static async addArticle(ctx) {
		//es6对象解构赋值
		const { title, author, type, tag, likeNum, lookNum, releaseTime, content } = ctx.request.body //请求参数放在请求体
		if (!title) {
			handleError({ ctx, msg: '文章标题不能为空！' })
			return false
		}else if (!author) {
			handleError({ ctx, msg: '作者不能为空！' })
			return false
		} else if (!type) {
			handleError({ ctx, msg: '文章类型不能为空！' })
			return false
		} else if (!tag) {
			handleError({ ctx, msg: '文章标签不能为空！' })
			return false
		} else if (typeof likeNum === "underfined") {
			handleError({ ctx, msg: '点赞数不能为空！' })
			return false
		} else if (typeof lookNum === "underfined") {
			handleError({ ctx, msg: '浏览数不能为空！' })
			return false
		} else if (!releaseTime) {
			handleError({ ctx, msg: '发布时间不能为空！' })
			return false
		} else if (!content) {
			handleError({ ctx, msg: '文章内容为空！' })
			return false
		}
		let oneArticle = await Article
			.findOne({ 'title': title })
			.exec() // 执行sql语句
			.catch(err => {
				ctx.throw(500, '服务器内部错误-findOneArticle错误！')
			})
		console.log(oneArticle)
		if (oneArticle === null) {
			const article = new Article({
				title,
				author,
				type,
				tag,
				likeNum,
				lookNum,
				releaseTime,
				content,
				createTime: new Date().getTime()
			})
			let result = await article.save().catch((err) => {
				ctx.throw(500, '服务器内部错误-addArticle错误！')
			})
			handleSuccess({
				ctx, msg: '文章发布成功！',
				data: result
			})
		} else {
			handleError({ ctx, msg: '文章名已存在！' })
		}
	}

	// 编辑文章
	static async editArticle(ctx) {
		const { id, title, author, type, tag, likeNum, lookNum, releaseTime, content } = ctx.request.body 
		if (!title) {
			handleError({ ctx, msg: '文章标题不能为空！' })
			return false
		} else if (!author) {
			handleError({ ctx, msg: '作者不能为空！' })
			return false
		} else if (!type) {
			handleError({ ctx, msg: '文章类型不能为空！' })
			return false
		} else if (!tag) {
			handleError({ ctx, msg: '文章标签不能为空！' })
			return false
		} else if (typeof likeNum === "underfined") {
			handleError({ ctx, msg: '点赞数不能为空！' })
			return false
		} else if (typeof lookNum === "underfined") {
			handleError({ ctx, msg: '浏览数不能为空！' })
			return false
		} else if (!releaseTime) {
			handleError({ ctx, msg: '发布时间不能为空！' })
			return false
		} else if (!content) {
			handleError({ ctx, msg: '文章内容为空！' })
			return false
		}
		let result = null
		if (id) {
			result = await Article.findByIdAndUpdate(id, {
				title,
				author,
				type,
				tag,
				likeNum,
				lookNum,
				releaseTime,
				content
			}, { new: true })
				.exec() // 执行查询，并将查询结果传入回调函数,可以传人一个函数，会返回成为一个完整的 promise 对象
				.catch((err) => {
					ctx.throw(500, '服务器内部错误-findByIdAndUpdate错误!')
				})
			if (result) {
				handleSuccess({
					ctx, msg: '修改成功！',
					data: result
				})
			}
		}
	}
	
	// 删除文章
	static async deleteArticle(ctx) {
		const id = ctx.params.id
		if (!id) {
			handleError({ ctx, msg: '参数无效，删除失败！' })
			return false
		}
		const result = await Article
			.findByIdAndRemove(id)
			.catch(err => {
				ctx.throw(500, '服务器内部错误-deleteArticle错误！')
			})
		if (result) handleSuccess({ ctx, msg: '删除成功！', data: result })
		else handleError({ ctx, msg: '删除失败！' })
	}

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