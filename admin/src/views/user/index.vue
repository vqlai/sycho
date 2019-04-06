<template>
  <div class="user">
    <el-row type="flex" justify="space-between" class="header">
      <el-col :span="4"><el-input placeholder="请输入内容" v-model="queryName" clearable> </el-input> </el-col>
      <el-col :span="4">
        <el-select v-model="queryType" placeholder="请选择权限类型" clearable>
          <el-option
            v-for="item in userType"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="16">
        <el-button type="primary" icon="el-icon-search" round @click="handleSearch">搜索</el-button>
        <el-button type="primary" icon="el-icon-plus" round @click="handleAdd">新增</el-button>
      </el-col>
    </el-row>
    <el-row class="content">
      <el-col :span="24">
        <el-table
          :data="tableData"
          border
          height="560"
          stripe
          highlight-current-row
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="160">
            <template slot-scope="scope">
              <el-button type="text" size="small" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button type="text" size="small" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </el-col>
    </el-row>
    <el-dialog
      :title="dialogType === 1 ? '新增' : '编辑'"
      :visible.sync="dialogVisible"
      width="30%"
      :close-on-click-modal="false">
      <el-form ref="userForm" :model="userForm" :rules="userFormRules" label-width="80px">
        <el-form-item label="用户名" required prop="username">
          <el-input v-model="userForm.username" placeholder="请输入用户名" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" required prop="curPwd" v-if="dialogType === 1">
          <el-input v-model="userForm.curPwd" type="password" placeholder="请输入密码" clearable></el-input>
        </el-form-item>
        <el-form-item label="原始密码" required prop="prePwd" v-if="dialogType === 2">
          <el-input v-model="userForm.prePwd" type="password" placeholder="请输入密码" clearable></el-input>
        </el-form-item>
        <el-form-item label="新密码" required prop="newPwd" v-if="dialogType === 2">
          <el-input v-model="userForm.newPwd" type="password" placeholder="请输入密码" clearable></el-input>
        </el-form-item>
        <el-form-item label="确认密码" required prop="surePwd">
          <el-input v-model="userForm.surePwd" type="password" placeholder="请输入密码" clearable></el-input>
        </el-form-item>
        <el-form-item label="角色" required prop="role">
          <el-select v-model="userForm.role" placeholder="请选择角色权限类型" style="display: block;" clearable>
            <el-option
              v-for="(item, index) in userType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              v-show="index !== 0">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" required prop="desc">
          <el-input v-model="userForm.desc" placeholder="请输入描述" clearable></el-input>
        </el-form-item>
        <el-form-item label="头像" required>
          <div class="upload-box">
            <!-- :disabled="false"
            :http-request="handleUpload"
            :on-change="handleAvatarChange"
            :on-preview="handleAvatarPreview"
            :on-success="handleAvatarSuccess"
            :on-remove="handleAvatarRemove"
            list-type="picture-card"
            :file-list="fileList"
            :class="{'hidden': hiddenUploadBtn}"-->
            <el-upload
              action=""
              :auto-upload="true"
              :show-file-list="false"
              accept=".jpg, .jpeg, .png"
              :limit="1"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <ul class="upload-tip">
              <li>每次只能上传1张图片。</li>
              <li>每个文件大小不超过 500kb。</li>
              <li>文件必须是 jpg 、png 或 jpeg 格式的图片。</li>
            </ul>
            <el-dialog :visible.sync="avatarVisible" width="30%" append-to-body>
              <img width="100%" :src="avatarImgUrl" alt="">
            </el-dialog>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleFormComfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'user',
    data(){
      var checkPwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else if (value.length < 6){
          callback(new Error('密码不能少于6位'))
        } else {
          if (this.userForm.surePwd !== '') {
            this.$refs.userForm.validateField('surePwd')
          }
          callback()
        }
      }
      var checkPwd2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value.length < 6){
          callback(new Error('密码不能少于6位'))
        } else if (value !== this.userForm.curPwd) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        queryName: '',
        userType: [{
          value: '4',
          label: '全部'
        }, {
          value: '3',
          label: '用户'
        }, {
          value: '2',
          label: '管理员'
        }, {
          value: '1',
          label: '超级管理员'
        }],
        queryType: '',
        tableData: [],
        userForm: {
          id: undefined,
          username: '',
          curPwd: '',
          prePwd: '',
          newPwd: '',
          surePwd: '',
          role: '',
        },
        userFormRules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { required: true, message: '请输入用户名', trigger: 'change' }
          ],
          curPwd: [
            { validator: checkPwd, trigger: 'blur' },
            { required: true, message: '请输入密码', trigger: 'change' }
          ],
          prePwd: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { required: true, message: '请输入密码', trigger: 'change' }
          ],
          newPwd: [
            { validator: checkPwd, trigger: 'blur' },
            { required: true, message: '请输入密码', trigger: 'change' }
          ],
          surePwd: [
            { validator: checkPwd2, trigger: 'blur' },
            { required: true, message: '请输入密码', trigger: 'change' }
          ],
          role: [
            { required: true, message: '请选择用户角色', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请输入用户描述', trigger: 'blur' },
            { required: true, message: '请输入用户描述', trigger: 'change' }
          ],
        },
        currentPage: 1,
        pageSize: 10,
        total: 0,
        loading: false,
        dialogVisible: false,
        dialogType: 1,
        fileObj: null,
        avatarImgUrl: '', // 预览图片路径
        avatarVisible: false, // 预览图片弹窗
        imageUrl: ''
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
      },
      handleClick(row) {
        console.log(row)
      },
      handleSearch(){},
      handleAdd(){
        this.imageUrl = ''
        this.dialogType = 1
        this.dialogVisible = true
      },
      handleEdit(row){},
      handleDelete(row){},
      handleFormComfirm(){
        this.$refs.userForm.validate((valid) => {
          if (valid) {
            let formData = new FormData()
            if (this.fileObj) {
              // console.log(this.fileObj)
              formData.append('file', this.fileObj)
            }
            formData.append('username', this.userForm.username)
            formData.append('password', this.userForm.curPwd)
            formData.append('role', this.userForm.role)
            formData.append('desc', this.userForm.desc)
            // 注意输出formData只能通过get方式
            console.log(formData.get('file'))
            console.log(formData.get('username'))
            this.$store.dispatch('AddUser', formData).then(res => {
              console.log(res)
            })
          }
        })
      },
      beforeAvatarUpload(file) {
        if(file.size > 500 * 1000){
          this.$message({ message: `文件${file.name}太大，不能超过 500kb`, type: 'warning' })
          return false
        }
        console.log(file)
        // 读取文件对象
        let reader = new FileReader()
        // readAsDataURL 方法用于读取指定 Blob 或 File 的内容
        // 当读操作完成，readyState 变为 DONE，loadend 被触发，此时 result 属性包含数据：URL（以 base64 编码的字符串表示文件的数据）
        // 读取文件作为 URL 可访问地址
        reader.readAsDataURL(file)
        reader.onloadend = e => {
          // console.log(e)
          file.url = reader.result
          this.imageUrl = file.url
          this.fileObj = file
          // console.log(this.fileObj)
        }
      },
      // handleUpload(file){
      //   console.log(file)
      // },
      // 图片预览
      // handleAvatarPreview(file, fileList){
      //   console.log(file, fileList)
      //   this.avatarImgUrl = file.url
      //   this.avatarVisible = true
      // },
      // // 图片移除
      // handleAvatarRemove(file, fileList){
      //   console.log(file, fileList)
      //   // this.hiddenUploadBtn = false
      //   this.fileObj = null
      //   this.fileList = fileList
      // },
      // handleAvatarChange(file){
      //   console.log(file)
      // },
      // handleAvatarSuccess(res, file) {
      //   console.log(file)
      //   this.imageUrl = URL.createObjectURL(file.raw)
      // },
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  $bg: #fff;
  .user{
    padding: 10px;
    .header{
      padding: 10px;
      background-color: $bg;
      >.el-col{
        margin-right: 20px;
      }
    }
    .content{
      padding: 10px;
      background-color: $bg;
    }
    .el-pagination{
      padding: 10px 0;
      text-align: right;
    }
    .upload-box{
      display: flex;
      justify-content: space-between;
      &.hidden{
        /deep/ .el-upload {
          display: none;
        }
      }
      /deep/ .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .el-upload:hover {
        border-color: #409EFF;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
      }
      .avatar {
        width: 100px;
        height: 100px;
        display: block;
      }
      ul.upload-tip{
        list-style-type: none;
        margin: 0;
        padding: 0;
        li{
          line-height: 30px;
        }
      }
    }
  }
</style>
