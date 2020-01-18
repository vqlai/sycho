<style lang="less" scoped>
  @deep: ~'>>>';
  .life{
    .banner {
      position: relative;
      overflow: hidden;
      width: 100%;
      height: 260px;
      border: 0;
      background: url('/images/life.jpg') no-repeat;
      background-size: cover;
      background-position: center center;
      text-align: center;
      transition: all 1s;
      &:hover {
        transform: rotate(-1deg) scale(0.95);
        transition: all 1s;
      }
      span {
        position: absolute;
        right: 5%;
        bottom: 10%;
        display: block;
        font-weight: 700;
        opacity: .5;
        cursor: progress;
        padding: 0 .618em;
        padding-left: 3rem;
        height: 2em;
        line-height: 2em;
        color: #eee;
        background: linear-gradient(to left, hsla(0, 0%, 100%, 0.6), hsla(0, 0%, 77%, 0.3), transparent);
      }
    }
  }
</style>
<template>
  <div class="life container">
    <div class="banner">
      <!-- <img src="/images/life.jpg"> -->
      <span>那刹那，令我倒颠。</span>
      <!-- <span>咸鱼白菜，也好好味。</span> -->
    </div>
    <articleList :articleList="articleList" @onPagination="onPagination"></articleList>
  </div>
</template>

<script>
  import articleList from '~/components/articleList'
  export default {
    name: 'Life',
    head(){
      return { title: '百感生 | Life' }
    },
    fetch ({ store, params }) {
      return store.dispatch('article/getArticle', { type: 2, currentPage: 1, pageSize: 10, publish: 1, state: 1 })
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
        this.$store.dispatch('article/getArticle', { currentPage: page, pageSize: 10 })
      }
    }
  }
</script>