<template>
  <header class="header">
    <div class="v-logo"><img src="https://admin.sycho.cn/upload/logo.png" alt=""></div>
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
    p{
      background-image: linear-gradient(90deg, #31f5fc,#3185ed);
      background-clip: text;
      animation: hue 5s linear infinite;
      -webkit-text-fill-color: transparent;
      @keyframes hue {
        from {
          filter: hue-rotate(0);
        }
        to {
          filter: hue-rotate(-1turn);
        }
      }
    }
  }
</style>