import ax from '~/server/ax.js'

// export const link = async (store, params) => {
//   return await ax.get('/api/getLink', params)
// }

const actions = {
  async link(state , params) {
    return await ax.get('/api/getLink', params)
  }
}

export default actions