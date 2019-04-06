<template>
  <div class="link">
    <el-row type="flex" justify="space-between" class="header">
      <el-col :span="4"><el-input placeholder="请输入内容" v-model="queryName" clearable> </el-input> </el-col>
      <el-col :span="4">
        <el-select v-model="queryType" placeholder="请选择链接类型" clearable>
          <el-option
            v-for="item in linkType"
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
           v-loading="loading"
          :data="tableData"
          border
          height="560"
          stripe
          highlight-current-row
          :default-sort = "{prop: 'name'}"
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            width="50">
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称"
            sortable
            width="180">
          </el-table-column>
          <el-table-column
            prop="desc"
            label="类型"
            width="180">
          </el-table-column>
          <el-table-column
            prop="url"
            label="链接">
          </el-table-column>
          <el-table-column
            prop="createTime"
            :formatter="formatterTime"
            label="创建时间">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="150">
            <template slot-scope="scope">
              <el-button type="text" size="small" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button type="text" size="small" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
              <!-- <el-popover trigger="click" placement="left-start">
                <p>确定要删除 <span class="sf-red">{{ scope.row.name }}</span> 吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click.native.prevent="$refs.page.click()">取消</el-button>
                  <el-button size="mini" type="primary" @click.native.prevent="handleOperationButtonClick(scope.row)">确定</el-button>
                </div>
                <el-button slot="reference" type="text" size="small">删除</el-button>
              </el-popover> -->
              <!-- title="确定删除？" -->
              <!-- <el-popover
                ref="popover{{scope.$index}}"
                placement="top"
                width="160"
                trigger="click"
                v-model="scope.row.visible">
                <p>确定{{scope.$index}}删除吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button type="text" size="mini" @click="doCancle(scope)">取消</el-button>
                  <el-button type="primary" size="mini" @click="scope.row.visible = false">确定</el-button>
                </div>
                <el-button slot="reference" type="text" size="small" icon="el-icon-delete" style="margin-left: 10px;"
                @click="doDelete(scope)">删除</el-button>
              </el-popover> -->
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 30, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-col>
    </el-row>
    <el-dialog
      :title="dialogType === 1 ? '新增' : '编辑'"
      :visible.sync="dialogVisible"
      width="30%"
      :close-on-click-modal="false"
      @close="handleDialogClose">
      <el-form ref="linkForm" :model="linkForm" :rules="linkFormRules" label-width="80px">
        <el-form-item label="名称" required prop="name">
          <el-input v-model="linkForm.name" placeholder="请输入链接名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="类型" required prop="type">
          <el-select v-model="linkForm.type" placeholder="请选择链接类型" style="display: block;" clearable>
            <el-option
              v-for="item in linkType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="URL" required prop="url">
          <el-input v-model="linkForm.url" placeholder="请输入链接地址" clearable
          @keyup.enter.native="handleFormComfirm"></el-input>
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
    name: 'linkPage',
    data(){
      return {
        queryName: '',
        linkType: [{
          value: 1,
          label: '技术'
        }, {
          value: 2,
          label: '生活'
        }, {
          value: 3,
          label: '购物'
        }],
        queryType: '',
        linkForm: {
          id: undefined,
          name: '',
          type: '',
          url: ''
        },
        linkFormRules: {
          name: [
            { required: true, message: '请输入链接名称', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择链接类型', trigger: 'change' }
          ],
          url: [
            { required: true, message: '请输入链接地址', trigger: 'blur' }
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
    created(){
      this._getLink({ currentPage: this.currentPage, pageSize: this.pageSize })
    },
    mounted(){
    },
    methods: {
      formatterTime(){
      },
      _getLink(params){
        this.loading = true
        this.$store.dispatch('GetLink', params).then(res => {
          // console.log(res)
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
        this.pageSize = val
        this._getLink({ currentPage: 1, pageSize: this.pageSize })
        // console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this._getLink({ currentPage: this.currentPage, pageSize: this.pageSize })
        // console.log(`当前页: ${val}`)
      },
      handleSearch(){
        this._getLink({ currentPage: 1, pageSize: this.pageSize, queryName: this.queryName, queryType: this.queryType })
      },
      handleAdd(){
        this.linkForm.id = ''
        this.linkForm.name = ''
        // 一定要转数字，否则无法知道select值
        this.linkForm.type = ''
        this.linkForm.url = ''
        // this.$refs['linkForm'].resetFields()
        this.dialogType = 1
        this.dialogVisible = true
        this.$nextTick(() => {
          this.$refs['linkForm'].clearValidate()
        })
      },
      handleEdit(row){
        console.log(row)
        this.linkForm.id = row._id
        this.linkForm.name = row.name
        // 一定要转数字，否则无法知道select值
        this.linkForm.type = Number(row.type)
        this.linkForm.url = row.url
        this.dialogType = 2
        this.dialogVisible = true
        this.$nextTick(() => {
          this.$refs['linkForm'].clearValidate()
        })
      },
      handleDelete(row){
        this.$store.dispatch('DeleteLink', row._id).then(res => {
          if(res.success){
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this._getLink({ currentPage: this.currentPage, pageSize: this.pageSize })
          }else{
            this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        })
      },
      handleDialogClose(){
        // console.log(this.$refs.linkForm)
        // this.$refs['linkForm'].resetFields()
        // console.log(this.linkForm)
        this.dialogVisible = false
      },
      handleFormComfirm(){
        this.$refs.linkForm.validate((valid) => {
          if (valid) {
            // console.log(this.$refs.linkForm)
            let desc = ''
            for(let item of this.linkType){
              if(item.value === this.linkForm.type){
                desc = item.label
              }
            }
            let params = {
              name: this.linkForm.name,
              type: this.linkForm.type,
              url: this.linkForm.url,
              desc: desc
            }
            console.log(params)
            if(this.dialogType === 1){
              this.$store.dispatch('AddLink', params).then(res => {
                console.log(res)
                if(res.success){
                  this._getLink({ currentPage: 1, pageSize: this.pageSize })
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
            }else if(this.dialogType === 2){
              params.id = this.linkForm.id
              this.$store.dispatch('EditLink', params).then(res => {
                console.log(res)
                if(res.success){
                  this._getLink({ currentPage: 1, pageSize: this.pageSize })
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
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
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
    }
    .el-pagination{
      padding: 10px 0;
      text-align: right;
    }
  }
</style>
