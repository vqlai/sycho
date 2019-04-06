import Vue from 'vue'
import Vuex from 'vuex'
import { login, logout, GetUserInfo, addUser } from '@/api/login'
import { getLink, addLink, editLink, deleteLink } from '@/api/link'
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
        login({ username: username, password: userInfo.password }).then(response => {
          const data = response.data
          console.log(data)
          setToken(data.token) // 把token存在cookie
          commit('SET_TOKEN', data.token) // token也存在vuex
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        // state.token
        GetUserInfo().then(res => {
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

    GetLink({ commit }, params) {
      return new Promise((resolve, reject) => {
        getLink(params).then(res => {
          console.log(res)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    AddLink({ commit }, params) {
      return new Promise((resolve, reject) => {
        addLink(params).then(res => {
          console.log(res)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    EditLink({ commit }, params) {
      return new Promise((resolve, reject) => {
        editLink(params).then(res => {
          console.log(res)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    DeleteLink({ commit }, params) {
      return new Promise((resolve, reject) => {
        deleteLink(params).then(res => {
          console.log(res)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    AddUser({ commit }, params) {
      return new Promise((resolve, reject) => {
        addUser(params).then(res => {
          console.log(res)
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
