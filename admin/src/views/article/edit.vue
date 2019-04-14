<template>
  <div class="edit">
    <div class="v-container">
      <div class="v-header">
        <el-row> <el-input placeholder="请输入标题" v-model="title" clearable> </el-input> </el-row>
        <el-row type="flex" align="middle">
          <el-col :span="4">作者：<el-input placeholder="请输入作者" v-model="author" clearable style="width: 75%;"> </el-input></el-col>
          <el-col :span="4">点赞数：<el-input-number v-model="likeNum" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number> </el-col>
          <el-col :span="4">浏览数：<el-input-number v-model="lookNum" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number> </el-col>
          <el-col :span="5">发布时间：<el-date-picker v-model="releaseTime" type="date" placeholder="请选择日期"> </el-date-picker></el-col>
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
          <tinymce v-model="content" :height="300"></tinymce>
        </el-row>
      </div>
      <div class="v-footer">
        <el-row>
          <el-button type="primary">发布</el-button>
          <el-button type="success">草稿</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  // import 'quill/dist/quill.bubble.css'
  // import { quillEditor } from 'vue-quill-editor'
  import tinymce from '@/components/Tinymce'
  export default {
    name: 'edit',
    data(){
      return {
        title: '',
        author: '',
        likeNum: 0,
        lookNum: 0,
        releaseTime: '',
        content: '<h2>I am Example</h2>',
        editorOption: {
          // some quill options
        }
      }
    },
    computed: {
      editor() {
        return this.$refs.quillEditorObj.quill
      }
    },
    created(){},
    mounted(){},
    destroyed(){},
    methods: {
      onEditorBlur(quill) {
        console.log('editor blur!', quill)
        console.log(this.content)
      },
      onEditorFocus(quill) {
        console.log('editor focus!', quill)
      },
      onEditorReady(quill) {
        console.log('editor ready!', quill)
      },
      onEditorChange({ quill, html, text }) {
        console.log('editor change!', quill, html, text)
        this.content = html
      },
      handleChange(){}
    },
    components: {
      // quillEditor,
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