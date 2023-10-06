import {createRouter,createWebHashHistory }from 'vue-router'
import homepage from '@/pages/homepage/App.vue'
import history from '@/pages/history/App.vue'
import docDescription from '@/pages/doc/docDescription.vue'
import damModel from '@/pages/dam3d/damModel.vue'
import login from "@/pages/loginIn/login.vue";
import cifar from "@/pages/Cifar/cifar.vue";
import cifarsebow from "@/pages/CifarSeboW/cifarsebow.vue";
import voc from "@/pages/VOC/voc.vue"
import coco from "@/pages/COCO/coco.vue"
import cub from "@/pages/cub/cub.vue"
import cars from "@/pages/cars/cars.vue"
import UserQuery from "@/pages/UserQuery/UserQuery.vue"
import imagenet from "@/pages/ImageNet/imagenet.vue";
import datasetPreview from "@/pages/datasetPreview/index.vue";
import datasetInDetail from "@/pages/datasetInDetail/index.vue";
import user from '@/pages/user/AdminInfo.vue'
import Algorithm from '@/pages/algorithmIntro/Algorithm.vue'

import Admin from '@/pages/admin/index.vue'
import ManageServer from '@/pages/admin/manage_server/index.vue'
import ServerDetail from '@/pages/server_detail/index.vue'

import twodresult from '@/pages/twodresult/ResultDisplay.vue'
import labelPage from '@/pages/imageLabel/labelPage.vue'
import UserImgclassification from "@/pages/UserQuery/UserImgclassification.vue"
import UserImgsegmentation from "@/pages/UserQuery/UserImgsegmentation.vue"
import tcav from "@/pages/TCAV/tcav.vue"
import Cookies from "js-cookie";

import Task from '@/pages/task/index.vue'
import CreateTask from '@/pages/task/create_task/index.vue'
import MyTasks from '@/pages/task/my_tasks/index.vue'

const TaskDetail = () => import('@/pages/task_detail/index.vue')
const BasicTaskInfo = () => import(/* webpackChunkName: "task" */ '@/pages/task_detail/basic_task_info/index.vue')
const VisScalars = () => import(/* webpackChunkName: "task" */ '@/pages/task_detail/vis_scalars/index.vue')
const VisImages = () => import(/* webpackChunkName: "task" */ '@/pages/task_detail/vis_images/index.vue')
const VisStages = () => import(/* webpackChunkName: "task" */ '@/pages/task_detail/vis_stages/index.vue')
const TrainingLog = () => import(/* webpackChunkName: "task" */ '@/pages/task_detail/training_log/index.vue')

const routes = [
    {
        path: '/',
        redirect: 'homepage'
    },
    {
        path: '/homepage',
        component: homepage
    },
    {
        path: '/history',
        component: history
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
        redirect: { name: 'ManageServer' },
        meta: {
            title: '平台管理',
            roles: ['staff']
        },
        children: [
            { path: 'manage_server', name: 'ManageServer', component: ManageServer, meta: { title: '算力机管理' } },
        ]
    },
    {
        path: '/server_detail/:server_id',
        name: 'Server Detail',
        component: ServerDetail,
        show: false,
        meta: {
            title: '算力机详情'
        }
    },
    {
        path: '/document',
        component: docDescription
    },
    {
        path: '/dam3d',
        component: damModel
    },
    {
        path: '/signin',
        name:'/signin',
        component: login
    },
    {
        path:'/datasetPreview',
        name:'datasetPreview',
        component:datasetPreview
    },
    {
        path:'/datasetInDetail',
        name:'datasetInDetail',
        component:datasetInDetail
    },
    {
        path: '/user',
        name:'AdminInfo',
        component: user
    },
    {
        path:'/twodresult',
        component: twodresult
    },
    {
        path:'/labelPage',
        component: labelPage
    },
    {
        path: '/cifar',
        name:'cifar',
        component: cifar,
        meta:{
            noCache: true,
        }
    },
    {
        path: '/cifarsebow',
        name:'cifarsebow',
        component: cifarsebow,
        meta:{
            noCache: true,
        }
    },
    {
        path: '/imagenet',
        name:'imagenet',
        component: imagenet,
    },
    {
        path: '/voc',
        name:'voc',
        component: voc,
    },
    {
        path: '/coco',
        name:'coco',
        component: coco,
    },
    {
        path: '/UserQuery',
        name:'UserQuery',
        component: UserQuery,
    },
    {
        path: '/UserImgclassification',
        name:'UserImgclassification',
        component: UserImgclassification,
    },
    {
        path: '/UserImgsegmentation',
        name:'UserImgsegmentation',
        component: UserImgsegmentation,
    },
    {
        path: '/tcav',
        name:'tcav',
        component: tcav,
    },
    {
        path: '/cub',
        name:'cub',
        component: cub,
    },
    {
        path: '/cars',
        name:'cars',
        component: cars,
    },
    {
        path: '/Algorithm',
        name:'Algorithm',
        component: Algorithm,
    },
    {
        path: '/task',
        name: 'Task',
        component: Task,
        redirect: {name: 'Create Task'},
        meta: {
            title: '可解释任务'
        },
        children: [
            {
                path: 'create_task',
                name: 'Create Task',
                component: CreateTask,
                meta: {title: '新建任务'}
            },
            {
                path: 'my_tasks',
                name: 'My Tasks',
                component: MyTasks,
                meta: {title: '我的任务'}
            }
        ]
    },
    {
        path: '/task_detail/:task_id',
        name: 'Task Detail',
        component: TaskDetail,
        redirect: {name: 'Basic Task Info'},
        show: false,
        meta: {
            title: '任务详情'
        },
        children: [
            {path: 'basic_task_info', name: 'Basic Task Info', component: BasicTaskInfo, meta: {title: '任务信息'}},
            {path: 'training_log', name: 'Training Log', component: TrainingLog, meta: {title: '日志'}},
            {path: 'vis_scalars', name: 'Vis Scalars', component: VisScalars, meta: {title: '曲线图'}},
            {path: 'vis_images', name: 'Vis Images', component: VisImages, meta: {title: '预览'}},
            {path: 'vis_stages', name: 'Vis Stages', component: VisStages, meta: {title: '训练流程'}}
        ]
    },
]
const router1 = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router1.beforeEach(
    (to, from, next) => {
        if (to.path === '/signin') {
            next();
        } else {
            const token = Cookies.get('userTicket')
            console.log("-> token", token);
            if (token === undefined || token === '' || token === null) {
                next('/signin');
            } else {
                next();
            }
        }
    });
export const router = router1;


// 写个注释