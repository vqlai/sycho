// 留言管理器
export const state = () => ({
  // vue页面访问this.$store.state.message.messageList
  messageList: null
})

export const getters = {

}

export const mutations = {
  SET_MESSAGE_List(state, data) {
    state.messageList = data
  }
}

export const actions = {
  getMessage({ commit }, params) {
    console.log(params)
    return this.$axios.$get('/message', { params })
      .then(response => {
        console.log(response)
        commit('SET_MESSAGE_List', response.data || {})
      })
  }
}