<template style="text-align: center">
<!--  <el-tabs :style="{background: isShow1? 'url(\'http://10.214.242.155:7996/img/background/background_overallpreview.jpg\') no-repeat 0% 20%/ cover'-->
<!--   : 'url(\'http://10.214.242.155:7996/img/background/background_preview.jpg\') no-repeat 0% 20%/ cover'}"-->
<!--           type="border-card" class="demo-tabs" @tab-click="handleClick" v-model="activeName" :stretch=true>-->
  <el-tabs type="border-card" class="demo-tabs" @tab-click="handleClick" v-model="activeName" :stretch=true>
    <el-tab-pane label="Meta-rank datasets" name="public">
      <metarank-data v-if='isShow1' />
    </el-tab-pane>
    <el-tab-pane label="Other benchmark datasets" name="users">
      <public-data v-if='isShow2' />
    </el-tab-pane>
  </el-tabs>
</template>



<script setup lang="ts">
import publicData from "./publicData.vue";
import usersData from "./usersData.vue";
import metarankData from "./metarankData.vue";
import {onBeforeMount, ref} from "vue";
import PublicData from "@/pages/datasetPreview/publicData.vue";

let isShow1 = ref(true), isShow2 = ref(false),activeName='public'
onBeforeMount(()=>{
  isShow1.value=true}
)
function handleClick(tab:any) {
  if (tab.props.name === 'public') {
    isShow1.value = true
    isShow2.value = false
  } else {
    isShow1.value = false
    isShow2.value = true
  }
}
</script>

<style scoped>
.demo-tabs{
  background-color: white;
  /*background-image: linear-gradient(transparent, white 100%), url('./assets/head.jpg');*/
  /*background-position: center;*/
  /*background-repeat: no-repeat;*/
  /*background-size: cover;*/
}
.demo-image .block {
  /*padding: 30px 0;*/
  text-align: center;
  /*border: solid 1px var(--el-border-color);*/
  /*border: none;*/
  display: inline-block;
  width: 10%;
  box-sizing: border-box;
  vertical-align: top;
}
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
.forSearch {
  margin: 10px;
  display: inline-block;

}

</style>