import { getMessage, postMessage, patchMessage, deleteMessage } from '@/api/message'

const state = {
}

const mutations = {
}

const actions = {
  getMessage({ commit }, params) {
    return new Promise((resolve, reject) => {
      getMessage(params).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  postMessage({ commit }, params) {
    return new Promise((resolve, reject) => {
      postMessage(params).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // putMessage({ commit }, params) {
  //   return new Promise((resolve, reject) => {
  //     putMessage(params).then(res => {
  //       resolve(res)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  patchMessage({ commit }, params) {
    return new Promise((resolve, reject) => {
      patchMessage(params).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  deleteMessage({ commit }, params) {
    return new Promise((resolve, reject) => {
      deleteMessage(params).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
