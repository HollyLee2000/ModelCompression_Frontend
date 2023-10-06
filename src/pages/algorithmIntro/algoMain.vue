<template>
  <el-tabs type="border-card" class="demo-tabs" @tab-click="handleClick" v-model="activeName" :stretch=true>
    <el-tab-pane label="中文" name="login">
      <login-in v-if='isShow1' />
    </el-tab-pane>
    <el-tab-pane label="注册" name="register">
      <register v-if='isShow2' />
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
function handleClick(tab:any) {
  if (tab.props.name === 'login') {
    isShow1.value = true
    isShow2.value = false
  } else {
    isShow1.value = false
    isShow2.value = true
  }
}
</script>

<style scoped>
</style>