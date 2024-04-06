import { createRouter, createWebHashHistory } from 'vue-router'
import RoutesConfig from './config.js'
import store from '@/store/index.js'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: ()=>import('@/views/Login')
  },
  {
    path: '/mainbox',
    name: 'mainbox',
    component: () => import('@/views/MainBox.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 动态加载路由：一个一个加载
// router.addRoute("mainbox",{
//   path: '/home',
//   component: ()=>import('@/views/home/Home.vue')
// })
// router.addRoute("mainbox",{
//   path: '/center',
//   component: ()=>import('@/views/center/Center.vue')
// })



// 设置路由拦截，必须登录之后才能进入首页
router.beforeEach((to,from,next)=>{
  if(to.name === 'login'){
    // 如果是要去login页面，就放行
    next();
  }else{
    // 判断是否有token
    if(!localStorage.getItem('token')){
      // 如果没有，就进入login页面
      next({name: 'login'});
    }else{
      // 如果有token，就放行，并且动态加载路由
      if(!store.state.isGetterRoutes){
        store.commit("changeGetterRoutes",true);
        // 动态加载路由：放到一个数组里面，直接遍历加载
        RoutesConfig.forEach(element => {
          // isAdmin()方法判断是不是管理员，是管理员才添加用户管理的路由
          isAdmin(element) && router.addRoute('mainbox',element)
        });
        next({path: to.fullPath});
      }else{
        next();
      }
    }
  }
})

const isAdmin = (element)=>{
  if(element.requireAdmin){
    if(store.state.userInfo.role != 0){
      return false;
    }
  }
  return true;
}


export default router
