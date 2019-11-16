<style lang="less" scoped>
@deep: ~'>>>';
  .message{
    .message-banner {
      position: relative;
      overflow: hidden;
      width: 100%;
      height: auto;
      max-height: 260px;
      border: 0;
      img {
        width: 100%;
        // margin-top: -5em;
        transition: all 1s;
        // @include css3-prefix(transition, all 1s);

        &:hover {
          transform: rotate(2deg) scale(1.1);
          transition: all 1s;
          // @include css3-prefix(transform, rotate(2deg) scale(1.1));
          // @include css3-prefix(transition, all 1s);
        }
      }

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
      <span>日子匆匆，独留欢欣。</span>
    </div>
    <setup ref="setup" :pageType="'MESSAGE'" :isReply="isReply" :replyObj="replyObj" @onSetupSubmit="onSetupSubmit" @onClickUndo="onClickUndo"></setup>
    <a-row type="flex" justify="space-between" align="middle">
      <a-col>
        <a-tag v-if="messageList.pagination.total">{{messageList.pagination.total}}条留言</a-tag>
        <!-- <a-tag><a-icon type="like" />100人觉得有点牛逼</a-tag> -->
        <a-tag color="#f50" @click="onShuang">赏</a-tag>
      </a-col>
      <a-col>
        <a-radio-group v-model="radioValue" button-style="solid" @change="onRadioChange">
          <a-radio-button value="new">最新</a-radio-button>
          <a-radio-button value="hot">最热</a-radio-button>
        </a-radio-group>
      </a-col>
    </a-row>
    <a-divider style="margin: 10px 0;">留言区</a-divider>
    <div v-if ="messageList.list.length">
      <a-row style="min-height: 260px;">
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
              <a-tooltip title="胸弟真的要这样？">
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
          <a-avatar shape="circle" size="large" :style="{backgroundColor: item.color, fontSize: '20px',verticalAlign: 'middle'}" slot="avatar">{{item.name.slice(0,1)}}</a-avatar>
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
      <a-row type="flex" justify="center" align="middle" style="padding: 20px 0;">
        <a-pagination simple :pageSize="messageList.pagination.pageSize" :total="messageList.pagination.total" @change="onPageChange"/>
      </a-row>
    </div>
    <div v-else style="text-align: center;padding: 30px 0;"> 暂无评论 </div>
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
  import setup from '~/components/setup'
  export default {
    name: 'Message',
    head(){
      return { title: '观言墙 | Message' }
    },
    fetch ({ store, params }) {
      return store.dispatch('message/getMessage', { currentPage: 1, pageSize: 10, postId: 0})
    },
    components: {
      setup
    },
    data(){
      return {
        dropdownVisible: false,
        likes: 0,
        dislikes: 0,
        action: null,
        moment,
        modalVisible: false,
        textareaValue: '',
        isUser: false, // 是否登录
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
      console.info('getMessage', this.$store.state.message.messageList)
      let userStr = localStorage.getItem('user')
      if(userStr){
        this.isUser = true
        this.user = JSON.parse(userStr)
      }
    },
    methods: {
      browserParse,
      osParse,
      // 点赞
      onLike(item) {
        if(!this.isUser){
          window.scrollTo(0, 0)
          this.$message.info('请先设置用户信息')
          return false
        }
        let messageIds = JSON.parse(localStorage.getItem('messageIds'))
        if(!messageIds||!messageIds.includes(item.id)){
          this.$axios.patch('/messageLikes',{_id: item._id, likes: item.likes+1}).then(res=>{
            if(res.data.success){
              let arr = JSON.parse(localStorage.getItem('messageIds')) || []
              arr.push(item.id)
              localStorage.setItem('messageIds', JSON.stringify(arr))
              let params = { currentPage: this.currentPage, pageSize: 10, postId: 0}
              if(this.radioValue=='hot'){
                params.hot = true
              }
              this.$store.dispatch('message/getMessage', params)
              this.$message.info('留言点赞成功')
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
        let messageIds = JSON.parse(localStorage.getItem('messageIds'))
        if(!messageIds||!messageIds.includes(item.id)){
          this.$axios.patch('/messageDislikes',{_id: item._id, dislikes: item.dislikes+1}).then(res=>{
            if(res.data.success){
              let arr = JSON.parse(localStorage.getItem('messageIds')) || []
              arr.push(item.id)
              localStorage.setItem('messageIds', JSON.stringify(arr))
              let params = { currentPage: this.currentPage, pageSize: 10, postId: 0}
              if(this.radioValue=='hot'){
                params.hot = true
              }
              this.$store.dispatch('message/getMessage', params)
              this.$message.info('留言吐槽成功')
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
      // 取消回复
      onClickUndo() {
        this.isReply = false
        this.replyObj = {
          name: '',
          content: ''
        }
      },
      onShuang() {
        this.modalVisible = true
      },
      // 最新/最热切换
      onRadioChange(e){
        if(e.target.value === 'hot'){
          this.$store.dispatch('message/getMessage', { currentPage: 1, pageSize: 10 ,hot: true, postId: 0})
        }else{
          this.$store.dispatch('message/getMessage', { currentPage: 1, pageSize: 10, postId: 0})
        }
      },
      handleMenuClick() {},
      onSetupSubmit(user, obj) {
        // console.log(user)
        // console.log(obj)
        if(!this.$refs.setup.isUser){
          localStorage.removeItem('user')
          localStorage.removeItem('messageIds')
          localStorage.removeItem('articleIds')
          this.$refs.setup.user = {...user}
        }
        if(this.isReply){
          obj.replyId = this.replyObj._id
          obj.replyFloor = this.replyObj.id
          obj.isReply = true
          obj.replyName = this.replyObj.name
          obj.replyContent = this.replyObj.content
        }
        obj.postId = 0
        obj.postType = 'message'
        this.$axios.post('/message',{...this.$refs.setup.user, ...obj}).then(res=>{
          // console.log(res)
          if(res.data.success){
            this.isUser = true
            this.isReply = false
            localStorage.setItem('user', JSON.stringify(this.$refs.setup.user))
            this.$message.info(res.data.msg)
            // this.articleHotList = res.data.list
            this.$refs.setup.commentText = ''
            this.$refs.setup.submitting = false
          }else{
            this.$message.info(res.data.msg)
          }
        })
      },
      onPageChange(page) {
        this.currentPage = page
        let params = { currentPage: page, pageSize: 10, postId: 0}
        if(this.radioValue=='hot'){
          params.hot = true
        }
        this.$store.dispatch('message/getMessage', params)
      }
    }
  }
</script>