<style lang="less" scoped>
@deep: ~'>>>';
</style>

<template>
  <div class="about container">
    <a-row type="flex" justify="center" align="middle" style="flex-direction: column;">
      <a-avatar :size="160" icon="user" src="/images/avator.jpg"/>
      <h3>Sycho</h3>
      <p>JS Stack Developer</p>
    </a-row>
    <a-divider dashed>个人简介</a-divider>
    <a-timeline mode="alternate">
      <a-timeline-item>Create a services site 2015-09-01</a-timeline-item>
      <a-timeline-item color="green">Solve initial network problems 2015-09-01</a-timeline-item>
      <a-timeline-item>
        <a-icon slot="dot" type="clock-circle-o" style="font-size: 16px;" />
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
      </a-timeline-item>
      <a-timeline-item color="red">Network problems being solved 2015-09-01</a-timeline-item>
      <a-timeline-item>Create a services site 2015-09-01</a-timeline-item>
      <a-timeline-item>
        <a-icon slot="dot" type="clock-circle-o" style="font-size: 16px;" />
        Technical testing 2015-09-01
      </a-timeline-item>
    </a-timeline>
    <a-progress stroke-linecap="square" :percent="75" />
    <a-progress stroke-linecap="square" :percent="75" type="circle" />
    <a-progress stroke-linecap="square" :percent="75" type="dashboard" />
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
