import { getArticleById, getArticle, postArticle, patchArticle, putArticle, deleteArticle, uploadArticlePics, removeArticlePics } from '@/api/article'

const state = {
}

const mutations = {
}

const actions = {
  getArticleById({ commit }, params) {
    return new Promise((resolve, reject) => {
      getArticleById(params).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  getArticle({ commit }, params) {
    return new Promise((resolve, reject) => {
      getArticle(params).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  postArticle({ commit }, params) {
    return new Promise((resolve, reject) => {
      postArticle(params).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  patchArticle({ commit }, params) {
    return new Promise((resolve, reject) => {
      patchArticle(params).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  putArticle({ commit }, params) {
    return new Promise((resolve, reject) => {
      putArticle(params).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  deleteArticle({ commit }, params) {
    return new Promise((resolve, reject) => {
      deleteArticle(params).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 批量上传文章图片
  uploadArticlePics({ commit }, params) {
    return new Promise((resolve, reject) => {
      uploadArticlePics(params).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除文章图片
  removeArticlePics({ commit }, params) {
    return new Promise((resolve, reject) => {
      removeArticlePics(params).then(res => {
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
