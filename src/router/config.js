const routes = [
    {
        path:'/index',
        component:() => import ('@/views/home/Home.vue')
    },
    {
        path: '/center',
        component: ()=>import('@/views/center/Center.vue')
    },
    {
        path: '/user-manage/useradd',
        component: ()=>import('@/views/user-manage/UserAdd.vue'),
        requireAdmin: true
    },
    {
        path: '/user-manage/userlist',
        component: ()=>import('@/views/user-manage/UserList.vue'),
        requireAdmin: true
    },
    {
        path: '/news-manage/newsadd',
        component: ()=>import('@/views/news-manage/NewsAdd.vue')
    },
    {
        path: '/news-manage/newslist',
        component: ()=>import('@/views/news-manage/NewsList.vue')
    },
    {
        path: '/product-manage/productadd',
        component: ()=>import('@/views/product-manage/ProductAdd.vue')
    },
    {
        path: '/product-manage/productlist',
        component: ()=>import('@/views/product-manage/ProductList.vue')
    },
    {
        // 加一个重定向
        path: '/',
        redirect: '/index'
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: ()=>import('@/views/notfound/NotFound')
    }

]

export default routes