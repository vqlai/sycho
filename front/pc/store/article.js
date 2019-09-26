// 文章管理器
export const state = () => ({
  // vue页面访问this.$store.state.article.articleList
  articleList: null,
  articleHotList: null,
  article: null
})

export const getters = {

}

export const mutations = {
  SET_ARTICLE_List(state, data) {
    state.articleList = data
  },
  SET_HOT_ARTICLE_List(state, data) {
    state.articleHotList = data
  },
  SET_ARTICLE(state, data) {
    state.article = data
  }
}

export const actions = {
  getArticle({ commit }, params) {
    // console.log(params)
    return this.$axios.$get('/article', { params })
      .then(response => {
        // console.log(response)
        commit('SET_ARTICLE_List', response.data || {})
      })
  },
  getHotArticle({ commit }, params) {
    console.info('getHotArticle', params)
    return this.$axios.$get('/article', { params })
      .then(response => {
        console.log(response)
        commit('SET_HOT_ARTICLE_List', response.data || {})
      })
  },
  getArticleById({ commit }, params) {
    // console.info('getArticleById', params)
    return this.$axios.$get(`/article2/${params.id}`)
      .then(response => {
        // console.log(response)
        commit('SET_ARTICLE', response.data || {})
      })
  }
}