<template>
  <aside>
    <section>
      推荐榜
    </section>
    <section>
      热度榜
    </section>
  </aside>
</template>

<script>
  export default {
    name: 'Aside',
    computed: {
    },
    methods: {
    }
  }
</script>

<style lang="less" scoped>
  aside{
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
</style>