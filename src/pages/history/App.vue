<template>
  <div class="history">
    <h1 style="color: black; font-size: xx-large">Histories</h1>
    <!--    height="100"-->
    <!--    max-height="100"-->
    <el-table
        :data="tableData"
        :default-sort="{ prop: ['dateTime'], order: 'descending' }"
        style="width: 100%"
        :border="false"
    >
      <!--      <el-table-column min-width="20" prop="algorithmId" type="index" label="ID"/>-->
      <el-table-column min-width="120" fixed prop="username" label="user name" />
      <el-table-column min-width="180" prop="institute" label="institute" />
      <el-table-column min-width="180" prop="name" label="algorithm name" />
      <el-table-column min-width="140" prop="score" label="metascore" sortable="sortable" />
      <el-table-column min-width="100" prop="ranking" label="ranking" sortable="sortable" />

      <!--      <el-table-column width="830" prop="morfPath" label="morf" />-->
      <!--      <el-table-column width="830" prop="lerfPath" label="lerf" />-->
      <!--      <el-table-column width="830" prop="pythonPath" label="algorithm file" />-->
      <!--      <el-table-column width="830" prop="email" label="email" />-->
      <!--      <el-table-column width="830" prop="info" label="info" />-->
      <el-table-column min-width="130" prop="dateTime" label="Submit Time" sortable="sortable"  />
<!--      <el-table-column min-width="60" label="Details" type="expand">-->
<!--        <template #default="props">-->
<!--          <div m="4">-->
<!--            <p m="t-0 b-2">Morf result download:-->
<!--              <el-link :href="'http://10.214.242.155:7996/WorkSpace/data/user_upload/'+props.row.morfPath.split('/').slice(-1)[0]" :underline="false">-->
<!--                <el-button  size="small" type="warning" plain>Download</el-button>-->
<!--              </el-link>-->
<!--            </p>-->
<!--            <p m="t-0 b-2">Lerf result download:-->
<!--              <el-link :href="'http://10.214.242.155:7996/WorkSpace/data/user_upload/'+props.row.lerfPath.split('/').slice(-1)[0]" :underline="false">-->
<!--                <el-button  size="small" type="warning" plain>Download</el-button>-->
<!--              </el-link>-->
<!--            </p>-->
<!--            <p m="t-0 b-2" v-if="props.row.pythonPath.split('/').slice(-1)[0]==='Not Provided'">-->
<!--              Algorithm file download: {{ props.row.pythonPath.split("/").slice(-1)[0] }}-->
<!--            </p>-->
<!--            <p v-else>Algorithm file download:-->
<!--              <el-link :href="'http://10.214.242.155:7996/WorkSpace/data/user_upload/'+props.row.pythonPath.split('/').slice(-1)[0]" :underline="false">-->
<!--                <el-button  size="small" type="warning" plain>Download</el-button>-->
<!--              </el-link>-->
<!--            </p>-->
<!--            <p m="t-0 b-2">Email: {{ props.row.email }}</p>-->
<!--            <p m="t-0 b-2">Detailed information: {{ props.row.info }}</p>-->
<!--          </div>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <!--      "'http://10.214.242.155:7996/WorkSpace/data/user_upload/'"-->

      <!--      {{ props.row.morfPath.split("/")[props.row.morfPath.split("/").length-1] }}-->

      <!--      {{ props.row.morfPath.split("/").slice(-1)[0] }}-->

      <!--      {{ props.row.pythonPath.split("/").slice(-1)[0] }}-->

      <el-table-column label="Status" min-width="160">
        <template #default="props">
          <div v-if="props.row.status==='In Process'">
            <el-text class="mx-1" type="warning" style="color: #FF8017; font-weight: bold">{{props.row.status}}</el-text>
          </div>
          <div v-else-if="props.row.status==='Rejected'">
            <el-text class="mx-1" type="danger" style="color: #AB140C; font-weight: bold">{{props.row.status}}</el-text>
          </div>
          <div v-else-if="props.row.status==='Approved'">
            <el-text class="mx-1" type="success" style="color: #67C23A; font-weight: bold">{{props.row.status}}</el-text>
          </div>

        </template>
<!--        <template #default="props">-->
<!--          {{props.rows.status}}-->
<!--        </template>-->

      </el-table-column>
      <!--      <el-table-column min-width="100">-->
      <!--&lt;!&ndash;        <template #header>&ndash;&gt;-->
      <!--&lt;!&ndash;          <el-input v-model="search" @input="getTableData" size="default" placeholder="搜索数据集对应检测记录" />&ndash;&gt;-->
      <!--&lt;!&ndash;        </template>&ndash;&gt;-->
      <!--        <template #default="scope">-->
      <!--          <el-button size="default" type="success" @click="getRecordDetail(scope.$index, scope.row)">-->
      <!--            查看详情-->
      <!--          </el-button>-->
      <!--          <el-button size="default" @click="handleRename(scope.$index, scope.row)">-->
      <!--            重命名-->
      <!--          </el-button>-->
      <!--          <el-button size="default" type="primary" @click="handleDownload(scope.$index, scope.row)">-->
      <!--            下载-->
      <!--          </el-button>-->
      <!--          <el-popconfirm-->
      <!--              confirm-button-text="Yes"-->
      <!--              cancel-button-text="No"-->
      <!--              :icon="InfoFilled"-->
      <!--              icon-color="#626AEF"-->
      <!--              title="确认删除该检测记录吗？"-->
      <!--              @confirm="handleDelete(scope.$index, scope.row)"-->
      <!--          >-->
      <!--            <template #reference>-->
      <!--              <el-button type="danger">删除</el-button>-->
      <!--            </template>-->
      <!--          </el-popconfirm>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
    </el-table>
  </div>
</template>


<script setup lang="ts">
import {handleError, onMounted, ref} from "vue";
import request from '@/api/index'
import store from '@/store'
import {router} from "@/router";

const tableData=ref()
const search=ref("")
function getTableData(){
  request.post('/history/findHistoryByUser',{
    username: store.state.username,
  })
      .then((response)=>{
        console.log(response)
        let originData=response.data.data.historyInfos
        console.log("originData: ", originData)

        tableData.value=originData.filter(
            (data) => {
              // console.log(data.datasetName.toLowerCase(), search.value)
              return (!search.value.length) || data.datasetName.toLowerCase().includes(search.value.toString().toLowerCase())
            }
        )
        store.commit('setHistoryRecords', tableData.value)
        console.log("tableData", tableData.value)
      })
      .catch((error)=>{
        console.error(error)
      })
}

getTableData()
// console.log("tableData", tableData.value)

// function handleDelete(index:any,recordData:any){
//   request.post('/history/delete',{
//     historyName: recordData.historyName,
//     username: store.state.username
//   })
//       .then((response)=>{
//         console.log("handleDelete", response)
//         tableData.value.splice(index, 1)
//       })
//       .catch((error)=>{
//         console.log("handleDelete", error)
//       })
// }

function getRecordDetail(index:any, recordData:any) {

  router.push({
    name: 'twodresult',
    params: {
      recordDatasetId: tableData.value[index].datasetId,
      recordName: recordData.historyName
    }
  })
}
</script>

<style scoped>
.history {
  padding: 20pt;
  margin: 0;
  /*height: 100%;*/
}
/*.el-table-column {*/
/*  min-width: 50px;*/
/*}*/
</style>