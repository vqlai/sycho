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
      .tag{
        display: flex;
        flex-wrap:wrap;
        a{
          padding: 4px 0;
          width: 30%;
          text-align: center;
          border: 1px solid #eee;
          border-radius: 10%;
          margin: 0 3.3% 10px 0;
        }
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
      min-height: 80px;
      // line-height: 100px;
      text-align: center;
      margin-bottom: 20px;
      color: #fff;
      border-radius: 2px;
      // background-color: #1890ff;
      // box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      img{
        width: 100%;
      }
    }
    .ant-calendar{
      width: 100%;
      background-color: #fff;
      border-radius: 2px;
      margin-bottom: 20px;
    }
  }
</style>

<template>
  <aside>
    <div class="search">
      <a-input-search v-model="keywords" placeholder="请输入搜索内容..." @search="onSearch" />
      <!-- <a-input-search v-model="keywords" placeholder="请输入搜索内容..." @search="onSearch" enterButton /> -->
    </div>
    <section class="box" v-if="articleHotList.length">
      <h3><a-icon type="fire" /> 热度榜</h3>
      <nuxt-link class="link" v-for="(item,index) in articleHotList" :key="index" :to="`/article/${item.id}`"> {{item.title.slice(0,20)}} </nuxt-link>
    </section>
    <client-only>
      <a-carousel autoplay>
        <!-- 注意nuxt图片只能放在static/images下面，其他新建文件夹或assents文件夹下都无法引用图片 -->
        <!-- <div><a style="display: block;" href="https://s.click.taobao.com/wczqYxv" target="_blank"><img src="/images/aliyun-300-100.jpg" alt=""></a></div> -->
        <div><a style="display: block;" href="https://s.click.taobao.com/HSgoYxv" target="_blank" rel="noopener noreferrer"><img src="https://img.alicdn.com/tfs/TB1vONZjeT2gK0jSZFvXXXnFXXa-440-180.jpg" alt=""></a></div>
        <div><a style="display: block;" href="https://s.click.taobao.com/0XjbYxv" target="_blank" rel="noopener noreferrer"><img src="https://img.alicdn.com/tfs/TB1EEeXLY2pK1RjSZFsXXaNlXXa-440-180.jpg" alt=""></a></div>
        <div><a style="display: block;" href="https://s.click.taobao.com/u8XoYxv" target="_blank" rel="noopener noreferrer"><img src="https://img.alicdn.com/tps/TB1ijqSPXXXXXX8XVXXXXXXXXXX-440-180.jpg" alt=""></a></div>
        <div><a style="display: block;" href="https://s.click.taobao.com/mZRnYxv" target="_blank" rel="noopener noreferrer"><img src="https://img.alicdn.com/tfs/TB10iuki5_1gK0jSZFqXXcpaXXa-440-180.jpg" alt=""></a></div>
      </a-carousel>
    </client-only>
    <a-calendar :fullscreen="false" class="ant-calendar"/>
    <!-- <section class="box">
      <h3><a-icon type="cloud" /> 推荐榜</h3>
      <nuxt-link :to="`/article/${123}`" class="link"> <section>文章1</section> </nuxt-link>
      <nuxt-link :to="`/article/${123}`" class="link"> <section>文章2</section> </nuxt-link>
      <nuxt-link :to="`/article/${123}`" class="link"> <section>文章3</section> </nuxt-link>
    </section> -->
    <section class="box">
      <h3><a-icon type="tags" /> 热门标签</h3>
      <section class="tag">
        <nuxt-link class="link" :to="`/tag/css3`">css3</nuxt-link>
        <nuxt-link class="link" :to="`/tag/html5`">html5</nuxt-link>
        <nuxt-link class="link" :to="`/tag/javascript`">js</nuxt-link>
        <nuxt-link class="link" :to="`/tag/es6`">es6</nuxt-link>
        <nuxt-link class="link" :to="`/tag/canvas`">canvas</nuxt-link>
        <nuxt-link class="link" :to="`/tag/pixijs`">pixijs</nuxt-link>
        <nuxt-link class="link" :to="`/tag/createjs`">createjs</nuxt-link>
        <nuxt-link class="link" :to="`/tag/vue`">vue</nuxt-link>
        <nuxt-link class="link" :to="`/tag/nuxt`">nuxt</nuxt-link>
        <nuxt-link class="link" :to="`/tag/wepy`">wepy</nuxt-link>
        <nuxt-link class="link" :to="`/tag/hybird app`">hybird app</nuxt-link>
        <nuxt-link class="link" :to="`/tag/uniapp`">uniapp</nuxt-link>
        <nuxt-link class="link" :to="`/tag/express`">express</nuxt-link>
        <nuxt-link class="link" :to="`/tag/koa2`">koa2</nuxt-link>
        <nuxt-link class="link" :to="`/tag/mongodb`">mongodb</nuxt-link>
      </section>
    </section>
  </aside>
</template>

<script>
  export default {
    name: 'Aside',
    data() {
      return {
        keywords: '',
        articleHotList: [],
        // url: require('~/assets/imgs/ad/aliyun-300-100.jpg')
        // url: require('static/images/ad/aliyun-300-100.jpg')
      }
    },
    created() {
      this.getHotArticle()
    },
    mounted() {},
    methods: {
      onSearch() {
        this.$router.push(`/search/${this.keywords}`)
      },
      getHotArticle() {
        this.$axios.$get("/article?hot=true&currentPage=1&pageSize=10").then(res=>{
          console.log(res)
          if(res.success){
            this.articleHotList = res.data.list
          }
        })
      }
    }
  }
</script>