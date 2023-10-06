<template>
  <!-- 页面主体区域 -->
  <div class="main-container">
    <!-- 页面侧边栏 -->
    <!-- <el-header></el-header> -->
    <div class="aside">
      <el-aside >
        <el-scrollbar>
          <el-menu text-color="#717E88"
                   active-text-color="#ffd04b"
                   mode="vertical"
                   :default-active="activeIndex"
                   @select="handleSelect"
          >
            <el-menu-item
                v-for="(item, index) in navList"
                :key="index"
                :index="index.toString()"
                :style="{'background-color': activeStep == index ? '#434A50' : ''}"
                @click="jump(index)"
            >
                <span
                    ref="spans"
                    :style="{ color: activeStep == index ? '#ffd04b' : '#717E88'}"
                    @click="jump(index)"
                >
                  {{item.navName}}
                </span>
            </el-menu-item>
          </el-menu>
        </el-scrollbar>
      </el-aside>
    </div>

    <!-- 右侧内容主体 -->
    <div class="main-center">
      <el-main>
        <el-scrollbar ref="scrollBarRef" class="scrollMain" @scroll="scroll" id="scrollBarId">
          <div class="scroll-item">
            <div>
              <span class="infoTitle">视觉可解释概念和意义</span>
              <div class="infoContent">
                看视频。
              </div>
              <div id="diVideo">
                <doc-video></doc-video>
              </div>
            </div>
          </div>
          <el-divider></el-divider>
          <div class="scroll-item">
            <div>
              <span class="infoTitle">数据集介绍及选择</span>
              <div class="infoContent">
                。。。
              </div>
            </div>
          </div>
          <el-divider></el-divider>
          <div class="scroll-item">
            <div>
              <span class="infoTitle">算法介绍及选择</span>
              <div class="infoContent">
                。。。
              </div>
            </div>
          </div>
          <el-divider></el-divider>
          <div class="scroll-item">
            <div>
              <span class="infoTitle">系统使用流程</span>
              <div class="infoContent">
                。。。
              </div>
            </div>
          </div>
          <el-divider></el-divider>
          <div class="scroll-item">
            <div>
              <span class="infoTitle">系统用户管理</span>
              <div class="infoContent">
                。。。
              </div>
            </div>
          </div>
          <div class="scroll-item">
            <div>
            </div>
          </div>
        </el-scrollbar>
      </el-main>
    </div>
  </div>
</template>

<script>
import docVideo from './docVideo'

export default {
  data() {
    return {
      activeStep: 0,
      activeIndex: "1",
      navList: [{navName: "视觉可解释概念和意义"},
        {navName: "数据集介绍及选择"},
        {navName: "算法介绍及选择"},
        {navName: "系统使用流程"},
        {navName: "系统用户管理"}
      ],
    };
  },
  components: {
    docVideo
  },
  methods:{
    handleSelect(key) {
      console.log(key);
      // document.getElementById(key).scrollIntoView();
    },
    jump(index){
      this.activeStep = index;
      let items = document.querySelectorAll(".scroll-item");
      for (let i = 0; i < items.length; i++) {
        if (index == i) {
          items[i].scrollIntoView({
            block:"start", //跳转到顶部
            behavior: "instant", //滚动的速度
          });

        }
      }
    },
    scroll(s) {
      // console.log("go");
      let scrollItems = document.querySelectorAll(".scroll-item");
      // console.log(s.scrollTop);
      for (let i = scrollItems.length - 1; i >= 0; --i) {
        let dist = scrollItems[i].offsetTop - scrollItems[0].offsetTop;
        // console.log(dist);

        if (s.scrollTop >= dist) {
          // console.log("定位" + i);
          this.activeStep = i;
          break;
        }
      }
    }
  }
}
</script>

<style>
::-webkit-scrollbar {
  display: none;
}
</style>

<style scoped>
.main-container {
  position: relative;
  /*margin-top: 10px;*/
  /*margin-left: 10%;*/
  height:100%;
}
.main-center{
  height: 100%;
  background-color: white;
}
.aside{
  width: 200px;
}
.el-aside {
  background-color: #ffffff;
  display: block;
  position: absolute;
  overflow-x: hidden;
  overflow-y: hidden;
  width: 200px;
}
.scrollMain{
  padding: 0;
}
.el-main {
  position: absolute;
  left: 205px;
  right: 0px;
  top: -30px;
  bottom: 0;
  overflow-y: hidden;
  overflow-x: hidden;
}
.scroll-item {
  margin-top: 50px;
  height: 600px;
  scroll-margin-top: 30px ;
}
#diVideo{
  margin-top: 20px;
  margin-left: 12%;
}
.infoTitle{
  margin-left: 70px;
  font-weight: bold;
  font-size: x-large;
}
.infoContent{
  margin-left: 70px;
  margin-top:40px;
  font-size: medium;
}
.el-divider{
  margin-left: 70px;
  width: 85%;
}
.el-menu-item:hover{
  background-color: transparent;
}

</style>
