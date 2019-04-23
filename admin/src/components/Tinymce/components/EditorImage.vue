<template>
  <div class="upload-container">
    <el-button :style="{background:color,borderColor:color}" icon="el-icon-upload" size="mini" type="primary" @click=" uploadDialog=true">
      上传图片
    </el-button>
    <el-dialog
      title="内容图片上传"
      :visible.sync="uploadDialog"
      width="50%"
      :close-on-click-modal="false">
      <!--
        action="https://httpbin.org/post"
        :on-success="handleSuccess"
        el-uplaod自动上传执行顺序，1：auto-upload 2：循环自定义请求http-request 3：自动触发上传到服务器
        手动上传，需要添加上传按钮触发this.$refs.upload.submit()进行上传
        auto-upload 默认自动上传，选择文件过后会立刻上传
        http-request 覆盖默认的上传行为， 默认情况下如果上传多张照片会请求多次，设置了该属性不会再触发action绑定的上传地址
        目前实现的即是自动上传，又通过http-request覆盖默认上传行为，自定义了上传功能
      -->
      <div class="upload-box">
        <el-upload
          ref="upload"
          class="editor-upload"
          action=""
          :multiple="true"
          :file-list="fileList"
          :show-file-list="true"
          :limit="5"
          accept=".jpg, .jpeg, .png"
          list-type="picture-card"
          :http-request="handleUpload"
          :auto-upload="true"
          :before-upload="beforeUpload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-exceed="handleExceed">
          <i class="el-icon-plus"></i>
          <div slot="tip">文件格式必须是 jpg 、png 或 jpeg，每次只能同时上传5张，且每张不超过 500kb的图片。</div>
          <el-dialog :visible.sync="previewDialog" width="35%" append-to-body>
            <div style="text-align: center;">
              <img :src="previewPic" alt="" style="display: inline-block;width: auto;max-width: 100%;height: 600px;">
            </div>
          </el-dialog>
        </el-upload>
      </div>
      <el-button @click="uploadDialog = false">
        取 消
      </el-button>
      <el-button type="primary" @click="handleSubmit">
        确 定
      </el-button>
    </el-dialog>
  </div>
</template>

<script>
// import { getToken } from 'api/qiniu'

export default {
  name: 'EditorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data() {
    return {
      uploadDialog: false,
      listObj: {}, // 存储插入到editor的图片
      fileList: [],
      fileArray: [], // 存储添加的数组图片
      fileNum: 0,
      formData: new FormData(),
      previewDialog: false,
      previewPic: ''
    }
  },
  methods: {
    // 检测选中的图片是否全部上传成功
    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    // 将图片插入到editor
    handleSubmit() {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      if (!this.checkAllSuccess()) {
        this.$message('请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！')
        return
      }
      this.$emit('successCBK', arr)
      this.listObj = {}
      this.fileList = []
      this.uploadDialog = false
    },
    // 点击文件列表中已上传的文件时的钩子
    handlePreview(file){
      // console.log(file)
      this.previewPic = file.url
      this.previewDialog = true
    },
    // 文件超出个数限制时的钩子
    handleExceed(files, fileList){
      this.$message({ message: '上传选择图片数太多啦~', type: 'warning' })
    },
    // 文件上传成功时的钩子
    // handleSuccess(response, file) {
    //   const uid = file.uid
    //   const objKeyArr = Object.keys(this.listObj)
    //   for (let i = 0, len = objKeyArr.length; i < len; i++) {
    //     if (this.listObj[objKeyArr[i]].uid === uid) {
    //       this.listObj[objKeyArr[i]].url = response.files.file
    //       this.listObj[objKeyArr[i]].hasSuccess = true
    //       return
    //     }
    //   }
    // },
    // 文件列表移除文件时的钩子
    handleRemove(file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          console.log(this.listObj[objKeyArr[i]])
          this.$store.dispatch('RemoveArticlePics', { url: this.listObj[objKeyArr[i]].preUrl }).then(res => {
            console.log(res)
          })
          // delete 可以删除数组的元素
          delete this.listObj[objKeyArr[i]]
          return
        }
      }
    },
    // 会循环遍历upload组件的文件列表，一个个加入到上传文件栈
    handleUpload(file) {
      console.log(this.$refs.upload) // 获取upload组件
       // const files = this.$refs.upload.uploadFiles 获取upload上传多文件list
      // this.$refs.upload.submit() 手动触发上传
      this.formData.append('file', file.file)
      this.fileArray.push(file.file)
      // upload组件当多个文件自动上传时，默认会发起多个请求，一个个的上传文件到服务器，为了避免，需要做如下判断
      if(this.fileArray.length === this.$refs.upload.uploadFiles.length){
        console.log(this.$refs.upload.uploadFiles)
        this.$store.dispatch('UploadArticlePics', this.formData).then(res => {
          console.log(res)
          // console.log(this.fileList)  // 这里获取不到fileList
          if(res.success){
            for(let [index, item] of this.fileArray.entries()){
              const uid = item.uid
              this.listObj[uid].url = `${this.reUrl}${res.data[index].url}`
              this.listObj[uid].preUrl = res.data[index].url
              this.listObj[uid].hasSuccess = true
              // const objKeyArr = Object.keys(this.listObj)
              // for (let i = 0, len = objKeyArr.length; i < len; i++) {
              //   if (this.listObj[objKeyArr[i]].uid === uid) {
              //     this.listObj[objKeyArr[i]].url = res.data
              //     this.listObj[objKeyArr[i]].hasSuccess = true
              //     return
              //   }
              // }
            }
            // this.formData =new FormData()
            // this.$refs.upload.uploadFiles = []
            this.fileArray = []
            // this.$refs.upload.onSuccess(() => {
            // })
            // this.fileNum = 0
            console.log(this.listObj)
          }
        })
      }
    },
    // 处理图片上传前的逻辑,上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
    beforeUpload(file) {
      if(file.size > 500 * 1000){
        this.$message({ message: `文件${file.name}太大，不能超过 500kb`, type: 'warning' })
        return false
      }
      this.fileNum += 1
      // this.listObj[file.uid] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
      // const _self = this
      // const _URL = window.URL || window.webkitURL
      // const fileName = file.uid
      // this.listObj[fileName] = {}
      return new Promise((resolve, reject) => {
        // const img = new Image()
        // img.src = _URL.createObjectURL(file)
        // img.onload = function() {
        //   _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
        // }
        console.log(1)
        this.listObj[file.uid] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
        resolve(true)
      })
      // return false  // 返回false会阻断upload上传
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-box{
  display: flex;
  .editor-upload{
    flex: 1;
    margin-bottom: 20px;
    /deep/ .el-upload--picture-card{
      width: 100%;
    }
  }
  ul.upload-tip{
    width: 40%;
    list-style-type: none;
    margin: 0;
    padding: 0;
    li{
      line-height: 30px;
    }
  }
}
</style>
