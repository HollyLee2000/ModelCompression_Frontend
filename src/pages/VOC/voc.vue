<template>

    <el-container>
      <el-aside style="background-color: white; width: 50%; padding: 20px; ">
        <div style="margin: 20px 0 20px 0; text-align: center;">
          <label style="font-size:35px; border: 0; color: black; ">1. Choose an Image</label>
        </div>
<!--        <div style="margin: 20px 0 40px 0;">-->
<!--          <el-image src="http://10.214.242.155:7668/img/background/cifar_1.gif" style="width: 50px; height: 50px; float: left"/>-->
<!--          <label style="font-size:40px; color: white; border: 0; margin: 0 0 0 80px; font-family: 'FZShuTi'">请选择你要解释的图像</label>-->
<!--&lt;!&ndash;          <el-button plain size="large" style="text-align: center; background-color: #545c64;&ndash;&gt;-->
<!--&lt;!&ndash;          color: white; align-items: center; border: 0;">请选择你要解释的图像</el-button>&ndash;&gt;-->
<!--          <el-image src="http://10.214.242.155:7668/img/background/cifar_3.gif" style="width: 50px; height: 50px; float: right"/>-->
<!--        </div>-->
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
<!--                  <div :id=item.id :class="istrue?'block3':'block2'" @click="istrue=!istrue">-->
<!--                  <div :id=index class="block2" @click="changeColor($event)">-->
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
        <div class="holly-data">
          <el-button size="large" type="primary"  @click="refreshCifar" plain>刷新图像池</el-button>
          <el-button size="large" type="warning"  plain>数据集介绍</el-button>
        </div>

      </el-aside>
      <el-main style="background-color: white" v-loading="resultLoading">

        <div style="margin: 20px 0 20px 0; text-align: center; ">
          <label style="font-size:35px; color: black; border: 0;">2. Choose Model and an Algorithm</label>
        </div>

        <div class="holly-detect">
          <el-select v-model="chosenModel" placeholder="请选择神经网络模型" size="large">
            <el-option key="6" label="ResNet18" value="ResNet18" />
          </el-select>
          <el-select  v-model="chosenAlgorithm" placeholder="请选择推理算法" size="large">
            <el-option key="6" label="Feature Ablation" value="Feature_Ablation" />
            <el-option key="6" label="LIME(Linear Regression with Lasso Regularization)" value="LIME" />
          </el-select>
          <el-button size="large" type="success" @click="startRecognize" plain>开始推理</el-button>
        </div>

        <div :style="{visibility:resultShow?'visible':'hidden'}" >

        <div style="margin: 20px 0 20px 0; text-align: center;">
          <label style="font-size:35px; border: 0; color: black; ">3. Segementation Label</label>
        </div>

        <div style="display: flex; justify-content: center;">
          <div v-for="(item,index) in segmentationList" style="margin: 30px 0;">
            <el-image :src="`http://${item}`"
                      :fit="'fill'"
                      :preview-src-list="segmentationPreview"
                      :initial-index="index"
            >
            </el-image>
          </div>
        </div>

<!--        <el-row style="margin: 30px 0 0 60px;">-->
<!--          <el-col v-for="(item,index) in segmentationList" :span="12" :key="index">-->
<!--            &lt;!&ndash;                  <div :id=item.id :class="istrue?'block3':'block2'" @click="istrue=!istrue">&ndash;&gt;-->
<!--            <el-image :src="`http://${item}`"-->
<!--                      :preview-src-list="segmentationPreview"-->
<!--                      :initial-index="index"-->
<!--                      :fit="'scale-down'"-->
<!--            >-->
<!--            </el-image>-->
<!--          </el-col>-->
<!--        </el-row>-->

        <div style="margin: 20px 0 20px 0; text-align: center;">
          <label style="font-size:35px; border: 0; color: black; ">Inference Result (Rank 1)</label>
        </div>

        <div style="background-color: #E7E7E7; width:94%; padding: 20px; margin: 0 20px 0 0; border:2px solid #a1a1a1; border-radius:25px;">
          <label style="background-color: #E7E7E7; font-size:30px; color: black; border: 0; font-family: 'Microsoft Yahei'">GroundTruth: </label>
          <label style="background-color: #E7E7E7; font-size:30px; color: #C40000; border: 0; font-family: 'Microsoft Yahei'">{{GroundTruth}}</label>
          <br>
          <label style="background-color: #E7E7E7; font-size:30px; color: black; border: 0; font-family: 'Microsoft Yahei'">Predicted within ImageNet: </label>
          <label style="background-color: #E7E7E7; font-size:30px; color: #C40000; border: 0; font-family: 'Microsoft Yahei'">{{Predicted}}</label>
          <br>
          <label style="background-color: #E7E7E7; font-size:30px; color: black; border: 0; font-family: 'Microsoft Yahei'">Probability: </label>
          <label style="background-color: #E7E7E7; font-size:30px; color: #C40000; border: 0; font-family: 'Microsoft Yahei'">{{Probability}}</label>
          <br>
        </div>

        <div style="margin: 20px 0 20px 0; text-align: center;">
          <label style="font-size:35px; border: 0; color: black; ">Impact of Concepts on Rank 1</label>
        </div>

        <div style="display: flex; justify-content: center;">
          <div v-for="(item,index) in showList" style="margin: 30px 0;">
            <el-image :src="`http://${item}`"
                      :fit="'fill'"
                      :preview-src-list="listPreview"
                      :initial-index="index"
            >
            </el-image>
          </div>
        </div>






        <div style="margin: 20px 0 20px 0; text-align: center;">
          <label style="font-size:35px; border: 0; color: black; ">Inference Result (Rank 2)</label>
        </div>

        <div style="background-color: #E7E7E7; width:94%; padding: 20px; margin: 0 20px 0 0; border:2px solid #a1a1a1; border-radius:25px;">
          <label style="background-color: #E7E7E7; font-size:30px; color: black; border: 0; font-family: 'Microsoft Yahei'">GroundTruth: </label>
          <label style="background-color: #E7E7E7; font-size:30px; color: #C40000; border: 0; font-family: 'Microsoft Yahei'">{{GroundTruth}}</label>
          <br>
          <label style="background-color: #E7E7E7; font-size:30px; color: black; border: 0; font-family: 'Microsoft Yahei'">Predicted within ImageNet: </label>
          <label style="background-color: #E7E7E7; font-size:30px; color: #C40000; border: 0; font-family: 'Microsoft Yahei'">{{Predicted2}}</label>
          <br>
          <label style="background-color: #E7E7E7; font-size:30px; color: black; border: 0; font-family: 'Microsoft Yahei'">Probability: </label>
          <label style="background-color: #E7E7E7; font-size:30px; color: #C40000; border: 0; font-family: 'Microsoft Yahei'">{{Probability2}}</label>
          <br>
        </div>

        <div style="margin: 20px 0 20px 0; text-align: center;">
          <label style="font-size:35px; border: 0; color: black; ">Impact of Concepts on Rank 2</label>
        </div>

        <div style="display: flex; justify-content: center;">
          <div v-for="(item,index) in showList2" style="margin: 30px 0;">
            <el-image :src="`http://${item}`"
                      :fit="'fill'"
                      :preview-src-list="listPreview22"
                      :initial-index="index"
            >
            </el-image>
          </div>
        </div>


<!--        <div style="margin: 20px 0 20px 0;">-->
<!--          <label style="font-size:40px; color: white; border: 0; margin: 0 0 0 365px; font-family: 'FZShuTi'">推理结果 (Rank 2)</label>-->
<!--        </div>-->
<!--        <div style="background-color: #6C6CFF; width:96%; padding: 20px; margin: 0 20px 0 0; border:2px solid #a1a1a1; border-radius:25px;">-->
<!--          <label style="background-color: #6C6CFF; font-size:30px; color: white; border: 0; font-family: 'Microsoft Yahei'">GroundTruth:</label>-->
<!--          <label style="background-color: #6C6CFF; font-size:30px; color: #C40000; border: 0; font-family: 'Microsoft Yahei'">{{GroundTruth}}</label>-->
<!--          <br>-->
<!--          <label style="background-color: #6C6CFF; font-size:30px; color: white; border: 0; font-family: 'Microsoft Yahei'">Predicted within ImageNet:</label>-->
<!--          <label style="background-color: #6C6CFF; font-size:30px; color: #C40000; border: 0; font-family: 'Microsoft Yahei'">{{Predicted2}}</label>-->
<!--          <br>-->
<!--          <label style="background-color: #6C6CFF; font-size:30px; color: white; border: 0; font-family: 'Microsoft Yahei'">Probability:</label>-->
<!--          <label style="background-color: #6C6CFF; font-size:30px; color: #C40000; border: 0; font-family: 'Microsoft Yahei'">{{Probability2}}</label>-->
<!--          <br>-->
<!--        </div>-->
<!--        <div style="margin: 20px 0 20px 0;">-->
<!--          <label style="font-size:40px; color: white; border: 0; margin: 0 0 0 250px; font-family: 'FZShuTi'">语义概念对Rank 2分类结果的影响</label>-->
<!--        </div>-->
<!--        <el-row style="margin: 30px 0 0 60px;">-->
<!--          <el-col v-for="(item,index) in showList2" :span="12" :key="index">-->
<!--            &lt;!&ndash;                  <div :id=item.id :class="istrue?'block3':'block2'" @click="istrue=!istrue">&ndash;&gt;-->
<!--            <el-image :src="`http://${item}`"-->
<!--                      :preview-src-list="listPreview22"-->
<!--                      :initial-index="index"-->
<!--                      :fit="'scale-down'"-->
<!--            >-->
<!--            </el-image>-->
<!--          </el-col>-->
<!--        </el-row>-->


        <div style="margin: 20px 0 20px 0; text-align: center;">
          <label style="font-size:35px; border: 0; color: black; ">Inference Result (Rank 3)</label>
        </div>

        <div style="background-color: #E7E7E7; width:94%; padding: 20px; margin: 0 20px 0 0; border:2px solid #a1a1a1; border-radius:25px;">
          <label style="background-color: #E7E7E7; font-size:30px; color: black; border: 0; font-family: 'Microsoft Yahei'">GroundTruth: </label>
          <label style="background-color: #E7E7E7; font-size:30px; color: #C40000; border: 0; font-family: 'Microsoft Yahei'">{{GroundTruth}}</label>
          <br>
          <label style="background-color: #E7E7E7; font-size:30px; color: black; border: 0; font-family: 'Microsoft Yahei'">Predicted within ImageNet: </label>
          <label style="background-color: #E7E7E7; font-size:30px; color: #C40000; border: 0; font-family: 'Microsoft Yahei'">{{Predicted3}}</label>
          <br>
          <label style="background-color: #E7E7E7; font-size:30px; color: black; border: 0; font-family: 'Microsoft Yahei'">Probability: </label>
          <label style="background-color: #E7E7E7; font-size:30px; color: #C40000; border: 0; font-family: 'Microsoft Yahei'">{{Probability3}}</label>
          <br>
        </div>

        <div style="margin: 20px 0 20px 0; text-align: center;">
          <label style="font-size:35px; border: 0; color: black; ">Impact of Concepts on Rank 3</label>
        </div>

        <div style="display: flex; justify-content: center;">
          <div v-for="(item,index) in showList3" style="margin: 30px 0;">
            <el-image :src="`http://${item}`"
                      :fit="'fill'"
                      :preview-src-list="listPreview3"
                      :initial-index="index"
            >
            </el-image>
          </div>
        </div>




<!--        <div style="margin: 20px 0 20px 0;">-->
<!--          <label style="font-size:40px; color: white; border: 0; margin: 0 0 0 365px; font-family: 'FZShuTi'">推理结果 (Rank 3)</label>-->
<!--        </div>-->
<!--        <div style="background-color: #6C6CFF; width:96%; padding: 20px; margin: 0 20px 0 0; border:2px solid #a1a1a1; border-radius:25px;">-->
<!--          <label style="background-color: #6C6CFF; font-size:30px; color: white; border: 0; font-family: 'Microsoft Yahei'">GroundTruth:</label>-->
<!--          <label style="background-color: #6C6CFF; font-size:30px; color: #C40000; border: 0; font-family: 'Microsoft Yahei'">{{GroundTruth}}</label>-->
<!--          <br>-->
<!--          <label style="background-color: #6C6CFF; font-size:30px; color: white; border: 0; font-family: 'Microsoft Yahei'">Predicted within ImageNet:</label>-->
<!--          <label style="background-color: #6C6CFF; font-size:30px; color: #C40000; border: 0; font-family: 'Microsoft Yahei'">{{Predicted3}}</label>-->
<!--          <br>-->
<!--          <label style="background-color: #6C6CFF; font-size:30px; color: white; border: 0; font-family: 'Microsoft Yahei'">Probability:</label>-->
<!--          <label style="background-color: #6C6CFF; font-size:30px; color: #C40000; border: 0; font-family: 'Microsoft Yahei'">{{Probability3}}</label>-->
<!--          <br>-->
<!--        </div>-->
<!--        <div style="margin: 20px 0 20px 0;">-->
<!--          <label style="font-size:40px; color: white; border: 0; margin: 0 0 0 250px; font-family: 'FZShuTi'">语义概念对Rank 3分类结果的影响</label>-->
<!--        </div>-->
<!--        <el-row style="margin: 30px 0 0 60px;">-->
<!--          <el-col v-for="(item,index) in showList3" :span="12" :key="index">-->
<!--            &lt;!&ndash;                  <div :id=item.id :class="istrue?'block3':'block2'" @click="istrue=!istrue">&ndash;&gt;-->
<!--            <el-image :src="`http://${item}`"-->
<!--                      :preview-src-list="listPreview3"-->
<!--                      :initial-index="index"-->
<!--                      :fit="'scale-down'"-->
<!--            >-->
<!--            </el-image>-->
<!--          </el-col>-->
<!--        </el-row>-->

        <div style="margin: 20px 0 20px 0; text-align: center;">
          <label style="font-size:35px; border: 0; color: black; ">Inference Result (Rank 4)</label>
        </div>

        <div style="background-color: #E7E7E7; width:94%; padding: 20px; margin: 0 20px 0 0; border:2px solid #a1a1a1; border-radius:25px;">
          <label style="background-color: #E7E7E7; font-size:30px; color: black; border: 0; font-family: 'Microsoft Yahei'">GroundTruth: </label>
          <label style="background-color: #E7E7E7; font-size:30px; color: #C40000; border: 0; font-family: 'Microsoft Yahei'">{{GroundTruth}}</label>
          <br>
          <label style="background-color: #E7E7E7; font-size:30px; color: black; border: 0; font-family: 'Microsoft Yahei'">Predicted within ImageNet: </label>
          <label style="background-color: #E7E7E7; font-size:30px; color: #C40000; border: 0; font-family: 'Microsoft Yahei'">{{Predicted4}}</label>
          <br>
          <label style="background-color: #E7E7E7; font-size:30px; color: black; border: 0; font-family: 'Microsoft Yahei'">Probability: </label>
          <label style="background-color: #E7E7E7; font-size:30px; color: #C40000; border: 0; font-family: 'Microsoft Yahei'">{{Probability4}}</label>
          <br>
        </div>

        <div style="margin: 20px 0 20px 0; text-align: center;">
          <label style="font-size:35px; border: 0; color: black; ">Impact of Concepts on Rank 4</label>
        </div>

        <div style="display: flex; justify-content: center;">
          <div v-for="(item,index) in showList4" style="margin: 30px 0;">
            <el-image :src="`http://${item}`"
                      :fit="'fill'"
                      :preview-src-list="listPreview4"
                      :initial-index="index"
            >
            </el-image>
          </div>
        </div>


<!--        <div style="margin: 20px 0 20px 0;">-->
<!--          <label style="font-size:40px; color: white; border: 0; margin: 0 0 0 365px; font-family: 'FZShuTi'">推理结果 (Rank 4)</label>-->
<!--        </div>-->
<!--        <div style="background-color: #6C6CFF; width:96%; padding: 20px; margin: 0 20px 0 0; border:2px solid #a1a1a1; border-radius:25px;">-->
<!--          <label style="background-color: #6C6CFF; font-size:30px; color: white; border: 0; font-family: 'Microsoft Yahei'">GroundTruth:</label>-->
<!--          <label style="background-color: #6C6CFF; font-size:30px; color: #C40000; border: 0; font-family: 'Microsoft Yahei'">{{GroundTruth}}</label>-->
<!--          <br>-->
<!--          <label style="background-color: #6C6CFF; font-size:30px; color: white; border: 0; font-family: 'Microsoft Yahei'">Predicted within ImageNet:</label>-->
<!--          <label style="background-color: #6C6CFF; font-size:30px; color: #C40000; border: 0; font-family: 'Microsoft Yahei'">{{Predicted4}}</label>-->
<!--          <br>-->
<!--          <label style="background-color: #6C6CFF; font-size:30px; color: white; border: 0; font-family: 'Microsoft Yahei'">Probability:</label>-->
<!--          <label style="background-color: #6C6CFF; font-size:30px; color: #C40000; border: 0; font-family: 'Microsoft Yahei'">{{Probability4}}</label>-->
<!--          <br>-->
<!--        </div>-->
<!--        <div style="margin: 20px 0 20px 0;">-->
<!--          <label style="font-size:40px; color: white; border: 0; margin: 0 0 0 250px; font-family: 'FZShuTi'">语义概念对Rank 4分类结果的影响</label>-->
<!--        </div>-->
<!--        <el-row style="margin: 30px 0 0 60px;">-->
<!--          <el-col v-for="(item,index) in showList4" :span="12" :key="index">-->
<!--            &lt;!&ndash;                  <div :id=item.id :class="istrue?'block3':'block2'" @click="istrue=!istrue">&ndash;&gt;-->
<!--            <el-image :src="`http://${item}`"-->
<!--                      :preview-src-list="listPreview4"-->
<!--                      :initial-index="index"-->
<!--                      :fit="'scale-down'"-->
<!--            >-->
<!--            </el-image>-->
<!--          </el-col>-->
<!--        </el-row>-->

        <div style="margin: 20px 0 20px 0; text-align: center;">
          <label style="font-size:35px; border: 0; color: black; ">Inference Result (Rank 5)</label>
        </div>

        <div style="background-color: #E7E7E7; width:94%; padding: 20px; margin: 0 20px 0 0; border:2px solid #a1a1a1; border-radius:25px;">
          <label style="background-color: #E7E7E7; font-size:30px; color: black; border: 0; font-family: 'Microsoft Yahei'">GroundTruth: </label>
          <label style="background-color: #E7E7E7; font-size:30px; color: #C40000; border: 0; font-family: 'Microsoft Yahei'">{{GroundTruth}}</label>
          <br>
          <label style="background-color: #E7E7E7; font-size:30px; color: black; border: 0; font-family: 'Microsoft Yahei'">Predicted within ImageNet: </label>
          <label style="background-color: #E7E7E7; font-size:30px; color: #C40000; border: 0; font-family: 'Microsoft Yahei'">{{Predicted5}}</label>
          <br>
          <label style="background-color: #E7E7E7; font-size:30px; color: black; border: 0; font-family: 'Microsoft Yahei'">Probability: </label>
          <label style="background-color: #E7E7E7; font-size:30px; color: #C40000; border: 0; font-family: 'Microsoft Yahei'">{{Probability5}}</label>
          <br>
        </div>

        <div style="margin: 20px 0 20px 0; text-align: center;">
          <label style="font-size:35px; border: 0; color: black; ">Impact of Concepts on Rank 5</label>
        </div>

        <div style="display: flex; justify-content: center;">
          <div v-for="(item,index) in showList5" style="margin: 30px 0;">
            <el-image :src="`http://${item}`"
                      :fit="'fill'"
                      :preview-src-list="listPreview5"
                      :initial-index="index"
            >
            </el-image>
          </div>
        </div>



<!--        <div style="margin: 20px 0 20px 0;">-->
<!--          <label style="font-size:40px; color: white; border: 0; margin: 0 0 0 365px; font-family: 'FZShuTi'">推理结果 (Rank 5)</label>-->
<!--        </div>-->
<!--        <div style="background-color: #6C6CFF; width:96%; padding: 20px; margin: 0 20px 0 0; border:2px solid #a1a1a1; border-radius:25px;">-->
<!--          <label style="background-color: #6C6CFF; font-size:30px; color: white; border: 0; font-family: 'Microsoft Yahei'">GroundTruth:</label>-->
<!--          <label style="background-color: #6C6CFF; font-size:30px; color: #C40000; border: 0; font-family: 'Microsoft Yahei'">{{GroundTruth}}</label>-->
<!--          <br>-->
<!--          <label style="background-color: #6C6CFF; font-size:30px; color: white; border: 0; font-family: 'Microsoft Yahei'">Predicted within ImageNet:</label>-->
<!--          <label style="background-color: #6C6CFF; font-size:30px; color: #C40000; border: 0; font-family: 'Microsoft Yahei'">{{Predicted5}}</label>-->
<!--          <br>-->
<!--          <label style="background-color: #6C6CFF; font-size:30px; color: white; border: 0; font-family: 'Microsoft Yahei'">Probability:</label>-->
<!--          <label style="background-color: #6C6CFF; font-size:30px; color: #C40000; border: 0; font-family: 'Microsoft Yahei'">{{Probability5}}</label>-->
<!--          <br>-->
<!--        </div>-->
<!--        <div style="margin: 20px 0 20px 0;">-->
<!--          <label style="font-size:40px; color: white; border: 0; margin: 0 0 0 250px; font-family: 'FZShuTi'">语义概念对Rank 5分类结果的影响</label>-->
<!--        </div>-->
<!--        <el-row style="margin: 30px 0 0 60px;">-->
<!--          <el-col v-for="(item,index) in showList5" :span="12" :key="index">-->
<!--            &lt;!&ndash;                  <div :id=item.id :class="istrue?'block3':'block2'" @click="istrue=!istrue">&ndash;&gt;-->
<!--            <el-image :src="`http://${item}`"-->
<!--                      :preview-src-list="listPreview5"-->
<!--                      :initial-index="index"-->
<!--                      :fit="'scale-down'"-->
<!--            >-->
<!--            </el-image>-->
<!--          </el-col>-->
<!--        </el-row>-->

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
        </div>
      </el-main>
    </el-container>

</template>

<script lang="ts" setup>
import {router} from "@/router";
import {ElMessage} from "element-plus";
import request from "@/api";
import {reactive, ref} from "vue";
import {useStore} from "vuex";
import axios from "axios";
import DataUpload from "./DataUpload.vue";

const componentKey = ref(0);
const last_id = ref(666)
const chosenModel = ref('')
const chosenImg = ref('')
const istrue = ref(false)
const chosenAlgorithm = ref('')
const activate = ref(-1)
const chosen = ref([])
let resultLoading = ref(false)
let resultShow = ref(false)

const GroundTruth = ref('')
const Predicted = ref(''), Predicted2 = ref(''), Predicted3 = ref(''), Predicted4 = ref(''), Predicted5 = ref('')
const Probability = ref(''), Probability2 = ref(''), Probability3 = ref(''), Probability4 = ref(''), Probability5 = ref('')

const chosenEnhanceAlgorithm = ref('')
const chosenStitchingAlgorithm = ref('')
const store = useStore();
const listPage = ref(1), imageNumber = ref(8);
const fileList = ref([]), datasetInformation = ref({}), fileList2 = ref([]), segmentationfileList = ref([]);
let selectList = Array(imageNumber.value).fill(0);
let deleteShow = ref(false);
const showList = ref([]), listPreview = ref([]), showListPool = ref([]), listPreview2 = ref([]);
const showList2 = ref([]), listPreview22 = ref([]), showList3 = ref([]), listPreview3 = ref([]);
const showList4 = ref([]), listPreview4 = ref([]), showList5 = ref([]), listPreview5 = ref([]);
const segmentationList = ref([]), segmentationPreview = ref([]);

async function refreshImages(option) { //推理之后才提交的, 刷新右边的结果
  // console.log(option);
  await getDatasetInfos(option);
  updateShowList();
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

const updateShowList = () => {
  showList.value = fileList.value
  console.log("showList.value", showList.value);
  listPreview.value = (showList.value.map((e) => {
    return "http://" + e;
  }));
  console.log("listPreview.value", listPreview.value)
};


async function realRefreshImages(option){  //图像池的刷新
  await getImgPoolInfos(option);
  updatePoolList();
}

async function getImgPoolInfos(option){
  let requestUrl = "/dataset/" + option, requestData = {};
  requestData["datasetId"] = 10003;
  await request.post(requestUrl, requestData)
      .then((res) => {
        console.log(res.data);

        if (res.status === 200) {
          chosen.value[0] = res.data.data[0]
          fileList2.value = (res.data.data);
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
  chosenImg.value = arr[arr.length - 1]
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
  if(!chosenAlgorithm.value){
    ElMessage.error('请选择要使用的算法')
    return
  }
  if(!chosenImg.value){
    ElMessage.error('请选择要解释的图像')
    return
  }
  resultLoading.value = true
  await request.post('/algorithm/callAlgorithm',{
    algorithmName:chosenAlgorithm.value,
    datasetId: 666,
    datasetName: "VOC",
    modelName: chosenModel.value,
    userName: chosenImg.value,
    // userName: store.state.username,
  })
      .then((response)=>{
        console.log("response", response)
        fileList.value[0] = (response.data.data.result[4]);
        fileList.value[1] = (response.data.data.result[5]);
        segmentationfileList.value[0] = (response.data.data.result[4]);
        segmentationfileList.value[1] = (response.data.data.result[6]);
        // segmentationList.value[0] = (response.data.data.result[4]);
        // segmentationList.value[1] = (response.data.data.result[6]);
        GroundTruth.value = response.data.data.result[1];
        Predicted.value = response.data.data.result[2];
        Probability.value = response.data.data.result[3].slice(12,18) + "%";

        Predicted2.value = response.data.data.result[7];
        Probability2.value = response.data.data.result[8].slice(12,18) + "%";
        Predicted3.value = response.data.data.result[10];
        Probability3.value = response.data.data.result[11].slice(12,18) + "%";
        Predicted4.value = response.data.data.result[13];
        Probability4.value = response.data.data.result[14].slice(12,18) + "%";
        Predicted5.value = response.data.data.result[16];
        Probability5.value = response.data.data.result[17].slice(12,18) + "%";


        fileList.value[2] = (response.data.data.result[9]);
        fileList.value[3] = (response.data.data.result[12]);
        fileList.value[4] = (response.data.data.result[15]);
        fileList.value[5] = (response.data.data.result[18]);
      })
      .catch((error)=>{
        console.error(error)
      })

  showList.value[0] = fileList.value[0]
  showList.value[1] = fileList.value[1]
  showList2.value[0] = fileList.value[0]
  showList2.value[1] = fileList.value[2]
  showList3.value[0] = fileList.value[0]
  showList3.value[1] = fileList.value[3]
  showList4.value[0] = fileList.value[0]
  showList4.value[1] = fileList.value[4]
  showList5.value[0] = fileList.value[0]
  showList5.value[1] = fileList.value[5]
  segmentationList.value = segmentationfileList.value


  console.log("showList.value", showList.value);
  listPreview.value = (showList.value.map((e) => {
    return "http://" + e;
  }));
  console.log("showList2.value", showList2.value);
  listPreview22.value = (showList2.value.map((e) => {
    return "http://" + e;
  }));
  listPreview3.value = (showList3.value.map((e) => {
    return "http://" + e;
  }));
  listPreview4.value = (showList4.value.map((e) => {
    return "http://" + e;
  }));
  listPreview5.value = (showList5.value.map((e) => {
    return "http://" + e;
  }));
  console.log("listPreview.value", listPreview.value)
  segmentationPreview.value = (segmentationList.value.map((e) => {
    return "http://" + e;
  }));
  resultShow.value = true
  resultLoading.value = false
}
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
  border-color: #000000
}
.m-2{
  text-align: center;
  margin: 0 20px;
  border-color: #000000;
}
.m-3{
  text-align: center;
  margin-left: 430px;
  background-color: #9B591E;
  border-color: #000000;
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
.block2 {
  padding: 0;
  text-align: center;
  /*border: solid 2px var(--el-border-color);*/
  border: 2px solid white;
  /*display: inline-block;*/
  /*width: 19%;*/
  /*float: left;*/
  cursor:pointer;
  /*box-sizing: border-box;*/
  /*vertical-align: top;*/
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

</style>
