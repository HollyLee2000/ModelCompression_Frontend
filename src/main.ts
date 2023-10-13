import { createApp } from 'vue'
import App from './App.vue'
import {router} from "@/router";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import store from './store'
import './assets/css/global.css'
import './assets/css/bootstrap.min.css'
import './assets/css/css2.css'
import './assets/css/materialdesignicons.min.css'
import './assets/css/mystyle.css'
import './assets/css/style.css'
import './assets/css/swiper.min.css'
import './assets/css/tiny-slider.css'
// import 'https://cdn.jsdelivr.Metanet/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css'

import { BootstrapVue3  } from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import './custom.scss'

import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css' //黑色主题，会好看一点
// Vue.directive('highlight',function (el) {
//     let blocks = el.querySelectorAll('pre code');
//     blocks.forEach((block: HTMLElement)=>{
//         hljs.highlightBlock(block)
//     })
// })



import axios from 'axios'

const app = createApp(App)
// 在实例中注册全局指令等
app.directive('highlight', function(el) {
    let blocks = el.querySelectorAll('pre code');
    blocks.forEach((block: HTMLElement) => {
        hljs.highlightBlock(block);
    });
});
// app.use(BootstrapVue)
// app.use(BootstrapVueIcons)
// Install BootstrapVue
app.use(BootstrapVue3 as any)
// Optionally install the BootstrapVue icon components plugin
// app.use(BootstrapVueIcons as any)
// app.use(IconsPlugin as any)
app.use(router)
app.use(ElementPlus)
app.use(store)

app.mount('#app')