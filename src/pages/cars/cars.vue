<template>
  <el-container>
<!--    <el-aside style="background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3)), url('http://pruning.vipazoo.cn/api/img/background/ImageNet_aside.png') no-repeat 0% 20%/ cover; width: 750px; padding: 20px">-->
    <el-aside style="background-color: white; width: 50%; padding: 20px">
    <div style="margin: 20px 0 40px 0; text-align: center; ">
        <label style="font-size:35px; color: black; border: 0;">1. Choose a Car</label>
    </div>
      <!--          <div v-for="(item,index) in showListPool" class="demo-image2">-->
      <!--            <div class="block2">-->
      <!--              <el-image :src="`http://${item}`"-->
      <!--                        :initial-index="index"-->
      <!--                        :fit="'scale-down'"-->
      <!--                        :key="componentKey"-->
      <!--                        @click="chooseImg($event)"-->
      <!--              >-->
      <!--              </el-image>-->
      <!--            </div>-->
      <!--          </div>-->


      <div style="display: flex; justify-content: center;">
        <div style="margin: 30px 0; width: 80%;">
          <el-image :src="`http://${chosen}`"
                    :fit="'fill'"
                    :style="'width: 100%;'"
                    :key="componentKey"
                    @click="chooseImg($event)"
          >
          </el-image>
        </div>
      </div>


      <el-row>
        <el-col v-for="(item,index) in showListPool" :span="4" :key="index">
          <!--                  <div :id=item.id :class="istrue?'block3':'block2'" @click="istrue=!istrue">-->
          <!--                  <div :id=index class="block2" @click="changeColor($event)">-->
          <div :id=index class="block2" @click="activate = index" :style="{border: activate === index ? '2px solid red' : '2px solid white'}">
            <el-image :src="`http://${item}`"
                      :initial-index="index"
                      style="width: 100%; height: 100%"
                      :fit="'fill'"
                      :key="componentKey"
                      @click="chooseImg($event)"
            >
            </el-image>
          </div>
        </el-col>
      </el-row>
      <div class="holly-data">
        <el-button size="large" type="primary"  @click="refreshCifar" plain>刷新图像池</el-button>
        <el-button size="large" type="warning"  plain>数据集介绍</el-button>
      </div>
    </el-aside>
    <el-main style="background-color: white" v-loading="resultLoading">
      <div style="margin: 20px 0 40px 0; text-align: center; ">
        <label style="font-size:35px; color: black; border: 0;">2. Choose a Model and an Algorithm</label>
      </div>
      <div class="holly-detect">
        <el-select v-model="chosenModel" placeholder="请选择神经网络模型" size="large">
          <el-option key="6" label="ProtoTree for CARS(1)" value="cars1" />
        </el-select>
        <el-select  v-model="chosenAlgorithm" placeholder="请选择推理算法" size="large">
          <el-option key="6" label="此为可解释建模方法,无需额外的推理算法" value="none" :disabled=true />
        </el-select>
        <el-button size="large" type="success"  @click="startRecognize" plain>开始推理</el-button>
      </div>


<!--      以下是先不展示的-->
        <div :style="{visibility:resultShow?'visible':'hidden'}" >
          <div style="margin: 0 0 20px 0; text-align: center;">
            <label style="font-size:35px; border: 0; color: black; ">3. Inference Result</label>
          </div>
          <div style="background-color: #E7E7E7; width:94%; padding: 20px; margin: 0 20px 0 0; border:2px solid #a1a1a1; border-radius:25px;">
            <label style="background-color: #E7E7E7; font-size:30px; color: black; border: 0; font-family: 'Microsoft Yahei'">GroundTruth: </label>
            <label style="background-color: #E7E7E7; font-size:30px; color: #C40000; border: 0; font-family: 'Microsoft Yahei'">{{GroundTruth}}</label>
            <br>
            <label style="background-color: #E7E7E7; font-size:30px; color: black; border: 0; font-family: 'Microsoft Yahei'">Predicted: </label>
            <label style="background-color: #E7E7E7; font-size:30px; color: #C40000; border: 0; font-family: 'Microsoft Yahei'">{{Predicted}}</label>
            <br>
            <label style="background-color: #E7E7E7; font-size:30px; color: black; border: 0; font-family: 'Microsoft Yahei'">Probability: </label>
            <label style="background-color: #E7E7E7; font-size:30px; color: #C40000; border: 0; font-family: 'Microsoft Yahei'">{{Probability}}</label>
            <br>
          </div>


          <div style="margin: 20px 0 0 0; text-align: center;">
            <label style="font-size:35px; color: black; border: 0; ">4. ProtoTree (before pruned)</label>
          </div>


          <div style="display: flex; justify-content: center;">
            <div v-for="(item,index) in showList" style="margin: 30px 0;">
              <el-image :src="`http://${item}`"
                        :fit="'fill'"
                        :preview-src-list="showList.map(x=>'http://'+x)"
                        :initial-index="index"
              >
              </el-image>
            </div>
          </div>

<!--          <el-row style="margin: 30px 0 0 60px;">-->
<!--            <el-col v-for="(item,index) in showList" :span="24" :key="index">-->
<!--              &lt;!&ndash;                  <div :id=item.id :class="istrue?'block3':'block2'" @click="istrue=!istrue">&ndash;&gt;-->
<!--              <el-image :src="`http://${item}`"-->
<!--                        :preview-src-list="showList.map(x=>'http://'+x)"-->
<!--                        :initial-index="index"-->
<!--                        :fit="'scale-down'"-->
<!--              >-->
<!--              </el-image>-->
<!--            </el-col>-->
<!--          </el-row>-->

          <div class="holly-data">
            <el-link target="_blank"
                     :href="`http://pruning.vipazoo.cn/api/Prototype/test_${chosenModel}_full/pruned_and_projected/treevis.pdf`" :underline="false">
              <el-button style="border-color: #000000;" size="large" type="primary" plain>查看高清矢量图</el-button>
            </el-link>
            <el-link  :href="'http://pruning.vipazoo.cn/api/Prototype/test_'+chosenModel+'_full/pruned_and_projected/node_vis.zip'" :underline="false">
              <el-button style="border-color: #000000; " size="large" type="warning" plain>下载节点原型</el-button>
            </el-link>
          </div>

          <div style="margin: 20px 0 0 0; text-align: center;">
            <label style="font-size:35px; color: black; border: 0; ">5. ProtoTree (after pruned)</label>
          </div>

          <div style="display: flex; justify-content: center;">
            <div v-for="(item,index) in showList2" style="margin: 30px 0;">
              <el-image :src="`http://${item}`"
                        :fit="'fill'"
                        :preview-src-list="showList2.map(x=>'http://'+x)"
                        :initial-index="index"
              >
              </el-image>
            </div>
          </div>

<!--          <el-row style="margin: 30px 0 0 60px;">-->
<!--            <el-col v-for="(item,index) in showList2" :span="24" :key="index">-->
<!--              &lt;!&ndash;                  <div :id=item.id :class="istrue?'block3':'block2'" @click="istrue=!istrue">&ndash;&gt;-->
<!--              <el-image :src="`http://${item}`"-->
<!--                        :preview-src-list="showList2.map(x=>'http://'+x)"-->
<!--                        :initial-index="index"-->
<!--                        :fit="'scale-down'"-->
<!--              >-->
<!--              </el-image>-->
<!--            </el-col>-->
<!--          </el-row>-->

          <div class="holly-data">
            <el-link target="_blank"
                     :href="`http://pruning.vipazoo.cn/api/Prototype/test_${chosenModel}_pruned/pruned_and_projected/treevis.pdf`" :underline="false">
              <el-button style="border-color: #000000;" size="large" type="primary" plain>查看高清矢量图</el-button>
            </el-link>
            <el-link target="_blank"  :href="'http://pruning.vipazoo.cn/api/Prototype/test_'+chosenModel+'_pruned/pruned_and_projected/node_vis.zip'" :underline="false">
              <el-button style="border-color: #000000;" size="large" type="warning" plain>下载节点原型</el-button>
            </el-link>
          </div>

          <div style="margin: 20px 0 0 0; text-align: center;">
            <label style="font-size:35px; color: black; border: 0;">6. Local explaination (predicted)</label>
          </div>

          <div style="display: flex; justify-content: center;">
            <div v-for="(item,index) in showList3" style="margin: 30px 0;">
              <el-image :src="`http://${item}`"
                        :fit="'fill'"
                        :preview-src-list="showList3.map(x=>'http://'+x)"
                        :initial-index="index"
                        @error="error_img[index] = true"
                        @load="error_img[index] = false"
              >
              </el-image>
              <div v-show="error_img[index]" class="demo-image__error">
                <div class="block">
                  <el-image>
                    <template #error>
                      <div class="image-slot">
                        遗憾！算法未能成功执行
                        <br>
                        可能是由于服务器算力不足、程序出错或其他原因
                        <br>
                        服务器当前可用最大算力：{{memory}}，位于GPU {{gpu}}上
                        <br>请稍后再试
                      </div>
                    </template>
                  </el-image>
                </div>
              </div>
            </div>
          </div>

<!--          <el-row style="margin: 30px 0 0 60px;">-->
<!--            <el-col v-for="(item,index) in showList3" :span="24" :key="index">-->
<!--              &lt;!&ndash;                  <div :id=item.id :class="istrue?'block3':'block2'" @click="istrue=!istrue">&ndash;&gt;-->
<!--              <el-image :src="`http://${item}`"-->
<!--                        :preview-src-list="showList3.map(x=>'http://'+x)"-->
<!--                        :initial-index="index"-->
<!--                        :fit="'scale-down'"-->
<!--                        @error="error_img[index] = true"-->
<!--                        @load="error_img[index] = false"-->
<!--              >-->
<!--              </el-image>-->
<!--              <div v-show="error_img[index]" class="demo-image__error">-->
<!--                <div class="block">-->
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

<!--            </el-col>-->
<!--          </el-row>-->

          <div style="text-align: center;">
            <el-link style="display: inline-block;" target="_blank"
                     :href="`http://${showpdf}`" :underline="false">
              <el-button style="border-color: #000000;" size="large" type="primary" plain>查看高清矢量图</el-button>
            </el-link>
          </div>

          <!--        <div v-for="(item,index) in showList" class="demo-image" style="margin: 30px 0 0 0;">-->
          <!--          <div class="block">-->
          <!--            <el-image :src="`http://${item}`"-->
          <!--                      :preview-src-list="listPreview"-->
          <!--                      :initial-index="index"-->
          <!--                      class="image"-->
          <!--                      :fit="'scale-down'"-->
          <!--            >-->
          <!--            </el-image>-->
          <!--            <br>-->
          <!--          </div>-->
          <!--        </div>-->
        </div>


    </el-main>
  </el-container>

</template>

<script lang="ts" setup>
import {router} from "@/router";
import {ElMessage} from "element-plus";
import request from "@/api";
import {reactive, ref} from "vue";
import {useStore} from "vuex";
import axios from "axios";
import DataUpload from "./DataUpload.vue";


const componentKey = ref(0);
const last_id = ref(666)
const chosenModel = ref('')
const chosenImg = ref('')
const istrue = ref(false)
const chosenAlgorithm = ref('')
const activate = ref(-1)
const error_img = ref([false, false])
const GroundTruth = ref('')
const Predicted = ref('')
const Probability = ref('')
const gpu = ref('')
const memory = ref('')

const chosenEnhanceAlgorithm = ref('')
const chosenStitchingAlgorithm = ref('')
const store = useStore();
const listPage = ref(1), imageNumber = ref(8);
const fileList = ref([]), datasetInformation = ref({}), fileList2 = ref([]);
let selectList = Array(imageNumber.value).fill(0);
let deleteShow = ref(false);
const showList = ref([]), showList2 = ref([]), showList3 = ref([]), showpdf = ref(''), listPreview = ref([]), showListPool = ref([]), listPreview2 = ref([]);
let resultShow = ref(false)
let resultLoading = ref(false)
const chosen = ref([])

// import axios from 'axios';

// function downloadPdf() {
//
//   request.get('/Prototype/test_cub1_full/pruned_and_projected/treevis.pdf')
//       .then((response) => {
//         console.log("response:",response)
//         const url = window.URL.createObjectURL(image Blob([response.data]));
//         const link = document.createElement('a');
//         link.href = url;
//         link.setAttribute('download', 'treevis.pdf');
//         document.body.appendChild(link);
//         link.click();
//       });
//
//   // axios({
//   //   url: 'http://pruning.vipazoo.cn/api/home/OIPDL_codes/CUB_CARS/tests/test_cub1_full/pruned_and_projected/treevis.pdf',
//   //   method: 'GET',
//   //   responseType: 'blob',
//   // }).then((response) => {
//   //   const url = window.URL.createObjectURL(image Blob([response.data]));
//   //   const link = document.createElement('a');
//   //   link.href = url;
//   //   link.setAttribute('download', 'treevis.pdf');
//   //   document.body.appendChild(link);
//   //   link.click();
//   // });
// }
//
// function downloadZip() {
//
//   request.get('/Prototype/test_cub1_full/pruned_and_projected/node_vis.zip')
//       .then((response) => {
//         console.log("response:",response)
//         const url = window.URL.createObjectURL(image Blob([response.data]));
//         const link = document.createElement('a');
//         link.href = url;
//         link.setAttribute('download', 'node_vis.zip');
//         document.body.appendChild(link);
//         link.click();
//       });
//
//   // axios({
//   //   url: 'http://pruning.vipazoo.cn/api/home/OIPDL_codes/CUB_CARS/tests/test_cub1_full/pruned_and_projected/node_vis.zip',
//   //   method: 'GET',
//   //   responseType: 'blob',
//   // }).then((response) => {
//   //   const url = window.URL.createObjectURL(image Blob([response.data]));
//   //   const link = document.createElement('a');
//   //   link.href = url;
//   //   link.setAttribute('download', 'node_vis.zip');
//   //   document.body.appendChild(link);
//   //   link.click();
//   // });
// }

async function refreshImages(option) { //推理之后才提交的, 刷新右边的结果
                                       // console.log(option);
  await getDatasetInfos(option);
  updateShowList();
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

const updateShowList = () => {
  showList.value = fileList.value
  console.log("showList.value", showList.value);
  listPreview.value = (showList.value.map((e) => {
    return "http://" + e;
  }));
  console.log("listPreview.value", listPreview.value)
};


async function realRefreshImages(option){  //图像池的刷新
  await getImgPoolInfos(option);
  updatePoolList();
}

async function getImgPoolInfos(option){
  let requestUrl = "/dataset/" + option, requestData = {};
  requestData["datasetId"] = 10006;
  await request.post(requestUrl, requestData)
      .then((res) => {
        console.log(res.data);
        console.log("res.data.data[0]: ", res.data.data[0]);
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

realRefreshImages("getPool");

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

async function startRecognize() {

  console.log("start Recognize")

  if(!chosenModel.value){
    ElMessage.error('请选择要使用的模型')
    return
  }
  // if(!chosenAlgorithm.value){
  //   ElMessage.error('请选择要使用的算法')
  //   return
  // }
  if(!chosenImg.value){
    ElMessage.error('请选择要解释的图像')
    return
  }
  resultLoading.value = true
  await request.post('/algorithm/callAlgorithm',{
    algorithmName:'CARS',
    datasetId: 666,
    datasetName: "CUB_CARS",
    modelName: chosenModel.value,
    userName: chosenImg.value,
    // userName: store.state.username,
  })
      .then((response)=>{
        console.log("response", response)
        showList3.value[0] = response.data.data.result[6];
        showpdf.value = response.data.data.result[7];
        GroundTruth.value = response.data.data.result[8];
        Predicted.value = response.data.data.result[9];
        Probability.value = response.data.data.result[10];
      })
      .catch((error)=>{
        console.error(error)
      })
  showList.value[0] = "pruning.vipazoo.cn/api/Prototype/test_" + chosenModel.value + "_full/pruned_and_projected/treevis.png";
  showList2.value[0] = "pruning.vipazoo.cn/api/Prototype/test_" + chosenModel.value + "_pruned/pruned_and_projected/treevis.png";


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
  // /nfs/lhl/OIPDL_codes/CUB_CARS/tests/test_cub1_full/pruned_and_projected/treevis.png
  // showList.value = fileList.value
  //
  // console.log("showList.value", showList.value);
  // listPreview.value = (showList.value.map((e) => {
  //   return "http://" + e;
  // }));
  // console.log("listPreview.value", listPreview.value)

  // if(chosenModel.value.startsWith("cub")){
  //
  // }
}
</script>

<style scoped>
.v-loading__container::after {
  border-top-color: #007bff;
  width: 30%; /* 修改圆圈的宽度 */
  height: 30%; /* 修改圆圈的高度 */
  /*margin-top: -1rem; !* 根据圆圈高度调整 margin-top *!*/
}
.el-select{
  border: 1px solid black;
  border-radius: 5px;
}
.inference{
  border-color: #000000;
  background-color: #022BA2;
}
.common-layout{
  height: 100%;
}
.image_pool{
  position: relative;
  width: 700px;
  height: 500px;
}
.el-container {
  position: relative;
  height:100%;
}
.detect{
  text-align: center;
  margin: 20px;
}
/*.data{*/
/*  text-align: center;*/
/*  margin: 20px;*/
/*  !*display: inline-block;*!*/
/*}*/
.m-1{
  text-align: center;
  margin-right: 350px;
  background-color: #007B00;
  border-color: #000000;
  display: inline-block;
}
.m-2{
  text-align: center;
  margin: 0 20px;
  border-color: #000000;
  display: inline-block;
}
.m-3{
  text-align: center;
  margin-left: 430px;
  background-color: #9B591E;
  border-color: #000000;
  display: inline-block;
}

.m-label{
  text-align: center;
  background-color: #545c64;
  color: white;
  align-items: center;
  border: 0;
}

.demo-image .block {
  padding: 30px 0;
  text-align: center;
  border: solid 1px var(--el-border-color);
  /*display: inline-block;*/
  width: 35%;
  margin: 0 20px;
  box-sizing: border-box;
  /*vertical-align: center;*/
  /*align-items: center*/
  float: left;
}

.block3 {
  padding: 0;
  text-align: center;
  border: 2px solid red;
  /*display: inline-block;*/
  /*width: 19%;*/
  /*float: left;*/
  cursor:pointer;
  /*box-sizing: border-box;*/
  /*vertical-align: top;*/
}

</style>
