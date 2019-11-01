export default {
  math: {
    add (a, b, accuracy) {
      const result = Number(a) + Number(b)
      return accuracy ? Number(result.toFixed(accuracy)) : result
    },
    sub (a, b, accuracy) {
      const result = Number(a) - Number(b)
      return accuracy ? Number(result.toFixed(accuracy)) : result
    },
    multiply (a, b, accuracy) {
      const result = Number(a) * Number(b)
      return accuracy ? Number(result.toFixed(accuracy)) : result
    },
    divide (a, b, accuracy) {
      const result = Number(a) / Number(b)
      return accuracy ? Number(result.toFixed(accuracy)) : result
    }
  },
  /**
   * 获取参数的类型
   * @method type
   * @param  {any}    varibale 需要获取类型的变量
   * @return {String}          类型，可以为'String'、'Number'、'Array'、'Object'、
   *                                     'Null'、'Undefined'、'Function'、'RegExp'
   */
  type (varibale) {
    let varType = Object.prototype.toString.call(varibale).slice(8, -1)
    if (varType === 'Number' && isNaN(varibale)) {
      varType = 'NaN'
    }
    return varType
  },
  /**
   * 日期格式化
   * @param  {Date}   dateStr     日期
   * @param  {String} format      格式
   * @return {String}             格式化日期
   */
  dateFormat (dateStr, format) {
    let result = dateStr
    if (format !== undefined) {
      const date = new Date(dateStr)
      const map = {
        M: date.getMonth() + 1, // 月份
        d: date.getDate(), // 日
        H: date.getHours(), // 小时
        m: date.getMinutes(), // 分
        s: date.getSeconds(), // 秒
        q: Math.floor((date.getMonth() + 3) / 3), // 季度
        S: date.getMilliseconds() // 毫秒
      }
      result = format.replace(/([yMdHmsqS])+/g, (all, t) => {
        let v = map[t]
        if (v !== undefined) {
          if (all.length > 1) {
            v = `0${v}`
            v = v.substr(v.length - 2)
          }
          return v
        } else if (t === 'y') {
          return (date.getFullYear().toString()).substr(4 - all.length)
        }
        return all
      })
    }
    return result
  },
  /**
   * 数字转换成日期时间
   * @method dateCountByNumber
   * @param  {Number}          number 数字
   * @return {String}                 日期时间字符串
   */
  dateCountByNumber (number, accuracy = 4) {
    let divider = number
    let days = 0
    let hours = 0
    let minutes = 0
    let seconds = 0
    // 日
    days = Math.floor(divider / 86400)
    if (divider % 86400 > 0 && accuracy === 1) days += 1 // 如果精确到天，向上取整
    divider = (days === 0) ? number : number % (86400 * days)
    // 小时
    if (accuracy >= 2) {
      hours = Math.floor(divider / 3600)
      if (divider % 3600 > 0 && accuracy === 2) hours += 1 // 如果精确到小时，向上取整
      divider = (days === 0 && hours === 0) ? number : number % (86400 * days + 3600 * hours)
    }
    // 分钟
    if (accuracy >= 3) {
      minutes = Math.floor(divider / 60)
      if (divider % 60 > 0 && accuracy === 3) minutes += 1 // 如果精确到分钟，向上取整
    }
    // 秒
    if (accuracy >= 4) {
      seconds = (days === 0 && hours === 0 && minutes === 0)
        ? number : number % (86400 * days + 3600 * hours + 60 * minutes)
    }
    // 拼接字符串
    const dayStr = `${days > 0 ? `${days}天` : ''}`
    const hourStr = `${hours > 0 ? `${hours}小时` : ''}`
    const minuteStr = `${minutes > 0 ? `${minutes}分钟` : ''}`
    const secondStr = `${seconds > 0 ? `${seconds}秒` : ''}`
    // 组装结果
    let result = ''
    let patternNum = 0
    const strs = [dayStr, hourStr, minuteStr, secondStr]
    strs.forEach((str) => {
      if (patternNum < accuracy && str) {
        result += str
      }
      patternNum += 1
    })
    return result
  },
  /**
   * 获取GET参数
   * @method getQueryParams
   * @param  {String}       name 参数名称
   * @return {String|Null}       参数数据
   */
  getQueryParams (name) {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
    const r = window.location.search.substr(1).match(reg)
    if (r != null) {
      return unescape(r[2])
    }
    return null
  },
  /**
   * 获取一个范围的数组
   * @method range
   * @param  {Number} start 起始数字
   * @param  {Number} end   结束数字
   * @return {Array}        范围数组
   */
  range (start, end) {
    const result = []
    if (typeof start === 'number' && typeof end === 'number' && start <= end) {
      for (let i = start; i <= end; i += 1) {
        result.push(i)
      }
    }
    return result
  },
  /**
   * 横线链接转驼峰
   * @method toCamelCase
   * @param  {String}    str 待转换字符串
   * @return {String}        转换后的字符串
   */
  toCamelCase (str) {
    return str.replace(/-(\w)/g, (all, letter) => letter.toUpperCase())
  },
  /**
   * 计算屏幕尺寸
   * @method getScreenSize
   * @return {String}      屏幕尺寸
   */
  getScreenSize () {
    let size = 'large'
    if (window.innerWidth <= 1280 || window.innerHeight <= 800) {
      size = 'medium'
    }
    return size
  },
  /**
   * 获取页面路径中的GET参数
   * @method getSearchParams
   * @return {Object}        参数对象
   */
  getSearchParams (key) {
    const path = location.pathname
    const result = null
    if (path && typeof key === 'string') {
      const reg = new RegExp(`/${key}/\\d+`)
      const matchResult = path.match(reg)
      if (matchResult) {
        return matchResult[0].split(`/${key}/`)[1]
      }
    }
    return result
  },
  /**
   * 浏览器厂商
   * @method userAgent
   * @return {String}  厂商名称
   */
  userAgent () {
    const userAgent = window.navigator.userAgent
    if (userAgent.match(/opera/ig)) {
      return 'opera'
    } else if (userAgent.match(/firefox/ig)) {
      return 'firefox'
    } else if (userAgent.match(/chrome/ig)) {
      return 'chrome'
    } else if (userAgent.match(/safari/ig)) {
      return 'safari'
    }
    return 'unknown'
  },
  /**
   * 获取cookie
   * @method getCookie
   * @param  {String}  name cookie名称
   * @return {String|Null}       cookie的值
   */
  getCookie (name) {
    let result = null
    const cookie = document.cookie
    if (cookie && cookie.indexOf(name) >= 0) {
      const cookies = cookie.split('&')
      cookies.forEach((item) => {
        if (item.indexOf(name) >= 0) {
          result = item.split('=')[1]
        }
      })
    }
    return result
  }
}

// 截取url参数
// var urlParams = new URLSearchParams('?post=1234&action=edit');
// console.log(urlParams.get('action')); // "edit"