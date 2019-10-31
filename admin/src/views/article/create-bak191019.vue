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
          <el-col :span="4"><span>吐槽数：</span><el-input-number v-model="articleForm.meta.dislikes" @change="handleChange" :min="0" :max="100000000" label="请输入吐槽数" controls-position="right" ></el-input-number> </el-col>
          <el-col :span="4"><span>浏览数：</span><el-input-number v-model="articleForm.meta.views" @change="handleChange" :min="0" :max="100000000" label="请输入浏览数" controls-position="right" ></el-input-number> </el-col>
        </el-row>
        <el-row type="flex" align="middle">
          <el-col :span="12" style="display:flex;align-items:center;">
            <span>缩略图：</span>
            <!-- :on-success="handleThumbSuccess" -->
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
  import COS from 'cos-js-sdk-v5'
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
            dislikes: 0,
            comments: 0
          },
          thumb: ''
        },
        cos: null,
        // fileObj: null,
        // thumbImgUrl: '', // 头像路径
        thumbVisible: false, // 预览图片弹窗
        thumbImgHover: false
      }
    },
    computed: {
    },
    created(){
      // let cos = new COS({
      //   secretId: 'AKIDoW3yABjRWWO5n5D8qLQ1ScnmyvZ0arLb',
      //   secretKey: 'CD0sUt3A4jAAwSlxyrUqcBIF3iFdQ6Zv',
      // })
      // 获取sts
      // this.$store.dispatch('cos/getSts', {}).then(res => {
      //     if(res.success){
      //       let result = res.data
      //       console.log(result)
      //     }else{
      //       console.log(res)
      //     }
      //   })
    },
    mounted(){},
    destroyed(){},
    methods: {
      handleChange(){},
      // handleThumbSuccess(res, file) {
      //   this.imageUrl = URL.createObjectURL(file.raw)
      // },
      handleThumbRemove(){
        // { Bucket: '', Region: '', Key: '' }
        // this.cos.deleteObject(this.thumbParams, (err, data) => {
        //   console.log(err || data)
        //   let res = err || data
        //   if(res.statusCode === 200 || res.statusCode === 204){
        //     this.articleForm.thumb = ''
        //     this.$message.success('成功删除预览图')
        //   }else{
        //     this.$message.error(res)
        //   }
        // })
        this.articleForm.thumb = ''
        this.fileObj = null
      },
      beforeThumbUpload(file) {
        // console.log(file)
        if(file.size > 200 * 1000){
          this.$message.warning(`文件${file.name}太大，不能超过 200kb`)
          return false
        }
        this.articleForm.thumb = URL.createObjectURL(file)
        this.fileObj = file
        return false // 加了return false组件的action就不会发起post请求了
      },
      handleSubmit(){
        if(this.checkArticle()){
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
                this.thumbParams = {
                  Bucket: result.bucket,
                  Region: result.region,
                  Key: `/${result.dir}/${new Date().getTime()}.${this.fileObj.name.split('.')[1]}`
                }
                this.cos.putObject({
                  Bucket: result.bucket,
                  Region: result.region,
                  Key: `/${result.dir}/${new Date().getTime()}.${this.fileObj.name.split('.')[1]}`,
                  StorageClass: 'STANDARD',
                  Body: this.fileObj, // 上传文件对象
                  onProgress: (progressData) => {
                      // console.log(JSON.stringify(progressData))
                    }
                  },
                  (err, data) => {
                    console.log(err || data)
                    // console.log(data.Location)
                    this.articleForm.thumb = 'https://' + data.Location
                    this.handlePostArticle()
                  })
              }else{
                console.log(res)
              }
            })
          }else{
            this.handlePostArticle()
          }
        }
      },
      handlePostArticle(){
        this.$store.dispatch('article/postArticle', this.articleForm).then(res => {
          if(res.success){
            this.$message.success('发布成功！')
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