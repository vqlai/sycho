<style lang="less" scoped>
@deep: ~'>>>'; 
  .articel-detail{
    .title{
      text-align: center;
      font-size: 30px;
      font-weight: 600;
      color: #333;
    }
    .share{
      padding: 10px 0;
      @{deep} .share-base{
        display: flex;
        justify-content: center;
      }
    }
    .ant-carousel{
      margin: 10px 0;
      width: 100%;
      min-height: 80px;
      text-align: center;
      color: #fff;
      // background-color: #1890ff;
      img{
        width: 100%;
      }
    }
  }
</style>

<template>
  <section class="articel-detail">
    <h3 class="title">{{article.title}}</h3>
    <article v-html="article.content"></article>
    <client-only>
      <a-carousel>
        <div><a href="https://s.click.taobao.com/PWVcYxv" target="_blank" rel="noopener noreferrer" style="display: block;"><img src="/images/aliyun-1200-120.jpg" alt=""></a></div>
        <!-- <div>广告位2</div> -->
        <!-- <div>广告位3</div> -->
      </a-carousel>
    </client-only>
    <!-- <share-box key="share" class="share" id="share"/> -->
    <div>
      <div>
        本文于 {{moment(article.createDate).format('YYYY-MM-DD HH:mm:ss')}} 发布，作者 {{article.author}}
      </div>
      <div>
        <span style="padding-right: 10px;">当前已被围观 {{article.views}} 次 </span>
        <span @click.stop="onLike(article)">
          <a-tooltip title="赞一个鸭">
            <a-icon type="like" />
          </a-tooltip>
          <span style="padding-right: 10px;"> {{ article.likes }} </span>
        </span>
        <span @click="onDislike(article)" >
          <a-tooltip title="兄得请不要这样">
            <a-icon type="dislike"/>
          </a-tooltip>
          <span style="padding-right: 10px;"> {{ article.dislikes }} </span>
        </span>
        <!-- <a-tag color="#f50" @click="onShuang">赏</a-tag> -->
      </div>
      <div>相关标签： {{article.tagDesc}}</div>
      <div>永久地址： https://sycho.cn/article/{{article.id}}</div>
      <div>版权声明： 自由转载-署名-非商业性使用 | 赛柯 | Sycho.cn</div>
      <setup ref="setup" :pageType="'ARTICLE'" :isReply="isReply" :replyObj="replyObj" @onSetupSubmit="onSetupSubmit" @onClickUndo="onClickUndo"/>
      <a-row type="flex" justify="space-between" align="middle">
        <a-col>
          <a-tag v-if="messageList.pagination.total">{{messageList.pagination.total}}条评论</a-tag>
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
      <a-divider>评论区</a-divider>
      <div v-if="messageList.list.length">
        <a-row style="min-height: 160px;">
          <a-comment v-for="(item, index) in messageList.list" :key="index">
            <template slot="actions">
              <span class="os" v-html="osParse(item.agent)" v-if="item.agent"></span>
              <span class="ua" v-html="browserParse(item.agent)" v-if="item.agent"></span>
              <span>
                <a-tooltip title="赞一个鸭">
                  <a-icon type="like" :theme="action === 'liked' ? 'filled' : 'outlined'" @click="onCommentLike(item)" />
                </a-tooltip>
                <span style="padding-left: '5px';cursor: 'auto'"> {{ item.likes }} </span>
              </span>
              <span>
                <a-tooltip title="胸弟真的要这样？">
                  <a-icon type="dislike" :theme="action === 'disliked' ? 'filled' : 'outlined'" @click="onCommentDislike(item)" />
                </a-tooltip>
                <span style="padding-left: '5px';cursor: 'auto'"> {{ item.dislikes }} </span>
              </span>
              <span>
                <a-tooltip title="说出来世界都是你的">
                  <a-icon type="rocket" :theme="action === 'disliked' ? 'filled' : 'outlined'" @click="onCommentDislike(item)" />
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
        <a-row type="flex" justify="center" align="middle" style="padding: 20px 0;">
          <a-pagination simple :pageSize="messageList.pagination.pageSize" :total="messageList.pagination.total" @change="onPageChange"/>
        </a-row>
      </div>
      <div v-else style="text-align: center;padding: 30px 0;"> 暂无评论 </div>
    </div>
    <a-modal
      title="你的支持是我坚持的源泉"
      v-model="modalVisible"
      :footer="null"
      :maskClosable="true"
      centered
    >
      <img src="/images/shang.jpg" style="width: 100%;height: auto;"/>
    </a-modal>
  </section>
</template>

<script>
// 文章详情
// import ShareBox from '~/components/share'
import setup from '~/components/setup'
import moment from 'moment'
import { browserParse, osParse } from '~/assets/js/ua-os-browser'
export default {
  name: 'ArticleDetail',
  head () {
    return {
      title: `${this.article.title} | sycho`,
      meta: [
        { hid: 'books custom title', name: 'books', content: 'books custom title description' }
      ]
    }
  },
  components: {
    // ShareBox,
    setup
  },
  async fetch ({ store, params }) {
    // return store.dispatch(`article/getArticleById`,{id: params.id})
    // await Promise.all([
    //   store.dispatch(`article/getArticleById`,{id: params.id}),
    //   store.dispatch(`message/getMessage`, { currentPage: 1, pageSize: 10, postId: params.id})
    // ])
    await store.dispatch(`message/getMessage`, { currentPage: 1, pageSize: 10, postId: params.id})
    await store.dispatch(`article/getArticleById`,{id: params.id})
  },
  data() {
    return{
      moment,
      modalVisible: false,
      currentPage: 1,
      radioValue: 'new',
      isReply: false, // 是否回复
      replyObj: {
        name: '',
        content: ''
      },
      action: null
      // isUser: false, // 是否登录
    }
  },
  computed: {
    article() {
      return this.$store.state.article.article
    },
    messageList() {
      return this.$store.state.message.messageList
    }
  },
  validate ({ params }) {
    // 必须是number类型
    return /^\d+$/.test(params.id)
  },
  mounted: function () {
    this.$nextTick(()=>{
      // console.log(this.$route.params.id)
      // console.log(this.article)
      // let userStr = localStorage.getItem('user')
      // if(userStr){
      //   this.isUser = true
      //   this.user = JSON.parse(userStr)
      // }
    })
  },
  methods:{
    browserParse,
    osParse,
    // 评论提交
    onSetupSubmit(user, obj) {
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
      obj.postId = this.$route.params.id
      obj.postType = 'article'
      this.$axios.post('/message',{...this.$refs.setup.user, ...obj}).then(res=>{
        // console.log(res)
        if(res.data.success){
          this.$refs.setup.isUser = true
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
      let params = { currentPage: page, pageSize: 10, postId: this.$route.params.id}
      if(this.radioValue=='hot'){
        params.hot = true
      }
      this.$store.dispatch('message/getMessage', params)
    },
    // 回复
    onReply(item){
      // window.scrollTo(0, 0)
      this.$el.querySelector('#share').scrollIntoView()
      if(this.$refs.setup.isUser){
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
    // 最新/最热切换
    onRadioChange(e){
      if(e.target.value === 'hot'){
        this.$store.dispatch('message/getMessage', { currentPage: 1, pageSize: 10 ,hot: true, postId: this.$route.params.id})
      }else{
        this.$store.dispatch('message/getMessage', { currentPage: 1, pageSize: 10, postId: this.$route.params.id})
      }
    },
    // 评论点赞
    onCommentLike(item) {
      if(!this.$refs.setup.isUser){
        this.$el.querySelector('#share').scrollIntoView()
        this.$message.info('请先设置用户信息')
        return false
      }
      let commentIds = JSON.parse(localStorage.getItem(`commentIds${this.$route.params.id}`))
      if(!commentIds||!commentIds.includes(item.id)){
        this.$axios.patch('/messageLikes',{_id: item._id, likes: item.likes+1}).then(res=>{
          if(res.data.success){
            let arr = JSON.parse(localStorage.getItem(`commentIds${this.$route.params.id}`)) || []
            arr.push(item.id)
            localStorage.setItem(`commentIds${this.$route.params.id}`, JSON.stringify(arr))
            let params = { currentPage: this.currentPage, pageSize: 10, postId: this.$route.params.id}
            if(this.radioValue=='hot'){
              params.hot = true
            }
            this.$store.dispatch('message/getMessage', params)
            this.$message.info('评论点赞成功')
          }else{
            this.$message.info(res.data.msg)
          }
        })
      }else{
        this.$message.info('您已操作，请不要贪心哦')
      }
    },
    // 评论吐槽
    onCommentDislike(item) {
      if(!this.$refs.setup.isUser){
        this.$el.querySelector('#share').scrollIntoView()
        this.$message.info('请先设置用户信息')
        return false
      }
      let commentIds = JSON.parse(localStorage.getItem(`commentIds${this.$route.params.id}`))
      if(!commentIds||!commentIds.includes(item.id)){
        this.$axios.patch('/messageDislikes',{_id: item._id, dislikes: item.dislikes+1}).then(res=>{
          if(res.data.success){
            let arr = JSON.parse(localStorage.getItem(`commentIds${this.$route.params.id}`)) || []
            arr.push(item.id)
            localStorage.setItem(`commentIds${this.$route.params.id}`, JSON.stringify(arr))
            let params = { currentPage: this.currentPage, pageSize: 10, postId: this.$route.params.id}
            if(this.radioValue=='hot'){
              params.hot = true
            }
            this.$store.dispatch('message/getMessage', params)
            this.$message.info('评论吐槽成功')
          }else{
            this.$message.info(res.data.msg)
          }
        })
      }else{
        this.$message.info('您已操作，请不要贪心哦')
      }
    },
    // 文章点赞
    onLike(article) {
      // console.log(article)
      if(!localStorage.getItem('user')){
        this.$message.info('请先设置用户信息')
        return false
      }
      let articleIds = JSON.parse(localStorage.getItem('articleIds'))
      if(!articleIds||!articleIds.includes(article.id)){
        let likes = article.likes+1
        this.$axios.patch('/articleLikes',{_id: article._id, likes}).then(res=>{
          if(res.data.success){
            let arr = articleIds || []
            arr.push(article.id)
            localStorage.setItem('articleIds', JSON.stringify(arr))
            this.$message.info('文章点赞成功')
            // window.location.reload()
            // article.likes+=1 // 错误操作修改vuex的值
            this.$store.commit('article/UPDATE_LIKE')
          }else{
            this.$message.info(res.data.msg)
          }
        })
      }else{
        this.$message.info('您已操作，请不要贪心哦')
      }
    },
    // 文章吐槽
    onDislike(article) {
      if(!localStorage.getItem('user')){
        this.$message.info('请先设置用户信息')
        return false
      }
      let articleIds = JSON.parse(localStorage.getItem('articleIds'))
      if(!articleIds||!articleIds.includes(article.id)){
        let dislikes = article.dislikes+1
        this.$axios.patch('/articleDislikes',{_id: article._id, dislikes}).then(res=>{
          if(res.data.success){
            let arr = articleIds || []
            arr.push(article.id)
            localStorage.setItem('articleIds', JSON.stringify(arr))
            this.$message.info('文章吐槽成功')
            // window.location.reload()
            // article.dislikes+=1 // 错误操作修改vuex的值
            this.$store.commit('article/UPDATE_DISLIKE')
          }else{
            this.$message.info(res.data.msg)
          }
        })
      }else{
        this.$message.info('您已操作，请不要贪心哦')
      }
    },
    onShuang() {
      this.modalVisible = true
    }
  }
}
</script>
