<template>
  <el-page-header :icon="null" title="企业门户网站管理系统">
    <template #content>
      <span class="text-large font-600 mr-3"> 首页 </span>
    </template>
  </el-page-header>
  <el-card style="max-width: 100%">
    <el-row>
      <el-col :span="4"><el-avatar :size="100" :src="avatarUrl" /></el-col>
      <el-col :span="20"><h3 style="line-height: 100px;">欢迎 {{ store.state.userInfo.username }} 回来，{{ tips }}</h3></el-col>
    </el-row>
  </el-card>
  <el-card style="max-width: 100%">
    <template #header>
      <div class="card-header">
        <span>公司产品</span>
      </div>
    </template>
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in 6" :key="item">
        <h3 text="2xl" justify="center">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </el-card>
  
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';
const store = useStore();
// console.log(store.state);

// 欢迎信息的温馨提示
const tips = computed(()=>{
  return new Date().getHours() < 12 ? "早上好，开启元气满满的一天！" : "累了吧，喝杯咖啡提提神吧！"
})

// 展示头像
const avatarUrl = computed(()=>{
  return store.state.userInfo.avatar?'http://localhost:3333'+store.state.userInfo.avatar:'https://cube.element.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
})

</script>

<style scoped>
.el-card{
  margin-top: 50px;
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style> 