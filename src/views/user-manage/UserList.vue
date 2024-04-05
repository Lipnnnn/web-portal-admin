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
          <el-tag v-if="scope.row.role === 0" type="danger">管理员</el-tag>
          <el-tag v-else type="success">编辑</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" >
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)" plain>
            编辑
          </el-button>
          <el-dialog v-model="dialogFormVisible" title="编辑" width="500">
            <el-form
              ref="ruleFormRef"
              style="max-width: 100%"
              :model="ruleForm"
              :rules="rules"
              label-width="auto"
              class="demo-ruleForm"
              :size="formSize"
              status-icon
            >
              <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username" type="text"/>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password" type="password"/>
              </el-form-item>
              <el-form-item label="角色" prop="role">
                <el-select v-model="ruleForm.role" placeholder="请选择角色">
                  <el-option label="管理员" value="0" />
                  <el-option label="编辑" value="1" />
                </el-select>
              </el-form-item>
              <el-form-item label="个人简介" prop="introduction">
                <el-input v-model="ruleForm.introduction" type="textarea"/>
              </el-form-item>
            </el-form>
            <template #footer>
              <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="confirmEdit()">
                  确定
                </el-button>
              </div>
            </template>
          </el-dialog>

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
import {ref,onMounted,reactive} from 'vue';

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

// 编辑框信息
const ruleFormRef = ref();
// 表单数据
const ruleForm = reactive({
  username: "",
  password: "",
  role: "",
  introduction: "",
  id: ''   // 这里要存储id，虽然不用展示出来，但是confirmEdit()方法中编辑用户信息的时候需要将id传入后台进行更新用户信息
})
// 表单校验
const rules = reactive({
  username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
  password: [{required: true, message: '请输入密码', trigger: 'blur'}],
  role: [{required: true, message: '请选择角色', trigger: 'blur'}],
  introduction: [{required: true, message: '请输入个人简介', trigger: 'blur'}]
})

// 点击编辑按钮
const dialogFormVisible = ref(false);
const handleEdit = async (index,row)=>{
  // 把数据取出来显示到编辑框中
  ruleForm.id = row._id;
  const res = await axios.get(`/adminapi/user/getUserOne/${row._id}`);
  ruleForm.username = res.data.data.username;
  ruleForm.password = res.data.data.password;
  ruleForm.role = res.data.data.role;
  ruleForm.introduction = res.data.data.introduction;
  dialogFormVisible.value = true;
}
// 点击确认编辑
const confirmEdit = ()=>{
  dialogFormVisible.value = false;
  // 如果校验通过，发送axios请求，修改数据库中的内容
  ruleFormRef.value.validate(valid=>{
    if(valid){
      axios.patch(`/adminapi/user/updateUser/${ruleForm.id}`,ruleForm).then(res=>{
        ElMessage({
          type: 'success',
          message: res.data.message,
        })
        // 重新获取数据，更新页面数据展示
        getTableData();
      })
    }
  })
  
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