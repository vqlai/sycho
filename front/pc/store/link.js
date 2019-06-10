// 链接管理器
export const state = () => ({
  // vue页面访问this.$store.state.article.articleRes
  link: null
})

export const getters = {

}

export const mutations = {
  SET_Link(state, data) {
    state.link = data
  }
}

export const actions = {
  getLink({ commit }, params) {
    console.log(params)
    return this.$axios.$get('/link', { params })
      .then(response => {
        console.log(response)
        commit('SET_Link', response.data || {})
      })
  }
}