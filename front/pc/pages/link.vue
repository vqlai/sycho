<template>
  <div class="link container">
    导航
    <ul>
      <li v-for="(item,index) in link.list" :key="index">name:{{ item.name }},url:{{ item.url }}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Link',
    head(){
      return { title: '导航|Link' }
    },
    // fetch用来获取SSR数据，其他事件交互数据直接调用axios发起请求即可
    fetch ({ store, params }) {
      return store.dispatch('link/getLink', { currentPage: 1, pageSize: 10 })
    },
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
    computed: {
      link() {
        // let obj = {}
        // for(let item of this.$store.state.link.link){
        //   if(item.type == 1){

        //   }
        // }
        return this.$store.state.link.link
      },
    },
    mounted: function () {
      console.log(this.resData)
    }
  }
</script>

<style lang="less" scoped>

</style>