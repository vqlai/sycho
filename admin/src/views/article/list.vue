<template>
  <div class="list">
    <el-row type="flex" justify="space-between" class="header">
      <el-col :span="4"><el-input placeholder="请输入标题or描述" v-model="keyword" clearable @keyup.enter.native="_getArticle"> </el-input> </el-col>
      <el-col :span="3">
        <el-select v-model="type" placeholder="请选择类别" style="display: block;" clearable>
          <el-option
            v-for="item in articleTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select v-model="tag" placeholder="请选择标签" style="display: block;" clearable>
          <el-option
            v-for="item in articleTags"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select v-model="publish" placeholder="请选择公开状态" style="display: block;" clearable>
          <el-option
            v-for="item in articlePublishs"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select v-model="state" placeholder="请选择发布状态" style="display: block;" clearable>
          <el-option
            v-for="item in articleStates"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" icon="el-icon-search" round @click.native="_getArticle">搜索</el-button>
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
            prop="desc"
            align="center"
            show-overflow-tooltip
            label="描述">
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
            width="200"
            show-overflow-tooltip
            label="标签">
          </el-table-column>
          <el-table-column
            prop="meta.likes"
            align="center"
            label="点赞数">
          </el-table-column>
          <el-table-column
            prop="meta.dislikes"
            align="center"
            label="吐槽数">
          </el-table-column>
          <el-table-column
            prop="meta.views"
            align="center"
            label="浏览数">
          </el-table-column>
          <!-- <el-table-column
            prop="status"
            label="状态">
          </el-table-column> -->
          <el-table-column
            label="公开状态"
            label-class-name="head">
            <template slot-scope="scope">
              {{ scope.row.publish === 1 ? '公开' : '私密' }}
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            label-class-name="head">
            <template slot-scope="scope">
              {{ scope.row.state === 1 ? '已发布' : '草稿' }}
            </template>
          </el-table-column>
          <el-table-column
            prop="createDate"
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
          <!-- <el-table-column
            prop="address"
            label="脚踩数">
          </el-table-column> -->
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            min-width="200">
            <template slot-scope="scope">
              <el-button type="text" size="small" v-if="scope.row.publish === 1"  @click="handleState(scope.row, 'publish', 2)">私密</el-button>
              <el-button type="text" size="small" v-else  @click="handleState(scope.row, 'publish', 1)">公开</el-button>
              <el-button type="text" size="small" v-if="scope.row.state === 2" @click="handleState(scope.row, 'state', 1)">发布</el-button>
              <el-button type="text" size="small" v-else  @click="handleState(scope.row, 'state', 2)">草稿</el-button>
              <el-button type="text" size="small" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button type="text" size="small" icon="el-icon-edit" @click="handleDelete(scope.row)">删除</el-button>
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
  </div>
</template>

<script>
  import moment from 'moment'
  import data from '@/assets/js/data'
  import { formatterTime } from '@/assets/js/filter.js'
  export default {
    name: 'list',
    data(){
      let articleTypes = data.articleTypes
      let articleTags = data.articleTags
      return {
        keyword: '',
        type: '',
        tag: '',
        publish: '',
        state: '',
        articleTypes,
        articleTags,
        articlePublishs: [
          { label: '全部', value: 0 },
          { label: '公开', value: 1 },
          { label: '私密', value: 2 }
        ],
        articleStates: [
          { label: '全部', value: 0 },
          { label: '已发布', value: 1 },
          { label: '草稿', value: 2 }
        ],
        tableData: [],
        currentPage: 1,
        pageSize: 10,
        total: 0,
        loading: false,
      }
    },
    filters: {
      formatterTime
    },
    created(){
      this._getArticle()
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
        // console.log(cellValue.split(','))
        // 箭头函数省去return
        return cellValue.split(',').map(item => this.articleTags[parseInt(item)].label).join()
      },
      _getArticle(){
        this.loading = true
        let params = {
          keyword: this.keyword,
          type: this.type,
          tag: this.tag,
          publish: this.publish,
          state: this.state,
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }
        this.$store.dispatch('article/getArticle', params).then(res => {
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
        this.pageSize = val
        this._getArticle()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this._getArticle()
      },
      // 修改文章状态
      handleState(row, type, state){
        let params = {}
        params._id = row._id
        params[type] = state
        this.$store.dispatch('article/patchArticle', params).then(res => {
          if(res.success){
            this.$message.success(res.msg)
            this._getArticle({ currentPage: this.currentPage, pageSize: this.pageSize })
          }else{
            this.$message.error(res.msg)
          }
        })
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
          this.$store.dispatch('article/deleteArticle', row._id).then(res => {
            if(res.success){
              this.$message.success(res.msg)
              this._getArticle({ currentPage: this.currentPage, pageSize: this.pageSize })
            }else{
              this.$message.error(res.msg)
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
