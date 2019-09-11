<style lang="less" scoped>
  @deep: ~'>>>';
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
</style>
<template>
  <div class="tech container">
    <a-carousel vertical>
      <div><h3>1</h3></div>
      <div><h3>2</h3></div>
      <div><h3>3</h3></div>
      <div><h3>4</h3></div>
    </a-carousel>
    <articleList :articleList="articleList" @onPagination="onPagination"></articleList>
  </div>
</template>

<script>
  import articleList from '~/components/articleList'
  export default {
    name: 'Tech',
    head(){
      return { title: '留言墙|Tech' }
    },
    fetch ({ store, params }) {
      return store.dispatch('article/getArticle', { type: 1, currentPage: 1, pageSize: 1 })
    },
    components: {
      articleList
    },
    data(){
      return {
      }
    },
    computed: {
      articleList() {
        return this.$store.state.article.articleList
      }
    },
    methods: {
      onPagination(page) {
        this.$store.dispatch('article/getArticle', { currentPage: page, pageSize: 1 })
      }
    }
  }
</script>