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
    <h3 class="title">重点废话</h3>
    <!-- <div>
      <image src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />
    </div> -->
    <article>我们都向往好的东西，因为好的东西有高价值，我们认可，所以向往； 好的东西都需要经过设计、打磨、迭代，也就是需要付出时间和劳动； 换句话说，我们觉得一个东西价值高就是因为他需要的劳动多，高成本的劳动是好东西的基石； 所以我们别想着拿短时间、低成本快速的方式去得到好东西 著作权归作者所有。</article>
    <section>
      <div>本文于   2019/6/19 上午  发布在  无色庵  分类下，当前已被围观  1121  次</div>
      <div>相关标签： 诗和远方 、思考</div>
      <div>永久地址： https://surmon.me/article/148</div>
      <div>版权声明： 自由转载-署名-非商业性使用   |   Creative Commons BY-NC 3.0 CN</div>
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
  components: {
    ShareBox
  },
  validate ({ params }) {
    // 必须是number类型
    return /^\d+$/.test(params.id)
  },
  fetch ({ store, params }) {
    console.log(params.id)
    return store.dispatch(`article/getArticleById`,{id: params.id})
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
