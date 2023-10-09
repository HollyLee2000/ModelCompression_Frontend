<template>

  <div class="holly-section">
    <h2 style="font-size: 25px;">Input the name of your attribution algorithm</h2>
    <el-input v-model="userQuery" style="width:300px; margin: 10px 0 20px 0;"/>

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
            :on-change="handleChange"
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
        <el-button size="large" style="margin: 0 0 10px 0;" type="warning" @click="uploadCsv('morf')" plain>Upload</el-button>
      </div>

      <div style="width: 48%">
        <h2 style="font-size: 25px;">Upload the lerf result</h2>
        <el-upload
            ref="uploadRef"
            method="post"
            class="upload-demo"
            drag
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :before-upload="checkFile"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-change="handleChange"
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
        <el-button size="large" style="margin: 0 0 10px 0;" type="warning" @click="uploadCsv('lerf')" plain>Upload</el-button>
      </div>


    </div>




    <div style="display: flex; justify-content: center">
      <el-button size="large" style="margin: 50px 0 10px 0;" type="success" @click="getUsrRank" plain>Get your current scores and rank</el-button>
    </div>


    <h2 style="font-size: 25px; margin: 20px 0 20px 0;">The original Meta-Rank</h2>
    <b-table
        striped
        hover
        responsive
        :items="servers"
        :fields="isEditing? fieldsEditing: fields"
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
  </div>





</template>

<script lang="ts" setup>
import { UploadFilled } from '@element-plus/icons-vue'
import {ElMessage, UploadInstance, UploadProps} from "element-plus";
import { ref } from 'vue';
import axios from "axios";
import {useStore} from "vuex";

// 使用ref创建一个变量，用于记录已上传的文件
const uploadRef = ref<UploadInstance>();
const uploadFileList = ref([]);
const store = useStore();
const userQuery = ref('')
const morf = ref('')
const lerf = ref('')
const servers = ref([])
const currentPage = ref(1)
const perPage = ref(8)
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
    key: 'rank',
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
  return isCSV && isSizeValid;
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
const handleChange: UploadProps["onChange"] = (file, fileList) => {
  uploadFileList.value = fileList;
  console.log("uploadFileList.value:", uploadFileList.value)
};
async function uploadCsv(type){
  let param = new FormData();
  console.log("uploadFileList: ", uploadFileList);
  uploadFileList.value.forEach(
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
          if(type=='morf'){
            let arr = res.data.data.imgpath.split("/")
            morf.value = arr[arr.length - 1]
            console.log("morf.value: ", morf.value);
            ElMessage.success('File uploaded successfully.')
          }else if(type=='lerf'){
            let arr = res.data.data.imgpath.split("/")
            lerf.value = arr[arr.length - 1]
            console.log("lerf.value: ", lerf.value);
            ElMessage.success('File uploaded successfully.')
          }
          uploadRef.value.clearFiles();
          uploadFileList.value = [];
        }else{
          ElMessage.error('File upload failed.')
        }
      })
      .catch(err => {
        console.log(err);
      });
  console.log("uploadFileList: ", uploadFileList);
};

async function getUsrRank(){
  await axios
      .post(`/user/getUsrRank`, {
      })
      .then((response) => {
        let ranks = response.data.data.ranklistinfo
        console.log("response.data.data", response.data.data)
        console.log("ranks: ", ranks)
        // ranks = ranks.map(addSelectField)
        // for (let rank of ranks) {
        //     rank.link = '详情'
        // }
        // console.log('getranks')
        servers.value = ranks
      })
      .catch((errors) => {
        console.log('error', errors)
        // this.servers = []
        // this.errors = errors
      })
};

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
