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
      width: 860px;
      height: 160px;
      text-align: center;
      color: #fff;
      line-height: 160px;
      background-color: blue;
    }
  }
</style>

<template>
  <section class="articel-detail">
    <h3 class="title">{{article.title}}</h3>
    <article v-html="article.content"></article>
    <a-carousel autoplay class="ad">
      <div>广告位1</div>
      <div>广告位2</div>
      <div>广告位3</div>
      <div>广告位4</div>
    </a-carousel>
    <share-box key="share" class="share"/>
    <div>
      <div>
        本文于 {{moment(article.createTime).format('YYYY-MM-DD HH:mm:ss')}} 发布，作者 {{article.author}}
      </div>
      <div>
        <span>当前已被围观 {{article.meta.views}} 次 </span>
        <span @click.stop="onLike(article)">
          <a-tooltip title="赞一个鸭">
            <a-icon type="like" />
          </a-tooltip>
          <span style="padding-left: '8px';"> {{ article.meta.likes }} </span>
        </span>
        <span @click="onDislike(article)" >
          <a-tooltip title="兄得请不要这样">
            <a-icon type="dislike"/>
          </a-tooltip>
          <span style="padding-left: '8px';"> {{ article.meta.dislikes }} </span>
        </span>
        <a-tag color="#f50" @click="onShuang">赏</a-tag>
      </div>
      <div>相关标签： {{filterTags(article.tag)}}</div>
      <div>永久地址： https://sycho.cn/article/{{article.id}}</div>
      <div>版权声明： 自由转载-署名-非商业性使用 | 赛柯 | Sycho.cn</div>
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
          <a class="ant-dropdown-link" href="#"> 设置账户信息 </a>
          <a-menu slot="overlay">
            <a-menu-item key="1" @click="editUser">编辑信息</a-menu-item>
            <a-menu-item key="2" @click="clearUser">清空信息</a-menu-item>
          </a-menu>
        </a-dropdown>
      </a-row>
      <a-row type="flex">
        <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo" />
        <div style="flex: 1;">
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
import ShareBox from '~/components/share'
import moment from 'moment'
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
    ShareBox
  },
  data() {
    return{
      moment,
      modalVisible: false,
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
      isReply: false, // 是否回复
      replyObj: {
        name: '',
        content: ''
      },
      submitting: false
    }
  },
  validate ({ params }) {
    // 必须是number类型
    return /^\d+$/.test(params.id)
  },
  fetch ({ store, params }) {
    return store.dispatch(`article/getArticleById`,{id: params.id})
  },
  computed: {
    article() {
      return this.$store.state.article.article
    }
  },
  // data() {
  //   id: params.id
  // },
  mounted: function () {
    this.$nextTick(()=>{
      // console.log(this.$route.params.id)
      // console.log(this.article)
      let userStr = localStorage.getItem('user')
      if(userStr){
        this.isUser = true
        this.user = JSON.parse(userStr)
      }
    })
  },
  methods:{
    clearUser() {},
    editUser() {},
    saveUser() {},
    handleSubmit() {},
    onLike(article) {
      console.log(article)
      if(!localStorage.getItem('user')){
        this.$message.info('请先设置用户信息')
        return false
      }
      let articleIds = JSON.parse(localStorage.getItem('articleIds'))
      if(!articleIds||!articleIds.includes(article.id)){
        let meta = {...article.meta}
        meta.likes = meta.likes+1
        this.$axios.patch('/articleLikes',{_id: article._id, meta}).then(res=>{
          if(res.data.success){
            let arr = articleIds || []
            arr.push(article.id)
            localStorage.setItem('articleIds', JSON.stringify(arr))
            this.$message.info('点赞成功')
            window.location.reload()
          }else{
            this.$message.info(res.data.msg)
          }
        })
      }else{
        this.$message.info('您已操作，请不要贪心哦')
      }
    },
    onDislike(article) {
      if(!localStorage.getItem('user')){
        this.$message.info('请先设置用户信息')
        return false
      }
      let articleIds = JSON.parse(localStorage.getItem('articleIds'))
      if(!articleIds||!articleIds.includes(article.id)){
        let meta = {...article.meta}
        meta.dislikes = meta.dislikes+1
        this.$axios.patch('/articleDislikes',{_id: article._id, meta}).then(res=>{
          if(res.data.success){
            let arr = articleIds || []
            arr.push(article.id)
            localStorage.setItem('articleIds', JSON.stringify(arr))
            this.$message.info('吐槽成功')
            window.location.reload()
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
    },
    filterTags(tags) {
      let articleTags = [
        { value: '1', label: 'javascript' }, 
        { value: '2', label: 'css&css3' }, 
        { value: '3', label: 'html&html5' },
        { value: '4', label: 'vue' },
        { value: '5', label: 'canvas' },
        { value: '6', label: 'express' },
        { value: '7', label: 'koa2' }, 
        { value: '8', label: 'node' },
        { value: '9', label: '小程序' },
        { value: '10', label: 'app' }
      ]
      let arr = []
      for(let i of tags.split(',')){
        console.log(i)
        for(let j of articleTags){
          if(j.value == i){
            console.log(j)
            arr.push(j.label)
            break
          }
        }
      }
      return arr.join('，')
    }
  }
}
</script>
