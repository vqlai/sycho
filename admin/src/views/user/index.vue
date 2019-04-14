<template>
  <div class="user">
    <el-row type="flex" justify="space-between" class="header">
      <el-col :span="4"><el-input placeholder="请输入内容" v-model="queryName" clearable> </el-input> </el-col>
      <el-col :span="4">
        <el-select v-model="queryRole" placeholder="请选择权限类型" style="display: block;" clearable>
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
          v-loading="loading"
          border
          max-height="680"
          stripe
          fit
          highlight-current-row
          :default-sort = "{prop: 'createTime', order: 'descending'}"
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="50">
          </el-table-column>
          <el-table-column
            prop="username"
            label="昵称"
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="username"
            label="用户名"
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="role"
            label="角色类型"
            :formatter="formatterRole"
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="avatar"
            label="头像"
            align="center"
            width="280">
              <template slot-scope="scope">
                <img style="width: auto;max-width: 100%;max-height:80px;" :src="reUrl+scope.row.avatar" alt="">
              </template>
          </el-table-column>
          <el-table-column
            prop="desc"
            align="center"
            label="角色描述">
          </el-table-column>
          <el-table-column
            prop="createTime"
            sortable
            :formatter="formatterTime"
            align="center"
            label="创建时间">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="160">
            <template slot-scope="scope">
              <el-button type="text" size="small" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button type="text" size="small" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- @prev-click="handlePrevClick"
        @next-click="handleNextClick" -->
        <el-pagination
          :current-page="currentPage"
          :page-size="pageSize"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 30, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
      </el-col>
    </el-row>
    <el-dialog
      :title="dialogType === 1 ? '新增' : '编辑'"
      :visible.sync="dialogVisible"
      width="30%"
      :close-on-click-modal="false">
      <el-form
        ref="userForm"
        :model="userForm"
        :rules="userFormRules"
        status-icon
        label-width="80px"
        :close-on-click-modal="false">
        <el-form-item label="用户名" required prop="username" autocomplete="off">
          <el-input v-model="userForm.username" placeholder="请输入用户名" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" required prop="curPwd" v-if="dialogType === 1" autocomplete="off">
          <el-input v-model="userForm.curPwd" type="password" placeholder="请输入密码" clearable></el-input>
        </el-form-item>
        <el-form-item label="原始密码" required prop="prePwd" v-if="dialogType === 2" autocomplete="off">
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
        <el-form-item label="头像">
          <div class="upload-box">
            <!-- :disabled="false"
            :http-request="handleUpload"
            :on-change="handleAvatarChange"
            :on-preview="handleAvatarPreview"
            :on-success="handleAvatarSuccess"
            :on-remove="handleAvatarRemove"
            list-type="picture-card"
            :file-list="fileList"
            :class="{'hidden': hiddenUploadBtn}" class="avatar" -->
            <el-upload
              action=""
              :auto-upload="true"
              :show-file-list="false"
              accept=".jpg, .jpeg, .png"
              :limit="1"
              :before-upload="beforeAvatarUpload">
              <div v-if="avatarImgUrl" :class="['avatar-box',{'hover': avatarImgHover}]"
                @mouseenter="avatarImgHover = true"
                @mouseleave="avatarImgHover = false">
                <img :src="avatarImgUrl" class="avatar">
                <div v-if="avatarImgHover" class="imgHoverBtns">
                  <i class="el-icon-zoom-in" @click.stop="avatarVisible=true"></i>
                  <i class="el-icon-delete" @click.stop="handleRemoveAvatar"></i>
                </div>
              </div>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <ul class="upload-tip">
              <li>每次只能上传1张图片。</li>
              <li>每个文件大小不超过 500kb。</li>
              <li>文件必须是 jpg 、png 或 jpeg 格式的图片。</li>
            </ul>
            <el-dialog :visible.sync="avatarVisible" width="35%" append-to-body>
              <div style="text-align: center;">
                <img :src="avatarImgUrl" alt="" style="display: inline-block;width: auto;max-width: 100%;height: 600px;">
              </div>
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
  import moment from 'moment'
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
        } else if (value !== this.userForm.curPwd && this.dialogType === 1) {
          callback(new Error('两次密码输入不一致!'))
        } else if (value !== this.userForm.newPwd && this.dialogType === 2) {
          callback(new Error('两次密码输入不一致!'))
        } else {
          callback()
        }
      }
      return {
        queryName: '',
        userType: [{
          value: 4,
          label: '全部'
        }, {
          value: 3,
          label: '用户'
        }, {
          value: 2,
          label: '管理员'
        }, {
          value: 1,
          label: '超级管理员'
        }],
        queryRole: '',
        tableData: [],
        userForm: {
          id: undefined,
          username: '',
          curPwd: '',
          prePwd: '',
          newPwd: '',
          surePwd: '',
          role: undefined,
          desc: ''
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
        avatarImgUrl: '', // 头像路径
        avatarVisible: false, // 预览图片弹窗
        avatarImgHover: false
      }
    },
    created(){
      this._getUsers({ currentPage: this.currentPage, pageSize: this.pageSize })
    },
    methods: {
      handleRemoveAvatar(){
        this.avatarImgUrl = ''
      },
      formatterRole(row, column, cellValue, index){
        if(cellValue === 1){
          return '超级管理员'
        }else if(cellValue === 2){
          return '管理员'
        }else if(cellValue === 3){
          return '用户'
        }
      },
      formatterTime(row, column, cellValue, inde){
        return moment(parseInt(cellValue)).format('YYYY-MM-DD HH:mm:ss')
      },
      _getUsers(params){
        this.loading = true
        this.$store.dispatch('GetUsers', params).then(res => {
          if(res.success){
            this.tableData = [...res.data.list]
            this.total = res.data.pagination.total
            this.pageSize = res.data.pagination.pageSize
            this.currentPage = res.data.pagination.currentPage
          }else{
            this.$message(res.msg)
          }
        }).then(() => {
          this.loading = false
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.pageSize = val
        this._getUsers({ currentPage: 1, pageSize: this.pageSize })
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        this.currentPage = val
        this._getUsers({ currentPage: this.currentPage, pageSize: this.pageSize })
      },
      handleClick(row) {
        console.log(row)
      },
      handleSearch(){
        this._getUsers({ currentPage: 1, pageSize: this.pageSize, queryName: this.queryName, queryRole: this.queryRole })
      },
      handleAdd(){
        this.userForm.username = ''
        this.userForm.curPwd = ''
        this.userForm.prePwd = ''
        this.userForm.newPwd = ''
        this.userForm.surePwd = ''
        this.userForm.role = ''
        this.userForm.desc = ''
        this.avatarImgUrl = ''
        this.$nextTick(() => {
          this.$refs['userForm'].clearValidate()
        })
        this.dialogType = 1
        this.dialogVisible = true
      },
      handleEdit(row){
        console.log(row)
        this.userForm.id = row._id
        this.userForm.username = row.username
        this.userForm.curPwd = ''
        this.userForm.prePwd = ''
        this.userForm.newPwd = ''
        this.userForm.surePwd = ''
        this.userForm.role = Number(row.role)
        this.userForm.desc = row.desc
        this.avatarImgUrl = `${this.reUrl}${row.avatar}`
        this.$nextTick(() => {
          this.$refs['userForm'].clearValidate()
        })
        this.dialogType = 2
        this.dialogVisible = true
      },
      handleDelete(row){
        this.$confirm('此操作将删除该行, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('DeleteUser', row._id).then(res => {
            if(res.success){
              this.$message({
                message: res.msg,
                type: 'success'
              })
              this._getUsers({ currentPage: this.currentPage, pageSize: this.pageSize })
            }else{
              this.$message({
                message: res.msg,
                type: 'error'
              })
            }
          })
        }).catch(() => {
          console.log('取消删除')
        })
      },
      handleFormComfirm(){
        this.$refs.userForm.validate((valid) => {
          if (valid) {
            let formData = new FormData()
            formData.append('file', this.fileObj)
            formData.append('username', this.userForm.username)
            formData.append('surePwd', this.userForm.surePwd)
            formData.append('role', this.userForm.role)
            formData.append('desc', this.userForm.desc)
            // 注意输出formData只能通过get方式
            // console.log(formData.get('file'))
            // console.log(formData.get('username'))
            if(this.dialogType === 1){
              // if (this.fileObj) {
              //   formData.append('file', this.fileObj)
              // }else{
              //   this.$message({ message: '请选择头像', type: 'warning' })
              //   return
              // }
              formData.append('curPwd', this.userForm.curPwd)
              this.$store.dispatch('AddUser', formData).then(res => {
                if(res.success){
                  this.fileObj = null // 清空上传图片
                  this.dialogVisible = false
                  this.$message({ message: res.msg, type: 'success' })
                  this._getUsers({ currentPage: 1, pageSize: this.pageSize })
                }else{
                  this.$message({ message: res.msg, type: 'error' })
                }
              })
            }else if(this.dialogType === 2){
              formData.append('id', this.userForm.id)
              formData.append('prePwd', this.userForm.prePwd)
              formData.append('newPwd', this.userForm.newPwd)
              this.$store.dispatch('EditUser', formData).then(res => {
                if(res.success){
                  this.fileObj = null // 清空上传图片
                  this.dialogVisible = false
                  this.$message({ message: res.msg, type: 'success' })
                  this._getUsers({ currentPage: 1, pageSize: this.pageSize })
                }else{
                  this.$message({ message: res.msg, type: 'error' })
                }
              })
            }
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
          this.avatarImgUrl = file.url
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
      //   this.avatarImgUrl = URL.createObjectURL(file.raw)
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
      .el-table{
        // min-height: 560px;
      }
    }
    .el-pagination{
      padding: 10px 0;
      text-align: right;
    }
    .upload-box{
      display: flex;
      justify-content: space-between;
      // &.hidden{
      //   /deep/ .el-upload {
      //     display: none;
      //   }
      // }
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
      .avatar-box{
        position: relative;
        &.hover{
          &::after{
            content: ' ';
            position: absolute;
            top:0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 10;
            background: rgba($color: #000000, $alpha: .5)
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
        .avatar {
          width: 100px;
          height: 100px;
          display: block;
        }
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
