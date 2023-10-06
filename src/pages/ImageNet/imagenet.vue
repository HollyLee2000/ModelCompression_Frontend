<template>

    <el-container v-loading="resultLoading">
      <el-aside style="background-color: white; width: 50%; padding: 20px; ">
        <div style="margin: 0 0 20px 0; text-align: center;">
          <label style="font-size:35px; border: 0; color: black; ">1. Choose an Image or Upload an Image</label>
        </div>
<!--        <div style="border: 3px solid black;">-->
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
<!--        </div>-->
        <div class="holly-data">
          <el-button size="large" type="primary"  @click="refreshCifar" plain>Refresh Image Pool</el-button>
          <el-button @click="uploadShow=true" size="large" type="warning"  plain>Upload Your Image</el-button>
        </div>

      </el-aside>

      <el-main style="background-color: white">
        <div style="margin: 20px 0 0 0; text-align: center; ">
          <label style="font-size:35px; color: black; border: 0;">Target Image</label>
        </div>
        <div style="display: flex; justify-content: center; ">
          <div style="margin: 30px 0; width: 80%; ">
            <el-image :src="`http://${chosen}`"
                      :fit="'fill'"
                      :style="'width: 100%;'"
                      :key="componentKey"
                      @click="chooseImg($event)"
            >
            </el-image>
          </div>
        </div>
        <div style="margin: 20px 0 40px 0; text-align: center; ">
          <label style="font-size:35px; color: black; border: 0;">2. Choose a Model and an Algorithm</label>
        </div>
        <div class="holly-detect">
          <el-select v-model="chosenModel"  placeholder="Choose a Model" size="large">
            <el-option key="6" label="ResNet18" value="ResNet18" />
          </el-select>
          <el-select  v-model="chosenAlgorithm" placeholder="Choose an Algorithm" size="large">
            <el-option key="6" label="Integrated Gradients (IG)" value="IG" />
            <el-option key="6" label="IG with noise tunnel" value="IG_with_noise_tunnel" />
            <el-option key="6" label="GradientShap" value="GradientShap" />
            <el-option key="6" label="Occlusion" value="Occlusion" />
            <el-option key="6" label="Occlusion with a larger sliding window" value="Occlusion_using_larger_sliding_window" />
          </el-select>
          <el-button size="large" type="success" @click="startRecognize" plain>Inference</el-button>
        </div>
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
          <div style="margin: 20px 0 20px 0; text-align: center;">
            <label style="font-size:35px; color: black; border: 0; ">4. Attribution map</label>
          </div>
          <div style="display: flex; justify-content: center;">
            <div v-for="(item,index) in showList" style="margin: 30px 0;">
              <el-image :src="`http://${item}`"
                        :fit="'fill'"
                        :preview-src-list="showList.map(x=>'http://'+x)"
                        :initial-index="index"
                        @error="infoFailure()"
                        @load="infoSuccess()"
              />

<!--              <div v-show="error_img[index]" class="demo-image__error">-->
<!--&lt;!&ndash;                <div class="error_block">&ndash;&gt;-->
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
<!--&lt;!&ndash;                </div>&ndash;&gt;-->
<!--              </div>-->
            </div>
          </div>
        </div>
      </el-main>



      <el-dialog v-model="uploadShow">
          <el-upload
              ref="uploadRef"
              method="post"
              action="#"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-change="handleChange"
              :auto-upload="false"
              :limit="1"
              :show-file-list="uploadFileList.length === 1"
              :file-list="uploadFileList"
          >
            <template #trigger>
              <el-icon v-if="uploadFileList.length === 0">
                <Plus/>
              </el-icon>
              <div v-else>
                Upload only one <br> image at a time
              </div>
            </template>
          </el-upload>




        <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="uploadShow = false">Cancel</el-button>
        <el-button type="success" @click="submitUpload">Upload</el-button>
      </span>
        </template>
      </el-dialog>
      <el-dialog v-model="dialogVisible">
        <img :src="dialogImageUrl" alt="Preview Image"/>
      </el-dialog>
      <el-backtop :right="100" :bottom="100"/>
    </el-container>

</template>

<script lang="ts" setup>

import {Plus, Chicken} from "@element-plus/icons-vue";
// import axios from "axios";
import {defineEmits} from "vue";
import {UploadInstance, UploadProps} from "element-plus/es";
// import {useStore} from "vuex";
const emits=defineEmits(['updateFileList'])
// const store = useStore();
const uploadShow = ref(false);
const uploadFileList = ref([]);
const uploadRef = ref<UploadInstance>();
const dialogImageUrl = ref("");
const dialogVisible = ref(false);



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
        console.log("res.data: ", res.data);

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


function infoFailure(){
  const messageOptions = {
    message: 'The algorithm failed to execute successfully, ' +
        'possibly due to insufficient computing power, internal errors, or other reasons. ' +
        'The maximum available computing power on the server is ' + memory.value + ', located on GPU ' + gpu.value + '. Please try again later.',
    duration: 10000  // 设置延迟时间为5秒
  };
  ElMessage.error(messageOptions)
  return
}

function infoSuccess(){
  ElMessage.success('The algorithm executed successfully!')
  return
}






const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
  // console.log(uploadFileList);
  // const index=uploadFileList.value.findIndex((e)=>{return e===uploadFile})
  console.log(uploadFile, uploadFiles);
};
const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
  // console.log("dialogImageUrl.value: ", dialogImageUrl.value)
};
const handleChange: UploadProps["onChange"] = (file, fileList) => {
  uploadFileList.value = fileList;
};
async function submitUpload(){
  let param = new FormData();
  console.log("uploadFileList: ", uploadFileList);
  uploadFileList.value.forEach(
      (val, index) => {
        param.append("pictures", val.raw);
        console.log("test", val.raw);
      }
  );
  console.log("datasetId: ", store.state.datasetId);
  param.append("datasetId", store.state.datasetId);
  let config = {
    baseURL: "/api",
    //baseURL: "http://localhost:7667",
    timeout: 30000,
    headers: {
      "Content-Type": "multipart/form-data" //设置headers
    }
  };
  console.log("param: ", param);
  await axios
      .post("/data/uploadPictures", param, config)
      .then(res => {
        console.log("res: ", res);
        if (res.status === 200) {
          console.log("yes");
          uploadRef.value.clearFiles();
          uploadFileList.value = [];
          chosen.value[0] = res.data.data.imgpath;
          console.log("chosen: ", chosen.value);
          let arr = chosen.value[0].split("/")
          chosenImg.value = arr[arr.length - 1]
          console.log("图片名称", chosenImg.value)
        }
      })
      .catch(err => {
        console.log(err);
      });
  console.log("uploadFileList: ", uploadFileList);
  emits('updateFileList','getDatasetInfo')
  uploadShow.value = false;
  // fileList= fileList.concat(file)
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
  border: 2px solid white;
  cursor:pointer;
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
