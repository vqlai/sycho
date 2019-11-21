<style lang="less" scoped>
  @deep: ~'>>>';
  .tag{
    .article{
      @{deep} .ant-list{
        .ant-spin-container{
          min-height: 800px;
        }
      }
    }
  }
</style>
<template>
  <div class="tag container">
    <articleList :articleList="articleList" @onPagination="onPagination"></articleList>
  </div>
</template>

<script>
  import articleList from '~/components/articleList'
  export default {
    name: 'Tag',
    head(){
      return { title: '搜索|Tag' }
    },
    fetch ({ store, params }) {
      return store.dispatch('article/getArticle', { tagDesc: params.tag, currentPage: 1, pageSize: 10 })
    },
    components: {
      articleList
    },
    data(){
      return {}
    },
    computed: {
      articleList() {
        return this.$store.state.article.articleList
      }
    },
    mounted(){
      // console.log(this.$route.params)
    },
    methods: {
      onPagination(page) {
        this.$store.dispatch('article/getArticle', { tagDesc: this.$route.params.tag, currentPage: page, pageSize: 10 })
      }
    }
  }
</script>