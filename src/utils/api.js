import axios from 'axios'
import {ElMessage} from 'element-plus'
/* eslint-disable */
import {router} from "@/router";

//相应拦截器
axios.interceptors.response.use(success => {
    if (success.status && success.status == 200) {
        //调用后端接口成功
        if (success.data.code == 401 || success.data.code == 403 || success.data.code == 404) {
            //业务错误
            ElMessage.error({message: success.data.message});
            return;
        }
        if (success.data.message) {
            ElMessage({
                message: success.data.message,
                type: 'success',
            })
        }
    }
    return success.data;
}, error => {
    ElMessage.error({message: '服务器未响应'});
    return;
});

//传送json格式的post请求
export const postRequest=(url,params)=>{
    return axios({
        method:'post',
        url:'${url}',
        data:params
    })
}
