import axios from 'axios'
import {ElMessage} from "element-plus";
import store from "@/store";
import Cookies from "js-cookie";
import {router} from "@/router";
// axios.defaults.withCredentials = true

const request = axios.create({
    baseURL:'/api',
    // baseURL:'http://pruning.vipazoo.cn/api',
    timeout:2000000,
    headers:{'Content-Type':'application/json;charset=utf-8'}
})

request.interceptors.response.use( response => {
    if(response.data.msg === '用户未登录'){
        ElMessage.error("Interceptors response error: You are not logged in or your login has expired.")
        store.commit("loginOut")
        // Cookies.remove("userTicket")
        localStorage.removeItem("userTicket")
        location.reload()
        router.push('/homepage')
    }
    return response
}, error => {
    // 监听所有后端的error，并将报错信息展示在页面前端
    ElMessage.error(error.response.data);

    // 获取错误状态码，token失效
    const { status } = error.response
    if (status === 401) {
        ElMessage.error('Interceptors response error.')

        // 清除token
        store.commit("loginOut")
        // Cookies.remove("userTicket")
        localStorage.removeItem("userTicket")
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
        console.log("store.state.userTicket: ", store.state.userTicket)
        console.log("store.state.access: ", store.state.access)
        if (store.state.userTicket) {
            config.headers.userTicket = store.state.userTicket;

        }
        if (store.state.access==0||store.state.access==1) {
            config.headers.access = store.state.access;

        }
        return config;
    },
    error => {
        return Promise.reject(error);
    });

export default request