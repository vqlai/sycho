/**
 * Created by laiweiqiang on 2019/04/26
 */
// 格式化自定义异常返回信息
const format = (success = false, code = 0, msg = 'ok', data = null) => {
  return data ? { success, code, msg, data } : { success, code, msg }
}

module.exports = { format }