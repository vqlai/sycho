<template>
  <footer class="footer">
    <div class="container" @click="testFn"> ©{{ year }}&nbsp;&nbsp;www.sycho.cn </div>
  </footer>
</template>

<script>
  export default {
    name: 'Footer',
    computed: {
      year() {
        return new Date().getFullYear()
      }
    },
    methods: {
      testFn(){
        this.$axios.$get("/api/getLink?currentPage=1&pageSize=10").then(res => {
          console.log(res)
          this.$message.info(res.msg);
        })
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