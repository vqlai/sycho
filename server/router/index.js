const config = require('../config'),
			Router = require('koa-router'),
			router = new Router({
				prefix: config.app.routerBaseApi // 设置接口基础路径
			}),
			checkToken = require('../middlewares/checkToken'),
			upload = require('../utils/upload'),
			U = require('../controller/user.js'),
			L = require('../controller/link.js'),
			A = require('../controller/article.js')
/*HTTP动词
	GET     //查询 
	POST    //新增
	PUT     //替换
	PATCH   //更新
	DELETE  //删除
*/
// 用户管理
router.post('/login', U.login)
router.post('/addUser', checkToken, U.addUser)
router.get('/getUserInfo', checkToken, U.getUserInfo)
router.get('/getUsers', checkToken, U.getUsers)
router.delete('/deleteUser/:id', checkToken, U.deleteUser)
// router.get('/getAllUser', checkToken, U.getAllUser)
// upload.single('file')这里面的file是上传空间的name<input type="file" name="file"/> 
// upload.single设置单文件上传
router.post('/addAndUploadUser', checkToken, upload.single('file'), U.addAndUploadUser)
router.put('/editAndUploadUser', checkToken, upload.single('file'), U.editAndUploadUser)

// 链接管理 checkToken,
router.get('/getLinks', L.getLinks)
router.post('/addLink', checkToken, L.addLink)
router.put('/editLink', checkToken, L.editLink)
router.delete('/deleteLink/:id', checkToken, L.deleteLink)

// 文章管理 
router.get('/getArticleById', A.getArticleById)
router.get('/getArticles', A.getArticles)
router.post('/addArticle', checkToken, A.addArticle)
router.put('/editArticle', checkToken, A.editArticle)
router.delete('/deleteArticle/:id', checkToken, A.deleteArticle)
//upload.array设置多文件上传 20为限制上传数量
router.post('/uploadArticlePics', checkToken, upload.array('file', 20), A.uploadArticlePics)

//upload.array设置多文件上传（该方法已废弃）
router.post('/article/release', checkToken, upload.array('file', 20), A.release)

module.exports = router