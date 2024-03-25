<template>
  <div class="main-box">
    <el-container>
      <el-aside class="el-aside" :width="`${collapse}?64px:200px`">
        <el-scrollbar>
          <el-menu 
          class="el-menu"
          :router="true"
          :collapse="collapse"
          :default-active="route.fullPath"
          >
            <el-menu-item index="/index">
              <el-icon><home-filled /></el-icon>
              <span>首页</span>
            </el-menu-item>
            <el-menu-item index="/center">
              <el-icon><Avatar /></el-icon>
              <span>个人中心</span>
            </el-menu-item>
            <el-sub-menu index="/user-manage">
              <template #title>
                <el-icon><UserFilled /></el-icon>
                <span>用户管理</span>
              </template>
              <el-menu-item index="/user-manage/useradd">添加用户</el-menu-item>
              <el-menu-item index="/user-manage/userlist">用户列表</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="/news-manage">
              <template #title>
                <el-icon><MessageBox /></el-icon>
                <span>新闻管理</span>
              </template>
              <el-menu-item index="/news-manage/newsadd">添加新闻</el-menu-item>
              <el-menu-item index="/news-manage/newslist">新闻列表</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="/product-manage">
              <template #title>
                <el-icon><Reading /></el-icon>
                <span>产品管理</span>
              </template>
              <el-menu-item index="/product-manage/productadd">添加产品</el-menu-item>
              <el-menu-item index="/product-manage/productlist">产品列表</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-container>
        <el-header>
          <div class="el-header-text">
            <el-icon @click="isCollapse" :size="size" :color="color"><Menu /></el-icon>
            <h3 class="el-header-text-title">Lipn门户网站管理系统</h3>
          </div>
          <div class="el-header-text">
            <span>欢迎 {{ store.state.userInfo.username }} 回来</span>
            <el-dropdown>
              <span class="el-dropdown-link">
                <el-icon color="white" size="30"><User /></el-icon>
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="handleCenter">个人中心</el-dropdown-item>
                  <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { HomeFilled,Avatar,UserFilled,MessageBox,Reading,Menu,User } from '@element-plus/icons-vue';
import {ref} from 'vue'
import { useRoute,useRouter } from 'vue-router';
import { useStore } from 'vuex';
const store = useStore();
const route = useRoute();  // route是当前匹配到的路由对象
const router = useRouter();  // router是整个路由器对象


// 设置是否折叠
let collapse = ref(false);
const isCollapse = ()=>{
  collapse.value = !collapse.value;
}

// 点击个人中心
const handleCenter = ()=>{
  router.push('/center');
}
// 点击退出登录
const handleLogout = ()=>{
  localStorage.removeItem('token');
  store.commit('clearUserInfo');
  router.push('/login');
}

</script>

<style lang="scss" scoped>
.el-main{
  overflow: auto;
  height: calc(100vh - 60px);
}

.el-aside{
  height: 100vh;
  .el-menu{
    height: 100vh;
  }
}
.el-header{
  display: flex;
  justify-content: space-between;
  background-color: #2c3a4a;
  color: white;
  .el-header-text{
    display: flex;
    align-items: center;
    .el-header-text-title,.el-dropdown{
      margin-left: 10px;
    }
  }
}

</style>