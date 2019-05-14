/**
 * Created by sycholai on 19/03/27.
 */

export function isvalidUsername (str) {
  const validMap = ['admin', 'editor']
  return validMap.indexOf(str.trim()) >= 0
}

// 验证https链接
export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function checkEmail(val) {
  // eslint-disable-next-line no-useless-escape
  let pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
  let domains = ['qq.com', '163.com', 'vip.163.com', '263.net', 'yeah.net', 'sohu.com', 'sina.cn', 'sina.com', 'eyou.com', 'gmail.com', 'hotmail.com', '42du.cn']
  if (pattern.test(val)) {
    let domain = val.substring(val.indexOf('@') + 1)
    for (let i = 0; i < domains.length; i++) {
      if (domain === domains[i]) {
        return true
      }
    }
  }
  return false
}