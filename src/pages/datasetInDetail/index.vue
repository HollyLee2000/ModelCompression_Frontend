<template>
<!--  <data-upload/>-->
  <el-icon @click="backDatasetPreview" style="display: flex" size="50px"><Back/></el-icon>

<!--  <data-upload/>-->
  <ShowInDetail/>
</template>

<script >
import ShowInDetail from "@/pages/datasetInDetail/componets/ShowInDetail";
import DataUpload from "@/pages/datasetInDetail/componets/DataUpload";
export default {
  name: "datasetInDetail",
  components: {DataUpload, ShowInDetail}
}
</script>
<script setup >
import {Back} from "@element-plus/icons-vue"
import {router} from "@/router";
function backDatasetPreview(){
  router.push('datasetPreview')
}
</script>

<style scoped>

</style>