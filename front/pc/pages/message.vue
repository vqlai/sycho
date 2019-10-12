<style lang="less" scoped>
@deep: ~'>>>';
  .message{
    .message-banner {
      position: relative;
      margin-bottom: 20px;
      overflow: hidden;
      width: 100%;
      height: 17em;
      border: 0;

      img {
        width: 100%;
        margin-top: -5em;
        transition: all 1s;
        // @include css3-prefix(transition, all 1s);

        &:hover {
          margin-top: -6em;
          transform: rotate(2deg) scale(1.1);
          transition: all 1s;
          // @include css3-prefix(transform, rotate(2deg) scale(1.1));
          // @include css3-prefix(transition, all 1s);
        }
      }

      span {
        position: absolute;
        right: 2em;
        bottom: 2em;
        display: block;
        font-weight: 700;
        opacity: .5;
        cursor: progress;
        padding: 0 .618em;
        padding-left: 3rem;
        height: 2em;
        line-height: 2em;
        color: #eee;
        background: linear-gradient(to left, hsla(0, 0%, 100%, 0.6), hsla(0, 0%, 77%, 0.3), transparent);
      }
    }
    >.ant-row{
      padding: 0 0 20px;
    }
    .ant-divider-horizontal{
      margin: 20px 0;
    }
    .ant-comment{
      @{deep} .ant-comment-inner{
        padding: 0 0 10px;
      }
      .ant-row{
        margin: 0;
      }
    }
  }
</style>
<template>
  <div class="message container">
    <div class="message-banner">
      <img src="/images/message.jpg">
      <span>此心光明 亦复何言</span>
    </div>
    <a-row :gutter="16" v-if="!isUser">
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
    <a-row type="flex" justify="end" align="middle" v-else>
      {{user.name}}
      <a-icon type="setting" style="padding: 0 10px;"/>
      <a-dropdown v-model="dropdownVisible">
        <a class="ant-dropdown-link" href="#"> 设置账户信息 </a>
        <a-menu slot="overlay" @click="handleMenuClick">
          <a-menu-item key="1" @click="editUser">编辑信息</a-menu-item>
          <a-menu-item key="2" @click="clearUser">清空信息</a-menu-item>
        </a-menu>
      </a-dropdown>
    </a-row>
    <a-row type="flex">
      <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo" />
      <div style="flex:1;">
        <div v-if="isReply">
          <a-form-item style="padding: 0 0 6px;">
            <a-input v-model="replyObj.name" disabled></a-input>
          </a-form-item>
          <a-form-item style="padding: 0 0 6px;">
            <a-textarea v-model="replyObj.content" :rows="3" disabled></a-textarea>
          </a-form-item>
        </div>
        <a-form-item>
          <!-- :value="textareaValue" -->
          <a-textarea :rows="4" v-model="commentText" placeholder="愿你的观点与众不同..."></a-textarea>
        </a-form-item>
        <a-form-item style="text-align:right;">
          <a-button html-type="submit" :loading="submitting" @click="handleSubmit" type="primary" icon="smile"> 提交 </a-button>
        </a-form-item>
      </div>
    </a-row>
    <a-divider dashed />
    <a-row type="flex" justify="space-between" align="middle">
      <a-col>
        <a-tag>{{messageList.pagination.total}}条留言</a-tag>
        <a-tag><a-icon type="like" />100人觉得有点牛逼</a-tag>
        <a-tag color="#f50" @click="onShuang">赏</a-tag>
      </a-col>
      <a-col>
        <a-radio-group v-model="radioValue" button-style="solid" @change="onRadioChange">
          <a-radio-button value="new">最新</a-radio-button>
          <a-radio-button value="hot">最热</a-radio-button>
        </a-radio-group>
      </a-col>
    </a-row>
    <a-divider>评论区</a-divider>
    <div v-if ="messageList.list.length">
      <a-row style="min-height: 160px;">
        <a-comment v-for="(item, index) in messageList.list" :key="index">
          <template slot="actions">
            <span class="os" v-html="osParse(item.agent)" v-if="item.agent"></span>
            <span class="ua" v-html="browserParse(item.agent)" v-if="item.agent"></span>
            <span>
              <a-tooltip title="赞一个鸭">
                <a-icon type="like" :theme="action === 'liked' ? 'filled' : 'outlined'" @click="onLike(item)" />
              </a-tooltip>
              <span style="padding-left: '5px';cursor: 'auto'"> {{ item.likes }} </span>
            </span>
            <span>
              <a-tooltip title="胸弟请不要这样">
                <a-icon type="dislike" :theme="action === 'disliked' ? 'filled' : 'outlined'" @click="onDislike(item)" />
              </a-tooltip>
              <span style="padding-left: '5px';cursor: 'auto'"> {{ item.dislikes }} </span>
            </span>
            <span>
              <a-tooltip title="说出来世界都是你的">
                <a-icon type="rocket" :theme="action === 'disliked' ? 'filled' : 'outlined'" @click="onDislike(item)" />
              </a-tooltip>
              <span style="padding-left: '5px';cursor: 'auto'" @click="onReply(item)"> 回复 </span>
            </span>
          </template>
          <a slot="author">{{item.name}}</a>
          <a-avatar
            v-if="item.avator"
            slot="avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            :alt="item.name"
          />
          <a-avatar shape="circle" size="large" :style="{backgroundColor: item.color, fontSize: '20px'}" slot="avatar">{{item.name.slice(0,1)}}</a-avatar>
          <div slot="content">
            <p style="color:#999;font-size: 12px;" v-if="item.isReply">
              <span>回复</span>
              <span style="margin: 0 6px;">{{'#'+ item.replyFloor}}</span>
              <span>{{ '@' + item.replyName+'：'}}</span>
            </p>
            {{item.content}}
          </div>
          <a-tooltip slot="datetime" :title="moment(item.createDate).format('YYYY-MM-DD HH:mm:ss')">
            <span>{{ moment(item.createDate).fromNow() }}</span>
            <span style="margin-left: 16%;">{{'#'+item.id}}</span>
          </a-tooltip>
        </a-comment>
      </a-row>
      <a-row type="flex" justify="center" align="middle" style="padding-top: 20px;">
        <a-pagination simple :pageSize="messageList.pagination.pageSize" :total="messageList.pagination.total" @change="onPageChange"/>
      </a-row>
    </div>
    <div v-else style="text-align: center;padding-top: 30px;"> 暂无评论 </div>
    <a-modal
      title="你的支持是我坚持的源泉"
      v-model="modalVisible"
      :footer="null"
      :maskClosable="true"
      centered >
      <img src="/images/shang.jpg" style="width: 100%;height: auto;"/>
    </a-modal>
  </div>
</template>

<script>
  import moment from 'moment'
  import { browserParse, osParse } from '~/assets/js/ua-os-browser'
  export default {
    name: 'Message',
    head(){
      return { title: '留言墙|Message' }
    },
    fetch ({ store, params }) {
      return store.dispatch('message/getMessage', { currentPage: 1, pageSize: 10})
    },
    data(){
      return {
        dropdownVisible: false,
        likes: 0,
        dislikes: 0,
        action: null,
        moment,
        modalVisible: false,
        submitting: false,
        textareaValue: '',
        isUser: false, // 是否登录
        user: {
          name: '',
          email: '',
          url: '',
          avatar: '',
          color: ''
        },
        urlBefore: 'Https://',
        urlAfter: '.com',
        isEdit: false,
        commentText: '',
        regexs: {
          email: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
          url: /^((https|http):\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/
        },
        radioValue: 'new',
        isReply: false, // 是否回复
        replyObj: {
          name: '',
          content: ''
        }
      }
    },
    computed: {
      messageList() {
        return this.$store.state.message.messageList
      }
    },
    mounted(){
      // console.info('user', localStorage.getItem('user'))
      // 用户已经保存在storage则直接获取用户信息
      let userStr = localStorage.getItem('user')
      if(userStr){
        this.isUser = true
        this.user = JSON.parse(userStr)
      }
      console.info('getMessage', this.$store.state.message.messageList)
    },
    methods: {
      browserParse,
      osParse,
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
      // 点赞
      onLike(item) {
        if(!this.isUser){
          window.scrollTo(0, 0)
          this.$message.info('请先设置用户信息')
          return false
        }
        let messageList = JSON.parse(localStorage.getItem('messageList'))
        if(!messageList||!messageList.includes(item.id)){
          this.$axios.patch('/messageLikes',{_id: item._id, likes: item.likes+1}).then(res=>{
            if(res.data.success){
              let arr = JSON.parse(localStorage.getItem('messageList')) || []
              arr.push(item.id)
              localStorage.setItem('messageList', JSON.stringify(arr))
              let params = { currentPage: this.currentPage, pageSize: 10}
              if(this.radioValue=='hot'){
                params.hot = true
              }
              this.$store.dispatch('message/getMessage', params)
            }else{
              this.$message.info(res.data.msg)
            }
          })
        }else{
          this.$message.info('您已操作，请不要贪心哦')
        }
      },
      // 吐槽
      onDislike(item) {
        if(!this.isUser){
          window.scrollTo(0, 0)
          this.$message.info('请先设置用户信息')
          return false
        }
        let messageList = JSON.parse(localStorage.getItem('messageList'))
        if(!messageList||!messageList.includes(item.id)){
          this.$axios.patch('/messageDislikes',{_id: item._id, dislikes: item.dislikes+1}).then(res=>{
            if(res.data.success){
              let arr = JSON.parse(localStorage.getItem('messageList')) || []
              arr.push(item.id)
              localStorage.setItem('messageList', JSON.stringify(arr))
              let params = { currentPage: this.currentPage, pageSize: 10}
              if(this.radioValue=='hot'){
                params.hot = true
              }
              this.$store.dispatch('message/getMessage', params)
            }else{
              this.$message.info(res.data.msg)
            }
          })
        }else{
          this.$message.info('您已操作，请不要贪心哦')
        }
      },
      // 回复
      onReply(item){
        window.scrollTo(0, 0)
        if(this.isUser){
          this.isReply = true
          this.replyObj = {...item}
        }else{
          this.$message.info('请先设置用户信息')
        }
      },
      onShuang() {
        this.modalVisible = true
      },
      randomColor(){
        let r = Math.floor(Math.random()*256)
        let g = Math.floor(Math.random()*256)
        let b = Math.floor(Math.random()*256)
        return `rgb(${r},${g},${b})` 
      },
      // 最新/最热切换
      onRadioChange(e){
        if(e.target.value === 'hot'){
          this.$store.dispatch('message/getMessage', { currentPage: 1, pageSize: 10 ,hot: true})
        }else{
          this.$store.dispatch('message/getMessage', { currentPage: 1, pageSize: 10})
        }
      },
      handleMenuClick() {},
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
        if(this.isReply){
          obj.replyId = this.replyObj._id
          obj.replyFloor = this.replyObj.id
          obj.isReply = true
          obj.replyName = this.replyObj.name
          obj.replyContent = this.replyObj.content
        }
        this.submitting = true
        this.$axios.post('/message',{...this.user, ...obj}).then(res=>{
          console.log(res)
          this.submitting = false
          if(res.data.success){
            this.isUser = true
            this.isReply = false
            localStorage.setItem('user', JSON.stringify(this.user))
            this.commentText = ''
            this.$message.info(res.data.msg)
            // this.articleHotList = res.data.list
          }else{
            this.$message.info(res.data.msg)
          }
        })
      },
      onPageChange(page) {
        this.currentPage = page
        let params = { currentPage: page, pageSize: 10}
        if(this.radioValue=='hot'){
          params.hot = true
        }
        this.$store.dispatch('message/getMessage', params)
      }
    }
  }
</script>