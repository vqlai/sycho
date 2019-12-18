<style lang="less" scoped>
  @deep: ~'>>>';
  .search{
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
  <div class="search container">
    <articleList :articleList="articleList" @onPagination="onPagination"></articleList>
  </div>
</template>

<script>
  import articleList from '~/components/articleList'
  export default {
    name: 'Search',
    head(){
      return { title: '搜索|Search' }
    },
    fetch ({ store, params }) {
      return store.dispatch('article/getArticle', { keyword: params.keywords, currentPage: 1, pageSize: 10 })
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
    mounted(){},
    methods: {
      onPagination(page) {
        this.$store.dispatch('article/getArticle', { keyword: this.$route.params.keywords, currentPage: page, pageSize: 10 })
      }
    }
  }
</script>