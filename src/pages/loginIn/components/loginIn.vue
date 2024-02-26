<template>
  <div style="text-align: -webkit-center">
    <el-form :model="user" label-width="120px" style="width: max-content">
      <el-form-item label="Account:">
        <el-input
            v-model="user.username"
            clearable
        />
      </el-form-item>
      <el-form-item label="Password:">
        <el-input
            v-model="user.password"
            type="password"
            show-password
        />
      </el-form-item>
      <el-form-item label="Verification:">
        <verification-code ref="verificationCode"/>
      </el-form-item>
      <el-form-item style="margin-left: 120px">
        <el-button type="primary" @click="loginIn">Log in</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
import {reactive, ref} from "vue";
import {router} from "@/router";
import {useStore} from "vuex";
import VerificationCode from "./verificationCode.vue";
import request from "@/api";
import {ElMessage} from "element-plus";

// const props = defineProps({
//   isShow1: Boolean,
//   isShow2: Boolean,
// });

const emits = defineEmits();


function updateParentShow(show1: boolean, show2: boolean) {
  emits("updateShow", show1, show2);
}

const verificationCode = ref();
const store = useStore();
let user = reactive({
  code: "",
  username: "",
  password: "",
});

function loginIn() {
  // router.push('/datasetPreview')
  if (verificationCode.value.verificateFlag() === true) {
    let temp = {
      code: verificationCode.value.verCode,
      username: user.username,
      password: user.password,
    };
    console.log(temp);
    // console.log("登录访问验证码session" + JSON.parse(sessionStorage.getItem("captcha")));
    request
        .post("/user/login", temp)
        .then((res) => {
          console.log(res)
          if (res.data.msg === "登陆成功") {
            console.log("登陆成功")
            const userInfo = res.data.data.userInfo
            const userTicket = res.data.data.token
            let access = userInfo.authority
            store.commit("loginIn");
            store.commit("setUserTicket", userTicket);
            console.log("store.state.userTicket: ", store.state.userTicket)
            store.commit("setAccount", user.username)
            store.commit('setAccess', access)
            store.commit('setPhone', userInfo.telephone)
            store.commit('setInstitute', userInfo.institute)
            console.log("userInfo.institute: ", userInfo.institute)
            console.log("store.state.institute: ", store.state.institute)
            // if (store.state.isAut === true) {
            //   alert("登录成功！");
            router.push('homepage')
            // }
          } else if (res.data.msg==="用户不存在"){
            ElMessage.error("User does not exist.")
            // alert("User does not exist.")
            verificationCode.value.getCode()
            console.log(res);
          }else if(res.data.msg==="用户名或密码错误"){
            ElMessage.error("Username/Password is incorrect.")
            // alert("用户名或密码错误!")
            verificationCode.value.getCode()
          }
        })
        .catch((err) => {
          console.log((err));
        });
  } else {
    ElMessage.error("Verification code is wrong!")
    // alert("验证码错误");
  }
}
</script>

<style scoped>
</style>