<template>


  <el-dialog class="scrollable"  v-model="ConfirmVisible" style="width:50%; height:60%; text-align: center; overflow: auto; font-family: Arial;"
             :draggable="true" @close="resetSetting(currentType)" :append-to-body="true" title="Confirm - Submit an algorithm" >


<!--    <div>-->
<!--      <label style="margin: 0 30px ; font-size:18px; border: 0; word-wrap: break-word; white-space: pre-wrap;">Please confirm that you have implemented the interface for your pruning algorithm using our Python library - Torch-Pruning (TP),-->
<!--        and have submitted a pull request to our project: <a :href="'https://github.com/VainF/Torch-Pruning'" target="_blank">https://github.com/VainF/Torch-Pruning</a>.-->
<!--        Only after these can we include your algorithm in our leaderboard. Due to the necessary experimental validation for your algorithm,-->
<!--        your request may take some time to receive a response. You can contact us via email at hollylee@zju.edu.cn.</label>-->
<!--    </div>-->

<!--    <div>-->
<!--      <p style="margin: 0 30px; font-size: 18px; border: 0; overflow-wrap: break-word;">-->
<!--        Please confirm that you have implemented the interface for your pruning algorithm using our Python library - Torch-Pruning (TP), and have submitted a pull request to our project:-->
<!--        <a :href="'https://github.com/VainF/Torch-Pruning'" target="_blank">https://github.com/VainF/Torch-Pruning</a>. Only after these can we include your algorithm in our leaderboard. Due to the necessary experimental validation for your algorithm, your request may take some time to receive a response. You can contact us via email at hollylee@zju.edu.cn.-->
<!--      </p>-->
<!--    </div>-->


    <div>
      <p style="margin: 0 30px; font-size: 17px; border: 0; word-wrap: break-word; color: black; text-align: left">
        Confirm that you have implemented the interface for your pruning algorithm using our Python library - Torch-Pruning
        (TP): <a :href="'https://github.com/VainF/Torch-Pruning'" target="_blank">https://github.com/VainF/Torch-Pruning</a>,
        and have submitted a pull request to the project. Only after these can we include your algorithm in our leaderboard.
        Due to the necessary experimental validation for your algorithm, your request may take some time to receive a response.
        You can contact us via email at hollylee@zju.edu.cn.
      </p>
    </div>

    <div style="display: flex; justify-content: center">
      <el-button size="large" style="margin: 50px 40px 10px 0;" type="info" @click="resetSetting('suggestion')" plain>Cancel</el-button>
      <el-button size="large" style="margin: 50px 40px 10px 0;" type="success" @click="resetSetting('leaderboard')" plain>Confirm</el-button>
    </div>

<!--    <div class="col-lg-4 offset-lg-1 mt-5 mt-lg-0">-->
<!--      <h6 class="text-muted fw-normal">INTRODUCTION</h6>-->
<!--      <h1 class="fw-bold mt-2">XXXX</h1>-->
<!--      <p class="mt-3">-->
<!--        XXXX is a benchmark towards any structural pruning. It based on Torch-Pruning (TP), an open-source library for grouping model layers by dependency graph (DepGraph). It provides unified interface of popular structural pruning methods, including the importance criteria and sparsity regularizer.-->

<!--      </p>-->

<!--    </div>-->



  </el-dialog>


  <div style="padding: 35px 0 10px 50px;">
    <h2 style="font-size: 20px;">Select your submission type</h2>

    <div style="text-align: left;">
      <el-radio-group style="margin: 10px 0 0 0; border: 0; color: black; " v-model="isLeaderBoard">
        <el-radio label="suggestion" size="large" border>Submit a suggestion/bug/issue</el-radio>
        <el-radio label="leaderboard" size="large" border @click="handleLeaderboardClick">Submit a pruning algorithm to the leaderboard</el-radio>
      </el-radio-group>
    </div>

  </div>


  <div class="holly-section" v-loading="resultLoading" v-if="isLeaderBoard==='leaderboard'">

    <h2 style="font-size: 20px;">Select the method type you proposed</h2>

    <div style="margin: 0 0 20px 0; text-align: left;">
      <el-radio-group style="margin: 10px 0 20px 0; border: 0; color: black; " v-model="methodType">
        <el-radio label="Importance" size="large" border>Importance</el-radio>
        <el-radio label="Regularizer" size="large" border>Regularizer</el-radio>
        <el-radio label="Importance + Regularizer" size="large" border>Both</el-radio>
      </el-radio-group>
    </div>


    <h2 style="font-size: 20px;">Input the name of your algorithm</h2>
    <el-input v-model="userQuery" style="width:300px; margin: 10px 0 20px 0;" :rows="1" type="textarea"/>


    <div>
<!--      <h2 style="font-size: 20px; margin: 20px 0 10px 0;"  >Provide paper link</h2>-->
<!--      Provide available results or a link to your paper. We will conduct experiments for your method and incorporate the-->
<!--      results into the leaderboards. Therefore, having existing experimental results would serve as a valuable reference.-->
<!--      <br>-->
<!--      <el-input v-model="Infos" style="margin: 10px 0 0 0;" :rows="3" type="textarea"/>-->


      <h2 style="font-size: 20px; margin: 20px 0 10px 0;"  >Provide statistics</h2>
      Provide available results or a link to your paper (recommended). We will conduct experiments for your method and incorporate the
      results into the leaderboards. Therefore, having existing experimental results would serve as a valuable reference.
      <br>
      <el-input v-model="Email" style="margin: 10px 0 0 0;" :rows="3" type="textarea"/>


      <h2 style="font-size: 20px; margin: 20px 0 10px 0;"  >Provide other information</h2>
      Furnish further details about your algorithm so that we can incorporate this information into the "Notice" column of the leaderboards.
      <br>
      <el-input v-model="Infos" style="margin: 10px 0 0 0;" :rows="3" type="textarea"/>
<!--      This information might encompass relevant research papers and open-source code associated with your algorithm. We also welcome you to contact us via email using your institutional email at jerryduan@zju.edu.cn-->

      <div style="display: flex; justify-content: center">
        <el-button size="large" style="margin: 50px 0 10px 0;" type="success" @click="SubmitAlgorithm" plain>Submit your algorithm</el-button>
      </div>

    </div>
  </div>

  <div class="holly-section" v-loading="resultLoading" v-else>
<!--    If you have questions about the pruning algorithm,-->
<!--    please raise an issue on our GitHub: <el-link type="primary" target="_blank" href="https://github.com/VainF/Torch-Pruning" :underline="false">-->
<!--    https://github.com/VainF/Torch-Pruning</el-link>.-->
    <div>
      <h2 style="font-size: 20px; margin: 0 0 10px 0;"  >Give us suggestions</h2>
      We welcome your suggestions regarding various aspects of our work, including the design of the leaderboard,
      any bugs or issues encountered while using the website, and more. Alternatively, you can contact us directly via email at hollylee@zju.edu.cn.
      <br>
      <el-input v-model="Infos" style="margin: 10px 0 0 0;" :rows="3" type="textarea"/>

      <div style="display: flex; justify-content: center">
        <el-button size="large" style="margin: 50px 0 10px 0;" type="success" @click="SubmitAlgorithm" plain>Submit your suggestions</el-button>
      </div>

    </div>

  </div>






</template>

<script lang="ts" setup>
import { UploadFilled } from '@element-plus/icons-vue'
import {ElMessage, UploadInstance, UploadProps} from "element-plus";
import { ref } from 'vue';
import axios from "axios";
import {useStore} from "vuex";
import request from "@/api";
import {router} from "@/router";

// 使用ref创建一个变量，用于记录已上传的文件
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
const ConfirmVisible = ref(false)
// const lerfUploaded = ref(false)
let checkCsv = ref(false)
let checkCsv2 = ref(false)
let checkPython = ref(false)

const currentType = ref('suggestion')

const isLeaderBoard = ref("suggestion")

const methodType = ref("importance")

const algoName = ref("")


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

const resetSetting = (type) => {
  ConfirmVisible.value = false
  isLeaderBoard.value = type
  currentType.value = type
}

// const toLeader = () => {
//   ConfirmVisible.value = false
//   isLeaderBoard.value = "leaderboard"
// }

const handleLeaderboardClick = () => {
  ConfirmVisible.value = true
  // isLeaderBoard.value = "leaderboard"
  // Perform your check or validation here
  // If successful, change to "leaderboard"


  // if (/* Your validation condition */) {
  //   this.isLeaderBoard = 'leaderboard';
  // } else {
  //   // Handle the case when the validation fails
  //   // You can show an error message or take appropriate action
  //   console.log('Validation failed. Do not switch to leaderboard.');
  // }
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
    //baseURL: "http://localhost:7667",
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
    //baseURL: "http://localhost:7667",
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
  // if()

  if(isLeaderBoard.value === 'suggestion'){
    if(Infos.value == ''){
      ElMessage.error('Input something!')
      return
    }
  }else{
    if(userQuery.value === ''){
      ElMessage.error('Input the name of your algorithm!')
      return
    }else if(Email.value == ''){
      ElMessage.error('Provide statistics about your algorithm!')
      return
    }else if(Infos.value == ''){
      ElMessage.error('Please complete information about your algorithm!')
      return
    }

  }

  ElMessage.success('Information complete, submitting your suggestion/algorithm......')
  resultLoading.value = true
  let temp1 = {
    username: store.state.username,
    name: userQuery.value,
    score: score.value,
    institute: store.state.institute,
    ranking: rank.value,
    morfPath: isLeaderBoard.value,
    lerfPath: methodType.value,
    pythonPath: "pythonPath",
    email: Email.value,
    info: Infos.value,
  };
  console.log("temp1: ", temp1)
  await request.post(`/user/SubmitAlgorithm`, temp1)
      .then((response) => {
        console.log("response: ", response)
        if (response.status === 200 && response.data.code===0){
          ElMessage.success('Submission success!')
        }else{
          ElMessage.error('Submission failed!')
        }
      })
      .catch((errors) => {
        // console.log("temp1: ", temp1)
        ElMessage.success('Submission failed!')
        console.log('error', errors)
      })
  // resultShow.value = true
  resultLoading.value = false
  userQuery.value = ''
  Email.value = ''
  Infos.value = ''



  // else{
  //   if(pythonUploaded.value === true){
  //     ElMessage.success('You choose to submit your algorithm file.')
  //   }else{
  //     ElMessage.warning('You choose not to submit your algorithm file.')
  //   }
  //   ElMessage.success('Information complete, submitting your algorithm......')
  //
  // }
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

$blue: #3498db;
$dark_blue: #2980b9;
$turquoise: #1abc9c;
$dark_turquoise: #16a085;
$title_fonts: 'Raleway', Arial, sans-serif;
$body_fonts: 'Open Sans', Arial, sans-serif;
$icons_font: 'FontAwesome';
$hamburger_icon: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAQAAAC00HvSAAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfeDAkBEyl+h8a9AAAADGlUWHRDb21tZW50AAAAAAC8rrKZAAAALUlEQVRIx2NgGAUjCjAimP//k6wZrpuJOq5hGo2Q0eQ3mvxGwWjyGwWjgEgAAK1nBhDSfijYAAAAAElFTkSuQmCC');

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
