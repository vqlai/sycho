// 文章管理器
export const state = () => ({
  // vue页面访问this.$store.state.article.articleRes
  articleRes: null
})

export const getters = {

}

export const mutations = {
  SET_ARTICLE_RES(state, data) {
    state.articleRes = data
  }
}

export const actions = {
  getArticle({ commit }, params) {
    console.log(params)
    return this.$axios.$get('/article', { params })
      .then(response => {
        console.log(response)
        commit('SET_ARTICLE_RES', response.data || {})
      })
  }
}