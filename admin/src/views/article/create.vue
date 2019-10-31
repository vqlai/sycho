<template>
  <div class="create">
    <div class="v-container">
      <div class="v-header">
        <el-row >
          <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="18"> <span>作者：</span> <el-input placeholder="请输入标题" v-model="articleForm.title" clearable size="small"> </el-input> </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="18"> <span>描述：</span> <el-input placeholder="请输入描述" v-model="articleForm.desc" type="textarea" :rows="2" clearable size="small"> </el-input></el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="6" :sm="4" :md="4" :lg="5" :xl="4"> <span>作者：</span> <el-input placeholder="请输入作者" v-model="articleForm.author" clearable size="small"> </el-input> </el-col>
          <el-col :xs="6" :sm="4" :md="4" :lg="5" :xl="4">
            <span>分类：</span>
            <el-select v-model="articleForm.type" clearable placeholder="请选择文章类别" size="small" style="width: 100%;">
              <el-option
                v-for="(item, index) in articleTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                v-show="index !== 0">
              </el-option>
            </el-select>
          </el-col>
          <el-col :xs="12" :sm="10" :md="10" :lg="10" :xl="8">
            <span>标签：</span>
            <el-select v-model="articleForm.tag" multiple clearable placeholder="请选择文章标签" size="small" style="width: 100%;">
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
        <el-row>
         <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="3">
            <span>状态：</span>
            <div style="padding-top: 10px;">
              <el-radio v-model="articleForm.state" label="1" size="small">发布</el-radio>
              <el-radio v-model="articleForm.state" label="2" size="small">草稿</el-radio>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="3">
            <span>权限：</span>
            <div style="padding-top: 10px;">
              <el-radio v-model="articleForm.publish" label="1" size="small">公开</el-radio>
              <el-radio v-model="articleForm.publish" label="2" size="small">私密</el-radio>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="6">
          <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="4"><span>点赞数：</span><el-input-number v-model="articleForm.likes" @change="handleChange" :min="0" :max="100000000" label="请输入点赞数" controls-position="right" size="small"></el-input-number> </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="4"><span>吐槽数：</span><el-input-number v-model="articleForm.dislikes" @change="handleChange" :min="0" :max="100000000" label="请输入吐槽数" controls-position="right" size="small"></el-input-number> </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="4"><span>浏览数：</span><el-input-number v-model="articleForm.views" @change="handleChange" :min="0" :max="100000000" label="请输入浏览数" controls-position="right" size="small"></el-input-number> </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" style="display:flex;align-items:center;">
            <span>缩略图：</span>
            <!-- :on-success="handleThumbSuccess" -->
            <el-upload
              class="avatar-uploader"
              action=""
              :auto-upload="true"
              :show-file-list="false"
              accept=".jpg, .jpeg, .png"
              :limit="1"
              :before-upload="beforeThumbUpload"
              size="small">
              <div v-if="thumbImgUrl" :class="['avatar-box',{'hover': thumbImgHover}]"
                @mouseenter="thumbImgHover = true"
                @mouseleave="thumbImgHover = false">
                <img :src="thumbImgUrl" class="avatar">
                <div v-if="thumbImgHover" class="imgHoverBtns">
                  <i class="el-icon-zoom-in" @click.stop="thumbVisible=true"></i>
                  <i class="el-icon-delete" @click.stop="handleThumbRemove"></i>
                </div>
              </div>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <ul class="upload-tip" v-if="winWidth>500">
              <li>每次只能上传1张图片。</li>
              <li>每张图片大小不超过 200kb。</li>
              <li>文件必须是 jpg 、png 或 jpeg 格式的图片。</li>
            </ul>
            <el-dialog :visible.sync="thumbVisible" :width="winWidth<500?'90%':winWidth<1200?'60%':'35%'">
              <div style="text-align: center;">
                <img :src="thumbImgUrl" alt="" style="display: inline-block;width: auto;max-width: 100%;height: 600px;">
              </div>
            </el-dialog>
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
          <!-- <el-button type="success" @click="handleSubmit(2)" size="small">草稿</el-button> -->
          <el-button type="primary" @click="handleSubmit" size="small">保存</el-button>
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
          views: 0,
          likes: 0,
          dislikes: 0,
          comments: 0
        },
        fileObj: null,
        thumbImgUrl: '', // 头像路径
        thumbVisible: false, // 预览图片弹窗
        thumbImgHover: false
      }
    },
    computed: {
    },
    created(){
    },
    mounted(){},
    destroyed(){},
    methods: {
      handleChange(){},
      // handleThumbSuccess(res, file) {
      //   this.imageUrl = URL.createObjectURL(file.raw)
      // },
      handleThumbRemove(){
        this.thumbImgUrl = ''
        this.fileObj = null
      },
      beforeThumbUpload(file) {
        if(file.size > 200 * 1000){
          this.$message.warning(`文件${file.name}太大，不能超过 200kb`)
          return false
        }
        this.thumbImgUrl = URL.createObjectURL(file)
        this.fileObj = file
        return false // 加了return false组件的action就不会发起post请求了
      },
      // 新增文章与图片上传
      handleSubmit(){
        if(this.checkArticle()){
          let formData = new FormData()
          formData.append('file', this.fileObj)
          formData.append('title', this.articleForm.title)
          formData.append('desc', this.articleForm.desc)
          formData.append('author', this.articleForm.author)
          formData.append('type', this.articleForm.type)
          formData.append('state', this.articleForm.state)
          formData.append('tag', this.articleForm.tag)
          formData.append('publish', this.articleForm.publish)
          formData.append('content', this.articleForm.content)
          formData.append('views', this.articleForm.views)
          formData.append('likes', this.articleForm.likes)
          formData.append('dislikes', this.articleForm.dislikes)
          formData.append('comments', this.articleForm.comments)
          let arr = []
          for(let i of this.articleForm.tag){
            for(let j of this.articleTags){
              if(i == j.value){
                arr.push(j.label)
              }
            }
          }
          formData.append('tagDesc', arr)
          this.$store.dispatch('article/postArticle', formData).then(res => {
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
        }else if(!this.articleForm.content.trim()){
          this.$message.error('请输入文章内容')
          return false
        }else{
          return true
        }
        // else if(!this.thumbImgUrl){
        //   this.$message.error('请选中缩略图')
        //   return false
        // }
        // else if(typeof this.articleForm.likes === 'undefined'){
        //   this.$message.error('请输入点赞数')
        //   return false
        // }else if(typeof this.articleForm.dislikes === 'undefined'){
        //   this.$message.error('请输入吐槽数')
        //   return false
        // }else if(typeof this.articleForm.views === 'undefined'){
        //   this.$message.error('请输入浏览数')
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
    margin-top: 10px;
    padding: 0 10px 10px;
    background-color: #fff;
    .v-container{
      padding: 5px 10px;
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
              &::after{
                content: ' ';
                position: absolute;
                top:0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 10;
                background: rgba($color: #222, $alpha: .3)
              }
              .imgHoverBtns{
                position: absolute;
                top:0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 11;
                display: flex;
                justify-content: center;
                align-items: center;
                i{
                  color: #fff;
                  font-size: 18px;
                  padding: 0 4px;
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
        }
        ul.upload-tip{
          list-style-type: none;
          margin: 0;
          padding: 0 30px 0;
          li{
            line-height: 30px;
          }
        }
      }
      .v-footer{
        text-align: right;
      }
    }
  }
</style>