<template>
  <el-page-header :icon="null" title="新闻管理">
    <template #content>
      <span class="text-large font-600 mr-3"> 新闻列表 </span>
    </template>
  </el-page-header>
  <el-card>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="title" label="标题"/>
      <el-table-column label="分类">
        <template #default="scope">
          {{ categoryShow(scope.row.category) }}
        </template>
      </el-table-column>
      <el-table-column label="更新时间">
        <template #default="scope">
          {{ editTimeShow(scope.row.editTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="isPublish" label="是否发布">
        <template #default="scope">
          <el-switch v-model="scope.row.isPublish" @click="handlePublish(scope.row)"/>
        </template>
      </el-table-column>
      <el-table-column prop="edit" label="操作">
        <template #default="scope">
          <el-button
            circle
            :icon="Star"
            type="success"
            size="small"
            @click="handlePreview(scope.row)"
          />
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
    <!-- 预览新闻的弹窗 -->
    <el-dialog v-model="previewNews" title="新闻预览" width="800">
      <h3>{{ news.title }}</h3>
      <p>{{ editTimeShow(news.editTime) }}</p>
      <el-divider>
        <el-icon><star-filled /></el-icon>
      </el-divider>
      <div v-html="news.content"></div>
  </el-dialog>
  </el-card>
</template>

<script setup>
import { StarFilled } from '@element-plus/icons-vue'
import {ref,reactive, onMounted, computed} from 'vue';
import {Star,Edit,Delete} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import { format } from 'date-fns';
import axios from 'axios';
import router from '@/router';

const tableData = ref([]);

onMounted(()=>{
  getNewsList();
})

// 获取新闻列表数据
const getNewsList = async()=>{
  const res = await axios.get('/adminapi/news/list');
  tableData.value = res.data.data;
}

// 显示分类
const categoryShow = (category)=>{
  let arr = ['最新动态','典型案例','通知公告'];
  return arr[category-1];
}
// 显示时间
const editTimeShow = (editTime)=>{
  return format(editTime,'yyyy/MM/dd');
}

// 点击发布按钮
const handlePublish = async(item)=>{
  const data = {_id: item._id,isPublish: item.isPublish};
  await axios.patch('/adminapi/news/publish',data);
  // 更新之后重新获取列表数据更新table
  getNewsList();
}

// 显示新闻详情
const previewNews = ref(false);
const news = ref({});
// 预览新闻
const handlePreview = (item)=>{
  previewNews.value = true;
  news.value = item;
}

// 删除新闻
const handleDelete = (id)=>{
  ElMessageBox.confirm(
    '确定要删除吗？',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async()=>{
    await axios.delete(`/adminapi/news/delete/${id}`);
    await getNewsList();
  }).catch(() => {
      // 取消删除不给任何提示
    })
}

// 编辑新闻
const handleEdit = (id)=>{
  console.log(id);
  router.push(`/news-manage/newsedit/${id}`);
}



</script>

<style scoped>
.el-card{
  margin-top: 50px;
}

</style>