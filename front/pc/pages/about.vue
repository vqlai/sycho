<style lang="less" scoped>
@deep: ~'>>>';
  .about{
    @{deep} .ant-avatar{
      img{
        transition: transform .5s linear;
        &:hover{
          transform: rotate(360deg);
        }
      }
    }
    .nickname{
      font-size: 20px;
      padding: 10px 0;
      margin: 0;
    }
    ul.contact{
      display: flex;
      li{
        font-size: 26px;
        padding: 0 10px;
        a{
          color: rgba(0, 0, 0, 0.65);
          &:hover{
            color: #1890ff;
          }
        }
        .lx{
          cursor: pointer;
          transition: color 0.3s;
          &:hover{
            color: #1890ff;
          }
        }
      }
    }
    .map{
      width: 100%;
      overflow: hidden;
      background-color: #fff;
      position: relative;
      > .iframe {
        width: 100%;
        height: 300px;
        border: 0;
      }
    }
    @{deep} .a-timeline{
      .a-timeline-item{
        padding: 0 6px 20px!important;
      }
    }
  }
</style>

<template>
  <div class="about container">
    <a-row type="flex" justify="center" align="middle" style="flex-direction: column;">
      <a-avatar :size="160" icon="user" src="/images/avator.jpg"/>
      <h3 class="nickname">vqlai</h3>
      <p>Js Stack Developer</p>
      <ul class="contact">
        <li> <a href="https://github.com/vqlai" target="_blank" rel="noopener noreferrer"> <a-icon type="github"/> </a> </li>
        <li> <a href="https://weibo.com/u/6251100324/home" target="_blank" rel="noopener noreferrer"> <a-icon type="weibo"/> </a> </li>
        <li>
          <a-popover trigger="hover" placement="bottom">
            <template slot="content">
              <img src="/images/wechat.jpg" alt="" style="width: 140px;">
            </template>
            <a-icon type="wechat" class="lx"/>
          </a-popover>
        </li>
        <li>
          <a-popover trigger="hover" placement="bottom">
            <template slot="content">
              <img src="/images/qq.jpg" alt="" style="width: 140px;">
            </template>
            <a-icon type="qq" class="lx"/>
          </a-popover>
        </li>
      </ul>
    </a-row>
    <a-divider dashed>个人简介</a-divider>
    <a-timeline mode="alternate" pending="搬砖中...">
      <a-timeline-item style="padding: 0 6px 20px;"><a-icon type="environment" /> 目前就职于深圳稳健医疗&全棉时代</a-timeline-item>
      <a-timeline-item color="green" style="padding: 0 6px 20px;"><a-icon type="heart" /> 跑步健身，足球，乒乓球，烹饪，编码，音乐电影...</a-timeline-item>
      <a-timeline-item style="padding: 0 6px 20px;"><a-icon type="tags" /> vuejs全家桶，es6，pixijs，wepy，小程序，hybird app...</a-timeline-item>
      <a-timeline-item color="green" style="padding: 0 6px 20px;"><a-icon type="fire" /> 吾生有涯愿无尽，心期填海力移山</a-timeline-item>
      <!-- <a-timeline-item>
        <a-icon slot="dot" type="clock-circle-o" style="font-size: 16px;" />
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
      </a-timeline-item> -->
    </a-timeline>
    <!-- <a-progress stroke-linecap="square" :percent="75" />
    <a-progress stroke-linecap="square" :percent="75" type="circle" />
    <a-progress stroke-linecap="square" :percent="75" type="dashboard" /> -->
    <div class="map">
      <iframe class="iframe" src="/partials/map.html"></iframe>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'About',
    head(){
      return { title: '独留我 | About' }
    }
  }
</script>
