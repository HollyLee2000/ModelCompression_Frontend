<template style="overflow: scroll">
  <div v-loading="resultLoading3">
    <el-container>



      <el-dialog class="scrollable" v-model="dialogVisible_adjust_result" style="width:80%; height:80%; text-align: center; overflow: auto;"
                 :draggable="true" @close="closeDialog" :append-to-body="true" title="原型树的修改结果" >
<!--        <div v-loading="resultLoading3">-->

        <el-progress :text-inside="true"  class="m-2" :stroke-width="26" :percentage="percentage" :color="colors"  />
        <div style="margin: 20px 0 0 0;"></div>

        <div v-loading="resultLoading4" :style="{visibility:resultShow_tree_result?'visible':'hidden'}">
          <div style="margin: 0 20px; text-align: left;">
            <label style="margin-left: 50px; font-size:18px; border: 0; color: black; ">原型树在测试集上的精度变化：</label>
          </div>
          <div style="background-color: #E7E7E7; width:94%; padding: 20px; margin: 20px 0; border:2px solid #a1a1a1; border-radius:25px;">
            <label style="background-color: #E7E7E7; font-size:30px; color: black; border: 0; font-family: 'Microsoft Yahei'">Accuracy: </label>
            <label style="background-color: #E7E7E7; font-size:30px; color: #C40000; border: 0; font-family: 'Microsoft Yahei'">{{String(acc_origin)}}% --> {{acc_current}}%</label>
            <br>
          </div>
<!--          <div style="margin: 0 20px; text-align: left;">-->
<!--            <label style="margin-left: 50px; font-size:18px; border: 0; color: black; ">如果满意此修改，你可以命名并保存为自己的模型：</label>-->
<!--          </div>-->
        <div style="margin: 0 0 20px 0; text-align: left;">
        <label style="margin-left: 50px; font-size:18px; border: 0; color: black; ">如果满意此修改，你可以命名并保存为自己的模型：</label>
        </div>
          <div class="holly-data-center">
            <el-input  v-model="user_model" placeholder="请输入你的模型名称" style="width: 20%; margin-right: 15px;" />
            <el-button style="border-color: #000000;" size="large" type="success" plain @click="store_model">确定</el-button>
            <el-button style="border-color: #000000;" size="large" type="danger" plain @click="dialogVisible_adjust_result = false">放弃</el-button>
          </div>
        </div>
<!--        </div>-->
      </el-dialog>







      <el-dialog class="scrollable" v-model="dialogVisible" style="width:80%; height:80%; text-align: center; overflow: auto;"
                 :draggable="true" @close="dialogVisible = false" :append-to-body="true" title="修改局部预测" >
        <div v-loading="resultLoading2">

        <div style="margin: 0 0 20px 0; text-align: left;">
          <label style="margin-left: 50px; font-size:18px; border: 0; color: black; ">起始的贪心预测路径：</label>
        </div>
        <div style="display: flex; justify-content: center;">
          <div v-for="(item,index) in showList3" style="margin: 30px 0;">
            <el-image :src="`http://${item}`"
                      :fit="'fill'"
                      :preview-src-list="showList3.map(x=>'http://'+x)"
                      :initial-index="index"
            >
            </el-image>
          </div>
        </div>

        <div style="margin: 0 0 20px 0; text-align: left;">
          <label style="margin-left: 50px; font-size:18px; border: 0; color: black; ">点击修改路径上的节点原型：</label>
        </div>
        <div style="display: flex; justify-content: space-around;">
          <div v-for="(item,index) in now_rank_pic" style="margin: 30px 0;">
            <el-image :src="`http://${item}`"
                      :fit="'fill'"
                      :style="'cursor: pointer;'"
                      @click="select(index)"
            >
            </el-image>
          </div>
        </div>
        <div style="text-align: center">
          <el-button style="border-color: #000000;" size="large" type="success" plain @click="adjust()">查看修改后的预测结果</el-button>
        </div>

        <div :style="{visibility:resultShow2?'visible':'hidden'}" >

        <div style="margin: 0 20px; text-align: left;">
          <label style="margin-left: 50px; font-size:18px; border: 0; color: black; ">预测结果的改变：</label>
        </div>
        <div style="background-color: #E7E7E7; width:94%; padding: 20px; margin: 0 20px 0 0; border:2px solid #a1a1a1; border-radius:25px;">
          <label style="background-color: #E7E7E7; font-size:30px; color: black; border: 0; font-family: 'Microsoft Yahei'">GroundTruth: </label>
          <label style="background-color: #E7E7E7; font-size:30px; color: #C40000; border: 0; font-family: 'Microsoft Yahei'">{{GroundTruth}} --> {{GroundTruth}}</label>
          <br>
          <label style="background-color: #E7E7E7; font-size:30px; color: black; border: 0; font-family: 'Microsoft Yahei'">Predicted: </label>
          <label style="background-color: #E7E7E7; font-size:30px; color: #C40000; border: 0; font-family: 'Microsoft Yahei'">{{Predicted}} --> {{new_Predicted}}</label>
          <br>
          <label style="background-color: #E7E7E7; font-size:30px; color: black; border: 0; font-family: 'Microsoft Yahei'">Probability: </label>
          <label style="background-color: #E7E7E7; font-size:30px; color: #C40000; border: 0; font-family: 'Microsoft Yahei'">{{Probability}} --> {{new_Probability}}</label>
          <br>
        </div>

        <div style="margin: 0 20px; text-align: left;">
          <label style="margin-left: 50px; font-size:18px; border: 0; color: black; ">新的预测路径：</label>
        </div>

        <div style="display: flex; justify-content: center;">
          <div v-for="(item,index) in new_showList3" style="margin: 30px 0;">
            <el-image :src="`http://${item}`"
                      :fit="'fill'"
                      :preview-src-list="new_showList3.map(x=>'http://'+x)"
                      :initial-index="index"
            >
            </el-image>
          </div>
        </div>

          <div class="holly-data">
            <el-link style="display: inline-block;" target="_blank"
                     :href="`http://${new_showpdf}`" :underline="false">
              <el-button style="border-color: #000000;" size="large" type="primary" plain>查看高清矢量图</el-button>
            </el-link>
            <el-button style="border-color: #000000;" size="large" type="success" plain @click="change_result()">接受此修改</el-button>
          </div>

        </div>

<!--        <div style="text-align: center">-->
<!--          <el-link style="display: inline-block;" target="_blank"-->
<!--                   :href="`http://${new_showpdf}`" :underline="false">-->
<!--            <el-button style="border-color: #000000;" size="large" type="primary" plain>查看高清矢量图</el-button>-->
<!--          </el-link>-->
<!--        </div>-->





        <el-dialog class="scrollable" v-model="dialogVisible2" style="width:30%; height:60%; text-align: center; overflow: auto;"
                   :draggable="true" @close="dialogVisible2 = false" :append-to-body="true" >

          <label style="font-size:18px; border: 0; color: black; ">重新选择第{{now_select+1}}个节点的原型<br>候选映射按照和投影前节点原型的相似度排名</label>

          <div style="display: flex; flex-direction: column; justify-content: space-around;">
            <div v-for="(item,index) in rank_pic_pool[now_select]" style="margin: 30px 0; display: flex; justify-content:center;">
              <label style="font-size:18px; border: 0; color: black; ">rank{{index+1}}：</label>
                <el-image :src="`http://${item}`"
                          :fit="'fill'"
                          :style="'cursor: pointer;'"
                          @click="change_usr_rank(now_select, index)"
                >
                </el-image>
            </div>
          </div>


        </el-dialog>




        </div>
      </el-dialog>

      <el-dialog class="scrollable" v-model="dialogVisible_adjust_tree" style="width:30%; height:60%; text-align: center; overflow: auto;"
                 :draggable="true" @close="dialogVisible_adjust_tree = false" :append-to-body="true" >

        <label style="font-size:18px; border: 0; color: black; ">重新选择第{{now_select_tree}}个节点的原型<br>候选映射按照和投影前节点原型的相似度排名</label>

        <div style="display: flex; flex-direction: column; justify-content: space-around;">
          <div v-for="(item,index) in rank_pic_pool_global[now_select_tree]" style="margin: 30px 0; display: flex; justify-content:center;">
            <label style="font-size:18px; border: 0; color: black; ">rank{{index+1}}：</label>
            <el-image :src="`http://${item}`"
                      :fit="'fill'"
                      :style="'cursor: pointer;'"
                      @click="change_global_usr_rank(now_select_tree, index)"
            >
            </el-image>
          </div>
        </div>


      </el-dialog>


      <el-aside  style="background-color: white; width: 50%; padding: 20px">
        <div class="jump-tool" style="margin: 20px 0 40px 0; text-align: center; ">
          <label style="font-size:35px; color: black; border: 0;">1. Choose a Bird</label>
        </div>
<!--          <div v-for="(item,index) in showListPool" class="demo-image2">-->
<!--            <div class="block2">-->
<!--              <el-image :src="`http://${item}`"-->
<!--                        :initial-index="index"-->
<!--                        :fit="'scale-down'"-->
<!--                        :key="componentKey"-->
<!--                        @click="chooseImg($event)"-->
<!--              >-->
<!--              </el-image>-->
<!--            </div>-->
<!--          </div>-->



        <div style="display: flex; justify-content: center;">
          <div style="margin: 30px 0; width: 80%;">
            <el-image :src="`http://${chosen}`"
                      :fit="'fill'"
                      :style="'width: 100%;'"
                      :key="componentKey"
                      @click="chooseImg($event)"
            >
            </el-image>
          </div>
        </div>


            <el-row>
                <el-col v-for="(item,index) in showListPool" :span="4" :key="index">
                  <div :id=index class="block2" @click="activate = index" :style="{border: activate === index ? '2px solid red' : '2px solid white'}">
                    <el-image :src="`http://${item}`"
                              :initial-index="index"
                              style="width: 100%; height: 100%"
                              :fit="'fill'"
                              :key="componentKey"
                              @click="chooseImg($event)"
                    >
                    </el-image>
                  </div>
                </el-col>
            </el-row>


<!--        <div class="data">-->
<!--          <el-button size="large" type="primary" class="m-1" @click="refreshCifar">刷新图像池</el-button>-->
<!--          <el-button size="large" type="primary" class="m-3">数据集介绍</el-button>-->
<!--        </div>-->
        <div class="holly-data">
          <el-button size="large" type="primary"  @click="refreshCifar" plain>刷新图像池</el-button>
          <el-button size="large" type="warning"  plain>数据集介绍</el-button>
        </div>
      </el-aside>
      <el-main style="background-color: white" v-loading="resultLoading">
        <div style="margin: 20px 0 40px 0; text-align: center; ">
          <label style="font-size:35px; color: black; border: 0;">2. Choose a Model and an Algorithm</label>
        </div>

        <div class="holly-detect">
          <el-select v-model="chosenModel" placeholder="请选择神经网络模型" size="large">
            <el-option key="1008601" label="Public ProtoTree for CUB(1)" value="cub1" />
            <el-option key="1008602" label="Public ProtoTree for CUB(2)" value="cub2" />
            <el-option v-for="(model, index) in user_model_list" :key="index" :label="model.modelName" :value="model.modelName" />
          </el-select>
          <el-select  v-model="chosenAlgorithm" placeholder="请选择推理算法" size="large">
            <el-option key="6" label="此为可解释建模方法,无需额外的推理算法" value="none" :disabled=true />
          </el-select>
          <el-button size="large" type="success"  @click="startRecognize" plain>开始推理</el-button>
        </div>

<!--        <div class="detect">-->
<!--          <el-select v-model="chosenModel" class="m-2" placeholder="请ra模型" size="large">-->
<!--            <el-option key="6" label="ProtoTree for CUB(1)" value="cub1" />-->
<!--          </el-select>-->
<!--          <el-select  v-model="chosenAlgorithm" class="m-2" placeholder="请选择推理算法" size="large">-->
<!--            <el-option key="6" label="此为可解释建模方法,无需额外的推理算法" value="none" :disabled=true />-->
<!--          </el-select>-->
<!--          <el-button size="large" type="primary" class="inference" @click="startRecognize">开始推理</el-button>-->
<!--        </div>-->
        <div :style="{visibility:resultShow?'visible':'hidden'}" >
        <div style="margin: 0 0 20px 0; text-align: center;">
          <label style="font-size:35px; border: 0; color: black; ">3. Inference Result</label>
        </div>
        <div style="background-color: #E7E7E7; width:94%; padding: 20px; margin: 0 20px 0 0; border:2px solid #a1a1a1; border-radius:25px;">
          <label style="background-color: #E7E7E7; font-size:30px; color: black; border: 0; font-family: 'Microsoft Yahei'">GroundTruth: </label>
          <label style="background-color: #E7E7E7; font-size:30px; color: #C40000; border: 0; font-family: 'Microsoft Yahei'">{{GroundTruth}}</label>
          <br>
          <label style="background-color: #E7E7E7; font-size:30px; color: black; border: 0; font-family: 'Microsoft Yahei'">Predicted: </label>
          <label style="background-color: #E7E7E7; font-size:30px; color: #C40000; border: 0; font-family: 'Microsoft Yahei'">{{Predicted}}</label>
          <br>
          <label style="background-color: #E7E7E7; font-size:30px; color: black; border: 0; font-family: 'Microsoft Yahei'">Probability: </label>
          <label style="background-color: #E7E7E7; font-size:30px; color: #C40000; border: 0; font-family: 'Microsoft Yahei'">{{Probability}}</label>
          <br>
        </div>

        <div style="margin: 20px 0 20px 0; text-align: center;">
          <label style="font-size:35px; color: black; border: 0; ">4. ProtoTree (pruned)</label>
        </div>


          <div style="display: flex; justify-content: center;">
            <div v-for="(item,index) in showList2" style="margin: 30px 0;">
              <el-image :src="`http://${item}`"
                        :fit="'fill'"
                        :preview-src-list="showList2.map(x=>'http://'+x)"
                        :initial-index="index"
              >
              </el-image>
            </div>
          </div>

        <div class="holly-data">
          <el-link target="_blank"
                   :href="`http://10.214.242.155:7996/Prototype/test_${chosenModel}_pooled/pruned_and_projected/treevis.pdf`" :underline="false">
            <el-button style="border-color: #000000;" size="large" type="primary" plain>查看高清矢量图</el-button>
          </el-link>
          <el-link target="_blank"  :href="'http://10.214.242.155:7996/Prototype/test_'+chosenModel+'_pooled/pruned_and_projected/node_vis.zip'" :underline="false">
            <el-button style="border-color: #000000;" size="large" type="warning" plain>下载节点原型</el-button>
          </el-link>
          <el-button style="border-color: #000000;" size="large" type="success" plain @click="jumpToTree">更改节点原型</el-button>
        </div>

        <div style="margin: 20px 0 20px 0; text-align: center;">
          <label style="font-size:35px; color: black; border: 0;">5. Local explaination (predicted)</label>
        </div>

          <div style="display: flex; justify-content: center;">
            <div v-for="(item,index) in showList3" style="margin: 30px 0;">
              <el-image :src="`http://${item}`"
                        :fit="'fill'"
                        :preview-src-list="showList3.map(x=>'http://'+x)"
                        :initial-index="index"
                        @error="error_img[index] = true"
                        @load="error_img[index] = false"
              >
              </el-image>
              <div v-show="error_img[index]" class="demo-image__error">
                <div class="block">
                  <el-image>
                    <template #error>
                      <div class="image-slot">
                        遗憾！算法未能成功执行
                        <br>
                        可能是由于服务器算力不足、程序出错或其他原因
                        <br>
                        服务器当前可用最大算力：{{memory}}，位于GPU {{gpu}}上
                        <br>请稍后再试
                      </div>
                    </template>
                  </el-image>
                </div>
              </div>
            </div>
          </div>

        <div class="holly-data">
          <el-link style="display: inline-block;" target="_blank"
                   :href="`http://${showpdf}`" :underline="false">
            <el-button style="border-color: #000000;" size="large" type="primary" plain>查看高清矢量图</el-button>
          </el-link>
          <el-button style="border-color: #000000;" size="large" type="success" plain @click="dialogVisible = true">修改局部预测</el-button>
        </div>

        </div>

<!--        <div v-for="(item,index) in showList" class="demo-image" style="margin: 30px 0 0 0;">-->
<!--          <div class="block">-->
<!--            <el-image :src="`http://${item}`"-->
<!--                      :preview-src-list="listPreview"-->
<!--                      :initial-index="index"-->
<!--                      class="image"-->
<!--                      :fit="'scale-down'"-->
<!--            >-->
<!--            </el-image>-->
<!--            <br>-->
<!--          </div>-->
<!--        </div>-->
      </el-main>
    </el-container>


  <div class="holly" v-show="dialogVisible_tree">
    <div class="jump-svg" style="display: flex; justify-content: space-around; margin-top: 20%; padding-top: 10%">
      <el-button style="border-color: #000000;" size="large" type="primary" plain @click="display_whole">展示完整的树</el-button>
      <el-button style="border-color: #000000;" size="large" type="warning" plain @click="display_pros">仅展示原型节点(默认)</el-button>
      <el-button style="border-color: #000000;" size="large" type="danger" plain @click="jumpToMain">返回主界面</el-button>
      <el-button style="border-color: #000000;" size="large" type="success" plain @click="adjust_tree()">确定修改</el-button>
<!--      <el-button style="border-color: #000000;" size="large" type="success" plain @click="dialogVisible_adjust_result = true">确定修改</el-button>-->
    </div>
    <div id="cub-tree-container"></div>

  </div>
  </div>
</template>

// 明天加resultloading，改对话框界面样式

<script lang="ts" setup>
import {router} from "@/router";
import {ElMessage} from "element-plus";
import request from "@/api";
// import {reactive, ref} from "vue";
import {useStore} from "vuex";
import axios from "axios";
import DataUpload from "./DataUpload.vue";
import $ from 'jquery'
import * as d3 from 'd3';
import { reactive, onMounted, ref } from "vue";
import '@fortawesome/fontawesome-free/css/all.css'

const dialogVisible = ref(false);
const dialogVisible_tree = ref(false);
const dialogVisible_adjust_result = ref(false);  //记得改回来
const componentKey = ref(0);
const last_id = ref(666)
const percentage = ref(0)
const colors = [
  { color: '#FDACBE', percentage: 20 },
  { color: '#f56c6c', percentage: 40 },
  { color: '#e6a23c', percentage: 60 },
  { color: '#5cb87a', percentage: 80 },
  { color: '#20BD1C', percentage: 100 },
]
const chosenModel = ref('')
const chosenImg = ref('')
// console.log("-> chosenImg", chosenImg);
const istrue = ref(false)
const chosenAlgorithm = ref('')
const activate = ref(-1)
const gpu = ref('')
const memory = ref('')
const chosen = ref([])
const error_img = ref([false, false])

const acc_origin = ref()
const acc_current = ref()

const user_model_list = ref([])

const user_model = ref('')

const GroundTruth = ref('')
const Predicted = ref('')
const Probability = ref('')
const new_Predicted = ref('')
const new_Probability = ref('')
let resultLoading = ref(false)
let resultLoading2 = ref(false)
let resultLoading3 = ref(false)
let resultLoading4 = ref(false)
// let resultShow = ref(false)  // 记得改回来
let resultShow = ref(false)
let resultShow2 = ref(false)
let resultShow_tree_result = ref(false)
const node_idx = ref([])  //节点在树中的下标
const new_node_idx = ref([])
const now_rank_pic = ref([])  //现在选择的一些原型
const rank_pic_pool = ref([]) //原型池
const user_rank = ref([]) // 用户选择的rank
const now_select = ref(1); //当前选择要修改的原型下标
const now_select_tree = ref()
var path_to_deal = []
var link_factor = 10

const new_now_rank_pic = ref([])  //新选择的一些原型
// const new_rank_pic_pool = ref([]) //原型池
const new_user_rank = ref([]) // 用户新选择的rank

// 树里的变量
var nodes;
var dragStarted;
var domNode;



const now_rank_pic_global = ref()  //现在选择的所有原型
const rank_pic_pool_global = ref() //所有的原型池
const user_rank_global= ref() // 用户选择的所有rank
const current_tree = ref()
const current_tree_with_leaf = ref()
const leaf_tree = ref(false)


const chosenEnhanceAlgorithm = ref('')
const chosenStitchingAlgorithm = ref('')
// const detectSettingLoading = ref(false)
const store = useStore();
const listPage = ref(1), imageNumber = ref(8);
const fileList = ref([]), datasetInformation = ref({}), fileList2 = ref([]);
let selectList = Array(imageNumber.value).fill(0);
let deleteShow = ref(false);
const showList = ref([]), showList2 = ref([]), showList3 = ref([]), showpdf = ref(''), listPreview = ref([]), showListPool = ref([]), listPreview2 = ref([]);
const dialogVisible2 = ref(false)
const dialogVisible_adjust_tree = ref(false)
const new_showList3 = ref([])
const new_showpdf = ref('')

async function refreshImages(option) { //推理之后才提交的, 刷新右边的结果
  // console.log(option);
  await getDatasetInfos(option);
  updateShowList();
}

function closeDialog() {
  dialogVisible_adjust_result.value = false;
  resultShow_tree_result.value = false;
}


async function get_user_model(){


  // await request.post('/algorithm/callAlgorithm',{
  //   algorithmName:'CUB-200-2011',
  //   datasetId: 666,
  //   datasetName: "CUB_CARS",
  //   modelName: chosenModel.value,
  //   userName: chosenImg.value,
  //   // userName: store.state.username,
  // })
  let requestUrl = "/model/findAll", requestData = {};
  requestData["username"] = store.state.username
  // username: store.state.username
  await request.post(requestUrl, requestData)
      .then((res) => {
        if (res.status === 200) {
          console.log("get_user_model:", res.data.data);
          // fileList2.value = (res.data.data);
          // chosen.value[0] = res.data.data[0]
          user_model_list.value = res.data.data.modelInfos
        } else {
          console.log("err request");
        }
      })
      .catch((err) => {
        console.log(err);
      });
}

async function getDatasetInfos(option) {
  let requestUrl = "/dataset/" + option, requestData = {};
  requestData["datasetId"] = 666; //其实用不上
  await request.post(requestUrl, requestData)
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          fileList.value = (res.data.data);
        } else {
          console.log("err request");
        }
      })
      .catch((err) => {
        console.log(err);
      });
}

function jumpToTree() {
  dialogVisible_tree.value = true;
  const el = document.querySelector('.jump-svg');
  el.scrollIntoView();
  // el.scrollIntoView({ behavior: 'smooth' });
}

function jumpToMain() {
  dialogVisible_tree.value = false;
  // window.scrollTo({
  //   top: 0,
  //   behavior: 'smooth' // 添加 'smooth' 参数以实现平滑的滚动效果
  // });
  // const el = document.querySelector('.el-header');
  // el.scrollIntoView({ behavior: 'smooth' });
}


const updateShowList = () => {
  showList.value = fileList.value
  console.log("showList.value", showList.value);
  listPreview.value = (showList.value.map((e) => {
    return "http://" + e;
  }));
  console.log("listPreview.value", listPreview.value)
};

const change_result = () => {
  showList3.value = new_showList3.value;
  showpdf.value = new_showpdf.value;
  Predicted.value = new_Predicted.value;
  Probability.value = new_Probability.value;
  node_idx.value = new_node_idx.value;
  now_rank_pic.value = new_now_rank_pic.value;
  user_rank.value = new_user_rank.value;

  resultShow2.value = false
  dialogVisible.value = false
}


async function realRefreshImages(option){  //图像池的刷新
  await getImgPoolInfos(option);
  updatePoolList();
  await get_user_model();
}

async function getImgPoolInfos(option){
  let requestUrl = "/dataset/" + option, requestData = {};
  requestData["datasetId"] = 10005;
  await request.post(requestUrl, requestData)
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          fileList2.value = (res.data.data);
          chosen.value[0] = res.data.data[0]
        } else {
          console.log("err request");
        }
      })
      .catch((err) => {
        console.log(err);
      });
}

const updatePoolList = () => {
  showListPool.value = fileList2.value
  console.log("showListPool.value", showListPool.value);
  listPreview2.value = (showListPool.value.map((e) => {
    return "http://" + e;
  }));
  console.log("listPreview2.value", listPreview2.value)
};

async function refreshCifar(){  //懒得改名字了~
  realRefreshImages("getPool");
  activate.value = -1;
  // let last_d = document.getElementById(last_id.value.toString()) //对应被注释掉的那种写法
  // last_d.style.border = "2px solid white";
  // last_id.value == 666
}

realRefreshImages("getPool");

const selectChange = (index) => {
  selectList[index] ^= 1;
  console.log(selectList);
};

const select = (index) => {
  dialogVisible2.value = true;
  now_select.value = index;
}

const change_usr_rank = (now_select, index) => {
  user_rank.value[now_select] = index+1
  now_rank_pic.value[now_select] = rank_pic_pool.value[now_select][index]
  dialogVisible2.value = false
  console.log('user_rank.value: ', user_rank.value)
}

const change_global_usr_rank = (now_select_tree, index) => {
  user_rank_global.value[now_select_tree] = index+1
  now_rank_pic_global.value[now_select_tree] = rank_pic_pool_global.value[now_select_tree][index]
  dialogVisible_adjust_tree.value = false
  // console.log(current_tree.value)
      // +" image"
  // d3.selectAll("#"+now_select_tree)
  //     .attr("xlink:href", "http://"+now_rank_pic_global.value[now_select_tree]);
  // path_to_deal = []
  console.log("current_tree.value", current_tree.value)
  current_tree.value = findNodeByName(current_tree.value, now_select_tree, now_select_tree) // 直接在里面操作了
  current_tree_with_leaf.value = findNodeByName(current_tree_with_leaf.value, now_select_tree, now_select_tree) // 直接在里面操作了
  console.log("current_tree.value revised", current_tree.value)
  // console.log("temp_node.src: ", temp_node.src)
  MyMounted();
  console.log('user_rank_global.value: ', user_rank_global.value)
}

// function change_current_tree(now_dict, now_select_tree, now_pic){
//
// }

function display_pros(){
  leaf_tree.value = false;
  link_factor = 20;
  MyMounted();
}

function display_whole(){
  leaf_tree.value = true;
  link_factor = 10;
  MyMounted();
}

function findNodeByName(node, targetName, now_select_tree) {
  if (node.name == targetName) {
    console.log("node.src", node.src)
    node.src = now_rank_pic_global.value[now_select_tree]
    console.log("node.src revised", node.src)
  } else {
    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        if (node.children[i]) {
          node.children[i] = findNodeByName(node.children[i], targetName, now_select_tree);
        }
      }
    }
  }
  return node;
}

// function findNodeByName(node, targetName, now_select_tree) {
//   if (node.name == targetName) {
//     console.log("node.name", node.name)
//     console.log("node.src", node.src)
//     console.log("path_to_deal:", path_to_deal)
//
//     const tree = current_tree.value;
//     let dict = tree;
//     for (const key of path_to_deal) {
//       dict = dict['children'][key];
//     }
//     dict['src'] = now_rank_pic_global.value[now_select_tree];
//
//     current_tree.value = tree;
//
//     // node.src = now_rank_pic_global.value[now_select_tree]
//     console.log("node.src after revise", node.src)
//     return node;
//   } else {
//     // console.log("node.children", node.children)
//     if (node.children) {
//       // for (let child of node.children)
//       // console.log("node.children", node.children)
//       for (let i=0; i<=1; i++) {
//         path_to_deal.push(i)
//         if(node.children[i]){
//           let foundNode = findNodeByName(node.children[i], targetName, now_select_tree);
//           if (foundNode !== null) {
//             return foundNode;
//           }
//         }
//         path_to_deal.pop()
//       }
//     }
//     return null;
//   }
// }

function uploadDataset() {
  router.push('datasetPreview')
}

// changeColor(()=>{
//   this.$refs.abc.style.border = '2px solid red';
// })
function changeColor(event){  // vue正常思路：用组件的active，但是好像要用data()，以后学了再改吧
  console.log("event", event)
  console.log("event.currentTarget.id", event.currentTarget.id)
  // console.log("document.getElementById(event.currentTarget.id).style.border", document.getElementById(event.currentTarget.id).style.border)
  let d = document.getElementById(event.currentTarget.id)
  d.style.border = "4px solid red";
  if(last_id.value == 666){
    last_id.value = event.currentTarget.id
  }else{
    let last_d = document.getElementById(last_id.value.toString())
    last_d.style.border = "2px solid white";
    last_id.value = event.currentTarget.id
  }
}
// const changeColor = () =>
// {
//     console.log(this.refs)
//     // this.refs.abc.style.border = '2px solid red';
//   // obj.style.border = '2px solid red';
// }

function chooseImg($event) {
  console.log("$event", $event)
  console.log("$event.srcElement.currentSrc", $event.srcElement.currentSrc)
  let arr = $event.srcElement.currentSrc.split("/")
  chosenImg.value = arr[arr.length - 2] + "/" + arr[arr.length - 1]
  chosen.value[0] = $event.srcElement.currentSrc.substring(7);
  console.log("图片名称", chosenImg.value)
}

const forceRerender = () => {
  console.log(componentKey.value)
  componentKey.value += 1;

};

async function startRecognize() {
  console.log("start Recognize")

  if(!chosenModel.value){
    ElMessage.error('请选择要使用的模型')
    return
  }
  // if(!chosenAlgorithm.value){
  //   ElMessage.error('请选择要使用的算法')
  //   return
  // }
  if(!chosenImg.value){
    ElMessage.error('请选择要解释的图像')
    return
  }
  resultLoading.value = true
  ElMessage({
    message: '正在使用原型神经树进行预测. \n 这可能会花15秒左右的时间:)',
    type: 'success',
    duration: 6000,
  })
  await request.post('/algorithm/callAlgorithm',{
    algorithmName:'CUB-200-2011',
    datasetId: 666,
    datasetName: "CUB_CARS",
    modelName: chosenModel.value,
    userName: chosenImg.value,
    // userName: store.state.username,
  })
      .then(async (response) => {
        console.log("response", response)
        showList3.value[0] = response.data.data.result[6];
        showpdf.value = response.data.data.result[7];
        GroundTruth.value = response.data.data.result[8];
        Predicted.value = response.data.data.result[9];
        Probability.value = response.data.data.result[10];
        node_idx.value = JSON.parse(response.data.data.result[11]);
        now_rank_pic.value = JSON.parse(response.data.data.result[12].replace(/'/g, "\""));
        rank_pic_pool.value = JSON.parse(response.data.data.result[13].replace(/'/g, "\""));
        user_rank.value = JSON.parse(response.data.data.result[14].replace(/'/g, "\""));


        rank_pic_pool_global.value = JSON.parse(response.data.data.result[16].replace(/'/g, "\""));
        user_rank_global.value = JSON.parse(response.data.data.result[17].replace(/'/g, "\""));
        now_rank_pic_global.value = JSON.parse(response.data.data.result[15].replace(/'/g, "\""));
        current_tree.value = JSON.parse(response.data.data.result[18].replace(/'/g, "\""));
        current_tree_with_leaf.value = JSON.parse(response.data.data.result[19].replace(/'/g, "\""));
      })
      .catch((error)=>{
        console.error(error)
      })
  // for(let i=0; i<now_rank_pic.value.length; i++){
  //   user_rank.value[i] = 1
  // }
  showList.value[0] = "10.214.242.155:7996/Prototype/test_" + chosenModel.value + "_full/pruned_and_projected/treevis.png";
  showList2.value[0] = "10.214.242.155:7996/Prototype/test_" + chosenModel.value + "_pooled/pruned_and_projected/treevis.png";


  console.log("node_idx.value: ", node_idx.value)
  console.log("node_idx.value[0]: ", node_idx.value[0])
  console.log("now_rank_pic.value: ", now_rank_pic.value)
  console.log("rank_pic_pool.value: ", rank_pic_pool.value)

  console.log("now_rank_pic_global.value: ", now_rank_pic_global.value)
  console.log("rank_pic_pool_global.value: ", rank_pic_pool_global.value)
  console.log("user_rank_global.value: ", user_rank_global.value)
  console.log("current_tree.value: ", current_tree.value)
  leaf_tree.value = false
  link_factor = 20;
  MyMounted()



  await request.post('/algorithm/reportGpu',{
    algorithmName:chosenAlgorithm.value,
    datasetId: 666,
    datasetName: "ImageNet",
    modelName: chosenModel.value,
    userName: chosenImg.value,
    // userName: store.state.username,
  })
      .then((response)=>{
        gpu.value = response.data.data.result[0];
        memory.value = response.data.data.result[1];
      })
      .catch((error)=>{
        console.error(error)
      })
  resultShow.value = true

  resultLoading.value = false
      // /nfs/lhl/OIPDL_codes/CUB_CARS/tests/test_cub1_full/pruned_and_projected/treevis.png
  // showList.value = fileList.value
  //
  // console.log("showList.value", showList.value);
  // listPreview.value = (showList.value.map((e) => {
  //   return "http://" + e;
  // }));
  // console.log("listPreview.value", listPreview.value)

  // if(chosenModel.value.startsWith("cub")){
  //
  // }
}

function store_model(){
  console.log("start storing model")


  let keys = Object.keys(user_rank_global.value);
  keys = keys.map((key) => {
    return parseInt(key, 10); // 使用 parseInt() 方法将字符串转换为整数
  });
  let values = Object.values(user_rank_global.value);
  console.log("keys:", keys)
  console.log("values:", values)

  ElMessage({
    message: '正在创建并保存你的树，这会需要二十分钟左右的时间. \n 结束后你可以在模型选择区里看见你的树:)',
    type: 'success',
    duration: 6000
  })

  dialogVisible_adjust_result.value = false

  //先保存模型之后恢复下面的
  let modelname = user_model.value;
  let username = store.state.username

  request.post('/algorithm/callAlgorithm',{
    algorithmName:'CUB-200-2011-store-model',
    datasetId: 666,
    datasetName: "[" + String(values) + "]" + "[" + String(keys) + "]",
    modelName: chosenModel.value,
    userName: user_model.value,
  })
      .then((response)=>{
        console.log("response", response)
        console.log("东西准备好了，准备保存到数据库......")
        request.post('/model/addOipdlModel',{
          algorithm:'neural_tree_cub',
          datasetId: 1008601,
          // datasetName: "[" + String(values) + "]" + "[" + String(keys) + "]",
          modelName: modelname,
          modelPath: "/nfs/lhl/OIPDL_codes/CUB_CARS/tests/test_"+user_model.value+"_pooled",
          username: username
        })
            .then((response)=>{
              console.log("response", response)
            })
            .catch((error)=>{
              console.error(error)
            })
        get_user_model()
      })
      .catch((error)=>{
        console.error(error)
      })
  console.log("刷新用户模型列表......")
  // await
}

async function adjust() {
  console.log("start adjust prediction")

  // resultLoading.value = true
  resultLoading2.value = true
  console.log("user_rank.value:", user_rank.value)
  console.log("node_idx.value:", node_idx.value)
  console.log("user_rank_global.value:", user_rank_global.value)

  ElMessage({
    message: '正在调整此样本的预测，这会需要15秒左右的时间:)',
    type: 'success',
    duration: 6000
  })

  await request.post('/algorithm/callAlgorithm',{
    algorithmName:'CUB-200-2011-adjust',
    datasetId: 666,
    datasetName: "[" + String(user_rank.value) + "]" + "[" + String(node_idx.value) + "]",
    modelName: chosenModel.value,
    userName: chosenImg.value,
  })
      .then((response)=>{
        console.log("response", response)
        console.log("response.data.data.result", response.data.data.result)

        new_showList3.value[0] = response.data.data.result[7];
        new_showpdf.value = response.data.data.result[8];
        new_Predicted.value = response.data.data.result[10];
        new_Probability.value = response.data.data.result[11];
        new_node_idx.value = JSON.parse(response.data.data.result[12]);


        new_now_rank_pic.value = JSON.parse(response.data.data.result[13].replace(/'/g, "\""));
        new_user_rank.value = JSON.parse(response.data.data.result[14].replace(/'/g, "\""));
      })
      .catch((error)=>{
        console.error(error)
      })
  resultShow2.value = true
  resultLoading2.value = false
}

// function tool(){
//   // resultLoading3.value = true
//   acc_origin.value = (74.23345321312).toFixed(3);   //74.234234252
//   acc_current.value = (74.2334534123).toFixed(3);
//   dialogVisible_adjust_result.value = true
// }

function adjust_tree() {
  console.log("start adjust tree")


  let keys = Object.keys(user_rank_global.value);
  keys = keys.map((key) => {
    return parseInt(key, 10); // 使用 parseInt() 方法将字符串转换为整数
  });
  let values = Object.values(user_rank_global.value);
  console.log("keys:", keys)
  console.log("values:", values)

  resultLoading3.value = true
  ElMessage({
    message: '正在测试你制造的树，这会需要两分钟左右的时间:)',
    type: 'success',
    duration: 6000
  })
  request.post('/algorithm/callAlgorithm',{
    algorithmName:'CUB-200-2011-adjust-tree',
    datasetId: 666,
    datasetName: "[" + String(values) + "]" + "[" + String(keys) + "]",
    modelName: chosenModel.value,
    userName: chosenImg.value,
  })
      .then((response)=>{
        console.log("response", response)
        console.log("response.data.data.result", response.data.data.result)
        percentage.value = (100).toString()
        acc_origin.value = (response.data.data.result[1]*100).toFixed(3);   //74.234234252
        acc_current.value = (response.data.data.result[4]*100).toFixed(3);
        resultShow_tree_result.value = true
        resultLoading4.value = false
        // acc_origin.value -= acc_origin.value%0.001
      })
      .catch((error)=>{
        console.error(error)
      })

  let processTimeout = 0;
  const intervalId = setInterval(() => {
    request.post('/algorithm/getProcess', {
      historyName: "cub"
    })
        .then((response)=>{
          let process, total;
          process = parseInt(response.data.data.process);
          total = parseInt(response.data.data.total);
          if(process>0){
            dialogVisible_adjust_result.value = true
            resultLoading3.value = false
            resultLoading4.value = true
          }
            // detectSettingLoading.value=false;
          percentage.value = (1.0 * process / total * 100).toFixed(1).toString()
          console.log("process:", process)
          console.log("total:", total)
          console.log("percentage.value:", percentage.value)
          if (process == total)
            clearInterval(intervalId)
        })
        .catch((error)=>{
          processTimeout += 1;
          if(processTimeout > 10){
            ElMessage.error('服务器出错，请稍后再试');
            clearInterval(intervalId)
          }
          console.error(error)
        })
  }, 2000)


  // resultLoading3.value = false
}


const MyMounted = () => {
  var json = leaf_tree.value?current_tree_with_leaf.value:current_tree.value;
  console.log("json:", json)
  // var json =
  //     {
  //       "name": "可解释性",
  //       "children": [{
  //         "name": "事后解释性分析",
  //         "children": [{
  //           "name": "局部解释",
  //           "size": 1616,
  //           "children": [{
  //             "name": "归因方法",
  //             "size": 1616,
  //             "children": [{
  //               "name": "基于梯度",
  //               "size": 1616,
  //               "children": [{
  //                 "name": "LayerGradCAM",
  //                 "size": 1616},
  //                 {
  //                   "name": "Saliency",
  //                   "size": 1616
  //                 },
  //                 {
  //                   "name": "Integrated Gradient",
  //                   "size": 1616
  //                 },
  //                 {
  //                   "name": "GradientShap",
  //                   "size": 1616
  //                 },
  //                 {
  //                   "name": "DeepLift",
  //                   "size": 1616
  //                 },
  //                 {
  //                   "name": "Occasion",
  //                   "size": 1616
  //                 }],
  //             },{
  //               "name": "基于消融扰动",
  //               "size": 1027,
  //               "children": [{
  //                 "name": "Feature Ablation",
  //                 "size": 9354
  //               }]
  //             }]
  //           }]
  //         }, {
  //           "name": "全局解释",
  //           "size": 1027,
  //           "children": [{
  //             "name": "代理模型",
  //             "size": 9354,
  //             "children": [{
  //               "name": "LIME",
  //               "size": 9354
  //             }]
  //           },{
  //             "name": "概念响应",
  //             "size": 9354,
  //             "children": [{
  //               "name": "TCAV",
  //               "size": 9354
  //             }]
  //           }]
  //         }]
  //       }, {
  //         "name": "可解释建模",
  //         "children": [{
  //           "name": "局部解释",
  //           "children": [{
  //             "name": "注意力机制",
  //             "size": 335,
  //             "children": [{
  //               "name": "Constituent Attention",
  //               "size": 2815
  //             }]
  //           }]
  //         },{
  //           "name": "全局解释",
  //           "size": 1027,
  //           "children": [{
  //             "name": "概念建模与推理",
  //             "size": 9354,
  //             "children": [{
  //               "name": "概念原型",
  //               "size": 9354,
  //               "children": [{
  //                 "name": "ProtoPNet",
  //                 "size": 9354,
  //               },{
  //                 "name": "ProtoPFormer",
  //                 "size": 9354,
  //               },{
  //                 "name": "ProtoTree",
  //                 "size": 9354
  //               },{
  //                 "name": "Dr. Huang",
  //                 "size": 9354,
  //               }]
  //             },{
  //               "name": "概念模式",
  //               "size": 1233,
  //               "children": [{
  //                 "name": "SchemaNet",
  //                 "size": 3165
  //               }]
  //             }]
  //           },{
  //             "name": "神经树",
  //             "size": 9354,
  //             "children": [{
  //               "name": "ProtoTree",
  //               "size": 9354
  //             }]
  //           }]
  //         }]
  //       }]
  //     };

  var treeData = json;
  var totalNodes = 0;
  var maxLabelLength = 0;
// variables for drag/drop
  var selectedNode = null;
  var draggingNode = null;
// panning variables
  var panSpeed = 200;
  var panBoundary = 20; // Within 20px from edges will pan when dragging.
// Misc. variables
  var i = 0;
  var duration = 750;
  var root;

// size of the diagram
  var viewerWidth = $(document).height();
  var viewerHeight = $(document).width();

  var tree = d3.layout.tree()
      .size([viewerHeight, viewerWidth]);

// define a d3 diagonal projection for use by the node paths later on.
  var diagonal = d3.svg.diagonal()
      .projection(function(d) {
        return [d.y, d.x];
      });

// A recursive helper function for performing some setup by walking through all nodes

  function visit(parent, visitFn, childrenFn) {
    if (!parent) return;

    visitFn(parent);

    var children = childrenFn(parent);
    if (children) {
      var count = children.length;
      for (var i = 0; i < count; i++) {
        visit(children[i], visitFn, childrenFn);
      }
    }
  }

// Call visit function to establish maxLabelLength
  visit(treeData, function(d) {
    totalNodes++;
    maxLabelLength = Math.max(d.name.length, maxLabelLength);

  }, function(d) {
    return d.children && d.children.length > 0 ? d.children : null;
  });


// sort the tree according to the node names

  function sortTree() {
    console.log("执行了此函数")
    console.log(json)
    tree.sort(function(a, b) {
      return b.name.toLowerCase() < a.name.toLowerCase() ? 1 : -1;
    });
  }
// Sort the tree initially incase the JSON isn't in a sorted order.
  sortTree();

// TODO: Pan function, can be better implemented.

  function pan(domNode, direction) {
    var speed = panSpeed;
    if (panTimer) {
      clearTimeout(panTimer);
      var translateCoords = d3.transform(svgGroup.attr("transform"));
      if (direction == 'left' || direction == 'right') {
        var translateX = direction == 'left' ? translateCoords.translate[0] + speed : translateCoords.translate[0] - speed;
        var translateY = translateCoords.translate[1];
      } else if (direction == 'up' || direction == 'down') {
        translateX = translateCoords.translate[0];
        translateY = direction == 'up' ? translateCoords.translate[1] + speed : translateCoords.translate[1] - speed;
      }
      var scaleX = translateCoords.scale[0];
      var scaleY = translateCoords.scale[1];
      var scale = zoomListener.scale();
      svgGroup.transition().attr("transform", "translate(" + translateX + "," + translateY + ")scale(" + scale + ")");
      d3.select(domNode).select('g.node').attr("transform", "translate(" + translateX + "," + translateY + ")");
      zoomListener.scale(zoomListener.scale());
      zoomListener.translate([translateX, translateY]);
      var panTimer = setTimeout(function() {
        pan(domNode, speed, direction);
      }, 50);
    }
  }

// Define the zoom function for the zoomable tree

  function zoom() {
    // if (d3.event.sourceEvent.ctrlKey) {
    //   svgGroup.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    // }

    svgGroup.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
  }


// define the zoomListener which calls the zoom function on the "zoom" event constrained within the scaleExtents
  const zoomListener = d3.behavior
      .zoom()
      .scaleExtent([0.1, 3])
      // .filter(function () {
      //   return d3.event.ctrlKey;
      // })
      .on("zoom", zoom);

  function initiateDrag(d, domNode) {
    draggingNode = d;
    d3.select(domNode).select('.ghostCircle').attr('pointer-events', 'none');
    d3.selectAll('.ghostCircle').attr('class', 'ghostCircle show');
    d3.select(domNode).attr('class', 'node activeDrag');

    svgGroup.selectAll("g.node").sort(function(a, b) { // select the parent and sort the path's
      if (a.id != draggingNode.id) return 1; // a is not the hovered element, send "a" to the back
      else return -1; // a is the hovered element, bring "a" to the front
    });
    // if nodes has children, remove the links and nodes
    if (nodes.length > 1) {
      // remove link paths
      var links = tree.links(nodes);
      var nodePaths = svgGroup.selectAll("path.link")
          .data(links, function(d) {
            return d.target.id;
          }).remove();
      // remove child nodes
      var nodesExit = svgGroup.selectAll("g.node")
          .data(nodes, function(d) {
            return d.id;
          }).filter(function(d, i) {
            if (d.id == draggingNode.id) {
              return false;
            }
            return true;
          }).remove();
    }

    // remove parent link
    var parentLink = tree.links(tree.nodes(draggingNode.parent));
    svgGroup.selectAll('path.link').filter(function(d, i) {
      if(d.target.id == draggingNode.id) {
        return true;
      }
      return false;
    }).remove();

    dragStarted = null;
  }


  // 选择cub-tree-container元素
  const container = d3.select('#cub-tree-container');

// 检查是否存在子元素，如果有则删除
  if (!container.empty()) {
    container.select('svg').remove();
  }

// define the baseSvg, attaching a class for styling and the zoomListener

  var baseSvg = d3.select("#cub-tree-container").append("svg")
      .attr("width", viewerWidth)
      .attr("height", viewerHeight)
      .attr("class", "overlay")
      .call(zoomListener);
  console.log("baseSvg: ", baseSvg)


// Define the drag listeners for drag/drop behaviour of nodes.
  var dragListener = d3.behavior.drag()
      .on("dragstart", function(d) {
        if (d == root) {
          return;
        }
        dragStarted = true;
        nodes = tree.nodes(d);
        d3.event.sourceEvent.stopPropagation();
        // it's important that we suppress the mouseover event on the node being dragged. Otherwise it will absorb the mouseover event and the underlying node will not detect it d3.select(this).attr('pointer-events', 'none');
      })
      .on("drag", function(d) {
        if (d == root) {
          return;
        }
        if (dragStarted) {
          domNode = this;
          initiateDrag(d, domNode);
        }

        // get coords of mouseEvent relative to svg container to allow for panning
        var relCoords = d3.mouse($('svg').get(0));
        if (relCoords[0] < panBoundary) {
          var panTimer = true;
          pan(this, 'left');
        } else if (relCoords[0] > ($('svg').width() - panBoundary)) {

          panTimer = true;
          pan(this, 'right');
        } else if (relCoords[1] < panBoundary) {
          panTimer = true;
          pan(this, 'up');
        } else if (relCoords[1] > ($('svg').height() - panBoundary)) {
          panTimer = true;
          pan(this, 'down');
        } else {
          try {
            clearTimeout(panTimer);
          } catch (e) {

          }
        }

        d.x0 += d3.event.dy;
        d.y0 += d3.event.dx;
        var node = d3.select(this);
        node.attr("transform", "translate(" + d.y0 + "," + d.x0 + ")");
        updateTempConnector();
      }).on("dragend", function(d) {
        if (d == root) {
          return;
        }
        domNode = this;
        if (selectedNode) {
          // now remove the element from the parent, and insert it into the image elements children
          var index = draggingNode.parent.children.indexOf(draggingNode);
          if (index > -1) {
            draggingNode.parent.children.splice(index, 1);
          }
          if (typeof selectedNode.children !== 'undefined' || typeof selectedNode._children !== 'undefined') {
            if (typeof selectedNode.children !== 'undefined') {
              selectedNode.children.push(draggingNode);
            } else {
              selectedNode._children.push(draggingNode);
            }
          } else {
            selectedNode.children = [];
            selectedNode.children.push(draggingNode);
          }
          // Make sure that the node being added to is expanded so user can see added node is correctly moved
          expand(selectedNode);
          sortTree();
          endDrag();
        } else {
          endDrag();
        }
      });

  function endDrag() {
    selectedNode = null;
    d3.selectAll('.ghostCircle').attr('class', 'ghostCircle');
    d3.select(domNode).attr('class', 'node');
    // now restore the mouseover event or we won't be able to drag a 2nd time
    d3.select(domNode).select('.ghostCircle').attr('pointer-events', '');
    updateTempConnector();
    if (draggingNode !== null) {
      update(root);
      // centerNode(draggingNode);
      draggingNode = null;
    }
  }

// Helper functions for collapsing and expanding nodes.

  function collapse(d) {
    if (d.children) {
      d._children = d.children;
      d._children.forEach(collapse);
      d.children = null;
    }
  }

  function expand(d) {
    if (d._children) {
      d.children = d._children;
      d.children.forEach(expand);
      d._children = null;
    }
  }

  var overCircle = function(d) {
    selectedNode = d;
    updateTempConnector();
  };
  var outCircle = function(d) {
    selectedNode = null;
    updateTempConnector();
  };

// Function to update the temporary connector indicating dragging affiliation
  var updateTempConnector = function() {
    var data = [];
    if (draggingNode !== null && selectedNode !== null) {
      // have to flip the source coordinates since we did this for the existing connectors on the original tree
      data = [{
        source: {
          x: selectedNode.y0,
          y: selectedNode.x0
        },
        target: {
          x: draggingNode.y0,
          y: draggingNode.x0
        }
      }];
    }
    var link = svgGroup.selectAll(".templink").data(data);

    link.enter().append("path")
        .attr("class", "templink")
        .attr("d", d3.svg.diagonal())
        .attr('pointer-events', 'none');

    link.attr("d", d3.svg.diagonal());

    link.exit().remove();
  };

// Function to center node when clicked/dropped so node doesn't get lost when collapsing/moving with large amount of children.

  function centerNode(source) {
    var scale = zoomListener.scale();
    var x = -source.y0;
    var y = -source.x0;
    x = x * scale + viewerHeight / 20 + 50;
    y = y * scale + viewerHeight / 2;
    d3.select('g').transition()
        .duration(duration)
        .attr("transform", "translate(" + x + "," + y + ")scale(" + scale + ")");
    zoomListener.scale(scale);
    zoomListener.translate([x, y]);
  }

// Toggle children function

  function toggleChildren(d) {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else if (d._children) {
      d.children = d._children;
      d._children = null;
    }
    return d;
  }
/////////////////////////////////////////////////
///////////////// IMAGE DEFS ////////////////////
/////////////////////////////////////////////////

  // A recursive helper function for performing some setup by walking through all nodes

  function def_imgs(parent, visitFn, childrenFn) {
    if (!parent) return;
    visitFn(parent);
    var children = childrenFn(parent);
    if (children) {
      var count = children.length;
      for (var i = 0; i < count; i++) {
        def_imgs(children[i], visitFn, childrenFn);
      }
    }
  }

  def_imgs(treeData, function(d) {
    d3.select('svg').append('defs').append("pattern")
        .attr("id", d.src)
        .attr("patternUnits", "objectBoundingBox")
        .attr("patternContentUnits", "objectBoundingBox") // 添加这一行
        .attr("width", 1)
        .attr("height", 1)
        .attr("preserveAspectRatio", "none")
        .append("image")
        .attr("xlink:href", "http://"+d.src)
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 1)
        .attr("height", 1);
  }, function(d) {
    return d.children && d.children.length > 0 ? d.children : null;
  });

  // d3.select('svg').append('defs').append("pattern")
  //     .attr("id", "img1")
  //     .attr("patternUnits", "objectBoundingBox")
  //     .attr("width", "25")
  //     .attr("height", "25")
  //     .append("image")
  //     .attr("xlink:href", "http://10.214.242.155:7996/img/background/tool2.jpg")
  //     .attr("x", -10)
  //     .attr("y", -14)
  //     .attr("width", 60)
  //     .attr("height", 62);

  console.log("d3.select('svg'):",d3.select('svg'))

  function click(d) {
    if (d3.event.defaultPrevented) return; // click suppressed
    d = toggleChildren(d);
    update(d);
    // centerNode(d);
    // console.log("测试", d);
    // d3.event.stopPropagation();
  }

  function contextmenu(d) {
    event.preventDefault();
    console.log("d.name", d.name);
    console.log("d.src", d.src);
    now_select_tree.value = d.name;
    dialogVisible_adjust_tree.value = true;
  }

  function update(source) {
    // Compute the image height, function counts total children of root node and sets tree height accordingly.
    // This prevents the layout looking squashed when image nodes are made visible or looking sparse when nodes are removed
    // This makes the layout more consistent.
    var levelWidth = [1];
    var childCount = function(level, n) {

      if (n.children && n.children.length > 0) {
        if (levelWidth.length <= level + 1) levelWidth.push(0);

        levelWidth[level + 1] += n.children.length;
        n.children.forEach(function(d) {
          childCount(level + 1, d);
        });
      }
    };
    childCount(0, root);
    var newHeight = d3.max(levelWidth) * 105; // 25 pixels per line  /*<><><><><><><><><><><><><><><><><><><><><><><>THIS IS DETERMINING SPACING */
    tree = tree.size([newHeight, viewerWidth]);

    // Compute the image tree layout.
    nodes = tree.nodes(root).reverse();
    var links = tree.links(nodes);

    // Set widths between levels based on maxLabelLength.
    nodes.forEach(function(d) {
      d.y = (d.depth * (maxLabelLength * link_factor)); //maxLabelLength * 10px
      // alternatively to keep a fixed scale one can set a fixed depth per level
      // Normalize for fixed-depth by commenting out below line
      // d.y = (d.depth * 500); //500px per level.
    });

    // Update the nodes…
    var node = svgGroup.selectAll("g.node")
        .data(nodes, function(d) {
          return d.id || (d.id = ++i);
        });

    // Enter any image nodes at the parent's previous position.
    var nodeEnter = node.enter().append("g")
        .call(dragListener)
        .attr("class", "node")
        .attr("transform", function(d) {
          return "translate(" + source.y0 + "," + source.x0 + ")";
        })
        .on('click', click)
        .on('contextmenu', contextmenu);
    // .on('dblclick', dblclick);

    nodeEnter.append("circle")
        .attr('class', 'cub_nodeCircle')
        .attr("r", 0)
        .style("stroke", "black")
        .style("stroke-width", "1.5px")
        .style("fill", function(d) {
          return d._children ? "lightsteelblue" : "#fff";
        });



    // phantom node to give us mouseover in a radius around it
    nodeEnter.append("circle")
        .attr('class', 'ghostCircle')
        .attr("r", 30)
        .attr("opacity", 0.2) // change this to zero to hide the target area
        .style("fill", "red")
        .attr('pointer-events', 'mouseover')
        .on("mouseover", function(node) {
          overCircle(node);
        })
        .on("mouseout", function(node) {
          outCircle(node);
        });

    // Update the text to reflect whether node has children or not.
    // 我们不需要文字
    // node.select('text')
    //     .attr("x", function(d) {
    //       return d.children || d._children ? d.name.length*10 : 30;
    //       // return d.children || d._children ? -30 : 30;
    //     })
    //     .attr("y", function(d) {
    //       return d.children || d._children ? -35 : 0;
    //     })
    //     .attr("text-anchor", function(d) {
    //       return d.children || d._children ? "end" : "start";
    //     })
    //     .text(function(d) {
    //       return d.name;
    //     });

    // Change the circle fill depending on whether it has children and is collapsed
    node.select("circle.cub_nodeCircle")
        .attr("r", 20.5)
        .style("fill", function(d) {
          return d._children ? "lightsteelblue" : "url(#"+d.src+")";
        });

    // Transition nodes to their image position.
    var nodeUpdate = node.transition()
        .duration(duration)
        .attr("transform", function(d) {
          return "translate(" + d.y + "," + d.x + ")";
        });

    // Fade the text in
    nodeUpdate.select("text")
        .style("fill-opacity", 1);

    // Transition exiting nodes to the parent's image position.
    var nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function(d) {
          return "translate(" + source.y + "," + source.x + ")";
        })
        .remove();

    nodeExit.select("circle")
        .attr("r", 0);

    nodeExit.select("text")
        .style("fill-opacity", 0);

    // Update the links…
    var link = svgGroup.selectAll("path.link")
        .data(links, function(d) {
          return d.target.id;
        });

    // Enter any image links at the parent's previous position.
    link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("d", function(d) {
          var o = {
            x: source.x0,
            y: source.y0
          };
          return diagonal({
            source: o,
            target: o
          });
        });

    // Transition links to their image position.
    link.transition()
        .duration(duration)
        .attr("d", diagonal);

    // Transition exiting nodes to the parent's image position.
    link.exit().transition()
        .duration(duration)
        .attr("d", function(d) {
          var o = {
            x: source.x,
            y: source.y
          };
          return diagonal({
            source: o,
            target: o
          });
        })
        .remove();

    // Stash the old positions for transition.
    nodes.forEach(function(d) {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }

// Append a group which holds all nodes and which the zoom Listener can act upon.
  var svgGroup = baseSvg.append("g");

// Define the root
  root = treeData;
  root.x0 = viewerHeight / 2;
  root.y0 = 0;

// Layout the tree initially and center on the root node.
  update(root);
  centerNode(root);

  console.log("querySelector id: ", document.querySelector('#cub-tree-container'));
  console.log("querySelector id2: ", document.querySelector('cub-tree-container'));
};
</script>

<style>
.inference{
  border-color: #000000;
  background-color: #022BA2;
}
.common-layout{
  height: 100%;
}
.image_pool{
  position: relative;
  width: 700px;
  height: 500px;
}
.el-container {
  position: relative;
  height:100%;
}
.detect{
  text-align: center;
  margin: 20px;
}
.data{
  text-align: center;
  margin: 20px;
}
.m-1{
  text-align: center;
  margin-right: 350px;
  background-color: #007B00;
  border-color: #000000;
  display: inline-block;
}
.m-2{
  text-align: center;
  margin: 0 20px;
  border-color: #000000;
  display: inline-block;
}
.m-3{
  text-align: center;
  margin-left: 430px;
  background-color: #9B591E;
  border-color: #000000;
  display: inline-block;
}

.m-label{
  text-align: center;
  background-color: #545c64;
  color: white;
  align-items: center;
  border: 0;
}

.demo-image .block {
  padding: 30px 0;
  text-align: center;
  border: solid 1px var(--el-border-color);
  /*display: inline-block;*/
  width: 35%;
  margin: 0 20px;
  box-sizing: border-box;
  /*vertical-align: center;*/
  /*align-items: center*/
  float: left;
}

.block3 {
  padding: 0;
  text-align: center;
  border: 2px solid red;
  /*display: inline-block;*/
  /*width: 19%;*/
  /*float: left;*/
  cursor:pointer;
  /*box-sizing: border-box;*/
  /*vertical-align: top;*/
}
#cub-tree-container {
  transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
  -moz-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  -o-transform: rotate(90deg);
  overflow-x: visible;
  overflow-y: visible;
  /*width: 50%;*/
  /*height: 10%;*/
}
.holly{
  /*background-image: url('http://10.214.242.155:7996/img/background/algorithm2.jpg');*/
  /*background-repeat: no-repeat;*/
  /*background-size: contain;*/
  background-color: white;
  overflow: visible;
  /*position: relative;*/
  /*background-position: center;*/
}
.cub_nodeCircle{
  transform: rotate(-90deg);
  -webkit-transform: rotate(-90deg);
  -moz-transform: rotate(-90deg);
  -ms-transform: rotate(-90deg);
  -o-transform: rotate(-90deg);
}
</style>
