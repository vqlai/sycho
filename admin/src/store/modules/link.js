import { getLink, postLink, putLink, deleteLink } from '@/api/link'

const state = {
}

const mutations = {
}

const actions = {
  getLink({ commit }, params) {
    return new Promise((resolve, reject) => {
      getLink(params).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  postLink({ commit }, params) {
    return new Promise((resolve, reject) => {
      postLink(params).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  putLink({ commit }, params) {
    return new Promise((resolve, reject) => {
      putLink(params).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  deleteLink({ commit }, params) {
    return new Promise((resolve, reject) => {
      deleteLink(params).then(res => {
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
