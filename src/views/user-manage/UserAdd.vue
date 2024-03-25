<template>
  <el-page-header :icon="null" title="用户管理">
    <template #content>
      <span class="text-large font-600 mr-3"> 添加用户 </span>
    </template>
  </el-page-header>
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
          <el-form-item label="头像" prop="avatar">
            <el-upload
              :on-change="handleChange"
              :auto-upload="false"
              class="avatar-uploader"
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="ruleForm.avatar" :src="uploadAvatar" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="btn" @click="submitForm">添加用户</el-button>
          </el-form-item>
        </el-form>
</template>

<script setup>
import router from '@/router';
import { Plus } from '@element-plus/icons-vue'
import axios from 'axios';
import {ref,reactive, computed} from 'vue';
const ruleFormRef = ref();
// 表单数据
const ruleForm = reactive({
  username: "",
  password: "",
  role: "",
  introduction: "",
  avatar: "",
  file: null,
  gender: 0
})

// 表单校验
const rules = reactive({
  username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
  password: [{required: true, message: '请输入密码', trigger: 'blur'}],
  role: [{required: true, message: '请选择角色', trigger: 'blur'}],
  introduction: [{required: true, message: '请输入个人简介', trigger: 'blur'}],
  avatar: [{required: true, message: '请上传头像', trigger: 'blur'}]
})

// 点击添加用户
const submitForm = ()=>{
  ruleFormRef.value.validate(valid=>{
    if(valid){
      // 如果验证通过
      var formData = new FormData();
      for(let i in ruleForm){
        formData.append(i,ruleForm[i]);
      }
      // axios提交到后台
      axios.post('/adminapi/user/add',formData,{
        headers: {"Content-Type": "multipart/form-data"}
      }).then(res=>{
        // 添加成功后跳转到用户列表页面
        router.push('/user-manage/userlist');
      })
    }
  })
}

// 展示头像
const uploadAvatar = computed(()=>{
  return ruleForm.avatar;
})
// 上传头像后的回调函数
const handleChange = (file)=>{
  // console.log(file);
  ruleForm.avatar = URL.createObjectURL(file.raw);
  ruleForm.file = file.raw;
}

</script>

<style lang="scss" scoped>
.demo-ruleForm{
  margin-top: 50px;
}

.btn{
  margin-left: 80px;
}

.update{
  margin-left: 78px;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>