<template class="dataset">
  <el-row class="demo-image">
    <el-col :span="6" v-for=" (item,index) in imgList" class="userblock">
      <div class="fixedpreview">
        <div class="fixedpreview2">
        <el-image
            style="width: 100%; height: 100%"
            :fit="'fill'"
            class="image"
            :src="`http://${item.pictureUrl}`" 
        />
        </div>
      </div>
    </el-col>
    <el-col :span="6" class="userblock">
      <div class="dataintro" />
      <span>{{ showDatasetName }}</span>
      <br>
      <el-button @click="checkOut" type="success" plain>查看数据集</el-button>
      <br>
      <el-button @click="deleteDatasetOpen" type="danger" plain>删除数据集</el-button>
      <br>
      <el-button @click="dialogVisible=true" type="warning" plain>重命名</el-button>
      <el-dialog v-model="dialogVisible" title="修改数据集名称">
        <el-input v-model="newName"></el-input>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="modifyDatasetName">确定</el-button>
      </span>
        </template>
      </el-dialog>
    </el-col>
  </el-row>

</template>

<script setup lang="ts">
import {ref, toRefs} from "vue";
import request from "../../../api/index";
import {ElMessage, ElMessageBox} from "element-plus";

const props = defineProps({
  datasetName: String,
  datasetId: String,
  datasetIndex:Number,//index of the dataset in showList
  imgList: {
    type: Array,
    default: () => []
  }
});
console.log("props", props);
const dialogVisible = ref(false), newName = ref(props.datasetName);
const showDatasetName = ref(props.datasetName);
const {datasetId} = toRefs(props);
const emits = defineEmits(["datasetInDetail", "deleteDataset","modifyDatasetName"]);
const checkOut = () => {
  console.log(datasetId.value);
  emits("datasetInDetail", datasetId.value);
};

function deleteDatasetOpen() {
  ElMessageBox.confirm(
      "将会删除该数据集，确定要继续吗?",
      "警告",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }
  )
      .then(() => {
        ElMessage({
          type: "success",
          message: "删除完成"
        });
        emits("deleteDataset", datasetId.value);
        console.log(datasetId.value);
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "删除取消"
        });
      });
}

const modifyDatasetName = () => {
  const postData = {
    datasetId: datasetId.value,
    newName: newName.value
  };
  request.post("/dataset/renameDataset", postData)
      .then(res => {
        console.log(res);
        showDatasetName.value = newName.value;
        emits("modifyDatasetName",[props.datasetIndex,newName.value])
      });
  dialogVisible.value = false;
};
</script>
<style scoped>
.dataintro{
  margin-bottom: 100px;
}
.demo-image{
  /*background: url("http://pruning.vipazoo.cn/api/img/background/background_preview.jpg") no-repeat 0% 20%/ cover;*/
  background: linear-gradient(transparent,#F4AFAF 100%);
}
.demo-image .userblock {
  /*padding: 30px 0;*/
  text-align: center;
  /*border: solid 1px var(--el-border-color);*/
  display: inline-block;
  width: 10%;
  box-sizing: border-box;
}
/* .block {*/
/*  !*border-right: none;*!*/
/*  height: 200px;*/
/*}*/
 .el-button {
   padding: 10px;
   width: 100px;
   margin: 5px;
 }

.demo-image .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}

.fixedpreview{
  /*text-align: center;*/
  margin: auto;
  width: 346px;
  height: 346px;
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

</style>