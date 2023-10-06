import axios from 'axios'
// import store from '@/store'

const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API
  baseURL: "http://10.214.242.155:8088"
})

// service.interceptors.request.use(
//   config => {
//     // do something before request is sent
//     if (store.getters.token) {
//       config.headers['Authorization'] = 'JWT ' + store.getters.token
//     }
//     return config
//   },
//   error => {
//     // do something with request error
//     console.log(error) // for debug
//     return Promise.reject(error)
//   }
// )
//
// service.interceptors.response.use(undefined, function (error) {
//   // if error response status is 401, it means the request was invalid due to expired access token
//   if (error.config && error.response && error.response.status === 401) {
//     console.log('interceptors.response')
//     console.log(error.config)
//     store.commit('removeAuth')
//     store.commit('setIsDialogOpen', true)
//     store.commit('setDialogContent', '登录过期，请重新登录')
//   }
//   return Promise.reject(error)
// })

export default service
