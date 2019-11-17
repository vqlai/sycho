<template>
  <footer class="footer">
    <div class="container" @click="testFn"> 
      <div>©{{ year }} 赛柯 Sycho.cn</div>
      <div>粤ICP备18084454号-1</div>
    </div>
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
          // console.log(res)
          this.$message.info(res.msg);
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  footer {
    width: 100%;
    // min-width: 1200px;
    height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
</style>