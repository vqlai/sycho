<template>
  <div class="edit">
    <div class="v-container">
      <div class="v-header">
        <el-row> <el-input placeholder="请输入标题" v-model="title" clearable> </el-input> </el-row>
        <el-row type="flex" align="middle">
          <el-col :span="4">作者：<el-input placeholder="请输入作者" v-model="author" clearable style="width: 75%;"> </el-input></el-col>
          <el-col :span="4">分类：
            <el-select v-model="articleType" clearable placeholder="请选择文章类别">
              <el-option
                v-for="item in articleTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4">点赞数：<el-input-number v-model="likeNum" @change="handleChange" :min="0" :max="100000000" label="请输入点赞数"></el-input-number> </el-col>
          <el-col :span="4">浏览数：<el-input-number v-model="lookNum" @change="handleChange" :min="0" :max="100000000" label="请输入浏览数"></el-input-number> </el-col>
          <el-col :span="5">发布时间：<el-date-picker v-model="releaseTime" type="datetime" placeholder="请选择日期" :editable="false" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"> </el-date-picker></el-col>
        </el-row>
      </div>
      <div class="v-body">
        <el-row>
          <tinymce v-model="content" :height="500"></tinymce>
        </el-row>
      </div>
      <div class="v-footer">
        <el-row>
          <!-- <el-button type="primary">发布</el-button> -->
          <!-- <el-button type="success">草稿</el-button> -->
          <el-button type="primary">保存</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import tinymce from '@/components/Tinymce'
  import data from '@/assets/js/data'
  export default {
    name: 'edit',
    data(){
      let articleTypes = data.articleTypes
      return {
        title: '',
        author: '',
        likeNum: 0,
        lookNum: 0,
        releaseTime: '',
        articleTypes,
        articleType: '',
        content: '<h2>I am Example</h2>',
      }
    },
    computed: {
    },
    created(){
      this._getArticleById()
    },
    mounted(){
      this.$nextTick(() => {
      })
    },
    destroyed(){},
    methods: {
      _getArticleById(){
        this.$store.dispatch('GetArticleById', { id: this.$route.params.id }).then(res => {
          console.log(res)
          if(res.success){
            let result = res.data
            this.title = result.title
            this.author = result.author
            this.likeNum = result.likeNum
            this.lookNum = result.lookNum
            this.articleType = result.type
            this.releaseTime = result.releaseTime
            this.content = result.content
          }else{
            this.$message({ message: res.msg, type: 'error' })
          }
        })
      },
      handleChange(){}
    },
    components: {
      tinymce
    }
  }
</script>

<style lang="scss" scoped>
  .edit{
    padding: 10px;
    .v-container{
      padding: 5px 10px;
      background: #fff;
      .el-row{
        padding: 5px 0;
      }
      .v-footer{
        text-align: right;
      }
    }
    .quill-editor{
      // /deep/ .ql-editor{
      //   max-height: 600px;
      //   overflow-y: scroll;
      // }
    }
  }
</style>