<template>
  <div class="main-box">
    <el-container>
      <el-aside class="el-aside" :width="`${collapse}?64px:200px`">
        <el-scrollbar>
          <el-menu 
          class="el-menu"
          :router="true"
          :collapse="collapse"
          :default-active="'/index'"
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
          <button @click="isCollapse">click</button>
          Header
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { HomeFilled,Avatar,UserFilled,MessageBox,Reading } from '@element-plus/icons-vue';
import {ref} from 'vue'

// 设置是否折叠
let collapse = ref(false);
const isCollapse = ()=>{
  collapse.value = !collapse.value;
}


</script>

<style lang="scss" scoped>
.el-aside{
  height: 100vh;
  .el-menu{
    height: 100vh;
  }
}

</style>