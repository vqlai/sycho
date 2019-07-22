<style lang="less" scoped>
.container{
  width: 100%;
  height: 100%;
  position: relative;
  .content{
    display: flex;
    width: 1200px;
    margin: 0 auto;
    padding: 20px 0;
    .left-panel{
      flex: 1;
      padding: 20px;
      background-color: #fff;
      border-radius: 2px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }
    .right-panel{
      width: 280px;
      margin-left: 20px;
    }
  }
  .share{
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    width: 20px;
    height: auto;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
}
</style>

<template>
  <main class="container">
    <a-affix :offsetTop="0">
      <Header/>
      <Nav/>
    </a-affix>
    <section class="content">
      <section class="left-panel"> <nuxt/> </section>
      <section class="right-panel"> <Aside/> </section>
    </section>
    <ShareBox class="share"></ShareBox>
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
  import ShareBox from '~/components/share'
  export default {
    name: 'Main',
    components: {
      Header,
      Nav,
      Footer,
      Aside,
      ShareBox
    },
    data(){
      return {
        showWhat: 'Footer'
      }
    },
    computed: {
    },
    methods: {
    }
  }
</script>