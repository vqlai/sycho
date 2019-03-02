<template>
  <footer class="footer">
    <div class="container"> ©{{ year }}&nbsp;&nbsp;www.sycho.cn </div>
  </footer>
</template>

<script>
  export default {
    name: 'Footer',
    computed: {
      year() {
        return new Date().getFullYear()
      }
    }
  }
</script>

<style lang="less" scoped>
  footer {
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
</style>