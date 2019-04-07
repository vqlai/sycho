const multer = require('koa-multer') // 加载koa-multer模块
// multer是Nodejs中用于处理文件上传 multipart / form - data数据的中间件，
// 用于处理任何表单提交数据(包含非multipart / form - data类型的表单);
// multer 在request对象中加入了body和file或files属性，
// body属性包含了form中的文本内容，file或files包含了form 中的附件数据 
//文件上传 配置
let storage = multer.diskStorage({
	// 设置上传后文件路径，uploads文件夹会自动创建
	destination: (req, file , cb) => {
		console.log(req.url)
		console.log(file)
		// 路径前面不能为/，否则会去找绝对路径
		if(typeof file != 'undefined'){
			let path = './static/upload/default'
			if (req.url == '/api/addAndUpload' || req.url == '/api/editAndUpload'){
				path = './static/upload/avatar'
			}else if(req.url == '/api/article/release'){
				path = './static/upload/article'
			}
			cb(null, path)
		}
	},
	// 给上传文件重命名，获取添加后缀名
	// filename: (req, file, cb) => {
	// 	if(typeof file != 'undefined'){
	// 		let fileFormat = (file.originalname).split('.')
	// 		cb(null, file.fieldname+'_'+Date.now()+'.'+fileFormat[fileFormat.length-1])
	// 	}
	// },
	filename: function (req, file, cb) {
		let fileFormat = (file.originalname).split('.')
		cb(null, file.fieldname + '_' + Date.now() + '.' + fileFormat[fileFormat.length - 1])
	},
	onFileUploadComplete: function (file) {
		console.log(file.fieldname + ' uploaded to  ' + file.path)
	}
}) 

// 添加配置文件到muler对象
// 如需其他设置，请参考multer的limits
let upload = multer({
	storage: storage
})

module.exports = upload

//  1.文件上传有以下方法
//  muilter.single(‘file’), //适用于单文件上传
// 	muilter.array(‘file’, num), //适用于多文件上传，num为最多上传个数，上传文件的数量可以小于num,
// 	muilter.fields(fields), //适用于混合上传，比如A类文件1个，B类文件2个。官方API有详细说明。

// 	2.file为上传字段名称，当使用form表单submit方式上传时，必须与表单上传的name属性保持一致。
//  表单记得加上  enctype =‘multipart / form - data’

//  3.对上传文件大小限制，名称限制等均可在limits中加上，具体可加属性，请参考官方api。