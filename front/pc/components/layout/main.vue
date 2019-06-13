<template>
  <main class="container">
    <Header/>
    <Nav/>
    <section class="content">
      <section class="left-panel"> <nuxt/> </section>
      <section class="right-panel"> <Aside/> </section>
    </section>
    <ShareBox></ShareBox>
    <!-- <Footer/> -->
    <component :is="showWhat"></component>
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

<style lang="less" scoped>
.container{
  width: 100%;
  height: 100%;
  position: relative;
  .content{
    width: 1200px;
    margin: 0 auto;
    padding: 20px 0;
    display: flex;
    .left-panel{
      flex: 1;
    }
    .right-panel{
      width: 260px;
      margin-left: 30px;
    }
  }
}
</style>