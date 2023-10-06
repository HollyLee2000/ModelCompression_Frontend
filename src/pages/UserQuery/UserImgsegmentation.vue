<template>

  <el-container>
    <el-aside style="background-color: white; width: 50%; padding: 20px">
      <div v-if='ispreview' style="text-align: center">
        <div style="margin: 20px 0 40px 0; text-align: center; ">
          <label style="font-size:35px; color: black; border: 0;">1. Select a Dataset Visible to You</label>
        </div>
        <div class="search">
          <el-select v-model="searchOption" class="forSearch" placeholder="Select" size="large">
            <el-option
                v-for="item in optionList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
          <div class="forSearch" >
            <el-input @keyup.enter="getDataset(searchOption)" v-model="searchContent" style="width:150px; height: 40px"/>
            <el-button @click="getDataset(searchOption)" style="height: 40px;">
              <el-icon>
                <search/>
              </el-icon>
            </el-button>
          </div>
        </div>
        <div class="previewer" v-for="(item,index) in showList">
          <userimg-previewer :imgList="pictureShowList[Number(index)]"
                               :datasetName="item.datasetName"
                               :datasetId="item.datasetId.toString()"
                               :datasetIndex="index"
                               @datasetInDetail="inDetail"
          />
          <br/>
        </div>
        <el-pagination
            v-model:current-page="nowPage"
            :page-size="datasetNumber"
            :pager-count="7"
            layout="prev, pager, next"
            :total="Number(`${datasetInfoList.length}`)"
            hide-on-single-page
            @current-change="updateShowList"
            style="padding-left: 45%"
        />
      </div>

      <div v-else>

        <div style="margin: 20px 0 40px 0; text-align: center; ">
          <label style="font-size:35px; color: black; border: 0;">2. Select an Image to Explore</label>
        </div>

        <div style="display: flex; justify-content: center;">
          <div style="margin: 30px 0; width: 80%;">
            <el-image :src="`http://${chosen}`"
                      :fit="'fill'"
                      :style="'width: 100%;'"
                      @click="chooseImg($event)"
            >
            </el-image>
          </div>
        </div>
        <el-button @click="backPreview" type="primary" plain style="margin: 20px 0;">返回数据集预览</el-button>

        <el-row>
          <el-col v-for="(item,index) in showList2" :span="6" :key="index">
            <!--                  <div :id=item.id :class="istrue?'block3':'block2'" @click="istrue=!istrue">-->
            <!--                  <div :id=index class="block2" @click="changeColor($event)">-->
            <div :id=index class="userqueryblock" @click="activate = index" :style="{border: activate === index ? '2px solid red' : '2px solid white'}">
              <el-image :src="`http://${item.pictureUrl}`"
                        style="width: 100%; height: 100%"
                        :initial-index="index"
                        :fit="'fill'"
                        @click="chooseImg($event)"
              >
              </el-image>
            </div>
          </el-col>
        </el-row>
        <el-pagination
            v-model:current-page="listPage"
            :page-size="imageNumber"
            :pager-count="7"
            layout="prev, pager, next"
            :total="Number(`${fileList.length}`)"
            @current-change="updateShowList2"
            hide-on-single-page
            style="padding-left: 45%"
        />



<!--        <el-button @click="backPreview" type="primary">返回数据集预览</el-button>-->
      </div>
    </el-aside>




    <el-main style="background-color: white" v-loading="resultLoading">
      <div style="margin: 20px 0 20px 0; text-align: center; ">
        <label style="font-size:35px; color: black; border: 0;">2. Choose Model, Algorithm and Segmentation Part</label>
      </div>

      <div class="holly-detect-3">
        <el-select v-model="chosenModel" placeholder="请选择神经网络模型" size="large">
          <el-option key="6" label="FCN_ResNet101" value="FCN_ResNet101" />
        </el-select>
        <el-select  v-model="chosenAlgorithm" placeholder="请选择推理算法" size="large">
          <el-option key="6" label="Feature Ablation" value="Feature_Ablation" />
          <el-option key="6" label="Layer GradCAM" value="LayerGradCAM" />
        </el-select>
        <el-select  v-model="chosenMask" placeholder="请选择分割部分" size="large">
          <el-option key="6" label="aeroplane" value="1" />
          <el-option key="6" label="bicycle" value="2" />
          <el-option key="6" label="bird" value="3" />
          <el-option key="6" label="boat" value="4" />
          <el-option key="6" label="bottle" value="5" />
          <el-option key="6" label="bus" value="6" />
          <el-option key="6" label="car" value="7" />
          <el-option key="6" label="cat" value="8" />
          <el-option key="6" label="chair" value="9" />
          <el-option key="6" label="cow" value="10" />
          <el-option key="6" label="dining table" value="11" />
          <el-option key="6" label="dog" value="12" />
          <el-option key="6" label="horse" value="13" />
          <el-option key="6" label="motorbike" value="14" />
          <el-option key="6" label="person" value="15" />
          <el-option key="6" label="potted plant" value="16" />
          <el-option key="6" label="sheep" value="17" />
          <el-option key="6" label="sofa" value="18" />
          <el-option key="6" label="train" value="19" />
          <el-option key="6" label="tv/monitor" value="20" />
        </el-select>
        <el-button size="large" type="success" @click="startRecognize" plain>开始推理</el-button>
      </div>


      <div :style="{visibility:resultShow?'visible':'hidden'}" >
      <div style="margin: 20px 0 20px 0; text-align: center;">
        <label style="font-size:35px; border: 0; color: black; ">3. Segementation Result</label>
      </div>
      <div style="display: flex; justify-content: center;">
        <div v-for="(item,index) in segmentationList" style="margin: 30px 0;">
          <el-image :src="`http://${item}`"
                    :fit="'fill'"
                    :preview-src-list="segmentationPreview"
                    :initial-index="index"
          >
          </el-image>
        </div>
      </div>

<!--      <div style="margin: 20px 0 20px 0;">-->
<!--        <label style="font-size:40px; color: white; border: 0; margin: 0 0 0 400px; font-family: 'FZShuTi'">语义分割结果</label>-->
<!--      </div>-->
<!--      <el-row style="margin: 30px 0 0 0px;">-->
<!--        <el-col v-for="(item,index) in segmentationList" :span="12" :key="index">-->
<!--          &lt;!&ndash;                  <div :id=item.id :class="istrue?'block3':'block2'" @click="istrue=!istrue">&ndash;&gt;-->
<!--          <el-image :src="`http://${item}`"-->
<!--                    :preview-src-list="segmentationPreview"-->
<!--                    :initial-index="index"-->
<!--                    :fit="'scale-down'"-->
<!--          >-->
<!--          </el-image>-->
<!--        </el-col>-->
<!--      </el-row>-->


      <div style="margin: 20px 0 20px 0; text-align: center;">
        <label style="font-size:35px; border: 0; color: black; ">4. Attribution Map</label>
      </div>

      <div style="display: flex; justify-content: center;">
        <div v-for="(item,index) in showList3" style="margin: 30px 0;">
          <el-image :src="`http://${item}`"
                    :fit="'fill'"
                    :preview-src-list="listPreview3"
                    :initial-index="index"
          >
          </el-image>
        </div>
      </div>

<!--      <div style="margin: 20px 0 20px 0;">-->
<!--        <label style="font-size:40px; color: white; border: 0; margin: 0 0 0 445px; font-family: 'FZShuTi'">归因结果</label>-->
<!--      </div>-->
<!--      <el-row style="margin: 30px 0 0 0;">-->
<!--        <el-col v-for="(item,index) in showList3" :span="12" :key="index">-->
<!--          &lt;!&ndash;                  <div :id=item.id :class="istrue?'block3':'block2'" @click="istrue=!istrue">&ndash;&gt;-->
<!--          <el-image :src="`http://${item}`"-->
<!--                    :preview-src-list="listPreview3"-->
<!--                    :initial-index="index"-->
<!--                    :fit="'scale-down'"-->
<!--          >-->
<!--          </el-image>-->
<!--        </el-col>-->
<!--      </el-row>-->

      <div style="display: flex; justify-content: center;">
        <div style="margin: 30px 0; width: 100%;">
          <el-image :src="`http://${showList4[0]}`"
                    :fit="'fill'"
                    :preview-src-list="listPreview4"
                    :style="'width: 100%;'"
          >
          </el-image>
        </div>
      </div>


<!--      <el-row style="margin: 30px 0 0 140px;">-->
<!--        <el-col v-for="(item,index) in showList4" :span="24" :key="index">-->
<!--          &lt;!&ndash;                  <div :id=item.id :class="istrue?'block3':'block2'" @click="istrue=!istrue">&ndash;&gt;-->
<!--          <el-image :src="`http://${item}`"-->
<!--                    :preview-src-list="listPreview4"-->
<!--                    :initial-index="index"-->
<!--                    :fit="'scale-down'"-->
<!--          >-->
<!--          </el-image>-->
<!--        </el-col>-->
<!--      </el-row>-->
      </div>
    </el-main>
  </el-container>

</template>

<script lang="ts" setup>
import UserimgPreviewer from "@/pages/UserQuery/components/UserimgPreviewer.vue";
import {router} from '@/router'
import {useStore} from "vuex";
import {reactive, toRefs, ref} from "vue";
import request from "../../api/index";
import {Search} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";


const GroundTruth = ref('')
const Predicted = ref('')
const Probability = ref('')
const segmentationList = ref([])
const segmentationPreview = ref([]);
const chosen = ref([])
let resultLoading = ref(false)
let resultShow = ref(false)

const store = useStore();
const user = store.state.username;
const activate = ref(-1)
const chosenImg = ref('')
const chosenModel = ref('')
const chosenAlgorithm = ref('')
const chosenMask = ref('')
const userQuery = ref('')
const dialogFormVisible = ref(false);
const form = reactive({
  datasetName: "",
  public: true,
  username: user
});
const ispreview = ref(true)
// const refreshShowDataset=ref(true)
const nowPage = ref(1), datasetNumber = ref(3);
const showList = ref([]), showList2 = ref([]), showList3 = ref([]), showList4 = ref([]), pictureShowList=ref([]);
const searchOption = ref("getUserDatasets"), searchContent = ref("");
const optionList = [
  {
    value: "blurredFindDatasetByName",
    label: "数据集名称(模糊搜索)"
  }, {
    value: "getUserDatasets",
    label: "用户名(精确搜索)"
  }
];
const pictureDataInfosList = ref([]),datasetInfoList = ref([]);

const listPage = ref(1), imageNumber = ref(16);
const fileList = ref([]), datasetInformation = ref({}), segmentationfileList = ref([]);
let selectList = Array(imageNumber.value).fill(0);
let deleteShow = ref(false);
const showListre = ref([]), showList2re = ref([]), listPreviewre = ref([]), listPreview3 = ref([]), listPreview4 = ref([]), listPreview2re = ref([]);

async function getDataset(option: string) {
  if (searchContent.value === "") option = "getVisibleDataset";
  let requestUrl = "/dataset/" + option, requestData = {};
  if (option === "getVisibleDataset") {
    requestData["username"] = user;
  } else if (option === "blurredFindDatasetByName") {
    requestData["datasetName"] = searchContent.value;
    requestData["username"] = user;
  } else if (option === "getUserDatasets") {
    requestData["username"] = user;
    requestData["searchname"] = searchContent.value;
  } else {
    console.log("err request!!!!!!!!");
  }
  console.log(requestUrl, requestData);
  await request.post(requestUrl, requestData)
      .then(res => {
        // console.log(res.data.data[0].pictureDataInfos[0].pictureUrl);
        console.log(res.data);
        datasetInfoList.value.length = 0;
        pictureDataInfosList.value.length = 0;
        console.log(res.data.data);
        if (res.data.data !== null && res.data.data.length !== 0) {
          for (let {datasetInfo, pictureDataInfos} of res.data.data) {
            console.log(datasetInfo, "ssss", pictureDataInfos.length);
            const temp1 = pictureDataInfos.slice(0, Math.min(pictureDataInfos.length, 3));
            datasetInfoList.value.push(datasetInfo);
            pictureDataInfosList.value.push(temp1);
          }
        } else {
          alert("未找到符合条件的数据集！");
        }
      });
  updateShowList();
}

//这些是预览的js
async function getVisibleDataset(option){
  let requestUrl = "/dataset/" + option, requestData = {};
  requestData["username"] = user;
  await request.post(requestUrl, requestData)
      .then(res => {
        // console.log(res.data.data[0].pictureDataInfos[0].pictureUrl);
        console.log(res.data);
        datasetInfoList.value.length = 0;
        pictureDataInfosList.value.length = 0;
        console.log(res.data.data);
        if(res.data.data!== null && res.data.data.length!== 0) {
          for (let {datasetInfo, pictureDataInfos} of res.data.data) {
            console.log(datasetInfo, "ssss", pictureDataInfos.length);
            const temp1 = pictureDataInfos.slice(0, Math.min(pictureDataInfos.length, 3))
            datasetInfoList.value.push(datasetInfo);
            pictureDataInfosList.value.push(temp1);
          }
        }else{
          ElMessage.error("未找到符合条件的数据集！")
        }
      });
  console.log("datasetInfoList: ", datasetInfoList);
  console.log("pictureDataInfosList: ", pictureDataInfosList);
  updateShowList()
}

// getDataset("getPublicDatasets");
getVisibleDataset("getVisibleDataset");



function updateShowList() {
  showList.value = datasetInfoList.value.slice((nowPage.value - 1) * datasetNumber.value,
      Math.min(datasetInfoList.value.length, nowPage.value * datasetNumber.value)
  );
  pictureShowList.value = pictureDataInfosList.value.slice((nowPage.value - 1) * datasetNumber.value,
      Math.min(pictureDataInfosList.value.length, nowPage.value * datasetNumber.value)
  );
  ispreview.value=false;
  setTimeout(()=>{
    ispreview.value=true
  },50)
  console.log(nowPage.value,datasetNumber.value,datasetInfoList.value.length)
  // console.log("showList: ", showList);
  // console.log("pictureShowList: ", pictureShowList);
}

//这个是detail的js
const inDetail = (datasetId) => {
  console.log(datasetId);
  store.commit("modifyDatasetId", Number(datasetId));
  // router.push("datasetInDetail");
  listPage.value = 1;
  refreshImages("getDatasetInfo");  //在指定的毫秒后调用函数
  setTimeout(()=>{
    ispreview.value = false;
  },100)
};

async function refreshImages(option) {
  // console.log(option);
  await getDatasetInfos(option);
  updateShowList2();
}

async function getDatasetInfos(option) {
  let requestUrl = "/dataset/" + option, requestData = {};
  requestData["datasetId"] = store.state.datasetId;
  await request.post(requestUrl, requestData)
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          // console.log(22222);
          let {datasetInfo, pictureDataInfos} = res.data.data;
          fileList.value = (pictureDataInfos);
          chosen.value[0] = fileList.value[0].pictureUrl;
          datasetInformation.value = (datasetInfo);
          // console.log(pictureDataInfos,datasetInfo)
          // console.log(fileList.value, datasetInformation.value);
        } else {
          console.log("err request");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  // console.log(2212432, fileList);
}

const updateShowList2 = () => {
  showList2.value = (fileList.value.slice((listPage.value - 1) * imageNumber.value,
      Math.min(fileList.value.length, listPage.value * imageNumber.value)));
  console.log("showList2.value", showList2.value);
  // listPreview.value = (showList2.value.map((e) => {
  //   return "http://" + e["pictureUrl"];
  // }));
  // // console.log("store.state.datasetId", store.state.datasetId)
  // console.log("listPreview.value", listPreview.value)
};

//返回数据集预览
const backPreview = () => {
  nowPage.value = 1
  updateShowList();  //在指定的毫秒后调用函数
  setTimeout(()=>{
    ispreview.value = true;
  },50)
}

function chooseImg($event) {
  console.log("$event", $event)
  console.log("$event.srcElement.currentSrc", $event.srcElement.currentSrc)
  let arr = $event.srcElement.currentSrc.split("/")
  chosenImg.value = arr[arr.length - 1]
  chosen.value[0] = $event.srcElement.currentSrc.substring(7);
  console.log("图片名称", chosenImg.value)
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
    datasetName: "COCO_user",
    modelName: chosenMask.value,
    userName: chosenImg.value,
    // userName: store.state.username,
  })
      .then((response)=>{
        showList3.value = []
        showList4.value = []
        console.log("response", response)
        fileList.value[0] = (response.data.data.result[0]);  //原图像
        fileList.value[1] = (response.data.data.result[3]); //归因图像
        fileList.value[2] = (response.data.data.result[4]); //归因图像
        fileList.value[3] = (response.data.data.result[5]);
        console.log("fileList.value[2]", fileList.value[2])
        segmentationfileList.value[0] = (response.data.data.result[0]); //原图像
        // segmentationfileList.value[1] = (response.data.data.result[1]);  //分割标签图像
        segmentationfileList.value[1] = (response.data.data.result[2]);  //分割结果图像
        // segmentationList.value[0] = (response.data.data.result[4]);
        // segmentationList.value[1] = (response.data.data.result[6]);
        // GroundTruth.value = response.data.data.result[1];
        // Predicted.value = response.data.data.result[2];
        // Probability.value = response.data.data.result[3].slice(12,18) + "%";
        //
        // Predicted2.value = response.data.data.result[7];
        // Probability2.value = response.data.data.result[8].slice(12,18) + "%";
        // Predicted3.value = response.data.data.result[10];
        // Probability3.value = response.data.data.result[11].slice(12,18) + "%";
        // Predicted4.value = response.data.data.result[13];
        // Probability4.value = response.data.data.result[14].slice(12,18) + "%";
        // Predicted5.value = response.data.data.result[16];
        // Probability5.value = response.data.data.result[17].slice(12,18) + "%";

        //
        // fileList.value[2] = (response.data.data.result[9]);
        // fileList.value[3] = (response.data.data.result[12]);
        // fileList.value[4] = (response.data.data.result[15]);
        // fileList.value[5] = (response.data.data.result[18]);
      })
      .catch((error)=>{
        console.error(error)
      })
  if(chosenAlgorithm.value == "LayerGradCAM"){
    showList3.value[0] = fileList.value[0]
    showList3.value[1] = fileList.value[1]
    showList4.value[0] = fileList.value[2]
  }else if(chosenAlgorithm.value == "Feature_Ablation"){
    showList3.value[0] = fileList.value[0]
    showList3.value[1] = fileList.value[1]
    showList3.value[2] = fileList.value[2]
    showList3.value[3] = fileList.value[3]
  }

  // showList2.value[1] = fileList.value[2]
  // showList3.value[0] = fileList.value[0]
  // showList3.value[1] = fileList.value[3]
  // showList4.value[0] = fileList.value[0]
  // showList4.value[1] = fileList.value[4]
  // showList5.value[0] = fileList.value[0]
  // showList5.value[1] = fileList.value[5]
  segmentationList.value = segmentationfileList.value


  console.log("showList3.value", showList3.value);
  listPreview3.value = (showList3.value.map((e) => {
    return "http://" + e;
  }));
  console.log("showList4.value", showList4.value);
  listPreview4.value = (showList4.value.map((e) => {
    return "http://" + e;
  }));
  // listPreview3.value = (showList3.value.map((e) => {
  //   return "http://" + e;
  // }));
  // listPreview4.value = (showList4.value.map((e) => {
  //   return "http://" + e;
  // }));
  // listPreview5.value = (showList5.value.map((e) => {
  //   return "http://" + e;
  // }));
  // console.log("listPreview.value", listPreview.value)
  segmentationPreview.value = (segmentationList.value.map((e) => {
    return "http://" + e;
  }));
  resultLoading.value = false
  resultShow.value = true
}

// async function startRecognize() {
//   console.log("start Recognize")
//
//   if(!chosenModel.value){
//     ElMessage.error('请选择要使用的模型')
//     return
//   }
//   if(!chosenAlgorithm.value){
//     ElMessage.error('请选择要使用的算法')
//     return
//   }
//   if(!chosenImg.value){
//     ElMessage.error('请选择要解释的图像')
//     return
//   }
//   if(!userQuery.value){
//     ElMessage.error('请输入你要问的问题')
//     return
//   }
//   // userQuery.value = userQuery.value.replace(" ", "_");
//   userQuery.value = userQuery.value.replace(/ /g, "_");
//
//   await request.post('/algorithm/callAlgorithm',{
//     algorithmName:chosenAlgorithm.value,
//     datasetId: 666,
//     datasetName: "Multimodal",
//     modelName: userQuery.value,
//     userName: chosenImg.value,
//     // userName: store.state.username,
//   })
//       .then((response)=>{
//         showListre.value[0] = response.data.data.result[1]
//         showList2re.value[0] = response.data.data.result[12]
//         GroundTruth.value = response.data.data.result[13].slice(0,5);
//         Predicted.value = response.data.data.result[14];
//         Probability.value = response.data.data.result[15];
//       })
//       .catch((error)=>{
//         console.error(error)
//       })
//
//
//   console.log("showListre.value", showListre.value);
//   listPreviewre.value = (showListre.value.map((e) => {
//     return "http://" + e;
//   }));
//   console.log("showList2re.value", showList2re.value);
//   listPreview2re.value = (showList2re.value.map((e) => {
//     return "http://" + e;
//   }));
//   // listPreview3.value = (showList3.value.map((e) => {
//   //   return "http://" + e;
//   // }));
//   // listPreview4.value = (showList4.value.map((e) => {
//   //   return "http://" + e;
//   // }));
//   // listPreview5.value = (showList5.value.map((e) => {
//   //   return "http://" + e;
//   // }));
//   // console.log("listPreview.value", listPreview.value)
// }
</script>

<style>
.search {
  /*padding: 30px 0;*/
  /*text-align: center;*/
  display: inline-block;
  /*box-sizing: border-box;*/
  /*vertical-align: top;*/
  /*margin: 20px;*/
  /*word-spacing: 20px;*/
  /*max-height: 10px;*/
}
.forSearch {
  margin: 10px;
  display: inline-block;
}
.previewer{
  display: flex;
  flex-direction: column;
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
.detectquery{
  text-align: left;
  margin: 20px 0;
}
.detect .el-select .el-input{
  width: 150px;
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
  margin-right: 20px;
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
.userqueryblock {
  padding: 0;
  text-align: center;
  width: 170px;
  height: 170px;
  /*border: solid 2px var(--el-border-color);*/
  border: 2px solid white;
  display: inline-block;
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
