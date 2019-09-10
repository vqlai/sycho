<style lang="less" scoped>
@deep: ~'>>>'; 
  aside{
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .box{
      width: 100%;
      padding: 0 20px;
      margin-bottom: 20px;
      background-color: #fff;
      border-radius: 2px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      h3{
        padding: 10px 0;
        border-bottom: 1px solid #eee;
      }
      a{
        display: block;
        padding-bottom: 10px;
      }
      &:last-child{
        margin: 0;
      }
    }
    .search{
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
      border-radius: 2px;
      background-color: #fff;
      margin-bottom: 20px;
    }
    .ant-carousel{
      width: 100%;
      height: 100px;
      line-height: 100px;
      text-align: center;
      margin-bottom: 20px;
      color: #fff;
      background-color: #1890ff;
      border-radius: 2px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }
    .ant-calendar{
      background-color: #fff;
      border-radius: 2px;
      margin-bottom: 20px;
    }
  }
</style>

<template>
  <aside>
    <div class="search">
      <a-input-search placeholder="请输入搜索内容..." @search="onSearch" enterButton />
    </div>
    <a-carousel autoplay>
      <div>广告位1</div>
      <div>广告位2</div>
      <div>广告位3</div>
      <div>广告位4</div>
    </a-carousel>
    <a-calendar :fullscreen="false" class="ant-calendar"/>
    <!-- <section class="box">
      <h3>分类</h3>
      <nuxt-link :to="`/article/${123}`" class="link"> <section>前端</section> </nuxt-link>
      <nuxt-link :to="`/article/${123}`" class="link"> <section>生活</section> </nuxt-link>
    </section> -->
    <section class="box">
      <h3>热度榜</h3>
      <nuxt-link :to="`/article/${123}`" class="link"> <section>文章1</section> </nuxt-link>
      <nuxt-link :to="`/article/${123}`" class="link"> <section>文章2</section> </nuxt-link>
      <nuxt-link :to="`/article/${123}`" class="link"> <section>文章3</section> </nuxt-link>
    </section>
    <section class="box">
      <h3>推荐榜</h3>
      <nuxt-link :to="`/article/${123}`" class="link"> <section>文章1</section> </nuxt-link>
      <nuxt-link :to="`/article/${123}`" class="link"> <section>文章2</section> </nuxt-link>
      <nuxt-link :to="`/article/${123}`" class="link"> <section>文章3</section> </nuxt-link>
    </section>
  </aside>
</template>

<script>
  export default {
    name: 'Aside',
    computed: {
    },
    methods: {
      onSearch() {
        
      }
    }
  }
</script>