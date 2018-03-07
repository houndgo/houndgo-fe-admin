<template>
  <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading"  fit highlight-current-row>
 
      <el-table-column label="名称">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>

      <el-table-column label="排序">
        <template slot-scope="scope">
          <el-input :value="scope.row.sort" @blur="blurSort(scope.$index, $event)"  placeholder="请输入排序号"></el-input>
        </template>
      </el-table-column>
     
      <el-table-column class-name="status-col" label="是否禁用" width="110" align="center">
        <template slot-scope="scope">
          <el-switch
              v-model="scope.row.disabled"
              active-color="#13ce66"
              @change="changeWwitch(scope.$index, $event)"
              inactive-color="#8e8989">
            </el-switch>
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
import { CategoryListGet, CategoryUpdate } from '../../api/category'

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
      CategoryListGet(this.listQuery).then(response => {
        console.log(response)
        this.list = response.data
        this.page = response.page
        this.listLoading = false
      })
    },
    handleCurrentChange(val) {
      this.listQuery.page_no = val
      this.fetchData()
    },
    updateData(item) {
      this.listLoading = true
      CategoryUpdate(item).then(res => {
        console.log(res)
        this.listLoading = false
        this.$message({
          message: res.data,
          type: 'success'
        })
      }).catch(() => {
        this.loading = false
      })
    },
    changeWwitch(index, event) {
      console.log(index)
      console.log(event)
      const item = this.list[index]
      item.disabled = event
      this.updateData(item)
    },
    blurSort(index, event) {
      console.log(index)
      console.log(event)
      const val = Number(event.target.value)
      console.log(val)
      if (!val) {
        return
      }
      const item = this.list[index]
      item.sort = val
      this.updateData(item)
    }
  }
}
</script>
