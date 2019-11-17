<template>
  <header class="header">
    <div class="v-logo"><img src="https://admin.sycho.cn/upload/logo.png" alt=""></div>
    <!-- <h3>sycho</h3> -->
    <!-- <p>打破平庸，欢喜生活。</p> -->
    <p>让这风吹，哀伤通通带走，管风里是谁。</p>
  </header>
</template>

<script>
  export default {
    name: 'Header',
    computed: {
    }
  }
</script>

<style lang="less" scoped>
  header {
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    // opacity: .8;
    .v-logo{
      padding: 10px 0;
      width: 160px;
      img{
        width: 100%;
      }
    }
    h3{
      margin: 10px 0;
      font-size: 30px;
    }
  }
</style>