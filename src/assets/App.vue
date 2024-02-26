<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-menu
            mode="horizontal"
            background-color="white"
            text-color="#4C4C4C"
            active-text-color="#7C391D"
            class="el-menu-demo"
            :ellipsis="false"
            router="router"
        >
<!--          <div class="pro-sidebar-logo">-->
<!--            <div>VIPA</div>-->
<!--          </div>-->
          <el-menu-item index="homepage">HOME</el-menu-item>
          <el-menu-item index="coco" v-if="store.state.isAut">PRUNING</el-menu-item>
          <el-menu-item index="manage_server"  v-if="store.state.isAut">BENCHMARK</el-menu-item>
          <el-menu-item index="history" v-if="store.state.isAut">TASK</el-menu-item>
          <div class="flex-grow" />
          <el-menu-item v-if="!store.state.isAut" class="right" index="signin">log in / register</el-menu-item>
          <el-sub-menu v-else class="right">
            <template #title>{{store.state.username}}</template>
            <el-menu-item index="user" style="font-size: 15px">your profile</el-menu-item>
            <el-menu-item @click="login_out" style="font-size: 15px">sign out</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>

    <el-dialog
        v-model="dialogVisible"
        title="Tips"
        width="30%"
        :before-close="handleClose"
    >
      <span>This is a message</span>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false"
        >Confirm</el-button
        >
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" >
import {ref} from "vue";
import store from './store'
import request from "@/api";
import {router} from "@/router";
import Cookies from 'js-cookie'
import {ElMessage} from "element-plus";

function notImplemented(){
  ElMessage.error('Not implemented yet')
}

function login_out(){
  console.log("login out")
  store.commit("loginOut")
  // Cookies.remove("userTicket")
  localStorage.removeItem("userTicket")
  // try
  // router.push('/')
  // router.go(0)



  // request.get("user/logout").then(
  //     res => {
  //       console.log(res);
  //       //console.log(res.data.data.code);
  //       if (res.status === 200) {
  //         console.log("退出成功了");
  //       } else
  //         console.log("退出时出现了错误");
  //     }
  // ).catch(err => {
  //   console.log(err);
  //   console.log("logout error");
  // });



  router.push('/homepage')  //返回主页
  // location.reload()  //刷新当前页面
}
function login_init(){
  const _username = localStorage.getItem("username")
  const access = localStorage.getItem('access')
  console.log("localStorage", _username, access)
  if(_username!=null){
    console.log("setAccount", _username)
    store.commit("loginIn")
    store.commit("setAccount", _username)
    store.commit('setAccess', access)
  }
}
login_init()
</script>

<style lang="scss" scoped>

.pro-sidebar-logo {
  display: flex;
  align-items: center;

> div {
  width: 50px;
  min-width: 50px;
  height: 35px;
  min-height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  font-weight: 700;
  background-color: #ff8100;
  margin-right: 10px;
}

> h5 {
  margin-top: 7px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 20px;
  line-height: 30px;
  transition: opacity 0.3s;
  opacity: 1;
}
}


.holly-title{
  font-size: 15px
}
.flex-grow {
  flex-grow: 1;
}
.el-header {
  position: sticky;
  top: 0;
  padding: 0;
  margin: 0;
}
.el-menu {
  padding: 0;
  margin: 0;
  padding-inline: 40px;
  //border: 0;
  text-align: left;
  /*border: 5px solid #000000;*/
}
.el-sub-menu {
  padding: 0;
  margin: 0;
  //border: 0;
  text-align: left;
  /*border: 5px solid #000000;*/
}
.el-menu-item{
}
.el-main {
  padding: 0;
  margin: 0;
  background-color: white;
  /*background-image: linear-gradient(transparent,#fff 100%), url("http://10.214.242.155:7996/img/background/background_purple.jpg");*/
}
.right{
  /*position: absolute;*/
  right: 0;
  font-size: 20px;
  /*margin-inline: 20px;*/
  /*display: flex;*/
}
.common-layout{
  height: 100%;
}
.el-container,
.el-menu,
.el-main {
  height: 100%;
}
/* <style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
*/
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>