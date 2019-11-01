// 验证手机号
export function checkPhone(phone){
  return /^1[3456789][0-9]{9}$/.test(phone)
}

// 验证密码 
export function checkPassword(pwd){
  return /^[A-Za-z0-9_.~!@#$%^&*]{6,20}/.test(pwd) // 匹配6-20位的密码
  // return /^[A-Za-z0-9.~!@#$%^&*]+$/.test(pwd) // 匹配任意长度的密码
}

// 验证短信验证码，4位数字
export function checkMsgCode(code){
  return /[\d]{4}/.test(code)
}

// 验证图形验证码
export function checkImgCode(code){
  return /^[A-Za-z0-9]{4}/.test(code) // 匹配4位图形验证码
  // return /^[A-Za-z0-9]+$/.test(code) // 匹配任意长度的图形验证码
}

// 验证人名，只能是中文或英文
export function checkName(name){
  return /^[\u4E00-\u9FA5A-Za-z]+$/.test(name)
}

// 验证数字
export function checkNumber(num){
  return /^[0-9]*$/.test(num)
}