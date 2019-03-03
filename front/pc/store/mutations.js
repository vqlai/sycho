const mutations = {
  SET_USER_PHONE(state, phone) {
    state.userPhone = phone
  },
  SET_USER_NAME(state, name) {
    state.userName = name
  },
  SET_HOME_RES_DATA(state, data) {
    state.homeResData = data
  },
  SET_COUPON_LIST(state, data) {
    state.couponList = data
  },
  // 内购首页数据
  SET_NG_HOME_DATA(state, data) {
    state.ngHomeData = data
  }
}

export default mutations