// import ax from '~/server/ax.js'
// import axios from 'axios'

// export const link = async (store, params) => {
//   return await ax.get('/api/getLink', params)
// }

const actions = {
  async link(state , params) {
    console.log(222)
    return await this.$axios.$get('https://app.sycho.cn/api/getLink', params)
  }
}

export default actions