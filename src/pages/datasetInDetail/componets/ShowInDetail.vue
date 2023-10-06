<template>
  <br>
  <data-upload
      @updateFileList="refreshImages('getDatasetInfo')"
  />
  <!--  <el-button @click="refreshImages('getDatasetInfo')">shuaxin</el-button>-->
  <el-button type="danger" v-if='deleteShow===false' @click="deleteClick">删除图片</el-button>
<!--  <el-button type="warning" @click="selectAll">全选</el-button>-->
  <el-button v-if="deleteShow" @click="selectAll">全选</el-button>
  <el-button v-if="deleteShow" @click="selectNone">全部取消</el-button>
  <el-button v-if="deleteShow" @click="deleteConfirm">确定</el-button>
  <el-button v-if="deleteShow" @click="deleteCancel">取消</el-button>
  <div class="previewer" style="background: linear-gradient(transparent,#78E9E8 100%);">
    <el-row>
      <el-col :span="6"/>
      <el-col :span="12">
        <el-row>
          <el-col :span="6" v-for="(item,index) in showList">
            <div class="fixedpreview">
              <div class="fixedpreview2">
                <el-image
                    :src="`http://${item.pictureUrl}`"
                    :preview-src-list="listPreview"
                    :initial-index="index"
                    style="width: 100%; height: 100%"
                    :fit="'fill'"
                />
              </div>
            </div>
            <br>
            <el-checkbox :id="'el-checkbox-'+index" v-if="deleteShow" @change="selectChange(index)"/>
    <!--        <span class="demonstration">{{ item.pictureName }}</span>-->
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6"/>
    </el-row>
    <el-pagination
        v-model:current-page="listPage"
        :page-size="imageNumber"
        :pager-count="7"
        layout="prev, pager, next"
        :total="Number(`${fileList.length}`)"
        @current-change="updateShowList"
        hide-on-single-page
        style="padding-left: 45%"
    />
  </div>
<!--  <div v-for="(item,index) in showList" class="demo-image">-->
<!--    <div class="block">-->
<!--      <el-image :src="`http://${item.pictureUrl}`"-->
<!--                :preview-src-list="listPreview"-->
<!--                :initial-index="index"-->
<!--                class="image"-->
<!--                style="width: 95%;height: 85%"-->
<!--                :fit="'scale-down'"-->
<!--      >-->
<!--      </el-image>-->
<!--      <br>-->
<!--      <el-checkbox v-if="deleteShow" @change="selectChange(index)"/>-->
<!--      <span class="demonstration">{{ item.pictureName }}</span>-->
<!--    </div>-->
<!--  </div>-->
</template>

<script lang="ts" setup>
import {reactive, ref} from "vue";
import {useStore} from "vuex";
import axios from "axios";
import request from "../../../api";
import DataUpload from "./DataUpload.vue";

const store = useStore();
const listPage = ref(1), imageNumber = ref(16);
const fileList = ref([]), datasetInformation = ref({});
let selectList = Array(imageNumber.value).fill(0);
let deleteShow = ref(false);
const showList = ref([]), listPreview = ref([]);


refreshImages("getDatasetInfo");

async function refreshImages(option) {
  // console.log(option);
  await getDatasetInfos(option);
  updateShowList();
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

const updateShowList = () => {
  showList.value = (fileList.value.slice((listPage.value - 1) * imageNumber.value,
      Math.min(fileList.value.length, listPage.value * imageNumber.value)));
  console.log("showList.value", showList.value);
  listPreview.value = (showList.value.map((e) => {
    return "http://" + e["pictureUrl"];
  }));
  // console.log("store.state.datasetId", store.state.datasetId)
  console.log("listPreview.value", listPreview.value)
};
const selectChange = (index) => {
  selectList[index] ^= 1;
  console.log(selectList);
};
function selectAll(){
  for(let i=0; i<imageNumber.value; i++){
    if(selectList[i] == 0){
      const checkbox = document.querySelector('#el-checkbox-'+i.toString());  // 获取 el-checkbox 对应的 input 元素
      checkbox.checked = true; // 修改复选框的选中状态
      checkbox.dispatchEvent(new Event('change')); // 触发 change 事件

      //
      // checkbox.addEventListener('change', (event) => {
      //   console.log(`复选框状态变化，当前选中状态为：${event.target.checked}`);
      // });
      // selectChange(i)
    }
  }
  console.log(selectList);
}
function selectNone(){
  for(let i=0; i<imageNumber.value; i++){
    if(selectList[i] == 1){
      const checkbox = document.querySelector('#el-checkbox-'+i.toString());  // 获取 el-checkbox 对应的 input 元素
      checkbox.checked = false; // 修改复选框的选中状态
      checkbox.dispatchEvent(new Event('change')); // 触发 change 事件
    }
  }
  console.log(selectList);
}
const deleteClick = () => {
  deleteShow.value = true;
  selectList = Array(imageNumber.value).fill(0);
};
const deleteCancel = () => {
  deleteShow.value = false;
  selectList.fill(0, 0, imageNumber.value);
};

async function deleteConfirm() {
  let deleteList = {"pictureids": []};
  for (let i in (selectList.reverse())) {
    const deleteIndex = imageNumber.value - 1 - parseInt(i);
    if (deleteIndex >= showList.value.length) continue;
    // console.log(i, deleteIndex);
    if (selectList[i] === 1) {
      console.log(deleteIndex, "delete", fileList.value);
      deleteList["pictureids"].push(fileList.value[deleteIndex].pictureId);
      fileList.value.splice(deleteIndex, 1);
    }
    // console.log(fileList);
  }
  await request.post("/data/deletepictures", deleteList)
      .then(res => {
        if (res.status === 200) {

        } else {
          console.log("err in delete image!");
        }
      })
      .catch(err => {
        console.log(err);
      });
  await refreshImages("getDatasetInfo");

  deleteShow.value = false;
}
</script>

<style scoped>

.fixedpreview{
  /*text-align: center;*/
  margin: auto;
  width: 224px;
  height: 224px;
}

/*为了让fixedpreview垂直的伪元素*/
.fixedpreview::before{
  content:'';
  width:0;
  height:100%;
  display:inline-block;
  position:relative;
  vertical-align:middle;
  /*background:#f00;*/
}

.fixedpreview2{
  /*text-align: center;*/
  margin: auto;
  width: 224px;
  height: 224px;
  display:inline-block;
  vertical-align:middle;
}
.previewer{
  display: flex;
  flex-direction: column;
}

.demo-image .block {
  padding: 30px 0;
  text-align: center;
  border: solid 1px var(--el-border-color);
  /*display: inline-block;*/
  width: 20%;
  box-sizing: border-box;
  vertical-align: top;
}

.block {
  /*border-right: none;*/
  height: 300px;
  /*width: 300px;*/
  float: left;
}

.demo-image .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
