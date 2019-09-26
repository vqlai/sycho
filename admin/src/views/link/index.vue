<template>
  <div class="link">
    <el-row type="flex" justify="space-between" class="header">
      <el-col :span="4"><el-input placeholder="请输入内容" v-model="keyword" clearable> </el-input> </el-col>
      <el-col :span="4">
        <el-select v-model="type" placeholder="请选择链接类型"  style="display: block;" clearable>
          <el-option
            v-for="item in linkTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="16">
        <el-button type="primary" icon="el-icon-search" round @click="_getLink()">搜索</el-button>
        <el-button type="primary" icon="el-icon-plus" round @click="handleAdd">新增</el-button>
      </el-col>
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
          style="width: 100%">
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
            width="180">
          </el-table-column>
          <el-table-column
            prop="desc"
            label="类型"
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="url"
            align="center"
            label="链接">
          </el-table-column>
          <el-table-column
            align="center"
            label="创建时间">
            <template slot-scope="scope">
              {{ scope.row.createDate | formatterTime}}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="更新时间">
            <template slot-scope="scope">
              {{ scope.row.updateDate | formatterTime}}
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
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
          layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
      </el-col>
    </el-row>
    <el-dialog
      :title="dialogType === 1 ? '新增' : '编辑'"
      :visible.sync="dialogVisible"
      width="30%"
      :close-on-click-modal="false"
      @close="handleDialogClose">
      <el-form ref="linkForm" :model="linkForm" :rules="linkFormRules" label-width="80px" status-icon>
        <el-form-item label="名称" required prop="name">
          <el-input v-model="linkForm.name" placeholder="请输入链接名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="类型" required prop="type">
          <el-select v-model="linkForm.type" placeholder="请选择链接类型" style="display: block;" clearable>
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
          <el-input v-model="linkForm.url" placeholder="请输入链接地址" clearable
          @keyup.enter.native="handleSubmitForm">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmitForm">确 定</el-button>
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
        console.log(validURL(value))
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
          url: ''
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
          ]
        },
        tableData: [],
        currentPage: 1,
        pageSize: 10,
        total: 0,
        loading: false,
        dialogVisible: false,
        dialogType: 1,
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
            console.log(this.tableData)
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
            let desc = ''
            for(let item of this.linkTypes){
              if(item.value === this.linkForm.type){
                desc = item.label
              }
            }
            let action = ''
            let params = {
              name: this.linkForm.name,
              type: this.linkForm.type,
              url: this.linkForm.url,
              desc: desc
            }
            if (this.linkForm._id) {
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
              action = 'link/postLink'
              // params = { ...this.linkForm }
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
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  $bg: #fff;
  .link {
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
  }
</style>
