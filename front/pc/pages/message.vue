<style lang="less" scoped>
  .message{
    .ant-row{
      padding: 0 0 20px;
    }
  }
</style>
<template>
  <div class="message container">
    <a-row :gutter="16">
      <a-col :span="8">
        <a-input placeholder="昵称*"/>
      </a-col>
      <a-col :span="8">
        <a-input placeholder="邮箱*"/>
      </a-col>
      <a-col :span="8">
        <a-input placeholder="网址"/>
      </a-col>
    </a-row>
    <a-row type="flex" justify="end" style="align-items:center;padding-bottom:10px;">
      sycho
      <a-icon type="setting" style="padding: 0 10px;"/>
      <a-dropdown v-model="dropdownVisible">
        <a class="ant-dropdown-link" href="#"> 设置账户信息 </a>
        <a-menu slot="overlay" @click="handleMenuClick">
          <a-menu-item key="1">编辑信息</a-menu-item>
          <a-menu-item key="2">清空信息</a-menu-item>
        </a-menu>
      </a-dropdown>
    </a-row>
    <a-row>
      <a-textarea placeholder="愿你的观点让人印象深刻..." :rows="4"/>
    </a-row>
    <a-row type="flex" justify="end">
      <a-button type="primary">发射</a-button>
    </a-row>
    <a-divider dashed />
  </div>
</template>

<script>
  export default {
    name: 'Message',
    head(){
      return { title: '留言墙|Message' }
    },
    data(){
      return {
        dropdownVisible: false
      }
    },
    computed: {
    },
    methods: {
      handleMenuClick() {

      }
    }
  }
</script>