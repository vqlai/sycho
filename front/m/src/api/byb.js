import req from './request.js'

// let baseUrl= 'http://172.16.250.53:8081'
let baseUrl = ''
// 初始化
export async function getInitRun(params) {
  return await req({
    url: `${baseUrl}/mall/runway/initialization.ihtml`,
    method: 'get',
    params: { ...params }
  })
}

// 注册
export async function logAndReg(data) {
  return await req({
    url: `${baseUrl}/mall/runway/activityMobileRegister.ihtml`,
    method: 'post',
    data: { ...data }
  })
}

// 发短信
export async function getMsgCode(params) {
  return await req({
    url: `${baseUrl}/mall/runway/sendSmsCode.ihtml`,
    method: 'get',
    params: { ...params }
  })
}

// 去跑步
export async function gotoRun(params) {
  return await req({
    url: `${baseUrl}/mall/runway/goRun.ihtml`,
    method: 'get',
    params: { ...params }
  })
}

// 积分兑换
export async function exchangePoint(params) {
  return await req({
    url: `${baseUrl}/mall/runway/getIntegralSteps.ihtml`,
    method: 'get',
    params: { ...params }
  })
}

// 骰子步数
export async function getDiceCount(params) {
  return await req({
    url: `${baseUrl}/mall/runway/getdiceSteps.ihtml`,
    method: 'get',
    params: { ...params }
  })
}

// 获取排行榜列表
export async function getRankList(params) {
  return await req({
    url: `${baseUrl}/mall/runway/rankingList.ihtml`,
    method: 'get',
    params: { ...params }
  })
}

// 我的奖品
export async function getMyPrize(params) {
  return await req({
    url: `${baseUrl}/mall/runway/myPrizeList.ihtml`,
    method: 'get',
    params: { ...params }
  })
}

// 下单抽奖
// 初始化
export async function getInitData(params) {
  params.id = 10001
  return await req({
    url: '/mall/activity/initData.ihtml',
    merhod: 'get',
    params: { ...params }
  })
}

// 抽奖
export async function luckyDraw(params) {
  params.id = 10001
  return await req({
    url: '/mall/activity/luckyDraw.ihtml',
    method: 'get',
    params: { ...params }
  })
}

// 填写收货地址
export async function addAddress(data) {
  data.id = 10001
  return await req({
    url: '/mall/activity/fillAddress.ihtml',
    method: 'post',
    data: { ...data }
  })
}

// 我的奖品
export async function getPrizeList(params) {
  params.id = 10001
  return await req({
    url: '/mall/activity/myLuckDraw.ihtml',
    method: 'get',
    params: { ...params }
  })
}

// 获取中奖信息
export async function getPrizePerson(params) {
  return await req({
    url: '/mall/commonarea/getRedisConfigData.ihtml',
    method: 'get',
    params: { ...params }
  })
}