<template>
  <span @click="getVeriCode">{{ time === 0 ? '发送验证码' : `${time}秒后发送` }}</span>
</template>


<script lang="ts" setup>
import {ref, defineExpose} from "vue";
// import { userMobileLoginMsg } from '@/api/user'
import {useIntervalFn} from "@vueuse/core";

// pause 暂停 resume 开始
// useIntervalFn(回调函数,执行间隔,是否立即开启)
const time = ref(1);
const {pause, resume} = useIntervalFn(() => {
  time.value--;
  if (time.value <= 0) {
    pause();
  }
}, 1000, {immediate: true});


const getVeriCode = async () => {
  // 没有倒计时才可以发送请求
  if (time.value === 0) {
    veriCode = "2222";
    // 发送ajax请求 form.mobile是填写的手机号
    // await userMobileLoginMsg(form.mobile)
    time.value = 60;
    resume();
  } else {
    // 失败 提示错误信息
  }
};
let veriCode = "111";
const getVerificationCode = () => {
  console.log(veriCode);
  return veriCode;
};
defineExpose({
  getVerificationCode
});
</script>

<style scoped>

</style>