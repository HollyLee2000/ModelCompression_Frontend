<template>
  <div class="holly">
    <div id="tree-container"></div>
  </div>

  <el-dialog class="scrollable" v-model="dialogVisible" style="width:50%; height:55%; overflow: auto;"
             :draggable="true" @close="dialogVisible = false" :append-to-body="true" title="Online Pruning Result" >
    <div style="margin: 0 0 20px 0; text-align: left;">
      <label style="margin-left: 50px; font-size:18px; border: 0; color: black; word-wrap: break-word; white-space: pre-wrap;">
      {{paramsChange}}</label>
    </div>
    <div style="margin: 0 0 20px 0; text-align: left;">
      <label style="margin-left: 50px; font-size:18px; border: 0; color: black; word-wrap: break-word; white-space: pre-wrap;">
        {{FLOPsChange}}</label>
    </div>
    <div style="margin: 0 0 20px 0; text-align: left;">
      <label style="margin-left: 50px; font-size:18px; border: 0; color: black; word-wrap: break-word; white-space: pre-wrap;">
        {{AccChange}}</label>
    </div>
    <div style="margin: 0 0 20px 0; text-align: left;">
      <label style="margin-left: 50px; font-size:18px; border: 0; color: black; word-wrap: break-word; white-space: pre-wrap;">
        {{LossChange}}</label>
    </div>
    <div style="margin: 0 0 20px 0; text-align: left;">
      <label style="margin-left: 50px; font-size:18px; border: 0; color: black; word-wrap: break-word; white-space: pre-wrap;">
        {{PrunedPath}}</label>
    </div>
    <div style="margin: 0 0 20px 0; text-align: left;">
      <label style="margin-left: 44px; font-size:18px; border: 0; color: black; word-wrap: break-word; white-space: pre-wrap;">
        This pruning has been added to the history record.</label>
    </div>

    <div style="margin: 0 0 20px 0; text-align: center">
      <el-button size="large" type="success" plain @click="dialogVisible = false">OK</el-button>
    </div>
  </el-dialog>

  <el-dialog class="scrollable" v-model="PrunedialogVisible" style="width:95%; height:95%; text-align: center; overflow: auto; font-family: Arial;"
             :draggable="true" @close="PrunedialogVisible = false" :append-to-body="true" title="CIFAR Model Pruning" >
    <div v-loading="resultLoading2">

      <div style="margin: 0 0 20px 0; text-align: left;">
        <label style="margin-left: 50px; font-size:18px; border: 0; word-wrap: break-word; white-space: pre-wrap; color: #000096">CIFAR Tips: Complete the
          following information and generate the script. If you don't require sparse Learning and fine-tuning,
          click "online pruning" to obtain pruning results immediately. If you need sparse Learning or fine-tuning, you'll need
          to submit a task and wait for training, which is not yet implemented on this server. All models trained on the CIFAR dataset
          adopt a learning rate of 0.01 during sparse Learning and fine-tuning phases.</label>
      </div>

      <div style="margin: 0 0 20px 0; text-align: left;">
        <label style="margin-left: 50px; font-size:18px; border: 0; word-wrap: break-word; white-space: pre-wrap; color: #800E25">
          Name: {{modelName}}<br>
          Task: {{modelDataset}}<br>
          Type: {{modelType}}<br>
          Acc: {{modelAcc}}<br>
          Params: {{modelParams}}<br>
          Flops: {{modelFlops}}<br>
          Path: {{modelPath}}
        </label>
      </div>




      <div style="margin: 0 0 20px 0; text-align: left;">
        <label style="margin-left: 50px; font-size:18px; border: 0; color: black; word-wrap: break-word; white-space: pre-wrap;">Step1: Choose whether to employ sparse learning.
          Without sparse learning, online pruning can be made immediately at a slight sacrifice in accuracy (&lt;1%).</label>
      </div>
      <div style="margin: 0 0 20px 0; text-align: left;">
        <el-radio-group @click="criterion=''" style="margin-left: 50px; border: 0; color: black; " v-model="radio1">
          <el-radio label="sl" size="large" border>With Sparse Learning</el-radio>
          <el-radio label="wosl" size="large" border>Without Sparse Learning</el-radio>
        </el-radio-group>
      </div>
      <div style="margin: 0 0 20px 0; text-align: left;">
        <label style="margin-left: 50px; font-size:18px; border: 0; color: black; word-wrap: break-word; white-space: pre-wrap;">Step2: Select the pruner,
          the choice of whether to employ sparse learning will determine the available pruner.</label>
      </div>
      <div v-show="radio1==='sl'" style="margin: 0 0 20px 0; text-align: left;">
        <el-radio-group style="margin-left: 50px; border: 0; color: black; " v-model="criterion">
          <el-radio label="slim" size="large" border>BNScale Pruner</el-radio>
          <el-radio label="group_slim" size="large" border>BNScale&GroupLasso Pruner</el-radio>
          <el-radio label="group_sl" size="large" border>GroupNorm Pruner</el-radio>
          <el-radio label="growing_reg" size="large" border>GrowingReg Pruner</el-radio>

        </el-radio-group>
      </div>

      <div v-show="radio1==='wosl'" style="margin: 0 0 20px 0; text-align: left;">
        <el-radio-group style="margin-left: 50px; border: 0; color: black; " v-model="criterion">
          <el-radio label="l1" size="large" border>Magnitude Pruner</el-radio>
          <el-radio label="random" size="large" border>Magnitude Pruner(random)</el-radio>
          <el-radio label="lamp" size="large" border>BNScale Pruner</el-radio>
          <el-radio label="group_norm" size="large" border>GroupNormPruner</el-radio>

        </el-radio-group>
      </div>

      <div v-show="radio1!='wosl' && radio1!='sl'" style="margin: 0 0 20px 0; text-align: left;">
        <label style="margin-left: 50px; font-size:18px; border: 0; color: black; word-wrap: break-word; white-space: pre-wrap; color: #800E25">Complete Step1 first.</label>
      </div>

      <div style="margin: 0 0 20px 0; text-align: left;">
        <label style="margin-left: 50px; font-size:18px; border: 0; color: black; word-wrap: break-word; white-space: pre-wrap;">Step3: Choose batch size for
          sparse learning, evaluation and finetuning. It is recommended to choose 128, but if the task fails, you could choose a smaller one.</label>
      </div>
      <div style="margin: 0 0 20px 0; text-align: left;">
        <el-radio-group style="margin-left: 50px; border: 0; color: black; " v-model="batchsize">
          <el-radio label=32 size="large" border>32</el-radio>
          <el-radio label=64 size="large" border>64</el-radio>
          <el-radio label=128 size="large" border>128</el-radio>
        </el-radio-group>
      </div>


      <div style="margin: 0 0 20px 0; text-align: left;">
        <label style="margin-left: 50px; font-size:18px; border: 0; color: black; word-wrap: break-word; white-space: pre-wrap;">Step4: Enter the minimum desired
          speedup for the pruned model in terms of FLOPs. This must be a number greater than 1 but not exceeding 10.</label>
      </div>
      <div style="margin: 0 0 20px 0; text-align: left;">
        <el-input
            v-model="speedup"
            placeholder="Please input"
            style="margin-left: 50px; border: 0; color: black; width: 8%"
        />
      </div>

      <div style="margin: 0 0 20px 0; text-align: left;">
        <label style="margin-left: 50px; font-size:18px; border: 0; color: black; word-wrap: break-word; white-space: pre-wrap;">Step5: Choose whether to fine-tune.
          Online fine-tuning is currently not supported on this server.</label>
      </div>
      <div style="margin: 0 0 20px 0; text-align: left;">
        <el-radio-group style="margin-left: 50px; border: 0; color: black; " v-model="finetune">
          <el-radio label="True" size="large" border>fine-tune</el-radio>
          <el-radio label="False" size="large" border>not fine-tune</el-radio>
        </el-radio-group>
      </div>

      <div style="margin: 0 0 20px 0; text-align: center">
        <el-button size="large" type="primary" plain @click="GenerateScript()">Generate Script</el-button>
        <el-button v-if="radio1==='wosl' && finetune==='False'" size="large" type="warning" plain @click="OnlinePruning()">Online Prune</el-button>
        <el-button v-else size="large" type="success" plain @click="Info()">Submit Task</el-button>
      </div>

      <div style="margin: 0 0 20px 0; text-align: left;">
        <el-input
            v-model="script"
            v-show="scriptVisible"
            autosize
            type="textarea"
            placeholder="Please input"
            style="margin-left: 50px;  border: 0; width: 95%"
        />
      </div>
    </div>
  </el-dialog>

<!--  <div class="holly-section" v-loading="resultLoading">-->
<!--    <h2 style="font-size: 25px;">Input the name of your attribution algorithm</h2>-->
<!--    <el-input v-model="userQuery" style="width:300px; margin: 10px 0 20px 0;" :rows="1" type="textarea"/>-->

<!--    <div style="display: flex; justify-content: space-between;">-->

<!--      <div style="width: 48%">-->
<!--        <h2 style="font-size: 25px;">Upload the morf result</h2>-->
<!--        <el-upload-->
<!--            ref="uploadRef"-->
<!--            method="post"-->
<!--            class="upload-demo"-->
<!--            drag-->
<!--            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"-->
<!--            :before-upload="checkFile"-->
<!--            :on-preview="handlePictureCardPreview"-->
<!--            :on-remove="handleRemove"-->
<!--            :on-change="handleChange1"-->
<!--            :limit="1"-->
<!--            :file-list="uploadFileList"-->
<!--            style="margin: 10px 0 10px 0;"-->
<!--        >-->
<!--          <el-icon class="el-icon&#45;&#45;upload"><upload-filled /></el-icon>-->
<!--          <div class="el-upload__text">-->
<!--            Drop file here or <em>click to upload</em>-->
<!--          </div>-->
<!--          <template #tip>-->
<!--            <div class="el-upload__tip">-->
<!--              csv file with a size less than 500kb-->
<!--            </div>-->
<!--          </template>-->
<!--        </el-upload>-->
<!--&lt;!&ndash;        <el-button size="large" style="margin: 0 0 10px 0;" type="warning" @click="uploadCsv('morf')" plain>Upload</el-button>&ndash;&gt;-->
<!--      </div>-->

<!--      <div style="width: 48%">-->
<!--        <h2 style="font-size: 25px;">Upload the lerf result</h2>-->
<!--        <el-upload-->
<!--            ref="uploadRef2"-->
<!--            method="post"-->
<!--            class="upload-demo"-->
<!--            drag-->
<!--            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"-->
<!--            :before-upload="checkFile2"-->
<!--            :on-preview="handlePictureCardPreview"-->
<!--            :on-remove="handleRemove"-->
<!--            :on-change="handleChange2"-->
<!--            :limit="1"-->
<!--            :file-list="uploadFileList2"-->
<!--            style="margin: 10px 0 10px 0;"-->
<!--        >-->
<!--          <el-icon class="el-icon&#45;&#45;upload"><upload-filled /></el-icon>-->
<!--          <div class="el-upload__text">-->
<!--            Drop file here or <em>click to upload</em>-->
<!--          </div>-->
<!--          <template #tip>-->
<!--            <div class="el-upload__tip">-->
<!--              csv file with a size less than 500kb-->
<!--            </div>-->
<!--          </template>-->
<!--        </el-upload>-->
<!--&lt;!&ndash;        <el-button size="large" style="margin: 0 0 10px 0;" type="warning" @click="uploadCsv('lerf')" plain>Upload</el-button>&ndash;&gt;-->
<!--      </div>-->


<!--    </div>-->




<!--    <div style="display: flex; justify-content: center">-->
<!--      <el-button size="large" style="margin: 50px 0 10px 0;" type="success" @click="getUsrRank" plain>Get your current scores and meta-rank</el-button>-->
<!--    </div>-->

<!--&lt;!&ndash;    :style="{visibility:resultShow?'visible':'hidden'}"&ndash;&gt;-->

<!--  <div v-show="resultShow">-->
<!--    <h2 style="font-size: 25px; margin: 20px 0 20px 0;">The original Meta-Rank</h2>-->
<!--    <b-table-->
<!--        striped-->
<!--        hover-->
<!--        responsive-->
<!--        :items="servers"-->
<!--        :fields="fields"-->
<!--        :current-page="currentPage"-->
<!--        :per-page="perPage"-->
<!--        outlined-->
<!--    >-->
<!--    </b-table>-->
<!--    <div style="display: flex; justify-content: center;">-->
<!--      <b-pagination-->
<!--          v-model="currentPage"-->
<!--          :total-rows="servers.length"-->
<!--          :per-page="perPage"-->
<!--          align="right"-->
<!--          :style="style.pagination"-->
<!--      ></b-pagination>-->
<!--    </div>-->



<!--    <h2 style="font-size: 25px; margin: 20px 0 20px 0;">Current Meta-Rank</h2>-->
<!--    <b-table-->
<!--        striped-->
<!--        hover-->
<!--        responsive-->
<!--        :items="servers2"-->
<!--        :fields="fields"-->
<!--        :current-page="currentPage2"-->
<!--        :per-page="perPage"-->
<!--        outlined-->
<!--    >-->
<!--    </b-table>-->
<!--    <div style="display: flex; justify-content: center;">-->
<!--      <b-pagination-->
<!--          v-model="currentPage2"-->
<!--          :total-rows="servers2.length"-->
<!--          :per-page="perPage"-->
<!--          align="right"-->
<!--          :style="style.pagination"-->
<!--      ></b-pagination>-->
<!--    </div>-->


<!--    <h2 style="font-size: 25px;">Upload your attribution algorithm (python file, optional)</h2>-->
<!--    <el-upload-->
<!--        ref="uploadRef3"-->
<!--        method="post"-->
<!--        class="upload-demo"-->
<!--        drag-->
<!--        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"-->
<!--        :before-upload="checkFilePython"-->
<!--        :on-preview="handlePictureCardPreview"-->
<!--        :on-remove="handleRemove"-->
<!--        :on-change="handleChange3"-->
<!--        :limit="1"-->
<!--        :file-list="uploadFileList3"-->
<!--        style="margin: 10px 0 10px 0;"-->
<!--    >-->
<!--      <el-icon class="el-icon&#45;&#45;upload"><upload-filled /></el-icon>-->
<!--      <div class="el-upload__text">-->
<!--        Drop file here or <em>click to upload</em>-->
<!--      </div>-->
<!--      <template #tip>-->
<!--        <div class="el-upload__tip">-->
<!--          python file with a size less than 500kb-->
<!--        </div>-->
<!--      </template>-->
<!--    </el-upload>-->

<!--    <h2 style="font-size: 25px; margin: 20px 0 0 0;">Provide your email address for future contact.</h2>-->
<!--    <el-input v-model="Email" style="width:300px; margin: 10px 0 20px 0;" :rows="1" type="textarea"/>-->

<!--    <h2 style="font-size: 25px; margin: 20px 0 10px 0;"  >Provide detailed information</h2>-->
<!--    Please furnish further details about your attribution algorithm for its inclusion in the rankings. This information might encompass relevant research papers and open-source code associated with your algorithm. We also welcome you to contact us via email using your institutional email at jerryduan@zju.edu.cn.-->
<!--    <br>-->
<!--    <el-input v-model="Infos" style="margin: 10px 0 0 0;" :rows="3" type="textarea"/>-->
<!--        &lt;!&ndash;        <el-button size="large" style="margin: 0 0 10px 0;" type="warning" @click="uploadCsv('morf')" plain>Upload</el-button>&ndash;&gt;-->

<!--    <div style="display: flex; justify-content: left">-->
<!--      <el-button size="large" style="margin: 50px 0 10px 0;" type="warning" @click="SubmitAlgorithm" plain>Submit your algorithm</el-button>-->
<!--    </div>-->

<!--  </div>-->
<!--  </div>-->





</template>

<script lang="ts" setup>
import { UploadFilled } from '@element-plus/icons-vue'
import {ElMessage, UploadInstance, UploadProps} from "element-plus";
import { ref } from 'vue';
import axios from "axios";
import {useStore} from "vuex";
import request from "@/api";
import {router} from "@/router";

import $ from 'jquery'
import * as d3 from 'd3';
import { reactive, onMounted} from "vue";
import '@fortawesome/fontawesome-free/css/all.css'
import request2 from "@/api";

// 使用ref创建一个变量，用于记录已上传的文件

const modelType = ref('')
const modelPath = ref('')
const modelAcc = ref(0)
const modelParams = ref('')
const modelFlops = ref('')
const modelName = ref('')
const modelDataset = ref('')

const paramsChange = ref('')
const FLOPsChange = ref('')
const AccChange = ref('')
const LossChange = ref('')

const PrunedPath = ref('')

const script = ref('')
const speedup = ref()
const batchsize = ref(0)
const finetune = ref('')
const criterion = ref('')
const radio1 = ref('sl')
const PrunedialogVisible = ref(false);
const uploadRef = ref<UploadInstance>();
const uploadRef2 = ref<UploadInstance>();
const uploadRef3 = ref<UploadInstance>();
const uploadFileList = ref([]);
const uploadFileList2 = ref([]);
const uploadFileList3 = ref([]);
const store = useStore();
const userQuery = ref('')
const Email = ref('')
const Infos = ref('')
const morf = ref('')
const lerf = ref('')
const pythonValue = ref('')
const servers = ref([])
const servers2 = ref([])
const currentPage = ref(1)
const currentPage2 = ref(1)
const perPage = ref(8)
// const perPage2 = ref(8)
const score = ref(0.0)
const rank = ref(666)
let resultLoading = ref(false)
let resultShow = ref(false)
const morfUploaded = ref(false)
const lerfUploaded = ref(false)
const pythonUploaded = ref(false)
// const lerfUploaded = ref(false)
let checkCsv = ref(false)
let checkCsv2 = ref(false)
let checkPython = ref(false)


const style = ref({
  pagination: {
    marginTop: '20px'
  },
  down: {
    marginBottom: '20px'
  }
})


const fields = ref([
  {
    key: 'ranking',
    label: 'Ranking',
    class: 'text-center'
  },
  {
    key: 'username',
    label: 'contributor',
    sortable: true,
    class: 'text-center'
  },
  {
    key: 'institute',
    label: 'institute',
    sortable: true,
    class: 'text-center'
  },
  {
    key: 'name',
    label: 'algorithm',
    class: 'text-center'
  },
  {
    key: 'score',
    label: 'metascore',
    stickyColumn: true,
    class: 'text-center'
  }
])

var nodes;
var dragStarted;
var domNode;
const scriptVisible = ref(false);
const dialogVisible = ref(false);
const dialogVisible_interp = ref(false);
const dialogVisible_atenhoc = ref(false);
const dialogVisible_posthoc = ref(false);
const dialogVisible_local = ref(false);
const dialogVisible_global = ref(false);
const dialogVisible_attention = ref(false);
const dialogVisible_tree = ref(false);
const dialogVisible_intro_concept = ref(false);
const dialogVisible_intro_constituent = ref(false);
const resultLoading2 = ref(false)
const modelzoo = ref();
// dialogVisible_global

const activeTab = ref('cn')

function showDialog() {
  console.log("进来了")
  dialogVisible.value = true;
}
function showDialog_interp() {
  // console.log("进来了")
  dialogVisible_interp.value = true;
}
function showDialog_atenhoc() {
  // console.log("进来了")
  dialogVisible_atenhoc.value = true;
}
function showDialog_posthoc() {
  // console.log("进来了")
  dialogVisible_posthoc.value = true;
}
function showDialog_local() {
  // console.log("进来了")
  dialogVisible_local.value = true;
}
function showDialog_global() {
  // console.log("进来了")
  dialogVisible_global.value = true;
}
function showDialog_attention() {
  // console.log("进来了")
  dialogVisible_attention.value = true;
}
function showDialog_tree() {
  // console.log("进来了")
  dialogVisible_tree.value = true;
}
function showDialog_intro_concept() {
  // console.log("进来了")
  dialogVisible_intro_concept.value = true;
}
function showDialog_intro_Constituent() {
  // console.log("进来了")
  dialogVisible_intro_constituent.value = true;
}

// const getModelZoo = () => {
//   request2.post(`/user/getModelZoo`, {
//   })
//       .then((response) => {
//         let ranks = response.data
//         // console.log("response.data.data", response.data.data)
//         console.log("ranks: ", ranks)
//         // ranks = ranks.map(addSelectField)
//         // for (let rank of ranks) {
//         //     rank.link = '详情'
//         // }
//         // console.log('getranks')
//         modelzoo.value = ranks
//       })
//       .catch((errors) => {
//         console.log('error', errors)
//       })
// }

const Info = () => {
  ElMessage.error("Online sparse learning and fine-tune has not been implemented on this server!")
}

const OnlinePruning = async () => {
  console.log("speedup.value:", speedup.value)
  if(radio1.value!='sl'&&radio1.value!='wosl'){
    ElMessage.error("Choose whether to employ sparse learning!")
  }else if(criterion.value===''){
    ElMessage.error("Select the pruner!")
  }else if(batchsize.value===0){
    ElMessage.error("Choose the batch size for sparse learning, evaluation and finetuning!")
  }else if(speedup.value<=1||speedup.value>10||speedup.value===undefined){
    ElMessage.error("Speedup must be a number greater than 1 and not exceeding 10!")
  }else if(finetune.value===''){
    ElMessage.error("Choose whether to fine-tune!")
  }else{
    let modelname = ''
    if(modelName.value==="ResNet56(tiny)"){
      modelname = "resnet56"
    }else if(modelName.value==="SE-ResNet"){
      modelname = "se_resnet20"
    }else{
      modelname = modelName.value
    }
    modelname = modelname.toLowerCase()
    let dataroot
    let dataset
    let sl
    if(modelDataset.value==='CIFAR10 (Classification)'){
      dataroot = '/nfs/lhl/datasets/cifar/cifar-10-batches-py'
      dataset = 'cifar10'
    }else if(modelDataset.value==='CIFAR100 (Classification)'){
      dataroot = '/nfs/lhl/datasets/cifar/cifar-100-python'
      dataset = 'cifar100'
    }
    if(radio1.value==="sl"){
      sl = 'True'
    }else if(radio1.value==="wosl"){
      sl = 'False'
    }
    let tempScript = "python /nfs/lhl/Torch-Pruning/benchmarks/main_system.py --mode prune --model "+modelname+" --batch-size "+batchsize.value+" --restore " + modelPath.value + " --dataroot "+dataroot+" --output-dir /nfs/lhl/Torch-Pruning/benchmarks/log/prune --pretrain False  --dataset "+dataset+"  --method "+criterion.value+" --speed-up "+speedup.value+" --global-pruning --reg 5e-4 --sl "+sl+" --finetune "+finetune.value
    console.log("tempScript: ", tempScript)
    resultLoading2.value = true
    await request.post('/algorithm/callPruneAlgorithm',{
      algorithmName:'CUB-200-2011',
      datasetId: 666,
      datasetName: "CUB_CARS",
      modelName: tempScript,
      userName: tempScript,
    }).then(async (response) => {
      console.log("prune response.data", response.data)
      let arr = response.data.data.result
      // 取出最后四行
      let lastFourRows = arr.slice(-4);
      paramsChange.value = lastFourRows[0]
      FLOPsChange.value = lastFourRows[1]
      AccChange.value = lastFourRows[2]
      LossChange.value = lastFourRows[3]
      PrunedPath.value = lastFourRows[4]
      console.log("paramsChange.value", paramsChange.value)
      console.log("FLOPsChange.value", FLOPsChange.value)
      console.log("AccChange.value", AccChange.value)
      console.log("LossChange.value", LossChange.value)
      dialogVisible.value = true
    })
    .catch((error)=>{
      console.error(error)
    })
    resultLoading2.value = false
  }


}

const GenerateScript = () => {
  console.log("speedup.value:", speedup.value)
  if(radio1.value!='sl'&&radio1.value!='wosl'){
    ElMessage.error("Choose whether to employ sparse learning!")
  }else if(criterion.value===''){
    ElMessage.error("Select the pruner!")
  }else if(batchsize.value===0){
    ElMessage.error("Choose the batch size for sparse learning, evaluation and finetuning!")
  }else if(speedup.value<=1||speedup.value>10||speedup.value===undefined){
    ElMessage.error("Speedup must be a number greater than 1 and not exceeding 10!")
  }else if(finetune.value===''){
    ElMessage.error("Choose whether to fine-tune!")
  }else{
    let modelname = ''
    if(modelName.value==="ResNet56(tiny)"){
      modelname = "resnet56"
    }else if(modelName.value==="SE-ResNet"){
      modelname = "se_resnet20"
    }else{
      modelname = modelName.value
    }
    modelname = modelname.toLowerCase()
    let dataroot
    let dataset
    let sl
    if(modelDataset.value==='CIFAR10 (Classification)'){
      dataroot = '/nfs/lhl/datasets/cifar/cifar-10-batches-py'
      dataset = 'cifar10'
    }else if(modelDataset.value==='CIFAR100 (Classification)'){
      dataroot = '/nfs/lhl/datasets/cifar/cifar-100-python'
      dataset = 'cifar100'
    }
    if(radio1.value==="sl"){
      sl = 'True'
    }else if(radio1.value==="wosl"){
      sl = 'False'
    }
    script.value = "python /nfs/lhl/Torch-Pruning/benchmarks/main_system.py --mode prune --model "+modelname+" --batch-size "+batchsize.value+" --restore " + modelPath.value + " --dataroot "+dataroot+" --output-dir /nfs/lhl/Torch-Pruning/benchmarks/log/prune --pretrain False  --dataset "+dataset+"  --method "+criterion.value+" --speed-up "+speedup.value+" --global-pruning --reg 5e-4 --sl "+sl+" --finetune "+finetune.value
    console.log("script.value: ", script.value)
    scriptVisible.value = true;
  }


}


onMounted(async () => {
  var json;
  try {
    const response = await request2.post(`/user/getModelZoo`, {});
    json = response.data;
    console.log("json: ", json);
  } catch (error) {
    console.log('error', error);
  }
  console.log('json', json)

  var treeData = json;
  var totalNodes = 0;
  var maxLabelLength = 0;
// variables for drag/drop
  var selectedNode = null;
  var draggingNode = null;
// panning variables
  var panSpeed = 200;
  var panBoundary = 20; // Within 20px from edges will pan when dragging.
// Misc. variables
  var i = 0;
  var duration = 750;
  var root;

// size of the diagram
  var viewerWidth = $(document).height();
  var viewerHeight = $(document).width();

  var tree = d3.layout.tree()
      .size([viewerHeight, viewerWidth]);

// define a d3 diagonal projection for use by the node paths later on.
  var diagonal = d3.svg.diagonal()
      .projection(function(d) {
        return [d.y, d.x];
      });

// A recursive helper function for performing some setup by walking through all nodes

  function visit(parent, visitFn, childrenFn) {
    if (!parent) return;

    visitFn(parent);

    var children = childrenFn(parent);
    if (children) {
      var count = children.length;
      for (var i = 0; i < count; i++) {
        visit(children[i], visitFn, childrenFn);
      }
    }
  }

// Call visit function to establish maxLabelLength
  visit(treeData, function(d) {
    totalNodes++;
    maxLabelLength = Math.max(d.name.length, maxLabelLength);

  }, function(d) {
    return d.children && d.children.length > 0 ? d.children : null;
  });


// sort the tree according to the node names

  function sortTree() {
    console.log("执行了此函数")
    console.log(json)
    tree.sort(function(a, b) {
      return b.name.toLowerCase() < a.name.toLowerCase() ? 1 : -1;
    });
  }
// Sort the tree initially incase the JSON isn't in a sorted order.
  sortTree();

// TODO: Pan function, can be better implemented.

  function pan(domNode, direction) {
    var speed = panSpeed;
    if (panTimer) {
      clearTimeout(panTimer);
      var translateCoords = d3.transform(svgGroup.attr("transform"));
      if (direction == 'left' || direction == 'right') {
        var translateX = direction == 'left' ? translateCoords.translate[0] + speed : translateCoords.translate[0] - speed;
        var translateY = translateCoords.translate[1];
      } else if (direction == 'up' || direction == 'down') {
        translateX = translateCoords.translate[0];
        translateY = direction == 'up' ? translateCoords.translate[1] + speed : translateCoords.translate[1] - speed;
      }
      var scaleX = translateCoords.scale[0];
      var scaleY = translateCoords.scale[1];
      var scale = zoomListener.scale();
      svgGroup.transition().attr("transform", "translate(" + translateX + "," + translateY + ")scale(" + scale + ")");
      d3.select(domNode).select('g.node').attr("transform", "translate(" + translateX + "," + translateY + ")");
      zoomListener.scale(zoomListener.scale());
      zoomListener.translate([translateX, translateY]);
      var panTimer = setTimeout(function() {
        pan(domNode, speed, direction);
      }, 50);
    }
  }

// Define the zoom function for the zoomable tree

  function zoom() {
    // if (d3.event.sourceEvent.ctrlKey) {
    //   svgGroup.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    // }

    svgGroup.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
  }


// define the zoomListener which calls the zoom function on the "zoom" event constrained within the scaleExtents
  const zoomListener = d3.behavior
      .zoom()
      .scaleExtent([0.1, 3])
      // .filter(function () {
      //   return d3.event.ctrlKey;
      // })
      .on("zoom", zoom);

  function initiateDrag(d, domNode) {
    draggingNode = d;
    d3.select(domNode).select('.ghostCircle').attr('pointer-events', 'none');
    d3.selectAll('.ghostCircle').attr('class', 'ghostCircle show');
    d3.select(domNode).attr('class', 'node activeDrag');

    svgGroup.selectAll("g.node").sort(function(a, b) { // select the parent and sort the path's
      if (a.id != draggingNode.id) return 1; // a is not the hovered element, send "a" to the back
      else return -1; // a is the hovered element, bring "a" to the front
    });
    // if nodes has children, remove the links and nodes
    if (nodes.length > 1) {
      // remove link paths
      var links = tree.links(nodes);
      var nodePaths = svgGroup.selectAll("path.link")
          .data(links, function(d) {
            return d.target.id;
          }).remove();
      // remove child nodes
      var nodesExit = svgGroup.selectAll("g.node")
          .data(nodes, function(d) {
            return d.id;
          }).filter(function(d, i) {
            if (d.id == draggingNode.id) {
              return false;
            }
            return true;
          }).remove();
    }

    // remove parent link
    var parentLink = tree.links(tree.nodes(draggingNode.parent));
    svgGroup.selectAll('path.link').filter(function(d, i) {
      if (d.target.id == draggingNode.id) {
        return true;
      }
      return false;
    }).remove();

    dragStarted = null;
  }


  // 选择tree-container元素
  const container = d3.select('#tree-container');

// 检查是否存在子元素，如果有则删除
  if (!container.empty()) {
    container.select('svg').remove();
  }

// define the baseSvg, attaching a class for styling and the zoomListener

  var baseSvg = d3.select("#tree-container").append("svg")
      .attr("width", viewerWidth)
      .attr("height", viewerHeight)
      .attr("class", "overlay")
      .call(zoomListener);

  //
  // var baseSvg = d3.select("#tree-container").append("svg")
  //     .attr("width", viewerWidth)
  //     .attr("height", viewerHeight)
  //     .attr("class", "not-scaling")  // 设置为 "not-scaling"
  //     .call(zoomListener)
  //     .on("wheel.zoom", function(event) {
  //       if (event.ctrlKey) {
  //         event.preventDefault();
  //         zoomListener.scaleBy(d3.select(this), Math.pow(2, event.deltaY * 0.002));
  //       }
  //     });




//
//   // 添加提示信息
//   baseSvg.append("text")
//       .attr("x", 10)
//       .attr("y", 20)
//       .text("这是一棵此系统所包含可解释性方法的分类树")
//       .attr("fill", "#333")
//       .attr("font-size", "14px")
//       .attr("font-weight", "bold");
//
//   baseSvg.append("text")
//       .attr("x", 10)
//       .attr("y", 45)
//       .text("Tips:")
//       .attr("fill", "#333")
//       .attr("font-size", "12px")
//       .attr("font-weight", "bold");
//
//   baseSvg.append("text")
//       .attr("x", 20)
//       .attr("y", 65)
//       .text("1.拖动屏幕可以移动树")
//       .attr("fill", "#333")
//       .attr("font-size", "12px");
//
//   baseSvg.append("text")
//       .attr("x", 20)
//       .attr("y", 85)
//       .text("2.鼠标滚轮转动可以改变树的大小")
//       .attr("fill", "#333")
//       .attr("font-size", "12px");
//
//   baseSvg.append("text")
//       .attr("x", 20)
//       .attr("y", 105)
//       .text("3.左键单击节点可以收缩和扩张节点")
//       .attr("fill", "#333")
//       .attr("font-size", "12px");
//
//   baseSvg.append("text")
//       .attr("x", 20)
//       .attr("y", 125)
//       .text("4.右键单击节点可以查看详细介绍")
//       .attr("fill", "#333")
//       .attr("font-size", "12px");
//
//   baseSvg.append("text")
//       .attr("x", 20)
//       .attr("y", 145)
//       .text("5.拖动节点可以试图将方法分离出树，但是这不会成功")
//       .attr("fill", "#333")
//       .attr("font-size", "12px");
//
// // 添加按钮
//   var tooltipButton = baseSvg.append('g')
//       .attr('class', 'button-group')
//       .attr('transform', 'translate(10,180)');
//
//   tooltipButton.append('rect')
//       .attr('class', 'button-rect')
//       .attr('width', 150)
//       .attr('height', 30)
//       .attr('rx', 15)
//       .attr('ry', 15)
//       .attr('fill', '#409EFF')
//       .on('click', function() {
//         window.open('https://example.com/');
//       });
//
//   tooltipButton.append('text')
//       .attr('class', 'button-text')
//       .attr('x', 75)
//       .attr('y', 20)
//       .attr('text-anchor', 'middle')
//       .text('点击查看我们对于可解释性的评估标准')
//       .attr('fill', '#FFFFFF')
//       .attr('alignment-baseline', 'central');



// .attr("style", "background: url('@/assets/background.jpg');background-size: cover;")

// console.log("querySelector id: ", document.querySelector('#tree-container'));
// console.log("querySelector id2: ", document.querySelector('tree-container'));
// console.log("id: ", document.getElementById("tree-container"))
// console.log("d3.select: ", d3.select("#tree-container"))
// console.log("viewerWidth: ", viewerWidth)
// console.log("viewerHeight: ", viewerHeight)
// console.log("zoomListener: ", zoomListener)
  console.log("baseSvg: ", baseSvg)


// Define the drag listeners for drag/drop behaviour of nodes.
  var dragListener = d3.behavior.drag()
      .on("dragstart", function(d) {
        if (d == root) {
          return;
        }
        dragStarted = true;
        nodes = tree.nodes(d);
        d3.event.sourceEvent.stopPropagation();
        // it's important that we suppress the mouseover event on the node being dragged. Otherwise it will absorb the mouseover event and the underlying node will not detect it d3.select(this).attr('pointer-events', 'none');
      })
      .on("drag", function(d) {
        if (d == root) {
          return;
        }
        if (dragStarted) {
          domNode = this;
          initiateDrag(d, domNode);
        }

        // get coords of mouseEvent relative to svg container to allow for panning
        var relCoords = d3.mouse($('svg').get(0));
        if (relCoords[0] < panBoundary) {
          var panTimer = true;
          pan(this, 'left');
        } else if (relCoords[0] > ($('svg').width() - panBoundary)) {

          panTimer = true;
          pan(this, 'right');
        } else if (relCoords[1] < panBoundary) {
          panTimer = true;
          pan(this, 'up');
        } else if (relCoords[1] > ($('svg').height() - panBoundary)) {
          panTimer = true;
          pan(this, 'down');
        } else {
          try {
            clearTimeout(panTimer);
          } catch (e) {

          }
        }

        d.x0 += d3.event.dy;
        d.y0 += d3.event.dx;
        var node = d3.select(this);
        node.attr("transform", "translate(" + d.y0 + "," + d.x0 + ")");
        updateTempConnector();
      }).on("dragend", function(d) {
        if (d == root) {
          return;
        }
        domNode = this;
        if (selectedNode) {
          // now remove the element from the parent, and insert it into the new elements children
          var index = draggingNode.parent.children.indexOf(draggingNode);
          if (index > -1) {
            draggingNode.parent.children.splice(index, 1);
          }
          if (typeof selectedNode.children !== 'undefined' || typeof selectedNode._children !== 'undefined') {
            if (typeof selectedNode.children !== 'undefined') {
              selectedNode.children.push(draggingNode);
            } else {
              selectedNode._children.push(draggingNode);
            }
          } else {
            selectedNode.children = [];
            selectedNode.children.push(draggingNode);
          }
          // Make sure that the node being added to is expanded so user can see added node is correctly moved
          expand(selectedNode);
          sortTree();
          endDrag();
        } else {
          endDrag();
        }
      });

  function endDrag() {
    selectedNode = null;
    d3.selectAll('.ghostCircle').attr('class', 'ghostCircle');
    d3.select(domNode).attr('class', 'node');
    // now restore the mouseover event or we won't be able to drag a 2nd time
    d3.select(domNode).select('.ghostCircle').attr('pointer-events', '');
    updateTempConnector();
    if (draggingNode !== null) {
      update(root);
      centerNode(draggingNode);
      draggingNode = null;
    }
  }

// Helper functions for collapsing and expanding nodes.

  function collapse(d) {
    if (d.children) {
      d._children = d.children;
      d._children.forEach(collapse);
      d.children = null;
    }
  }

  function expand(d) {
    if (d._children) {
      d.children = d._children;
      d.children.forEach(expand);
      d._children = null;
    }
  }

  var overCircle = function(d) {
    selectedNode = d;
    updateTempConnector();
  };
  var outCircle = function(d) {
    selectedNode = null;
    updateTempConnector();
  };

// Function to update the temporary connector indicating dragging affiliation
  var updateTempConnector = function() {
    var data = [];
    if (draggingNode !== null && selectedNode !== null) {
      // have to flip the source coordinates since we did this for the existing connectors on the original tree
      data = [{
        source: {
          x: selectedNode.y0,
          y: selectedNode.x0
        },
        target: {
          x: draggingNode.y0,
          y: draggingNode.x0
        }
      }];
    }
    var link = svgGroup.selectAll(".templink").data(data);

    link.enter().append("path")
        .attr("class", "templink")
        .attr("d", d3.svg.diagonal())
        .attr('pointer-events', 'none');

    link.attr("d", d3.svg.diagonal());

    link.exit().remove();
  };

// Function to center node when clicked/dropped so node doesn't get lost when collapsing/moving with large amount of children.

  function centerNode(source) {
    var scale = zoomListener.scale();
    var x = -source.y0;
    var y = -source.x0;
    x = x * scale + viewerHeight / 20;
    y = y * scale + viewerHeight / 2;
    d3.select('g').transition()
        .duration(duration)
        .attr("transform", "translate(" + x + "," + y + ")scale(" + scale + ")");
    zoomListener.scale(scale);
    zoomListener.translate([x, y]);
  }

// Toggle children function

  function toggleChildren(d) {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else if (d._children) {
      d.children = d._children;
      d._children = null;
    }
    return d;
  }
/////////////////////////////////////////////////
///////////////// IMAGE DEFS ////////////////////
/////////////////////////////////////////////////

  d3.select('svg').append('defs').append("pattern")
      .attr("id", "img1")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/tool2.jpg")
      .attr("x", -10)
      .attr("y", -14)
      .attr("width", 60)
      .attr("height", 62);

  d3.select('svg').append('defs').append("pattern")
      .attr("id", "grid")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/grid.png")
      .attr("x", -10)
      .attr("y", -14)
      .attr("width", 60)
      .attr("height", 62);

  d3.select('svg').append('defs').append("pattern")
      .attr("id", "local")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/local2.jpg")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 40)
      .attr("height", 40);

  d3.select('svg').append('defs').append("pattern")
      .attr("id", "post-hoc")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/post-hoc.png")
      .attr("x", 0)
      .attr("y", 1)
      .attr("width", 40)
      .attr("height", 40);

  d3.select('svg').append('defs').append("pattern")
      .attr("id", "ad-hoc")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/ad-hoc.png")
      .attr("x", 0)
      .attr("y", -9)
      .attr("width", 60)
      .attr("height", 60);

  d3.select('svg').append('defs').append("pattern")
      .attr("id", "attention2")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/attention2.jpg")
      .attr("x", -5)
      .attr("y", -13)
      .attr("width", 60)
      .attr("height", 60);

  d3.select('svg').append('defs').append("pattern")
      .attr("id", "prototype")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/prototype.jpg")
      .attr("x", 0)
      .attr("y", -13)
      .attr("width", 60)
      .attr("height", 60);

  d3.select('svg').append('defs').append("pattern")
      .attr("id", "concept")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/concept.png")
      .attr("x", 2)
      .attr("y", 0)
      .attr("width", 40)
      .attr("height", 40);

  baseSvg.append('defs').append("pattern")
      .attr("id", "classification")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7667/img/background/classification.jpg")
      .attr("x", 0)
      .attr("y", -10)
      .attr("width", 60)
      .attr("height", 60);

  baseSvg.append('defs').append("pattern")
      .attr("id", "upload")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7667/img/background/upload.png")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 40)
      .attr("height", 40);

  baseSvg.append('defs').append("pattern")
      .attr("id", "pretrain")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7667/img/background/pretrain.jpg")
      .attr("x", 2)
      .attr("y", 0)
      .attr("width", 40)
      .attr("height",40);

  baseSvg.append('defs').append("pattern")
      .attr("id", "conv")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7667/img/background/conv.png")
      .attr("x", -4)
      .attr("y", -2)
      .attr("width", 49)
      .attr("height",44);

  baseSvg.append('defs').append("pattern")
      .attr("id", "vgg")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7667/img/background/vgg.png")
      .attr("x", 2)
      .attr("y", 1)
      .attr("width", 45)
      .attr("height",40);

  baseSvg.append('defs').append("pattern")
      .attr("id", "resnet")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7667/img/background/ResNet.png")
      .attr("x", -10)
      .attr("y", 0)
      .attr("width", 60)
      .attr("height",40);

  baseSvg.append('defs').append("pattern")
      .attr("id", "transformer")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7667/img/background/Transformer.jpg")
      .attr("x", -4)
      .attr("y", -4)
      .attr("width", 49)
      .attr("height",49);

  baseSvg.append('defs').append("pattern")
      .attr("id", "yolo")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7667/img/background/yolo.jpg")
      .attr("x", -4)
      .attr("y", -2)
      .attr("width", 49)
      .attr("height",45);

  baseSvg.append('defs').append("pattern")
      .attr("id", "cifar")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7667/img/background/cifar.jpg")
      .attr("x", 0)
      .attr("y", -5)
      .attr("width", 60)
      .attr("height",60);

  baseSvg.append('defs').append("pattern")
      .attr("id", "imgnet")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7667/img/background/imgnet.jpg")
      .attr("x", -10)
      .attr("y", -5)
      .attr("width", 60)
      .attr("height",60);

  baseSvg.append('defs').append("pattern")
      .attr("id", "coco")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7667/img/background/coco.jpg")
      .attr("x", -10)
      .attr("y", -10)
      .attr("width", 60)
      .attr("height",60);

  d3.select('svg').append('defs').append("pattern")
      .attr("id", "proxy")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/proxy.png")
      .attr("x", -8)
      .attr("y", -10)
      .attr("width", 60)
      .attr("height", 60);

  d3.select('svg').append('defs').append("pattern")
      .attr("id", "disturbance")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/disturb.png")
      .attr("x", 3)
      .attr("y", 4)
      .attr("width", 35)
      .attr("height", 35);



  baseSvg.append('defs').append("pattern")
      .attr("id", "zebra")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/zebra.jpg")
      .attr("x", -10)
      .attr("y", -10)
      .attr("width", 60)
      .attr("height", 60);

  baseSvg.append('defs').append("pattern")
      .attr("id", "gradient2")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/gradient2.jpg")
      .attr("x", -10)
      .attr("y", -10)
      .attr("width", 60)
      .attr("height", 60);


  baseSvg.append('defs').append("pattern")
      .attr("id", "saliency")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/saliency.jpg")
      .attr("x", -10)
      .attr("y", -5)
      .attr("width", 60)
      .attr("height", 64);

  baseSvg.append('defs').append("pattern")
      .attr("id", "tcav")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/tcav.jpg")
      .attr("x", -12)
      .attr("y", -3)
      .attr("width", 60)
      .attr("height",50);

  baseSvg.append('defs').append("pattern")
      .attr("id", "tree")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/tree.jpg")
      .attr("x", 0)
      .attr("y", -8)
      .attr("width", 60)
      .attr("height",50);

  d3.select('svg').append('defs').append("pattern")
      .attr("id", "global2")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/global2.jpg")
      .attr("x", -10)
      .attr("y", -10)
      .attr("width", 60)
      .attr("height", 62);

  d3.select('svg').append('defs').append("pattern")
      .attr("id", "hl")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/vision.jpg")
      .attr("x", -10)
      .attr("y", -10)
      .attr("width", 60)
      .attr("height", 60);

  d3.select('svg').append('defs').append("pattern")
      .attr("id", "xmq")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/xmq.jpg")
      .attr("x", -10)
      .attr("y", -14)
      .attr("width", 60)
      .attr("height", 60);

  d3.select('svg').append('defs').append("pattern")
      .attr("id", "zhf")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/zhf.jpg")
      .attr("x", -10)
      .attr("y", -14)
      .attr("width", 60)
      .attr("height", 60);

  d3.select('svg').append('defs').append("pattern")
      .attr("id", "hqh")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/hqh.jpg")
      .attr("x", 0)
      .attr("y", -10)
      .attr("width", 60)
      .attr("height", 60);

  console.log("d3.select('svg'):",d3.select('svg'))

  // d3.select('svg').append('defs')
  //     .append("pattern")
  //     .attr("id", "img1")
  //     .attr("patternUnits", "userSpaceOnUse") // 设置图案单位为用户坐标系统
  //     .attr("width", "100%") // 相对于用户坐标系，定义图像相对宽度为100%
  //     .attr("height", "100%") // 相对于用户坐标系，定义图像相对高度为100%
  //     .append("image")
  //     .attr("xlink:href", "http://10.214.242.155:7996/img/background/tool.jpg")
  //     .attr("x", 0)
  //     .attr("y", 0)
  //     .attr("width", "100%") // 图片元素实际宽度为100%用户坐标系统的宽度
  //     .attr("height", "100%"); // 图片元素实际高度为100%用户坐标系统的高度




// Toggle children on click.
  // click suppressed
  // var clicked = false;
  // var clickTimeout;

  // function click(d) {
  //   if (!clicked) {
  //     clicked = true;
  //
  //     // 使用setTiemout来等待300ms
  //     clickTimeout = setTimeout(function() {
  //       // 单击操作逻辑
  //       console.log("Single Click");
  //
  //       // 将clicked重置为false
  //       clicked = false;
  //     }, 300); // 等待300毫秒
  //
  //   } else {
  //     // 取消定时器
  //     clearTimeout(clickTimeout);
  //     clicked = false;
  //
  //     // 双击操作逻辑
  //     console.log("Double Click");
  //   }
  // }


  function click(d) {
    if(d.type=='pretrained' || d.type=='users'){
      scriptVisible.value = false
      PrunedialogVisible.value = true
      console.log("d.type", d.type)
      if(d.type==='pretrained'){
        modelType.value = "Publicly pretrained model"
      }

      console.log("d.path", d.path)
      modelPath.value = d.path
      console.log("d.acc", d.acc)
      modelAcc.value = d.acc
      console.log("d.params", d.params)
      modelParams.value = d.params
      console.log("d.flops", d.flops)
      modelFlops.value = d.flops
      console.log("d.parent.name", d.parent.name)
      modelName.value = d.parent.name
      console.log("d.parent.parent.name", d.parent.parent.name)
      if(d.parent.parent.name==="CIFAR10"||d.parent.parent.name==="CIFAR100"||d.parent.parent.name==="ImageNet"){
        modelDataset.value = d.parent.parent.name + " (Classification)"
      }

      // ElMessage.success("选择了预训练模型！")
    }else if(d.type=='upload'){
      // ElMessage.success("准备上传模型")
    }else{
      if (d3.event.defaultPrevented) return; // click suppressed
      d = toggleChildren(d);
      update(d);
      centerNode(d);
    }
    // console.log("测试", d);
    // d3.event.stopPropagation();
  }

  function contextmenu(d) {
    event.preventDefault();
    console.log("d.name", d.name);
    if(d.name==="可解释性"){
      showDialog_interp();
    }if(d.name==="可解释建模"){
      showDialog_atenhoc();
    }if(d.name==="事后解释性分析"){
      showDialog_posthoc();
    }if(d.name==="局部解释"){
      showDialog_local();
    }if(d.name==="全局解释"){
      showDialog_global();
    }if(d.name==="注意力机制"){
      showDialog_attention();
    }if(d.name==="神经树"){
      showDialog_tree();
    }if(d.name==="引用概念"){
      showDialog_intro_concept();
    }if(d.name==="Constituent Attention"){
      showDialog_intro_Constituent();
    }
  }

  function update(source) {
    // Compute the new height, function counts total children of root node and sets tree height accordingly.
    // This prevents the layout looking squashed when new nodes are made visible or looking sparse when nodes are removed
    // This makes the layout more consistent.
    console.log("update in click!")
    console.log("source:", source)
    console.log("source.text:", source.text)
    console.log("source._children:", source._children)
    console.log("source.children:", source.children)

    // if(!source.children){
    //   console.log("update in click!")
    // }

    var levelWidth = [1];
    var childCount = function(level, n) {

      if (n.children && n.children.length > 0) {
        if (levelWidth.length <= level + 1) levelWidth.push(0);

        levelWidth[level + 1] += n.children.length;
        n.children.forEach(function(d) {
          childCount(level + 1, d);
        });
      }
    };
    childCount(0, root);
    var newHeight = d3.max(levelWidth) * 105; // 25 pixels per line  /*<><><><><><><><><><><><><><><><><><><><><><><>THIS IS DETERMINING SPACING */
    tree = tree.size([newHeight, viewerWidth]);

    // Compute the new tree layout.
    nodes = tree.nodes(root).reverse();
    var links = tree.links(nodes);

    // Set widths between levels based on maxLabelLength.
    nodes.forEach(function(d) {
      d.y = (d.depth * (maxLabelLength * 10)); //maxLabelLength * 10px
      // alternatively to keep a fixed scale one can set a fixed depth per level
      // Normalize for fixed-depth by commenting out below line
      // d.y = (d.depth * 500); //500px per level.
    });

    // Update the nodes…
    var node = svgGroup.selectAll("g.node")
        .data(nodes, function(d) {
          return d.id || (d.id = ++i);
        });

    // Enter any new nodes at the parent's previous position.
    var nodeEnter = node.enter().append("g")
        .call(dragListener)
        .attr("class", "node")
        .attr("transform", function(d) {
          return "translate(" + source.y0 + "," + source.x0 + ")";
        })
        .on('click', click)
        .on('contextmenu', contextmenu);
        // .on('dblclick', dblclick);

    nodeEnter.append("circle")
        .attr('class', 'nodeCircle')
        .attr("r", 0)
        .style("stroke", "black")
        .style("stroke-width", "1.5px")
        .style("fill", function(d) {
          return d._children ? "lightsteelblue" : "#fff";
        });

    nodeEnter.append("text")
        .attr("x", function(d) {
          return d.children || d._children ? -10 : 10;
        })
        .attr("dy", ".35em")
        .attr('class', 'nodeText')
        // .attr('style', 'font-family: Arial;')
        .attr("text-anchor", function(d){
          return d.children || d._children ? "end" : "start";
        })
        .attr("transform", function(d) {
          if(d.name=='VGG19'){
            console.log("找到了VGG19！")
            console.log("d.children", d.children)
            console.log("d._children", d._children)
          }
          return d.children || d._children ? "rotate(-90)" : "rotate(-30)";
        })
        // .attr("transform", "rotate(-90)")
        .text(function(d) {
          return d.name;
        })
        .style("fill-opacity", 0)
        // .style("color", "black")
        .style("font-size", "16px")
        .style("font-family", "Arial");

    // phantom node to give us mouseover in a radius around it
    nodeEnter.append("circle")
        .attr('class', 'ghostCircle')
        .attr("r", 30)
        .attr("opacity", 0.2) // change this to zero to hide the target area
        .style("fill", "red")
        .attr('pointer-events', 'mouseover')
        .on("mouseover", function(node) {
          overCircle(node);
        })
        .on("mouseout", function(node) {
          outCircle(node);
        });

    // Update the text to reflect whether node has children or not.
    node.select('text')
        .attr("x", function(d) {
          return d.children || d._children ? d.name.length*8 : 30;
          // return d.children || d._children ? -30 : 30;
        })
        .attr("y", function(d) {
          return d.children || d._children ? -35 : 0;
        })
        .attr("text-anchor", function(d) {
          return d.children || d._children ? "end" : "start";
        })
        .text(function(d) {
          return d.name;
        });

    // Change the circle fill depending on whether it has children and is collapsed
    node.select("circle.nodeCircle")
        .attr("r", 20.5) /*<><><><><><><><><><><><><><><><><><><><><><><>THIS IS DETERMINING RADIUS */
        .style("fill", function(d) {
          // console.log("d:",d)
          // console.log("d._children:",d._children)
          if(d.type==="upload"){
            return "url(#upload)";
          }else if(d.type==="pretrained"){
            return "url(#pretrain)";
          }else if(d.type==="conv"){
            return "url(#conv)";
          }else if(d.type==="yolo"){
            return "url(#yolo)";
          }else if(d.type==="transformer"){
            return "url(#transformer)";
          }else if(d.type==="vgg"){
            return "url(#vgg)";
          }else if(d.type==="resnet"){
            return "url(#resnet)";
          }else{
            if(d.name==="Model Zoo"){
              return "url(#hl)";
            }else if(d.name==="PowerGrid Dataset"){
              return "url(#grid)";
            }else if(d.name==="ImageNet"){
              return "url(#classification)";
            }else if(d.name==="CIFAR10"){
              return "url(#cifar)";
            }else if(d.name==="CIFAR100"){
              return "url(#imgnet)";
            }else if(d.name==="COCO128"){
              return "url(#coco)";
            }else if(d.name==="SchemaNet"){
              return "url(#zhf)";
            }else if(d.name==="Dr. Huang"){
              return "url(#hqh)";
            }else if(d.name==="局部解释"){
              return "url(#local)";
            }else if(d.name==="全局解释"){
              return "url(#global2)";
            }else if(d.name==="事后解释性分析"){
              return "url(#post-hoc)";
            }else if(d.name==="可解释建模"){
              return "url(#ad-hoc)";
            }else if(d.name==="注意力机制"){
              return "url(#attention2)";
            }else if(d.name==="神经树"){
              return "url(#tree)";
            }else if(d.name==="概念响应"){
              return "url(#tcav)";
            }else if(d.name==="归因方法"){
              return "url(#saliency)";
            }else if(d.name==="概念原型"){
              return "url(#prototype)";
            }else{
              return "url(#img1)";
            }
          }
          // d._children ? "lightsteelblue" : "url(#img1)";

        });

    // Transition nodes to their new position.
    var nodeUpdate = node.transition()
        .duration(duration)
        .attr("transform", function(d) {
          return "translate(" + d.y + "," + d.x + ")";
        });

    // Fade the text in
    nodeUpdate.select("text")
        .style("fill-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    var nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function(d) {
          return "translate(" + source.y + "," + source.x + ")";
        })
        .remove();

    nodeExit.select("circle")
        .attr("r", 0);

    nodeExit.select("text")
        .style("fill-opacity", 0);

    // Update the links…
    var link = svgGroup.selectAll("path.link")
        .data(links, function(d) {
          return d.target.id;
        });

    // Enter any new links at the parent's previous position.
    link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("d", function(d) {
          var o = {
            x: source.x0,
            y: source.y0
          };
          return diagonal({
            source: o,
            target: o
          });
        });

    // Transition links to their new position.
    link.transition()
        .duration(duration)
        .attr("d", diagonal);

    // Transition exiting nodes to the parent's new position.
    link.exit().transition()
        .duration(duration)
        .attr("d", function(d) {
          var o = {
            x: source.x,
            y: source.y
          };
          return diagonal({
            source: o,
            target: o
          });
        })
        .remove();

    // Stash the old positions for transition.
    nodes.forEach(function(d) {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }

// Append a group which holds all nodes and which the zoom Listener can act upon.
  var svgGroup = baseSvg.append("g");

// Define the root
  root = treeData;
  root.x0 = viewerHeight / 2;
  root.y0 = 0;

// Layout the tree initially and center on the root node.
  update(root);
  centerNode(root);

  console.log("querySelector id: ", document.querySelector('#tree-container'));
  console.log("querySelector id2: ", document.querySelector('tree-container'));
});


function checkFile(file) {
  const isCSV = file.type === 'text/csv';
  const isSizeValid = file.size / 1024 <= 500; // Convert size from bytes to kilobytes
  if (!isCSV) {
    ElMessage.error('Please upload a CSV file.')
  }
  if (!isSizeValid) {
    ElMessage.error('Please upload a CSV file with a size less than 500KB.')
  }
  checkCsv.value = isCSV && isSizeValid;
  return isCSV && isSizeValid;
}

function checkFile2(file) {
  const isCSV = file.type === 'text/csv';
  const isSizeValid = file.size / 1024 <= 500; // Convert size from bytes to kilobytes
  if (!isCSV) {
    ElMessage.error('Please upload a CSV file.')
  }
  if (!isSizeValid) {
    ElMessage.error('Please upload a CSV file with a size less than 500KB.')
  }
  checkCsv2.value = isCSV && isSizeValid;
  return isCSV && isSizeValid;
}

function checkFilePython(file) {
  const isPy = file.name.toLowerCase().endsWith('.py');
  const isSizeValid = file.size / 1024 <= 500; // Convert size from bytes to kilobytes
  if (!isPy) {
    ElMessage.error('Please upload a python file.')
  }
  if (!isSizeValid) {
    ElMessage.error('Please upload a python file with a size less than 500KB.')
  }
  checkPython.value = isPy && isSizeValid;
  return isPy && isSizeValid;
}




// function handleUploadSuccess(response) {
//   ElMessage.success('File uploaded successfully.')
// }
//
// function handleUploadError(err) {
//   ElMessage.error('File upload failed.')
// }

// const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
//   // console.log(uploadFileList);
//   // const index=uploadFileList.value.findIndex((e)=>{return e===uploadFile})
//   console.log(uploadFile, uploadFiles);
// };
// const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
//   dialogImageUrl.value = uploadFile.url!;
//   dialogVisible.value = true;
//   // console.log("dialogImageUrl.value: ", dialogImageUrl.value)
// };
const handleChange1: UploadProps["onChange"] = (file, fileList) => {
  uploadFileList.value = fileList;
  console.log("uploadFileList.value:", uploadFileList.value)
  console.log("checkCsv.value: ", checkCsv.value)
  if(checkCsv.value){
    uploadCsv('morf')
  }
};
const handleChange2: UploadProps["onChange"] = (file, fileList) => {
  uploadFileList2.value = fileList;
  console.log("uploadFileList2.value:", uploadFileList2.value)
  console.log("checkCsv2.value: ", checkCsv2.value)
  if(checkCsv2.value){
    uploadCsv('lerf')
  }
};
const handleChange3: UploadProps["onChange"] = (file, fileList) => {
  uploadFileList3.value = fileList;
  console.log("uploadFileList3.value:", uploadFileList3.value)
  console.log("checkPython.value: ", checkPython.value)
  if(checkPython.value){
    uploadPython()
  }
};
async function uploadCsv(type){
  let param = new FormData();
  if(type=='morf'){
    console.log("uploadFileList: ", uploadFileList);
    uploadFileList.value.forEach(
        (val, index) => {
          param.append("pictures", val.raw);
          console.log("test", val.raw);
        }
    );
  }else if(type=='lerf'){
    console.log("uploadFileList2: ", uploadFileList2);
    uploadFileList2.value.forEach(
        (val, index) => {
          param.append("pictures", val.raw);
          console.log("test", val.raw);
        }
    );
  }
  console.log("datasetId: ", store.state.datasetId);
  param.append("datasetId", store.state.datasetId);
  let config = {
    baseURL: "/api",
    //baseURL: "http://localhost:7996",
    timeout: 30000,
    headers: {
      "Content-Type": "multipart/form-data" //设置headers
    }
  };
  console.log("param: ", param);
  await axios
      .post("/data/uploadCsvs", param, config)
      .then(res => {
        console.log("res: ", res);
        if (res.status === 200) {
          console.log("yes");
          if(type=='morf'){
            let arr = res.data.data.imgpath.split("/")
            morf.value = arr[arr.length - 1]
            console.log("morf.value: ", morf.value);
            uploadRef.value.clearFiles();
            uploadFileList.value = [];
            morfUploaded.value = true;
            ElMessage.success('Morf file uploaded successfully.')
          }else if(type=='lerf'){
            let arr = res.data.data.imgpath.split("/")
            lerf.value = arr[arr.length - 1]
            console.log("lerf.value: ", lerf.value);
            uploadRef2.value.clearFiles();
            uploadFileList2.value = [];
            lerfUploaded.value = true;
            ElMessage.success('Lerf file uploaded successfully.')
          }
        }else{
          ElMessage.error('File upload failed.')
        }
      })
      .catch(err => {
        console.log(err);
      });
  // console.log("uploadFileList: ", uploadFileList);
}

async function uploadPython(){
  let param = new FormData();
  console.log("uploadFileList3: ", uploadFileList3);
  uploadFileList3.value.forEach(
      (val, index) => {
        param.append("pictures", val.raw);
        console.log("test", val.raw);
      }
  );
  console.log("datasetId: ", store.state.datasetId);
  param.append("datasetId", store.state.datasetId);
  let config = {
    baseURL: "/api",
    //baseURL: "http://localhost:7996",
    timeout: 30000,
    headers: {
      "Content-Type": "multipart/form-data" //设置headers
    }
  };
  console.log("param: ", param);
  await axios
      .post("/data/uploadCsvs", param, config)
      .then(res => {
        console.log("res: ", res);
        if (res.status === 200) {
          console.log("yes");
          let arr = res.data.data.imgpath.split("/")
          pythonValue.value = arr[arr.length - 1]
          console.log("pythonValue.value: ", pythonValue.value);
          uploadRef3.value.clearFiles();
          uploadFileList3.value = [];
          pythonUploaded.value = true;
          ElMessage.success('File uploaded successfully.')
        }else{
          ElMessage.error('File upload failed.')
        }
      })
      .catch(err => {
        console.log(err);
      });
}


async function getUsrRank(){
  if(userQuery.value === ''){
    ElMessage.error('Please input the name of your attribution algorithm!')
  }else if(morfUploaded.value == false){
    ElMessage.error('Please upload your morf result!')
  }else if(lerfUploaded.value == false){
    ElMessage.error('Please upload your lerf result!')
  }else{
    ElMessage.success('Information complete, processing......')
    resultLoading.value = true
    await axios
        .post(`/user/getUsrRank`, {
        })
        .then((response) => {
          let ranks = response.data.data.ranklistinfo
          console.log("response.data.data", response.data.data)
          console.log("ranks: ", ranks)
          servers.value = ranks
        })
        .catch((errors) => {
          console.log('error', errors)
        })

    let temp = {
      morfpath: "/nfs3-p1/duanjr/meta-score-attribution-hollylee/data/user_upload/" + morf.value,
      lerfpath: "/nfs3-p1/duanjr/meta-score-attribution-hollylee/data/user_upload/" + lerf.value,
    };
    console.log("请求体：", temp);
    await axios
        .post(`/user/getUsrRank2`, temp)
        .then((response) => {
          let ranks = response.data.data.ranklistinfo
          console.log("response.data.data", response.data.data)
          console.log("ranks: ", ranks)
          servers2.value = ranks
          for (let i = 0; i < servers2.value.length; i++) {
            // const element = servers2.value[i];
            // 检查username是否为"The User"
            if (servers2.value[i].username === "The User") {
              // 如果是，则修改contributor、institute和algorithm字段
              servers2.value[i].username = store.state.username;
              servers2.value[i].institute = store.state.institute;
              servers2.value[i].name = userQuery.value;

              score.value = servers2.value[i].score;
              rank.value = servers2.value[i].ranking;
            }
          }

        })
        .catch((errors) => {
          console.log('error', errors)
        })

    resultShow.value = true
    resultLoading.value = false
  }
}


async function SubmitAlgorithm(){
  if(userQuery.value === ''){
    ElMessage.error('Please input the name of your attribution algorithm!')
  }else if(morfUploaded.value == false){
    ElMessage.error('Please upload your morf result!')
  }else if(lerfUploaded.value == false){
    ElMessage.error('Please upload your lerf result!')
  }else if(Email.value == ''){
    ElMessage.error('Please provide your email address!')
  }else if(Infos.value == ''){
    ElMessage.error('Please complete information about your algorithm!')
  }else{
    if(pythonUploaded.value === true){
      ElMessage.success('You choose to submit your algorithm file.')
    }else{
      ElMessage.warning('You choose not to submit your algorithm file.')
    }
    ElMessage.success('Information complete, submitting your algorithm......')
    resultLoading.value = true
    let pythonPath = ''
    if(pythonValue.value==''){
      pythonPath = 'Not Provided'
    }else{
      pythonPath = "/nfs3-p1/duanjr/meta-score-attribution-hollylee/data/user_upload/" + pythonValue.value
    }
    let temp1 = {
      username: store.state.username,
      name: userQuery.value,
      score: score.value,
      institute: store.state.institute,
      ranking: rank.value,
      morfPath: "/nfs3-p1/duanjr/meta-score-attribution-hollylee/data/user_upload/" + morf.value,
      lerfPath: "/nfs3-p1/duanjr/meta-score-attribution-hollylee/data/user_upload/" + lerf.value,
      pythonPath: pythonPath,
      email: Email.value,
      info: Infos.value,
    };
    console.log("temp1: ", temp1)
    await axios
        .post(`/user/SubmitAlgorithm`, temp1)
        .then((response) => {
          // console.log("temp1: ", temp1)
          if (response.status === 200){
            ElMessage.success('Upload algorithm successfully!')
          }else{
            ElMessage.error('Upload algorithm failed!')
          }
        })
        .catch((errors) => {
          // console.log("temp1: ", temp1)
          ElMessage.success('Upload algorithm failed!')
          console.log('error', errors)
        })
    // resultShow.value = true
    resultLoading.value = false
  }
}

function DetermineUser() {
  console.log("确认用户信息")
  console.log("权限: ", store.state.access)
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

DetermineUser()
// ();
// defineExpose({DetermineUser})
// export { DetermineUser };
</script>

<style>

#tree-container {
  transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
  -moz-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  -o-transform: rotate(90deg);
  overflow-x: visible;
  overflow-y: visible;
  width: 100%;
}
.tree-wrapper {
  position: relative;
}

.intro {
  position: absolute;
  top: 10%;
  left: 5%;
  /*color: white;*/
  /*transform-origin: top right;*/
  /*transform: rotate(-90deg);*/
}
/*.text-component span {*/
/*  display: inline-block;*/
/*  transform-origin: center;*/
/*  transform: rotate(90deg);*/
/*}*/
.holly{
  /*background-image: url('http://10.214.242.155:7996/img/background/algorithm2.jpg');*/
  /*background-repeat: no-repeat;*/
  /*background-size: contain;*/
  background-color: white;
  overflow: visible;
  /*position: relative;*/
  /*background-position: center;*/
}
.rating {
  /*font-size: 18px;*/
  text-align: center;
}

.row {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
}
/*.overlay{*/
/*  background: linear-gradient(transparent,#78E9E8 100%);*/
/*  !*width: 1863px;*!*/
/*  !*height: 961px;*!*/
/*  width: 100%;*/
/*  !*height: 100%;*!*/
/*  overflow-x: visible;*/
/*  overflow-y: visible;*/
/*  !*position: absolute;*!*/
/*  !*top: 0;*!*/
/*  !*left: 0;*!*/
/*  !*width: 100%;*!*/
/*  !*height: 100%;*!*/
/*}*/
/** {*/
/*  box-sizing: border-box;*/
/*}*/

/*body {*/
/*  background-color: #ccc;*/
/*  font-family: $body_fonts;*/
/*  font-size: 15px;*/
/*  font-weight: 300;*/
/*  color: #444;*/
/*}*/

/*h1, h2, h3 {*/
/*  font-family: $title_fonts;*/
/*}*/

h1 {
  color: #fff;
  font-size: 35px;
}

h2 {
  font-size: 22px;
  margin-bottom: 20px;
}

h3 {
  font-size: 18px;
  margin-bottom: 20px;
}



.holly-section {
  position: relative;
  background-color: #fff;
  width: 100%;
  min-width: 700px;
  margin: 0 auto 50px auto;
  padding: 35px 50px;
  /*box-shadow: 0 5px 20px rgba(0,0,0,0.5);*/
p {
  margin-bottom: 10px;
  text-align: justify;
  line-height: 18px;
}
a {
  color: $dark_blue;
}
a:hover {
  color: $blue;
  text-decoration: none;
}
}

.legend {
  display: block;
  margin-top: 20px;
  font-weight: bold;
}

.flexparent > div > .legend {
  margin-top: 0;
  margin-left: -10px;
  margin-bottom: 10px;
}

.flexparent {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
> div {
  position: relative;
  display: inline;
  flex: 1 1 auto;
  padding: 10px;
  width: 30%;
}
}

.submission {
  text-align: right;
  margin-top: 10px;
}

.holly-section input[type="text"] {
  outline: none !important;
  width: 100%;
  border: none;
  border-bottom: 1px solid #444;
  margin-top: 10px;
  transition: border 0.5s ease;
+ label {
  position: absolute;
  top: 20px;
  left: 10px;
  pointer-events: none;
  transition: top 0.5s ease,
  font-size 0.5s ease,
  color 0.5s ease;
}
&:focus {
   border-bottom: 2px solid $turquoise;
 }
&:focus + label {
   top: 8px;
   font-size: 10px;
   color: darken($dark_turquoise, 10%);
 }
&:valid + label {
   top: 8px;
   font-size: 10px;
 }
}

holly-section input[type="radio"], holly-section input[type="checkbox"] {
  display: none;
}

holly-section input[type="radio"] + label::before {
  content: '';
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid #444;
  margin-right: 10px;
  margin-top: 5px;
  background-color: $turquoise;
  box-shadow: 0 0 0 8px #fff inset;
  transition: box-shadow 0.5s ease;
}

holly-section input[type="radio"]:checked + label::before {
  box-shadow: 0 0 0 2px #fff inset;
}

holly-section input[type="checkbox"] + label::before {
  content: '';
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 20%;
  border: 1px solid #444;
  margin-right: 10px;
  margin-top: 5px;
  background-color: $turquoise;
  box-shadow: 0 0 0 8px #fff inset;
  transition: box-shadow 0.5s ease;
}

holly-section input[type="checkbox"]:checked + label::before {
  box-shadow: 0 0 0 1px #fff inset;
}

holly-section input[type="checkbox"]:checked + label::after {
  position: absolute;
  left: 11px;
  color: #fff;
  content: '\f00c';
  font-family: $icons_font;
  font-size: 15px;
  line-height: 12px;
  margin-top: 6px;
}

holly-section input[type="radio"] + label, holly-section input[type="checkbox"] + label {
&:hover, &:focus, &:active {
                     color: $dark_turquoise;
                   }
&:hover::before, &:focus::before, &:active::before {
                                     border: 1px solid $dark_turquoise;
                                   }
}

holly-section textarea {
  width: 100%;
  height: 100px;
  margin-top: 10px;
  border: none;
  border: 1px solid rgba(0,0,0,0.2);
  outline: none !important;
  transition: border 0.5s ease;
&:focus {
   border: 1px solid rgba(0,0,0,0.2);
   border-bottom: 2px solid $turquoise;
 }
}

holly-section input[type="reset"], holly-section input[type="submit"] {
  outline: none !important;
  background: #ccc;
  border: none;
  height: 35px;
  width: 100px;
  margin-left: 20px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2),
  0 0 0 20px #fff inset;
  transition: box-shadow 0.5s ease;
}

holly-section input[type="reset"]:active, holly-section input[type="submit"]:active {
  box-shadow: 0 5px 10px rgba(0,0,0,0.2);
  border-bottom: 2px solid $turquoise;
}

holly-section input[type="range"] {
  width: 100%;
  -webkit-appearance: none;
  outline: none !important;
  overflow: hidden;
&::-webkit-slider-runnable-track {
   height: 12px;
   border: none;
   background: linear-gradient(to bottom, transparent 5px, #ccc 5px, #ccc 7px, transparent 7px);
 }
&::-moz-range-track {
   height: 12px;
   border: none;
   background: linear-gradient(to bottom, transparent 5px, #ccc 5px, #ccc 7px, transparent 7px);
 }
&::-ms-track {
   height: 12px;
   border: none;
   background: linear-gradient(to bottom, transparent 5px, #ccc 5px, #ccc 7px, transparent 7px);
 }
&::-webkit-slider-thumb {
   -webkit-appearance: none;
   z-index: +2;
   width: 10px;
   height: 10px;
   margin: 1px;
   border-radius: 50%;
   border: none;
   background: $turquoise;
 }
&::-moz-range-thumb {
   z-index: +2;
   width: 10px;
   height: 10px;
   border-radius: 50%;
   border: none;
   background: $turquoise;
 }
&::-ms-thumb {
   z-index: +2;
   width: 10px;
   height: 10px;
   border-radius: 50%;
   border: none;
   background: $turquoise;
 }
&::-ms-fill-lower {
   height: 12px;
   background: linear-gradient(to bottom, transparent 5px, $turquoise 5px, $turquoise 7px, transparent 7px);
 }
&:hover, &:active, &:focus {
&::-webkit-slider-runnable-track {
   background: linear-gradient(to bottom, transparent 5px, #aaa 5px, #aaa 7px, transparent 7px);
 }
&::-moz-range-track {
   background: linear-gradient(to bottom, transparent 5px, #aaa 5px, #aaa 7px, transparent 7px);
 }
&::-ms-track {
   background: linear-gradient(to bottom, transparent 5px, #aaa 5px, #aaa 7px, transparent 7px);
 }
&::-webkit-slider-thumb {
   width: 12px;
   height: 12px;
   margin: 0;
 }
&::-moz-range-thumb {
   width: 12px;
   height: 12px;
   margin: 0;
 }
&::-ms-thumb {
   width: 12px;
   height: 12px;
   margin: 0;
 }
}
}


</style>
