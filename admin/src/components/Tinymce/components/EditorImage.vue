<template>
  <div class="upload-container">
    <el-button :style="{background:color,borderColor:color}" icon="el-icon-upload" size="mini" type="primary" @click=" dialogVisible=true">
      上传图片
    </el-button>
    <el-dialog :visible.sync="dialogVisible">
      <!-- action="https://httpbin.org/post"
          :on-success="handleSuccess"
           -->
      <div class="upload-box">
        <el-upload
          action=""
          :multiple="true"
          :file-list="fileList"
          :show-file-list="true"
          accept=".jpg, .jpeg, .png"
          :before-upload="beforeUpload"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          class="editor-slide-upload"
          list-type="picture-card"
        >
          <!-- <el-button size="small" type="primary"> 点击上传 </el-button> -->
          <i class="el-icon-plus"></i>
          <div slot="tip">文件格式必须是 jpg 、png 或 jpeg且不超过 500kb的图片。</div>
        </el-upload>
      </div>
      <el-button @click="dialogVisible = false">
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
      dialogVisible: false,
      listObj: {},
      fileList: [],
      fileArray: []
    }
  },
  methods: {
    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    handleSubmit() {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      if (!this.checkAllSuccess()) {
        this.$message('请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！')
        return
      }
      this.$emit('successCBK', arr)
      this.listObj = {}
      this.fileList = []
      this.dialogVisible = false
    },
    handleSuccess(response, file){
      console.log(response, file)
    },
    handlePictureCardPreview(){},
    handleRemove(file) {
      console.log(file)
    },
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
    // handleRemove(file) {
    //   const uid = file.uid
    //   const objKeyArr = Object.keys(this.listObj)
    //   for (let i = 0, len = objKeyArr.length; i < len; i++) {
    //     if (this.listObj[objKeyArr[i]].uid === uid) {
    //       delete this.listObj[objKeyArr[i]]
    //       return
    //     }
    //   }
    // },
    beforeUpload(file) {
      if(file.size > 500 * 1000){
        this.$message({ message: `文件${file.name}太大，不能超过 500kb`, type: 'warning' })
        return false
      }
      const _URL = window.URL || window.webkitURL
      this.fileList.push({ uid: file.uid, url: _URL.createObjectURL(file) })
      this.fileArray.push(file)
      console.log(this.fileArray)
      let formData = new FormData()
      for(let item of this.fileArray){
        formData.append('file', item)
      }
      // formData.append('file', file)
      setTimeout(() => {
        this.$store.dispatch('UploadArticlePics', formData).then(res => {
          console.log(res)
        })
      }, 2000)
      // const _self = this
      // const _URL = window.URL || window.webkitURL
      // const fileName = file.uid
      // this.listObj[fileName] = {}
      // return new Promise((resolve, reject) => {
      //   const img = new Image()
      //   img.src = _URL.createObjectURL(file)
      //   img.onload = function() {
      //     _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
      //   }
      //   resolve(true)
      // })
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-box{
  display: flex;
  .editor-slide-upload {
    flex: 1;
    margin-bottom: 20px;
    /deep/ .el-upload--picture-card {
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
