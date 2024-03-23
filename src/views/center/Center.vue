<template>
  <el-page-header :icon="null" title="企业门户网站管理系统">
    <template #content>
      <span class="text-large font-600 mr-3"> 个人中心 </span>
    </template>
  </el-page-header>
  <el-row :gutter="20">
    <el-col :span="5">
      <el-card style="max-width: 100%; text-align: center;">
        <el-avatar :size="100" :src="avatarUrl" />
        <h3>{{ store.state.userInfo.username }}</h3>
        <h5>{{ store.state.userInfo.role === 1 ? '管理员' : '编辑'}}</h5>
      </el-card>
    </el-col>
    <el-col :span="19">
      <el-card style="max-width: 100%">
        <template #header>
          <div class="card-header">
            <span>个人信息</span>
          </div>
        </template>
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
          <el-form-item label="性别" prop="gender">
            <el-select v-model="ruleForm.gender" placeholder="Activity zone">
              <el-option label="保密" value="0" />
              <el-option label="男" value="1" />
              <el-option label="女" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="个人简介" prop="introduction">
            <el-input v-model="ruleForm.introduction" type="textarea"/>
          </el-form-item>
          <el-form-item label="头像" prop="avatar">
            <el-upload
              auto-upload="false"
              class="avatar-uploader"
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
  
</template>

<script setup>
import { Plus } from '@element-plus/icons-vue'
import { computed,ref,reactive } from 'vue';
import { useStore } from 'vuex';
const store = useStore();

// 展示头像
const avatarUrl = computed(()=>{
  return store.state.userInfo.avatar?store.state.userInfo.avatar:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
})

// 表单数据
var {username,gender,introduction,avatar} = store.state.userInfo;
gender = gender === 0 ? '保密' : gender === 1 ? '男' : '女';
const ruleFormRef = ref();
const ruleForm = reactive({
  username,
  gender,
  introduction,
  avatar
})

// 表单校验
const rules = reactive({
  username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
  gender: [{required: true, message: '请选择性别', trigger: 'blur'}],
  introduction: [{required: true, message: '请输入个人简介', trigger: 'blur'}],
  avatar: [{required: true, message: '请上传头像', trigger: 'blur'}]
})

</script>

<style scoped>
.el-card{
  margin-top: 50px;
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