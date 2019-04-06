<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name:{{ name }}</div>
    <div class="dashboard-text">role:{{role}}</div>
    <div class="dashboard-text">desc:{{desc}}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  created(){
    // this.$store.dispatch('GetInfo').then(res => {
    //   console.log(res)
    // })
  },
  computed: {
    ...mapGetters([
      'name',
      'role',
      'desc'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
