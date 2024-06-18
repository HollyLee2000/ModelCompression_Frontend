<template style="text-align: center">
  <div class="datasetPreview">
    <h1>用户可见数据集概览</h1>
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
    <el-button class="forSearch" style="height: 40px;" @click="dialogFormVisible = true" type="success" >添加数据集</el-button>
    <el-dialog v-model="dialogFormVisible" title="添加数据集">
      <el-form :model="form">
        <el-form-item label="数据集名称">
          <el-input v-model="form.datasetName" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="公共的">
          <el-checkbox v-model="form.public"></el-checkbox>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input disabled :placeholder="form.username"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="createDataset">确定</el-button>
      </span>
      </template>
    </el-dialog>
    <!--  <el-button @click="getDataset('getPublicDatasets')">click</el-button>-->
    <!--  <router-link :to="{name:'datasetInDetail'}">go</router-link>-->

    <!--    <el-row style="margin: 30px 0 0 0px;">-->
    <!--      <el-col v-if='refreshShowDataset' v-for="(item,index) in showList" :span="24">-->
    <!--        &lt;!&ndash;                  <div :id=item.id :class="istrue?'block3':'block2'" @click="istrue=!istrue">&ndash;&gt;-->
    <!--        <image-previewer :imgList="pictureShowList[Number(index)]"-->
    <!--                         :datasetName="item.datasetName"-->
    <!--                         :datasetId="item.datasetId.toString()"-->
    <!--                         :datasetIndex="index"-->
    <!--                         @datasetInDetail="inDetail"-->
    <!--                         @deleteDataset="deleteData"-->
    <!--                         @modifyDatasetName="modifyName"-->
    <!--        />-->
    <!--      </el-col>-->
    <!--    </el-row>-->
    <div class="previewer" v-if='refreshShowDataset' v-for="(item,index) in showList" style="margin-bottom: 30px">
      <el-row>
        <el-col :span="4"/>
        <el-col :span="16">
          <image-previewer :imgList="pictureShowList[Number(index)]"
                           :datasetName="item.datasetName"
                           :datasetId="item.datasetId.toString()"
                           :datasetIndex="index"
                           @datasetInDetail="inDetail"
                           @deleteDataset="deleteData"
                           @modifyDatasetName="modifyName"
          />
        </el-col>
        <el-col :span="4"/>
      </el-row>
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

</template>

<script setup lang="ts">
import ImagePreviewer from "./components/imagePreviewer.vue";
import {router} from '@/router'
import {useStore} from "vuex";
import {reactive, toRefs, ref} from "vue";
import request from "../../api/index";
import {Search} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";

const store = useStore();
const user = store.state.username;
const dialogFormVisible = ref(false);
const form = reactive({
  datasetName: "",
  public: true,
  username: user
});
const refreshShowDataset=ref(true)
const nowPage = ref(1), datasetNumber = ref(3);
const showList = ref([]),pictureShowList=ref([]);
const CifarList = ref([]), ImageNetList = ref([]), vocList = ref([]), cocoList = ref([]), fileList = ref([]);
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

async function getVisibleDataset(option){
  let requestUrl = "/dataset/" + option, requestData = {};
  requestData["username"] = user;
  console.log("请求用户图像指令：", requestUrl)
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
// getDataset("getPublicDatasets");


function updateShowList() {
  showList.value = datasetInfoList.value.slice((nowPage.value - 1) * datasetNumber.value,
      Math.min(datasetInfoList.value.length, nowPage.value * datasetNumber.value)
  );
  pictureShowList.value = pictureDataInfosList.value.slice((nowPage.value - 1) * datasetNumber.value,
      Math.min(pictureDataInfosList.value.length, nowPage.value * datasetNumber.value)
  );
  refreshShowDataset.value=false;
  setTimeout(()=>{
    refreshShowDataset.value=true
  },50)
  console.log(nowPage.value,datasetNumber.value,datasetInfoList.value.length)
  // console.log("showList: ", showList);
  // console.log("pictureShowList: ", pictureShowList);
}

const inDetail = (datasetId) => {
  console.log(datasetId);
  store.commit("modifyDatasetId", Number(datasetId));
  // store.commit("modifyImageList", );
  // console.log();
  router.push("datasetInDetail");
};

const modifyName=(req)=>{
  const index=(nowPage.value-1)*datasetNumber.value+req[0],newName=req[1];
  datasetInfoList.value[index].datasetName=newName
  console.log(req)
}

async function deleteData(datasetId) {
  console.log(datasetId);
  await request.post("/dataset/deleteDataset", {datasetId: datasetId})
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  await getDataset("getPublicDatasets");
}

async function createDataset() {
  console.log(form);
  await request.post("/dataset/createDataset", form)
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          console.log("yes!");
          dialogFormVisible.value = false;
          inDetail(res.data.data.datasetInfo.datasetId);
        }
      })
      .catch(err => {
        console.log(err);
      });
}
</script>

<style scoped>
/*.demo-image .block {*/
/*  padding: 30px 0;*/
/*  text-align: center;*/
/*  border: solid 1px var(--el-border-color);*/
/*  display: inline-block;*/
/*  width: 10%;*/
/*  box-sizing: border-box;*/
/*  vertical-align: top;*/
/*}*/
.previewer{
  display: flex;
  flex-direction: column;
}
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
.datasetPreview {
  text-align: center;
}
.demo-image{
  /*background: url("http://pruning.vipazoo.cn/api/img/background/background_preview.jpg") no-repeat 0% 20%/ cover;*/
  background: linear-gradient(transparent, #E7E7E7 100%);
}
.forSearch {
  margin: 10px;
  display: inline-block;
}

</style>