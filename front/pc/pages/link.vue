<template>
  <div class="link container">
    导航
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'Link',
    asyncData () {
      return axios.get('http://app.sycho.cn/api/getLink?currentPage=1&pageSize=10')
      .then((res) => {
        console.log(res)
        // callback(null, { title: res.data.title })
        return { data: res.data }
      })
      .catch((e) => {
        // error({ statusCode: 404, message: 'Post not found' })
        console.log(e)
      })
    },
  }
</script>

<style lang="less" scoped>

</style>