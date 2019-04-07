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
router.post('/login', U.login);
router.post('/addUser', checkToken, U.addUser);
router.get('/getUserInfo', checkToken, U.getUserInfo);
router.get('/getUsers', checkToken, U.getUsers);
router.delete('/deleteUser/:id', checkToken, U.deleteUser);
// router.get('/getAllUser', checkToken, U.getAllUser);
// upload.single('file')这里面的file是上传空间的name<input type="file" name="file"/> 
// upload.single设置单文件上传
router.post('/addAndUpload', checkToken, upload.single('file'), U.addAndUpload);
router.put('/editAndUpload', checkToken, upload.single('file'), U.editAndUpload);

// 链接管理 checkToken,
router.get('/getLinks', L.getLinks)
router.post('/addLink', checkToken, L.addLink)
router.put('/editLink', checkToken, L.editLink)
router.delete('/deleteLink/:id', checkToken, L.deleteLink)

// 文章管理 upload.array设置多文件上传
router.post('/article/release', checkToken, upload.array('file', 20), A.release);

module.exports = router;