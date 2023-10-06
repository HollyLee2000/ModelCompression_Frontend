<template>
  <div style="display: flex">
    <el-input
        v-model="verCode"
        clearable
    />
    <el-image
        :src="verImg"
        @click="getCode"
    ></el-image>
  </div>
</template>

<!--placeholder="Verification code"-->

<script lang="ts" setup>
import {onMounted, ref, defineExpose} from "vue";
import axios from "axios";

let verCode = ref("");
let answerCode = "";
let verImg = ref("");
import request from "@/api/index.js";

function getCode() {
  request.get("user/captcha").then(
      res => {
         console.log(res);
        console.log(res.data.data.code);
        if (res.status === 200) {
          verImg.value = "data:image/png;base64," + res.data.data.base64;
          answerCode = res.data.data.code;
        } else
          console.log("get captcha error");
      }
  ).catch(err => {
    console.log(err);
    console.log("captcha error");
  });
  // console.log("获取验证码后访问验证码session" + JSON.parse(sessionStorage.getItem("captcha")));
  // axios.get("/api/user/captcha", {headers: {"Content-Type": "application/json,charset=utf-8"}})
  //     .then((res) => {
  //       // console.log(answerCode);
  //       // console.log(res);
  //       if (res.statusText === "OK") {
  //         verImg.value = "data:image/png;base64," + res.data.data.base64;
  //         answerCode = res.data.data.code;
  //       } else
  //         console.log("get captcha error");
  //     }).catch((err) => {
  //   console.log(err);
  //   console.log("captcha error");
  // });
}

const verificateFlag = () => {
  // console.log(verCode.value);
  //verCode.value=answerCode
  console.log("verCode.value: ", verCode.value);
  console.log("answerCode: ", answerCode);
  return verCode.value === answerCode;
};

defineExpose({
  verificateFlag,
  getCode,
  verCode
});

onMounted(getCode);

</script>

<style scoped>
.el-input,
.el-image{
  /*height: 40px;*/
}
</style>