<template>
  <div class="container">
    <h1 class="bigtitle" style="color: #3F3A64; margin-top: 10px; font-size: 40px">
      Get Started
      <!--      <div style="margin-bottom: 10px;"/>-->
    </h1>
    <!-- 一个Unit代码一个块，包括小标题，代码，图片，具体代码以下样例 -->
    <!-- 替换图片路径就行,其他不用动 -->
    <div class="unit">
      <div class="unit-title jiange" style="font-size: 25px">Network Pruning Process in XXXX</div>
      <!-- 替换图片路径就行,其他不用动 -->
      <div class="unit-img-box-holly">
        <img src="./static/image/main.svg" class="unit-img-holly" style="margin-bottom: 20px;">
      </div>
      <div class="unit-text">
        In the <code>unified pruning framework</code>, the model undergoes an initial stage of sparse training,
        which aims to sparsify the network parameters with a <code>regularizer</code>. Then, the <code>DepGraph</code>
        is utilized to group  coupled parameters within the network. Next, a chosen <code>importance metric</code> is
        employed to prune the model. Finally, we fine-tuned the pruned model to restore its accuracy.
        <!--        The schematic diagram of attribution~(I) and evaluation~(II and III).<br>-->

<!--        (I) <code>AM</code> represents the attribution method. The dashed arrow means the process of attribution. A higher attribution value is associated with a darker color of the small square in <code>Saliency Map</code>.<br>-->
<!--        (II) <code>Ordered Sequence</code> refers to the arrangement of pixels based on their attribution values. <code>Remove</code> indicates removing the features from the original image according to the ordered sequence.<br>-->
<!--        (III) <code>&Delta; acc</code> denotes the decline of model performance after removing features. A higher <code>&Delta; acc</code> indicates a better attribution method.-->
      </div>

      <!-- 粘贴代码就行，注意要格式，多出来的空格和回车也会被读到代码框中, -->
    </div>

    <div class="unit">
      <div class="unit-title jiange" style="font-size: 25px">Online Pruning and Submission for Personalized Tasks</div>
      <!-- 替换图片路径就行,其他不用动 -->
      <div class="unit-img-box">
        <img src="./static/image/1.gif" class="unit-img" style="margin-bottom: 20px;">
      </div>
      <div class="unit-text">
        <!--        The schematic diagram of attribution~(I) and evaluation~(II and III).<br>-->
        Leveraging the <code>unified framework</code>, our model pruning system can be applied across a <code>multitude of tasks, models,
        and datasets</code>. Users can generate scripts and submit personalized pruning tasks, with the flexibility to select pruning methods,
        acceleration levels, fine-tuning configurations and various hyperparameters. Users can also upload, prune,
        and fine-tune their own models. (Regular users are required to submit tasks for admin review, and upon approval, task will execute.)


<!--        Users are provided with the flexibility to select pruning methods, acceleration levels, -->
<!--        fine-tuning configurations, and various hyperparameters, allowing for customization. -->
<!--        Additionally, users have the option to generate scripts for personal testing or submit pruning tasks to the system.-->


<!--        <code>EF</code> means the environmental factor. <code>MoRF</code> and <code>LeRF</code> are the ways-->
<!--        of pixel masking. <code>A</code> represents the attribution method and <code>T</code> represents the task.-->
<!--        <code>&alpha;</code> indicates the meta score of every method. Multiple environmental factors combine-->
<!--        to generate different tasks. Attribution methods are tested on these tasks, and their outcomes are-->
<!--        subsequently fed into the calculation module (<code>History Fusion</code>) of Meta-rank. Ultimately,-->
<!--        after all data is analyzed, a unified leaderboard is obtained.-->
      </div>

      <!-- 粘贴代码就行，注意要格式，多出来的空格和回车也会被读到代码框中, -->
    </div>

    <div class="unit">
      <div class="unit-title jiange" style="font-size: 25px">Structural Pruning Benchmarks</div>
      <div class="unit-img-box">
        <img src="./static/image/2.gif" class="unit-img" style="margin-bottom: 20px;">
      </div>

      <div class="unit-text">
        Within the <code>unified framework</code>, we designed fair experiments to compare the performance of different
        pruning techniques <code>across diverse tasks and scenarios</code>. We separately discussed <code>sparse regularizers</code>
        and <code>importance metrics</code>.

      </div>
    </div>

<!--    <div class="unit-text">Finally, clone MetaScore project: </div>-->
<!--    <div class="unit-code">-->
<!--      <pre class="hljs"><code class="language-python">git clone ......</code></pre></div>-->

    <div class="unit">
      <div class="unit-title jiange" style="font-size: 25px">Real-time Task Querying</div>

      <div class="unit-img-box">
        <img src="./static/image/3.gif" class="unit-img" style="margin-bottom: 20px;">
      </div>


      <div class="unit-text">
        The pruning tasks submitted by users provide <code>real-time feedback</code>, including a progress bar and detailed
        information about model parameters, FLOPs, accuracy and loss. Users can download checkpoints and structures before
        and after pruning, along with training logs. Additionally, the system supports <code>efficient querying</code> of tasks.
      </div>
    </div>



    <div class="unit">
      <div class="unit-title jiange" style="font-size: 25px">Join The LeaderBoard</div>

      <div class="unit-img-box">
        <img src="./static/image/4.gif" class="unit-img" style="margin-bottom: 20px;">
      </div>


      <div class="unit-text">
        To participate in our leaderboards, kindly implement the interface for your pruning algorithm using our Python library -
        Torch-Pruning (TP):

        <el-link style="font-size: 20px" type="primary" target="_blank" href="https://github.com/VainF/Torch-Pruning" :underline="false">
          https://github.com/VainF/Torch-Pruning
        </el-link>

        , and submit a pull request to the project.
        We will conduct necessary experimental validation for your algorithm and incorporate it into the leaderboards.
      </div>
    </div>


  </div>

  <div class="footer" id="footer" style="margin-top: 80px">
    <nav class="navbar navbar-expand-lg" style="background-color: rgb(245, 247, 250)" id="footer-navbar">
      <div style="display: flex; justify-content: center" class="container-fluid custom-container">
        <div class="container text-center">
          <div class="row2">
            <div class="col footer-team">
              <h2>XXXX TEAM</h2>
            </div>
          </div>
          <div class="row2">
            <div class="col footer-school">
              Zhejiang University VIPA Lab & National University of Singapore
            </div>
          </div>
          <div class="row2">
            <div class="col footer-name">
              Haoling Li, Changhao Li, Gongfan Fang, Jie Song
            </div>
          </div>

          <div class="row2">
            <div class="col footer-name">
              Website maintenance: Haoling Li (hollylee@zju.edu.cn)
            </div>
          </div>



          <div class="col  mb-5  text-muted" style="margin-top: 20px">
            Copyright© 2023 ZJU VIPA All Rights Reserved
          </div>
        </div>
      </div>
    </nav></div>



</template>


<!--src="./script.js"-->
<script setup>

import { ref } from 'vue';
import {ElMessage} from "element-plus";

const checked1 = ref(false)
const checked2 = ref(false)
const checked3 = ref(false)
const checked4 = ref(false)
const checked5 = ref(false)
const checked6 = ref(false)
const checked7 = ref(false)
const checked8 = ref(false)
const checked9 = ref(false)
const checked10 = ref(false)
const checked11 = ref(false)

const showScript = ref(false)

// import $ from 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-alpha1/jquery.min.js'
// import * as d3 from 'https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js';

function showMyScript(){
  if(!checked1.value&&!checked2.value&&!checked3.value&&!checked4.value&&!checked5.value&&!checked6.value&&!checked7.value
      &&!checked8.value&&!checked9.value&&!checked10.value&&!checked11.value){
    ElMessage.warning("Please select at least one task!!")
  }else{
    showScript.value=true
  }
}


</script>

<style scoped>
@import "./style.css";
/*@import "./all.css";*/

.el-checkbox{
  margin: 10px;
}

.jiange{
  margin-top: 15px;
  margin-bottom: 20px;
}

.hljs {
  color: #c9d1d9;
  background: #0d1117;
}

#tree-container {
  transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
  -moz-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  -o-transform: rotate(90deg);
  overflow-x: visible;
  overflow-y: visible;
  width: 100%;
}
.tree-wrapper {
  position: relative;
}

.intro {
  position: absolute;
  top: 10%;
  left: 5%;
  /*color: white;*/
  /*transform-origin: top right;*/
  /*transform: rotate(-90deg);*/
}
/*.text-component span {*/
/*  display: inline-block;*/
/*  transform-origin: center;*/
/*  transform: rotate(90deg);*/
/*}*/
.holly{
  /*background-image: url('http://10.214.242.155:7668/img/background/algorithm2.jpg');*/
  /*background-repeat: no-repeat;*/
  /*background-size: contain;*/
  background-color: white;
  overflow: visible;
  /*position: relative;*/
  /*background-position: center;*/
}
.rating {
  /*font-size: 18px;*/
  text-align: center;
}

.row {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
}
/*.overlay{*/
/*  background: linear-gradient(transparent,#78E9E8 100%);*/
/*  !*width: 1863px;*!*/
/*  !*height: 961px;*!*/
/*  width: 100%;*/
/*  !*height: 100%;*!*/
/*  overflow-x: visible;*/
/*  overflow-y: visible;*/
/*  !*position: absolute;*!*/
/*  !*top: 0;*!*/
/*  !*left: 0;*!*/
/*  !*width: 100%;*!*/
/*  !*height: 100%;*!*/
/*}*/
/*code {*/
/*  display: block;*/
/*  overflow-x: auto;*/
/*  padding: 1em;*/
/*}*/
pre code {
  font-size: inherit;
  color: inherit;
  word-break: normal;

  display: block;
  overflow-x: auto;
  padding: 1em;
}
code {
  font-size: .875em;
  color: var(--bs-code-color);
  word-wrap: break-word;
}
code, kbd, pre, samp {
  font-family: var(--bs-font-monospace);
  font-size: 1em;
}
code, kbd, pre, samp {
  font-family: var(--bs-font-monospace);
  font-size: 1em;
  direction: ltr;
  unicode-bidi: bidi-override;
}
.hljs-number{
  color: #79BFFD;
}
</style>