import { getSts } from '@/api/cos'

const state = {
}

const mutations = {
}

const actions = {
  getSts({ commit }, params) {
    return new Promise((resolve, reject) => {
      getSts(params).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}