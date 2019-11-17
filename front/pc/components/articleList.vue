<style lang="less" scoped>
  @deep: ~'>>>';
  .article{
    padding: 20px 0;
    @{deep} .ant-list-pagination{
      text-align: center;
    }
    @{deep} .ant-list{
      .ant-spin-container{
        min-height: 580px;
        .ant-list-empty-text{
          padding: 30% 0 0;
        }
      }
      .ant-list-item{
        padding: 10px;
        transition: all .5s ease;
        &:hover{
          background-color: rgba(205, 231, 255, 0.3);;
        }
        .ant-list-item-extra{
          img{
            &:hover{
              transform: scale(1.2);
            }
          }
        }
        .ant-list-item-extra-wrap{
          width: 100%;
          flex-direction: row-reverse;
          .ant-list-item-extra{
            margin: 0 16px 0;
            overflow: hidden;
            img{
              transition: all 0.5s ease;
            }
          }
          .ant-list-item-main{
            padding-left: 20px;
            flex: 1;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            .ant-list-item-content{
              width: 100%;
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 576px){
    .article{
      @{deep} .ant-list{
        .ant-spin-container{
          min-height: auto;
        }
        .ant-list-item{
          padding: 6px;
          .ant-list-item-extra-wrap{
            .ant-list-item-main{
              padding-left: 0;
            }
            .ant-list-item-extra{
              display: none;
            }
          }
        }
      }
    }
  }
  @media (min-width: 577px) and (max-width: 768px){
    .article{
      @{deep} .ant-list{
        .ant-spin-container{
          min-height: 680px;
        }
        .ant-list-item{
          padding: 6px;
          .ant-list-item-extra-wrap{
            .ant-list-item-main{
              padding-left: 10px;
            }
            .ant-list-item-extra{
              margin: 0!important;
            }
          }
        }
      }
    }
  }
  @media (min-width: 769px) and (max-width: 1200px){
    .article{
      @{deep} .ant-list{
        .ant-list-item{
          padding: 6px;
          .ant-list-item-extra-wrap{
            .ant-list-item-main{
              padding-left: 10px;
            }
            .ant-list-item-extra{
              margin: 0!important;
            }
          }
        }
      }
    }
  }
</style>
<template>
  <section class="article">
    <a-list :pagination="articleList.list.length?pagination:false" :data-source="articleList.list" item-layout="vertical" size="small" :loading="listLoading">
      <a-list-item slot="renderItem" slot-scope="item, index" :key="index" @click="gotoDetail(item)" style="cursor: pointer;">
        <div slot="extra">
          <nuxt-link :to="`/article/${item.id}`">
            <!-- @onerror="onImgError()" :onerror="defaultImg" -->
            <img width="120" alt="logo" :src="getThumb(item.thumb)"/>
          </nuxt-link>
        </div>
        <!-- <template slot="actions" v-for="{type, text} in actions">
          <span :key="type"> <a-icon :type="type" style="margin-right: 8px" /> {{text}} </span>
        </template> -->
        <template slot="actions">
          <!-- .format('YYYY-MM-DD HH:mm:ss') -->
          <span><a-icon type="clock-circle" style="margin-right: 8px" />{{moment(item.createDate).fromNow()}}</span><span @click.stop="onLike(item)"><a-icon type="eye" style="margin-right: 8px"/>{{item.views}}</span><span @click.stop="onLike(item)"><a-icon type="like-o" style="margin-right: 8px"/>{{item.likes}}</span><span><a-icon type="message" style="margin-right: 8px" />{{item.comments}}</span>
          <!-- <span @click.stop="onDislike(item)"><a-icon type="dislike-o" style="margin-right: 8px"/>{{item.dislikes}}</span> -->
          <!-- <span><a-icon type="message" style="margin-right: 8px" />{{item.comments}}</span> -->
        </template>
        <!-- .slice(0,100) -->
        <a-list-item-meta :description="item.desc">
          <!-- :href="item.href" -->
          <a slot="title">{{item.title}}</a>
          <!-- <a-avatar slot="avatar" :src="item.avatar" /> -->
        </a-list-item-meta>
        <!-- <nuxt-link :to="`/article/${item.id}`" tag="div">
          <div v-html="item.content" style="max-height: 60px;overflow: hidden;"></div>
        </nuxt-link> -->
      </a-list-item>
    </a-list>
  </section>
</template>

<script>
  import moment from 'moment'
  export default {
    props: {
      listLoading: {
        type: Boolean,
        default: () => false
      },
      articleList: {
        type: Object,
        default: () => null // eslint对组件的属性设置默认值要通过function返回
      }
    },
    data() {
      return {
        moment,
        // actions: [
        //   { type: 'clock-circle', text: '2019/9/15 16:10' },
        //   { type: 'star-o', text: '156' },
        //   { type: 'like-o', text: '156' },
        //   { type: 'message', text: '2' },
        // ],
        // defaultImg: `this.src=${require('@/assets/imgs/avator.jpg')}` // 默认图地址
        // defaultImg: `this.src=${'/images/avator.jpg'}` // 默认图地址
      }
    },
    // fetch ({ store, params }) {
    //   return store.dispatch('article/getArticle', { currentPage: 1, pageSize: 10 })
    // },
    computed: {
      // articleList() {
      //   return this.$store.state.article.articleList
      // },
      pagination() {
        return {
          onChange: (page) => {
            // console.log(page)
            // this.$store.dispatch('article/getArticle', { currentPage: page, pageSize: 1 })
            this.$emit('onPagination',page)
          },
          // size: 'small',
          simple: true,
          pageSize: this.$store.state.article.articleList.pagination.pageSize,
          total: this.$store.state.article.articleList.pagination.total
        }
      }
    },
    mounted() {
      // console.log(require('@/assets/imgs/avator.jpg'))
    },
    methods: {
      getThumb(thumb) {
        let url = process.env.NODE_ENV === 'production' ? 'https://admin.sycho.cn/' : 'http://127.0.0.1:1008/'
        return `${url}${thumb}`
      },
      gotoDetail(article) {
        this.$router.push(`/article/${article.id}`)
      },
      // 点赞
      onLike(item) {
        if(!localStorage.getItem('user')){
          this.$message.info('请先设置用户信息')
          return false
        }
        let articleIds = JSON.parse(localStorage.getItem('articleIds'))
        if(!articleIds||!articleIds.includes(item.id)){
          let likes = item.likes+1
          this.$axios.patch('/articleLikes',{_id: item._id, likes}).then(res=>{
            if(res.data.success){
              // console.log(this.$route)
              let arr = articleIds || []
              arr.push(item.id)
              localStorage.setItem('articleIds', JSON.stringify(arr))
              let params = { keyword: this.$route.params.keywords, currentPage: 1, pageSize: 10 }
              if(this.$route.name == 'tech'){
                params.type = 1
              }else if(this.$route.name == 'life') {
                params.type = 2
              }
              this.$store.dispatch('article/getArticle', params)
              this.$message.info('文章点赞成功')
              this.$store.commit('article/UPDATE_LIKE')
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
        if(!localStorage.getItem('user')){
          this.$message.info('请先设置用户信息')
          return false
        }
        let articleIds = JSON.parse(localStorage.getItem('articleIds'))
        if(!articleIds||!articleIds.includes(item.id)){
          let dislikes = item.dislikes+1
          this.$axios.patch('/articleDislikes',{_id: item._id, dislikes}).then(res=>{
            if(res.data.success){
              let arr = articleIds || []
              arr.push(item.id)
              localStorage.setItem('articleIds', JSON.stringify(arr))
              let params = { keyword: this.$route.params.keywords, currentPage: 1, pageSize: 10 }
              if(this.$route.name == 'tech'){
                params.type = 1
              }else if(this.$route.name == 'life') {
                params.type = 2
              }
              this.$store.dispatch('article/getArticle', params)
              this.$message.info('文章吐槽成功')
              this.$store.commit('article/UPDATE_DISLIKE')
            }else{
              this.$message.info(res.data.msg)
            }
          })
        }else{
          this.$message.info('您已操作，请不要贪心哦')
        }
        
      },
      onImgError(e) {
        // console.log(e)
        let img = event.srcElement;
        img.src = this.defaultImg;
        img.onerror = null; //防止闪图
      }
    }
  }
</script>