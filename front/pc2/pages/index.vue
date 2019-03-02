<template>
  <section class="container">
    <!-- <h3 :style="{ marginBottom: '16px' }">Default Size</h3> -->
    <a-list :pagination="pagination" :data-source="listData" item-layout="vertical" size="large" >
      <!-- <div slot="footer"><b>ant design vue</b> footer part</div> -->
      <a-list-item slot="renderItem" slot-scope="item, index" key="item.title">
        <template v-for="{type, text} in actions" slot="actions">
          <span :key="type">
            <a-icon :type="type" style="margin-right: 8px" />
            {{ text }}
          </span>
        </template>
        <img slot="extra" width="272" alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"/>
        <a-list-item-meta :description="item.description" >
          <a slot="title" :href="item.href">{{ item.title }}</a>
          <a-avatar slot="avatar" :src="item.avatar" />
        </a-list-item-meta>
        {{ item.content }}
      </a-list-item>
    </a-list>
  </section>
</template>

<script>
import axios from 'axios'
// import axios from '~/plugins/axios' 
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
      title: '首页',
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
  // asyncData () {
  //   return axios.get('/api/api/getLink?currentPage=1&pageSize=10')
  //   .then((res) => {
  //     console.log(res)
  //     // callback(null, { title: res.data.title })
  //     return { data: res.data }
  //   })
  //   .catch((e) => {
  //     // error({ statusCode: 404, message: 'Post not found' })
  //     console.log(e)
  //   })
  // },
  async asyncData(context){
    // console.log(context)
    let {data} = await axios.get('http://app.sycho.cn/api/getLink?currentPage=1&pageSize=10')
    console.log(data)
    return {info: data}
  },
  data () {
    return { 
      listData,
      pagination: {
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 10,
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
    // axios.get("/api/api/getLink?currentPage=1&pageSize=10").then(res=>{
    //   console.log(res)
    // })
    console.log(this.info)
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
  .container{
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    .ant-list-pagination{
      text-align: center;
    }
  }
</style>

