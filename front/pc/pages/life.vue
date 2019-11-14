<style lang="less" scoped>
  @deep: ~'>>>';
  .life{
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
    .life-banner {
      position: relative;
      overflow: hidden;
      width: 100%;
      height: auto;
      max-height: 260px;
      border: 0;
      img {
        width: 100%;
        // margin-top: -5em;
        transition: all 1s;
        &:hover {
          // margin-top: -6em;
          transform: rotate(2deg) scale(1.1);
          transition: all 1s;
        }
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
    <!-- <a-carousel vertical>
      <div><h3>1</h3></div>
      <div><h3>2</h3></div>
      <div><h3>3</h3></div>
      <div><h3>4</h3></div>
    </a-carousel> -->
    <div class="life-banner">
      <img src="/images/life.jpg">
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
      return store.dispatch('article/getArticle', { type: 2, currentPage: 1, pageSize: 10 })
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