<template>
  <section class="index container">
    <a-carousel autoplay>
      <div><h3>sycho coming soon</h3></div>
      <div><h3>精彩绝伦</h3></div>
      <div><h3>无与伦比</h3></div>
      <div><h3>即将闪爆你的eyes</h3></div>
    </a-carousel>
    <!-- <h3 :style="{ marginBottom: '16px' }">Default Size</h3> -->
    <a-list :pagination="pagination" :data-source="listData" item-layout="vertical" size="large" >
      <!-- <div slot="footer"><b>ant design vue</b> footer part</div> -->
      <a-list-item slot="renderItem" slot-scope="item, index" key="item.title">
        <!-- <img slot="extra" width="272" alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"/> -->
        
        <a-list-item-meta :description="item.description" >
          <a slot="title" :href="item.href">{{ item.title }}</a>
          <!-- <a-avatar slot="avatar" :src="item.avatar" /> -->
        </a-list-item-meta>
        <!-- {{ item.content }} -->
        <template v-for="{type, text} in actions" slot="actions">
          <span :key="type">
            <a-icon :type="type" style="margin-right: 8px" />
            {{ text }}
          </span>
        </template>
      </a-list-item>
    </a-list>
  </section>
</template>

<script>
// import axios from 'axios'
// import axios from '~/plugins/axios' 
// 因为nuxt配置文件注册了axios，所以可以直接this.$axios获取到axios对象，无需import，
// 但在asyncDate没有this对象，通过context全局变量来代替
const listData = []
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'https://vue.ant.design/',
    title: `ant design vue part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  })
}
export default {
  // 注意components属性要在data后面，但asyncData属性可以再components属性前
  components: {
  }, 
  head () {
    return {
      title: 'sycho-首页',
      meta: [
        { hid: 'books custom title', name: 'books', content: 'books custom title description' }
      ]
    }
  },
  // asyncData () {
  //   return axios.get('/api/api/getLink?currentPage=1&pageSize=10').then(res=>{
  //     console.log(res)
  //   })
  // },
  // async asyncData() {
  //   debugger
  //   let {data} = await axios.get('/api/api/getLink?currentPage=1&pageSize=10')
  //   console.log(data)
  //   return { data }
  // },
  // asyncData ({app}) {
  //   return app.$axios.$get('/api/getLink?currentPage=1&pageSize=10')
  //   .then((res) => {
  //     console.log(res)
  //     console.log(111)
  //     // callback(null, { title: res.data.title })
  //     return { aData: res.data }
  //   }).catch((e) => {
  //     // error({ statusCode: 404, message: 'Post not found' })
  //     console.log(e)
  //   })
  // },
  // 在asyncData中，不能直接使用this引用，这里引入context是上下文参数，代替了this，
  // 因为在asyncData方法是在组件初始化时调用，所以没法通过this来引用组件实例对象。
  // async asyncData(context){
  //   console.log(context)
  //   let {data} = await context.$axios.$get('/api/getLink?currentPage=1&pageSize=10')
  //   console.log(data)
  //   return {aData: data}
  // },
   async asyncData ({ store, error }) {
    console.log(store)
    let res = await store.dispatch('link', {currentPage:1, pageSize:10}).then(res => {
      console.log(res)
    }).catch((error) => {
      // error({ statusCode: 404, message: 'Post not found' })
      console.log(error)
    })
    return {
      links: res
    }
  },
  data () {
    return { 
      listData,
      pagination: {
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 5,
      },
      actions: [
        { type: 'star-o', text: '156' },
        { type: 'like-o', text: '156' },
        { type: 'message', text: '2' },
      ],
      foo: 'bar',
      current: ['mail'],
    }
  },
  mounted: function () {
    this.$message.info('This is a normal message');
    // this.$axios.$get("/api/getLink?currentPage=1&pageSize=10").then(res=>{
    //   console.log(res)
    // })
    // console.log(this.aData)
    // console.log(this.$store)
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
    .ant-carousel @{deep} .slick-slide {
      text-align: center;
      height: 160px;
      line-height: 160px;
      background: #364d79;
      overflow: hidden;
    }

    .ant-carousel @{deep} .slick-slide h3 {
      color: #fff;
    }
  }
</style>

