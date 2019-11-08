<style lang="less" scoped>
.container{
  width: 100%;
  height: 100%;
  position: relative;
  .search-btn{
    display: none;
    position: absolute;
    top: 30px;
    right: 20px;
  }
  .search-box{
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    width: 100%;
    padding: 20px 10px;
    background-color: #fff;
  }
  .content{
    display: flex;
    width: 72%;
    // min-width: 1200px;
    margin: 0 auto;
    padding: 20px 0 0;
    .left-panel{
      flex: 1;
      overflow: hidden;
      padding: 20px;
      background-color: #fff;
      border-radius: 2px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }
    .right-panel{
      width: 320px;
      margin-left: 20px;
    }
  }
  .share{
    position: fixed;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    width: 30px;
    height: auto;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
}
@media screen and (max-width: 576px){
  .container{
    .search-btn{
      display: block;
    }
    .content{
      width: 100%;
      .left-panel{
        padding: 4px;
      }
      .right-panel{
        display: none;
      }
    }
  } 
}
@media (min-width: 577px) and (max-width: 768px){
  .container{
    .content{
      width: 98%;
      .left-panel{
        padding: 6px;
      }
      .right-panel{
        margin-left: 10px;
        width: 240px;
      }
    }
  } 
}
@media (min-width: 769px) and (max-width: 992px){
  .container{
    .content{
      width: 98%;
      .left-panel{
        padding: 10px;
      }
      .right-panel{
        width: 260px;
      }
    }
  } 
}
@media (min-width: 993px) and (max-width: 1200px){
  .container{
    .content{
      width: 92%;
      .right-panel{
        width: 280px;
      }
    }
  } 
}
@media (min-width: 1201px) and (max-width: 1500px){
  .container{
    .content{
      width: 90%;
      .right-panel{
        width: 300px;
      }
    }
  } 
}
</style>

<template>
  <main class="container">
    <a-affix :offsetTop="0">
      <Header/>
      <Nav/>
      <a-icon type="search" class="search-btn" @click="showSearch"/>
      <a-row type="flex" justify="space-between" align="middle" class="search-box" v-if="isSearch">
        <a-col :span="22"><a-input-search v-model="keywords" placeholder="请输入搜索内容..." style="width: 100%;" @search="onSearch" /></a-col>
        <a-col :span="2" style="text-align: right;"><a-icon type="close" @click="isSearch=false"/></a-col>
      </a-row>
    </a-affix>
    <a-locale-provider :locale="zh_CN">
      <section class="content">
        <section class="left-panel"> <nuxt/> </section>
        <section class="right-panel"> <Aside/> </section>
      </section>
    </a-locale-provider>
    <!-- <ShareBox class="share"></ShareBox> -->
    <!-- <Footer/> -->
    <component :is="showWhat"></component>
    <a-back-top />
  </main>
</template>

<script>
  import Header from '~/components/layout/header'
  import Nav from '~/components/layout/nav'
  import Footer from '~/components/layout/footer'
  import Aside from '~/components/layout/aside'
  // import ShareBox from '~/components/share'
  import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
  export default {
    name: 'Main',
    components: {
      Header,
      Nav,
      Footer,
      Aside
      // ShareBox
    },
    data(){
      return {
        showWhat: 'Footer',
        zh_CN,
        keywords: '',
        isSearch: false
      }
    },
    computed: {
    },
    mounted() {
      console.clear()
      // console.log('%cTalk is cheap. Show me the code %c695850246@qq.com', 'color:#666;font-size:3em;', 'color:#666;font-size:13px;')
      console.log('%c让这风吹，哀伤通通带走，管风里是谁，老铁，你呢？%ccontact me: 695850246@qq.com', 'color:#1890ff;font-size:26px;', 'color:#666;font-size:14px;')
    },
    methods: {
      showSearch() {
        this.isSearch = !this.isSearch
      },
      onSearch() {
        this.isSearch = false
        this.$router.push(`/search/${this.keywords}`)
      }
    }
  }
</script>