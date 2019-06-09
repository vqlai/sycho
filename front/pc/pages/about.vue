<template>
  <div class="about container">
    关于我
    <a-carousel vertical>
      <div><h3>1</h3></div>
      <div><h3>2</h3></div>
      <div><h3>3</h3></div>
      <div><h3>4</h3></div>
    </a-carousel>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="less" scoped>
@deep: ~'>>>';
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
</style>
