<template>
  <div class="list">
    <el-row type="flex" justify="space-between" class="header">
      <el-col :span="4"><el-input placeholder="请输入标题" v-model="queryTitle" clearable> </el-input> </el-col>
      <el-col :span="4">
        <el-select v-model="queryType" placeholder="请选择文章类别" style="display: block;" clearable>
          <el-option
            v-for="item in articleTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="queryTag" placeholder="请选择文章标签" style="display: block;" clearable>
          <el-option
            v-for="item in articleTags"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="12">
        <el-button type="primary" icon="el-icon-search" round @click="handleSearch">搜索</el-button>
        <!-- <el-button type="primary" icon="el-icon-plus" round @click="handleAdd">新增</el-button> -->
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
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="60">
          </el-table-column>
          <el-table-column
            label="标题"
            align="center"
            show-overflow-tooltip
            width="280">
            <template slot-scope="{row}">
              <router-link :to="'/article/edit/'+row._id" class="link-type">
                <span>{{ row.title }}</span>
              </router-link>
            </template>
          </el-table-column>
          <el-table-column
            prop="author"
            align="center"
            label="作者">
          </el-table-column>
          <el-table-column
            prop="type"
            :formatter="formatType"
            align="center"
            label="类型">
          </el-table-column>
          <el-table-column
            prop="tag"
            :formatter="formatTag"
            align="center"
            width="280"
            show-overflow-tooltip
            label="标签">
          </el-table-column>
          <el-table-column
            prop="likeNum"
            align="center"
            label="点赞数">
          </el-table-column>
          <el-table-column
            prop="lookNum"
            align="center"
            label="浏览数">
          </el-table-column>
          <!-- <el-table-column
            prop="status"
            label="状态">
          </el-table-column> -->
          <el-table-column
            prop="releaseTime"
            align="center"
            label="发布时间"
            width="160">
          </el-table-column>
          <el-table-column
            prop="createTime"
            align="center"
            :formatter="formatTime"
            label="创建时间"
            width="160">
          </el-table-column>
          <!-- <el-table-column
            prop="address"
            label="脚踩数">
          </el-table-column> -->
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="140">
            <template slot-scope="scope">
              <el-button type="text" size="small" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button type="text" size="small" icon="el-icon-edit" @click="handleDelete(scope.row)">删除</el-button>
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
  </div>
</template>

<script>
  import moment from 'moment'
  import data from '@/assets/js/data'
  export default {
    name: 'list',
    data(){
      let articleTypes = data.articleTypes
      let articleTags = data.articleTags
      return {
        queryTitle: '',
        articleTypes,
        queryType: '',
        articleTags,
        queryTag: '',
        tableData: [],
        currentPage: 1,
        pageSize: 10,
        total: 0,
        loading: false,
      }
    },
    created(){
      this._getArticles({ currentPage: this.currentPage, pageSize: this.pageSize })
    },
    mounted(){},
    destroyed(){},
    methods: {
      formatTime(row, column, cellValue, inde){
        return moment(parseInt(cellValue)).format('YYYY-MM-DD HH:mm:ss')
      },
      formatType(row, column, cellValue, inde){
        return this.articleTypes[cellValue].label
      },
      formatTag(row, column, cellValue, inde){
        // 箭头函数省去return
        return cellValue.split(',').map(item => this.articleTags[parseInt(item)].label).join()
      },
      _getArticles(params){
        this.loading = true
        this.$store.dispatch('GetArticles', params).then(res => {
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
        this._getArticles({ currentPage: 1, pageSize: this.pageSize })
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this._getArticles({ currentPage: this.currentPage, pageSize: this.pageSize })
      },
      handleSearch(){
        this._getArticles({ currentPage: 1, pageSize: this.pageSize, queryTitle: this.queryTitle, queryType: this.queryType, queryTag: this.queryTag })
      },
      handleEdit(row) {
        console.log(row)
        this.$router.push({ path: `/article/edit/${row._id}` })
      },
      handleDelete(row) {
        console.log(row)
        this.$confirm('此操作将删除该行, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('DeleteArticle', row._id).then(res => {
            if(res.success){
              this.$message({
                message: res.msg,
                type: 'success'
              })
              this._getArticles({ currentPage: this.currentPage, pageSize: this.pageSize })
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
    },
    components: {}
  }
</script>

<style lang="scss" scoped>
  $bg: #fff;
  .list{
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
      .link-type, .link-type:focus {
        color: #337ab7;
        cursor: pointer;
      }
    }
    .el-pagination{
      padding: 10px 0;
      text-align: right;
    }
  }
</style>
