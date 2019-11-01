<style lang="scss" scoped>
  .van-sticky{
    header{
      text-align: center;
      h3{
        font-size: 38px;
        line-height: 80px;
      }
      p{
        font-size: 22px;
        line-height: 60px;
      }
      >>> .van-hairline--top-bottom{
        >>> .van-tabs{
          // height: 60px;
          >>> .van-tabs__wrap{
            // height: 60px;
          }
        }
      }
    }
  }
  main{
    .van-swipe{
      height: 300px;
      line-height: 300px;
      text-align: center;
      background-color: blue;
      color: #fff;
    }
    .van-list{
      .van-cell{
        height: 80px;
        line-height: 80px;
        text-align: center;
      }
    }
  }
  footer{
    text-align: center;
    font-size: 16px;
    line-height: 30px;
    color: #666;
  }
</style>
<template>
  <div class="home">
    <van-sticky>
      <header>
        <div style="background-color: #fff;">
          <h3>sycho</h3>
          <p>让这风吹，哀伤通通带走，管风里是谁。</p>
        </div>
        <!-- <van-search
          v-model="value"
          placeholder="请输入搜索关键词"
          show-action
          shape="round"
          @search="onSearch"
          style="padding: 10px;"
        >
          <div slot="action" @click="onSearch">搜索</div>
        </van-search> -->
        <div class="van-hairline--top-bottom">
          <!-- <van-row type="flex" justify="space-between" class="nav" style="padding: 10px 0;background-color: #fff;font-size: 12px;">
            <van-col span="4">首页</van-col>
            <van-col span="4">技术</van-col>
            <van-col span="4">生活</van-col>
            <van-col span="4">导航</van-col>
            <van-col span="4">留言墙</van-col>
            <van-col span="4">关于我</van-col>
          </van-row> -->
          <van-tabs v-model="activeName" title-active-color="#1890ff" color="#1890ff">
            <van-tab title="首页" name="a"></van-tab>
            <van-tab title="技术" name="b"></van-tab>
            <van-tab title="生活" name="c"></van-tab>
            <van-tab title="导航" name="d"></van-tab>
            <van-tab title="留言墙" name="e"></van-tab>
            <van-tab title="关于我" name="f"></van-tab>
          </van-tabs>
        </div>
      </header>
    </van-sticky>
    <main>
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item>1</van-swipe-item>
        <van-swipe-item>2</van-swipe-item>
        <van-swipe-item>3</van-swipe-item>
        <van-swipe-item>4</van-swipe-item>
      </van-swipe>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="item in list"
          :key="item"
          :title="item"
        />
      </van-list>
    </main>
    <footer>©2019 赛柯 Sycho.cn<br/>粤ICP备18084454号-1</footer>
  </div>
</template>

<script>
  // import { Search } from 'vant'
  import { Sticky, Tab, Tabs, List, Swipe, SwipeItem } from 'vant'
  export default {
    name: 'HOME',

    components: {
      // 'van-search': Search
      'van-sticky': Sticky,
      'van-tab': Tab,
      'van-tabs': Tabs,
      'van-list': List,
      'van-swipe': Swipe,
      'van-swipe-item': SwipeItem
    },

    data() {
      return {
        keywords: '',
        activeName: 'a',
        list: [],
        loading: false,
        finished: false
      }
    },

    computed: {},

    watch: {},

    created() {},

    mounted() {},

    destroyed() {},

    methods: {
      onSearch() {},
      onLoad() {
        // 异步更新数据
        setTimeout(() => {
          for (let i = 0; i < 10; i++) {
            this.list.push(this.list.length + 1)
          }
          // 加载状态结束
          this.loading = false

          // 数据全部加载完成
          if (this.list.length >= 40) {
            this.finished = true
          }
        }, 500)
      }
    }  
  }
</script>