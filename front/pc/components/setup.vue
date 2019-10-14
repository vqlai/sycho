<style lang="less" scoped>

</style>
<template>
  <div class="setup">
    <a-row :gutter="16" v-if="!isUser" style="padding:10px 0;">
      <a-col :span="isEdit?6:7">
        <a-input placeholder="昵称*" v-model="user.name">
          <a-icon slot="prefix" type="user" />
        </a-input>
      </a-col>
      <a-col :span="isEdit?6:7">
        <a-input placeholder="邮箱*" v-model="user.email">
          <a-icon slot="prefix" type="global" />
        </a-input>
      </a-col>
      <a-col :span="isEdit?9:10">
        <!-- <a-input placeholder="网址" v-model="user.url">
          <a-icon slot="prefix" type="chrome" />
        </a-input> -->
        <a-input placeholder="网址" v-model="user.url">
          <a-select slot="addonBefore" v-model="urlBefore" style="width: 90px">
            <a-select-option value="https://">Https://</a-select-option>
            <a-select-option value="http://">Http://</a-select-option>
          </a-select>
          <a-select slot="addonAfter" v-model="urlAfter" style="width: 80px">
            <a-select-option value=".com">.com</a-select-option>
            <a-select-option value=".cn">.cn</a-select-option>
            <a-select-option value=".jp">.jp</a-select-option>
            <a-select-option value=".org">.org</a-select-option>
          </a-select>
        </a-input>
      </a-col>
      <a-col :span="3" v-if="isEdit" @click="saveUser"><a-button icon="check" style="width:100%;"></a-button></a-col>
    </a-row>
    <a-row type="flex" justify="end" align="middle" style="padding:10px 0 0;" v-else>
      {{user.name}}
      <a-icon type="setting" style="padding: 0 10px;"/>
      <a-dropdown v-model="dropdownVisible">
        <a class="ant-dropdown-link" href="javascript:;"> 设置账户信息 </a>
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="editUser">编辑信息</a-menu-item>
          <a-menu-item key="2" @click="clearUser">清空信息</a-menu-item>
        </a-menu>
      </a-dropdown>
      <a-button type="link" size="small" icon="undo" v-if="isReply" @click="onClickUndo"></a-button>
    </a-row>
    <a-row type="flex">
      <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo" />
      <div style="flex: 1;">
        <div v-if="isReply">
          <a-form-item style="padding: 0 0 6px;margin: 0;">
            <a-input v-model="replyObj.name" disabled></a-input>
          </a-form-item>
          <a-form-item style="padding: 0 0 6px;margin: 0;">
            <a-textarea v-model="replyObj.content" :rows="3" disabled></a-textarea>
          </a-form-item>
        </div>
        <a-form-item>
          <!-- :value="textareaValue" -->
          <a-textarea :rows="4" v-model="commentText" placeholder="愿你的想法与众不同..."></a-textarea>
        </a-form-item>
        <a-form-item style="text-align:right;">
          <a-button html-type="submit" :loading="submitting" @click="handleSubmit" type="primary" icon="smile"> {{pageType=='MESSAGE'?'留言':'评论'}} </a-button>
        </a-form-item>
      </div>
    </a-row>
    <a-divider dashed />
  </div>
</template>

<script>
  export default {
    props:{
      pageType: {
        type: String,
        default: () => 'MESSAGE' // 默认是留言板页面
      },
      isReply: {
        type: Boolean,
        default: () => false // 是否回复
      },
      replyObj: {
        type: Object,
        default: () => {
          return {
            name: '',
            content: ''
          }
        }
      }
    },
    data() {
      return {
        isUser: false, // 是否登录
        user: {
          name: '',
          email: '',
          url: '',
          avatar: '',
          color: ''
        },
        commentText: '',
        urlBefore: 'Https://',
        urlAfter: '.com',
        isEdit: false,
        dropdownVisible: false,
        regexs: {
          email: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
          url: /^((https|http):\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/
        },
        submitting: false
      }
    },
    mounted: function () {
      this.$nextTick(()=>{
        console.log(this.pageType)
        let userStr = localStorage.getItem('user')
        if(userStr){
          this.isUser = true
          this.user = JSON.parse(userStr)
        }
      })
    },
    methods: {
      // 编辑用户
      editUser(){
        this.isEdit = true
        this.isUser = false
      },
      // 清除用户
      clearUser(){
        this.isUser = false
        let user = {
          name: '',
          email: '',
          url: '',
          avatar: ''
        }
        this.user = {...user}
        localStorage.removeItem('user')
      },
      saveUser(){
        localStorage.removeItem('user')
        localStorage.setItem('user', JSON.stringify(this.user))
        this.isEdit = false
        this.isUser = true
      },
      onClickUndo() {
        this.isReply = false
        this.replyObj = {
          name: '',
          content: ''
        }
        this.$emit('onClickUndo')
      },
      handleSubmit() {
        console.log(this.user)
        if(!this.user.name){ return this.$message.info('请输入昵称哟') }
        if(!this.user.email){ return this.$message.info('请输入邮箱哟') }
        if (!this.regexs.email.test(this.user.email)) { return this.$message.info('请正确输入邮箱哟') }
        if(!this.user.url){ return this.$message.info('请输入网址哟') }
        // if (!this.regexs.url.test(this.user.url)) { return this.$message.info('请正确输入网址哟') }
        if(!this.commentText){ return this.$message.info('请输入评论哟') }
        this.user.url = `${this.urlBefore}${this.user.url}${this.urlAfter}`
        this.user.color = this.isUser?this.user.color:this.randomColor()
        let obj = {          
          content: this.commentText
        }
        this.submitting = true
        this.$emit('onSetupSubmit', this.user, obj)
      },
      randomColor(){
        let r = Math.floor(Math.random()*256)
        let g = Math.floor(Math.random()*256)
        let b = Math.floor(Math.random()*256)
        return `rgb(${r},${g},${b})` 
      },
    }
  }
</script>