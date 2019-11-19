<style lang="less" scoped>
  .link{
    .banner {
      position: relative;
      overflow: hidden;
      width: 100%;
      height: 260px;
      border: 0;
      background: url('/images/link.jpg') no-repeat;
      background-size: cover;
      background-position: center center;
      text-align: center;
      transition: all 1s;
      &:hover {
        transform: rotate(1deg) scale(0.95);
        transition: all 1s;
      }
      // img {
      //   // width: 100%;
      //   // width: 100%;
      //   height: 100%;
      //   // margin-top: -5em;
      //   transition: all 1s;
      //   &:hover {
      //     // margin-top: -6em;
      //     transform: rotate(-2deg) scale(1.1);
      //     transition: all 1s;
      //   }
      // }
      span {
        position: absolute;
        right: 5%;
        bottom: 10%;
        display: block;
        font-weight: 700;
        opacity: .5;
        cursor: progress;
        padding: 0 .618em;
        padding-left: 3rem;
        height: 2em;
        line-height: 2em;
        color: #555;
        background: linear-gradient(to left, hsla(0, 0%, 100%, .8), hsla(0, 0%, 77%, 0.4), transparent);
      }
    }
    .content{
      min-height: 480px;
      .link-item{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80px;
        border-radius: 6px;
        background-color: #fff;
        padding: 10px;
        overflow: hidden;
        box-sizing: border-box;
        border: 1px solid #e4ecf3;
        box-shadow: 1px 2px 3px #f2f6f8;
        transition: all .3s ease;
        &:hover{
          transform: translateY(-6px);
          -webkit-transform: translateY(-6px);
        }
        .logo{
          width:40px;
          height:40px;
          border-radius: 50%;
          margin-right: 10px;
          vertical-align: middle;
        }
        .title{
          font-size: 14px;
          color: #1890ff;
        }
        .desc{
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
</style>
<template>
  <div class="link container">
    <div class="banner">
      <!-- <img src="/images/link.jpg"> -->
      <span>日子匆匆，独留欢欣。</span>
    </div>
    <div class="content">
      <div v-if="Object.keys(link).length">
        <div v-for="(item,index) in link" :key="index">
          <a-divider orientation="left">{{item[0].typeText}}</a-divider>
          <a-row type="flex" justify="start" :gutter="10">
            <a-col :xs="12" :sm="12" :md="12" :lg="8" :xl="6" v-for="(i, j) in item" :key="j">
              <a class="link-item" style="margin-bottom: 10px;text-decoration:none;" :href="i.url" target="_blank">
                <div v-if="i.logo"><img :src="i.logo" alt="" class="logo"></div>
                <a-avatar shape="circle" size="large" :style="{backgroundColor: i.color, fontSize: '18px',verticalAlign: 'middle',marginRight: '10px'}" slot="avatar" v-else>
                  {{i.name.slice(0,1)}}</a-avatar>
                <div style="flex:1;">
                  <div class="title">{{i.name}}</div>
                  <div class="desc">{{i.desc}}</div>
                </div>
              </a>
            </a-col>
          </a-row>
        </div>
      </div>
      <a-empty v-else style="padding-top: 30%;"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Link',
    head(){
      return { title: '寻技斋 | Link' }
    },
    // fetch用来获取SSR数据，其他事件交互数据直接调用axios发起请求即可
    async fetch ({ store, params }) {
      await store.dispatch('link/getLink', { currentPage: 1, pageSize: 100 })
    },
    data() {
      return {
        defaultPic: "this.src='/images/avator.jpg'"
      }
    },
    computed: {
      link() {
        let obj = {}
        for(let item of this.$store.state.link.link.list){
          if(typeof obj[item.type] === 'undefined'){
            obj[item.type] = []
          }
          obj[item.type].push(item)
        }
        return obj
        // return this.$store.state.link.link.list
      },
    },
    mounted: function () {},
    methods: {
      onImgError(e) {
        // console.log(e)
      }
    }
  }
</script>