<template>
  <aside>
    <section class="classify">
      <h3>分类</h3>
      <nuxt-link :to="`/article/${123}`" class="link"> <section>前端</section> </nuxt-link>
      <nuxt-link :to="`/article/${123}`" class="link"> <section>生活</section> </nuxt-link>
    </section>
    <section class="hot">
      <h3>热度榜</h3>
      <nuxt-link :to="`/article/${123}`" class="link"> <section>文章1</section> </nuxt-link>
      <nuxt-link :to="`/article/${123}`" class="link"> <section>文章2</section> </nuxt-link>
      <nuxt-link :to="`/article/${123}`" class="link"> <section>文章3</section> </nuxt-link>
    </section>
    <section class="recommend">
      <h3>推荐榜</h3>
      <nuxt-link :to="`/article/${123}`" class="link"> <section>文章1</section> </nuxt-link>
      <nuxt-link :to="`/article/${123}`" class="link"> <section>文章2</section> </nuxt-link>
      <nuxt-link :to="`/article/${123}`" class="link"> <section>文章3</section> </nuxt-link>
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .classify,.hot,.recommend{
      width: 100%;
      padding: 20px;
      margin-bottom: 20px;
      background-color: #fff;
      border-radius: 2px;
    }
  }
</style>