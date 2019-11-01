/*
* 设置setLocalStorage
* */
export function setLocalStorage (key, value) {
  window.localStorage.setItem(key, window.JSON.stringify(value))
}
/*
* 获取getLocalStorage
* */
export function getLocalStorage (key) {
  return window.JSON.parse(window.localStorage.getItem(key) || '[]')
}
/*
* 设置setSessionStorage
* */
export function setSessionStorage (key, value) {
  window.sessionStorage.setItem(key, window.JSON.stringify(value))
}
/*
* 获取getSessionStorage
* */
export function getSessionStorage (key) {
  return window.JSON.parse(window.sessionStorage.getItem(key) || '[]')
}