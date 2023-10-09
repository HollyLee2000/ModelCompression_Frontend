<template>
  <el-button @click="uploadShow=true" type="primary">上传图片</el-button>
  <el-dialog v-model="uploadShow">
    <el-upload
        ref="uploadRef"
        method="post"
        action="#"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-change="handleChange"
        :auto-upload="false"
        multiple
        show-file-list
        :file-list="uploadFileList"
    >
      <template #trigger>
        <el-icon>
          <Plus/>
        </el-icon>
      </template>
    </el-upload>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="uploadShow = false">取消</el-button>
        <el-button type="primary" @click="submitUpload">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="dialogVisible">
    <img :src="dialogImageUrl" alt="Preview Image"/>
  </el-dialog>
  <el-backtop :right="100" :bottom="100"/>
</template>

<script setup lang="ts">
import {Plus} from "@element-plus/icons-vue";
import axios from "axios";
import {defineEmits, ref} from "vue";
import {UploadInstance, UploadProps} from "element-plus/es";
import {useStore} from "vuex";
const emits=defineEmits(['updateFileList'])
const store = useStore();
const uploadShow = ref(false);
const uploadFileList = ref([]);
const uploadRef = ref<UploadInstance>();
const dialogImageUrl = ref("");
const dialogVisible = ref(false);

const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
  // console.log(uploadFileList);
  // const index=uploadFileList.value.findIndex((e)=>{return e===uploadFile})
  console.log(uploadFile, uploadFiles);
};
const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
  // console.log("dialogImageUrl.value: ", dialogImageUrl.value)
};
const handleChange: UploadProps["onChange"] = (file, fileList) => {
  uploadFileList.value = fileList;
};
async function submitUpload(){
  let param = new FormData();
  console.log(uploadFileList);
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
  console.log("param", param);
  await axios
      .post("/data/uploadPictures", param, config)
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          console.log("yes");
          uploadRef.value.clearFiles();
        }
      })
      .catch(err => {
        console.log(err);
      });
  console.log(uploadFileList);
  emits('updateFileList','getDatasetInfo')
  uploadShow.value = false;
  // fileList= fileList.concat(file)
}
</script>

<style scoped>

</style>