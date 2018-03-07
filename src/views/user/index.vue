<template>
  <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading"  fit highlight-current-row>
 
      <el-table-column label="用户名">
        <template slot-scope="scope">
          {{scope.row.username}}
        </template>
      </el-table-column>

      <el-table-column label="邮箱">
        <template slot-scope="scope">
          {{scope.row.email}}
        </template>
      </el-table-column>
     
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status ? "非法" : "正常"}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="注册时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.created_at}}</span>
        </template>
      </el-table-column>
    </el-table>

    <div class="pd-top_20">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size="page.size"
        :total="page.count">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/adminUser'

export default {
  data() {
    return {
      list: null,
      page: {
        count: 0,
        size: 10
      },
      listQuery: {
        page_no: 1
      },
      listLoading: true
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        s0: 'success',
        s1: 'gray'
      }
      const st = `s${status}`
      return statusMap[st]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        console.log(response)
        this.list = response.data
        this.page = response.page
        this.listLoading = false
      })
    },
    handleCurrentChange(val) {
      this.listQuery.page_no = val
      this.fetchData()
    }
  }
}
</script>
