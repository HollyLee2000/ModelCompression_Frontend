import axios from 'axios'
import {ElMessage} from "element-plus";
import store from "@/store";
import Cookies from "js-cookie";
import {router} from "@/router";
// axios.defaults.withCredentials = true

const request = axios.create({
    baseURL:'/api',
    // baseURL:'http://10.214.242.155:7996',
    timeout:2000000,
    headers:{'Content-Type':'application/json;charset=utf-8'}
})

request.interceptors.response.use( response => {
    if(response.data.msg === '用户未登录，请跳转login页面'){
        ElMessage.error('token失效，请重新登录')
        store.commit("loginOut")
        Cookies.remove("userTicket")
        location.reload()
        router.push('/login')
    }
    return response
}, error => {
    // 监听所有后端的error，并将报错信息展示在页面前端
    ElMessage.error(error.response.data);

    // 获取错误状态码，token失效
    const { status } = error.response
    if (status === 401) {
        ElMessage.error('token失效，请重新登录')

        // 清除token
        store.commit("loginOut")
        Cookies.remove("userTicket")
        location.reload()

        // 重新跳转到login页面
        router.push('/login')
    }

    return Promise.reject(error)
})

// 添加请求拦截器，在请求头中加token
// 实现再重新开一个页面仍然保留原有登陆状态。
request.interceptors.request.use(
    config => {
        if (localStorage.getItem('Authorization')) {
            config.headers.Authorization = localStorage.getItem('Authorization');
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    });

export default request