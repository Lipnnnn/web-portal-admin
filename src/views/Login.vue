<template>
  <div>
    <!-- 配置particles粒子库 -->
    <vue-particles
        id="tsparticles"
        :particlesInit="particlesInit"
        :particlesLoaded="particlesLoaded"
        :options="options"
    />
    <!-- 表单 -->
    <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="auto"
      class="user-form"
    >
      <h2 class="title">Lipn门户后台管理系统</h2>
      <el-form-item label="账号" prop="username" size="large">
        <el-input v-model="ruleForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password" size="large">
        <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button size="large" class="btn" type="primary" @click="submitForm()">登录</el-button>
      </el-form-item>
    </el-form>
    </div>
</template>

<script setup>
import { loadSlim } from "tsparticles-slim";
import { reactive,ref } from "vue";
import {useRouter} from 'vue-router'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useStore } from "vuex";

// 定义store对象
const store = useStore();

// 定义router对象
const router = useRouter();
// 配置particles粒子库
const options = {
  background: {
      color: {
          value: '#2d3a4b'
      }
  },
  fpsLimit: 2200,
  interactivity: {
      events: {
          onClick: {
              enable: true,
              mode: 'push'
          },
          onHover: {
              enable: true,
              mode: 'repulse'
          },
          resize: true
      },
      modes: {
          bubble: {
              distance: 400,
              duration: 2,
              opacity: 0.8,
              size: 40
          },
          push: {
              quantity: 4
          },
          repulse: {
              distance: 200,
              duration: 0.4
          }
      }
  },
  particles: {
      color: {
          value: '#ffffff'
      },
      links: {
          color: '#ffffff',
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1
      },
      collisions: {
          enable: true
      },
      move: {
          direction: 'none',
          enable: true,
          outModes: {
              default: 'bounce'
          },
          random: false,
          speed: 6,
          straight: false
      },
      number: {
          density: {
              enable: true,
              area: 800
          },
          value: 80
      },
      opacity: {
          value: 0.5
      },
      shape: {
          type: 'circle'
      },
      size: {
          value: { min: 1, max: 5 },
      }
  },
  detectRetina: true
}
const particlesInit = async engine => {
    await loadSlim(engine);
};

// 表单
const ruleFormRef = ref();  // 表单的引用对象
const ruleForm = reactive({
  username: '',
  password: ''
});
const rules = reactive({
  username: [{required: true, message: '用户名不能为空'}],
  password: [{required: true, message: '密码不能为空'}]
})

// 点击登录
const submitForm = ()=>{
  // 1. 校验表单
  ruleFormRef.value.validate(valid=>{
    if(valid){
      // 如果校验成功
      // 2. 提交到后台
      axios.post('/adminapi/user/login',ruleForm).then(res=>{
        if(res.data.code === '0'){
          // 登录成功
          // 3. 设置token（已经在util/axios.config.js文件中进行了统一配置axios拦截器，每次请求都会自动带上token信息）
          // 就不需要在这里手动设置token了
          // localStorage.setItem('token','lipn');
          // 4. 跳转页面
          // 存储用户信息
          store.commit('changeUserInfo',res.data.userInfo);
          router.push('/index');
        }else{
          // 登录失败
          ElMessage({
            showClose: true,
            message: '用户名密码错误',
            type: 'error',
          })
        }
      })
    }
  })
}

</script>

<style lang="scss" scoped>
.user-form{
  width: 600px;
  height: 300px;
  background-color: rgba(0,0,0,.3);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  padding: 30px;
  .title{
    color: white;
    text-align: center;
    margin-bottom: 20px;
  }
  /* 选择label */
  ::v-deep .el-form-item__label{
    color: white;
    font-size: 18px;
  }
  .btn{
    margin: 10px auto;
    width: 200px;
    font-size: 18px;
  }
}

</style>