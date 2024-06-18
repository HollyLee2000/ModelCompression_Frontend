<template>
  <div class="container">
    <section class="section home" id="home" style="box-shadow: 0 5px 20px rgba(0,0,0,0.5);">
      <div class="container" id="ani-round" >
        <div class="home-content">
          <div class="row align-items-center">
            <div class="col-lg-6">
              <h2 class="title mt-5 mt-lg-0">
                PruningBench
              </h2>
              <p class="f-16 my-4 text-muted benchmark">Comprehensive Benchmark of Structural Pruning</p>
              <button @click="startTutorial" class="btn btn-tutorial" style="margin-right: 10px">Tutorial</button>
              <button @click="startCompression" class="btn btn-primary" style="margin-right: 10px">Get Started</button>
              <button class="btn btn-docs"><a href="https://github.com/HollyLee2000/PruningBench" target="_blank" style="color: white">Docs</a></button>



<!--              <div>-->
<!--                <a id="btn-toggle" href="#" class="sidebar-toggler break-point-sm">-->
<!--                  <i class="ri-menu-line ri-xl"></i>-->
<!--                </a>-->
<!--                <h1 style="margin-bottom: 0">Pro Sidebar</h1>-->
<!--                <span style="display: inline-block">-->
<!--              Responsive layout with advanced sidebar menu built with SCSS and vanilla Javascript-->
<!--            </span>-->
<!--                <br />-->
<!--                <span>-->
<!--              Full Code and documentation available on-->
<!--              <a href="https://github.com/azouaoui-med/pro-sidebar-template" target="_blank"-->
<!--              >Github</a-->
<!--              >-->
<!--            </span>-->
<!--                <div style="margin-top: 10px">-->
<!--                  <a href="https://github.com/azouaoui-med/pro-sidebar-template" target="_blank">-->
<!--                    <img-->
<!--                        alt="GitHub stars"-->
<!--                        src="https://img.shields.io/github/stars/azouaoui-med/pro-sidebar-template?style=social"-->
<!--                    />-->
<!--                  </a>-->
<!--                  <a href="https://github.com/azouaoui-med/pro-sidebar-template" target="_blank">-->
<!--                    <img-->
<!--                        alt="GitHub forks"-->
<!--                        src="https://img.shields.io/github/forks/azouaoui-med/pro-sidebar-template?style=social"-->
<!--                    />-->
<!--                  </a>-->
<!--                </div>-->
<!--              </div>-->



            </div>
          </div>
        </div>
      </div>
    </section>
  </div>




  <div class="container">
    <section class="video-introduce" id="features" style="box-shadow: 0 5px 20px rgba(0,0,0,0.5);">
      <div class="container">
        <div class="row align-items-center" id="part1">
          <div class="col-lg-7">
            <div class="sec-image position-relative " id="sec-image">
              <div class="bg-img overflow-hidden border-radius">
                <img src="./assets/final_feature.png" alt="" loop=infinite class="img-fluid" />
              </div>
              <div id="imgcontainer-1">
                <div id="inner-2">
                  <div class="demo-img">
                    <div class="demo-overlay">

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 offset-lg-1 mt-5 mt-lg-0">
            <h6 class="text-muted fw-normal">INTRODUCTION</h6>
            <h1 class="fw-bold mt-2">PruningBench</h1>
<!--            Structural pruning has emerged as a promising approach for producing more efficient models.-->
<!--            Nevertheless, the community suffers from a lack of standardized benchmarks and metrics,-->
<!--            leaving the progress in this area not fully comprehended. To fill this gap, we present-->
            <p class="mt-3">
              <b>PruningBench</b> is the first
              comprehensive benchmark of structural pruning. PruningBench employs a unified and consistent framework
              for evaluating the effectiveness of diverse structural pruning techniques, and systematically evaluates
              existing pruning methods, encompassing a wide array of models and tasks.
            </p>
<!--            3) PruningBench provides easily implementable interfaces to-->
<!--            facilitate the implementation of future pruning methods, and enables the subsequent researchers-->
<!--            to incorporate their work into our leaderboards.-->

          </div>
        </div>

      </div>
    </section>
  </div>


  <div class="container">
    <div class="row justify-content-between" style="margin: 30px 0;">
<!--      <div class="col-lg-4 col-md-3 col-sm-8 text-center align-items-center info-title" style="position: relative;">DepGraph</div>-->
<!--      <div class="col-lg-8 col-md-9 col-sm-8 info-content">Dependency Graph (DepGraph) explicitly-->
<!--        model the dependency between layers and comprehensively group coupled parameters for pruning, enabling-->
<!--        any structural pruning on a wide variety of neural networks, including CNNs, RNNs, GNNs, and Transformers.-->
<!--          </div>-->
    </div>
  </div>


  <!-- start section -->
  <div class="container">
  <section class="section features" style="box-shadow: 0 5px 20px rgba(0,0,0,0.5); !important">
    <div class="container">
      <div class="row justify-content-center mb-4 pb-2">
        <div class="col-lg-7">
          <div class="heading text-center">
            <!-- <h6 class="text-muted f-16 fw-normal">Learning to Write as a Professional</h6> -->
            <h2 class="mb-3">Evaluate <span class="text-primary fw-normal"> Structural Pruning </span>
              <br> with PruningBench

            </h2>
            <p class="text-muted para-p mx-auto mb-0">PruningBench can help researchers to efficiently compress deep
              models and evaluate structural pruning methods.</p>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4 mt-4 pt-2">
          <div class="service-box text-center text-lg-start">
            <div class="service-image">
              <img src="./assets/img-1.png" style="width: 50%" alt="img-fluid">
            </div>
            <h5 class="fw-bold mt-4 mb-3">Unified Evaluation Framework</h5>
            <p><span class="text-gray">PruningBench employs a unified framework to evaluate existing diverse structural
              pruning techniques. Specially, PruningBench employs DepGraph to automatically group the network parameters, and adopt
              iterative pruning where a portion of parameters are removed per iteration until the controlled variable
              (e.g.,FLOPS) is reached. This framework ensures more equitable and comprehensible comparisons.</span></p>
          </div>
        </div>

<!--        , thereby avoiding structural issues and-->
<!--        significant performance degradation after pruning-->

        <div class="col-lg-4 mt-4 pt-2">
          <div class="service-box text-center text-lg-start">
            <div class="service-image">
              <img src="./assets/img-2.png" style="width: 50%" alt="img-fluid">
            </div>
            <h5 class="fw-bold mt-4 mb-3">Leaderboards</h5>
            <p><span class="text-gray">PruningBench systematically evaluates 16 existing structural pruning methods,
              encompassing a wide array of models (ResNet18, ResNet50, VGG19, ViT, YOLOv8) and tasks (classification on CIFAR
              and ImageNet, detection on COCO). PruningBench has now yielded 13 leaderboards and a handful of interesting
              findings which are not explored previously.</span></p>
          </div>
        </div>

        <div class="col-lg-4 mt-4 pt-2">
          <div class="service-box text-center text-lg-start">
            <div class="service-image">
              <img src="./assets/img-3.png" style="width: 50%" alt="img-fluid">
            </div>
            <h5 class="fw-bold mt-4 mb-3">Interfaces</h5>
            <p><span class="text-gray">PruningBench is designed as an expandable package that standardizes experimental
              settings and eases the integration of new algorithmic implementations. PruningBench provides straightforward
              interfaces for implementing importance criteria methods and sparsity regularizers, facilitating the development
              and evaluation of future pruning algorithms.</span>
              </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>








  <div class="footer" id="footer" style="margin-top: 80px">
    <nav class="navbar navbar-expand-lg" style="background-color: rgb(245, 247, 250)" id="footer-navbar">
      <div style="display: flex; justify-content: center" class="container-fluid custom-container">
        <div class="container text-center">
          <div class="row2">
            <div class="col footer-team">
              <h2>PruningBench TEAM</h2>
            </div>
          </div>
          <div class="row2">
            <div class="col footer-school">
              Zhejiang University VIPA Lab & National University of Singapore
            </div>
          </div>
          <div class="row2">
            <div class="col footer-name">
              Haoling Li, Changhao Li, Gongfan Fang, Jie Song
            </div>
          </div>

          <div class="row2">
            <div class="col footer-name">
              Website maintenance: Haoling Li (hollylee@zju.edu.cn)
            </div>
          </div>



            <div class="col  mb-5  text-muted" style="margin-top: 20px">
              Copyright© 2024 ZJU VIPA All Rights Reserved
            </div>
        </div>
      </div>
    </nav></div>







<!--  <div class="holly-main">-->
<!--    <div id="static" class="common-container">-->
<!--      <div class="banner lite">-->
<!--        <section class="section">-->
<!--          <div class="banner-title">-->
<!--            <h1 class="banner-title-text">Meta Rank</h1>-->
<!--            <div class="alink-grounp alink-grounp-center">-->
<!--              <el-button type="primary"-->
<!--                         style="margin-left: 0px; width: 150px; height: 45px; letter-spacing: 1px; font-size: 18px; font-weight: 500;"-->
<!--                         @click="handleClickJump('holly')" plain>TUTORIAL</el-button>-->
<!--              <el-button type="success" style="margin-left: 20px; width: 120px; height: 45px; letter-spacing: 1px;-->
<!--                          font-size: 18px; font-weight: 500;" @click="info()" plain>PAPER</el-button>-->
<!--            </div>-->
<!--          </div>-->
<!--        </section>-->
<!--      </div>-->
<!--    </div>-->


<!--    <div id="holly" class="holly">-->
<!--      <div style="background-color: white; width: 50%; padding: 20px; ">-->
<!--        <div style="margin: 0 0 20px 0; text-align: center;">-->
<!--          <label style="font-size:35px; border: 0; color: black; ">1. Choose an Image or Upload an Image</label>-->
<!--        </div>-->
<!--        <el-row>-->
<!--          <el-col v-for="(item,index) in showListPool" :span="4" :key="index">-->
<!--            &lt;!&ndash;                  <div :id=item.id :class="istrue?'block3':'block2'" @click="istrue=!istrue">&ndash;&gt;-->
<!--            &lt;!&ndash;                  <div :id=index class="block2" @click="changeColor($event)">&ndash;&gt;-->
<!--            <div :id=index class="block2" @click="activate = index" :style="{border: activate === index ? '2px solid red' : '2px solid white'}">-->
<!--              <el-image :src="`http://${item}`"-->
<!--                        :initial-index="index"-->
<!--                        style="width: 100%; height: 100%"-->
<!--                        :fit="'fill'"-->
<!--                        :key="componentKey"-->
<!--                        @click="chooseImg($event)"-->
<!--              >-->
<!--              </el-image>-->
<!--            </div>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <div class="holly-data">-->
<!--          <el-button size="large" type="primary"  @click="refreshCifar" plain>Refresh Image Pool</el-button>-->
<!--          <el-button size="large" type="warning"  plain>Upload Your Image</el-button>-->
<!--        </div>-->
<!--      </div>-->


<!--      <div style="background-color: white; width: 50%;" v-loading="resultLoading">-->
<!--        <div style="margin: 20px 0 0 0; text-align: center; ">-->
<!--          <label style="font-size:35px; color: black; border: 0;">Your Image</label>-->
<!--        </div>-->
<!--        <div style="display: flex; justify-content: center;">-->
<!--          <div style="margin: 30px 0; width: 80%;">-->
<!--            <el-image :src="`http://${chosen}`"-->
<!--                      :fit="'fill'"-->
<!--                      :style="'width: 100%;'"-->
<!--                      :key="componentKey"-->
<!--                      @click="chooseImg($event)"-->
<!--            >-->
<!--            </el-image>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div style="margin: 20px 0 40px 0; text-align: center; ">-->
<!--          <label style="font-size:35px; color: black; border: 0;">2. Choose a Model and an Algorithm</label>-->
<!--        </div>-->
<!--        <div class="holly-detect">-->
<!--          <el-select v-model="chosenModel"  placeholder="Choose a Model" size="large">-->
<!--            <el-option key="6" label="ResNet18" value="ResNet18" />-->
<!--          </el-select>-->
<!--          <el-select  v-model="chosenAlgorithm" placeholder="Choose an Algorithm" size="large">-->
<!--            <el-option key="6" label="Integrated Gradients (IG)" value="IG" />-->
<!--            <el-option key="6" label="IG with noise tunnel" value="IG_with_noise_tunnel" />-->
<!--            <el-option key="6" label="GradientShap" value="GradientShap" />-->
<!--            <el-option key="6" label="Occlusion" value="Occlusion" />-->
<!--            <el-option key="6" label="Occlusion with a larger sliding window" value="Occlusion_using_larger_sliding_window" />-->
<!--          </el-select>-->
<!--          <el-button size="large" type="success" @click="startRecognize" plain>开始推理</el-button>-->
<!--        </div>-->
<!--        <div :style="{visibility:resultShow?'visible':'hidden'}" >-->
<!--          <div style="margin: 0 0 20px 0; text-align: center;">-->
<!--            <label style="font-size:35px; border: 0; color: black; ">3. Inference Result</label>-->
<!--          </div>-->
<!--          <div style="background-color: #E7E7E7; width:94%; padding: 20px; margin: 0 20px 0 0; border:2px solid #a1a1a1; border-radius:25px;">-->
<!--            <label style="background-color: #E7E7E7; font-size:30px; color: black; border: 0; font-family: 'Microsoft Yahei'">GroundTruth: </label>-->
<!--            <label style="background-color: #E7E7E7; font-size:30px; color: #C40000; border: 0; font-family: 'Microsoft Yahei'">{{GroundTruth}}</label>-->
<!--            <br>-->
<!--            <label style="background-color: #E7E7E7; font-size:30px; color: black; border: 0; font-family: 'Microsoft Yahei'">Predicted: </label>-->
<!--            <label style="background-color: #E7E7E7; font-size:30px; color: #C40000; border: 0; font-family: 'Microsoft Yahei'">{{Predicted}}</label>-->
<!--            <br>-->
<!--            <label style="background-color: #E7E7E7; font-size:30px; color: black; border: 0; font-family: 'Microsoft Yahei'">Probability: </label>-->
<!--            <label style="background-color: #E7E7E7; font-size:30px; color: #C40000; border: 0; font-family: 'Microsoft Yahei'">{{Probability}}</label>-->
<!--            <br>-->
<!--          </div>-->
<!--          <div style="margin: 20px 0 20px 0; text-align: center;">-->
<!--            <label style="font-size:35px; color: black; border: 0; ">4. Attribution map</label>-->
<!--          </div>-->
<!--          <div style="display: flex; justify-content: center;">-->
<!--            <div v-for="(item,index) in showList" style="margin: 30px 0;">-->
<!--              <el-image :src="`http://${item}`"-->
<!--                        :fit="'fill'"-->
<!--                        :preview-src-list="showList.map(x=>'http://'+x)"-->
<!--                        :initial-index="index"-->
<!--                        @error="error_img[index] = true"-->
<!--                        @load="error_img[index] = false"-->
<!--              >-->
<!--              </el-image>-->
<!--              <div v-show="error_img[index]" class="demo-image__error">-->
<!--                <div class="error_block">-->
<!--                  <el-image>-->
<!--                    <template #error>-->
<!--                      <div class="image-slot">-->
<!--                        遗憾！算法未能成功执行-->
<!--                        <br>-->
<!--                        可能是由于服务器算力不足、程序出错或其他原因-->
<!--                        <br>-->
<!--                        服务器当前可用最大算力：{{memory}}，位于GPU {{gpu}}上-->
<!--                        <br>请稍后再试-->
<!--                      </div>-->
<!--                    </template>-->
<!--                  </el-image>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
</template>

<script setup>

// import $ from 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-alpha1/jquery.min.js'
// import * as d3 from 'https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js';
// import 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css';
import {router} from "@/router";
import {ElMessage} from "element-plus";
import request from "@/api";
import {reactive, ref} from "vue";
import {useStore} from "vuex";
// import { useRouter } from 'vue-router';
//
import axios from "axios";
// import DataUpload from "./DataUpload.vue";

const componentKey = ref(0);
const last_id = ref(666)
const chosenModel = ref('')
const chosenImg = ref('')
const istrue = ref(false)
const chosenAlgorithm = ref('')
const activate = ref(-1)
const chosen = ref([])
let resultLoading = ref(false)
let resultShow = ref(false)

const GroundTruth = ref('')
const Predicted = ref('')
const Probability = ref('')
const gpu = ref('')
const memory = ref('')
const error_img = ref([false, false])

const chosenEnhanceAlgorithm = ref('')
const chosenStitchingAlgorithm = ref('')
const store = useStore();
const listPage = ref(1), imageNumber = ref(8);
const fileList = ref([]), datasetInformation = ref({}), fileList2 = ref([]);
let selectList = Array(imageNumber.value).fill(0);
let deleteShow = ref(false);
const showList = ref([]), listPreview = ref([]), showListPool = ref([]), listPreview2 = ref([]);

const startCompression = () => {
  router.push('/pruning')
}

const startTutorial = () => {
  router.push('/Tutorial')
}

async function refreshImages(option) { //推理之后才提交的, 刷新右边的结果
                                       // console.log(option);
  await getDatasetInfos(option);
  updateShowList();
}

const handleClickJump = (componentId) => {
  let element = document.getElementById(componentId);
  element.scrollIntoView();
};

function info(){
  ElMessage.error('The paper has not been published yet')
  return
}

async function getDatasetInfos(option) {
  let requestUrl = "/dataset/" + option, requestData = {};
  requestData["datasetId"] = 666; //其实用不上
  await request.post(requestUrl, requestData)
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          fileList.value = (res.data.data);
        } else {
          console.log("err request");
        }
      })
      .catch((err) => {
        console.log(err);
      });
}

// const imageLoadStatus = ref([]);

const updateShowList = () => {
  showList.value = fileList.value
  console.log("showList.value", showList.value);
  // listPreview.value = (showList.value.map((e) => {
  //   return "http://" + e;
  // }));
  // console.log("listPreview.value", listPreview.value)
};


async function realRefreshImages(option){  //图像池的刷新
  await getImgPoolInfos(option);
  updatePoolList();
}

async function getImgPoolInfos(option){
  let requestUrl = "/dataset/" + option, requestData = {};
  requestData["datasetId"] = 10002;
  await request.post(requestUrl, requestData)
      .then((res) => {
        console.log(res.data);

        if (res.status === 200) {
          fileList2.value = (res.data.data);
          chosen.value[0] = res.data.data[0]
        } else {
          console.log("err request");
        }
      })
      .catch((err) => {
        console.log(err);
      });
}

const updatePoolList = () => {
  showListPool.value = fileList2.value
  console.log("showListPool.value", showListPool.value);
  listPreview2.value = (showListPool.value.map((e) => {
    return "http://" + e;
  }));
  console.log("listPreview2.value", listPreview2.value)
};

async function refreshCifar(){  //懒得改名字了~
  realRefreshImages("getPool");
  activate.value = -1;
  // let last_d = document.getElementById(last_id.value.toString()) //对应被注释掉的那种写法
  // last_d.style.border = "2px solid white";
  // last_id.value == 666
}

// realRefreshImages("getPool");

const selectChange = (index) => {
  selectList[index] ^= 1;
  console.log(selectList);
};

function uploadDataset() {
  router.push('datasetPreview')
}

// changeColor(()=>{
//   this.$refs.abc.style.border = '2px solid red';
// })
function changeColor(event){  // vue正常思路：用组件的active，但是好像要用data()，以后学了再改吧
  console.log("event", event)
  console.log("event.currentTarget.id", event.currentTarget.id)
  // console.log("document.getElementById(event.currentTarget.id).style.border", document.getElementById(event.currentTarget.id).style.border)
  let d = document.getElementById(event.currentTarget.id)
  d.style.border = "4px solid red";
  if(last_id.value == 666){
    last_id.value = event.currentTarget.id
  }else{
    let last_d = document.getElementById(last_id.value.toString())
    last_d.style.border = "2px solid white";
    last_id.value = event.currentTarget.id
  }
}
// const changeColor = () =>
// {
//     console.log(this.refs)
//     // this.refs.abc.style.border = '2px solid red';
//   // obj.style.border = '2px solid red';
// }

function chooseImg($event) {
  console.log("$event", $event)
  console.log("$event.srcElement.currentSrc", $event.srcElement.currentSrc)
  let arr = $event.srcElement.currentSrc.split("/")
  chosenImg.value = arr[arr.length - 1]
  chosen.value[0] = $event.srcElement.currentSrc.substring(7);
  console.log("图片名称", chosenImg.value)
}

const forceRerender = () => {
  console.log(componentKey.value)
  componentKey.value += 1;

};

const handleError = () =>{
  this.loadError = true;
  this.errorMsg = '加载失败，可能是当前算力不足';
}

async function startRecognize() {
  console.log("start Recognize")

  if(!chosenModel.value){
    ElMessage.error('请选择要使用的模型')
    return
  }
  if(!chosenAlgorithm.value){
    ElMessage.error('请选择要使用的算法')
    return
  }
  if(!chosenImg.value){
    ElMessage.error('请选择要解释的图像')
    return
  }

  resultLoading.value = true
  await request.post('/algorithm/callAlgorithm',{
    algorithmName:chosenAlgorithm.value,
    datasetId: 666,
    datasetName: "ImageNet",
    modelName: chosenModel.value,
    userName: chosenImg.value,
    // userName: store.state.username,
  })
      .then((response)=>{
        console.log("response", response)
        fileList.value[0] = (response.data.data.result[4]);
        fileList.value[1] = (response.data.data.result[5]);
        GroundTruth.value = response.data.data.result[1];
        Predicted.value = response.data.data.result[2];
        Probability.value = response.data.data.result[3].slice(12,18) + "%";
      })
      .catch((error)=>{
        console.error(error)
      })

  showList.value = fileList.value

  console.log("showList.value", showList.value);


  await request.post('/algorithm/reportGpu',{
    algorithmName:chosenAlgorithm.value,
    datasetId: 666,
    datasetName: "ImageNet",
    modelName: chosenModel.value,
    userName: chosenImg.value,
    // userName: store.state.username,
  })
      .then((response)=>{
        gpu.value = response.data.data.result[0];
        memory.value = response.data.data.result[1];
      })
      .catch((error)=>{
        console.error(error)
      })
  resultShow.value = true
  resultLoading.value = false

  // const imageLoadStatus = image Array(showList.value.length).fill('loading');
  // console.log("imageLoadStatus", imageLoadStatus)
  // showList.value.forEach((item, index) => {
  //   const img = image Image();
  //   img.src = `http://${item}`;
  //   console.log("img.src", img.src)
  //   console.log("img.onload", img.onload)
  //   console.log("img.onerror", img.onerror)
  //   img.onload = () => {
  //     imageLoadStatus[index] = 'loaded';
  //     // listPreview.value.push(img.src);
  //   };
  //   img.onerror = () => {
  //     imageLoadStatus[index] = 'error';
  //   };
  // });
  // console.log("imageLoadStatus", imageLoadStatus)

  // listPreview.value = (showList.value.map((e) => {
  //   return "http://" + e;
  // }));
  // console.log("listPreview.value", listPreview.value)
}
</script>

<style scoped>
@import "./style.css";
/*@import "./all.css";*/
.error_block{
  width: 100%;
  height: 100%;
}

/*.homepageMain{*/
/*  height: 1300px;*/
/*  overflow: auto;*/
/*}*/

.holly-main{
}
#tree-container {
  transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
  -moz-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  -o-transform: rotate(90deg);
  /*width: 1867px;*/
  /*height: 1863px;*/
  /*overflow-x: visible;*/
  /*overflow-y: visible;*/
  /*width: 100%;*/
}
/*#tree-container svg{*/
/*  width: 1000px;*/
/*}*/
.tree-wrapper {
  position: relative;
}

.intro {
  position: absolute;
  top: 10%;
  left: 5%;
  /*color: white;*/
  /*transform-origin: top right;*/
  /*transform: rotate(-90deg);*/
}
/*.text-component span {*/
/*  display: inline-block;*/
/*  transform-origin: center;*/
/*  transform: rotate(90deg);*/
/*}*/
.holly{
  /*background-image: url('http://pruning.vipazoo.cn/api/img/background/algorithm2.jpg');*/
  display: flex;
  background-color: white;
  /*justify-content: space-around;*/
  /*background-size: contain;*/
  /*overflow: visible;*/
  /*position: relative;*/
  /*background-position: center;*/
}
.rating {
  /*font-size: 18px;*/
  text-align: center;
}

/*.row {*/
/*  display: flex;*/
/*  align-items: center;*/
/*  justify-content: flex-start;*/
/*  margin-bottom: 10px;*/
/*}*/

.row2 {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0 30px;
}

.row3 {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;
}

.bd-footer {
  text-align: left;
  background: #f7f7f7;
}
.bd-footer a {
  font-weight: 600;
  color: #495057;
}
.bd-footer-links li {
  display: inline-block;
}
.bd-footer-links {
  padding-inline-start: 0px;
}
.text-muted {
  color: #6c757d !important;
}

.banner.lite {
  /*background-image: linear-gradient(transparent, white 100%),*/
  /*  url('./assets/head.jpg');*/
  /* Center and scale the image nicely */
  background-image: linear-gradient(transparent, white 100%),
  url('./assets/head.jpg');
  /*background-color: #1A1ACE;*/
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding-top: 60px;
  padding-bottom: 80px;
}
.banner.lite .banner-title {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 45px;
}
.banner.lite .banner-title-text {
  margin: 0;
  font-size: 42px;
  letter-spacing: 3px;
  line-height: 1.5;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  color: #c6c2d3;
  font-weight: 350;
}
.banner.lite .banner-main {
  overflow: hidden;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 350px;
  -webkit-box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.08);
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.08);
}
.banner.lite .banner-main-nav {
  background: #f8f9fb no-repeat bottom/100%;
  background-position: 0 3px;
  width: 300px;
  padding: 42px 40px 40px;
}
.banner.lite .banner-main-nav_title {
  font-size: 20px;
  letter-spacing: 4px;
  line-height: 32px;
  margin-bottom: 30px;
  font-weight: 500;
}
.banner.lite .banner-main-nav > ul > li {
  cursor: pointer;
  margin-bottom: 28px;
  position: relative;
}
.banner.lite .banner-main-nav > ul > li,
.banner.lite .banner-main-nav > ul > li .banner-main-nav_item {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.banner.lite .banner-main-nav > ul > li .banner-main-nav_item {
  font-size: 16px;
  line-height: 22px;
  vertical-align: middle;
}
.banner.lite .banner-main-nav > ul > li .banner-main-nav_item:hover {
  color: #036fe2;
}
.banner.lite .banner-main-nav > ul > li .icon {
  font-size: 16px;
  margin-left: 8px;
}
.banner.lite .banner-main-nav > ul > li .img-icon-wrap {
  margin-left: 8px;
  overflow: hidden;
  height: 22px;
  width: 22px;
}
.banner.lite .banner-main-nav > ul > li .img-icon {
  position: relative;
  left: -80px;
  height: 22px;
  width: 22px;
  /*-webkit-filter: drop-shadow(#000 80px 0);*/
  /*filter: drop-shadow(#000 80px 0);*/
}
.banner.lite .banner-main-nav > ul > li:before {
  content: '';
  display: block;
  height: 6px;
  width: 6px;
  background: #d8d8d8;
  border-radius: 50%;
  margin-right: 10px;
}
.banner.lite .banner-main-nav > ul > li:after {
  content: '';
  display: block;
  width: 0;
  height: 42px;
  border: 1px dashed #d8d8d8;
  position: absolute;
  left: 2px;
  top: 16px;
}
.banner.lite .banner-main-nav > ul > li:last-child:after {
  display: none;
}
.banner.lite .banner-main-swiper {
  width: 100%;
  height: 350px;
  /*overflow: hidden;*/
  position: relative;
}
.banner.lite .slide {
  width: 900px;
  height: 350px;
  display: block;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50%;
}

.banner.lite .lite-swiper-pagination {
  position: absolute;
  bottom: 86px;
  text-align: center;
  width: 100%;
  height: 19px;
  z-index: 10;
}
.modeltype.lite {
  font-size: 16px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  /* justify-content: space-between; */
}
.modeltype.lite .modeltype-item {
  display: block;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  /* flex-grow: 1; */
  width: 382px;
  padding: 30px;
  border: 1px solid rgba(0, 0, 0, 0);
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}
.modeltype.lite .modeltype-item:hover {
  border: 1px solid #036fe2;
  -webkit-box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.08);
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.08);
}

.modeltype.lite .modeltype-item:hover .modeltype-title {
  color: #503ef3;
}
/* .modeltype.lite .modeltype-item:last-child {
  -webkit-box-flex: 0;
  -ms-flex-positive: 0;
  flex-grow: 0;
  margin-bottom: 0;
} */
.modeltype.lite .modeltype-icon {
  width: 320px;
  margin-bottom: 24px;
}
.modeltype.lite .modeltype-title {
  display: block;
  font-size: 20px;
  line-height: 30px;
  padding-bottom: 20px;
  margin-bottom: 24px;
  border-bottom: 1px solid #e1e1e1;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}
.modeltype.lite .modeltype-title > i {
  font-size: 12px;
  padding-left: 10px;
}
.modeltype.lite .modeltype-title:hover {
  color: #503ef3;
}
.modeltype.lite .modeltype-desc {
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  font-size: 14px;
  color: #666;
  line-height: 24px;
}
.modeltype.lite .modeltype-type {
  font-size: 14px;
  line-height: 24px;
  margin-bottom: 10px;
  /* margin-right: 10px; */
  overflow: hidden;
  color: #000;
}
.modeltype.lite .modeltype-type > span {
  display: inline-block;
  height: 24px;
  padding: 0 12px;
  margin-right: 10px;
  margin-bottom: 6px;
  background: #f5f5f5;
}

:root {
  --swiper-theme-color: #007aff;
}
.swiper-container {
  margin-left: auto;
  margin-right: auto;
  position: relative;
  overflow: hidden;
  list-style: none;
  padding: 0;
  z-index: 1;
}
.swiper-container /deep/ .el-carousel__button {
  background-color: #0c24ad;
}

.footer {
  vertical-align: top;
  background-color: rgba(3, 3, 122, 0.8);
  /* padding-right: 220px; */
}
.footer .footer_cover {
  width: 100%;
  height: 300px;
  margin: 0 auto;
}
.footer .ai_items_img {
  padding-top: 158px;
  color: #ffffff;

  font-size: 14px;
  width: 138px;
  text-align: center;
  margin-top: 80px;
  margin-left: 200px;
  background-image: url('./assets/QRcode.png');
  /* background-size: 200px 200px; */
  background-repeat: no-repeat;
}
.footer .ai_items_class {
  width: 259px;
  text-align: center;
  font-size: 18px;
  color: #fff;
  display: block;
  margin: 0 auto;
}
.footer .ai_items_class .title {
  font-size: 18px;
  margin: 20px 0 20px;
}
.footer .ai_items_class .desc {
  font-size: 14px;
  line-height: 20px;
  opacity: 0.66;
  max-width: 302px;
}
.footer .ai_items_class.logo {
  width: 405px;
}
.footer .ai_items_class.resource {
  width: 158px;
}
.footer .ai_items_class.market {
  width: 170px;
}
.footer .ai_items {
  font-size: 14px;
  color: #fff;
  opacity: 0.66;
  line-height: 36px;
  cursor: pointer;
}
.footer .ai_items.qq {
  cursor: default;
  white-space: nowrap;
}
.footer .ai_items.qq:hover {
  color: #fff;
}
.footer .ai_items:hover {
  opacity: 1;
  color: #036fe2;
  /* #3B5998 */
}
.footer .ai_title {
  margin: 48px 0 27px;
  text-align: center;
  color: #fff;
  font-size: 36px;
  opacity: 1;
  cursor: default;
}
.footer .footer_copyright {
  line-height: 50px;
  font-size: 14px;
}

body,
html {
  height: 100%;
  width: 100%;
  /* min-width: 1200px; */
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, Helvetica, Arial,
    sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
*,
body,
html {
  padding: 0;
  margin: 0;
}
* {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
a {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
img {
  width: 100%;
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
.modal_section .section-title_container {
  padding-bottom: 30px;
}
/*.section {*/
/*  margin: 0 auto;*/
/*  font-size: 0;*/
/*}*/
.section {
  padding-top: 60px;
  padding-bottom: 60px;
  position: relative !important;
}
.section-wrap {
  padding-top: 60px;
  padding-bottom: 60px;
}
.section-white {
  background: rgba(0, 0, 0, 0);
}
.section-title_container {
  padding-bottom: 60px;
}
.section-title {
  width: 100%;
  font-size: 32px;
  text-align: center;
  font-weight: 400;
  letter-spacing: normal;
}
.common-container {
}
.common-container .section {
  width: 1180px;
}
.alink {
  display: inline-block;
  text-align: center;
  min-width: 130px;
  padding: 8px;
  font-size: 18px;
  line-height: 30px;
  cursor: pointer;
}

.alink-grounp.alink-grounp-center {
  text-align: center;
}
.alink-grounp.alink-grounp-left {
  text-align: left;
}
</style>

<style scoped>
.ai-platform-wrap {
  width: 1180px;
  margin: 0 auto;
  position: relative;
}

.ai-layout-b {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -moz-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
.ai-layout-b-item {
  display: block;
  position: relative;
  width: 280px;
  height: 280px;
  /* padding-top: 44px; */
  border: 2px solid #dadcdf;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  color: inherit;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  text-align: center;
}
.ai-layout-b-item-title {
  margin-top: -40px;
  color: white;
  font-size: 24px;
  line-height: 26px;
}
.ai-layout-b-item-img {
  width: 276px;
  height: 276px;
  background-repeat: no-repeat;
  -moz-background-size: contain;
  background-size: contain;
  margin: 0 auto;
}

.ai-home-section {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  overflow: hidden;
}
.ai-home-section-title {
  font-size: 34px;
  line-height: 44px;
  text-align: center;
  color: inherit;
}

.ai-home-section-industry {
  /* padding-top: 50px; */
}
.ai-home-section-industry .ai-layout-b {
  margin-top: 56px;
}
.ai-home-section-industry .ai-layout-b-item {
  width: 280px;
  height: 280px;
  margin-top: 20px;
}
.ai-home-section-industry .ai-layout-b-item:not(:last-child):hover {
  border: 2px solid #1a73e8;
  -webkit-box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.05);
}
.ai-home-section-industry .ai-layout-b-item:last-child {
  pointer-events: none;
  cursor: default;
}

.ai-home-section-industry
  .ai-layout-b-item:not(:last-child):hover
  .ai-layout-b-item-title {
  font-weight: 700;
  /* color: #1a73e8; */
}

.home {
  position: relative;
  padding: 120px 0;
  height: 100%;
  display: flex;
  align-items: center;
  background-image: url(assets/bg-5.png);
  background-size: cover;
  /*============================================================
       * animation image
       *============================================================*/
}


/*.container{*/
/*  width: 70%;*/
/*}*/

/*.container, .container-fluid, .container-lg, .container-md, .container-sm, .container-xl, .container-xxl {*/
/*  --bs-gutter-x: 1.5rem;*/
/*  --bs-gutter-y: 0;*/
/*  width: 100%;*/
/*  padding-right: calc(var(--bs-gutter-x) * .5);*/
/*  padding-left: calc(var(--bs-gutter-x) * .5);*/
/*  margin-right: auto;*/
/*  margin-left: auto;*/
/*}*/

.home .home-content .title {
  font-size: 50px;
  font-weight: 500;
  color: white;
}

.row {
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(-1 * var(--bs-gutter-y));
  margin-right: calc(-.5 * var(--bs-gutter-x));
  margin-left: calc(-.5 * var(--bs-gutter-x));
}

.align-items-center {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
}

.align-items-center {
  align-items: center!important;
}

@media (min-width: 992px){
  .col-lg-6 {
    flex: 0 0 auto;
    width: 50%;
  }
}

.f-16 {
  font-size: 20px;
}

.my-4 {
  margin-top: 1.5rem!important;
  margin-bottom: 1.5rem!important;
}

.text-muted {
  --bs-text-opacity: 1;
  color: #6c757d!important;
}

.benchmark {
  color: #f9f2f4 !important;
}

.btn {
  padding: 12px 30px;
  font-size: 16px;
  font-weight: 550;
  letter-spacing: 0.5px;
  transition: all 0.5s;
  border: 1px solid #7371ec;
  overflow: hidden;
  position: relative;
}

.btn {
  padding: 11px 28px;
  font-size: 16px;
  letter-spacing: 0.9px;
  font-weight: 550;
  text-transform: uppercase;
}

.btn-primary {
  background: #20ad96;
  border-color: #20ad96 !important;
  color: white;
}

.btn-tutorial {
  background: #BA4021;
  border-color: #BA4021 !important;
  color: white;
}

.btn-docs {
  background: #7371ec;
  border-color: #7371ec !important;
  color: white;
}

.service-image{
  width: 100%;
}

.bg-home5 .home-content {
  position: relative;
}

.justify-content-between {
  justify-content: space-between!important;
}

/*@media (min-width: 1200px) {*/
/*  .container {*/
/*    max-width: 1140px !important;*/
/*  }*/
/*}*/

</style>
