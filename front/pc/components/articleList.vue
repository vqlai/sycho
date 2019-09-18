<style lang="less" scoped>
  @deep: ~'>>>';
  .article{
    @{deep} .ant-list-pagination{
      text-align: center;
    }
    @{deep} .ant-list{
      .ant-list-item-extra-wrap{
        flex-direction: row-reverse;
        .ant-list-item-extra{
          margin: 0 50px 0 0;
        }
        .ant-list-item-main{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
        }
      }
    }
  }
</style>
<template>
  <section class="article">
    <a-list :pagination="pagination" :data-source="articleList.list" item-layout="vertical" size="large" :loading="listLoading">
      <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
        <div slot="extra">
          <nuxt-link :to="`/article/${item.id}`">
            <img width="272" alt="logo" :src="item.thumb"/>
          </nuxt-link>
        </div>
        <!-- <template slot="actions" v-for="{type, text} in actions">
          <span :key="type"> <a-icon :type="type" style="margin-right: 8px" /> {{text}} </span>
        </template> -->
        <template slot="actions">
          <span><a-icon type="clock-circle" style="margin-right: 8px" />{{moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}}</span><span><a-icon type="like-o" style="margin-right: 8px" />{{item.meta.likes}}</span><span><a-icon type="message" style="margin-right: 8px" />{{item.meta.comments}}</span>
        </template>
        
        <a-list-item-meta :description="item.desc" @click="gotoDetail(item)">
          <!-- :href="item.href" -->
          <a slot="title">{{item.title}}</a>
          <!-- <a-avatar slot="avatar" :src="item.avatar" /> -->
        </a-list-item-meta>
        <nuxt-link :to="`/article/${item.id}`" tag="div">
          {{item.content}}
        </nuxt-link>
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
      },
      // pagination: {}
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
            console.log(page)
            // this.$store.dispatch('article/getArticle', { currentPage: page, pageSize: 1 })
            this.$emit('onPagination',page)
          },
          pageSize: 1,
          total: this.$store.state.article.articleList.pagination.total
        }
      }
    },
    methods: {
      gotoDetail(article) {
        this.$router.push(`/article/${article.id}`)
      }
    }
  }
</script>