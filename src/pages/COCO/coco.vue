<template>
  <div class="history">
    <h1 style="color: black; font-size: xx-large">Submissions</h1>
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
      <el-table-column min-width="60" label="Details" type="expand">
        <template #default="props">
          <div m="4">
            <p m="t-0 b-2">Morf result download:
              <el-link :href="'http://10.214.242.155:7668/WorkSpace/data/user_upload/'+props.row.morfPath.split('/').slice(-1)[0]" :underline="false">
              <el-button  size="small" type="warning" plain>Download</el-button>
            </el-link>
            </p>
            <p m="t-0 b-2">Lerf result download:
              <el-link :href="'http://10.214.242.155:7668/WorkSpace/data/user_upload/'+props.row.lerfPath.split('/').slice(-1)[0]" :underline="false">
                <el-button  size="small" type="warning" plain>Download</el-button>
              </el-link>
            </p>
            <p m="t-0 b-2" v-if="props.row.pythonPath.split('/').slice(-1)[0]==='Not Provided'">
              Algorithm file download: {{ props.row.pythonPath.split("/").slice(-1)[0] }}
            </p>
            <p v-else>Algorithm file download:
              <el-link :href="'http://10.214.242.155:7668/WorkSpace/data/user_upload/'+props.row.pythonPath.split('/').slice(-1)[0]" :underline="false">
                <el-button  size="small" type="warning" plain>Download</el-button>
              </el-link>
            </p>
            <p m="t-0 b-2">Email: {{ props.row.email }}</p>
            <p m="t-0 b-2">Detailed information: {{ props.row.info }}</p>
          </div>
        </template>
      </el-table-column>
<!--      "'http://10.214.242.155:7668/WorkSpace/data/user_upload/'"-->

<!--      {{ props.row.morfPath.split("/")[props.row.morfPath.split("/").length-1] }}-->

<!--      {{ props.row.morfPath.split("/").slice(-1)[0] }}-->

<!--      {{ props.row.pythonPath.split("/").slice(-1)[0] }}-->

<!--          <el-text class="mx-1" type="success" style="color: #E6A23C; font-weight: bold">{{props.row.status}}</el-text>-->

      <el-table-column label="Decisions" min-width="160">
        <template #default="props">
<!--          <el-text class="mx-1" type="success" style="color: #E6A23C; font-weight: bold">{{props.row.status}}</el-text>-->
<!--          Are you sure to delete this?-->
          <div v-if="props.row.status==='In Process'">
            <el-button
                size="small"
                @click="chooseApproveId(props.row.algorithmId, props.row.name, props.row.morfPath, props.row.lerfPath)"
                type="success"
                plain>
              Approve
            </el-button
            >
            <el-button
                size="small"
                type="danger"
                @click="chooseRejectId(props.row.algorithmId)"
                plain
            >Reject</el-button
            >
          </div>
          <div v-else-if="props.row.status==='Rejected'">
            <el-text class="mx-1" type="danger" style="color: #AB140C; font-weight: bold">{{props.row.status}}</el-text>
          </div>
          <div v-else-if="props.row.status==='Approved'">
            <el-text class="mx-1" type="success" style="color: #67C23A; font-weight: bold">{{props.row.status}}</el-text>
          </div>
        </template>
      </el-table-column>
<!--      <el-table-column min-width="100" prop="algorithmId" label="algorithmId" sortable="sortable" />-->
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

    <el-dialog v-model="centerDialogVisible" title="Warning" width="30%" center>
    <span>
      Are you sure to reject this submission? It means that this algorithm will not be added to the leaderboard, and such a decision is irreversible.
    </span>
      <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="centerDialogVisible = false" plain>Cancel</el-button>
        <el-button type="success" @click="handleReject(chosenId)" plain>
          Confirm
        </el-button>
<!--        @click="handleReject(props.row.algorithmId)"-->
      </span>
      </template>
    </el-dialog>

    <el-dialog v-model="centerDialogVisibleApprove" title="Warning" width="30%" center>
    <span>
      Are you sure to approve this submission? It means that this algorithm will be added to the leaderboard, and such a decision is irreversible.
    </span>
      <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="centerDialogVisibleApprove = false" plain>Cancel</el-button>
        <el-button type="success" @click="handleApprove(chosenApproveId)" plain>
          Confirm
        </el-button>
        <!--        @click="handleReject(props.row.algorithmId)"-->
      </span>
      </template>
    </el-dialog>
  </div>
</template>


<script setup lang="ts">
import {handleError, onMounted, ref} from "vue";
import request from '@/api/index'
import store from '@/store'
import {router} from "@/router";
import {ElMessage} from "element-plus";
// import { DetermineUser } from '@/pages/Cifar/cifar'; // 导入你的组件路径


const tableData=ref()
const search=ref("")
const visible = ref(false)
const centerDialogVisible = ref(false)
const centerDialogVisibleApprove = ref(false)
const chosenId = ref(0)
const chosenApproveId = ref(0)
const algorithmName = ref('')
const morfPath = ref('')
const lerfPath = ref('')


// centerDialogVisible = false



function chooseRejectId(algorithmId){
  console.log("好好好")
  console.log("algorithmId: ", algorithmId)
  centerDialogVisible.value = true
  chosenId.value = algorithmId
}

function chooseApproveId(algorithmId, name, morf, lerf){
  console.log("坏坏坏")
  console.log("algorithmId: ", algorithmId)
  console.log("algorithmName: ", name)
  console.log("morf: ", morf)
  console.log("lerf: ", lerf)
  centerDialogVisibleApprove.value = true
  algorithmName.value = name
  chosenApproveId.value = algorithmId
  morfPath.value = morf
  lerfPath.value = lerf
}


function getTableData(){
  request.post('/history/findAll',{
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

async function handleReject(algorithmId){
  console.log("algorithmId:", algorithmId)
  await request.post('/algorithm/handleReject',{
    algorithmId: algorithmId,
  })
      .then((response)=>{
        console.log(response)
        if(response.status==200){
          ElMessage.success("You have rejected this submission!")
        }else{
          ElMessage.error("Rejection failed.")
        }
      })
      .catch((error)=>{
        ElMessage.error("Rejection failed.")
        console.error(error)
      })
  getTableData()
  centerDialogVisible.value = false
}

function DetermineUser() {
  console.log("确认用户信息")
  let temp = {
    username: store.state.username,
    password: 23333,
  };
  console.log(temp);
  request
      .post("/user/findNoPass", temp)
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          console.log("确认成功")
          const userInfo = res.data.data.userInfo
          store.commit('setInstitute', userInfo.institute)
          console.log("userInfo.institute: ", userInfo.institute)
          console.log("store.state.institute: ", store.state.institute)
        } else{
          console.log("确认失败")
        }
      })
      .catch((err) => {
        console.log((err));
      });

}

async function handleApprove(algorithmId){
  DetermineUser();
  console.log("algorithmId:", algorithmId)
  await request.post('/algorithm/handleApprove',{
    algorithmId: algorithmId,
    username: store.state.username,
    institute: store.state.institute,
    name: algorithmName.value,
    morf: morfPath.value,
    lerf: lerfPath.value
  })
      .then((response)=>{
        console.log(response)
        if(response.status==200){
          ElMessage.success("You have approved this submission!")
        }else{
          ElMessage.error("Approval failed.")
        }
      })
      .catch((error)=>{
        ElMessage.error("Approval failed.")
        console.error(error)
      })
  getTableData()
  centerDialogVisibleApprove.value = false
}

getTableData()
// console.log("tableData", tableData.value)

function handleDelete(index:any,recordData:any){
  request.post('/history/delete',{
    historyName: recordData.historyName,
    username: store.state.username
  })
      .then((response)=>{
        console.log("handleDelete", response)
        tableData.value.splice(index, 1)
      })
      .catch((error)=>{
        console.log("handleDelete", error)
      })
}

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
.dialog-footer button:first-child {
  margin-right: 10px;
}
.history {
  padding: 20pt;
  margin: 0;
  /*height: 100%;*/
}
/*.el-table-column {*/
/*  min-width: 50px;*/
/*}*/
</style>