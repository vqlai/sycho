// import wx from 'weixin-js-sdk'
import wx from 'jwx'
import { getWxConfig } from '@/api/base'

// 注意微信端鉴权失败无法分享，分享的链接不是在配置的域内无法分享
// 注意app内的微信分享，安卓需要对#号url加密，ios可不用

// 将json对象字符串转为json对象
function evil(str){
  // 一个变量指向Function，防止有些前端编译工具报错
  let Fn = Function 
  return new Fn('return ' + str)()
}

// 获取后台返回的微信配置
function _getWxConfig() {
  return new Promise((resolve, reject)=>{
    getWxConfig({url: window.location.href.split('#')[0]}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 三套分享文案
const shareText = [
  {
      title: '时隔30年，葫芦娃再出毁童年新番！',
      desc: '不看不是90后',
      image: 'https://qnm.163.com/m/2017/dzdl/images/sns1.jpg',
  },
  {
      title: '葫芦娃：“我不管，丁三石还欠我一个女朋友！”',
      desc: '找不到媳妇都是你的错',
      image: 'https://qnm.163.com/m/2017/dzdl/images/sns1.jpg',
  },
  {
      title: '网易大楼昨夜遭七名男子打砸，丁磊情绪稳定',
      desc: '火速围观',
      image: 'https://qnm.163.com/m/2017/dzdl/images/sns2.jpg',
  }
];
let random = parseInt(Math.random() * 3, 10);

// 弹窗名必须为isShareDialog
// let {appId, timestamp, nonceStr, signature} = await _getWxConfig()
export default async function share(wxConfigStr, option, cb) {
  // console.log(option)
  // console.log(wxConfigStr)
  let {appId, timestamp, nonceStr, signature} = typeof wxConfigStr === 'string' ? evil(wxConfigStr.split("(")[1].split(")")[0]) : {...wxConfigStr}
  // console.log(shareText[random])
  wx.config({
    debug: false,
    appId: appId, // appId
    timestamp: timestamp, // 时间戳
    nonceStr: nonceStr, // 加密需要字符串(自己定义的) 
    signature: signature, // sha1加密后字符串
    jsApiList: [
      'onMenuShareTimeline', 
      'onMenuShareAppMessage', 
      'onMenuShareQQ', 
      'onMenuShareQZone',
      // 'checkJsApi',
      // 'hideMenuItems',
      // 'showMenuItems',
      // 'hideAllNonBaseMenuItem',
      // 'showAllNonBaseMenuItem',
      // 'getNetworkType',
      // 'openLocation',
      // 'getLocation',
      // 'hideOptionMenu',
      // 'showOptionMenu',
      // 'closeWindow'
    ]
  })
  wx.ready( () => {
    // const title = option.title // 分享标题
    // const desc = option.desc // 分享描述
    // const link = option.link // 分享链接
    // const imgUrl = option.imgUrl // 分享图标
    //分享到朋友圈"
    wx.onMenuShareTimeline({
      title: option.title, 
      desc: option.desc,
      link: option.link,
      imgUrl: option.imgUrl,
      success: () => {
        console.log('分享到朋友圈成功')
        cb&&cb()
      },
      cancel: () => {
        console.log('分享到朋友圈失败')
      }
    })
    //分享给朋友
    wx.onMenuShareAppMessage({
      title: option.title,
      desc: option.desc,
      link: option.link,
      imgUrl: option.imgUrl,
      success: () => {
        console.log('分享到朋友成功')
        cb&&cb()
      },
      cancel: () => {
        console.log('分享到朋友失败')
      }
    })
  })
  //分享到QQ
  wx.onMenuShareQQ({
    title: option.title,
    desc: option.desc,
    link: option.link,
    imgUrl: option.imgUrl,
    success: function () {
      // 用户确认分享后执行的回调函数
      cb&&cb()
    },
    cancel: function () {
      // 用户取消分享后执行的回调函数
      console.log('分享到QQ失败')
    }
  })

  wx.onMenuShareQZone({
    title: option.title,
    desc: option.desc,
    link: option.link,
    imgUrl: option.imgUrl,
    success: function () {
      // 用户确认分享后执行的回调函数
      cb&&cb()
    },
    cancel: function () {
      // 用户取消分享后执行的回调函数
      console.log('分享到QZone失败')
    }
  })
  
  wx.error((res) => {
    // this.$toast("微信验证失败")
    console.log('微信验证失败')
  })
}