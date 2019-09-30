/**
 * Created by laiweiqang on 2019/04/26
 */
// 文章控制器
const Article = require('../model/article.js')
const { handleSuccess, handleError } = require('../utils/handle')
const { CustomError, HttpError } = require('../utils/customError.js')
const fs = require('fs')
const config = require('../utils/config')

// ctx.req.files  ctx.req.body  文件上传
// ctx.request.body POST/PUT
// ctx.query GET
// ctx.params DELETE
class articleController{

	// 获取文章列表
	static async getArticle(ctx) {
		const { keyword = '', tag, type, publish = 1, state = 1, currentPage = 1, pageSize = 10, date, hot } = ctx.query
		console.log(ctx.query)
		// 过滤条件
		const options = {
			sort: { createTime: -1 },
			page: Number(currentPage),
			limit: Number(pageSize),
			// populate: ['tag'],
			// select: '-content'  // 加这个content被过滤掉，不会返回到前端
		}

		// 参数
		const querys = {}

		// 关键词查询
		if (keyword) {
			const keywordReg = new RegExp(keyword)
			querys['$or'] = [
				{ 'title': keywordReg },
				// { 'content': keywordReg },
				{ 'desc': keywordReg }
			]
		}

		// 按照state查询
		if (['1', '2'].includes(state)) {
			querys.state = state
		}

		// 按照公开程度查询
		if (['1', '2'].includes(publish)) {
			querys.publish = publish
		}

		// 按照类型程度查询
		if (['1', '2', '3'].includes(type)) {
			querys.type = type
		}
		
		// 按热度排行
		if (hot) {
			options.sort = {
				'meta.views': -1,
				'meta.likes': -1,
				'meta.comments': -1
			}
		}

		// 时间查询
		if (date) {
			const getDate = new Date(date)
			if (!Object.is(getDate.toString(), 'Invalid Date')) {
				querys.create_at = {
					"$gte": new Date((getDate / 1000 - 60 * 60 * 8) * 1000),
					"$lt": new Date((getDate / 1000 + 60 * 60 * 16) * 1000)
				}
			}
		}

		// if (tag) querys.tag = tag
		if (tag) querys.tag = { $regex: tag }

		// 如果是前台请求，则重置公开状态和发布状态
		// if (!authIsVerified(ctx.request)) {
		// 	querys.state = 1
		// 	querys.publish = 1
		// }

		// 查询
		const result = await Article
			.paginate(querys, options)
			.catch(err => {
				console.log(err)
				// ctx.throw(500, '服务器内部错误')
				throw new CustomError(500, '服务器内部错误')
				return false
			})
		if (result) {
			handleSuccess({
				ctx,
				data: {
					pagination: {
						total: result.total,
						currentPage: result.page,
						totalPage: result.pages,
						pageSize: result.limit
					},
					list: result.docs
				},
				msg: '列表数据获取成功!'
			})
		} else handleError({ ctx, msg: '获取列表数据失败' })
	}

	// 获取指定_id的文章内容
	static async getArticleById(ctx) {
		let _id = ctx.params.id
		if (!_id) {
			handleError({ ctx, msg: '无效参数' })
			return false
		}
		const result = await Article
			.findById({ _id })
			// .populate('tag')
			// .exec() // 执行sql语句
			.catch(err => {
				console.log(err)
				// ctx.throw(500, '服务器内部错误-findArticleById错误！')
				throw new CustomError(500, '服务器内部错误')
				return false
			})
		// console.log(result)
		if (result) {
			// 每次请求，views 都增加一次
			result.meta.views += 1
			result.save()
			handleSuccess({ ctx, msg: '文章获取成功', data: result })
		} else {
			handleError({ ctx, msg: '文章获取失败' })
		}
	}

	// 获取指定id的文章内容
	static async getArticleById2(ctx) {
		let id = Number(ctx.params.id)
		if (!id) {
			handleError({ ctx, msg: '无效参数' })
			return false
		}
		const result = await Article
			.findOne({ id }).exec()
			.catch(err => {
				console.log(err)
				throw new CustomError(500, '服务器内部错误')
				return false
			})
		// console.log(result)
		if (result) {
			// 每次请求，views 都增加一次
			result.meta.views += 1
			result.save()
			handleSuccess({ ctx, msg: '文章获取成功', data: result })
		} else {
			handleError({ ctx, msg: '文章获取失败' })
		}
	}

	// 发布文章
	static async postArticle(ctx) {
		//es6对象解构赋值
		//请求参数放在请求体
		// console.log(ctx.request.body)
		const result = await new Article(ctx.request.body)
			.save()
			.catch(err => {
				// console.log(err)
				throw new CustomError(500, '服务器内部错误')
				return false
			})
		// console.log(result)
		if (result) {
			handleSuccess({ ctx, msg: '添加文章成功', data: result })

			// 百度 seo push
			// request.post({
			// 	url: `http://data.zz.baidu.com/urls?site=${config.BAIDU.site}&token=${config.BAIDU.token}`,
			// 	headers: { 'Content-Type': 'text/plain' },
			// 	body: `${config.INFO.site}/article/${res._id}`
			// }, (error, response, body) => {
			// 	console.log('推送结果：', body)
			// })
			
		} else handleError({ ctx, msg: '添加文章失败' })
	}

	// 编辑文章
	static async putArticle(ctx) {
		const _id = ctx.params.id

		// const { title, keyword, tag } = ctx.request.body
		const { title} = ctx.request.body
		// console.log(ctx.request.body)
		// 去除不更新的字段
		delete ctx.request.body.createTime
		// delete ctx.request.body.update_at
		// delete ctx.request.body.meta

		if (!_id) {
			handleError({ ctx, msg: '无效参数' })
			return false
		}

		// if (!title || !keyword) {
		if (!title) {
			handleError({ ctx, msg: 'title必填' })
			return false
		}

		const result = await Article
			.findByIdAndUpdate(_id, ctx.request.body)
			.catch(err => {
				// ctx.throw(500, '服务器内部错误')
				console.log(err)
				throw new CustomError(500, '服务器内部错误')
				return false
			})
		if (result) {
			handleSuccess({ ctx, msg: '更新文章成功', data: result })

			// 百度推送
			// request.post({
			// 	url: `http://data.zz.baidu.com/update?site=${config.BAIDU.site}&token=${config.BAIDU.token}`,
			// 	headers: { 'Content-Type': 'text/plain' },
			// 	body: `${config.INFO.site}/article/${_id}`
			// }, (error, response, body) => {
			// 	console.log('百度删除结果：', body);
			// })
		} else handleError({ ctx, msg: '更新文章失败' })
	}

	// 修改文章状态
	static async patchArticle(ctx) { 
		const _id = ctx.params.id

		const { state, publish } = ctx.request.body

		const querys = {}

		if (state) querys.state = state

		if (publish) querys.publish = publish

		if (!_id) {
			handleError({ ctx, msg: '无效参数' })
			return false
		}

		const result = await Article
			.findByIdAndUpdate(_id, querys)
			.catch(err => {
				throw new CustomError(500, '服务器内部错误')
				return false
			})
		if (result) handleSuccess({ ctx, msg: '更新文章状态成功' })
		else handleError({ ctx, msg: '更新文章状态失败' })
	}

	// 更新点赞数
	static async patchArticleLikes(ctx) {
		const { meta, _id } = ctx.request.body

		if (typeof meta.likes === 'undefined') {
			throw new CustomError(401, '参数无效')
			return false
		}
		let result = await Article
			.update({ _id }, { meta })
			.catch(err => ctx.throw(500, '服务器内部错误'))

		if (result) {
			handleSuccess({ ctx, msg: '更新点赞数成功' })
		} else {
			handleError({ ctx, msg: '更新点赞数失败' })
		}
	}

	// 更新吐槽数
	static async patchArticleDislikes(ctx) {
		const { meta, _id } = ctx.request.body

		if (typeof meta.dislikes === 'undefined') {
			throw new CustomError(401, '参数无效')
			return false
		}
		let result = await Article
			.update({ _id }, { meta })
			.catch(err => ctx.throw(500, '服务器内部错误'))

		if (result) {
			handleSuccess({ ctx, msg: '更新吐槽数成功' })
		} else {
			handleError({ ctx, msg: '更新吐槽数失败' })
		}
	}

	// 删除文章
	static async deleteArticle(ctx) {
		const _id = ctx.params.id

		if (!_id) {
			handleError({ ctx, msg: '无效参数' })
			return false
		}

		const res = await Article
			.findByIdAndRemove(_id)
			.catch(err => {
				// ctx.throw(500, '服务器内部错误')
				throw new CustomError(500, '服务器内部错误')
				return false
			})
		if (res) {
			handleSuccess({ ctx, msg: '删除文章成功' })

			// 百度推送
			// request.post({
			// 	url: `http://data.zz.baidu.com/del?site=${config.BAIDU.site}&token=${config.BAIDU.token}`,
			// 	headers: { 'Content-Type': 'text/plain' },
			// 	body: `${config.INFO.site}/article/${_id}`
			// }, (error, response, body) => {
			// 	console.log('百度删除结果：', body);
			// })
		} else handleError({ ctx, msg: '删除文章失败' })
	}


	// 上传文章图片
	static async uploadArticlePics(ctx) {
		// console.log(`http://${ctx.req.headers.host}`)
		console.log(ctx.req.files) // 获取批量上传数组
		console.log(ctx.req.body)
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
		for (let item of files) {
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
		console.log(ctx.request.body)
		if (ctx.request.body.url) {
			fs.readFile(`static/${ctx.request.body.url}`, (err, data) => {
				// 读取文件失败/错误
				if (err) {
					// throw err;
					console.log(err)
					handleError({ ctx, msg: '删除失败' })
				} else {
					// 读取文件成功
					fs.unlinkSync(`static/${ctx.request.body.url}`)
				}
			})
		} else {
			handleError({ ctx, msg: '没有图片路径' })
		}
		handleSuccess({
			ctx, msg: '删除成功！',
			data: 'remove successful。'
		})
	}
}

module.exports = articleController