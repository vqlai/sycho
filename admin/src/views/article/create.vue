<template>
  <div class="create">
    <div class="v-container">
      <div class="v-header">
        <el-row> <span>标题：</span><el-input placeholder="请输入标题" v-model="title" clearable style="width: 81.8%;"> </el-input> </el-row>
        <el-row style="display:flex;align-items:center;"> <span>描述：</span><el-input placeholder="请输入描述" v-model="desc" type="textarea" :rows="2" clearable style="width: 81.8%;"> </el-input> </el-row>
        <el-row type="flex" align="middle">
          <el-col :span="4"> <span>作者：</span> <el-input placeholder="请输入作者" v-model="author" clearable style="width: 75%;"> </el-input> </el-col>
          <el-col :span="4">
            <span>分类：</span>
            <el-select v-model="type" clearable placeholder="请选择文章类别">
              <el-option
                v-for="(item, index) in articleTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                v-show="index !== 0">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4"><span>点赞数：</span><el-input-number v-model="likeNum" @change="handleChange" :min="0" :max="100000000" label="请输入点赞数"></el-input-number> </el-col>
          <el-col :span="4"><span>浏览数：</span><el-input-number v-model="lookNum" @change="handleChange" :min="0" :max="100000000" label="请输入浏览数"></el-input-number> </el-col>
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
          <el-col :span="4">
            <span>文章状态：</span>
            <el-radio v-model="state" label="1">发布</el-radio>
            <el-radio v-model="state" label="2">草稿</el-radio>
          </el-col>
          <el-col :span="4">
            <span>是否公开：</span>
            <el-radio v-model="publish" label="1">公开</el-radio>
            <el-radio v-model="publish" label="2">私密</el-radio>
          </el-col>
        </el-row>
        <el-row type="flex" align="middle">
          <el-col :span="12">
            <span>缩略图：</span>
          </el-col>
        </el-row>
      </div>
      <div class="v-body">
        <el-row>
          <!-- bidirectional data binding（双向数据绑定） -->
          <!-- <quill-editor v-model="content"
                        ref="quillEditorObj"
                        :options="editorOption"
                        @blur="onEditorBlur($event)"
                        @focus="onEditorFocus($event)"
                        @ready="onEditorReady($event)">
          </quill-editor> -->

          <!-- Or manually control the data synchronization（或手动控制数据流） -->
          <!-- <quill-editor :content="content"
                        :options="editorOption"
                        @change="onEditorChange($event)">
          </quill-editor> -->
          <tinymce v-model="content" :height="480"></tinymce>
        </el-row>
      </div>
      <div class="v-footer">
        <el-row>
          <el-button type="success" @click="handleDraft">草稿</el-button>
          <el-button type="primary" @click="handleRelease">发布</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  // import 'quill/dist/quill.core.css'
  // import 'quill/dist/quill.snow.css'
  // import 'quill/dist/quill.bubble.css'
  // import { quillEditor } from 'vue-quill-editor'
  import tinymce from '@/components/Tinymce'
  import data from '@/assets/js/data'
  export default {
    name: 'create',
    data(){
      let articleTypes = data.articleTypes
      let articleTags = data.articleTags
      return {
        title: '',
        desc: '',
        author: '',
        type: '',
        tag: [],
        likeNum: 0,
        lookNum: 0,
        state: '1',
        releaseTime: '',
        content: '',
        articleTypes,
        articleTags,
        // editorOption: {
        //   // some quill options
        // }
      }
    },
    computed: {
      // editor() {
      //   return this.$refs.quillEditorObj.quill
      // }
    },
    created(){},
    mounted(){},
    destroyed(){},
    methods: {
      // onEditorBlur(quill) {
      //   console.log('editor blur!', quill)
      //   console.log(this.content)
      // },
      // onEditorFocus(quill) {
      //   console.log('editor focus!', quill)
      // },
      // onEditorReady(quill) {
      //   console.log('editor ready!', quill)
      // },
      // onEditorChange({ quill, html, text }) {
      //   console.log('editor change!', quill, html, text)
      //   this.content = html
      // },
      handleChange(){},
      handleRelease(){
        if(this.checkArticle()){
          // console.log(this.title.trim())
          // console.log(this.content)
          // console.log(this.likeNum)
          // console.log(this.type)
          let params = {
            title: this.title,
            author: this.author,
            type: this.type,
            tag: this.tag.join(),
            likeNum: this.likeNum,
            lookNum: this.lookNum,
            releaseTime: this.releaseTime,
            content: this.content
          }
          console.log(params)
          this.$store.dispatch('AddArticle', params).then(res => {
            console.log(res)
            if(res.success){
              this.$message({ message: '发布成功！', type: 'success' })
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
          this.$message.error('请输入标题')
          // this.$message({ message: '请输入标题', type: 'error' })
          return false
        }else if(!this.author.trim()){
          this.$message.error('请输入作者')
          // this.$message({ message: '请输入作者', type: 'error' })
          return false
        }else if(!this.type){
          this.$message({ message: '请选择文章类型', type: 'error' })
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
        }else if(!this.tag){
          this.$message({ message: '请选择文章标签', type: 'error' })
          return false
        }else{
          return true
        }
      },
      // handleDraft(){},
    },
    components: {
      // quillEditor,
      tinymce
    }
  }
</script>

<style lang="scss" scoped>
  .create{
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