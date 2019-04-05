<template>
  <div class="link">
    <el-row type="flex" justify="space-between" class="header">
      <el-col :span="4"><el-input placeholder="请输入内容" v-model="searchText" clearable> </el-input> </el-col>
      <el-col :span="4">
        <el-select v-model="searchValue" placeholder="请选择">
          <el-option
            v-for="item in searchType"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="16">
        <el-button type="primary" icon="el-icon-search" round>搜索</el-button>
        <el-button type="primary" icon="el-icon-plus" round  @click="dialogVisible = true">新增</el-button>
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
            width="180">
            <template slot-scope="scope">
              <el-button type="text" size="small" icon="el-icon-view" @click="handleClick(scope.row)" >查看</el-button>
              <el-button type="text" size="small" icon="el-icon-edit">编辑</el-button>
              <!-- <el-popover trigger="click" placement="left-start">
                <p>确定要删除 <span class="sf-red">{{ scope.row.name }}</span> 吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click.native.prevent="$refs.page.click()">取消</el-button>
                  <el-button size="mini" type="primary" @click.native.prevent="handleOperationButtonClick(scope.row)">确定</el-button>
                </div>
                <el-button slot="reference" type="text" size="small">删除</el-button>
              </el-popover> -->
              <!-- title="确定删除？" -->
              <el-popover
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
              </el-popover>
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
      :before-close="handleBeforeClose">
      <div class="add" v-if="dialogType === 1">
        <el-form ref="form" :model="addForm" label-width="80px">
          <el-form-item label="活动名称">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-select v-model="addForm.region" placeholder="请选择活动区域" style="display: block;">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleComfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'linkPage',
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
          address: '上海市普陀区金沙江路 1518 弄',
          visible: false
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          visible: false
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          visible: false
        }],
        currentPage: 1,
        dialogVisible: false,
        dialogType: 1,
        addForm: {
          name: '',
          region: ''
        }
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
      handleBeforeClose(){
        console.log('close')
        this.dialogVisible = false
      },
      handleComfirm(){
        console.log('comfirm')
      },
      doCancle(scope){
        console.log(scope)
        console.log(this.tableData[scope.$index])
        this.$set(this.tableData[scope.$index], 'visible', false)
        console.log(this.tableData)
      },
      doDelete(scope){
        this.$set(this.tableData[scope.$index], 'visible', true)
      }
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
