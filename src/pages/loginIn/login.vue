<template>
  <el-tabs type="border-card" class="demo-tabs" @tab-click="handleClick" v-model="activeName" :stretch=true style="height: 100%">
    <el-tab-pane label="Log in" name="login">
      <login-in v-if='isShow1' :updateShow="updateShow" />
    </el-tab-pane>
    <el-tab-pane label="Register" name="register">
      <register v-if='isShow2' :updateShow="updateShow" />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import LoginIn from "./components/loginIn.vue";
import Register from "./components/register.vue";
import {onBeforeMount, ref} from "vue";

let isShow1 = ref(true), isShow2 = ref(false),activeName='login'
onBeforeMount(()=>{
    isShow1.value=true}
)
function updateShow(show1: boolean, show2: boolean) {
  isShow1.value = show1;
  isShow2.value = show2;
  console.log("更新了：")
  console.log("isShow1.value：", isShow1.value)
  console.log("isShow2.value：", isShow2.value)
}

function handleClick(tab:any) {
  if (tab.props.name === 'login') {
    updateShow(true, false);
  } else {
    updateShow(false, true);
  }
}
// function handleClick(tab:any) {
//   if (tab.props.name === 'login') {
//     isShow1.value = true
//     isShow2.value = false
//   } else {
//     isShow1.value = false
//     isShow2.value = true
//   }
// }
</script>

<style scoped>
</style>