const STS = require('qcloud-cos-sts')
const { handleSuccess, handleError } = require('../utils/handle')



class cosController {

  static async getSts(ctx) {
    // handleSuccess({ ctx, msg: '获取成功', data: { 'asd':112 } })
    // 配置参数
    var config = {
      secretId: 'AKIDoW3yABjRWWO5n5D8qLQ1ScnmyvZ0arLb',
      secretKey: 'CD0sUt3A4jAAwSlxyrUqcBIF3iFdQ6Zv',
      proxy: '',
      durationSeconds: 1800,
      bucket: 'sycho-1256277347',
      region: 'ap-guangzhou',
      allowPrefix: 'article/*',
      // 密钥的权限列表
      allowActions: [
        // 所有 action 请看文档 https://cloud.tencent.com/document/product/436/31923
        // 简单上传
        'name/cos:PutObject',
        'name/cos:PostObject',
        // 分片上传
        'name/cos:InitiateMultipartUpload',
        'name/cos:ListMultipartUploads',
        'name/cos:ListParts',
        'name/cos:UploadPart',
        'name/cos:CompleteMultipartUpload'
      ],
    };
    console.log(ctx)
    // TODO 这里根据自己业务需要做好放行判断
    // if (config.allowPrefix === '_ALLOW_DIR_/*') {
    //   console.log({ error: '请修改 allowPrefix 配置项，指定允许上传的路径前缀' });
    //   return;
    // }

    // 获取临时密钥
    var LongBucketName = config.bucket;
    var ShortBucketName = LongBucketName.substr(0, LongBucketName.indexOf('-'));
    var AppId = LongBucketName.substr(LongBucketName.indexOf('-') + 1);
    var policy = {
      'version': '2.0',
      'statement': [{
        'action': config.allowActions,
        'effect': 'allow',
        'resource': [
          'qcs::cos:ap-guangzhou:uid/' + AppId + ':prefix//' + AppId + '/' + ShortBucketName + '/' + config.allowPrefix,
        ],
      }],
    };
    console.log(STS)
    console.log(config)
    // let result = ''
    let result = await STS.getCredential({
      secretId: config.secretId,
      secretKey: config.secretKey,
      proxy: config.proxy,
      durationSeconds: config.durationSeconds,
      policy: policy,
    }, (err, tempKeys) => {
        console.log(JSON.stringify(err || tempKeys) || '')
      // let result = JSON.stringify(err || tempKeys) || ''
      // res.send(result);
      // return new Promise((resolve,reject)=>{
      //   resolve(JSON.stringify(err || tempKeys) || '')
      // })
        // result = err || tempKeys || ''
        return Promise.resolve(err || tempKeys || '')
    })
    console.log(111)
    handleSuccess({ ctx, msg: '获取成功', data: result })
    console.log(222)
  }
}

module.exports = cosController