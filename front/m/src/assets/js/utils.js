// 检测移动端的设备信息
export const browser = {
  versions: function () {
    let u = navigator.userAgent, app = navigator.appVersion;
    //移动终端浏览器版本信息
    return {     
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
        iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        ios8: !!u.match(/OS [8]_\d[_\d]* like Mac OS X/), //ios8终端  支持不太好，容易闪退，提醒使用微信商城
        purcotton: !!u.match(/PurCotton/),//是否全棉App 2.1.1版本开始添加此参数
        purcottonAndroidVersion: !!u.match(/PurCotton\/[3-9].[9].[2]/),//是否全棉android版本
        // purcottonIosVersion: !!u.match(/PurCotton\/[3-9].[5-9]/),//是否全棉App IOS版本
        purcottonIosVersion: !!u.match(/PurCotton\/[3-9].[9].[2]/),//是否全棉App IOS版本
        purcottonLiveVersion: !!u.match(/PurCotton\/[3-9].[6-9]/),//全棉App3.6版本
     }
  }(),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

// 获取app在IOS安卓在url拼接token等参数
export function getAppParams(){
  let params = {}
  if(location.href.indexOf('?') != -1 && location.href.indexOf('#') != -1){
    let arr = location.href.slice(location.href.indexOf('?')+1,location.href.indexOf('#')).split('&')
    for(let item of arr){
      let temp = item.split('=')
      if(temp[0] == 'token' || temp[0] == 'uuid' || temp[0] == 'idfa'){
        params[temp[0]] = temp[1]
      }
    }
  }
  return params
}

// 当前宿主平台 兼容多平台应该通过一些特定函数来取得（app, m）
// export const HOST_PLATFORM = 'm' || location.hostname.split('.')[0]
export function getHostPlatform (type){
  if(process.env.NODE_ENV === 'development'){
    return type || 'm'
  }else if(process.env.NODE_ENV === 'production'){
    // 测试为m-test,app-test mp-test 正式为m app mp
    // let hostname = location.hostname.split('.')[0] 
    // hostname.indexOf('m') !== -1
    let hostName = location.hostname.split('.')[0]
    if(hostName == 'm'){
      return 'm'
    }else if(hostName == 'app'){
      return 'app'
    }else if(hostName == 'mp'){
      return 'mp'
    }else{
      console.log('未匹配到项目运行环境')
    }
  }
}

// type:1为login，2为register，用于m端
export function doLogReg(type, path = location.href){
  // let path = url || location.href
  // let { href, protocol, host, pathname, search, hash } = window.location
  // 解决微信分享后打开页面因微信添加的参数导致登录后无法跳转回指定页面
  if(path.includes('?from')){
    path = `${path.split('?')[0]}%23${path.split('#')[1]}`
  }else{
    path = path.replace('#', '%23')
  }
  if(type==1){
    // location.href = `${location.origin}/mobile/mall/memberLogin/toLogin.ihtml?urlPath=${path}`
    location.href = `${location.origin}/wap/login/index.html#/login?urlPath=${path}`
  }else{
    // location.href = `${location.origin}/mobile/mall/member/toRegister.ihtml?urlPath=${path}`
    location.href = `${location.origin}/wap/login/index.html#/Regester?urlPath=${path}`
  }
}

/**
 * 判断是否微信客户端
 */
export function isweixin() {
  const ua = window.navigator.userAgent.toLowerCase()
  return ua.match(/MicroMessenger/i) == 'micromessenger'
}

/**
 * 用于判断空，Undefined String Array Object
 */
export function isBlank(param) {
  var call = Object.prototype.toString.call(param);
  if (call === '[object Undefined]') { //空
    return true
  } else if (call === '[object String]' || call === '[object Array]') { //字条串或数组
    return param.length == 0 ? true : false
  } else if (call === '[object Object]') {
    return JSON.stringify(param) == '{}' ? true : false
  } else {
    return true
  }
}

/**
 * 时间倒计时
 * totalSeconds 剩余时间
 */
export function downTimeFun (totalSecond, callback) {
  var interval = setInterval(function () {
    // 秒数
    var second = totalSecond;

    // 天数位
    var day = Math.floor(second / 3600 / 24);
    var dayStr = day.toString();
    if (dayStr.length == 1) dayStr = '0' + dayStr;

    // 小时位
    var hr = Math.floor((second - day * 3600 * 24) / 3600);
    var hrStr = hr.toString();
    if (hrStr.length == 1) hrStr = '0' + hrStr;

    // 分钟位
    var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
    var minStr = min.toString();
    if (minStr.length == 1) minStr = '0' + minStr;

    // 秒位
    var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
    var secStr = parseInt(sec).toString();
    if (secStr.length == 1) secStr = '0' + secStr;

    var time = {
      d: dayStr,
      h: hrStr,
      m: minStr,
      s: secStr,
      interval: interval
    };
    totalSecond--;
    if (totalSecond < 0) {
      clearInterval(interval);
      time = {
        d: '00',
        h: '00',
        m: '00',
        s: '00',
        interval: interval
      };
      callback(false, time);
      return
    }
    callback(true, time);
  }.bind(this), 1000);
}
