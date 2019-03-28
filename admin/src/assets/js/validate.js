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
