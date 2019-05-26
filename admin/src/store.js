import Vue from 'vue'
import Vuex from 'vuex'
import { login, logout, getUserInfo, getUser, postUser, putUser, deleteUser } from '@/api/user'
import { getLink, postLink, putLink, deleteLink } from '@/api/link'
import { getArticleById, getArticle, postArticle, patchArticle, putArticle, deleteArticle, uploadArticlePics, removeArticlePics } from '@/api/article'
import { getCommentById, getComment, postComment, putComment, deleteComment } from '@/api/comment'
// putMessage
import { getMessage, postMessage, patchMessage, deleteMessage } from '@/api/message'
import { getToken, setToken, removeToken } from '@/assets/js/auth'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    sidebar: {
      opened: !+localStorage.getItem('sidebarStatus'),
      withoutAnimation: false
    },
    device: 'desktop',
    token: getToken(), // 每次登录会更新，每次拿token会从localstroge里取出
    name: '',
    avatar: '',
    role: '',
    desc: ''
  },
  getters: {
    sidebar: state => state.sidebar,
    device: state => state.device,
    token: state => state.token,
    avatar: state => state.avatar,
    name: state => state.name,
    role: state => state.role,
    desc: state => state.desc
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        localStorage.setItem('sidebarStatus', 1)
      } else {
        localStorage.setItem('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      localStorage.setItem('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLE: (state, role) => {
      state.role = role
    },
    SET_DESC: (state, desc) => {
      state.desc = desc
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    CloseSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    ToggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        // (username, userInfo.password)
        // debugger
        login({ username: username, password: userInfo.password }).then(res => {
          // const data = response.data
          // const data = response
          // console.log(res)
          // setToken(data.token) // 把token存在cookie
          // commit('SET_TOKEN', data.token) // token也存在vuex
          // resolve(data)
          // const result = res.data
          if (res.success){
            setToken(res.data.token) // 把token存在cookie
            commit('SET_TOKEN', res.data.token)
          }
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        // state.token
        getUserInfo().then(res => {
          // const data = response.data
          // if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
          //   commit('SET_ROLES', data.roles)
          // } else {
          //   // eslint-disable-next-line prefer-promise-reject-errors
          //   reject('getInfo: roles must be a non-null array !')
          // }
          // commit('SET_NAME', data.name)
          // commit('SET_AVATAR', data.avatar)
          // resolve(response)
          console.log(res)
          if (res.success) {
            commit('SET_NAME', res.data.username)
            commit('SET_ROLE', res.data.role)
            commit('SET_DESC', res.data.desc)
            commit('SET_AVATAR', res.data.avatar)
          }else{
            // eslint-disable-next-line prefer-promise-reject-errors
            reject('getUserInfo: user must be a non-null object !')
          }
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    GetArticleById({ commit }, params) {
      return new Promise((resolve, reject) => {
        getArticleById(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    GetArticle({ commit }, params) {
      return new Promise((resolve, reject) => {
        getArticle(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    PostArticle({ commit }, params) {
      return new Promise((resolve, reject) => {
        postArticle(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    PatchArticle({ commit }, params) {
      return new Promise((resolve, reject) => {
        patchArticle(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    PutArticle({ commit }, params) {
      return new Promise((resolve, reject) => {
        putArticle(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    DeleteArticle({ commit }, params) {
      return new Promise((resolve, reject) => {
        deleteArticle(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 批量上传文章图片
    UploadArticlePics({ commit }, params) {
      return new Promise((resolve, reject) => {
        uploadArticlePics(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 删除文章图片
    RemoveArticlePics({ commit }, params) {
      return new Promise((resolve, reject) => {
        removeArticlePics(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    GetLink({ commit }, params) {
      return new Promise((resolve, reject) => {
        getLink(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    PostLink({ commit }, params) {
      return new Promise((resolve, reject) => {
        postLink(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    PutLink({ commit }, params) {
      return new Promise((resolve, reject) => {
        putLink(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    DeleteLink({ commit }, params) {
      return new Promise((resolve, reject) => {
        deleteLink(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    GetUser({ commit }, params) {
      return new Promise((resolve, reject) => {
        getUser(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    PostUser({ commit }, params) {
      return new Promise((resolve, reject) => {
        postUser(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    PutUser({ commit }, params) {
      return new Promise((resolve, reject) => {
        putUser(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    DeleteUser({ commit }, params) {
      return new Promise((resolve, reject) => {
        deleteUser(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    GetMessage({ commit }, params) {
      return new Promise((resolve, reject) => {
        getMessage(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    PostMessage({ commit }, params) {
      return new Promise((resolve, reject) => {
        postMessage(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // PutMessage({ commit }, params) {
    //   return new Promise((resolve, reject) => {
    //     putMessage(params).then(res => {
    //       resolve(res)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    PatchMessage({ commit }, params) {
      return new Promise((resolve, reject) => {
        patchMessage(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    DeleteMessage({ commit }, params) {
      return new Promise((resolve, reject) => {
        deleteMessage(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    GetCommentById({ commit }, params) {
      return new Promise((resolve, reject) => {
        getCommentById(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    GetComment({ commit }, params) {
      return new Promise((resolve, reject) => {
        getComment(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    PostComment({ commit }, params) {
      return new Promise((resolve, reject) => {
        postComment(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    PutComment({ commit }, params) {
      return new Promise((resolve, reject) => {
        putComment(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    DeleteComment({ commit }, params) {
      return new Promise((resolve, reject) => {
        deleteComment(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出 废弃（jwt无需服务端退出，前端清空token即可）
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
})

export default store
