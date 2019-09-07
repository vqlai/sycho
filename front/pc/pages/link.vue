<style lang="less" scoped>
  .link{
    .ant-tag{
      font-size: 14px;
      border: 0;
      background-color: #fff;
    }
  }
</style>
<template>
  <div class="link container">
    <!-- <ul>
      <li v-for="(item,index) in link.list" :key="index">name:{{ item.name }},url:{{ item.url }}</li>
    </ul> -->
    <!-- <nuxt-link v-for="(item,index) in link.list" :key="index" :to="'https://'+item.url" tag="a" class="item">{{ item.name }}</nuxt-link> -->
    <div v-for="(item,index) in link" :key="index">
      <a-divider orientation="left">{{item[0].desc}}</a-divider>
      <a-tag v-for="(i, j) in item" :key="j">
        <a :href="'https://'+i.url" target="_blank">{{ i.name }}</a>
      </a-tag>
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
      return store.dispatch('link/getLink', { currentPage: 1, pageSize: 100 })
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
        let obj = {}
        for(let item of this.$store.state.link.link.list){
          if(typeof obj[item.type] === 'undefined'){
            obj[item.type] = []
          }
          obj[item.type].push(item)
        }
        return obj
        // return this.$store.state.link.link.list
      },
    },
    mounted: function () {
      console.log(this.resData)
    }
  }
</script>