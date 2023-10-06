<template class="dataset">
  <el-row style="background: linear-gradient(transparent, #E7E7E7 100%);">
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


<!--    <el-col :span="6" v-for=" (item,index) in imgList" class="block">-->
<!--      <el-image-->
<!--          style="width: 90%; height: 90%"-->
<!--          :fit="'scale-down'"-->
<!--          class="image"-->
<!--          :src="`http://${item.pictureUrl}`"-->
<!--      />-->
<!--&lt;!&ndash;      <span class="demonstration">{{ item.pictureName }}</span>&ndash;&gt;-->
<!--    </el-col>-->


    <el-col :span="6" class="userblock">
      <div class="dataintro" />
      <span>{{ showDatasetName }}</span>
      <br>
      <el-button @click="checkOut" type="success" plain>选择</el-button>
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
</script>
<style scoped>
.dataintro{
  margin-bottom: 60px;
}
.demo-image .block {
  padding: 30px 0;
  text-align: center;
  border: solid 1px var(--el-border-color);
  display: inline-block;
  width: 10%;
  box-sizing: border-box;
  vertical-align: top;
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

.userblock {
  /*padding: 30px 0;*/
  text-align: center;
  /*border: solid 1px var(--el-border-color);*/
  display: inline-block;
  width: 10%;
  box-sizing: border-box;
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
  width: 180px;
  height: 180px;
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
  width: 128px;
  height: 128px;
  display:inline-block;
  vertical-align:middle;
}
</style>