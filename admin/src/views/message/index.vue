<template>
  <div class="message">
    <el-row type="flex" justify="space-between" class="header">
      <el-col :span="4"><el-input placeholder="请输入内容" v-model="searchText" clearable> </el-input> </el-col>
      <el-col :span="4">
        <el-select v-model="searchValue" placeholder="请选择" style="display: block;" clearable>
          <el-option
            v-for="item in searchType"
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
          fit
          highlight-current-row
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="50">
          </el-table-column>
          <el-table-column
            prop="name"
            label="留言内容"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="用户名">
          </el-table-column>
          <el-table-column
            prop="address"
            label="留言时间">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="180">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small" icon="el-icon-view">查看</el-button>
              <el-button type="text" size="small" icon="el-icon-edit">编辑</el-button>
              <el-button type="text" size="small" icon="el-icon-edit">回复</el-button>
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
      :title="dialogType === 1 ? '添加' : '编辑'"
      :visible.sync="dialogVisible"
      width="30%"
      :close-on-click-modal="false">
      <!-- :rules="messageFormRules"  -->
      <el-form ref="messageForm" :model="messageForm" label-width="80px" status-icon>
        <el-form-item label="昵称" required prop="name">
          <el-input v-model="messageForm.name" placeholder="请输入昵称" clearable></el-input>
        </el-form-item>
        <el-form-item label="邮箱" required prop="email">
          <el-input v-model="messageForm.email" placeholder="请输入邮箱" clearable></el-input>
        </el-form-item>
        <el-form-item label="内容" required prop="content" @keyup.enter.native="handleFormComfirm">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="messageForm.content"> </el-input>
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
    name: 'message',
    data(){
      return {
        searchText: '',
        searchType: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        searchValue: '',
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }],
        currentPage: 1,
        messageForm: {
          id: undefined,
          name: '',
          email: '',
          content: ''
        },
        messageFormRules: {
          name: [
            { required: true, message: '请输入链接名称', trigger: 'blur' },
            { required: true, message: '请输入链接名称', trigger: 'change' }
          ],
          email: [
            { required: true, message: '请选择链接类型', trigger: 'change' }
          ],
          content: [
            { required: true, message: '请输入链接地址', trigger: 'blur' },
            { required: true, message: '请输入链接地址', trigger: 'change' }
          ]
        },
        dialogVisible: false,
        dialogType: 1,
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
        this.messageForm.id = ''
        this.messageForm.nickName = ''
        // 一定要转数字，否则无法知道select值
        this.messageForm.email = ''
        this.messageForm.content = ''
        // this.$refs['messageForm'].resetFields()
        this.dialogType = 1
        this.dialogVisible = true
        this.$nextTick(() => {
          this.$refs['messageForm'].clearValidate()
        })
      },
      handleFormComfirm(){
        let params = {
          name: this.messageForm.name,
          email: this.messageForm.email,
          content: this.messageForm.content,
          agent: navigator.userAgent
        }
        this.$store.dispatch('AddMessage', params).then(res => {
          console.log(res)
          if(res.success){
            // this._getLinks({ currentPage: 1, pageSize: this.pageSize })
            this.dialogVisible = false
            this.$message.success(res.msg)
          }else{
            this.$message.error(res.msg)
          }
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
  $bg: #fff;
  .message{
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
  }
</style>
