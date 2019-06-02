<template>
  <div class="create">
    <div class="v-container">
      <div class="v-header">
        <el-row> <span>标题：</span><el-input placeholder="请输入标题" v-model="articleForm.title" clearable style="width: 81.8%;"> </el-input> </el-row>
        <el-row style="display:flex;align-items:center;"> <span>描述：</span><el-input placeholder="请输入描述" v-model="articleForm.desc" type="textarea" :rows="2" clearable style="width: 81.8%;"> </el-input> </el-row>
        <el-row type="flex" align="middle">
          <el-col :span="4"> <span>作者：</span> <el-input placeholder="请输入作者" v-model="articleForm.author" clearable style="width: 75%;"> </el-input> </el-col>
          <el-col :span="4">
            <span>分类：</span>
            <el-select v-model="articleForm.type" clearable placeholder="请选择文章类别">
              <el-option
                v-for="(item, index) in articleTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                v-show="index !== 0">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="13">
            <span>标签：</span>
            <el-select v-model="articleForm.tag" multiple clearable placeholder="请选择文章标签" style="width: 90%;">
              <el-option
                v-for="item in articleTags"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                v-show="item.value !== '0'">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row type="flex" align="middle">
         <el-col :span="4">
            <span>文章状态：</span>
            <el-radio v-model="articleForm.state" label="1">发布</el-radio>
            <el-radio v-model="articleForm.state" label="2">草稿</el-radio>
          </el-col>
          <el-col :span="4">
            <span>是否公开：</span>
            <el-radio v-model="articleForm.publish" label="1">公开</el-radio>
            <el-radio v-model="articleForm.publish" label="2">私密</el-radio>
          </el-col>
          <el-col :span="4"><span>点赞数：</span><el-input-number v-model="articleForm.meta.likes" @change="handleChange" :min="0" :max="100000000" label="请输入点赞数" controls-position="right" ></el-input-number> </el-col>
          <el-col :span="4"><span>浏览数：</span><el-input-number v-model="articleForm.meta.views" @change="handleChange" :min="0" :max="100000000" label="请输入浏览数" controls-position="right" ></el-input-number> </el-col>
        </el-row>
        <el-row type="flex" align="middle">
          <el-col :span="12" style="display:flex;align-items:center;">
            <span>缩略图：</span>
            <el-upload
              style="display:inline-block;"
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="articleForm.thumb" :src="articleForm.thumb" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-col>
        </el-row>
      </div>
      <div class="v-body">
        <el-row>
          <tinymce v-model="articleForm.content" :height="460"></tinymce>
        </el-row>
      </div>
      <div class="v-footer">
        <el-row>
          <!-- <el-button type="success" @click="handleSubmit(2)">草稿</el-button> -->
          <el-button type="primary" @click="handleSubmit">保存</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import tinymce from '@/components/Tinymce'
  import data from '@/assets/js/data'
  export default {
    name: 'create',
    data(){
      let articleTypes = data.articleTypes
      let articleTags = data.articleTags
      return {
        articleTypes,
        articleTags,
        articleForm: {
          title: '',
          desc: '',
          author: 'admin',
          type: '',
          tag: [],
          state: '1',
          publish: '1',
          content: '',
          meta: {
            views: 0,
            likes: 0,
            comments: 0
          },
          thumb: ''
        },
      }
    },
    computed: {
    },
    created(){
      this.$store.dispatch('cos/getSts', {}).then(res => {
        console.log(res)
      })
    },
    mounted(){},
    destroyed(){},
    methods: {
      handleChange(){},
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      },
      handleSubmit(){
        if(this.checkArticle()){
          this.$store.dispatch('article/postArticle', this.articleForm).then(res => {
            // console.log(res)
            if(res.success){
              this.$message.success('发布成功！')
              setTimeout(() => {
                this.$router.push({ path: '/article/list' })
              }, 500)
            }else{
              this.$message.error(res.msg)
            }
          })
        }
      },
      checkArticle(){
        if(!this.articleForm.title.trim()){
          this.$message.error('请输入标题')
          // this.$message({ message: '请输入标题', type: 'error' })
          return false
        }else if(!this.articleForm.desc.trim()){
          this.$message.error('请输入描述')
          return false
        }else if(!this.articleForm.author.trim()){
          this.$message.error('请输入作者')
          return false
        }else if(!this.articleForm.type){
          this.$message.error('请选择文章类型')
          return false
        }else if(!this.articleForm.tag.length){
          this.$message.error('请选择文章标签')
          return false
        }else if(typeof this.articleForm.meta.likes === 'undefined'){
          this.$message.error('请输入点赞数')
          return false
        }else if(typeof this.articleForm.meta.views === 'undefined'){
          this.$message.error('请输入浏览数')
          return false
        }else if(!this.articleForm.content.trim()){
          this.$message.error('请输入文章内容')
          return false
        }else{
          return true
        }
        // else if(!this.articleForm.thumb){
        //   this.$message.error('请选中缩略图')
        //   return false
        // }
      },
    },
    components: {
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
        .avatar-uploader  {
          /deep/ .el-upload{
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            &:hover {
              border-color: #409EFF;
            }
          }
        }
        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 178px;
          height: 178px;
          line-height: 178px;
          text-align: center;
        }
        .avatar {
          width: 178px;
          height: 178px;
          display: block;
        }
      }
      .v-footer{
        text-align: right;
      }
    }
  }
</style>