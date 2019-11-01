<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: auto;
    min-height: 100%;
    box-sizing: border-box;
  } 
</style>

<template>
  <!-- , paddingBottom: isIphoneX?'32px':0 -->
  <div id="app" :style="{backgroundColor: pageBg}">
    <transition>
      <!-- Vue 会复用相同组件，即 /page/1 => /page/2 或者 /page?id=1 => /page?id=2 这类链接跳转时，导致将不在执行created， mounted之类的钩子，加key可以解决 -->
      <!-- :key="routerKey"  -->
      <keep-alive v-if="$route.meta.keepAlive">
        <!-- <transition name="fade"> -->
          <router-view :key="routerKey"/>
        <!-- </transition> -->
      </keep-alive>
      <!-- :key="$route.fullpath" -->
      <router-view v-else :key="routerKey"/>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'layout',
    data: function() {
      return {
        pageBg: 'transparent' // 默认背景透明 
        // isIphoneX: /iphone/gi.test(navigator.userAgent) && (screen.height === 812 && screen.width === 375) // 是否iphonex
      }
    },
    created: function() {
      this.pageBg = this.$route.meta.bg
    },
    watch: {
      '$route' (to, from) {
        this.pageBg = this.$route.meta.bg
      }
    },
    computed: {
      routerKey() {
        return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
      }
    }
  }
</script>