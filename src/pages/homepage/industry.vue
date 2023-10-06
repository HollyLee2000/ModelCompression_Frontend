<template>
  <div style="margin-top:-24px; margin-bottom:-25px; !important;">

    <!-- <div class="module-header"
         style="background: url(&quot;//aip.bdstatic.com/portal-pc-node/dist/1606379845071/images/industry/agriculture/banner.jpg&quot;) center center / cover no-repeat rgba(0, 0, 0, 0.8);">
      <div class="module-header-container">
        <div class="module-header-content">
          <div class="module-header-title"> {{ keyToIndustry[industry].name }} </div>
          <div class="module-header-info"> {{ keyToIndustry[industry].desc }} </div>
        </div>
        <div class="module-header-empty"></div>
      </div>
    </div> -->
    <div class="module-header"
         v-bind:style="{ background: 'url(&quot;' + require(keyToIndustry[industry].back+'') + '&quot;) center center / cover no-repeat rgb(0, 0, 0)' }">
      <div class="module-header-container">
        <div class="module-header-content">
          <div class="module-header-title"> {{ keyToIndustry[industry].name }} </div>
          <div class="module-header-info"> {{ keyToIndustry[industry].desc }} </div>
        </div>
        <div class="module-header-empty"></div>
      </div>
    </div>

    <div id="static"
         class="common-container">

      <div style="padding-top: 50px;"
           class="section-wrap section-white modal_section">
        <section id=""
                 class="section">
          <div class="section-title_container">
            <div class="section-title"> {{ keyToIndustry[industry].name }}解决方案</div>
          </div>
          <div class="section-content">
            <div class="modeltype lite">

              <a v-for="item in keyToIndustry[industry].examples"
                 :key="item.id"

                 class="modeltype-item">
                <div class="modeltype-icon">
                  <img :src="require(item.img + '')"
                       :alt="item.name">
                </div>
                <div class="modeltype-title">
                  {{ item.name }}
                  <i class="el-icon-arrow-right"
                     style="font-size: 18px"></i>

                  <el-button class="button" plain
                    @click="createExample(item.key, industry)">创建</el-button>
                  <el-button class="button" plain
                  @click="demoExample(item.idx)">演示</el-button>

                </div>
                <div class="modeltype-type">
                  <span v-for="element in item.elements"
                        :key="element">{{ element }}</span>
                </div>
                <div class="modeltype-desc">{{ item.desc }}</div>
              </a>

            </div>
          </div>
        </section>
      </div>

    </div>
    <div class="footer">
      <div class="footer_cover">

        <el-row>
          <el-col :span="6"
                  :offset="6">
            <div class="ai_items_class connect">
              <div class="ai_title">联系地址</div>
              <div>
                <div class="ai_items qq">浙江省杭州市西湖区浙大路38号</div>
                <div class="ai_items qq">浙江大学玉泉校区</div>
                <div class="ai_items qq">曹光彪西楼404室</div>
                <div class="ai_items qq">视觉智能和模式识别实验室</div>
              </div>

            </div>
          </el-col>
          <el-col :span="6">
            <div class="ai_items_img">新浪微博</div>
          </el-col>
        </el-row>

      </div>
      <div class="footer_copyright"
           style="text-align: center; ">
        <p style="color: rgb(255,255,255);">©2017-2019 Laboratory of Visual Intelligence and Pattern Analysis All Rights Reserved</p>
      </div>
    </div>
  </div>
</template>

<script>
import { keyToIndustry } from './industries'

export default {
  name: 'Industry',

  data () {
    return {
      industry: this.$route.params.industry,
      keyToIndustry: keyToIndustry,
      testurl:
        '//aip.bdstatic.com/portal-pc-node/dist/1606379845071/images/industry/agriculture/banner.jpg'
    }
  },

  computed: {},

  methods: {
    createExample (task, industry) {
      /// object_detection factory
      let routeUrl = this.$router.resolve({
        name: 'Flowcharting',
        query: { task: task, industry: industry }
      })
      window.open(routeUrl.href, '_blank')
    },
    demoExample (type) {
      console.log(type)
      let routeUrl = this.$router.resolve({
        name: 'IndustryDemo',
        params: { type: type }
      })

      //  console.log({ id: id, name: this.allFlowChartData[index].name })
      window.open(routeUrl.href, '_blank')
    }
  }
}
</script>

<style scoped>
.modeltype.lite {
  font-size: 16px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  /* justify-content: space-between; */
}
.modeltype.lite .modeltype-item {
  display: block;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  /* flex-grow: 1; */
  width: 382px;
  padding: 30px;
  border: 1px solid rgba(0, 0, 0, 0);
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}
.modeltype.lite .modeltype-item:hover {
  border: 1px solid #036fe2;
  -webkit-box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.08);
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.08);
}

.modeltype.lite .modeltype-item:hover .modeltype-title {
  color: #503ef3;
}

 .modeltype.lite .modeltype-item .modeltype-title .button{
    padding: 6px 10px 6px 10px;
    float: right;
    margin: 2px 3px 0 3px;
  }

/* .modeltype.lite .modeltype-item:last-child {
  -webkit-box-flex: 0;
  -ms-flex-positive: 0;
  flex-grow: 0;
  margin-bottom: 0;
} */
.modeltype.lite .modeltype-icon {
  width: 320px;
  margin-bottom: 24px;
}
.modeltype.lite .modeltype-title {
  display: block;
  font-size: 20px;
  line-height: 30px;
  padding-bottom: 20px;
  margin-bottom: 24px;
  border-bottom: 1px solid #e1e1e1;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}
.modeltype.lite .modeltype-title > i {
  font-size: 12px;
  padding-left: 10px;
}
.modeltype.lite .modeltype-title:hover {
  color: #503ef3;
}
.modeltype.lite .modeltype-desc {
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  font-size: 14px;
  color: #666;
  line-height: 24px;
}
.modeltype.lite .modeltype-type {
  font-size: 14px;
  line-height: 24px;
  margin-bottom: 10px;
  /* margin-right: 10px; */
  overflow: hidden;
  color: #000;
}
.modeltype.lite .modeltype-type > span {
  display: inline-block;
  height: 24px;
  padding: 0 12px;
  margin-right: 10px;
  margin-bottom: 6px;
  background: #f5f5f5;
}

:root {
  --swiper-theme-color: #007aff;
}
.swiper-container {
  margin-left: auto;
  margin-right: auto;
  position: relative;
  overflow: hidden;
  list-style: none;
  padding: 0;
  z-index: 1;
}
.swiper-container /deep/ .el-carousel__button {
  background-color: #0c24ad;
}

.footer {
  vertical-align: top;
  background-color: rgba(3, 3, 122, 0.8);
  /* padding-right: 220px; */
}
.footer .footer_cover {
  width: 100%;
  height: 300px;
  margin: 0 auto;
}
.footer .ai_items_img {
  padding-top: 158px;
  color: #ffffff;

  font-size: 14px;
  width: 138px;
  text-align: center;
  margin-top: 80px;
  margin-left: 200px;
  background-image: url('./assets/QRcode.png');
  /* background-size: 200px 200px; */
  background-repeat: no-repeat;
}
.footer .ai_items_class {
  width: 259px;
  text-align: center;
  font-size: 18px;
  color: #fff;
  display: block;
  margin: 0 auto;
}
.footer .ai_items_class .title {
  font-size: 18px;
  margin: 20px 0 20px;
}
.footer .ai_items_class .desc {
  font-size: 14px;
  line-height: 20px;
  opacity: 0.66;
  max-width: 302px;
}
.footer .ai_items_class.logo {
  width: 405px;
}
.footer .ai_items_class.resource {
  width: 158px;
}
.footer .ai_items_class.market {
  width: 170px;
}
.footer .ai_items {
  font-size: 14px;
  color: #fff;
  opacity: 0.66;
  line-height: 36px;
  cursor: pointer;
}
.footer .ai_items.qq {
  cursor: default;
  white-space: nowrap;
}
.footer .ai_items.qq:hover {
  color: #fff;
}
.footer .ai_items:hover {
  opacity: 1;
  color: #036fe2;
  /* #3B5998 */
}
.footer .ai_title {
  margin: 48px 0 27px;
  text-align: center;
  color: #fff;
  font-size: 36px;
  opacity: 1;
  cursor: default;
}
.footer .footer_copyright {
  line-height: 50px;
  font-size: 14px;
}

body,
html {
  height: 100%;
  width: 100%;
  /* min-width: 1200px; */
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, Helvetica, Arial,
    sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
*,
body,
html {
  padding: 0;
  margin: 0;
}
* {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
a {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
img {
  width: 100%;
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
.modal_section .section-title_container {
  padding-bottom: 30px;
}
.section {
  margin: 0 auto;
  font-size: 0;
}
.section-wrap {
  padding-top: 60px;
  padding-bottom: 60px;
}
.section-white {
  background: rgba(0, 0, 0, 0);
}
.section-title_container {
  padding-bottom: 60px;
}
.section-title {
  width: 100%;
  font-size: 32px;
  text-align: center;
  font-weight: 400;
  letter-spacing: normal;
}
.common-container {
}
.common-container .section {
  width: 1180px;
}
</style>

<style scoped>
.module-header {
  height: 350px;
  color: #fff;
  background: #000;
}
.module-header-container {
  position: relative;
  margin: 0 auto;
  width: 1180px;
  height: 100%;
  color: #fff;
  overflow: hidden;
}
.module-header-title {
  font-size: 48px;
}
.module-header-info {
  width: 630px;
  margin-top: 30px;
  font-size: 16px;
  line-height: 27px;
}

.module-header-content,
.module-header-empty {
  display: inline-block;
  vertical-align: middle;
}
.module-header-empty {
  height: 100%;
}
</style>
