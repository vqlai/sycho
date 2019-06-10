// Classic mode for store / is deprecated and will be removed in Nuxt 3.
// 最新版的nuxt无需再引用和初始化vue/vuex，已经自动配置了
// store的index里定义的状态，函数，直接通过this.$store.state访问
// 其他js定义的状态，访问需要加上该文件名this.$store.state.article.articleRes
export const state = () => ({
  // 列表文章
  // art: {
  //   pagination: {},
  //   list: []
  // },
  art: null
})
export const getters = {
}
export const mutations = {
  SET_ART(state, data) {
    state.art = data
  },
}
export const actions = {
  //TODO ajax here
  async getArticle({ commit }, params) {
    // return new Promise((resolve, reject) => {
    //   service.getArticle(params).then(res => {
    //     resolve(res)
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
    // let res = await service.getArticle(params)
    // console.log(params)
    let res = await this.$axios.$get('/article',params)
    console.log(res)
    commit( 'SET_ART', res )
    // return this.$axios.$get('/article')
    //   .then(response => { 
    //     console.log(response)
    //     commit('SET_ART', response) 
    //   })
  }
}