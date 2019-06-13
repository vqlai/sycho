<template>
  <section class="index">
    <no-ssr>
      <a-carousel autoplay style="width: 910px;">
        <div><h3>welcome to sycho</h3></div>
        <div><h3>精彩绝伦</h3></div>
        <div><h3>无与伦比</h3></div>
        <div><h3>闪爆你的eyes...</h3></div>
      </a-carousel>
    </no-ssr>
    <a-list :pagination="pagination" :data-source="articleRes.list" item-layout="vertical" size="large" >
      <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
        <!-- <img slot="extra" width="272" alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"/> -->
        <!-- <img slot="extra" :src="item.thumb" width="272" alt="logo"/> -->
        <!-- <div style="width:272px;"><img :src="item.thumb" width="272" alt=""/></div> -->
        <!-- <a-list-item-meta :description="item.desc" >
          <a slot="title" :href="item.href">{{ item.title }}</a>
        </a-list-item-meta>
        {{ item.desc }}
        <template v-for="{type, text} in actions" slot="actions">
          <span :key="type">
            <a-icon :type="type" style="margin-right: 8px" />
            {{ text }}
          </span>
        </template> -->
        <a-row :gutter="16">
          <a-col class="gutter-row" :span="8">
            <img alt="logo" style="width: 100%;" :src="item.thumb"/>
          </a-col>
          <a-col class="gutter-row" :span="16">
            <header>{{ item.title }}</header>
            <section>{{ item.desc }}</section>
            <footer>
              <template v-for="{type, text} in actions">
                <span :key="type">
                  <a-icon :type="type" style="margin-right: 8px" />
                  {{ text }}
                </span>
              </template>
            </footer>
          </a-col>
        </a-row>
      </a-list-item>
    </a-list>
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
    return store.dispatch('article/getArticle', { currentPage: 1, pageSize: 1 })
    // return Promise.all([
    //   store.dispatch('article/getArticle', { currentPage: 1, pageSize: 10 }),
    //   store.dispatch('getArticle', { currentPage: 1, pageSize: 10 })
    // ])
  },

  // 注意eslint规则，components属性要在data后面，但asyncData属性可以再components属性前 
  components: {},

  data () {
    return { 
      // listData,
      // pagination: {
      //   onChange: (page) => {
      //     console.log(page);
      //   },
      //   pageSize: 5,
      // },
      actions: [
        { type: 'star-o', text: '156' },
        { type: 'like-o', text: '156' },
        { type: 'message', text: '2' },
      ],
      foo: 'bar',
      current: ['mail'],
    }
  },
  computed: {
    articleRes() {
      return this.$store.state.article.articleRes
    },
    pagination() {
      return {
        onChange: (page) => {
          console.log(page);
          this.$store.dispatch('article/getArticle', { currentPage: page, pageSize: 1 })
        },
        pageSize: 1,
        total: this.$store.state.article.articleRes.pagination.total
      }
    },
    // artTest() {
    //   return this.$store.state.art
    // }
  },
  mounted: function () {
    this.$message.info('welcome to sycho')
    // console.log(this.aData)
    // console.log(this.$store)
    // 没写全路径无论测试环境还是正式环境都会走代理方式请求后台接口
    // this.$axios.$get("/article?currentPage=1&pageSize=10").then(res=>{
    //   console.log(res)
    // })
    console.log(this.articleRes)
    // console.log(this.artTest)
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
// /deep/即将废弃，less不支持<<<，通过less声明变量来实现<<<深度选择器
@deep: ~'>>>'; 
@bg: #fff2cb;
@wth: 100px;
  .index{
    @{deep} .ant-list-pagination{
      text-align: center;
    }
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
  }
</style>

