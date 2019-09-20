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
  }
</style>

<template>
  <div class="about container">
    <a-row type="flex" justify="center" align="middle" style="flex-direction: column;">
      <a-avatar :size="160" icon="user" src="/images/avator.jpg"/>
      <h3 class="nickname">sycho</h3>
      <p>JS Stack Developer</p>
      <ul class="contact">
        <li> <a href="https://github.com/vqlai" target="_blank" rel="noopener noreferrer"> <a-icon type="github"/> </a> </li>
        <li> <a href="https://weibo.com/u/6251100324/home" target="_blank" rel="noopener noreferrer"> <a-icon type="weibo"/> </a> </li>
        <li><a-icon type="wechat"/></li>
        <li><a-icon type="qq"/></li>
      </ul>
    </a-row>
    <a-divider dashed>个人简介</a-divider>
    <a-timeline mode="alternate">
      <a-timeline-item><a-icon type="environment" /> 目前就职于深圳稳健医疗&全棉时代</a-timeline-item>
      <a-timeline-item color="green"><a-icon type="heart" /> 跑步健身，足球，乒乓球，烹饪，编码，音乐电影。。。</a-timeline-item>
      <a-timeline-item><a-icon type="tags" /> vuejs全家桶，es6，pixijs，wepy，小程序，hybird app。。。</a-timeline-item>
      <a-timeline-item color="green"><a-icon type="fire" /> 吾生有涯愿无尽，心期填海力移山</a-timeline-item>
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
      return { title: '关于我|About' }
    }
  }
</script>
