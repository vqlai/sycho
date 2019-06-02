const config = require('../utils/config.js'),
			Router = require('koa-router'),
			router = new Router({
				prefix: config.app.routerBaseApi // 设置接口基础路径
			}),
			checkToken = require('../middlewares/checkToken'),
			upload = require('../utils/upload'),
			U = require('../controller/user.js'),
			L = require('../controller/link.js'),
			A = require('../controller/article.js'),
			C = require('../controller/comment.js'),
			M = require('../controller/message.js'),
			S = require('../controller/sts.js')
/*HTTP动词
	GET     //查询 
	POST    //新增
	PUT     //替换
	PATCH   //更新
	DELETE  //删除
*/
// STS
router.get('/sts', S.getSts)

// 用户管理
router.post('/login', U.login)
router.get('/getUserInfo', checkToken, U.getUserInfo)
// router.get('/getAllUser', checkToken, U.getAllUser)
router.get('/user', checkToken, U.getUser)
// router.post('/addUser', checkToken, U.addUser)
// upload.single('file')这里面的file是上传空间的name<input type="file" name="file"/> 
// upload.single设置单文件上传
router.post('/user', checkToken, upload.single('file'), U.postUser)
router.put('/user/:id', checkToken, upload.single('file'), U.putUser)
router.delete('/user/:id', checkToken, U.deleteUser)

// 链接管理 checkToken,
router.get('/link', L.getLink)
router.post('/link', checkToken, L.postLink)
router.put('/link/:id', checkToken, L.putLink)
router.delete('/link/:id', checkToken, L.deleteLink)

// 文章管理 
router.get('/article', A.getArticle)                                          // 文章列表
router.get('/article/:id', A.getArticleById)																	// 文章详情
router.post('/article', checkToken, A.postArticle)														// 添加文章
router.put('/article/:id', checkToken, A.putArticle)															// 修改文章	
router.delete('/article/:id', checkToken, A.deleteArticle)										// 删除文章
router.patch('/article/:id', checkToken, A.patchArticle)											// 修改文章状态
//upload.array设置多文件上传 20为限制上传数量
router.post('/uploadArticlePics', checkToken, upload.array('file', 20), A.uploadArticlePics) // 上传文章图片
// 注：delete方法只能再url上拼参数，无法将参数放在请求body里
router.post('/removeArticlePics', checkToken, A.removeArticlePics) // 删除文章图片

// 留言管理
// router.get('/getMessageById', checkToken, M.getMessageById)
router.get('/message', checkToken, M.getMessage) 						// 获取留言
router.post('/message', checkToken, M.postMessage)					// 添加留言
router.patch('/message', checkToken, M.patchMessage) 				// 修改留言墙状态	
router.delete('/message/:id', checkToken, M.deleteMessage) 	// 删除留言
// router.put('/message', checkToken, M.putMessage)	// 修改留言

// 评论管理
router.get('/getCommentById', checkToken, C.getCommentById)
router.get('/getComments', checkToken, C.getComments)
router.post('/addComment', checkToken, C.addComment)
router.put('/editComment', checkToken, C.editComment)
router.delete('/deleteComment/:id', checkToken, C.deleteComment)

//upload.array设置多文件上传（该方法已废弃）
// router.post('/article/release', checkToken, upload.array('file', 20), A.release)

module.exports = router