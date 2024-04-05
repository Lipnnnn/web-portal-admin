<template>
  <el-page-header :icon="null" title="用户管理">
    <template #content>
      <span class="text-large font-600 mr-3"> 用户列表 </span>
    </template>
  </el-page-header>

  <el-card>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="username" label="用户名" width="180" />
      <el-table-column label="头像" width="180" >
        <template #default="scope">
          <div v-if="scope.row.avatar">
            <el-avatar :size="50" :src="'http://localhost:3333'+scope.row.avatar"></el-avatar>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="角色" width="180" >
        <template #default="scope">
          <el-tag v-if="scope.row.role === 1" type="danger">管理员</el-tag>
          <el-tag v-else type="success">编辑</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" >
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >
            删除
          </el-button>
      </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import {ref,onMounted} from 'vue';

// 表格数据
const tableData = ref([]);

// 挂载后执行函数
onMounted(()=>{
  getTableData();
})
// 获取用户信息（填写到表格中）
const getTableData = ()=>{
  axios.get('/adminapi/user/getUserData').then(res=>{
    tableData.value = res.data.userData;
  })
}

// 点击编辑按钮
const handleEdit = (index,row)=>{
  
}
// 点击删除按钮
const handleDelete = (index,row)=>{
  ElMessageBox.confirm(
    '确定要删除吗？',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async() => {
      // 提交axios请求，删除数据库中的该条用户信息
      await axios.delete(`/adminapi/user/list/${row._id}`);
      // 删除成功之后需要更新tableData表格数据，已达到刷新页面的效果，不展示已删除的用户数据
      getTableData();
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
    })
    .catch(() => {
      // 取消删除不给任何提示
    })
}


</script>

<style scoped>
.el-card{
  margin-top: 50px;
}
</style>