<template>
  <div class="message">
    <el-row type="flex" justify="space-between" class="header">
      <el-col :span="4"><el-input placeholder="请输入昵称" v-model="searchText" clearable> </el-input> </el-col>
      <el-col :span="4">
        <el-select v-model="searchValue" placeholder="请选择留言状态" style="display: block;" clearable>
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
          <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="table-expand">
              <el-form-item label="IP：">
                <span>{{ props.row.ip }}</span>
              </el-form-item>
              <el-form-item label="地址：">
                <span v-if="!props.row.country&&!props.row.city">{{ props.row.country }} {{ props.row.city }}</span>
                <span v-else>暂无</span>
              </el-form-item>
              <el-form-item label="浏览器：">
                <span v-html="uaParse(props.row.agent)"></span>
              </el-form-item>
              <el-form-item label="系统：">
                <span v-html="osParse(props.row.agent)"></span>
              </el-form-item>
              <!-- <el-form-item label="内容：">
                <span>{{ props.row.content }}</span>
              </el-form-item> -->
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="50">
        </el-table-column>
        <el-table-column
          prop="name"
          label="昵称"
          width="120px"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="200px"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="content"
          label="内容"
          min-width="200px"
          show-overflow-tooltip>
        </el-table-column>
        <!-- :prop="createDate | formatterTime" -->
        <el-table-column
          label="创建时间"
          width="180">
          <template slot-scope="scope">
            <i class="iconfont icon-date mar"></i>
            {{ scope.row.createDate | formatterTime}}
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          width="80">
          <template slot-scope="scope">
            {{
               scope.row.state === 0
               ? '待审核'
               : scope.row.state === 1
                 ? '通过'
                 : '不通过'
            }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="380"
          fixed="right">
          <template slot-scope="scope">
            <transition-group tag="span" name="btn">
              <el-button
                type="success"
                size="small"
                v-if="scope.row.state === 0 || scope.row.state === 2"
                @click="changeState(scope.row, 1)"
                key="1">通过</el-button>
              <el-button
                type="danger"
                size="small"
                v-if="scope.row.state === 0 || scope.row.state === 1"
                @click="changeState(scope.row, 2)"
                key="2">不通过</el-button>
              <el-button
                type="danger"
                size="small"
                key="3"
                @click="deleteHero(scope.row)"
                :disabled="scope.row.deleteing">{{ scope.row.deleteing ? '删除中' : '删 除' }}</el-button>
              <el-button type="text" size="small" icon="el-icon-edit" key="4">编辑</el-button>
              <el-button type="text" size="small" icon="el-icon-edit" key="5">回复</el-button>
            </transition-group>
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
import moment from 'moment'
import { UAParse, OSParse } from '@/assets/js/parse.js'
// import { format } from '@/assets/js/filter.js'
  export default {
    name: 'message',
    data(){
      return {
        searchText: '',
        searchType: [{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '待审核'
        }, {
          value: '2',
          label: '已通过'
        }, {
          value: '3',
          label: '未通过'
        }],
        searchValue: '',
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
        tableData: [],
        currentPage: 1,
        pageSize: 10,
        total: 0,
        loading: false,
      }
    },
    created(){
      this._getMessage({ currentPage: this.currentPage, pageSize: this.pageSize })
    },
    filters: {
      // format,
      formatterTime(val){
        return moment(new Date(val)).format('YYYY-MM-DD HH:mm:ss')
      },
    },
    methods: {
      _getMessage(params){
        this.loading = true
        this.$store.dispatch('GetMessages', params).then(res => {
          console.log(res)
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
      formatterTime(row, column, cellValue, inde){
        return moment(new Date(cellValue)).format('YYYY-MM-DD HH:mm:ss')
      },
      uaParse(val){
        return UAParse(val)
      },
      osParse(val){
        return OSParse(val)
      },
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
