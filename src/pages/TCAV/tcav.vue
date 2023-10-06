<template>

    <el-container>
      <el-aside style="background-color: white; width: 50%; padding: 20px">
        <div style="margin: 20px 0 40px 0; text-align: center; ">
          <label style="font-size:35px; color: black; border: 0;">1. Choose an Image</label>
        </div>

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

        <el-row style="margin: 0 0 40px 0;">
            <el-col v-for="(item,index) in showListPool" :span="4" :key="index">
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

<!--        <div style="margin: 20px 0 40px 0;">-->
<!--          <el-image src="http://10.214.242.155:7996/img/background/cifar_1.gif" style="width: 50px; height: 50px; float: left"/>-->
<!--          <label style="font-size:40px; color: white; border: 0; margin: 0 0 0 80px; font-family: 'FZShuTi'">请选择你要探索的概念</label>-->
<!--          &lt;!&ndash;          <el-button plain size="large" style="text-align: center; background-color: #545c64;&ndash;&gt;-->
<!--          &lt;!&ndash;          color: white; align-items: center; border: 0;">请选择你要解释的图像</el-button>&ndash;&gt;-->
<!--          <el-image src="http://10.214.242.155:7996/img/background/cifar_3.gif" style="width: 50px; height: 50px; float: right"/>-->
<!--        </div>-->
        <div style="margin: 40px 0 40px 0; text-align: center; ">
          <label style="font-size:35px; color: black; border: 0;" id="title-2">2. Choose Concepts to Explore</label>
        </div>

<!--        <div style="margin: 20px 0 40px 0;">-->
<!--          <label style="font-size:40px; color: white; border: 0; margin: 0 0 0 80px; font-family: 'FZShuTi'">点击可查看原图</label>-->
<!--        </div>-->

        <div v-for="(item,index) in ConceptPool.slice((ConceptPool_current_page-1)*ConceptPool_page_size, Math.min(ConceptPool.length, ConceptPool_current_page*ConceptPool_page_size))">
          <el-radio-group v-model="radio[index]" style="margin: 10px 0 10px 0;">
            <el-radio :label="item['conceptName']" size="large" border style="background: white">with {{item['conceptName']}}</el-radio>
            <el-radio label="none" size="large" border style="background: white">without {{item['conceptName']}}</el-radio>
          </el-radio-group>
          <el-row>
            <el-col v-for="(item2,index2) in item['conceptAddress']" :span="4" :key="index2">
              <div :id=index2 class="block2">
                <el-image :src="`http://${item2}`"
                          :initial-index="index"
                          :preview-src-list="item['conceptAddress'].map(x=>'http://'+x)"
                          style="width: 100%; height: 100%"
                          :fit="'fill'"
                          :key="componentKey"
                >
                </el-image>
              </div>
            </el-col>
          </el-row>
        </div>
        <!--使用el-pagination的时候，要使用v-model:total这样的语法糖，而不能用':total'这样的形式-->
        <el-pagination
            background
            layout="prev, pager, next"
            v-model:current-page="ConceptPool_current_page"
            v-model:page-size="ConceptPool_page_size"
            v-model:total="ConceptPool.length"
            style="justify-content: center; margin: 25px"
        />
        <div class="holly-data">
          <el-button size="large" type="primary"  @click="refreshConcept" plain>刷新概念池</el-button>
          <el-button size="large" type="warning"  plain>概念数据集介绍</el-button>
        </div>

<!--        <div class="data">-->
<!--          <el-button size="large" type="primary" class="m-1" @click="refreshConcept">刷新概念池</el-button>-->
<!--          <el-button size="large" type="primary" class="m-3">概念数据集介绍</el-button>-->
<!--        </div>-->
      </el-aside>
      <el-main style="background-color: white" v-loading="resultLoading">

        <div class="holly-detect">
          <el-select v-model="chosenModel"  placeholder="请选择神经网络模型" size="large">
            <el-option key="6" label="GoogleNet" value="GoogleNet" />
          </el-select>
          <el-select  v-model="chosenAlgorithm" placeholder="请选择推理算法" size="large">
            <el-option key="6" label="TCAV" value="TCAV" />
          </el-select>
          <el-button size="large" type="success" @click="startRecognize" plain>开始推理</el-button>
        </div>


<!--        <div class="holly-detect">-->
<!--          <el-select v-model="chosenModel" placeholder="请选择神经网络模型" size="large">-->
<!--            <el-option key="6" label="ProtoTree for CUB(1)" value="cub1" />-->
<!--          </el-select>-->
<!--          <el-select  v-model="chosenAlgorithm" placeholder="请选择推理算法" size="large">-->
<!--            <el-option key="6" label="此为可解释建模方法,无需额外的推理算法" value="none" :disabled=true />-->
<!--          </el-select>-->
<!--          <el-button size="large" type="success"  @click="startRecognize" plain>开始推理</el-button>-->
<!--        </div>-->

        <div :style="{visibility:resultShow?'visible':'hidden'}" >
<!--        <div style="margin: 0 0 20px 0;">-->
<!--        <label style="font-size:40px; color: white; border: 0; margin: 0 0 0 440px; font-family: 'FZShuTi'">原始图像</label>-->
<!--        </div>-->
          <div style="margin: 20px 0 20px 0; text-align: center; ">
            <label style="font-size:35px; color: black; border: 0;">3. The Input Image</label>
          </div>


          <div style="display: flex; justify-content: center;">
            <div v-for="(item,index) in showList2">
              <el-image :src="`http://${item}`"
                        :fit="'fill'"
                        :preview-src-list="showList2.map(x=>'http://'+x)"
                        :initial-index="index"
              >
              </el-image>
            </div>
          </div>



<!--        <el-row style="margin: 30px 0 0 60px;">-->
<!--          <el-col v-for="(item,index) in showList2" :span="24" :key="index">-->
<!--            &lt;!&ndash;                  <div :id=item.id :class="istrue?'block3':'block2'" @click="istrue=!istrue">&ndash;&gt;-->
<!--            <el-image :src="`http://${item}`"-->
<!--                      :preview-src-list="showList2.map(x=>'http://'+x)"-->
<!--                      :initial-index="index"-->
<!--                      :fit="'scale-down'"-->
<!--            >-->
<!--            </el-image>-->
<!--          </el-col>-->
<!--        </el-row>-->


<!--        <div style="margin: 20px 0 20px 0;">-->
<!--          <label style="font-size:40px; color: white; border: 0; margin: 0 0 0 460px; font-family: 'FZShuTi'">概念选择</label>-->
<!--        </div>-->
          <div style="margin: 20px 0 20px 0; text-align: center; ">
            <label style="font-size:35px; color: black; border: 0;">4. Chosen Concepts</label>
          </div>



          <div style="display: flex; justify-content: center;">
            <div v-for="(item,index) in showList">
              <el-image :src="`http://${item}`"
                        :fit="'fill'"
                        :preview-src-list="showList.map(x=>'http://'+x)"
                        :initial-index="index"
              >
              </el-image>
            </div>
          </div>

<!--        <el-row style="margin: 30px 0 0 60px;">-->
<!--          <el-col v-for="(item,index) in showList" :span="24" :key="index">-->
<!--            &lt;!&ndash;                  <div :id=item.id :class="istrue?'block3':'block2'" @click="istrue=!istrue">&ndash;&gt;-->
<!--              <el-image :src="`http://${item}`"-->
<!--                        :preview-src-list="showList.map(x=>'http://'+x)"-->
<!--                        :initial-index="index"-->
<!--                        :fit="'scale-down'"-->
<!--              >-->
<!--              </el-image>-->
<!--          </el-col>-->
<!--        </el-row>-->


          <div style="margin: 20px 0 20px 0; text-align: center; ">
            <label style="font-size:35px; color: black; border: 0;">5. TCVA scores</label>
          </div>

<!--        <div style="margin: 0 0 20px 0;">-->
<!--          <label style="font-size:40px; color: white; border: 0; margin: 0 0 0 440px; font-family: 'FZShuTi'">TCVA分数</label>-->
<!--        </div>-->

          <div style="display: flex; justify-content: center;">
            <div v-for="(item,index) in showList3">
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

<!--        <el-row style="margin: 30px 0 0 60px;">-->
<!--          <el-col v-for="(item,index) in showList3" :span="24" :key="index">-->
<!--            &lt;!&ndash;                  <div :id=item.id :class="istrue?'block3':'block2'" @click="istrue=!istrue">&ndash;&gt;-->
<!--            <el-image :src="`http://${item}`"-->
<!--                      :preview-src-list="showList3.map(x=>'http://'+x)"-->
<!--                      :initial-index="index"-->
<!--                      :fit="'scale-down'"-->
<!--                      @error="error_img[index] = true"-->
<!--                      @load="error_img[index] = false"-->
<!--            >-->
<!--            </el-image>-->
<!--            <div v-show="error_img[index]" class="demo-image__error">-->
<!--              <div class="block">-->
<!--                <el-image>-->
<!--                  <template #error>-->
<!--                    <div class="image-slot">-->
<!--                      遗憾！算法未能成功执行-->
<!--                      <br>-->
<!--                      可能是由于服务器算力不足、程序出错或其他原因-->
<!--                      <br>-->
<!--                      服务器当前可用最大算力：{{memory}}，位于GPU {{gpu}}上-->
<!--                      <br>请稍后再试-->
<!--                    </div>-->
<!--                  </template>-->
<!--                </el-image>-->
<!--              </div>-->
<!--            </div>-->




<!--          </el-col>-->
<!--        </el-row>-->
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
const gpu = ref('')
const memory = ref('')
const error_img = ref([false, false])
const chosen = ref([])
let resultLoading = ref(false)
let resultShow = ref(false)

const GroundTruth = ref('')
const Predicted = ref('')
const Probability = ref('')

const chosenEnhanceAlgorithm = ref('')
const chosenStitchingAlgorithm = ref('')
const store = useStore();
const listPage = ref(1), imageNumber = ref(8);
const fileList = ref([]), datasetInformation = ref({}), fileList2 = ref([]);
let selectList = Array(imageNumber.value).fill(0);
let deleteShow = ref(false);
const showList = ref([]), showList2 = ref([]), showList3 = ref([]), listPreview = ref([]), showListPool = ref([]), listPreview2 = ref([]);
const ConceptPool = ref([]), conceptFileList = ref([]), conceptPreview = ref([]);
const ConceptPool_page_size = 3;
let ConceptPool_current_page = ref(5);
const radio = ref(['none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none',
  'none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none']);
const concept_re = ref('')
// 47

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

async function RefreshConcepts(){  //图像池的刷新
  await getConcepts();
  updateConceptList();
}

async function getImgPoolInfos(option){
  let requestUrl = "/dataset/" + option, requestData = {};
  requestData["datasetId"] = 10002;
  await request.post(requestUrl, requestData)
      .then((res) => {
        console.log(res.data);

        if (res.status === 200) {
          chosen.value[0] = res.data.data[0]
          fileList2.value = (res.data.data);
        } else {
          console.log("err request");
        }
      })
      .catch((err) => {
        console.log(err);
      });
}

async function getConcepts(){
  let requestUrl = "/dataset/getConcepts", requestData = {};
  requestData["datasetId"] = 20001;
  await request.post(requestUrl, requestData)
      .then((res) => {
        // console.log("res.data: ", res.data);
        if (res.status === 200) {
          conceptFileList.value = res.data.data;
          // console.log("request success!");
          // fileList2.value = (res.data.data);
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

const updateConceptList = () => {
  ConceptPool.value = conceptFileList.value
  console.log("ConceptPool.value", ConceptPool.value);
  // listPreview2.value = (showListPool.value.map((e) => {
  //   return "http://" + e;
  // }));
  // console.log("listPreview2.value", listPreview2.value)
};

function refreshCifar(){  //懒得改名字了~
  realRefreshImages("getPool");
  activate.value = -1;
  // let last_d = document.getElementById(last_id.value.toString()) //对应被注释掉的那种写法
  // last_d.style.border = "2px solid white";
  // last_id.value == 666
}

function refreshConcept(){
  RefreshConcepts();
}

realRefreshImages("getPool");
RefreshConcepts();

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
  const title_2 = document.getElementById("title-2");
  if(title_2!==null)
    title_2.scrollIntoView()
}

const forceRerender = () => {
  console.log(componentKey.value)
  componentKey.value += 1;

};

async function startRecognize() {
  console.log("start Recognize")
  concept_re.value = ''
  for(let i=0; i<47; i++){
    if(radio.value[i]!="none"){
      concept_re.value += (radio.value[i]+"_");
    }
  }
  console.log("concept_re.value: ", concept_re.value)
  if(!concept_re.value){
    ElMessage.error('请至少选择一个概念');
    return
  }
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
    datasetName: "TCAV",
    modelName: concept_re.value,
    userName: chosenImg.value,
    // userName: store.state.username,
  })
      .then((response)=>{
        console.log("response", response)
        showList.value[0] = (response.data.data.result[0]);
        showList2.value[0] = (response.data.data.result[1]);
        showList3.value[0] = (response.data.data.result[2]);
        console.log("showList.value:", showList.value)
        console.log("showList2.value:", showList2.value)
        console.log("showList3.value:", showList3.value)
      })
      .catch((error)=>{
        console.error(error)
      })
  for(let i=0; i<47; i++){
    if(radio.value[i]!="none"){
      radio.value[i] = "none";
    }
  }

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

  // showList.value = fileList.value
  //
  // console.log("showList.value", showList.value);
  // listPreview.value = (showList.value.map((e) => {
  //   return "http://" + e;
  // }));
  // console.log("listPreview.value", listPreview.value)
}
</script>

<style>
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
.data{
  text-align: center;
  margin: 20px;
}
.m-1{
  text-align: center;
  margin-right: 350px;
  background-color: #007B00;
  border-color: #000000
}
.m-2{
  text-align: center;
  margin: 0 20px;
  border-color: #000000;
}
.m-3{
  text-align: center;
  margin-left: 430px;
  background-color: #9B591E;
  border-color: #000000;
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
.block2 {
  padding: 0;
  text-align: center;
  width: 114px;
  height: 114px;
  /*border: solid 2px var(--el-border-color);*/
  border: 2px solid white;
  /*display: inline-block;*/
  /*width: 19%;*/
  /*float: left;*/
  cursor:pointer;
  /*box-sizing: border-box;*/
  /*vertical-align: top;*/
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
