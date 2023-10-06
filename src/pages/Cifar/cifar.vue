<template>

  <div class="holly-section" v-loading="resultLoading">
    <h2 style="font-size: 25px;">Input the name of your attribution algorithm</h2>
    <el-input v-model="userQuery" style="width:300px; margin: 10px 0 20px 0;" :rows="1" type="textarea"/>

    <div style="display: flex; justify-content: space-between;">

      <div style="width: 48%">
        <h2 style="font-size: 25px;">Upload the morf result</h2>
        <el-upload
            ref="uploadRef"
            method="post"
            class="upload-demo"
            drag
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :before-upload="checkFile"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-change="handleChange1"
            :limit="1"
            :file-list="uploadFileList"
            style="margin: 10px 0 10px 0;"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">
              csv file with a size less than 500kb
            </div>
          </template>
        </el-upload>
<!--        <el-button size="large" style="margin: 0 0 10px 0;" type="warning" @click="uploadCsv('morf')" plain>Upload</el-button>-->
      </div>

      <div style="width: 48%">
        <h2 style="font-size: 25px;">Upload the lerf result</h2>
        <el-upload
            ref="uploadRef2"
            method="post"
            class="upload-demo"
            drag
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :before-upload="checkFile2"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-change="handleChange2"
            :limit="1"
            :file-list="uploadFileList2"
            style="margin: 10px 0 10px 0;"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">
              csv file with a size less than 500kb
            </div>
          </template>
        </el-upload>
<!--        <el-button size="large" style="margin: 0 0 10px 0;" type="warning" @click="uploadCsv('lerf')" plain>Upload</el-button>-->
      </div>


    </div>




    <div style="display: flex; justify-content: center">
      <el-button size="large" style="margin: 50px 0 10px 0;" type="success" @click="getUsrRank" plain>Get your current scores and meta-rank</el-button>
    </div>

<!--    :style="{visibility:resultShow?'visible':'hidden'}"-->

  <div v-show="resultShow">
    <h2 style="font-size: 25px; margin: 20px 0 20px 0;">The original Meta-Rank</h2>
    <b-table
        striped
        hover
        responsive
        :items="servers"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        outlined
    >
    </b-table>
    <div style="display: flex; justify-content: center;">
      <b-pagination
          v-model="currentPage"
          :total-rows="servers.length"
          :per-page="perPage"
          align="right"
          :style="style.pagination"
      ></b-pagination>
    </div>



    <h2 style="font-size: 25px; margin: 20px 0 20px 0;">Current Meta-Rank</h2>
    <b-table
        striped
        hover
        responsive
        :items="servers2"
        :fields="fields"
        :current-page="currentPage2"
        :per-page="perPage"
        outlined
    >
    </b-table>
    <div style="display: flex; justify-content: center;">
      <b-pagination
          v-model="currentPage2"
          :total-rows="servers2.length"
          :per-page="perPage"
          align="right"
          :style="style.pagination"
      ></b-pagination>
    </div>


    <h2 style="font-size: 25px;">Upload your attribution algorithm (python file, optional)</h2>
    <el-upload
        ref="uploadRef3"
        method="post"
        class="upload-demo"
        drag
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :before-upload="checkFilePython"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-change="handleChange3"
        :limit="1"
        :file-list="uploadFileList3"
        style="margin: 10px 0 10px 0;"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          python file with a size less than 500kb
        </div>
      </template>
    </el-upload>

    <h2 style="font-size: 25px; margin: 20px 0 0 0;">Provide your email address for future contact.</h2>
    <el-input v-model="Email" style="width:300px; margin: 10px 0 20px 0;" :rows="1" type="textarea"/>

    <h2 style="font-size: 25px; margin: 20px 0 10px 0;"  >Provide detailed information</h2>
    Please furnish further details about your attribution algorithm for its inclusion in the rankings. This information might encompass relevant research papers and open-source code associated with your algorithm. We also welcome you to contact us via email using your institutional email at jerryduan@zju.edu.cn.
    <br>
    <el-input v-model="Infos" style="margin: 10px 0 0 0;" :rows="3" type="textarea"/>
        <!--        <el-button size="large" style="margin: 0 0 10px 0;" type="warning" @click="uploadCsv('morf')" plain>Upload</el-button>-->

    <div style="display: flex; justify-content: left">
      <el-button size="large" style="margin: 50px 0 10px 0;" type="warning" @click="SubmitAlgorithm" plain>Submit your algorithm</el-button>
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
