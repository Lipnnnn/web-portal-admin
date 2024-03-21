// 配置axios的拦截器，统一存储token信息和访问时自动携带token信息
import axios from "axios";

axios.interceptors.request.use(function(config){
    // 每次发送请求之前，把token带上 
    const token = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
},function(error){
    return Promise.reject(error);
});

axios.interceptors.response.use(function(response){
    // 存储后台返回的token
    const {authorization} = response.headers;
    authorization && localStorage.setItem('token',authorization)
    return response;
},function(error){
    const {status} = error.response;
    if(status === 401){
        window.location.href = '#/login'
    }
    return Promise.reject(error);
})