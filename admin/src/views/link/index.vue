<template>
  <div class="link">
    <el-row type="flex" justify="space-between" class="header" :gutter="10">
      <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="4"><el-input placeholder="请输入内容" v-model="keyword" clearable size="small"> </el-input> </el-col>
      <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="4">
        <el-select v-model="type" placeholder="请选择链接类型"  style="display: block;" clearable size="small">
          <el-option
            v-for="item in linkTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="16" v-if="winWidth>500">
        <el-button type="primary" icon="el-icon-search" round @click="_getLink()" size="small">搜索</el-button>
        <el-button type="primary" icon="el-icon-plus" round @click="handleAdd" size="small">新增</el-button>
      </el-col>
    </el-row>
    <el-row style="padding: 0 10px;" v-if="winWidth<=500" type="flex" justify="end">
      <el-button type="primary" icon="el-icon-search" round @click="_getLink()" size="small">搜索</el-button>
      <el-button type="primary" icon="el-icon-plus" round @click="handleAdd" size="small">新增</el-button>
    </el-row>
    <el-row class="content">
      <el-col :span="24">
        <el-table
          v-loading="loading"
          :data="tableData"
          border
          height="560"
          stripe
          fit
          highlight-current-row
          :default-sort = "{prop: 'name'}"
          style="width: 100%"
          size="small">
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="50">
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称"
            sortable
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="typeText"
            label="类型"
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="url"
            align="center"
            label="链接"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="desc"
            align="center"
            label="描述"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="logo"
            align="center"
            label="logo"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="center"
            label="创建时间"
            width="160">
            <template slot-scope="scope">
              {{ scope.row.createDate | formatterTime}}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="更新时间"
            width="160">
            <template slot-scope="scope">
              {{ scope.row.updateDate | formatterTime}}
            </template>
          </el-table-column>
          <!-- fixed="right" -->
          <el-table-column
            label="操作"
            align="center"
            width="150">
            <template slot-scope="scope">
              <el-button type="text" size="small" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button type="text" size="small" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
              <!-- <el-popover
                ref="popover{{scope.$index}}"
                placement="top"
                width="160"
                trigger="click"
                title="确定删除？"
                v-model="scope.row.visible">
                <p>确定{{scope.$index}}删除吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button type="text" size="mini" @click="scope.row.visible = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="scope.row.visible = false">确定</el-button>
                </div>
                <el-button slot="reference" type="text" size="small" icon="el-icon-delete" style="margin-left: 10px;">删除</el-button>
              </el-popover> -->
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="total"
          :page-sizes="[10, 30, 50, 100]"
          layout="total, sizes, prev, pager, next">
        </el-pagination>
      </el-col>
    </el-row>
    <el-dialog
      :title="dialogType === 1 ? '新增' : '编辑'"
      :visible.sync="dialogVisible"
      :width="winWidth<500?'90%':winWidth<1200?'60%':'30%'"
      :close-on-click-modal="false"
      @close="handleDialogClose">
      <el-form ref="linkForm" :model="linkForm" :rules="linkFormRules" label-width="80px" status-icon>
        <el-form-item label="名称" required prop="name">
          <el-input v-model="linkForm.name" placeholder="请输入链接名称" clearable size="small"></el-input>
        </el-form-item>
        <el-form-item label="类型" required prop="type">
          <el-select v-model="linkForm.type" placeholder="请选择链接类型" style="display: block;" clearable size="small">
            <!-- option的值是通过===严格判断的 -->
            <el-option
              v-for="(item, index) in linkTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              v-show="index !== 0">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="URL" required prop="url">
          <el-input v-model="linkForm.url" placeholder="请输入链接地址" clearable size="small"
          @keyup.enter.native="handleSubmitForm">
          </el-input>
        </el-form-item>
        <el-form-item label="描述" required prop="desc">
          <el-input v-model="linkForm.desc" placeholder="请输入链接描述" clearable size="small"></el-input>
        </el-form-item>
        <el-form-item label="logo" prop="logo">
          <el-input v-model="linkForm.logo" placeholder="请输入logo地址" clearable size="small"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleSubmitForm" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  // import moment from 'moment'
  import data from '@/assets/js/data'
  import { formatterTime } from '@/assets/js/filter.js'
  import { validURL } from '@/assets/js/validate.js'

  export default {
    name: 'linkPage',
    data(){
      let linkTypes = data.linkTypes
      let validateURL = (rule, value, callback) => {
        if(value === ''){
          callback(new Error('请输入URL'))
        }else if (!validURL(value)) {
          callback(new Error('请正确输入URL'))
        } else {
          callback()
        }
      }
      return {
        keyword: '',
        linkTypes,
        type: '',
        linkForm: {
          _id: '',
          name: '',
          type: '',
          url: '',
          desc: '',
          logo: ''
        },
        linkFormRules: {
          name: [
            { required: true, message: '请输入链接名称', trigger: 'blur' },
            { required: true, message: '请输入链接名称', trigger: 'change' }
          ],
          type: [
            { required: true, message: '请选择链接类型', trigger: 'change' }
          ],
          url: [
            { validator: validateURL, trigger: 'blur' },
            { validator: validateURL, trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请输入链接描述', trigger: 'blur' },
            { required: true, message: '请输入链接描述', trigger: 'change' }
          ]
        },
        tableData: [],
        currentPage: 1,
        pageSize: 10,
        total: 0,
        loading: false,
        dialogVisible: false,
        dialogType: 1
      }
    },
    filters: {
      formatterTime
    },
    created(){
      this._getLink()
    },
    mounted(){
    },
    methods: {
      // formatterTime(row, column, cellValue, inde){
      //   return moment(parseInt(cellValue)).format('YYYY-MM-DD HH:mm:ss')
      // },
      _getLink(){
        this.loading = true
        this.$store.dispatch('link/getLink', { currentPage: this.currentPage, pageSize: this.pageSize, keyword: this.keyword, type: this.type }).then(res => {
          if(res.success){
            this.tableData = [...res.data.list]
            this.total = res.data.pagination.total
            this.pageSize = res.data.pagination.pageSize
            this.currentPage = res.data.pagination.currentPage
          }else{
            this.$message.error(res.msg)
          }
        }).then(() => {
          this.loading = false
        })
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`)
        this.pageSize = val
        this._getLink()
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`)
        this.currentPage = val
        this._getLink()
      },
      handleAdd(){
        // this.linkForm.id = ''
        // this.linkForm.name = ''
        // // 一定要转数字，否则无法知道select值
        // this.linkForm.type = ''
        // this.linkForm.url = ''
        // this.$refs['linkForm'].resetFields()
        this.linkForm = Object.assign({}, {
          _id: '',
          name: '',
          type: '',
          url: ''
        })
        this.$nextTick(() => { this.$refs['linkForm'].clearValidate() })
        this.dialogType = 1
        this.dialogVisible = true
      },
      handleEdit(row){
        // console.log(row)
        // this.linkForm.id = row._id
        // this.linkForm.name = row.name
        // // 一定要转数字，否则无法知道select值
        // this.linkForm.type = Number(row.type)
        // this.linkForm.url = row.url
        this.linkForm = { ...row }
        this.$nextTick(() => { this.$refs['linkForm'].clearValidate() })
        this.dialogType = 2
        this.dialogVisible = true
      },
      handleSubmitForm(){
        this.$refs.linkForm.validate((valid) => {
          if (valid) {
            // console.log(this.$refs.linkForm)
            let typeText = ''
            for(let item of this.linkTypes){
              if(item.value === this.linkForm.type){
                typeText = item.label
              }
            }
            let action = ''
            let params = {
              name: this.linkForm.name,
              type: this.linkForm.type,
              typeText: typeText,
              url: this.linkForm.url,
              desc: this.linkForm.desc,
              logo: this.linkForm.logo
            }
            if (this.linkForm._id) {
              // 编辑
              action = 'link/putLink'
              params._id = this.linkForm._id
              // params = Object.assign({}, {
              //   _id: this.linkForm._id,
              //   name: this.linkForm.name,
              //   type: this.linkForm.type,
              //   url: this.linkForm.url,
              //   desc
              // })
            } else {
              // 新增
              action = 'link/postLink'
              // params = { ...this.linkForm }
              params.color = this.randomColor() // 随机颜色
            }
            this.$store.dispatch(action, params).then(res => {
              // console.log(res)
              if(res.success){
                this._getLink()
                this.dialogVisible = false
                this.$message({
                  message: res.msg,
                  type: 'success'
                })
              }else{
                this.$message({
                  message: res.msg,
                  type: 'error'
                })
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      handleDelete(row){
        this.$confirm('此操作将删除该行, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('link/deleteLink', row._id).then(res => {
            if(res.success){
              this.$message.success(res.msg)
              this._getLink()
            }else{
              this.$message.error(res.msg)
            }
          })
        }).catch(() => {
          console.log('取消删除')
        })
      },
      handleDialogClose(){
        // console.log(this.$refs.linkForm)
        // this.$refs['linkForm'].resetFields()
        // console.log(this.linkForm)
        this.dialogVisible = false
      },
      // 随机颜色
      randomColor(){
        let r = Math.floor(Math.random() * 256)
        let g = Math.floor(Math.random() * 256)
        let b = Math.floor(Math.random() * 256)
        return `rgb(${r},${g},${b})`
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  $bg: #fff;
  .link {
    margin-top: 10px;
    padding: 0 10px 10px;
    background-color: $bg;
    .header{
      padding: 10px;
    }
    .content{
      padding: 10px;
      // min-height: 600px;
      background-color: $bg;
      /deep/ .el-table{
        overflow-y: scroll;
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
