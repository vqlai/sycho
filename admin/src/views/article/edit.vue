<template>
  <div class="edit">
    <div class="v-container">
      <div class="v-header">
        <el-row> <el-input placeholder="请输入标题" v-model="title" clearable> </el-input> </el-row>
        <el-row type="flex" align="middle">
          <el-col :span="4"><span>作者：</span><el-input placeholder="请输入作者" v-model="author" clearable style="width: 75%;"> </el-input></el-col>
          <el-col :span="4">
            <span>分类：</span>
            <el-select v-model="type" clearable placeholder="请选择文章类别">
              <el-option
                v-for="item in articleTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                v-show="item.value !== 0">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4"><span>点赞数：</span><el-input-number v-model="likeNum" :min="0" :max="100000000" label="请输入点赞数"></el-input-number> </el-col>
          <el-col :span="4"><span>浏览数：</span><el-input-number v-model="lookNum" :min="0" :max="100000000" label="请输入浏览数"></el-input-number> </el-col>
          <el-col :span="5"><span>发布时间：</span><el-date-picker v-model="releaseTime" type="datetime" placeholder="请选择日期" :editable="false" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"> </el-date-picker></el-col>
        </el-row>
        <el-row type="flex" align="middle">
          <el-col :span="12">
            <span>标签：</span>
            <el-select v-model="tag" multiple clearable placeholder="请选择文章标签" style="width: 90%;">
              <el-option
                v-for="item in articleTags"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                v-show="item.value !== 0">
              </el-option>
            </el-select>
          </el-col>
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
          <el-button type="primary" @click="handleArticleSave">保存</el-button>
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
      let articleTags = data.articleTags
      return {
        id: '',
        title: '',
        author: '',
        likeNum: 0,
        lookNum: 0,
        releaseTime: '',
        articleTypes,
        articleTags,
        type: '',
        tag: [],
        content: '',
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
            this.id = result._id
            this.title = result.title
            this.author = result.author
            this.likeNum = result.likeNum
            this.lookNum = result.lookNum
            this.type = result.type
            this.tag = result.tag.split(',').map(item => {
              return parseInt(item)
            })
            console.log(this.tag)
            this.releaseTime = result.releaseTime
            this.content = result.content
          }else{
            this.$message({ message: res.msg, type: 'error' })
          }
        })
      },
      handleArticleSave(){
        if(this.checkArticle()){
          let params = {
            id: this.id,
            title: this.title,
            author: this.author,
            type: this.type,
            tag: this.tag.join(),
            likeNum: this.likeNum,
            lookNum: this.lookNum,
            releaseTime: this.releaseTime,
            content: this.content
          }
          this.$store.dispatch('EditArticle', params).then(res => {
            if(res.success){
              this.$message({ message: '发修改成功！', type: 'success' })
              setTimeout(() => {
                this.$router.push({ path: '/article/list' })
              }, 500)
            }else{
              this.$message({ message: res.msg, type: 'error' })
            }
          })
        }
      },
      checkArticle(){
        if(!this.title.trim()){
          this.$message({ message: '请输入标题', type: 'error' })
          return false
        }else if(!this.author.trim()){
          this.$message({ message: '请输入作者', type: 'error' })
          return false
        }else if(!this.type){
          this.$message({ message: '请选择文章类型', type: 'error' })
          return false
        }else if(!this.tag){
          this.$message({ message: '请选择文章标签', type: 'error' })
          return false
        }else if(typeof this.likeNum === 'undefined'){
          this.$message({ message: '请输入点赞数', type: 'error' })
          return false
        }else if(typeof this.lookNum === 'undefined'){
          this.$message({ message: '请输入浏览数', type: 'error' })
          return false
        }else if(!this.releaseTime){
          this.$message({ message: '请选择发布时间', type: 'error' })
          return false
        }else if(!this.content.trim()){
          this.$message({ message: '请输入文章内容', type: 'error' })
          return false
        }else{
          return true
        }
      },
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