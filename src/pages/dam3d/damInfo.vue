<template>
  <div id="info-container">
    <h2>大坝信息</h2>
    <div id="in-container">
      <p  v-for="(item, index) in infoList"
          :key="index"
      >
        <span>{{item.infoKey}}: {{item.infoValue}}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "damInfo",
  data() {
    return{
      infoList: [{infoKey: "模型名称", infoValue: "测试大坝"},
        {infoKey: "检测异常数", infoValue: 10},
        {infoKey: "模型贴图数", infoValue: 200},
        {infoKey: "其他信息", infoValue: "测试信息"}]
    }
  }
}
</script>

<style scoped>
#info-container{
  width: 200px;
}
#in-container{
  margin-left: 30px;
}
h2{
  text-align: center;
  font-weight: bold;
  font-size: large;
}
</style>
