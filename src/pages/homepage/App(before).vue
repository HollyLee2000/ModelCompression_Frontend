<template>
    <el-container>
      <div class="aside">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
          <el-menu background-color="#545c64" text-color="#ffffff" position="left" class="el-menu-vertical-demo"
                   active-text-color="#ffd04b" :ellipsis="false" router="router"
                   :collapse="isCollapse" :collapse-transition="true" style="margin:0; padding:0; overflow: scroll;">
            <el-sub-menu index="1" style="margin:0; padding:0">
              <template v-slot:title><el-icon><Search /></el-icon><span>基于归因</span></template>
              <el-sub-menu index="1-1" style="margin:0; padding:0">
                <template v-slot:title><span>分类任务(全局归因)</span></template>
                <el-menu-item index="cifar">CIFAR</el-menu-item>
                <el-menu-item index="imagenet">ImageNet</el-menu-item>
  <!--              <el-menu-item index="1-1-3" @click="users()">用户任务</el-menu-item>-->
              </el-sub-menu>
              <el-sub-menu index="1-2" style="margin:0; padding:0">
                <template v-slot:title><span>语义分割任务(局部扰动)</span></template>
                <el-menu-item index="coco">COCO</el-menu-item>
                <el-menu-item index="voc">VOC</el-menu-item>
              </el-sub-menu>
            </el-sub-menu>

            <el-sub-menu index="2" style="margin:0; padding:0">
              <template v-slot:title><el-icon><Star /></el-icon><span>基于概念</span></template>
              <el-sub-menu index="2-1" style="margin:0; padding:0">
                <template v-slot:title><span>概念分数</span></template>
                <el-menu-item index="tcav">ImageNet</el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="2-2" style="margin:0; padding:0">
                <template v-slot:title><span>原型决策树</span></template>
                <el-menu-item index="cub">CUB</el-menu-item>
                <el-menu-item index="cars">CARS</el-menu-item>
              </el-sub-menu>
            </el-sub-menu>

            <el-sub-menu index="3" style="margin:0; padding:0">
              <template v-slot:title><el-icon><Aim /></el-icon><span>用户任务</span></template>
              <el-sub-menu index="3-1" style="margin:0; padding:0">
                <template v-slot:title><span>图像任务</span></template>
                <el-menu-item index="userImgclassification">图像分类归因</el-menu-item>
                <el-menu-item index="userImgsegmentation">图像分割归因</el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="3-2" style="margin:0; padding:0">
                <template v-slot:title><span>跨模态任务</span></template>
                <el-menu-item index="UserQuery">视觉问答归因</el-menu-item>
              </el-sub-menu>
            </el-sub-menu>
          </el-menu>
      </div>
      <el-main style="margin:0; padding:0; display: flex; flex-direction: column; justify-content: center; align-items: center;">

<!--        <div class="banner-title">-->
<!--          <h1 class="banner-title-text">小样本学习技术算法平台</h1>-->
<!--          <div class="alink-grounp-center">-->
<!--            <el-button type="primary"-->
<!--                       style="margin-left: 0px; width: 128px; height: 45px; letter-spacing: 1px; font-size: 18px; font-weight: 500;"-->
<!--                       @click="handleClickJump('task')">立即体验</el-button>-->
<!--            <a href=""-->
<!--               target="_blank">-->
<!--              <el-button type="info"-->
<!--                         style="margin-left: 20px; width: 128px; height: 45px; letter-spacing: 1px; font-size: 18px; font-weight: 500;">使用文档</el-button>-->
<!--            </a>-->
<!--          </div>-->
<!--        </div>-->


        <p class="homepageName" style="text-align: center; margin-top: -15%">视觉可解释平台<br>ZJU VIPA</p>
<!--        <span class="demonstration">Switch when indicator is hovered (default)</span>-->
        <div class="demonstration">
          <p>
            {{currentItem}}
          </p>
        </div>
        <el-carousel @change="handleCarouselChange" :interval="4000" arrow="always" type="card" style="height: 200px; width: 900px; ">
          <el-carousel-item v-for="item in 6" :key="item">
            <h3 text="2xl" justify="center">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </el-main>

    </el-container>
</template>

<script lang="ts" setup>
import { ref} from 'vue'
import { ElMessage } from 'element-plus'
import request from "@/api/index";
import store from '@/store'
import {router} from "@/router";
//首先是导入图标们，要用哪个就导入哪个
//例如Search就是那个放大镜的图标
import {Search,Edit,Check,Message,Star,Delete,Aim} from "@element-plus/icons";
import { watch } from 'vue';

// const currentItem = ref(0);


const chosenDataset = ref('')
const chosenAlgorithm = ref('')
const chosenEnhanceAlgorithm = ref('')
const chosenStitchingAlgorithm = ref('')
const admin = ref(false)
const datasets = ref()
const algorithms = ref()
const isCollapse = ref(true)
const currentItem = ref(1)
// const test = ref(true)
// watch(currentItem, (newVal) => {
//   console.log(`currentItem changed to ${newVal}`);
// });

function handleCarouselChange(index) {
  currentItem.value = index + 1;
}

function init(){
  const access = localStorage.getItem('access')
  console.log('localStorage-access', access)
  if(access!==null){
    store.commit('setAccess', access)
    admin.value=(access==='0')
  }
  console.log(admin.value)
  request.post('dataset/getPublicDatasets', {})
      .then((response)=>{
        console.log("datasets:", response)
        datasets.value=response.data.data
      })
      .catch((errors)=>{
        console.error(errors)
      });
  request.post('algorithm/searchAlgorithm', {})
      .then((response)=>{
        algorithms.value=response.data.data.algorithmInfos
        // console.log(algorithms)
      })
      .catch((errors)=>{
        console.error(errors)
      });
}
function toggleCollapse () {
  isCollapse.value = isCollapse.value != true;
}

// function cifar(){
//   alert("等待实现.....\n需要模型: 普通卷积网络\n需要方法: Integrated Gradients (w/ and w/o noise tunnel), Saliency and DeepLift")
// }
// function imagenet(){
//   alert("等待实现.....\n需要模型: resnet18 \n需要方法: Integrated Gradients (w/ and w/o noise tunnel), GradientShap and Occlusion.")
// }
function VOC(){
  alert("等待实现.....\n需要模型: resnet18\n需要方法: Feature Ablation and LIME.")
}
function coco(){
  alert("等待实现.....\n需要模型: fcn_resnet101\n需要方法: LayerGradCAM and Feature Ablation.")
}
function imagenet_TCAV(){
  alert("等待实现.....\n需要模型: GoogleNet \n需要方法: TCAV.")
}
function cub(){
  alert("等待实现.....\n需要模型: 5棵cub上训练的原型决策树\n需要方法: 原型决策树.")
}
function cars(){
  alert("等待实现.....\n需要模型: 5棵cars上训练的原型决策树\n需要方法: 原型决策树.")
}
function users(){
  alert("等待实现用户自定义数据集.....")
}

init();

function uploadDataset() {
  router.push('datasetPreview')
}
async function startRecognize() {
  console.log("start Recognize")
  const randomCode = Math.random().toString(36).slice(-6)
  const recordName = chosenAlgorithm.value + '-' + chosenDataset.value + '-' + store.state.username + '-' + randomCode

  if(!chosenDataset.value){
    ElMessage.error('请选择要使用的数据集')
    return
  }
  if(!chosenAlgorithm.value){
    ElMessage.error('请选择要使用的算法')
    return
  }
  let recordDatasetId = -1
  console.log('datasets.value', datasets.value)
  for (let data of datasets.value) {
    if(data.datasetInfo.datasetName === chosenDataset.value){
      recordDatasetId = data.datasetInfo.datasetId
    }
  }
  store.commit('modifyShowHistoryDatasetId', recordDatasetId)
  console.log("recordDatasetId", recordDatasetId)
  await request.post('/algorithm/callAlgorithm',{
    algorithmName:chosenAlgorithm.value,
    datasetId:recordDatasetId,
    datasetName: chosenDataset.value,
    modelName: recordName,
    userName: store.state.username,
  })
      .then((response)=>{
        console.log(response)
      })
      .catch((error)=>{
        console.error(error)
      })
  await request.post('/model/add',{
    algorithm: chosenAlgorithm.value,
    datasetId: recordDatasetId,
    modelName: recordName,
    username: store.state.username
  })
      .then((response)=>{
        console.log("/model/add", response)
        store.commit('modifyShowHistoryRecordName', recordName)
        router.push('twodresult')
      })
      .catch((error)=>{
        console.error(error)
      })
}
</script>

<style scoped>
.banner-title {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 45px;
}
.banner-title-text {
  margin: 0;
  font-size: 42px;
  letter-spacing: 3px;
  line-height: 1.5;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  color: #c6c2d3;
}
.alink-grounp-center {
  text-align: center;
}
.demonstration {
  color: var(--el-text-color-secondary);
}
/*.demonstration {*/
/*  color: var(--el-text-color-secondary);*/
/*}*/
.carousel-label {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}
.aside{
  /*min-height: 100vh;*/
  display: flex;
  flex-direction: column;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 240px;
  min-height: 400px;
}
.el-menu {
  flex: 1;
  padding: 0;
  margin: 0;
  padding-inline: 40px;
//border: 0;
  text-align: left;
  /*border: 5px solid #000000;*/
}
.el-sub-menu {
  padding: 0;
  margin: 0;
//border: 0;
  text-align: left;
  /*border: 5px solid #000000;*/
}
.el-menu-item{
}
.el-main {
  padding: 0;
  margin: 0;
}
.el-container {
  position: relative;
  /*background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3)), url("http://10.214.242.155:7668/img/background/background_purple.jpg") no-repeat 0% 20%/ cover;*/
  /*background-size: cover;*/
  /*opacity: 0.6;*/
  height: 100%;
  padding: 0;
}
.homepageName {
  margin: 0;
  text-align:center;
  font-size: 40pt;
  font-family: "黑体";
  color: ghostwhite;
  padding: 110pt;
}
.detect {
  text-align: center;
}
.el-select {
  margin: 40pt;
}
.el-button {
  margin: 40pt;
}
.toggle-button{
  /*添加背景颜色*/
  background-color: #706D6D;
  /*设置文本大小*/
  font-size:10px;
  /*设置文本行高*/
  line-height:24px;
  /*设置文本颜色*/
  color:#fff;
  /*设置文本居中*/
  text-align: center;
  /*设置文本间距*/
  letter-spacing: 0.2em;
  /*设置鼠标悬浮变小手效果*/
  cursor:pointer;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

</style>
