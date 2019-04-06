/* 公共解析器 */
// 请求失败，一般是数据验证失败
exports.handleError = ({ ctx, msg = '请求失败', error = null }) => {
	ctx.body = { code: 0, success: false, msg, error }
}
// 请求成功
exports.handleSuccess = ({ ctx, msg = '请求成功', data = null }) => {
	ctx.response.body = { code: 1, success: true, msg, data }
}