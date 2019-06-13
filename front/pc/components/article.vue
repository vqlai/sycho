<template>
  <a-list :pagination="pagination" :data-source="list" item-layout="vertical" size="large" >
    <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
      <div class="">
      </div>
    </a-list-item>
  </a-list>
</template>

<script>
  export default {
    props: {
      list: {
        type: Array,
        default: []
      },
      pagination: {}
    }
  }
</script>

<style lang="scss" scoped>

</style>