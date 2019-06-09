<template>
  <div class="link container">
    导航
    <!-- <ul>
      <li v-for="(item,index) in resData.list" :key="index">name:{{ item.name }},address:{{ item.address }}</li>
    </ul> -->
  </div>
</template>

<script>
  export default {
    name: 'Link',
    // asyncData ({app}) {
    //   return app.$axios.$get('https://app.sycho.cn/api/getLink?currentPage=1&pageSize=10')
    //   .then((res) => {
    //     console.log(res)
    //     // callback(null, { title: res.data.title })
    //     return { resData: res.data }
    //   })
    //   .catch((e) => {
    //     // error({ statusCode: 404, message: 'Post not found' })
    //     console.log(e)
    //   })
    // },
    mounted: function () {
      console.log(this.resData)
    }
  }
</script>

<style lang="less" scoped>

</style>