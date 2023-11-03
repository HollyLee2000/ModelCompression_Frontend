<template>
  <div class="history">
    <h1 style="color: black; font-size: xx-large">Histories</h1>
    <!--    height="100"-->
    <!--    max-height="100"-->
    <el-table
        :data="tableData"
        :default-sort="{ prop: ['submitTime'], order: 'descending' }"
        style="width: 100%"
        :border="false"
    >
      <!--      <el-table-column min-width="20" prop="algorithmId" type="index" label="ID"/>-->
      <el-table-column min-width="100" fixed prop="username" label="user name" />
      <el-table-column min-width="120" fixed prop="modelName" label="model name" />
      <el-table-column min-width="120" prop="taskType" label="task type" />

      <el-table-column min-width="120" prop="submitTime" label="submit time" sortable="sortable" />

<!--      <el-table-column min-width="150" label="params" >-->
<!--        <template #default="props">-->
<!--          {{ props.row.paramsChange.replace('Params: ', '') }}-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column min-width="220" label="speed up(FLOPs)" >-->
<!--        <template #default="props">-->
<!--          {{ props.row.flopsChange.replace('FLOPs: ', '') }}-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column min-width="120" label="acc" >-->
<!--        <template #default="props">-->
<!--          {{ props.row.accChange.replace('Acc: ', '') }}-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column min-width="120" label="val loss" >-->
<!--        <template #default="props">-->
<!--          {{ props.row.lossChange.replace('Val Loss: ', '') }}-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column min-width="60" label="statics" type="expand">-->
<!--        <template #default="props">-->
<!--          <div m="4">-->
<!--            <p m="t-0 b-2">{{props.row.paramsChange}}</p>-->
<!--            <p m="t-0 b-2">{{props.row.flopsChange}}</p>-->
<!--            <p m="t-0 b-2">{{props.row.accChange}}</p>-->
<!--            <p m="t-0 b-2">{{props.row.lossChange}}</p>-->
<!--          </div>-->
<!--        </template>-->
<!--      </el-table-column>-->

      <el-table-column min-width="60" label="details" type="expand">
        <template #default="props">
          <div m="4">
            <p m="t-0 b-2">{{props.row.paramsChange}}</p>
            <p m="t-0 b-2">{{props.row.flopsChange}}</p>
            <p m="t-0 b-2">{{props.row.accChange}}</p>
            <p m="t-0 b-2">{{props.row.lossChange}}</p>
            <p m="t-0 b-2">Unpruned model:
<!--              <el-link :href="'http://10.214.242.155:7996/WorkSpace/benchmarks/log/'+props.row.checkpointPath.split('/').slice(-4).join('/')" :underline="false">-->
<!--              <el-button  size="small" type="warning" plain>Download</el-button>-->
<!--            </el-link>-->




              <el-link target="_blank" :href="props.row.checkpointPath.includes('Torch-Pruning') ? 'http://10.214.242.155:7996/WorkSpace/' + props.row.checkpointPath.split('Torch-Pruning').slice(-1)[0] : 'http://10.214.242.155:7996/ckpt' + props.row.checkpointPath.split('checkpoints').slice(-1)[0]" :underline="false">
                <el-button size="small" type="success" plain>Download</el-button>
              </el-link>





<!--              <el-link target="_blank" :href="'http://10.214.242.155:7996/WorkSpace/'+props.row.checkpointPath.split('Torch-Pruning').slice(-1)[0]" :underline="false">-->
<!--                <el-button  size="small" type="success" plain>Download</el-button>-->
<!--                props.row.checkpointPath-->
<!--              </el-link>-->


            </p>
<!--            <p m="t-0 b-2">Checkpoint before pruned: {{props.row.checkpointPath}}</p>-->
            <p m="t-0 b-2">Pruned model:
<!--              <el-link :href="'http://10.214.242.155:7996/WorkSpace/benchmarks/log/'+props.row.prunedPath.split('/').slice(-5).join('/')" :underline="false">-->
<!--                <el-button  size="small" type="warning" plain>Download</el-button>-->
<!--              </el-link>-->
              <el-link v-if="props.row.prunedPath!=='N/A'" target="_blank" :href="'http://10.214.242.155:7996/WorkSpace/'+props.row.prunedPath.split('Torch-Pruning').slice(-1)[0]" :underline="false">
                <el-button  size="small" type="success" plain>Download</el-button>
              </el-link>
              <text v-else>
                N/A
              </text>
            </p>


            <p m="t-0 b-2">
              Structure before pruned: <el-link target="_blank" :href="'http://10.214.242.155:7996/WorkSpace/'+props.row.structureBeforePruned.split('Torch-Pruning').slice(-1)[0]" :underline="false">
                <el-button size="small" type="primary" plain>View</el-button></el-link>
            </p>

            <p m="t-0 b-2">
              Structure after pruned:
              <el-link v-if="props.row.structureAfterPruned!=='N/A'" target="_blank" :href="'http://10.214.242.155:7996/WorkSpace/'+props.row.structureAfterPruned.split('Torch-Pruning').slice(-1)[0]" :underline="false">
                <el-button size="small" type="primary" plain>View</el-button>
              </el-link>
              <text v-else>
                N/A
              </text>
            </p>

            <p m="t-0 b-2">
              Log file:
              <el-link v-if="props.row.logPath!=='N/A'" target="_blank" :href="'http://10.214.242.155:7996/WorkSpace/'+props.row.logPath.split('Torch-Pruning').slice(-1)[0]" :underline="false">
                <el-button size="small" type="primary" plain>View</el-button>
              </el-link>
              <text v-else>
                N/A
              </text>
            </p>


<!--            <p m="t-0 b-2">Checkpoint after pruned: {{props.row.prunedPath}}</p>-->
          </div>
        </template>
      </el-table-column>


      <el-table-column label="status" min-width="160">
        <template #default="props">
          <div v-if="props.row.status==='Sparse Learning...'||props.row.status==='Pruned, Fine-tuning...'">
            <el-text class="mx-1" type="warning" style="color: #FF8017; font-weight: bold">{{props.row.status}}</el-text>
          </div>
          <div v-else-if="props.row.status==='Failed'">
            <el-text class="mx-1" type="danger" style="color: #AB140C; font-weight: bold">{{props.row.status}}</el-text>
          </div>
          <div v-else-if="props.row.status==='Pruned(completed)'||props.row.status==='Fine-tuned(completed)'">
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