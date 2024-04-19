<template>
  <el-page-header :icon="null" title="产品管理">
    <template #content>
      <span class="text-large font-600 mr-3"> 产品列表 </span>
    </template>
  </el-page-header>
  <el-card>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="产品名称"/>
      <el-table-column prop="introduction" label="简要描述"/>
      <el-table-column label="更新时间">
      <template #default="scope">
        {{ editTimeShow(scope.row.editTime) }}
      </template>
      </el-table-column>
      <el-table-column prop="edit" label="操作">
        <template #default="scope">
          <el-button
            circle
            :icon="Edit"
            type="default"
            size="small"
            @click="handleEdit(scope.row._id)"
          />
          <el-button
            circle
            :icon="Delete"
            type="danger"
            size="small"
            @click="handleDelete(scope.row._id)"
          />
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
import { ElMessage, ElMessageBox } from 'element-plus';
import {Star,Edit,Delete} from '@element-plus/icons-vue'
import {ref,reactive, onMounted, computed} from 'vue';
import { format } from 'date-fns';
import axios from 'axios';

const tableData = ref([]);

onMounted(()=>{
  getProductList();
})

// 获取产品列表数据
const getProductList = async()=>{
  const res = await axios.get('/adminapi/product/list');
  tableData.value = res.data.data;
}

// 显示时间
const editTimeShow = (editTime)=>{
  return format(editTime,'yyyy/MM/dd');
}

// 删除产品
const handleDelete = async(id)=>{
  ElMessageBox.confirm(
    '确定要删除吗？',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async()=>{
    await axios.delete(`/adminapi/product/delete/${id}`);
    await getProductList();
  }).catch(() => {
      // 取消删除不给任何提示
    })
  

}

</script>

<style scoped>
.el-card{
  margin-top: 50px;
}

</style>