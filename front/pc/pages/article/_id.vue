<style lang="less" scoped>
@deep: ~'>>>'; 
  .articel-detail{
    .title{
      text-align: center;
      font-size: 30px;
      font-weight: 600;
      color: #333;
    }
    .share{
      @{deep} .share-base{
        display: flex;
        justify-content: center;
      }
    }
    .ant-carousel{
      width: 860px;
      height: 160px;
      text-align: center;
      color: #fff;
      line-height: 160px;
      background-color: blue;
    }
  }
</style>

<template>
  <section class="articel-detail">
    <h3 class="title">{{article.title}}</h3>
    <!-- <div>
      <image src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />
    </div> -->
    <article v-html="article.content"></article>
    <section>
      <div>本文于   2019/6/19 上午  发布在  无色庵  分类下，当前已被围观  {{article.meta.views}}  次</div>
      <div>相关标签： 诗和远方 、思考</div>
      <div>永久地址： https://sycho.cn/article/{{article.id}}</div>
      <div>版权声明： 自由转载-署名-非商业性使用   |   Sycho.cn</div>
    </section>
    <a-carousel autoplay class="ad">
      <div>广告位1</div>
      <div>广告位2</div>
      <div>广告位3</div>
      <div>广告位4</div>
    </a-carousel>
    <share-box key="share" class="share"/>
  </section>
</template>

<script>
// 文章详情
import ShareBox from '~/components/share'
export default {
  name: 'ArticleDetail',
  head () {
    return {
      title: `${this.article.title} | sycho`,
      meta: [
        { hid: 'books custom title', name: 'books', content: 'books custom title description' }
      ]
    }
  },
  components: {
    ShareBox
  },
  validate ({ params }) {
    // 必须是number类型
    return /^\d+$/.test(params.id)
  },
  fetch ({ store, params }) {
    return store.dispatch(`article/getArticleById`,{id: params.id})
  },
  computed: {
    article() {
      return this.$store.state.article.article
    },
  },
  // data() {
  //   id: params.id
  // },
  mounted: function () {
    this.$nextTick(()=>{
      // console.log(this.$route.params.id)
    })
  }
}
</script>
