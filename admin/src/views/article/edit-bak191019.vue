<template>
  <div class="edit">
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
          <el-col :span="4"><span>点赞数：</span><el-input-number v-model="articleForm.meta.likes" :min="0" :max="100000000" label="请输入点赞数" controls-position="right" ></el-input-number> </el-col>
          <el-col :span="4"><span>吐槽数：</span><el-input-number v-model="articleForm.meta.dislikes" :min="0" :max="100000000" label="请输入吐槽数" controls-position="right" ></el-input-number> </el-col>
          <el-col :span="4"><span>浏览数：</span><el-input-number v-model="articleForm.meta.views" :min="0" :max="100000000" label="请输入浏览数" controls-position="right" ></el-input-number> </el-col>
        </el-row>
        <el-row type="flex" align="middle">
          <el-col :span="12" style="display:flex;align-items:center;">
            <span>缩略图：</span>
            <el-upload
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              accept=".jpg, .jpeg, .png"
              :limit="1"
              :before-upload="beforeThumbUpload">
              <div v-if="articleForm.thumb" :class="['avatar-box',{'hover': thumbImgHover}]"
                @mouseenter="thumbImgHover = true"
                @mouseleave="thumbImgHover = false">
                <img :src="articleForm.thumb" class="avatar">
                <div v-if="thumbImgHover" class="imgHoverBtns">
                  <i class="el-icon-zoom-in" @click.stop="thumbVisible=true"></i>
                  <i class="el-icon-delete" @click.stop="handleThumbRemove"></i>
                </div>
              </div>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <ul class="upload-tip">
              <li>每次只能上传1张图片。</li>
              <li>每张图片大小不超过 200kb。</li>
              <li>文件必须是 jpg 、png 或 jpeg 格式的图片。</li>
            </ul>
            <el-dialog :visible.sync="thumbVisible" width="35%">
              <div style="text-align: center;">
                <img :src="articleForm.thumb" alt="" style="display: inline-block;width: auto;max-width: 100%;height: 600px;">
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
          <el-button type="primary" @click="handleSubmit">保存</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import tinymce from '@/components/Tinymce'
  import data from '@/assets/js/data'
  import COS from 'cos-js-sdk-v5'
  export default {
    name: 'edit',
    data(){
      let articleTypes = data.articleTypes
      let articleTags = data.articleTags
      return {
        articleTypes,
        articleTags,
        articleForm: {
          _id: '',
          title: '',
          desc: '',
          author: '',
          type: '',
          tag: [],
          state: '1',
          publish: '1',
          content: '',
          meta: {
            views: 0,
            likes: 0,
            dislikes: 0,
            comments: 0
          },
          thumb: ''
        },
        cacheThumb: '',
        cos: null,
        fileObj: null,
        thumbVisible: false, // 预览图片弹窗
        thumbImgHover: false
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
        this.$store.dispatch('article/getArticleById', { _id: this.$route.params.id }).then(res => {
          // console.log(res)
          if(res.success){
            this.articleForm = { ...res.data }
            this.cacheThumb = res.data.thumb
            this.articleForm.tag = res.data.tag.split(',')
            this.articleForm.type = String(res.data.type)
            this.articleForm.state = String(res.data.state)
            this.articleForm.publish = String(res.data.publish)
          }else{
            this.$message({ message: res.msg, type: 'error' })
          }
        })
      },
      beforeThumbUpload(file){
        if(file.size > 200 * 1000){
          this.$message.warning(`文件${file.name}太大，不能超过 200kb`)
          return false
        }
        this.articleForm.thumb = URL.createObjectURL(file)
        this.fileObj = file
        return false
      },
      handleThumbRemove(){
        this.articleForm.thumb = ''
        this.fileObj = null
        // this.cos.deleteObject({ Bucket: 'sycho1-1256277347', Region: 'ap-guangzhou', Key: '' }, (err, data) => {
        //   console.log(err || data)
        //   let res = err || data
        //   if(res.statusCode === 200 || res.statusCode === 204){
        //     this.articleForm.thumb = ''
        //     this.$message.success('成功删除预览图')
        //   }else{
        //     this.$message.error(res)
        //   }
        // })
      },
      async handleSubmit(){
        if(this.checkArticle()){
          //  判断上传控制是否有新选择的图片，没有上传动作则直接提交表单
          if(this.fileObj){
            this.$store.dispatch('cos/getSts', {}).then(res => {
              if(res.success){
                let result = res.data
                this.cos = new COS({ getAuthorization: (options, callback) => {
                    callback({
                      TmpSecretId: result.credentials.tmpSecretId,
                      TmpSecretKey: result.credentials.tmpSecretKey,
                      XCosSecurityToken: result.credentials.sessionToken,
                      ExpiredTime: result.expiredTime
                    })
                  }
                })
                // 判断是否有已上传图，有则先删除再上传,无则直接上传
                if(this.cacheThumb){
                  let arr = this.cacheThumb.split('/')
                  this.cos.deleteObject({ Bucket: 'sycho1-1256277347', Region: 'ap-guangzhou', Key: `/${arr[arr.length - 2]}/${arr[arr.length - 1]}` }, (err, data) => {
                    // console.log(err || data)
                    let res = err || data
                    if(res.statusCode === 200 || res.statusCode === 204){
                      this.articleForm.thumb = ''
                      this.handleUpdateThumb()
                    }else{
                      this.$message.error(res)
                    }
                  })
                }else{
                  this.handleUpdateThumb()
                }
              }
            })
          }else{
            this.handleUpdateForm()
          }
        }
      },
      handleUpdateThumb(){
        this.cos.putObject({
          Bucket: 'sycho1-1256277347',
          Region: 'ap-guangzhou',
          Key: `/article/${new Date().getTime()}.${this.fileObj.name.split('.')[1]}`,
          StorageClass: 'STANDARD',
          Body: this.fileObj, // 上传文件对象
          onProgress: (progressData) => {
              // console.log(JSON.stringify(progressData))
            }
          }, (err, data) => {
            console.log(err || data)
            // console.log(data.Location)
            if(data.Location){
              this.articleForm.thumb = 'https://' + data.Location
              this.handleUpdateForm()
            }
        })
      },
      handleUpdateForm(){
        this.$store.dispatch('article/putArticle', this.articleForm).then(res => {
          if(res.success){
            this.$message.success(res.msg)
            setTimeout(() => {
              this.$router.push({ path: '/article/list' })
            }, 500)
          }else{
            this.$message.error(res.msg)
          }
        })
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
        }else if(typeof this.articleForm.meta.likes === 'undefined'){
          this.$message.error('请输入点赞数')
          return false
        }else if(typeof this.articleForm.meta.dislikes === 'undefined'){
          this.$message.error('请输入吐槽数')
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
    .quill-editor{
      // /deep/ .ql-editor{
      //   max-height: 600px;
      //   overflow-y: scroll;
      // }
    }
  }
</style>