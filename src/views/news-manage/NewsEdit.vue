<template>
  <el-empty description="开发中，敬请期待......" />
</template>

<!-- <template>
    <el-page-header :icon="back" title="新闻管理" @back="handleBack()">
      <template #content>
        <span class="text-large font-600 mr-3"> 编辑新闻 </span>
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
            <el-form-item label="标题" prop="title">
              <el-input v-model="ruleForm.title" type="text"/>
            </el-form-item>
            <el-form-item label="内容" prop="content">
              <MyEditor @sendValueHtml="reveiceEditorValue"/>
            </el-form-item>
            <el-form-item label="类别" prop="category">
              <el-select v-model="ruleForm.category" placeholder="请选择类别">
                <el-option label="最新动态" value="1" />
                <el-option label="典型案例" value="2" />
                <el-option label="通知公告" value="3" />
              </el-select>
            </el-form-item>
            <el-form-item label="封面图片" prop="cover">
              <el-upload
                :on-change="handleChange"
                :auto-upload="false"
                class="avatar-uploader"
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="ruleForm.cover" :src="uploadCover" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="btn" @click="submitForm">更新新闻</el-button>
            </el-form-item>
          </el-form>
  </template>
  
  <script setup>
  import { Plus } from '@element-plus/icons-vue'
  import axios from 'axios';
  import {ref,reactive, computed, onMounted} from 'vue';
  import MyEditor from '../../components/MyEditor.vue';
  import router from '@/router';
  import { useRoute } from 'vue-router';
  const route = useRoute();
  onMounted(async()=>{
    // console.log(route.params.id);
    const res = await axios.get(`/adminapi/news/getOneNews/${route.params.id}`);
    Object.assign(ruleForm,res.data.data);
    // const {title,content,category,cover,file} = res.data.data;
    // ruleForm.title = title;
    // ruleForm.content = content;
    // ruleForm.category = category;
    // ruleForm.cover = cover;
    // ruleForm.file = file;
  })
  
  const ruleFormRef = ref();
  // 表单数据
  const ruleForm = reactive({
    title: "",
    content: "",
    category: "",
    cover: "",
    file: null,
    isPublish: false  // 是否发布，false表示未发布
  })
  
  // 表单校验
  const rules = reactive({
    title: [{required: true, message: '请输入标题', trigger: 'blur'}],
    content: [{required: true, message: '请输入内容', trigger: 'blur'}],
    category: [{required: true, message: '请选择类别', trigger: 'blur'}],
    cover: [{required: true, message: '请输上传图片', trigger: 'blur'}],
  })
  
  // 展示头像
  const uploadCover = computed(()=>{
    return ruleForm.cover;
  })
  // 上传头像后的回调函数
  const handleChange = (file)=>{
    // console.log(file);
    ruleForm.cover = URL.createObjectURL(file.raw);
    ruleForm.file = file.raw;
  }
  
  // 接收子组件MyEditor传过来的数据
  const reveiceEditorValue = (msg)=>{
    // console.log(msg.value);
    ruleForm.content = msg.value;
  }
  
  // 点击添加新闻按钮
  const submitForm = ()=>{
    ruleFormRef.value.validate(async valid=>{
      if(valid){
        // 如果验证通过
        var formData = new FormData();
        for(let i in ruleForm){
          formData.append(i,ruleForm[i]);
        }
        await axios.post('/adminapi/news/add',formData);
        router.push('/news-manage/newslist');
      }
    })
  }

  const handleBack = ()=>{
    router.back();
  }
  
  </script>
  
  <style scoped>
  .el-form{
    margin-top: 50px;
  }
  
  .avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  
  .btn{
    margin-left: 80px;
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
  </style> -->