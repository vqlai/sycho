// import Vue from 'vue'
// import Vuex from 'vuex'
// import state from './state'
// import * as mutations from './mutations'
// import * as actions from './actions'

// Vue.use(Vuex)

// const store = () => new Vuex.Store({
//   state,
//   mutations,
//   actions
// })

// export default store

import Vue from 'vue'
import Vuex from 'vuex'
// import ax from '~/server/ax.js'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    userPhone: '',
    userName: '',
    homeResData: {},
    couponList: [],
    ngHomeData: {}
  },
  getters: {
    userPhonenext: state => state.userPhone + 1,
    userNamenext: state => state.userName + 1,
  },
  mutations: {
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
  },
  actions: {
    updateUser({ commit, state }, params) {
      commit('SET_USER_PHONE', '17727989230' + params)
      commit('SET_USER_NAME', 'cisco lai')
    },
    updateUser2(context, params) {
      context.commit('SET_USER_PHONE', '17727989230' + params)
      context.commit('SET_USER_NAME', 'cisco lai' + params)
    },
    async link(state, params) {
      return await this.$axios.$get('https://app.sycho.cn/api/getLink', params)
    }
  }
})

export default store