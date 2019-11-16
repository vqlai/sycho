<style lang="less" scoped>
  @deep: ~'>>>';
  .tech{
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
    .tech-banner {
      position: relative;
      overflow: hidden;
      width: 100%;
      max-height: 260px;
      border: 0;
      img {
        width: 100%;
        transition: all 1s;
        &:hover {
          margin-top: -30px;
          transform: scale(1.1);
          transition: all 1s;
        }
      }
      span {
        position: absolute;
        right: 5%;
        bottom: 10%;
        display: block;
        font-weight: 700;
        opacity: .8;
        cursor: progress;
        padding: 0 .618em;
        padding-left: 3rem;
        height: 2em;
        line-height: 2em;
        color: #333;
        background: linear-gradient(to left, hsla(0, 0%, 100%, 0.9), hsla(0, 0%, 77%, 0.6), transparent);
      }
    }
  }
</style>
<template>
  <div class="tech container">
    <!-- <a-carousel vertical>
      <div><h3>1</h3></div>
      <div><h3>2</h3></div>
      <div><h3>3</h3></div>
      <div><h3>4</h3></div>
    </a-carousel> -->
    <div class="tech-banner">
      <img src="/images/tech.jpg">
      <span>填满一生，全是数字。</span>
    </div>
    <articleList :articleList="articleList" @onPagination="onPagination"></articleList>
  </div>
</template>

<script>
  import articleList from '~/components/articleList'
  export default {
    name: 'Tech',
    head(){
      return { title: '风雨浸 | Tech' }
    },
    fetch ({ store, params }) {
      return store.dispatch('article/getArticle', { type: 1, currentPage: 1, pageSize: 10 })
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