<style lang="less" scoped>
@deep: ~'>>>';
  .message{
    .guestbook-banner {
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
        padding: 0;
      }
      .ant-row{
        margin: 0;
      }
    }
  }
</style>
<template>
  <div class="message container">
    <div class="guestbook-banner">
      <img src="/images/guestbook.jpg">
      <span>此心光明 亦复何言</span>
    </div>
    <a-row :gutter="16" v-if="!isUser">
      <a-col :span="isEdit?7:8">
        <a-input placeholder="昵称*" v-model="user.nickname">
          <a-icon slot="prefix" type="user" />
        </a-input>
      </a-col>
      <a-col :span="isEdit?7:8">
        <a-input placeholder="邮箱*" v-model="user.email">
          <a-icon slot="prefix" type="global" />
        </a-input>
      </a-col>
      <a-col :span="isEdit?7:8">
        <a-input placeholder="网址" v-model="user.url">
          <a-icon slot="prefix" type="chrome" />
        </a-input>
        <!-- <a-input placeholder="网址" v-model="user.url">
          <a-select slot="addonBefore" defaultValue="Https://" style="width: 90px">
            <a-select-option value="Https://">Https://</a-select-option>
            <a-select-option value="Http://">Http://</a-select-option>
          </a-select>
          <a-select slot="addonAfter" defaultValue=".com" style="width: 80px">
            <a-select-option value=".com">.com</a-select-option>
            <a-select-option value=".cn">.cn</a-select-option>
            <a-select-option value=".jp">.jp</a-select-option>
            <a-select-option value=".org">.org</a-select-option>
          </a-select>
        </a-input> -->
      </a-col>
      <a-col :span="3" v-if="isEdit" @click="saveUser"><a-button icon="check" style="width:100%;"></a-button></a-col>
    </a-row>
    <a-row type="flex" justify="end" align="middle" v-else>
      {{user.nickname}}
      <a-icon type="setting" style="padding: 0 10px;"/>
      <a-dropdown v-model="dropdownVisible">
        <a class="ant-dropdown-link" href="#"> 设置账户信息 </a>
        <a-menu slot="overlay" @click="handleMenuClick">
          <a-menu-item key="1" @click="editUser">编辑信息</a-menu-item>
          <a-menu-item key="2" @click="clearUser">清空信息</a-menu-item>
        </a-menu>
      </a-dropdown>
    </a-row>
    <a-comment>
      <a-avatar
        slot="avatar"
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        alt="Han Solo"
      />
      <div slot="content">
        <a-form-item>
          <!-- :value="textareaValue" -->
          <a-textarea :rows="4" v-model="messageText" placeholder="愿你的观点与众不同..."></a-textarea>
        </a-form-item>
        <a-form-item style="text-align:right;">
          <a-button html-type="submit" :loading="submitting" @click="handleSubmit" type="primary" icon="smile"> 提交 </a-button>
        </a-form-item>
      </div>
    </a-comment>
    <a-divider dashed />
    <a-row type="flex" justify="space-between" align="middle">
      <a-col>
        <a-tag>{{messageList.pagination.total}}条留言</a-tag>
        <a-tag><a-icon type="like" />100人觉得有点牛逼</a-tag>
        <a-tag color="#f50" @click="onShuang">赏</a-tag>
      </a-col>
      <a-col>
        <a-radio-group default-value="a" button-style="solid">
          <a-radio-button value="a">最新</a-radio-button>
          <a-radio-button value="b">最热</a-radio-button>
        </a-radio-group>
      </a-col>
    </a-row>
    <a-divider>评论区</a-divider>
    <a-comment v-for="(item, index) in messageList.list" :key="index">
      <!-- <span slot="actions">Reply to</span> -->
      <template slot="actions">
        <span> Windows 7 Chrome | 75 中国  -  杭州 </span>
        <span>
          <a-tooltip title="Like">
            <a-icon
              type="like"
              :theme="action === 'liked' ? 'filled' : 'outlined'"
              @click="like"
            />
          </a-tooltip>
          <span style="padding-left: '8px';cursor: 'auto'">
            {{ likes }}
          </span>
        </span>
        <span>
          <a-tooltip title="Dislike">
            <a-icon
              type="dislike"
              :theme="action === 'disliked' ? 'filled' : 'outlined'"
              @click="dislike"
            />
          </a-tooltip>
          <span style="padding-left: '8px';cursor: 'auto'">
            {{ dislikes }}
          </span>
        </span>
        <span>Reply to</span>
      </template>
      <a slot="author">{{item.name}}</a>
      <a-avatar
        slot="avatar"
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        alt="Han Solo"
      />
      <p slot="content">{{item.content}}</p>
      <a-tooltip slot="datetime" :title="moment(item.createDate).format('YYYY-MM-DD HH:mm:ss')">
        <span>{{ moment(item.createDate).fromNow() }}</span>
      </a-tooltip>
      <!-- <a-comment>
        <span slot="actions">Reply to</span>
        <a slot="author">Han Solo</a>
        <a-avatar
          slot="avatar"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt="Han Solo"
        />
        <p slot="content">We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure).</p>
        <a-comment>
          <span slot="actions">Reply to</span>
          <a slot="author">Han Solo</a>
          <a-avatar
            slot="avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
          <p slot="content">We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure).</p>
        </a-comment>
        <a-comment>
          <span slot="actions">Reply to</span>
          <a slot="author">Han Solo</a>
          <a-avatar
            slot="avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
          <p slot="content">We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure).</p>
        </a-comment>
      </a-comment> -->
    </a-comment>
    <a-modal
      title="你的支持是我坚持的源泉"
      v-model="modalVisible"
      :footer="null"
      :maskClosable="true"
      centered
    >
      <img src="/images/shang.jpg" style="width: 100%;height: auto;"/>
    </a-modal>
  </div>
</template>

<script>
  import moment from 'moment'
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
        isUser: false,
        user: {
          nickname: '',
          email: '',
          url: '',
          avatar: ''
        },
        isEdit: false,
        messageText: '',
        regexs: {
          email: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
          url: /^((https|http):\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/
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
      let userStr = localStorage.getItem('user')
      if(userStr){
        this.isUser = true
        this.user = JSON.parse(userStr)
      }
      console.info('getMessage', this.$store.state.message.messageList)
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
          nickname: '',
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
      like() {
        this.likes = 1
        this.dislikes = 0
        this.action = 'liked'
      },
      dislike() {
        this.likes = 0
        this.dislikes = 1
        this.action = 'disliked'
      },
      onShuang() {
        this.modalVisible = true
      },
      randomColor(){
        let r = Math.floor(Math.random()*256)
        let g = Math.floor(Math.random()*256)
        let b = Math.floor(Math.random()*256)
        return `rgb(${r}${g}${b})` 
      },
      handleMenuClick() {
      },
      handleSubmit() {
        console.log(this.user)
        if(!this.user.nickname){ return this.$message.info('请输入昵称哟') }
        if(!this.user.email){ return this.$message.info('请输入邮箱哟') }
        if (!this.regexs.email.test(this.user.email)) { return this.$message.info('请正确输入邮箱哟') }
        if(!this.user.url){ return this.$message.info('请输入网址哟') }
        if (!this.regexs.url.test(this.user.url)) { return this.$message.info('请正确输入网址哟') }
        if(!this.messageText){ return this.$message.info('请输入评论哟') }
        localStorage.setItem('user', JSON.stringify(this.user))
        this.user = true
      }
    }
  }
</script>