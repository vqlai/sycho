<style lang="less" scoped>
// /deep/即将废弃，less不支持<<<，通过less声明变量来实现<<<深度选择器
@deep: ~'>>>'; 
@bg: #fff2cb;
@wth: 100px;
  .index{
     @{deep} .ant-carousel  {
      width: 100%;
      .slick-slide{
        text-align: center;
        height: 160px;
        line-height: 160px;
        background: #364d79;
        overflow: hidden;
         h3 {
          color: #fff;
        }
      }
    }
    // @{deep} .ant-list{
    //   .ant-list-item-extra-wrap{
    //     flex-direction: row-reverse;
    //     .ant-list-item-extra{
    //       margin: 0 50px 0 0;
    //     }
    //     .ant-list-item-main{
    //       display: flex;
    //       flex-direction: column;
    //       justify-content: center;
    //       align-items: flex-start;
    //     }
    //   }
    // }
  }
</style>

<template>
  <section class="index">
    <client-only>
      <a-carousel autoplay style="width: 860px;margin: 0 auto;">
        <div><h3>welcome to sycho</h3></div>
        <div><h3>精彩绝伦</h3></div>
        <div><h3>无与伦比</h3></div>
        <div><h3>闪爆你的eyes...</h3></div>
      </a-carousel>
    </client-only>
    <a-divider dashed>热门文章</a-divider>
    <articleList :articleList="articleList" @onPagination="onPagination"></articleList>
  </section>
</template>

<script>
// import axios from 'axios'
// import axios from '~/plugins/axios' 
// 因为nuxt配置文件注册了axios，所以可以直接this.$axios获取到axios对象，无需import，
// 但在asyncDate没有this对象，通过context全局变量来代替
// const listData = []
// for (let i = 0; i < 23; i++) {
//   listData.push({
//     href: 'https://vue.ant.design/',
//     title: `ant design vue part ${i}`,
//     avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
//     description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
//     content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
//   })
// }
import articleList from '~/components/articleList'
export default {
  name: 'Index',
  head () {
    return {
      title: 'sycho-首页',
      meta: [
        { hid: 'books custom title', name: 'books', content: 'books custom title description' }
      ]
    }
  },

  // 在asyncData中，不能直接使用this引用，这里引入context是上下文参数，代替了this，
  // 因为在asyncData方法是在组件初始化时调用，所以没法通过this来引用组件实例对象。
  // 不写全路径也是走代理请求，写全路径则不会
  // asyncData ({app}) {   
  //   return app.$axios.$get('https://app.sycho.cn/api/getLink?currentPage=1&pageSize=10')
  //   // return app.$axios.$get("/article?currentPage=1&pageSize=10")
  //   .then((res) => {
  //     // console.log(res)
  //     // console.log(111)
  //     // callback(null, { title: res.data.title })
  //     return { aData: res.data }
  //   }).catch((e) => {
  //     // error({ statusCode: 404, message: 'Post not found' })
  //     console.log(e)
  //   })
  // },

  fetch ({ store, params }) {
    return store.dispatch('article/getArticle', { currentPage: this.currentPage, pageSize: this.pageSize })
    // return Promise.all([
    //   store.dispatch('article/getArticle', { currentPage: 1, pageSize: 10 }),
    //   store.dispatch('getArticle', { currentPage: 1, pageSize: 10 })
    // ])
  },

  // 注意eslint规则，components属性要在data后面，但asyncData属性可以再components属性前 
  components: {
    articleList
  },

  data () {
    return {
      currentPage: 1,
      pageSize: 10
      // listData,
      // pagination: {
      //   onChange: (page) => {
      //     console.log(page);
      //   },
      //   pageSize: 5,
      // },
      // actions: [
      //   { type: 'star-o', text: '156' },
      //   { type: 'like-o', text: '156' },
      //   { type: 'message', text: '2' },
      // ],
      // foo: 'bar',
      // current: ['mail'],
    }
  },
  computed: {
    articleList() {
      console.log(this.$store.state.article.articleList)
      return this.$store.state.article.articleList
    },
    // pagination() {
    //   return {
    //     onChange: (page) => {
    //       console.log(page)
    //       this.$store.dispatch('article/getArticle', { currentPage: page, pageSize: 10 })
    //     },
    //     pageSize: 10,
    //     total: this.$store.state.article.articleList.pagination.total
    //   }
    // },
    // artTest() {
    //   return this.$store.state.art
    // }
  },
  mounted: function () {
    this.$nextTick(()=>{
      // this.$message.info('welcome to sycho')
      this.$notification.open({
        message: 'halo gays',
        description: 'welcome to the sycho',
        // icon: <a-icon type="smile" style="color: #108ee9" />,
      })
      // console.log(this.aData)
      // console.log(this.$store)
      // 没写全路径无论测试环境还是正式环境都会走代理方式请求后台接口
      // this.$axios.$get("/article?currentPage=1&pageSize=10").then(res=>{
      //   console.log(res)
      // })
      // console.log(this.artTest)
      
    })
  },
  methods: {
    // gotoDetail(article) {
    //   console.log(article)
    //   this.$router.push(`/article/${article.id}`)
    // },
    onPagination(page) {
      this.$store.dispatch('article/getArticle', { currentPage: page, pageSize: this.pageSize })
    }
  }
}
</script>

