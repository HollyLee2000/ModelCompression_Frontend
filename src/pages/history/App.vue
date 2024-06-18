<template>
  <div class="history">
<!--    <div id="gpuChart" style="width: 50%; height: 30%; " ref="gpuChartRef"></div>-->
    <h1 style="color: black; font-size: xx-large">Histories</h1>
    <!--    height="100"-->
    <!--    max-height="100"-->
<!--    ascending-->
<!-- -->
<!--    :default-sort="{ prop: ['submitTime'], order: 'descending' }"-->


    <div class="searchHistory">
      <el-select v-model="client" class="forSearchHistory" placeholder="Select Client" size="large"  @change="getTableData">
        <el-option
            v-for="item in optionList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      <el-select v-model="type" class="forSearchHistory" placeholder="Select Task Type" size="large" @change="getTableData">
        <el-option
            v-for="item in clientOptionList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      <div class="forSearchHistory" >
        <el-input @keyup.enter="getTableData" v-model="model" style="width:250px; height: 40px" placeholder="Fuzzy keywords of model name"/>
<!--        <el-button @click="getTableData" style="height: 40px;">-->
<!--          <el-icon>-->
<!--            <search/>-->
<!--          </el-icon>-->
<!--        </el-button>-->
      </div>
      <el-form-item class="forSearchHistory">
        <el-date-picker v-model="createTimes"
                        type="daterange"
                        range-separator="To"
                        start-placeholder="Begin time"
                        end-placeholder="End time"
                        format="YYYY-MM-DD"
                        value-format="YYYY-MM-DD"
                        @change="getTableData"
        />
      </el-form-item>
      <el-button class="SearchReset" type="primary" plain size="large" @click="getTableData">
        Search
      </el-button>
      <el-button class="SearchReset" type="warning" size="large" plain @click="resetData">Reset</el-button>
    </div>



<!--    <div class="search-div">-->
<!--      <el-form label-width="70px" size="small">-->
<!--        <el-row>-->
<!--          <el-col :span="12">-->
<!--            <el-form-item label="Model name">-->
<!--              <el-input v-model="model"-->
<!--                        style="width: 100%"-->
<!--                        placeholder="Enter fuzzy search keywords"-->
<!--              ></el-input>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="12">-->
<!--            <el-form-item label="创建时间">-->
<!--              <el-date-picker v-model="createTimes"-->
<!--                              type="daterange"-->
<!--                              range-separator="To"-->
<!--                              start-placeholder="开始时间"-->
<!--                              end-placeholder="结束时间"-->
<!--                              format="YYYY-MM-DD"-->
<!--                              value-format="YYYY-MM-DD"-->
<!--              />-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-row style="display:flex">-->
<!--          <el-button type="primary" size="small" @click="getTableData">-->
<!--            搜索-->
<!--          </el-button>-->
<!--          <el-button size="small" @click="resetData">重置</el-button>-->
<!--        </el-row>-->
<!--      </el-form>-->
<!--    </div>-->

    <el-table
        :data="tableData"
        style="width: 100%"
        :border="false"
        row-key="historyId"
        :expand-row-keys="expands"
        @expand-change="expandChange"
    >
      <el-table-column min-width="60" fixed prop="username" label="user name" />
      <el-table-column min-width="120" prop="modelName" label="model name" />
      <el-table-column min-width="60" label="importance">
        <template #default="props">
          <el-link v-if="props.row.importance!=='N/A'" :href="props.row.importanceLink" type="primary" target="_blank">{{props.row.importance}}</el-link>
          <text v-else>{{props.row.importance}}</text>
        </template>
      </el-table-column>
      <el-table-column min-width="60" label="regularizer">
        <template #default="props">
          <el-link v-if="props.row.pruner!=='N/A'" :href="props.row.prunerLink" type="primary" target="_blank">{{props.row.pruner}}</el-link>
          <text v-else>{{props.row.pruner}}</text>
        </template>
      </el-table-column>
      <el-table-column min-width="100" prop="taskType" label="task type" />
      <el-table-column min-width="80" prop="submitTime" label="submit time">
        <template #default="props">
          {{props.row.submitTime.split(' ')[0]}}<br>{{props.row.submitTime.split(' ')[1]}}
        </template>
      </el-table-column>
      <el-table-column min-width="80" prop="finishTime" label="finish time">
        <template #default="props">
          <text v-if="props.row.finishTime==='2000-01-14 00:00:00'">N/A</text>
          <text v-else>{{props.row.finishTime.split(' ')[0]}}<br>{{props.row.finishTime.split(' ')[1]}}</text>
        </template>
      </el-table-column>
      <el-table-column min-width="60" prop="client" label="client" />
      <el-table-column min-width="50" label="details" type="expand">
        <template #default="props">
          <div m="4">
<!--            <div class="tag-item">-->
<!--              <el-button-->
<!--                  class="button-new-tag"-->
<!--                  size="small"-->
<!--                  @click="AddProduct(props.row)"-->
<!--              >添加此为展开列！</el-button>-->
<!--            </div>-->
<!--&lt;!&ndash;            <p m="t-0 b-2">{{props.id}}</p>&ndash;&gt;-->
<!--            <p m="t-0 b-2">{{props.$index}}</p>-->
<!--            <p m="t-0 b-2">{{props.expanded}}</p>-->
            <p m="t-0 b-2">{{props.row.paramsChange}}</p>
            <p m="t-0 b-2">{{props.row.flopsChange}}</p>
            <p m="t-0 b-2">{{props.row.accChange}}</p>
            <p m="t-0 b-2">{{props.row.lossChange}}</p>
            <p m="t-0 b-2">Unpruned model:
              <el-link target="_blank" :href="props.row.checkpointPath.includes('Torch-Pruning') ? 'http://pruning.vipazoo.cn/api/WorkSpace/' + props.row.checkpointPath.split('Torch-Pruning').slice(-1)[0] : 'http://pruning.vipazoo.cn/api/ckpt' + props.row.checkpointPath.split('checkpoints').slice(-1)[0]" :underline="false">
                <el-button size="small" type="success" plain>Download</el-button>
              </el-link>
            </p>
            <p m="t-0 b-2">Pruned model:
              <el-link v-if="props.row.prunedPath!=='N/A'" target="_blank" :href="'http://pruning.vipazoo.cn/api/WorkSpace/'+props.row.prunedPath.split('Torch-Pruning').slice(-1)[0]" :underline="false">
                <el-button  size="small" type="success" plain>Download</el-button>
              </el-link>
              <text v-else>
                N/A
              </text>
            </p>
            <p m="t-0 b-2">
              Structure before pruned: <el-link target="_blank" :href="'http://pruning.vipazoo.cn/api/WorkSpace/'+props.row.structureBeforePruned.split('Torch-Pruning').slice(-1)[0]" :underline="false">
                <el-button size="small" type="primary" plain>View</el-button></el-link>
            </p>
            <p m="t-0 b-2">
              Structure after pruned:
              <el-link v-if="props.row.structureAfterPruned!=='N/A'" target="_blank" :href="'http://pruning.vipazoo.cn/api/WorkSpace/'+props.row.structureAfterPruned.split('Torch-Pruning').slice(-1)[0]" :underline="false">
                <el-button size="small" type="primary" plain>View</el-button>
              </el-link>
              <text v-else>
                N/A
              </text>
            </p>
            <p m="t-0 b-2">
              Log file:
              <el-link v-if="props.row.logPath!=='N/A'" target="_blank" :href="'http://pruning.vipazoo.cn/api/WorkSpace/'+props.row.logPath.split('Torch-Pruning').slice(-1)[0]" :underline="false">
                <el-button size="small" type="primary" plain>View</el-button>
              </el-link>
              <text v-else>
                N/A
              </text>
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="status" min-width="130">
        <template #default="props">
          <div v-if="props.row.status==='Sparse Learning...'||props.row.status==='Pruned, Fine-tuning...'||props.row.status==='Waiting'||props.row.status==='Need Approval'">
            <el-text class="mx-1" type="warning" style="color: #C0C0C0; font-weight: bold">{{props.row.status}}</el-text>
          </div>
          <div v-else-if="props.row.status==='Failed'||props.row.status==='Rejected'">
            <el-text class="mx-1" type="danger" style="color: #AB140C; font-weight: bold">{{props.row.status}}</el-text>
          </div>
          <div v-else-if="props.row.status==='Pruned(completed)'||props.row.status==='Fine-tuned(completed)'||props.row.status==='Uploaded(completed)'">
            <el-text class="mx-1" type="success" style="color: #67C23A; font-weight: bold">{{props.row.status}}</el-text>
          </div>
          <div v-else>
            <el-text class="mx-1" type="success" style="color: #FF8017; font-weight: bold">{{props.row.status}}</el-text>
          </div>
          <el-progress :text-inside="true"  class="m-2" :stroke-width="26" :percentage="(100*props.row.currentEpoch/props.row.totEpoch).toFixed(1)" :color="colors"  />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        v-model:current-page="pageParams.page"
        v-model:page-size="pageParams.limit"
        :page-sizes="[4, 8, 16, 32]"
        @size-change="getTableData"
        @current-change="getTableData"
        layout="total, sizes, prev, pager, next"
        :total="total"
        class="pagination"
    />
<!--    tableData-->

  </div>
</template>


<script setup lang="ts">
import {handleError, onMounted, onBeforeUnmount, ref, getCurrentInstance} from "vue";
import request from '@/api/index'
import store from '@/store'
import {router} from "@/router";
import {Search} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import * as echarts from "echarts";

const tableData=ref()
const search=ref("")
const expands=ref([])
const colors = [
  { color: '#FDACBE', percentage: 20 },
  { color: '#f56c6c', percentage: 40 },
  { color: '#e6a23c', percentage: 60 },
  { color: '#5cb87a', percentage: 80 },
  { color: '#20BD1C', percentage: 100 },
]

const model=ref("")
const type=ref("")
const createTimes = ref([])
const createTimeBegin=ref("")
const createTimeEnd=ref("")
const client=ref("")

const optionList = [
  {
    value: "vipa155_client1",
    label: "vipa155_client1"
  }, {
    value: "vipa155_client2",
    label: "vipa155_client2"
  }, {
    value: "NULL",
    label: "NULL"
  }
];

const clientOptionList = [
  {
    value: "Pruned --> Fine-tuned",
    label: "Pruned --> Fine-tuned"
  }, {
    value: "Directly Pruned",
    label: "Directly Pruned"
  }, {
    value: "Upload Raw Model",
    label: "Upload Raw Model"
  }
];

const resetData = () => {
  model.value = ""
  type.value = ""
  createTimes.value = []
  createTimeBegin.value = ""
  createTimeEnd.value = ""
  client.value = ""
  getTableData()
}


// 分页条数据模型
const total = ref(0)

//分页
const pageParamsForm = {
  page:1, //当前页
  limit:8 //每页记录数
}
const pageParams = ref(pageParamsForm)

// const getRowKeys = (row) => {
//   return row.id
// }

const expandChange = (row, expandedRows) => {
  // 使用 some() 方法来检查 rows 数组中是否存在满足条件的元素。
  // 遍历 expandedRows 数组中的每个元素 r ，并对每个元素执行条件判断 r.historyId === row.historyId。
  // 如果有至少一个元素满足条件，则 some() 方法的返回值为 true。如果没有任何元素满足条件，则返回值为 false。
  console.log("row: ", row)
  const isExpend = expandedRows.some(r => r.historyId === row.historyId)
  if (isExpend) {
    console.log("是展开命令！给expands数组添加id")
    expands.value.push(row.historyId)
    console.log("expands: ", expands.value)
    console.log("expandedRows: ", expandedRows)
  } else {
    console.log("是收回命令！给expands数组删除id")
    expands.value = expands.value.filter(data => data !== row.historyId);
    console.log("expands: ", expands.value)
    console.log("expandedRows: ", expandedRows)
  }
}

// const AddProduct = (row) => {
//   expands.value.push(row.historyId)
//   console.log("expands: ", expands.value)
// }

const getTableData = async () => {
  //
  // console.log("tableData", tableData.value)
  // console.log("标记")
  if(createTimes.value.length == 2) {
    createTimeBegin.value = createTimes.value[0]
    createTimeEnd.value = createTimes.value[1]
  }

  await request.post(`/history/findHistoryByUser/${pageParamsForm.page}/${pageParamsForm.limit}`,{
    username: store.state.username,
    model: model.value,
    type: type.value,
    createTimeBegin: createTimeBegin.value,
    createTimeEnd: createTimeEnd.value,
    client: client.value,
  })
      .then((response)=>{
        console.log(response)
        let originData=response.data.data.historyInfos.list
        total.value = response.data.data.historyInfos.total
        console.log("originData: ", originData)
        tableData.value=originData.filter(
            (data) => {
              // console.log(data.datasetName.toLowerCase(), search.value)
              return (!search.value.length) || data.datasetName.toLowerCase().includes(search.value.toString().toLowerCase())
            }
        )
        // tableData.value.forEach(item => {
        //   item.submitTime = new Date(item.submitTime);
        // });
        // tableData.value = tableData.value.map(row => ({ ...row, expanded: true }));
        store.commit('setHistoryRecords', tableData.value)
        console.log("tableData", tableData.value)
      })
      .catch((error)=>{
        console.error(error)
      })
}

//
// const { proxy: ctx } = getCurrentInstance()
//
// onMounted(() => {
//   //初始化图表
// // let myChart = echarts.init(document.getElementById('gpuChart') );
//   let myChart = echarts.init(ctx.$refs.gpuChartRef);
// // gpuChartRef
// //配置图表的参数
//   let option = {
//     title: {
//       text:'扇形图示例'
//     },
//     series : [
//       {
//         name:'数据',
//         type: 'pie' ,
//         radius: '50%',
//         data: [
//           {value: 335,  name:'数据1'},
//           {value: 310,  name:'数据2'},
//           {value: 234,  name:'数据3'}
//         ]
//       }
//     ]
//   };
// //使用配置项显示图表
//   myChart.setOption(option);
// })


// let intervalHistory: number | null = null;

// onMounted(() => {
//
//
// });

getTableData();

//先暂停了，后面再开放实时刷新

let intervalHistory = setInterval(getTableData, 2000);

onBeforeUnmount(() => {
  if (intervalHistory) {
    clearInterval(intervalHistory);
    intervalHistory = null;
  }
});



// const intervalHistory = setInterval(() => {
//   getTableData()
// }, 2000)

// getTableData()




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

.searchHistory {
  display: flex;
  justify-content: center;
  align-items: center;
}



/*.el-table-column {*/
/*  min-width: 50px;*/
/*}*/
</style>