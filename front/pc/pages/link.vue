<template>
  <div class="link container">
    <!-- <ul>
      <li v-for="(item,index) in link.list" :key="index">name:{{ item.name }},url:{{ item.url }}</li>
    </ul> -->
    <!-- <nuxt-link v-for="(item,index) in link.list" :key="index" :to="'https://'+item.url" tag="a" class="item">{{ item.name }}</nuxt-link> -->
    <div class="list">
      <a v-for="(item,index) in link.list" :key="index" :href="'https://'+item.url" target="_blank" class="item">{{ item.name }}</a>
    </div>
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
  .link{
    .list{
      display: flex;
      flex-wrap: wrap;
      .item{
        padding: 0 20px 20px;
      }
    }
  }
</style>