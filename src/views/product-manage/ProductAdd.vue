<template>
  <el-page-header :icon="null" title="产品管理">
    <template #content>
      <span class="text-large font-600 mr-3"> 添加产品 </span>
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
        <el-form-item label="产品名称" prop="name">
          <el-input v-model="ruleForm.name" type="text"/>
        </el-form-item>
        <el-form-item label="产品简要描述" prop="introduction">
          <el-input v-model="ruleForm.introduction" type="textarea"/>
        </el-form-item>
        <el-form-item label="产品详细描述" prop="detail">
          <el-input v-model="ruleForm.detail" type="textarea"/>
        </el-form-item>
        <el-form-item label="产品图片" prop="image">
          <input class="product-image" type="file" @change="handleFileChange"/>
          <div class="file-image">
            <img :src="ruleForm.image" v-if="ruleForm.image" style="max-width: 200px;height:100%">
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn" @click="submitForm">添加产品</el-button>
        </el-form-item>
  </el-form>
</template>

<script setup>
import { Plus } from '@element-plus/icons-vue'
import axios from 'axios';
import {ref,reactive, computed} from 'vue';
import { useRoute,useRouter } from 'vue-router';
const router = useRouter();
const route = useRoute();

const ruleFormRef = ref();
// 表单数据
const ruleForm = reactive({
  name: "",
  introduction: "",
  detail: "",
  image: "",
  file: null
})

// 表单校验
const rules = reactive({
  name: [{required: true, message: '请输入产品名称', trigger: 'blur'}],
  introduction: [{required: true, message: '请输入产品简要描述', trigger: 'blur'}],
  detail: [{required: true, message: '请输入产品详细描述', trigger: 'blur'}],
  image: [{required: true, message: '请上传产品图片', trigger: 'blur'}]
})

// 选择产品图片
const handleFileChange = (e)=>{
  ruleForm.file = e.target.files[0];
  ruleForm.image = URL.createObjectURL(ruleForm.file);
}

// 点击添加产品
const submitForm = ()=>{
  ruleFormRef.value.validate(async valid=>{
    if(valid){
      let formData = new FormData();
      for(let item in ruleForm){
        formData.append(item,ruleForm[item]);
      }
      await axios.post('/adminapi/product/add',formData,{
        headers: {"Content-Type": "multipart/form-data"}
      });
      router.push('/product-manage/productlist');
    }
  })
}



</script>

<style scoped>
.el-form{
  margin-top: 50px;
}

.btn{
  margin-left: 105px;
}

.product-image{
  width: 200px;
  height: 200px;
  opacity: 0;
}

.file-image{
  width: 200px;
  height: 200px;
  /* background-color: antiquewhite; */
  transform: translate(-200px,0);
  border: 1px solid #dcdfe6;
  z-index: -1;
  border-radius: 5px;
  position: relative;
}

.avatar-uploader-icon{
  font-size: 30px;
  color: #8c939d;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}

</style>