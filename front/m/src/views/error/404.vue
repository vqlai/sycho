<template>
  <div class="NoFound">
    <div class="pic"><img src="@/assets/imgs/404.gif" alt=""></div>
    <div class="content">哎哟，无法找到页面，请到别处看看吧！</div>
    <div class="btn">
      <!-- <router-link tag="a" to="/home">返回首页</router-link> -->
      <a href="https://m.purcotton.com">返回首页</a>
    </div>
  </div>
</template>

<script>
  // 访问路径未匹配
  export default {
    name: 'NoFound'
  }
</script>

<style lang="scss" scoped>
  .NoFound{
    text-align: center;
    padding: 260px 220px;
    .content{
      font-size: 30px;
      line-height: 42px;
      padding: 40px 0;
    }
    .btn{
      a{
        color: #019e97;
      }
    }
  }
</style>
