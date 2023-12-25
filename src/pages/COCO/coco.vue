<template>
  <!--  哈哈哈-->
<!--  <el-aside>-->
<!--    -->

<!--  </el-aside>-->
<!--  -->
<!--  <el-main>-->
<!--    -->
<!--  </el-main>-->
  <el-container>
<!--    <div id="gpuChart" style="width: 50%; height: 30%; "></div>-->
<!--    <div id="gpuChart" style="width: 50%; height: 30%; " ref="gpuChartRef"></div>-->
  <div class="layout">
<!--    <h5 class="mb-2">Default colors</h5>-->

    <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        active-text-color="#F9BB00"
        :collapse="isCollapse"
        :collapse-transition="true"
        :ellipsis="false"
        @open="handleOpen"
        @close="handleClose"
        style="overflow: scroll"
    >
      <div class="sidebar-header">
        <div class="pro-sidebar-logo">
          <div>vipa</div>
          <h5>Model Zoo</h5>
        </div>
      </div>

      <el-sub-menu index="1">
        <template #title>
          <div class="circle-icon">
            <img src="http://10.214.242.155:7996/Cifar/0_93.jpg" alt="Icon" />
          </div>
          <span>&nbsp;&nbsp;CIFAR10 <span class="menu-suffix  ">
                      <span class="badge primary">classify</span>
                    </span> </span>
        </template>
        <el-menu-item @click="centerNodebyName('CIFAR10', 'Xception')" index="1-1">Xception </el-menu-item>
        <el-menu-item @click="centerNodebyName('CIFAR10', 'VGG19')" index="1-2">VGG19</el-menu-item>
        <el-menu-item @click="centerNodebyName('CIFAR10', 'SE-ResNet20')" index="1-3">SE-ResNet20</el-menu-item>
        <el-menu-item @click="centerNodebyName('CIFAR10', 'ResNet56(tiny)')" index="1-4">ResNet56 (tiny)</el-menu-item>
        <el-menu-item @click="centerNodebyName('CIFAR10', 'ResNet18')" index="1-5">ResNet18</el-menu-item>
        <el-menu-item @click="centerNodebyName('CIFAR10', 'MobileNetv2')" index="1-6">MobileNetV2</el-menu-item>
        <el-menu-item @click="centerNodebyName('CIFAR10', 'InceptionV4')" index="1-7">InceptionV4</el-menu-item>
        <el-menu-item @click="centerNodebyName('CIFAR10', 'GoogleNet')" index="1-8">GoogleNet</el-menu-item>
        <el-menu-item @click="centerNodebyName('CIFAR10', 'DenseNet121')" index="1-9">DenseNet121</el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="2">
        <template #title>
          <div class="circle-icon">
            <img src="http://10.214.242.155:7996/Cifar/9_36064.jpg" alt="Icon" />
          </div>
          <span>&nbsp;&nbsp;CIFAR100 <span class="menu-suffix">
                      <span class="badge primary">classify</span>
                    </span></span>
        </template>
        <el-menu-item @click="centerNodebyName('CIFAR100', 'Xception')" index="2-1">Xception</el-menu-item>
        <el-menu-item @click="centerNodebyName('CIFAR100', 'VGG19')" index="2-2">VGG19</el-menu-item>
        <el-menu-item @click="centerNodebyName('CIFAR100', 'SE-ResNet20')" index="2-3">SE-ResNet20</el-menu-item>
        <el-menu-item @click="centerNodebyName('CIFAR100', 'ResNet56(tiny)')" index="2-4">ResNet56 (tiny)</el-menu-item>
        <el-menu-item @click="centerNodebyName('CIFAR100', 'ResNet18')" index="2-5">ResNet18</el-menu-item>
        <el-menu-item @click="centerNodebyName('CIFAR100', 'MobileNetv2')" index="2-6">MobileNetV2</el-menu-item>
        <el-menu-item @click="centerNodebyName('CIFAR100', 'InceptionV4')" index="2-7">InceptionV4</el-menu-item>
        <el-menu-item @click="centerNodebyName('CIFAR100', 'GoogleNet')" index="2-8">GoogleNet</el-menu-item>
        <el-menu-item @click="centerNodebyName('CIFAR100', 'DenseNet121')" index="2-9">DenseNet121</el-menu-item>
      </el-sub-menu>


      <el-sub-menu index="3">
        <template #title>
          <div class="circle-icon">
            <img src="http://10.214.242.155:7996/VOC/2010_001499.jpg" alt="Icon" />
          </div>
          <span>&nbsp;&nbsp;ImageNet <span class="menu-suffix">
                      <span class="badge primary">classify</span>
                    </span></span>
        </template>
        <el-menu-item @click="centerNodebyName('ImageNet', 'ViT_B_16(timm)')" index="3-1">ViT_base (timm)</el-menu-item>
        <el-menu-item @click="centerNodebyName('ImageNet', 'ViT_B_16(hf)')" index="3-2">ViT_base (huggingface)</el-menu-item>
        <el-menu-item @click="centerNodebyName('ImageNet', 'VGG19_BN')" index="3-3">VGG19</el-menu-item>
        <el-menu-item @click="centerNodebyName('ImageNet', 'VGG16_BN')" index="3-4">VGG16</el-menu-item>
        <el-menu-item @click="centerNodebyName('ImageNet', 'ResNet50')" index="3-5">ResNet50</el-menu-item>
        <el-menu-item @click="centerNodebyName('ImageNet', 'MobileNetV2')" index="3-6">MobileNetV2</el-menu-item>
        <el-menu-item @click="centerNodebyName('ImageNet', 'DenseNet121')" index="3-7">DenseNet121</el-menu-item>
        <el-menu-item @click="centerNodebyName('ImageNet', 'DeiT_B_16(timm)')" index="3-8">DeiT_base (timm)</el-menu-item>
      </el-sub-menu>
        

      <el-sub-menu index="4">
        <template #title>
          <div class="circle-icon">
            <img src="http://10.214.242.155:7996/VOC/2008_002789.jpg" alt="Icon" />
          </div>
          <span>&nbsp;&nbsp;COCO <span class="menu-suffix">
<!--                      <span class="badge primary">detection</span>-->
                      <span class="badge secondary">detect</span>
                    </span></span>
        </template>
        <el-menu-item @click="centerNodebyName('COCO', 'YOLOv5')" index="4-1">YOLOv5</el-menu-item>
        <el-menu-item @click="centerNodebyName('COCO', 'YOLOv7')" index="4-2">YOLOv7</el-menu-item>
        <el-menu-item @click="centerNodebyName('COCO', 'YOLOv8')" index="4-3">YOLOv8</el-menu-item>
      </el-sub-menu>
    </el-menu>

    <div class="sidebar-footer" v-show="!isCollapseDiv">
      <div class="footer-box">
        <div>
          <img
              class="react-logo"
              src="https://user-images.githubusercontent.com/25878302/213938106-ca8f0485-3f30-4861-9188-2920ed7ab284.png"
              alt="react"
          />
        </div>
        <div style="padding: 0 10px">
                <span style="display: block; margin-bottom: 10px; color: white"
                >Torch prune is now also available for diffusion and LLM model!
                </span>
          <div style="margin-bottom: 15px">
            <img
                alt="preview badge"
                src="https://img.shields.io/github/stars/VainF/Torch-Pruning?style=social"
            />
          </div>
          <div>
            <a href="https://github.com/VainF/Torch-Pruning" target="_blank"
            >Check it out!</a
            >
          </div>
        </div>
      </div>
    </div>


  </div>




    <a class="sidebar-collapser" @click="toggleCollapse" v-if="!isCollapse"> {{myIcon}} </a>
    <a class="sidebar-collapsed" @click="toggleCollapse" v-else> {{myIcon2}} </a>

<!--    sidebar-collapsed-->
<!--    <div class="toggle-button" >|||</div>-->




    <el-main style="padding: 0">
      <div class="holly">
        <div id="tree-container"></div>
      </div>
    </el-main>
  </el-container>

  <el-dialog class="scrollable"  v-model="UploadVisible" style="width:50%; height:60%; text-align: center; overflow: auto; font-family: Arial;"
             :draggable="true" @close="UploadVisible = false" :append-to-body="true" title="Add your model to the model zoo" >

    <div v-loading="resultLoading">
      <div style="margin: 0 0 20px 0; text-align: left;">
        <label style="margin-left: 50px; font-size:18px; border: 0; word-wrap: break-word; white-space: pre-wrap; color: #000096">
          Provide {{modelName}} trained on {{modelDatasetSimple}}
        </label>
      </div>
      <div style="margin: 0 0 20px 0; text-align: left;">
        <el-radio-group style="margin-left: 50px; border: 0; color: black; " v-model="uploadType">
          <el-radio label="upload" size="large" border>Upload a model</el-radio>
          <el-radio label="definePath" size="large" border>Provide model path on the server</el-radio>
        </el-radio-group>
      </div>
<!--      <el-upload-->
<!--          v-if="uploadType==='upload'"-->
<!--          ref="uploadRef"-->
<!--          method="post"-->
<!--          class="upload-demo"-->
<!--          drag-->
<!--          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"-->
<!--          :before-upload="checkFile"-->
<!--          :on-preview="handlePictureCardPreview"-->
<!--          :on-remove="handleRemove"-->
<!--          :on-change="handleChange1"-->
<!--          :limit="1"-->
<!--          :file-list="uploadFileList"-->
<!--          style="margin: 10px 50px 10px 50px;"-->
<!--      >-->
      <el-upload
          v-if="uploadType==='upload'"
          class="upload-demo"
          drag
          action="http://10.214.242.155:7996/data/uploadCkpt"
          :before-upload="checkFile"
          :on-success="handleUploadSuccess"
          :on-error="handleUploadFailed"
          :show-file-list="false"
          style="margin: 10px 50px 10px 50px;"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          Drop file here or <em>click to upload</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            checkpoint file with a size less than 500MB
          </div>
        </template>
      </el-upload>
      <div v-else-if="uploadType==='definePath'" style="margin: 20px 0 20px 0; text-align: left;">
        <el-input
            v-model="ckpt"
            placeholder="Provide the model path"
            style="margin-left: 50px; border: 0; color: black; width: 30%"
        />
      </div>
      <div v-show="uploadType!=''" style="margin: 20px 0 20px 0; text-align: left;">
        <el-input
            v-model="usrModelName"
            placeholder="Give your model a name"
            style="margin-left: 50px; border: 0; color: black; width: 30%"
        />
      </div>
      <div v-show="uploadType!=''" style="margin: 20px 0 20px 0; text-align: center">
        <el-button size="large" type="success" plain @click="updateTree">Submit a raw model</el-button>
      </div>


    </div>
  </el-dialog>






  <el-dialog class="scrollable" v-model="dialogVisible2" style="width:40%; height:20%; overflow: auto; text-align: center"
             :draggable="true" @close="dialogVisible2 = false" :append-to-body="true" title="Analyze model and pruning test" >
    <div v-if="!isTest"  style="text-align: left;">
      <label style="margin-left: 50px; font-size:18px; border: 0; color: #800E25; word-wrap: break-word; white-space: pre-wrap;">
        Testing......</label>
    </div>
    <div v-else  style="text-align: left;">
      <label style="margin-left: 50px; font-size:18px; border: 0; color: #20BD1C; word-wrap: break-word; white-space: pre-wrap;">
        Success!</label>
    </div>

    <el-progress :text-inside="true"  class="m-2" :stroke-width="26" :percentage="percentage2" :color="colors"  />
  </el-dialog>







  <el-dialog class="scrollable" v-model="dialogVisible" style="width:50%; height:55%; overflow: auto; text-align: center"
             :draggable="true" @close="dialogVisible = false" :append-to-body="true" title="Online Pruning Result" >
    <div v-if="!isPruned"  style="text-align: left;">
      <label style="margin-left: 50px; font-size:18px; border: 0; color: #800E25; word-wrap: break-word; white-space: pre-wrap;">
        Pruning......</label>
    </div>
    <div v-else  style="text-align: left;">
      <label style="margin-left: 50px; font-size:18px; border: 0; color: #20BD1C; word-wrap: break-word; white-space: pre-wrap;">
        Pruned!</label>
    </div>

    <el-progress :text-inside="true"  class="m-2" :stroke-width="26" :percentage="percentage" :color="colors"  />

    <div v-loading="resultLoading4" :style="{visibility:resultShow_tree_result?'visible':'hidden'}">
      <div style="margin: 0 0 20px 0; text-align: left;">
        <label style="margin-left: 50px; font-size:18px; border: 0; color: black; word-wrap: break-word; white-space: pre-wrap;">
          {{paramsChange}}</label>
      </div>
      <div style="margin: 0 0 20px 0; text-align: left;">
        <label style="margin-left: 50px; font-size:18px; border: 0; color: black; word-wrap: break-word; white-space: pre-wrap;">
          {{FLOPsChange}}</label>
      </div>
      <div style="margin: 0 0 20px 0; text-align: left;">
        <label style="margin-left: 50px; font-size:18px; border: 0; color: black; word-wrap: break-word; white-space: pre-wrap;">
          {{AccChange}}</label>
      </div>
      <div style="margin: 0 0 20px 0; text-align: left;">
        <label style="margin-left: 50px; font-size:18px; border: 0; color: black; word-wrap: break-word; white-space: pre-wrap;">
          {{LossChange}}</label>
      </div>
      <div style="margin: 0 0 20px 0; text-align: left;">
        <label style="margin-left: 50px; font-size:18px; border: 0; color: black; word-wrap: break-word; white-space: pre-wrap;">
          Checkpoint(pruned): <el-link v-if="PrunedPath!=='N/A'" target="_blank" :href="'http://10.214.242.155:7996/WorkSpace/'+PrunedPath.split('Torch-Pruning').slice(-1)[0]" :underline="false">
          <el-button size="small" type="success" plain>Download</el-button></el-link>
          <text v-else>
            N/A
          </text>
        </label>
      </div>
      <div style="margin: 0 0 20px 0; text-align: left;">
        <label style="margin-left: 50px; font-size:18px; border: 0; color: black; word-wrap: break-word; white-space: pre-wrap;">
          Model structure(pruned): <el-link v-if="structureAfterPruned!=='N/A'" target="_blank" :href="'http://10.214.242.155:7996/WorkSpace/'+structureAfterPruned.split('Torch-Pruning').slice(-1)[0]" :underline="false">
          <el-button size="small" type="primary" plain>View</el-button></el-link>
          <text v-else>
            N/A
          </text>
        </label>
      </div>
      <div style="margin: 0 0 20px 0; text-align: left;">
        <label style="margin-left: 50px; font-size:18px; border: 0; color: black; word-wrap: break-word; white-space: pre-wrap;">
          Log file: <el-link v-if="logPath!=='N/A'" target="_blank" :href="'http://10.214.242.155:7996/WorkSpace/'+logPath.split('Torch-Pruning').slice(-1)[0]" :underline="false">
          <el-button size="small" type="primary" plain>View</el-button></el-link>
          <text v-else>
            N/A
          </text>
        </label>
      </div>
      <div style="margin: 0 0 20px 0; text-align: center">
        <el-button size="large" type="success" plain @click="dialogVisible = false">OK</el-button>
      </div>
    </div>
  </el-dialog>


  <el-dialog class="scrollable" v-model="PrunedialogVisible" style="width:95%; height:95%; text-align: center; overflow: auto; font-family: Arial;"
             :draggable="true" @close="PrunedialogVisible = false" :append-to-body="true" title="CIFAR Model Pruning" >
    <div v-loading="resultLoading2">

<!--      generate the script. If you don't require sparse Learning and fine-tuning,-->
<!--      click "online pruning" to obtain pruning results immediately. If you need sparse Learning or fine-tuning, you'll need-->
<!--      to-->
<!--      and wait for training, which is not yet implemented on this server-->
<!--      All models trained on the CIFAR dataset-->
<!--      adopt a learning rate of 0.01 during fine-tuning phases.-->
      <div style="margin: 0 0 20px 0; text-align: left;">
        <label style="margin-left: 50px; font-size:18px; border: 0; word-wrap: break-word; white-space: pre-wrap; color: #000096">CIFAR Tips: Complete the
          following information and submit a pruning task.</label>
      </div>

      <div style="margin: 0 0 20px 0; text-align: left;">
        <label style="margin-left: 50px; font-size:18px; border: 0; word-wrap: break-word; white-space: pre-wrap; color: #800E25">
          Name: {{modelName}}<br>
          Task: {{modelDataset}}<br>
          Type: {{modelType}}<br>
          Acc: {{modelAcc}}<br>
          Params: {{modelParams}}<br>
          Flops: {{modelFlops}}<br>
          Checkpoint: <el-link target="_blank" :href="'http://10.214.242.155:7996/WorkSpace'+modelPath.split('Torch-Pruning').slice(-1)[0]" :underline="false">
          <el-button size="small" type="success" plain>Download</el-button></el-link><br>
          Model structure: <el-link target="_blank" :href="'http://10.214.242.155:7996/WorkSpace/'+structureBeforePruned.split('Torch-Pruning').slice(-1)[0]" :underline="false">
          <el-button size="small" type="primary" plain>View</el-button></el-link>
        </label>
      </div>
      <!--      click(-->



<!--      Without sparse learning and fine-tuning, online pruning can be made immediately at a slight sacrifice in accuracy (&lt;1%).-->
      <div style="margin: 0 0 20px 0; text-align: left;">
        <label style="margin-left: 50px; font-size:18px; border: 0; color: black; word-wrap: break-word; white-space: pre-wrap;">Step1: Choose whether to employ sparse learning. Sparse learning is often time-consuming and does not guarantee benefits.</label>
      </div>
      <div style="margin: 0 0 20px 0; text-align: left;">
        <el-radio-group @click="criterion=''" style="margin-left: 50px; border: 0; color: black; " v-model="radio1">
          <el-radio label="sl" size="large" border>With Sparse Learning</el-radio>
          <el-radio label="wosl" size="large" border>Without Sparse Learning (Recommended)</el-radio>
        </el-radio-group>
      </div>

      <div v-if="radio1==='sl'" style="margin: 0 0 20px 0; text-align: left;">
        <label style="margin-left: 50px; font-size:18px; border: 0; color: black; word-wrap: break-word; white-space: pre-wrap;">Input the number of epochs for sparse learning (Integer required and 100 is recommend, other hyperparameters have been set to optimal).</label>
      </div>
      <div v-if="radio1==='sl'" style="margin: 0 0 20px 0; text-align: left;">
        <el-input
            v-model="sl_total_epochs"
            placeholder="Please input"
            style="margin-left: 50px; border: 0; color: black; width: 8%"
        />
      </div>
<!--      the choice of whether to employ sparse learning will determine the available pruner-->
      <div style="margin: 0 0 20px 0; text-align: left;">
        <label style="margin-left: 50px; font-size:18px; border: 0; color: black; word-wrap: break-word; white-space: pre-wrap;">Step2: Select the pruner, i.e., importance criterion + sparsity regularizer (if sparse learning is employed).</label>
      </div>
      <div v-show="radio1==='sl'" style="margin: 0 0 20px 0; text-align: left;">
        <el-radio-group style="margin-left: 50px; border: 0; color: black; " v-model="criterion">
          <el-radio label="slim" size="large" border>BNScale + BNScale</el-radio>
          <el-radio label="group_slim" size="large" border>BNScale + GroupLASSO</el-radio>
          <el-radio label="group_sl" size="large" border>MagnitudeL2 + GroupNorm</el-radio>
          <el-radio label="growing_reg" size="large" border>MagnitudeL2 + GrowingReg</el-radio>
          <el-radio label="l2_lasso" size="large" border>MagnitudeL2 + GroupLASSO</el-radio>

        </el-radio-group>
      </div>

      <div v-show="radio1==='wosl'" style="margin: 0 0 20px 0; text-align: left;">
        <el-radio-group style="margin-left: 50px; border: 0; color: black; " v-model="criterion">
          <el-radio label="random" size="large" border>Random</el-radio>
          <el-radio label="l1" size="large" border>MagnitudeL1</el-radio>
          <el-radio label="l2" size="large" border>MagnitudeL2</el-radio>
          <el-radio label="lamp" size="large" border>LAMP</el-radio>
          <el-radio label="bnscale_only" size="large" border>BNScale</el-radio>
          <el-radio label="taylor" size="large" border>TaylorFO</el-radio>
          <el-radio label="hessian" size="large" border>Hessian</el-radio>
        </el-radio-group>
      </div>

      <div v-show="radio1!='wosl' && radio1!='sl'" style="margin: 0 0 20px 0; text-align: left;">
        <label style="margin-left: 50px; font-size:18px; border: 0; color: black; word-wrap: break-word; white-space: pre-wrap; color: #800E25">Complete Step1 first.</label>
      </div>

      <div style="margin: 0 0 20px 0; text-align: left;">
        <label style="margin-left: 50px; font-size:18px; border: 0; color: black; word-wrap: break-word; white-space: pre-wrap;">Step3: Choose batch size for
          sparse learning, evaluation and finetuning. It is recommended to choose 128, but if the task fails, you could choose a smaller one.</label>
      </div>
      <div style="margin: 0 0 20px 0; text-align: left;">
        <el-radio-group style="margin-left: 50px; border: 0; color: black; " v-model="batchsize">
          <el-radio label=32 size="large" border>32</el-radio>
          <el-radio label=64 size="large" border>64</el-radio>
          <el-radio label=128 size="large" border>128</el-radio>
        </el-radio-group>
      </div>




      <div style="margin: 0 0 20px 0; text-align: left;">
        <label style="margin-left: 50px; font-size:18px; border: 0; color: black; word-wrap: break-word; white-space: pre-wrap;">Step4: Enter the minimum desired
          speedup for the pruned model in terms of FLOPs. This must be a number greater than 1 but not exceeding 10.</label>
      </div>
      <div style="margin: 0 0 20px 0; text-align: left;">
        <el-input
            v-model="speedup"
            placeholder="Please input"
            style="margin-left: 50px; border: 0; color: black; width: 8%"
        />
      </div>

      <div style="margin: 0 0 20px 0; text-align: left;">
        <label style="margin-left: 50px; font-size:18px; border: 0; color: black; word-wrap: break-word; white-space: pre-wrap;">Step5: Set the number of iterations for pruning, and 400 is recommended. Increasing the number
          of pruning iterations facilitates precise acceleration to the target speed in terms of Flops and improve pruning
          performance. However, for models and methods that are particularly slow
          in pruning (such as mobileNet and Inception with group convolutions; Taylor and Hessian importance that
          rely on gradients), you can lower this value accordingly.</label>
      </div>
      <div style="margin: 0 0 20px 0; text-align: left;">
        <el-input
            v-model="iterative_steps"
            placeholder="Please input"
            style="margin-left: 50px; border: 0; color: black; width: 8%"
        />
      </div>




      <div style="margin: 0 0 20px 0; text-align: left;">
        <label style="margin-left: 50px; font-size:18px; border: 0; color: black; word-wrap: break-word; white-space: pre-wrap;">Step6: Choose whether to fine-tune. </label>
      </div>
      <div style="margin: 0 0 20px 0; text-align: left;">
        <el-radio-group style="margin-left: 50px; border: 0; color: black; " v-model="finetune">
          <el-radio label="True" size="large" border>fine-tune</el-radio>
          <el-radio label="False" size="large" border>not fine-tune</el-radio>
        </el-radio-group>
      </div>







      <div v-show="finetune==='True'">

        <div style="margin: 0 0 20px 0; text-align: left;">
          <label style="margin-left: 50px; font-size:18px; border: 0; color: black; word-wrap: break-word; white-space: pre-wrap;">Step7: Input the number of epochs for finetuning (Integer required and 100 is recommend, other hyperparameters have been set to optimal).</label>
        </div>
        <div style="margin: 0 0 20px 0; text-align: left;">
          <el-input
              v-model="epoch"
              placeholder="Please input"
              style="margin-left: 50px; border: 0; color: black; width: 8%"
          />
        </div>

<!--        gpuChartRef-->

        <div style="margin: 0 0 20px 0; text-align: left;">
          <label style="margin-left: 50px; font-size:18px; border: 0; color: black; word-wrap: break-word; white-space: pre-wrap;">Step8: Select the client and submit the pruning task that needs fine-tuning.</label>
        </div>
        <div style="margin: 0 0 30px 0; text-align: left; width: 100%;">
          <el-radio-group style="margin-left: 60px; border: 0; color: black;" v-model="client155_form">
            <el-radio label="Bar" size="large">Bar charts</el-radio>
            <el-radio label="Pie" size="large">Pie charts</el-radio>
          </el-radio-group>
          <el-radio-group style="margin-left: 50px; border: 0; color: black; width: 100%; display: flex; align-items: flex-start" v-model="client">
            <div style="display: flex; flex-direction: column; width: 40%">
              <el-radio style="width:33%"  label="vipa155_client1" size="large" border>vipa155_client1</el-radio>
              <el-table
                  :data="gpuInfos"
                  style="width: 90%"
                  :border="false"
              >
                <el-table-column min-width="80" fixed prop="name" label="GPU" />
                <el-table-column min-width="80" prop="tot_memory" label="Total Memory">
                <template #default="props">
                  {{props.row.tot_memory}} MiB
                </template>
                </el-table-column>
                <el-table-column label="Memory Usage" min-width="160" style="min-height: 180px">
                  <template #default="props">
                    <el-progress v-if="client155_form==='Bar'" :text-inside="true"  class="m-2" :stroke-width="26" :percentage="(100*(props.row.tot_memory - props.row.remain_memory)/props.row.tot_memory).toFixed(1)" :color="colors"  />
                    <div v-else-if="client155_form==='Pie'" :id="'gpuChart_' + props.$index" style="width: 100%; height: 160%; text-align: left; overflow: visible" :ref="'gpuChartRef_' + props.$index"></div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div style="display: flex; flex-direction: column; width: 40%">
<!--              <el-radio-group style="border: 0; color: black;" v-model="client155_2_form">-->
<!--                <el-radio label="Bar" size="large">Bar charts</el-radio>-->
<!--                <el-radio label="Pie" size="large">Pie charts</el-radio>-->
<!--              </el-radio-group>-->
              <el-radio style="width:33%" label="vipa155_client2" size="large" border>vipa155_client2</el-radio>
              <el-table
                  :data="gpuInfos"
                  style="width: 90%"
                  :border="false"
              >
                <el-table-column min-width="80" fixed prop="name" label="GPU" />
                <el-table-column min-width="80" prop="tot_memory" label="Total Memory">
                  <template #default="props">
                    {{props.row.tot_memory}} MiB
                  </template>
                </el-table-column>
                <el-table-column label="Memory Usage" min-width="160" style="min-height: 180px">
                  <template #default="props">
                    <el-progress v-if="client155_form==='Bar'" :text-inside="true"  class="m-2" :stroke-width="26" :percentage="(100*(props.row.tot_memory - props.row.remain_memory)/props.row.tot_memory).toFixed(1)" :color="colors"  />
                    <div v-else-if="client155_form==='Pie'" :id="'gpuChart2_' + props.$index" style="width: 100%; height: 160%; text-align: left; overflow: visible" :ref="'gpuChartRef2_' + props.$index"></div>
                  </template>
                </el-table-column>
              </el-table>
            </div>

            <el-radio label="Random" size="large" border>Random</el-radio>
          </el-radio-group>
        </div>


      </div>

      <div style="margin: 0 0 20px 0; text-align: center">
<!--        <el-button size="large" type="primary" plain @click="GenerateScript()">Generate Script</el-button>-->
        <!--        原来的OnlinePruning-->
        <el-button v-if="radio1==='wosl' && finetune==='False'" size="large" type="warning" plain @click="SubmitTask">Submit Prune-Only Task</el-button>
        <el-button v-else size="large" type="success" plain @click="SubmitTask">Submit Prune-Finetune Task</el-button>
      </div>

      <div style="margin: 0 0 20px 0; text-align: left;">
        <el-input
            v-model="script"
            v-show="scriptVisible"
            autosize
            type="textarea"
            placeholder="Please input"
            style="margin-left: 50px;  border: 0; width: 95%"
        />
      </div>
    </div>
  </el-dialog>






















<!--  剪COCO的dialogue-->
<!--  PruneCOCOdialogVisible、title和对应描述都要改-->
  <el-dialog class="scrollable" v-model="PruneCOCOdialogVisible" style="width:95%; height:95%; text-align: center; overflow: auto; font-family: Arial;"
             :draggable="true" @close="PruneCOCOdialogVisible = false" :append-to-body="true" title="COCO Model Pruning" >
    <div v-loading="resultLoading2">
<!--      resultLoading2不用改-->

      <div style="margin: 0 0 20px 0; text-align: left;">
        <label style="margin-left: 50px; font-size:18px; border: 0; word-wrap: break-word; white-space: pre-wrap; color: #000096">COCO Tips: Complete the
          following information and submit a pruning task.</label>
<!--        Complete the-->
<!--        following information and generate the script. If you don't require fine-tuning,-->
<!--        click "online pruning" to obtain pruning results immediately. If you need fine-tuning, you'll need-->
<!--        to submit a task and wait for training, which is not yet implemented on this server. All models trained on the COCO dataset-->
<!--        adopt a learning rate of 0.01 during fine-tuning phases.-->
      </div>

      <div style="margin: 0 0 20px 0; text-align: left;">
        <label style="margin-left: 50px; font-size:18px; border: 0; word-wrap: break-word; white-space: pre-wrap; color: #800E25">
          Name: {{modelName}}<br>
          Task: {{modelDataset}}<br>
          Type: {{modelType}}<br>
          mAp: {{modelAcc}}<br>
          Params: {{modelParams}}<br>
          Flops: {{modelFlops}}<br>
          Checkpoint: <el-link target="_blank" :href="'http://10.214.242.155:7996/WorkSpace'+modelPath.split('Torch-Pruning').slice(-1)[0]" :underline="false">
          <el-button size="small" type="success" plain>Download</el-button></el-link><br>
          Model structure: <el-link target="_blank" :href="'http://10.214.242.155:7996/WorkSpace/'+structureBeforePruned.split('Torch-Pruning').slice(-1)[0]" :underline="false">
          <el-button size="small" type="primary" plain>View</el-button></el-link>
        </label>
      </div>
      <!--      click(-->




      <div style="margin: 0 0 20px 0; text-align: left;">
        <label style="margin-left: 50px; font-size:18px; border: 0; color: black; word-wrap: break-word; white-space: pre-wrap;">Step1: Select the importance criterion,
          Yolo models only support L2Norm importance.</label>
      </div>
      <div style="margin: 0 0 20px 0; text-align: left;">
        <el-radio-group style="margin-left: 50px; border: 0; color: black; " v-model="criterion">
          <el-radio label="l2" size="large" border>L2Norm Importance</el-radio>

        </el-radio-group>
      </div>




      <div style="margin: 0 0 20px 0; text-align: left;">
        <label style="margin-left: 50px; font-size:18px; border: 0; color: black; word-wrap: break-word; white-space: pre-wrap;">
          Step2: Choose batch size for evaluation and finetuning. Fine-tuning the YOLO models requires significant GPU memory
          consumption, so we recommend selecting a small batch size.</label>
      </div>
<!--      It is recommended to choose 128, but if the task fails, you could choose a smaller one.-->

      <div style="margin: 0 0 20px 0; text-align: left;">
        <el-radio-group style="margin-left: 50px; border: 0; color: black; " v-model="batchsize">
          <el-radio label=32 size="large" border>4</el-radio>
          <el-radio label=32 size="large" border>8</el-radio>
          <el-radio label=64 size="large" border>16</el-radio>
          <el-radio label=128 size="large" border>32</el-radio>
        </el-radio-group>
      </div>


      <div style="margin: 0 0 20px 0; text-align: left;">
        <label style="margin-left: 50px; font-size:18px; border: 0; color: black; word-wrap: break-word; white-space: pre-wrap;">Step4: Enter the minimum desired
          speedup for the pruned model in terms of FLOPs. This must be a number greater than 1 but not exceeding 10.</label>
      </div>
      <div style="margin: 0 0 20px 0; text-align: left;">
        <el-input
            v-model="speedup"
            placeholder="Please input"
            style="margin-left: 50px; border: 0; color: black; width: 8%"
        />
      </div>

      <div style="margin: 0 0 20px 0; text-align: left;">
        <label style="margin-left: 50px; font-size:18px; border: 0; color: black; word-wrap: break-word; white-space: pre-wrap;">Step5: Choose whether to fine-tune.
          Fine-tuning the YOLO models requires extremely long training time.</label>
      </div>
      <div style="margin: 0 0 20px 0; text-align: left;">
        <el-radio-group style="margin-left: 50px; border: 0; color: black; " v-model="finetune">
          <el-radio label="True" size="large" border>fine-tune</el-radio>
          <el-radio label="False" size="large" border>not fine-tune</el-radio>
        </el-radio-group>
      </div>

      <div v-show="finetune==='True'">
        <div style="margin: 0 0 20px 0; text-align: left;">
          <label style="margin-left: 50px; font-size:18px; border: 0; color: black; word-wrap: break-word; white-space: pre-wrap;">Step6: Input the number of epochs for finetuning (Integer required and 100 is recommend, other hyperparameters have been set to optimal).</label>
        </div>
        <div style="margin: 0 0 20px 0; text-align: left;">
          <el-input
              v-model="epoch"
              placeholder="Please input"
              style="margin-left: 50px; border: 0; color: black; width: 8%"
          />
        </div>

        <div style="margin: 0 0 20px 0; text-align: left;">
          <label style="margin-left: 50px; font-size:18px; border: 0; color: black; word-wrap: break-word; white-space: pre-wrap;">Step7: Select the client and submit the pruning task that needs fine-tuning.</label>
        </div>
        <div style="margin: 0 0 30px 0; text-align: left; width: 100%;">
          <el-radio-group style="margin-left: 60px; border: 0; color: black;" v-model="client155_form">
            <el-radio label="Bar" size="large">Bar charts</el-radio>
            <el-radio label="Pie" size="large">Pie charts</el-radio>
          </el-radio-group>
          <el-radio-group style="margin-left: 50px; border: 0; color: black; width: 100%; display: flex; align-items: flex-start" v-model="client">
            <div style="display: flex; flex-direction: column; width: 40%">
              <el-radio style="width:33%"  label="vipa155_client1" size="large" border>vipa155_client1</el-radio>
              <el-table
                  :data="gpuInfos"
                  style="width: 90%"
                  :border="false"
              >
                <el-table-column min-width="80" fixed prop="name" label="GPU" />
                <el-table-column min-width="80" prop="tot_memory" label="Total Memory">
                  <template #default="props">
                    {{props.row.tot_memory}} MiB
                  </template>
                </el-table-column>
                <el-table-column label="Memory Usage" min-width="160" style="min-height: 180px">
                  <template #default="props">
                    <el-progress v-if="client155_form==='Bar'" :text-inside="true"  class="m-2" :stroke-width="26" :percentage="(100*(props.row.tot_memory - props.row.remain_memory)/props.row.tot_memory).toFixed(1)" :color="colors"  />
                    <div v-else-if="client155_form==='Pie'" :id="'gpuChart_' + props.$index" style="width: 100%; height: 160%; text-align: left; overflow: visible" :ref="'gpuChartRef_' + props.$index"></div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div style="display: flex; flex-direction: column; width: 40%">
              <!--              <el-radio-group style="border: 0; color: black;" v-model="client155_2_form">-->
              <!--                <el-radio label="Bar" size="large">Bar charts</el-radio>-->
              <!--                <el-radio label="Pie" size="large">Pie charts</el-radio>-->
              <!--              </el-radio-group>-->
              <el-radio style="width:33%" label="vipa155_client2" size="large" border>vipa155_client2</el-radio>
              <el-table
                  :data="gpuInfos"
                  style="width: 90%"
                  :border="false"
              >
                <el-table-column min-width="80" fixed prop="name" label="GPU" />
                <el-table-column min-width="80" prop="tot_memory" label="Total Memory">
                  <template #default="props">
                    {{props.row.tot_memory}} MiB
                  </template>
                </el-table-column>
                <el-table-column label="Memory Usage" min-width="160" style="min-height: 180px">
                  <template #default="props">
                    <el-progress v-if="client155_form==='Bar'" :text-inside="true"  class="m-2" :stroke-width="26" :percentage="(100*(props.row.tot_memory - props.row.remain_memory)/props.row.tot_memory).toFixed(1)" :color="colors"  />
                    <div v-else-if="client155_form==='Pie'" :id="'gpuChart2_' + props.$index" style="width: 100%; height: 160%; text-align: left; overflow: visible" :ref="'gpuChartRef2_' + props.$index"></div>
                  </template>
                </el-table-column>
              </el-table>
            </div>

            <el-radio label="Random" size="large" border>Random</el-radio>
          </el-radio-group>
        </div>
      </div>

      <div style="margin: 0 0 20px 0; text-align: center">
<!--        <el-button size="large" type="primary" plain @click="GenerateScript()">Generate Script</el-button>-->
        <!--        原来的OnlinePruning-->
        <el-button v-if="finetune==='False'" size="large" type="warning" plain @click="SubmitTask">Submit Prune-Only Task</el-button>
        <el-button v-else size="large" type="success" plain @click="SubmitTask">Submit Prune-Finetune Task</el-button>
      </div>

      <div style="margin: 0 0 20px 0; text-align: left;">
        <el-input
            v-model="script"
            v-show="scriptVisible"
            autosize
            type="textarea"
            placeholder="Please input"
            style="margin-left: 50px;  border: 0; width: 95%"
        />
      </div>
    </div>
  </el-dialog>















  <!--      imagenet-vgg19_bn-->
  <el-dialog class="scrollable" v-model="ImageNetPrunedialogVisible" style="width:95%; height:95%; text-align: center; overflow: auto; font-family: Arial;"
             :draggable="true" @close="ImageNetPrunedialogVisible = false" :append-to-body="true" title="ImageNet Model Pruning" >
    <div v-loading="resultLoading2">

      <div style="margin: 0 0 20px 0; text-align: left;">
        <label style="margin-left: 50px; font-size:18px; border: 0; word-wrap: break-word; white-space: pre-wrap; color: #000096">ImageNet Tips: Complete the
          following information and generate the script. If you don't require sparse Learning and fine-tuning,
          click "online pruning" to obtain pruning results immediately. If you need sparse Learning or fine-tuning, you'll need
          to submit a task and wait for training, which is not yet implemented on this server. All models trained on the ImageNet dataset
          adopt a learning rate of 0.01 during sparse Learning and fine-tuning phases.</label>
      </div>

      <div style="margin: 0 0 20px 0; text-align: left;">
        <label style="margin-left: 50px; font-size:18px; border: 0; word-wrap: break-word; white-space: pre-wrap; color: #800E25">
          Name: {{modelName}}<br>
          Task: {{modelDataset}}<br>
          Type: {{modelType}}<br>
          Acc: {{modelAcc}}<br>
          Params: {{modelParams}}<br>
          Flops: {{modelFlops}}<br>
          Checkpoint: <el-link target="_blank" :href="'http://10.214.242.155:7996/ckpt'+modelPath.split('checkpoints').slice(-1)[0]" :underline="false">
          <el-button size="small" type="success" plain>Download</el-button></el-link><br>
          Model structure: <el-link target="_blank" :href="'http://10.214.242.155:7996/WorkSpace/'+structureBeforePruned.split('Torch-Pruning').slice(-1)[0]" :underline="false">
          <el-button size="small" type="primary" plain>View</el-button></el-link>
        </label>
      </div>
      <!--      click(-->

      <div style="margin: 0 0 20px 0; text-align: left;">
        <label style="margin-left: 50px; font-size:18px; border: 0; color: black; word-wrap: break-word; white-space: pre-wrap;">Step1: Choose whether to employ sparse learning.
          Without sparse learning, online pruning can be made immediately at a slight sacrifice in accuracy (&lt;1%).</label>
      </div>
      <div style="margin: 0 0 20px 0; text-align: left;">
        <el-radio-group @click="criterion=''" style="margin-left: 50px; border: 0; color: black; " v-model="radio1">
          <el-radio label="sl" size="large" border v-if="INtype==='cnn'">With Sparse Learning</el-radio>
          <el-radio label="wosl" size="large" border>Without Sparse Learning</el-radio>
        </el-radio-group>
      </div>


      <div style="margin: 0 0 20px 0; text-align: left;">
        <label style="margin-left: 50px; font-size:18px; border: 0; color: black; word-wrap: break-word; white-space: pre-wrap;">Step2: Select the pruner,
          the choice of whether to employ sparse learning will determine the available pruner.</label>
      </div>

      <div v-show="radio1==='sl'" style="margin: 0 0 20px 0; text-align: left;">
        <el-radio-group style="margin-left: 50px; border: 0; color: black; " v-model="criterion">
          <el-radio label="slim" size="large" border>BNScale Pruner</el-radio>
          <el-radio label="group_slim" size="large" border>BNScale&GroupLasso Pruner</el-radio>
          <el-radio label="group_sl" size="large" border>GroupNorm Pruner</el-radio>
          <el-radio label="growing_reg" size="large" border>GrowingReg Pruner</el-radio>

        </el-radio-group>
      </div>

      <div v-show="radio1==='wosl' && INtype==='cnn'" style="margin: 0 0 20px 0; text-align: left;">
        <el-radio-group style="margin-left: 50px; border: 0; color: black; " v-model="criterion">
          <el-radio label="l1" size="large" border>Magnitude Pruner</el-radio>
          <el-radio label="random" size="large" border>Magnitude Pruner(random)</el-radio>
          <el-radio label="lamp" size="large" border>BNScale Pruner</el-radio>
          <el-radio label="group_norm" size="large" border>GroupNormPruner</el-radio>

        </el-radio-group>
      </div>




      <!-- <div v-show="INtype==='cnn'" style="margin: 0 0 20px 0; text-align: left;">
        <el-radio-group style="margin-left: 50px; border: 0; color: black; " v-model="criterion">
          <el-radio label="slim" size="large" border>BNScale Pruner</el-radio>

          <el-radio label="group_sl" size="large" border>GroupNorm Pruner</el-radio>
          <el-radio label="group_greg" size="large" border>GrowingReg Pruner</el-radio>

        </el-radio-group>
      </div> -->

      <div v-show="radio1==='wosl' && INtype==='hf'" style="margin: 0 0 20px 0; text-align: left;">
        <el-radio-group style="margin-left: 50px; border: 0; color: black; " v-model="criterion">
          <el-radio label="l1" size="large" border>L1 Pruner</el-radio>
          <el-radio label="random" size="large" border>Random Pruner(random)</el-radio>
          <el-radio label="taylor" size="large" border>Taylor Pruner</el-radio>


        </el-radio-group>
      </div>

      <div v-show="radio1==='wosl' && INtype==='timm'" style="margin: 0 0 20px 0; text-align: left;">
        <el-radio-group style="margin-left: 50px; border: 0; color: black; " v-model="criterion">
          <el-radio label="l1" size="large" border>L1 Pruner</el-radio>
          <el-radio label="l2" size="large" border>L2 Pruner</el-radio>
          <el-radio label="random" size="large" border>Random Pruner(random)</el-radio>
          <el-radio label="taylor" size="large" border>Taylor Pruner</el-radio>
          <el-radio label="hessian" size="large" border>Hessian Pruner</el-radio>

        </el-radio-group>
      </div>

      <div v-show="radio1!='wosl' && radio1!='sl'" style="margin: 0 0 20px 0; text-align: left;">
        <label style="margin-left: 50px; font-size:18px; border: 0; color: black; word-wrap: break-word; white-space: pre-wrap; color: #800E25">Complete Step1 first.</label>
      </div>

      <div style="margin: 0 0 20px 0; text-align: left;">
        <label style="margin-left: 50px; font-size:18px; border: 0; color: black; word-wrap: break-word; white-space: pre-wrap;">Step3: Choose batch size for
          sparse learning, evaluation and finetuning. It is recommended to choose 128, but if the task fails, you could choose a smaller one.</label>
      </div>


      <div style="margin: 0 0 20px 0; text-align: left;">
        <el-radio-group style="margin-left: 50px; border: 0; color: black; " v-model="batchsize">
          <el-radio label=4 size="large" border>4</el-radio>
          <el-radio label=8 size="large" border>8</el-radio>
          <el-radio label=16 size="large" border>16</el-radio>
          <el-radio label=32 size="large" border>32</el-radio>
        </el-radio-group>
      </div>

      <div style="margin: 0 0 20px 0; text-align: left;">
        <label style="margin-left: 50px; font-size:18px; border: 0; color: black; word-wrap: break-word; white-space: pre-wrap;">Step4: Enter the minimum desired
          speedup for the pruned model in terms of FLOPs. This must be a number greater than 1 but not exceeding 10.</label>
      </div>
      <div style="margin: 0 0 20px 0; text-align: left;">
        <el-input
            v-model="speedup"
            placeholder="Please input"
            style="margin-left: 50px; border: 0; color: black; width: 8%"
        />
      </div>

      <div style="margin: 0 0 20px 0; text-align: left;">
        <label style="margin-left: 50px; font-size:18px; border: 0; color: black; word-wrap: break-word; white-space: pre-wrap;">Step5: Choose whether to fine-tune.
          Fine-tuning the Vit models requires extremely long training time.</label>
      </div>
      <div style="margin: 0 0 20px 0; text-align: left;">
        <el-radio-group style="margin-left: 50px; border: 0; color: black; " v-model="finetune">
          <el-radio label="True" size="large" border>fine-tune</el-radio>
          <el-radio label="False" size="large" border>not fine-tune</el-radio>
        </el-radio-group>
      </div>

      <div v-show="finetune==='True'">
        <div style="margin: 0 0 20px 0; text-align: left;">
          <label style="margin-left: 50px; font-size:18px; border: 0; color: black; word-wrap: break-word; white-space: pre-wrap;">Step6: Input the number of epochs for finetuning (Integer required and 100 is recommend, other hyperparameters have been set to optimal).</label>
        </div>
        <div style="margin: 0 0 20px 0; text-align: left;">
          <el-input
              v-model="epoch"
              placeholder="Please input"
              style="margin-left: 50px; border: 0; color: black; width: 8%"
          />
        </div>

        <div style="margin: 0 0 20px 0; text-align: left;">
          <label style="margin-left: 50px; font-size:18px; border: 0; color: black; word-wrap: break-word; white-space: pre-wrap;">Step7: Select the client and submit the pruning task that needs fine-tuning.</label>
        </div>
        <div style="margin: 0 0 30px 0; text-align: left; width: 100%;">
          <el-radio-group style="margin-left: 60px; border: 0; color: black;" v-model="client155_form">
            <el-radio label="Bar" size="large">Bar charts</el-radio>
            <el-radio label="Pie" size="large">Pie charts</el-radio>
          </el-radio-group>
          <el-radio-group style="margin-left: 50px; border: 0; color: black; width: 100%; display: flex; align-items: flex-start" v-model="client">
            <div style="display: flex; flex-direction: column; width: 40%">
              <el-radio style="width:33%"  label="vipa155_client1" size="large" border>vipa155_client1</el-radio>
              <el-table
                  :data="gpuInfos"
                  style="width: 90%"
                  :border="false"
              >
                <el-table-column min-width="80" fixed prop="name" label="GPU" />
                <el-table-column min-width="80" prop="tot_memory" label="Total Memory">
                  <template #default="props">
                    {{props.row.tot_memory}} MiB
                  </template>
                </el-table-column>
                <el-table-column label="Memory Usage" min-width="160" style="min-height: 180px">
                  <template #default="props">
                    <el-progress v-if="client155_form==='Bar'" :text-inside="true"  class="m-2" :stroke-width="26" :percentage="(100*(props.row.tot_memory - props.row.remain_memory)/props.row.tot_memory).toFixed(1)" :color="colors"  />
                    <div v-else-if="client155_form==='Pie'" :id="'gpuChart_' + props.$index" style="width: 100%; height: 160%; text-align: left; overflow: visible" :ref="'gpuChartRef_' + props.$index"></div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div style="display: flex; flex-direction: column; width: 40%">
              <!--              <el-radio-group style="border: 0; color: black;" v-model="client155_2_form">-->
              <!--                <el-radio label="Bar" size="large">Bar charts</el-radio>-->
              <!--                <el-radio label="Pie" size="large">Pie charts</el-radio>-->
              <!--              </el-radio-group>-->
              <el-radio style="width:33%" label="vipa155_client2" size="large" border>vipa155_client2</el-radio>
              <el-table
                  :data="gpuInfos"
                  style="width: 90%"
                  :border="false"
              >
                <el-table-column min-width="80" fixed prop="name" label="GPU" />
                <el-table-column min-width="80" prop="tot_memory" label="Total Memory">
                  <template #default="props">
                    {{props.row.tot_memory}} MiB
                  </template>
                </el-table-column>
                <el-table-column label="Memory Usage" min-width="160" style="min-height: 180px">
                  <template #default="props">
                    <el-progress v-if="client155_form==='Bar'" :text-inside="true"  class="m-2" :stroke-width="26" :percentage="(100*(props.row.tot_memory - props.row.remain_memory)/props.row.tot_memory).toFixed(1)" :color="colors"  />
                    <div v-else-if="client155_form==='Pie'" :id="'gpuChart2_' + props.$index" style="width: 100%; height: 160%; text-align: left; overflow: visible" :ref="'gpuChartRef2_' + props.$index"></div>
                  </template>
                </el-table-column>
              </el-table>
            </div>

            <el-radio label="Random" size="large" border>Random</el-radio>
          </el-radio-group>
        </div>
      </div>

      <div style="margin: 0 0 20px 0; text-align: center">
<!--        <el-button size="large" type="primary" plain @click="GenerateScript()">Generate Script</el-button>-->
        <!--        原来的OnlinePruning-->
        <el-button v-if="finetune==='False'" size="large" type="warning" plain @click="SubmitTask">Submit Prune-Only Task</el-button>
        <el-button v-else size="large" type="success" plain @click="SubmitTask">Submit Prune-Finetune Task</el-button>
      </div>

      <div style="margin: 0 0 20px 0; text-align: left;">
        <el-input
            v-model="script"
            v-show="scriptVisible"
            autosize
            type="textarea"
            placeholder="Please input"
            style="margin-left: 50px;  border: 0; width: 95%"
        />
      </div>
    </div>
  </el-dialog>


</template>

<script lang="ts" setup>
import { UploadFilled } from '@element-plus/icons-vue'
import * as echarts from 'echarts'
import {ElMessage, UploadInstance, UploadProps} from "element-plus";
import {getCurrentInstance, onBeforeUnmount, ref, watch} from 'vue';
import axios from "axios";
import {useStore} from "vuex";
import request from "@/api";
import {router} from "@/router";

import $ from 'jquery'
import * as d3 from 'd3';
import { reactive, onMounted} from "vue";
import '@fortawesome/fontawesome-free/css/all.css'
import request2 from "@/api";

import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const myIcon = ref('<')
const myIcon2 = ref('>')
const resultLoading4 = ref(false)
const flag_prune_done = ref(false)  //是否剪枝完成
const resultShow_tree_result = ref(false)  //剪枝完的结果是否展示

const isCollapse = ref(true)

const isCollapseDiv = ref(true)

const percentage = ref(0)
const percentage2 = ref(0)
const colors = [
  { color: '#20BD1C', percentage: 20 },
  { color: '#5cb87a', percentage: 40 },
  { color: '#e6a23c', percentage: 60 },
  { color: '#f56c6c', percentage: 80 },
  { color: '#FE0A10', percentage: 100 },
]

// 使用ref创建一个变量，用于记录已上传的文件

const structureBeforePruned = ref('')
const structureAfterPruned = ref('')
const logPath = ref('')
const uploadType = ref('')

const isPruned = ref(false)

// const isTest = ref(false)


const modelType = ref('')
const modelTypeSimple = ref('')
const modelPath = ref('')
const modelAcc = ref(0)
const modelParams = ref('')
const modelFlops = ref('')
const modelName = ref('')
const modelDataset = ref('')

const modelDatasetSimple = ref('')

const paramsChange = ref('')
const FLOPsChange = ref('')
const AccChange = ref('')
const LossChange = ref('')

const PrunedPath = ref('')
const ckpt = ref('')

const usrModelName = ref('')
const script = ref('')
const speedup = ref()
const batchsize = ref(0)
const finetune = ref('')
const criterion = ref('')
const radio1 = ref('wosl')
const INtype = ref('cnn')
const PrunedialogVisible = ref(false);
const PruneCOCOdialogVisible = ref(false);
const ImageNetPrunedialogVisible = ref(false);
const uploadRef = ref<UploadInstance>();
const uploadRef2 = ref<UploadInstance>();
const uploadRef3 = ref<UploadInstance>();
const uploadFileList = ref([]);
const uploadFileList2 = ref([]);
const uploadFileList3 = ref([]);
const store = useStore();
const userQuery = ref('')
const Email = ref('')
const Infos = ref('')
const morf = ref('')
const lerf = ref('')
const client = ref('')
const gpuName = ref('')
const gpuTotMem = ref(0)
const gpuRemainMem = ref(0)
const gpuInfos = ref();
const pythonValue = ref('')
const servers = ref([])
const servers2 = ref([])
const currentPage = ref(1)
const currentPage2 = ref(1)
const perPage = ref(8)
// const perPage2 = ref(8)
const score = ref(0.0)
const rank = ref(666)
let resultLoading = ref(false)
let resultShow = ref(false)
const morfUploaded = ref(false)
const lerfUploaded = ref(false)
const pythonUploaded = ref(false)
const lr = ref(0)
// const lerfUploaded = ref(false)
let checkCsv = ref(false)
let checkCsv2 = ref(false)
let checkPython = ref(false)


const { proxy: ctx } = getCurrentInstance()




//
// //初始化图表
// let myChart = echarts.init(document.getElementById('gpuChart') );
// //配置图表的参数
// let option = {
//   title: {
//     text:'扇形图示例'
//   },
//   series : [
//     {
//       name:'数据',
//       type: 'pie' ,
//       radius: '50%',
//       data: [
//           {value: 335,  name:'数据1'},
//           {value: 310,  name:'数据2'},
//           {value: 234,  name:'数据3'}
//       ]
//     }
//   ]
// };
// //使用配置项显示图表
// myChart.setOption(option);



const style = ref({
  pagination: {
    marginTop: '20px'
  },
  down: {
    marginBottom: '20px'
  }
})


const fields = ref([
  {
    key: 'ranking',
    label: 'Ranking',
    class: 'text-center'
  },
  {
    key: 'username',
    label: 'contributor',
    sortable: true,
    class: 'text-center'
  },
  {
    key: 'institute',
    label: 'institute',
    sortable: true,
    class: 'text-center'
  },
  {
    key: 'name',
    label: 'algorithm',
    class: 'text-center'
  },
  {
    key: 'score',
    label: 'metascore',
    stickyColumn: true,
    class: 'text-center'
  }
])

var nodes;
var dragStarted;
var domNode;

const jumpOut = ref(false);
const UploadVisible = ref(false);
const scriptVisible = ref(false);
const dialogVisible = ref(false);
const dialogVisible2 = ref(false);
const dialogVisible_interp = ref(false);
const dialogVisible_atenhoc = ref(false);
const dialogVisible_posthoc = ref(false);
const dialogVisible_local = ref(false);
const dialogVisible_global = ref(false);
const dialogVisible_attention = ref(false);
const dialogVisible_tree = ref(false);
const dialogVisible_intro_concept = ref(false);
const dialogVisible_intro_constituent = ref(false);
const resultLoading2 = ref(false)
const ckptUploaded = ref(false)
const modelzoo = ref();
const epoch = ref();
const sl_total_epochs = ref();
const iterative_steps = ref();
const optionList = []
const client155_1_form = ref('Pie');
const client155_2_form = ref('Pie');
const client155_form = ref('Pie')


// dialogVisible_global

const activeTab = ref('cn')

//gpuChartRef

// 监听 finetune 变量的变化
// watch(finetune, (newValue, oldValue) => {
//   if (newValue === 'True') {
//     // 执行 finetune 为 True 时的操作
//     console.log('finetune 变为 True，执行操作...');
//     setTimeout(() => {
//       //初始化图表
//       for(let i=0; i<optionList.length; i++){
//         let myChart = echarts.init(document.getElementById('gpuChart_'+i));
//         myChart.setOption(optionList[i]);
//       }
//     }, 200)  //要延迟200毫秒才能挂载
//   }
// });

watch(client155_form, (newValue, oldValue) => {
  if (newValue === 'Pie') {
    // 执行 finetune 为 True 时的操作
    console.log('设定为Pie，执行操作...');
    setTimeout(() => {
      //初始化图表
      for(let i=0; i<optionList.length; i++){
        let myChart = echarts.init(document.getElementById('gpuChart_'+i));
        myChart.setOption(optionList[i]);
      }
    }, 200)  //要延迟200毫秒才能挂载
  }
});

watch(client155_form, (newValue, oldValue) => {
  if (newValue === 'Pie') {
    // 执行 finetune 为 True 时的操作
    console.log('设定为Pie，执行操作...');
    setTimeout(() => {
      //初始化图表
      for(let i=0; i<optionList.length; i++){
        let myChart2 = echarts.init(document.getElementById('gpuChart2_'+i));
        myChart2.setOption(optionList[i]);
      }
    }, 200)  //要延迟200毫秒才能挂载
  }
});

// watch(client155_2_form, (newValue, oldValue) => {
//   if (newValue === 'Pie') {
//     // 执行 finetune 为 True 时的操作
//     console.log('设定为Pie，执行操作...');
//     setTimeout(() => {
//       //初始化图表
//       for(let i=0; i<optionList.length; i++){
//         let myChart2 = echarts.init(document.getElementById('gpuChart2_'+i));
//         myChart2.setOption(optionList[i]);
//       }
//     }, 200)  //要延迟200毫秒才能挂载
//   }
// });

function toggleCollapse () {
  // if(isCollapse.value){
  //   myIcon.value = '<'
  // }else{
  //   myIcon.value = '>'
  // }
  isCollapse.value = !isCollapse.value
  // //等待半秒钟
  // isCollapseDiv.value = isCollapseDiv.value != true;

  isCollapseDiv.value = !isCollapseDiv.value;


  // 等待半秒钟
  // setTimeout(() => {
  //   isCollapseDiv.value = !isCollapseDiv.value;
  // }, 500); // 500毫秒等待时间
}

function showDialog() {
  console.log("进来了")
  dialogVisible.value = true;
}
function showDialog_interp() {
  // console.log("进来了")
  dialogVisible_interp.value = true;
}
function showDialog_atenhoc() {
  // console.log("进来了")
  dialogVisible_atenhoc.value = true;
}
function showDialog_posthoc() {
  // console.log("进来了")
  dialogVisible_posthoc.value = true;
}
function showDialog_local() {
  // console.log("进来了")
  dialogVisible_local.value = true;
}
function showDialog_global() {
  // console.log("进来了")
  dialogVisible_global.value = true;
}
function showDialog_attention() {
  // console.log("进来了")
  dialogVisible_attention.value = true;
}
function showDialog_tree() {
  // console.log("进来了")
  dialogVisible_tree.value = true;
}
function showDialog_intro_concept() {
  // console.log("进来了")
  dialogVisible_intro_concept.value = true;
}
function showDialog_intro_Constituent() {
  // console.log("进来了")
  dialogVisible_intro_constituent.value = true;
}

// const getModelZoo = () => {
//   request2.post(`/user/getModelZoo`, {
//   })
//       .then((response) => {
//         let ranks = response.data
//         // console.log("response.data.data", response.data.data)
//         console.log("ranks: ", ranks)
//         // ranks = ranks.map(addSelectField)
//         // for (let rank of ranks) {
//         //     rank.link = '详情'
//         // }
//         // console.log('getranks')
//         modelzoo.value = ranks
//       })
//       .catch((errors) => {
//         console.log('error', errors)
//       })
// }

//
//OnlinePruning
const SubmitTask = () => {
  let tempScript
  console.log("speedup.value:", speedup.value)
  // let flag = true
  if(radio1.value!='sl'&&radio1.value!='wosl'){
    ElMessage.error("Choose whether to employ sparse learning!")
  }else if(radio1.value==='sl'&&finetune.value!=='True'){
    ElMessage.error("If sparse training is selected, fine-tuning must be selected as well!")
  }else if(criterion.value===''){
    ElMessage.error("Select the pruner!")
  }else if(batchsize.value===0){
    ElMessage.error("Choose the batch size for sparse learning, evaluation and finetuning!")
  }else if(speedup.value<=1||speedup.value>10||speedup.value===undefined||speedup.value===''){
    ElMessage.error("Speedup must be a number greater than 1 and not exceeding 10!")
  }else if(sl_total_epochs.value<1||sl_total_epochs.value>100||sl_total_epochs.value===undefined||sl_total_epochs.value===''){
    ElMessage.error("Epochs for sparse learning must be a number not smaller than 1 and not exceeding 100!")
  }else if(iterative_steps.value<1||iterative_steps.value>400||iterative_steps.value===undefined||iterative_steps.value===''){
    ElMessage.error("Iterative steps for pruning must be a number not smaller than 1 and not exceeding 400!")
  }else if(finetune.value===''){
    ElMessage.error("Choose whether to fine-tune!")
    // isNaN()函数用于判断给定的值是否是一个数字。Number.isInteger()函数用于检测给定的值是否是一个整数
  }else if(finetune.value==='True'&&(epoch.value===undefined||epoch.value===null|| isNaN(epoch.value) || !Number.isInteger(Number(epoch.value)))) {
    ElMessage.error("Input/Correct the number of epochs for finetuning!")
  }else if(finetune.value==='True'&&(client.value==='')) {
    ElMessage.error("Client is required for Prune-Finetune Task!")
  }else {
    let modelname = ''
    if (modelName.value === "ResNet56(tiny)") {
      modelname = "resnet56"
    } else if (modelName.value === "SE-ResNet20") {
      modelname = "se_resnet20"
    } else {
      modelname = modelName.value
    }
    modelname = modelname.toLowerCase()
    let dataroot
    let dataset
    let sl
    if (modelDataset.value === 'CIFAR10 (Classification)') {
      dataroot = '/nfs/lhl/datasets/cifar/cifar-10-batches-py'
      dataset = 'cifar10'
    } else if (modelDataset.value === 'CIFAR100 (Classification)') {
      dataroot = '/nfs/lhl/datasets/cifar/cifar-100-python'
      dataset = 'cifar100'
    }else if(modelDataset.value==='ImageNet (Classification)'){
      dataroot = '/nfs/lhl/datasets/ILSVRC2012'
      dataset = 'imagenet'
    }else if(modelDataset.value==='COCO (Detection)'){
      dataroot = ''
      dataset = 'coco'
    }
    if(radio1.value==="sl"){
      sl = 'True'
    }else if(radio1.value==="wosl"){
      sl = 'False'
    }

    if(finetune.value==='False'){
      epoch.value = '90'
      client.value = 'NULL'
    }

    if(dataset == 'imagenet'){
      if(modelname=='resnet50'){
        tempScript = "python /nfs/lhl/Torch-Pruning/benchmarks/main_imagenet.py --mode prune --pretrained --epochs " + epoch.value + " --model "+modelname+" --batch-size "+batchsize.value+" --lr " + lr.value + " --prune --cache-dataset --data-path "+dataroot+" --output-dir /nfs/lhl/Torch-Pruning/benchmarks/log/prune  --method "+criterion.value+" --global-pruning --soft-keeping-ratio 0.5 --target-flops "+speedup.value+" --global-pruning --print-freq 100 --workers 8 --finetune "+finetune.value + " --client " + client.value
      }else if(modelname=='densenet121'){
        tempScript = "python /nfs/lhl/Torch-Pruning/benchmarks/main_imagenet.py --mode prune --pretrained --epochs " + epoch.value + " --model "+modelname+" --batch-size "+batchsize.value+" --lr " + lr.value + " --lr-step-size 30 --sl-lr-step-size 10 --prune --cache-dataset --reg 1e-4 --data-path "+dataroot+" --output-dir /nfs/lhl/Torch-Pruning/benchmarks/log/prune  --method "+criterion.value+" --soft-keeping-ratio 0.25 --target-flops "+speedup.value+" --global-pruning --print-freq 100 --workers 16 --amp --finetune "+finetune.value + " --client " + client.value
      }else if(modelname=='mobilenetv2'){
        modelname = 'mobilenet_v2'
        tempScript = "python /nfs/lhl/Torch-Pruning/benchmarks/main_imagenet.py --mode prune --pretrained --epochs " + epoch.value + " --model "+modelname+" --batch-size "+batchsize.value+" --lr " + lr.value + " --wd 0.00004 --lr-step-size 1 --lr-gamma 0.98 --prune --cache-dataset --data-path "+dataroot+" --output-dir /nfs/lhl/Torch-Pruning/benchmarks/log/prune  --method "+criterion.value+" --global-pruning --soft-keeping-ratio 0.5 --target-flops "+speedup.value+" --finetune "+finetune.value+  " --client " + client.value
      }else if(modelname=='vgg19_bn'||modelname=='vgg16_bn'){
        tempScript = "python /nfs/lhl/Torch-Pruning/benchmarks/main_imagenet.py --mode prune --pretrained --epochs " + epoch.value + " --model "+modelname+" --batch-size "+batchsize.value+" --lr " + lr.value + " --wd 0.00004 --lr-step-size 1 --lr-gamma 0.98 --prune --cache-dataset --data-path "+dataroot+" --output-dir /nfs/lhl/Torch-Pruning/benchmarks/log/prune  --method "+criterion.value+" --global-pruning --soft-keeping-ratio 0.5 --target-flops "+speedup.value+" --finetune "+finetune.value + " --client " + client.value
      }else if(modelname=='deit_b_16(timm)'){
        if(finetune.value==='False'){
          tempScript = "python /nfs/lhl/Torch-Pruning/transformers/prune_timm_deit.py  --test_accuracy --val_batch_size  "+batchsize.value+" --speed-up "+speedup.value+" --mode prune --finetune "+finetune.value+" --pruning_type "+criterion.value+ " --client " + client.value
        }else{
          tempScript = "torchrun --nproc_per_node=4 /nfs/lhl/Torch-Pruning/transformers/finetune.py --model "+ modelPath.value +" --epochs "+ epoch.value +" --pruning_type "+criterion.value+" --batch-size "+ batchsize.value +" --opt adamw --lr 0.00015 --wd 0.3 --lr-scheduler cosineannealinglr --lr-warmup-method linear --lr-warmup-epochs 0 --lr-warmup-decay 0.033 --amp --label-smoothing 0.11 --mixup-alpha 0.2 --auto-augment ra --clip-grad-norm 1 --ra-sampler --random-erase 0.25 --cutmix-alpha 1.0  --output-dir output/vit_b_16_pruning_taylor_uniform_v2"+ " --finetune "+finetune.value + " --client " + client.value + " --speed-up "+speedup.value+" --model_name deit_b_16(timm) --timm_type deit"
        } 
    }else if(modelname=='vit_b_16(timm)'){
      if(finetune.value==='False'){
          tempScript = "python /nfs/lhl/Torch-Pruning/transformers/prune_timm_vit.py  --test_accuracy --val_batch_size  "+batchsize.value+" --speed-up "+speedup.value+" --mode prune --finetune "+finetune.value+" --pruning_type "+criterion.value+ " --client " + client.value
        }else{
          tempScript = "torchrun --nproc_per_node=4 /nfs/lhl/Torch-Pruning/transformers/finetune.py --model "+ modelPath.value +" --epochs "+ epoch.value +" --pruning_type "+criterion.value+" --batch-size "+ batchsize.value +" --opt adamw --lr 0.00015 --wd 0.3 --lr-scheduler cosineannealinglr --lr-warmup-method linear --lr-warmup-epochs 0 --lr-warmup-decay 0.033 --amp --label-smoothing 0.11 --mixup-alpha 0.2 --auto-augment ra --clip-grad-norm 1 --ra-sampler --random-erase 0.25 --cutmix-alpha 1.0  --output-dir output/vit_b_16_pruning_taylor_uniform_v2"+ " --finetune "+finetune.value + " --client " + client.value + " --speed-up "+speedup.value
      } 
    }else if(modelname=='vit_b_16(hf)'){
      if(finetune.value==='False'){
          tempScript = "python /nfs/lhl/Torch-Pruning/transformers/prune_hf_vit.py  --test_accuracy --val_batch_size  "+batchsize.value+" --speed-up "+speedup.value+" --mode prune --finetune "+finetune.value+" --pruning_type "+criterion.value+ " --client " + client.value
        }else{
          tempScript = "torchrun --nproc_per_node=4 /nfs/lhl/Torch-Pruning/transformers/finetune.py --model "+ modelPath.value +" --epochs "+ epoch.value +" --pruning_type "+criterion.value+" --batch-size "+ batchsize.value +" --opt adamw --lr 0.00015 --wd 0.3 --lr-scheduler cosineannealinglr --lr-warmup-method linear --lr-warmup-epochs 0 --lr-warmup-decay 0.033 --amp --label-smoothing 0.11 --mixup-alpha 0.2 --auto-augment ra --clip-grad-norm 1 --ra-sampler --random-erase 0.25 --cutmix-alpha 1.0  --output-dir output/vit_b_16_pruning_taylor_uniform_v2"+ " --finetune "+finetune.value + " --client " + client.value + " --speed-up "+speedup.value+" --is_huggingface --model_name vit_b_16(hf)"
        } 
    }

    }else if(dataset == 'cifar10' || dataset == 'cifar100'){
      tempScript = "python /nfs/lhl/Torch-Pruning/benchmarks/main_system.py --mode prune --model "+modelname+" --batch-size "+batchsize.value+" --restore " + modelPath.value + " --dataroot "+dataroot+" --output-dir /nfs/lhl/Torch-Pruning/benchmarks/log/prune --pretrain False  --dataset "+dataset+"  --method "+criterion.value+" --speed-up "+speedup.value+" --global-pruning --reg 5e-4 --sl "+sl+" --finetune "+finetune.value+ " --total-epochs " + epoch.value + " --client " + client.value + " --iterative-steps " + iterative_steps.value
      if(radio1.value==='sl'){
        tempScript += " --sl-total-epochs " + sl_total_epochs.value
      }
    }else if(dataset == 'coco'){
      if(modelname == 'yolov7'){
        if(finetune.value==='False'){
          tempScript = "python /nfs/lhl/Torch-Pruning/yolov7/yolov7_detect_pruned.py --conf 0.25 --img-size 640  --batch-size "+batchsize.value+" --speed-up "+speedup.value+" --mode prune --finetune "+finetune.value + " --client " + client.value  + " --weights " + modelPath.value
        }else{
          tempScript = "python /nfs/lhl/Torch-Pruning/yolov7/yolov7_train_pruned.py --workers 8 --device 0 --batch-size "+batchsize.value+" --data /nfs/lhl/Torch-Pruning/yolov7/data/coco.yaml --img 640 640 --cfg /nfs/lhl/Torch-Pruning/yolov7/cfg/training/yolov7.yaml "+ " --weights " + modelPath.value +" --name yolov7 --hyp /nfs/lhl/Torch-Pruning/yolov7/data/hyp.scratch.p5.yaml" + " --finetune "+finetune.value + " --client " + client.value + " --speed-up "+speedup.value + " --epochs "+epoch.value
        }
      } else if(modelname == 'yolov8')
      tempScript = "python /nfs/lhl/Torch-Pruning/yolov8/yolov8_pruning.py   --batch-size "+batchsize.value+" --speed-up "+speedup.value+" --mode prune --finetune "+finetune.value
      else if(modelname == 'yolov5'){
        if(finetune.value==='False'){
          tempScript = "python /nfs/lhl/Torch-Pruning/yolov7/yolov5_detect_pruned.py --conf 0.25 --img-size 640  --batch-size "+batchsize.value+" --speed-up "+speedup.value+" --mode prune --finetune "+finetune.value + " --client " + client.value  + " --weights " + modelPath.value
        }else{
          tempScript = "python /nfs/lhl/Torch-Pruning/yolov7/yolov7_train_pruned.py --workers 8 --device 0 --batch-size "+batchsize.value+" --data /nfs/lhl/Torch-Pruning/yolov7/data/coco.yaml --img 640 640 --cfg /nfs/lhl/Torch-Pruning/yolov7/cfg/training/yolov7.yaml "+ " --weights " + modelPath.value +" --name yolov7 --hyp /nfs/lhl/Torch-Pruning/yolov7/data/hyp.scratch.p5.yaml" + " --finetune "+finetune.value + " --client " + client.value + " --speed-up "+speedup.value + " --epochs "+epoch.value
        }
      }
      // tempScript = "python /nfs/lhl/Torch-Pruning/yolov7/yolov7_detect_pruned.py --conf 0.25 --img-size 640  --batch-size "+batchsize.value+" --speed-up "+speedup.value+" --mode prune --finetune "+finetune.value+ " --total-epochs " + epoch.value + " --client " + client.value
    }
    // console.log("script.value: ", script.value)
    // tempScript = "python /nfs/lhl/Torch-Pruning/benchmarks/main_system.py --mode prune --model " + modelname + " --batch-size " + batchsize.value + " --restore " + modelPath.value + " --dataroot " + dataroot + " --output-dir /nfs/lhl/Torch-Pruning/benchmarks/log/prune --pretrain False  --dataset " + dataset + "  --method " + criterion.value + " --speed-up " + speedup.value + " --global-pruning --reg 5e-4 --sl " + sl + " --finetune " + finetune.value


    console.log("tempScript: ", tempScript)
    resultLoading2.value = true
    let success = ''
    resultShow_tree_result.value = false
    flag_prune_done.value = false

    //可能不需要这一步，直接改后端
    // request.post('/algorithm/submitPruneAlgorithm', {
    //   algorithmName: 'cifarAlgorithm',
    //   datasetId: batchsize.value,
    //   datasetName: dataset,
    //   modelName: tempScript,
    //   userName: tempScript,
    // }).then((response) => {
    //   flag = true
    //   //先返回log file, 后面说进度条的事
    //   console.log("prune response.data", response.data)
    //   //下面都删掉,success改为waiting
    //   let arr = response.data.data.result
    //   logPath.value = arr[0]
    //   console.log("logPath:", logPath.value)
    //   // percentage.value = 100
    //   // 取出最后7行
    //   let lastFourRows = arr.slice(-7);
    //
    //   success = lastFourRows[6]
    //
    //   console.log("success:", success)
    //
    //
    //   if (success === 'Success') {
    //     paramsChange.value = lastFourRows[0]
    //     FLOPsChange.value = lastFourRows[1]
    //     AccChange.value = lastFourRows[2]
    //     LossChange.value = lastFourRows[3]
    //     PrunedPath.value = lastFourRows[4]
    //     structureAfterPruned.value = lastFourRows[5]
    //     // logPath.value = lastFourRows[6]
    //     // ElMessage.success('Task completed successfully!')
    //   } else {
    //     paramsChange.value = 'Params: N/A'
    //     FLOPsChange.value = 'FLOPs: N/A'
    //     if(dataset == 'coco'){
    //       AccChange.value = 'mAp: N/A'
    //     }else{
    //       AccChange.value = 'Acc: N/A'
    //     }
    //     LossChange.value = 'Val Loss: N/A'
    //     PrunedPath.value = 'N/A'
    //     structureAfterPruned.value = 'N/A'
    //     // logPath.value = 'N/A'
    //     // ElMessage.error('Task failed!')
    //   }
    //   console.log("paramsChange.value", paramsChange.value)
    //   console.log("FLOPsChange.value", FLOPsChange.value)
    //   console.log("AccChange.value", AccChange.value)
    //   console.log("LossChange.value", LossChange.value)
    //   console.log("PrunedPath.value", PrunedPath.value)
    //   console.log("success:", success)
    //   resultShow_tree_result.value = true
    //   resultLoading4.value = false
    //   flag_prune_done.value = true
    //   // dialogVisible.value = true
    // })
    //     .catch((error) => {
    //       console.error(error)
    //     })
    // logPath.value = 'test_log_path'



    //首先解决date是字符串排序异常的问题
    //存到后端数据库，数据库的history需要增加训练epoch数，当前epoch数，是否为要训练的记录，训练的服务器（前端增加训练的服务器的选择，服务器下要有剩余显存和任务数）

    // 服务器给对应客户端分发任务(服务器也要发消息，但只有有任务的时候才发，不是频繁的心跳包，服务器给客户端发消息的端口应该不同，每个客户端的端口用map存储)

    // 多个客户端一起发消息的实现

    // 客户端数据库表的设计需要任务有是在训练还是在等待还是完成的字段

    // 客户端根据等待时间训练一个

    // 客户端的心跳包需要表面自己的身份（哪个服务器，是否有任务在训练，服务器端口固定50016）


      let taskType = ''

      if (finetune.value === 'False') {
          taskType = 'Directly Pruned'
      }else if (finetune.value === 'True') {
        if(radio1.value==='sl'){
          taskType = 'Sparse learning --> Pruned --> Fine-tuned'
        }else{
          taskType = 'Pruned --> Fine-tuned'
        }
      }

      // if(dataset == 'coco'){
      //   if (finetune.value === 'False') {
      //     taskType = 'Directly Pruned'
      //   }else if (finetune.value === 'True') {
      //     taskType = 'Pruned --> Fine-tuned'
      //   }
      // }else{
      //   if (radio1.value === 'wosl' && finetune.value === 'False') {
      //     taskType = 'Directly Pruned'
      //   } else if (radio1.value === 'sl' && finetune.value === 'False') {
      //     taskType = 'Sparse learning --> Pruned'
      //   } else if (radio1.value === 'wosl' && finetune.value === 'True') {
      //     taskType = 'Pruned --> Fine-tuned'
      //   } else if (radio1.value === 'sl' && finetune.value === 'True') {
      //     taskType = 'Sparse learning --> Pruned --> Fine-tuned'
      //   }
      // }

      success = 'Waiting'
      let temp1 = {
        username: store.state.username + " " + epoch.value + " " + criterion.value,
        modelname: modelName.value + "-" + modelDatasetSimple.value + "-" + modelTypeSimple.value,
        tasktype: taskType,
        checkpointpath: modelPath.value,
        status: success,
        paramschange: 'Params: N/A',
        flopschange: 'FLOPs: N/A',
        accchange: 'Acc: N/A',
        losschange: 'Val Loss: N/A',
        prunedpath: 'N/A',
        structurebeforepruned: structureBeforePruned.value,
        structureafterpruned: 'N/A',
        logpath: 'N/A',
        script: tempScript,
        client: client.value
      };
      console.log("history record:", temp1)
      axios.post(`/user/SubmitTrainingHistory`, temp1)
          .then((response) => {
            // console.log("temp1: ", temp1)
            if (response.status === 200) {
              if (success === 'Waiting') {
                ElMessage({
                  showClose: true,
                  message: 'Pruning task has been submitted.',
                  type: 'success',
                  duration: 6000
                })
              }
            }
          })
          .catch((errors) => {
            if (success === 'Waiting') {
              ElMessage({
                showClose: true,
                message: 'Sorry, task submission has failed.',
                type: 'error',
                duration: 6000
              })
            }
            console.log('error', errors)
          })
      resultLoading2.value = false
      PrunedialogVisible.value = false
      PruneCOCOdialogVisible.value = false
      ImageNetPrunedialogVisible.value = false


  }
}

//OnlinePruning
const updateTree =  async () => {
  // resultLoading.value = true
  // jumpOut.value = false
  // isTest.value = false
  let modelname = ''
  if (modelName.value === "ResNet56(tiny)") {
    modelname = "resnet56"
  } else if (modelName.value === "SE-ResNet20") {
    modelname = "se_resnet20"
  } else {
    modelname = modelName.value
  }
  modelname = modelname.toLowerCase()
  let dataroot
  let dataset
  if (modelDataset.value === 'CIFAR10 (Classification)') {
    dataroot = '/nfs/lhl/datasets/cifar/cifar-10-batches-py'
    dataset = 'cifar10'
  } else if (modelDataset.value === 'CIFAR100 (Classification)') {
    dataroot = '/nfs/lhl/datasets/cifar/cifar-100-python'
    dataset = 'cifar100'
  }else if(modelDataset.value==='ImageNet (Classification)'){
    dataroot = '/nfs/lhl/datasets/ILSVRC2012'
    dataset = 'imagenet'
  }else if(modelDataset.value==='COCO (Detection)'){
    dataroot = ''
    dataset = 'coco'
  }
  let tempScript
  if(dataset == 'imagenet'){
    if(modelname=='resnet50'){
      tempScript = "python /nfs/lhl/Torch-Pruning/benchmarks/main_imagenet.py --mode test_prune --pretrained --epochs 90 --model "+modelname+" --batch-size 128 --lr 0.01 --prune --cache-dataset --data-path "+dataroot+" --output-dir /nfs/lhl/Torch-Pruning/benchmarks/log/prune  --method group_norm --global-pruning --soft-keeping-ratio 0.5 --target-flops 2.1 --global-pruning --print-freq 100 --workers 8 --finetune False"
    }else if(modelname=='densenet121'){
      tempScript = "python /nfs/lhl/Torch-Pruning/benchmarks/main_imagenet.py --mode test_prune --pretrained --epochs 90 --model "+modelname+" --batch-size 128 --lr 0.01 --lr-step-size 30 --sl-lr-step-size 10 --prune --cache-dataset --reg 1e-4 --data-path "+dataroot+" --output-dir /nfs/lhl/Torch-Pruning/benchmarks/log/prune  --method group_norm --soft-keeping-ratio 0.25 --target-flops 2.1 --global-pruning --print-freq 100 --workers 16 --amp --finetune False"
    }else if(modelname=='mobilenetv2'){
      tempScript = "python /nfs/lhl/Torch-Pruning/benchmarks/main_imagenet.py --mode test_prune --pretrained --epochs 90 --model "+modelname+" --batch-size 128 --lr 0.01 --wd 0.00004 --lr-step-size 1 --lr-gamma 0.98 --prune --cache-dataset --data-path "+dataroot+" --output-dir /nfs/lhl/Torch-Pruning/benchmarks/log/prune  --method group_norm --global-pruning --soft-keeping-ratio 0.5 --target-flops 2.1 --finetune False"
    }else if(modelname=='vgg19_bn'||modelname=='vgg16_bn'){
      tempScript = "python /nfs/lhl/Torch-Pruning/benchmarks/main_imagenet.py --mode test_prune --pretrained --epochs 90 --model "+modelname+" --batch-size 128 --lr 0.01 --wd 0.00004 --lr-step-size 1 --lr-gamma 0.98 --prune --cache-dataset --data-path "+dataroot+" --output-dir /nfs/lhl/Torch-Pruning/benchmarks/log/prune  ---method group_norm --global-pruning --soft-keeping-ratio 0.5 --target-flops 2.1 --finetune False"
    }else if(modelname=='deit_b_16(timm)'){
      tempScript = "python /nfs/lhl/Torch-Pruning/transformers/prune_timm_deit.py --mode test_prune --val_batch_size 128 --restore " + ckpt.value
    }else if(modelname=='vit_b_16(timm)'){
      tempScript = "python /nfs/lhl/Torch-Pruning/transformers/prune_timm_vit.py --mode test_prune --val_batch_size 128 --restore "+ ckpt.value
    }else if(modelname=='vit_b_16(hf)'){
      tempScript = "python /nfs/lhl/Torch-Pruning/transformers/prune_hf_vit.py --mode test_prune --val_batch_size 128 --restore "+ ckpt.value
    }

    // deit_b_16(timm)  vit_b_16(timm)  vit_b_16(hf)

  }else if(dataset == 'cifar10' || dataset == 'cifar100'){
    tempScript = "python /nfs/lhl/Torch-Pruning/benchmarks/main_system.py --mode test_prune --model " + modelname + " --batch-size 128 --restore " + ckpt.value + " --dataroot " + dataroot + " --output-dir /nfs/lhl/Torch-Pruning/benchmarks/log/prune --pretrain False  --dataset " + dataset + "  --method group_norm --speed-up 2.1 --global-pruning --reg 5e-4 --sl False --finetune False"
  }else if(dataset == 'coco'){
    if(modelname == 'yolov7'){
      tempScript = "python /nfs/lhl/Torch-Pruning/yolov7/yolov7_detect_pruned.py --conf 0.25 --img-size 640  --batch-size 32 --speed-up 2.0 --mode test_prune --finetune False --weights " + ckpt.value
    }
    else if(modelname == 'yolov8')
    {
      console.log("modelname is",modelname)
      tempScript = "python /nfs/lhl/Torch-Pruning/yolov8/yolov8_pruning.py  --batch-size 32 --speed-up 2.0 --mode test_prune --finetune False  "
    }
    else if(modelname == 'yolov5' )
    {
    console.log("modelname is",modelname)
    tempScript = "python /nfs/lhl/Torch-Pruning/yolov7/yolov5_detect_pruned.py --conf 0.25 --img-size 640  --batch-size 32 --speed-up 2.0 --mode test_prune --finetune False --weights " + ckpt.value
    }
  }

  


  // /nfs/lhl/Torch-Pruning/yolov8/yolov8_pruning.py

  console.log("uploadTree: ", tempScript)





  if(ckpt.value === ''){
    console.log("modelName.value", modelName.value)
    console.log("modelDatasetSimple.value", modelDatasetSimple.value)
    ElMessage.error('Please upload a model or provide the model path on the server')
  }else if(usrModelName.value===''){
    ElMessage.error('Please give your model a name')
  }else{
    let temp1 = {
      username: store.state.username,
      name: modelName.value,
      score: "",
      institute: modelDatasetSimple.value,
      ranking: "",
      morfPath: ckpt.value,
      lerfPath: usrModelName.value,
      pythonPath: tempScript,
      email: structureBeforePruned.value,
      info: "",
    };
    console.log("temp1: ", temp1)
    resultLoading.value = true
    // ElMessage.warning('We are analyzing the model you\'ve submitted and conducting pruning test.')

    ElMessage({
      showClose: true,
      message: 'We will analyze the model you\'ve submitted and conducting pruning test.',
      type: 'warning',
      duration: 5000
    })
    await request.post(`/user/updateJsonTree`, temp1)
        .then((response) => {
          // jumpOut.value = true
          // console.log("temp1: ", temp1)
          console.log("updateJsonTree response:", response)
          resultLoading.value = false
          if (response.status === 200){
            ElMessage({
              showClose: true,
              message: 'Task submitted!',
              type: 'success',
              duration: 10000
            })
          }else{
            ElMessage({
              showClose: true,
              message: 'Task submission failed!',
              type: 'error',
              duration: 10000
            })
            // ElMessage.error('Test failed. Please ensure the model format is correct and provide the correct path.')
          }
        })
        .catch((errors) => {
          // console.log("temp1: ", temp1)
          ElMessage.error('Model added failed!')
          //加转圈？？
          console.log('error', errors)
        })

    UploadVisible.value = false





    // console.log("dataset: ", dataset)
    // //获取进度条
    // let processTimeout = 0;
    // const intervalId = setInterval(() => {
    //   if(jumpOut.value){
    //     clearInterval(intervalId)
    //   }
    //   request.post('/user/getProcess', {
    //     batchSize: 10086,
    //     dataset: dataset
    //   })
    //       .then((response) => {
    //         let process, total, prunnerGot;
    //         process = parseInt(response.data.data.process);
    //         total = parseInt(response.data.data.total);
    //         prunnerGot = response.data.data.prunner
    //         if (process > 0) {
    //           resultLoading.value = false
    //           dialogVisible2.value = true
    //           // resultLoading2.value = false
    //           // resultLoading4.value = true
    //           // dialogVisible_adjust_result.value = true
    //           // resultLoading3.value = false
    //           // resultLoading4.value = true
    //         }
    //         // detectSettingLoading.value=false;
    //         // percentage.value = (1.0 * process / total * 100).toFixed(1).toString()
    //         percentage2.value = (1.0 * process / total * 100).toFixed(1)
    //         console.log("prunnerGot:", prunnerGot)
    //         console.log("process:", process)
    //         console.log("total:", total)
    //         console.log("percentage2.value:", percentage2.value)
    //         if (process == total)
    //           clearInterval(intervalId)
    //       })
    //       .catch((error) => {
    //         processTimeout += 1;
    //         if (processTimeout > 10) {
    //           ElMessage.error('服务器出错，请稍后再试');
    //           clearInterval(intervalId)
    //         }
    //         console.error(error)
    //       })
    // }, 2000)



    // resultShow.value = true

  }

}



// 不再需要了
// const OnlinePruning = () => {
//   isPruned.value = false  //可能改
//   console.log("speedup.value:", speedup.value)
//   let flag = false
//   if(radio1.value!='sl'&&radio1.value!='wosl'){
//     ElMessage.error("Choose whether to employ sparse learning!")
//   }else if(criterion.value===''){
//     ElMessage.error("Select the pruner!")
//   }else if(batchsize.value===0){
//     ElMessage.error("Choose the batch size for sparse learning, evaluation and finetuning!")
//   }else if(speedup.value<=1||speedup.value>10||speedup.value===undefined){
//     ElMessage.error("Speedup must be a number greater than 1 and not exceeding 10!")
//   }else if(finetune.value===''){
//     ElMessage.error("Choose whether to fine-tune!")
//   }else {
//     let modelname = ''
//     if (modelName.value === "ResNet56(tiny)") {
//       modelname = "resnet56"
//     } else if (modelName.value === "SE-ResNet20") {
//       modelname = "se_resnet20"
//     } else {
//       modelname = modelName.value
//     }
//     modelname = modelname.toLowerCase()
//     let dataroot
//     let dataset
//     let sl
//     if (modelDataset.value === 'CIFAR10 (Classification)') {
//       dataroot = '/nfs/lhl/datasets/cifar/cifar-10-batches-py'
//       dataset = 'cifar10'
//     } else if (modelDataset.value === 'CIFAR100 (Classification)') {
//       dataroot = '/nfs/lhl/datasets/cifar/cifar-100-python'
//       dataset = 'cifar100'
//     }else if(modelDataset.value==='ImageNet (Classification)'){
//       dataroot = '/nfs/lhl/datasets/ILSVRC2012'
//       dataset = 'imagenet'
//     }else if(modelDataset.value==='COCO (Detection)'){
//       dataroot = ''
//       dataset = 'coco'
//     }
//     if(radio1.value==="sl"){
//       sl = 'True'
//     }else if(radio1.value==="wosl"){
//       sl = 'False'
//     }
//     let tempScript
//     if(dataset == 'imagenet'){
//       if(modelname=='resnet50'){
//         tempScript = "python /nfs/lhl/Torch-Pruning/benchmarks/main_imagenet.py --mode prune --pretrained --epochs 90 --model "+modelname+" --batch-size "+batchsize.value+" --lr " + lr.value + " --prune --cache-dataset --data-path "+dataroot+" --output-dir /nfs/lhl/Torch-Pruning/benchmarks/log/prune  --method "+criterion.value+" --global-pruning --soft-keeping-ratio 0.5 --target-flops "+speedup.value+" --global-pruning --print-freq 100 --workers 8 --finetune "+finetune.value
//       }else if(modelname=='densenet121'){
//         tempScript = "python /nfs/lhl/Torch-Pruning/benchmarks/main_imagenet.py --mode prune --pretrained --epochs 90 --model "+modelname+" --batch-size "+batchsize.value+" --lr " + lr.value + " --lr-step-size 30 --sl-lr-step-size 10 --prune --cache-dataset --reg 1e-4 --data-path "+dataroot+" --output-dir /nfs/lhl/Torch-Pruning/benchmarks/log/prune  --method "+criterion.value+" --soft-keeping-ratio 0.25 --target-flops "+speedup.value+" --global-pruning --print-freq 100 --workers 16 --amp --finetune "+finetune.value
//       }else if(modelname=='mobilenetv2'){
//         modelname = 'mobilenet_v2'
//         tempScript = "python /nfs/lhl/Torch-Pruning/benchmarks/main_imagenet.py --mode prune --pretrained --epochs 90 --model "+modelname+" --batch-size "+batchsize.value+" --lr " + lr.value + " --wd 0.00004 --lr-step-size 1 --lr-gamma 0.98 --prune --cache-dataset --data-path "+dataroot+" --output-dir /nfs/lhl/Torch-Pruning/benchmarks/log/prune  --method "+criterion.value+" --global-pruning --soft-keeping-ratio 0.5 --target-flops "+speedup.value+" --finetune "+finetune.value
//       }else if(modelname=='vgg19_bn'||modelname=='vgg16_bn'){
//         tempScript = "python /nfs/lhl/Torch-Pruning/benchmarks/main_imagenet.py --mode prune --pretrained --epochs 90 --model "+modelname+" --batch-size "+batchsize.value+" --lr " + lr.value + " --wd 0.00004 --lr-step-size 1 --lr-gamma 0.98 --prune --cache-dataset --data-path "+dataroot+" --output-dir /nfs/lhl/Torch-Pruning/benchmarks/log/prune  --method "+criterion.value+" --global-pruning --soft-keeping-ratio 0.5 --target-flops "+speedup.value+" --finetune "+finetune.value
//       }else if(modelname=='deit_b_16(timm)'){
//       tempScript = "python /nfs/lhl/Torch-Pruning/transformers/prune_timm_deit.py  --test_accuracy --val_batch_size  "+batchsize.value+" --speed-up "+speedup.value+" --mode prune --finetune "+finetune.value+" --pruning_type "+criterion.value
//     }else if(modelname=='vit_b_16(timm)'){
//       tempScript = "python /nfs/lhl/Torch-Pruning/transformers/prune_timm_vit.py  --test_accuracy --val_batch_size  "+batchsize.value+" --speed-up "+speedup.value+" --mode prune --finetune "+finetune.value+" --pruning_type "+criterion.value
//     }else if(modelname=='vit_b_16(hf)'){
//       tempScript = "python /nfs/lhl/Torch-Pruning/transformers/prune_hf_vit.py  --test_accuracy --val_batch_size  "+batchsize.value+" --speed-up "+speedup.value+" --mode prune --finetune "+finetune.value+" --pruning_type "+criterion.value
//     }
//
//     }else if(dataset == 'cifar10' || dataset == 'cifar100'){
//       tempScript = "python /nfs/lhl/Torch-Pruning/benchmarks/main_system.py --mode prune --model "+modelname+" --batch-size "+batchsize.value+" --restore " + modelPath.value + " --dataroot "+dataroot+" --output-dir /nfs/lhl/Torch-Pruning/benchmarks/log/prune --pretrain False  --dataset "+dataset+"  --method "+criterion.value+" --speed-up "+speedup.value+" --global-pruning --reg 5e-4 --sl "+sl+" --finetune "+finetune.value
//     }else if(dataset == 'coco'){
//       if(modelname == 'yolov7')
//       tempScript = "python /nfs/lhl/Torch-Pruning/yolov7/yolov7_detect_pruned.py --conf 0.25 --img-size 640  --batch-size "+batchsize.value+" --speed-up "+speedup.value+" --mode prune --finetune "+finetune.value
//       else if(modelname == 'yolov8')
//       tempScript = "python /nfs/lhl/Torch-Pruning/yolov8/yolov8_pruning.py   --batch-size "+batchsize.value+" --speed-up "+speedup.value+" --mode prune --finetune "+finetune.value
//       else if(modelname == 'yolov5')
//       tempScript = "python /nfs/lhl/Torch-Pruning/yolov7/yolov5_detect_pruned.py --conf 0.25 --img-size 640  --batch-size "+batchsize.value+" --speed-up "+speedup.value+" --mode prune --finetune "+finetune.value
//     }
//
//     // console.log("script.value: ", script.value)
//     // tempScript = "python /nfs/lhl/Torch-Pruning/benchmarks/main_system.py --mode prune --model " + modelname + " --batch-size " + batchsize.value + " --restore " + modelPath.value + " --dataroot " + dataroot + " --output-dir /nfs/lhl/Torch-Pruning/benchmarks/log/prune --pretrain False  --dataset " + dataset + "  --method " + criterion.value + " --speed-up " + speedup.value + " --global-pruning --reg 5e-4 --sl " + sl + " --finetune " + finetune.value
//
//
//
//     console.log("tempScript: ", tempScript)
//     resultLoading2.value = true
//     let success = ''
//     resultShow_tree_result.value = false
//     flag_prune_done.value = false
//     request.post('/algorithm/callPruneAlgorithm', {
//       algorithmName: 'cifarAlgorithm',
//       datasetId: batchsize.value,
//       datasetName: dataset,
//       modelName: tempScript,
//       userName: tempScript,
//     }).then((response) => {
//       console.log("prune response.data", response.data)
//       let arr = response.data.data.result
//       flag = true
//       isPruned.value = true
//       logPath.value = arr[0]
//       console.log("logPath:", logPath.value)
//       // percentage.value = 100
//       // 取出最后7行
//       let lastFourRows = arr.slice(-7);
//
//       success = lastFourRows[6]
//
//       console.log("success:", success)
//
//
//       if (success === 'Success') {
//         paramsChange.value = lastFourRows[0]
//         FLOPsChange.value = lastFourRows[1]
//         AccChange.value = lastFourRows[2]
//         LossChange.value = lastFourRows[3]
//         PrunedPath.value = lastFourRows[4]
//         structureAfterPruned.value = lastFourRows[5]
//         // logPath.value = lastFourRows[6]
//         // ElMessage.success('Task completed successfully!')
//       } else {
//         paramsChange.value = 'Params: N/A'
//         FLOPsChange.value = 'FLOPs: N/A'
//         if(dataset == 'coco'){
//           AccChange.value = 'mAp: N/A'
//         }else{
//           AccChange.value = 'Acc: N/A'
//         }
//         LossChange.value = 'Val Loss: N/A'
//         PrunedPath.value = 'N/A'
//         structureAfterPruned.value = 'N/A'
//         // logPath.value = 'N/A'
//         // ElMessage.error('Task failed!')
//       }
//       console.log("paramsChange.value", paramsChange.value)
//       console.log("FLOPsChange.value", FLOPsChange.value)
//       console.log("AccChange.value", AccChange.value)
//       console.log("LossChange.value", LossChange.value)
//       console.log("PrunedPath.value", PrunedPath.value)
//       console.log("success:", success)
//       resultShow_tree_result.value = true
//       resultLoading4.value = false
//       flag_prune_done.value = true
//       // dialogVisible.value = true
//     })
//         .catch((error) => {
//           console.error(error)
//         })
//
//
//     //获取进度条
//     let processTimeout = 0;
//     const intervalId = setInterval(() => {
//       request.post('/algorithm/getProcess', {
//         batchSize: batchsize.value,
//         dataset: dataset
//       })
//           .then((response) => {
//             let process, total, prunnerGot;
//             process = parseInt(response.data.data.process);
//             total = parseInt(response.data.data.total);
//             prunnerGot = response.data.data.prunner
//             if (process > 0 && !flag_prune_done.value) {
//               dialogVisible.value = true
//               resultLoading2.value = false
//               resultLoading4.value = true
//               // dialogVisible_adjust_result.value = true
//               // resultLoading3.value = false
//               // resultLoading4.value = true
//             }
//             // detectSettingLoading.value=false;
//             // percentage.value = (1.0 * process / total * 100).toFixed(1).toString()
//             percentage.value = (1.0 * process / total * 100).toFixed(1)
//             console.log("prunnerGot:", prunnerGot)
//             console.log("process:", process)
//             console.log("total:", total)
//             console.log("percentage.value:", percentage.value)
//             if (process == total)
//               clearInterval(intervalId)
//           })
//           .catch((error) => {
//             processTimeout += 1;
//             if (processTimeout > 10) {
//               ElMessage.error('服务器出错，请稍后再试');
//               clearInterval(intervalId)
//             }
//             console.error(error)
//           })
//     }, 2000)
//
//     const intervalHistory = setInterval(() => {
//       if (flag) {
//         console.log("flag:", flag)
//         let taskType = ''
//         if(dataset == 'coco'){
//           if (finetune.value === 'False') {
//             taskType = 'Directly Pruned'
//           }else if (finetune.value === 'True') {
//             taskType = 'Pruned --> Fine-tuned'
//           }
//         }else{
//           if (radio1.value === 'wosl' && finetune.value === 'False') {
//             taskType = 'Directly Pruned'
//           } else if (radio1.value === 'sl' && finetune.value === 'False') {
//             taskType = 'Sparse learning --> Pruned'
//           } else if (radio1.value === 'wosl' && finetune.value === 'True') {
//             taskType = 'Pruned --> Fine-tuned'
//           } else if (radio1.value === 'sl' && finetune.value === 'True') {
//             taskType = 'Sparse learning --> Pruned --> Fine-tuned'
//           }
//         }
//
//
//         if (success === 'Success') {
//           success = 'Pruned(completed)'
//         } else {
//           success = 'Failed'
//         }
//
//         // paramsChange.value = lastFourRows[0]
//         // FLOPsChange.value = lastFourRows[1]
//         // AccChange.value = lastFourRows[2]
//         // LossChange.value = lastFourRows[3]
//         // PrunedPath.value = lastFourRows[4]
//         let temp1
//         if (success === 'Pruned(completed)') {
//           temp1 = {
//             username: store.state.username,
//             modelname: modelName.value + "-" + modelDatasetSimple.value + "-" + modelTypeSimple.value,
//             tasktype: taskType,
//             checkpointpath: modelPath.value,
//             status: success,
//             paramschange: paramsChange.value,
//             flopschange: FLOPsChange.value,
//             accchange: AccChange.value,
//             losschange: LossChange.value,
//             prunedpath: PrunedPath.value,
//             structurebeforepruned: structureBeforePruned.value,
//             structureafterpruned: structureAfterPruned.value,
//             logpath: logPath.value
//           };
//         } else {
//           temp1 = {
//             username: store.state.username,
//             modelname: modelName.value + "-" + modelDatasetSimple.value + "-" + modelTypeSimple.value,
//             tasktype: taskType,
//             checkpointpath: modelPath.value,
//             status: success,
//             paramschange: 'Params: N/A',
//             flopschange: 'FLOPs: N/A',
//             accchange: 'Acc: N/A',
//             losschange: 'Val Loss: N/A',
//             prunedpath: 'N/A',
//             structurebeforepruned: structureBeforePruned.value,
//             structureafterpruned: 'N/A',
//             logpath: logPath.value
//           };
//         }
//
//         // paramsChange.value = 'Params: N/A'
//         // FLOPsChange.value = 'FLOPs: N/A'
//         // AccChange.value = 'Acc: N/A'
//         // LossChange.value = 'Val Loss: N/A'
//         // PrunedPath.value = 'N/A'
//         // structureAfterPruned.value = 'N/A'
//
//
//         console.log("history record:", temp1)
//
//         axios.post(`/user/SubmitHistory`, temp1)
//             .then((response) => {
//               // console.log("temp1: ", temp1)
//               if (response.status === 200) {
//                 if (success === 'Pruned(completed)') {
//                   ElMessage({
//                     showClose: true,
//                     message: 'Pruning task has been completed and recorded in history. You can find more information from the log.',
//                     type: 'success',
//                     duration: 6000
//                   })
//                 } else {
//                   ElMessage({
//                     showClose: true,
//                     message: 'Sorry, pruning task failed and has been recorded in history. You can find more information from the log.',
//                     type: 'error',
//                     duration: 6000
//                   })
//                 }
//               }
//             })
//             .catch((errors) => {
//               if (success === 'Pruned(completed)') {
//                 ElMessage({
//                   showClose: true,
//                   message: 'Sorry, pruning task failed and has not been recorded in history. You can find more information from the log.',
//                   type: 'error',
//                   duration: 6000
//                 })
//               } else {
//                 ElMessage({
//                   showClose: true,
//                   message: 'Pruning task has been completed, but something went worng with the server so that it has not been recorded in history. You can find more information from the log.',
//                   type: 'error',
//                   duration: 6000
//                 })
//               }
//               console.log('error', errors)
//             })
//         flag = false
//         // resultLoading2.value = false
//       }
//     }, 2000)
//   }
// }


// 不再需要了
// const GenerateScript = () => {
//   console.log("speedup.value:", speedup.value)
//   if(radio1.value!='sl'&&radio1.value!='wosl'){
//     ElMessage.error("Choose whether to employ sparse learning!")
//   }else if(criterion.value===''){
//     ElMessage.error("Select the pruner!")
//   }else if(batchsize.value===0){
//     ElMessage.error("Choose the batch size for sparse learning, evaluation and finetuning!")
//   }else if(speedup.value<=1||speedup.value>10||speedup.value===undefined){
//     ElMessage.error("Speedup must be a number greater than 1 and not exceeding 10!")
//   }else if(finetune.value===''){
//     ElMessage.error("Choose whether to fine-tune!")
//   }else if(finetune.value==='True'&&(epoch.value===undefined||epoch.value===null|| isNaN(epoch.value) || !Number.isInteger(Number(epoch.value)))) {
//     ElMessage.error("Input/Correct the number of epochs for finetuning!")
//   }else{
//     let modelname = ''
//     if(modelName.value==="ResNet56(tiny)"){
//       modelname = "resnet56"
//     }else if(modelName.value==="SE-ResNet"){
//       modelname = "se_resnet20"
//     }else{
//       modelname = modelName.value
//     }
//     modelname = modelname.toLowerCase()
//     let dataroot
//     let dataset
//     let sl
//     if(modelDataset.value==='CIFAR10 (Classification)'){
//       dataroot = '/nfs/lhl/datasets/cifar/cifar-10-batches-py'
//       dataset = 'cifar10'
//     }else if(modelDataset.value==='CIFAR100 (Classification)'){
//       dataroot = '/nfs/lhl/datasets/cifar/cifar-100-python'
//       dataset = 'cifar100'
//     }else if(modelDataset.value==='ImageNet (Classification)'){
//       dataroot = '/nfs/lhl/datasets/ILSVRC2012'
//       dataset = 'imagenet'
//     }else if(modelDataset.value==='COCO (Detection)'){
//       dataroot = ''
//       dataset = 'coco'
//     }
//     if(radio1.value==="sl"){
//       sl = 'True'
//     }else if(radio1.value==="wosl"){
//       sl = 'False'
//     }
//     if(dataset == 'imagenet'){
//       if(modelname=='resnet50'){
//         script.value = "python /nfs/lhl/Torch-Pruning/benchmarks/main_imagenet.py --mode prune --pretrained --model "+modelname+" --batch-size "+batchsize.value+" --lr " + lr.value + " --prune --cache-dataset --data-path "+dataroot+" --output-dir /nfs/lhl/Torch-Pruning/benchmarks/log/prune  --method "+criterion.value+" --global-pruning --soft-keeping-ratio 0.5 --target-flops "+speedup.value+" --global-pruning --print-freq 100 --workers 8 --finetune "+finetune.value
//       }else if(modelname=='densenet121'){
//         script.value = "python /nfs/lhl/Torch-Pruning/benchmarks/main_imagenet.py --mode prune --pretrained --model "+modelname+" --batch-size "+batchsize.value+" --lr " + lr.value + " --lr-step-size 30 --sl-lr-step-size 10 --prune --cache-dataset --reg 1e-4 --data-path "+dataroot+" --output-dir /nfs/lhl/Torch-Pruning/benchmarks/log/prune  --method "+criterion.value+" --soft-keeping-ratio 0.25 --target-flops "+speedup.value+" --global-pruning --print-freq 100 --workers 16 --amp --finetune "+finetune.value
//       }else if(modelname=='mobilenetv2'){
//         modelname = 'mobilenet_v2'
//         script.value = "python /nfs/lhl/Torch-Pruning/benchmarks/main_imagenet.py --mode prune --pretrained --model "+modelname+" --batch-size "+batchsize.value+" --lr " + lr.value + " --wd 0.00004 --lr-step-size 1 --lr-gamma 0.98 --prune --cache-dataset --data-path "+dataroot+" --output-dir /nfs/lhl/Torch-Pruning/benchmarks/log/prune  --method "+criterion.value+" --global-pruning --soft-keeping-ratio 0.5 --target-flops "+speedup.value+" --finetune "+finetune.value
//       }else if(modelname=='vgg19_bn'||modelname=='vgg16_bn'){
//         script.value = "python /nfs/lhl/Torch-Pruning/benchmarks/main_imagenet.py --mode prune --pretrained --model "+modelname+" --batch-size "+batchsize.value+" --lr " + lr.value + " --wd 0.00004 --lr-step-size 1 --lr-gamma 0.98 --prune --cache-dataset --data-path "+dataroot+" --output-dir /nfs/lhl/Torch-Pruning/benchmarks/log/prune  --method "+criterion.value+" --global-pruning --soft-keeping-ratio 0.5 --target-flops "+speedup.value+" --finetune "+finetune.value
//       }else if(modelname=='deit_b_16(timm)'){
//         script.value = "python /nfs/lhl/Torch-Pruning/transformers/prune_timm_deit.py  --test_accuracy --val_batch_size  "+batchsize.value+" --speed-up "+speedup.value+" --mode prune --finetune "+finetune.value + " --pruning_type "+criterion.value
//     }else if(modelname=='vit_b_16(timm)'){
//       script.value = "python /nfs/lhl/Torch-Pruning/transformers/prune_timm_vit.py  --test_accuracy --val_batch_size  "+batchsize.value+" --speed-up "+speedup.value+" --mode prune --finetune "+finetune.value + " --pruning_type "+criterion.value
//     }else if(modelname=='vit_b_16(hf)'){
//       script.value = "python /nfs/lhl/Torch-Pruning/transformers/prune_hf_vit.py  --test_accuracy --val_batch_size  "+batchsize.value+" --speed-up "+speedup.value+" --mode prune --finetune "+finetune.value + " --pruning_type "+criterion.value
//     }
//
//
//       if(finetune.value==='True'){
//         script.value += " --epoch " + epoch.value
//       }
//
//     }else if(dataset == 'cifar10' || dataset == 'cifar100'){
//       script.value = "python /nfs/lhl/Torch-Pruning/benchmarks/main_system.py --mode prune --model "+modelname+" --batch-size "+batchsize.value+" --restore " + modelPath.value + " --dataroot "+dataroot+" --output-dir /nfs/lhl/Torch-Pruning/benchmarks/log/prune --pretrain False  --dataset "+dataset+"  --method "+criterion.value+" --speed-up "+speedup.value+" --global-pruning --reg 5e-4 --sl "+sl+" --finetune "+finetune.value
//       if(finetune.value==='True'){
//         script.value += " --epoch " + epoch.value
//       }
//
//     }else if(dataset == 'coco'){
//       console.log("???")
//       if(finetune.value==='True'){
//         script.value += " --epoch " + epoch.value
//       }
//       if(modelname == 'yolov7')
//       script.value = "python /nfs/lhl/Torch-Pruning/yolov7/yolov7_detect_pruned.py  --conf 0.25 --img-size 640 --batch-size "+batchsize.value+" --speed-up "+speedup.value+" --mode prune --finetune "+finetune.value
//       else if(modelname == 'yolov8')
//       script.value = "python /nfs/lhl/Torch-Pruning/yolov8/yolov8_pruning.py   --batch-size "+batchsize.value+" --speed-up "+speedup.value+" --mode prune --finetune "+finetune.value
//       else if(modelname == 'yolov5')
//       script.value = "python /nfs/lhl/Torch-Pruning/yolov7/yolov5_detect_pruned.py  --conf 0.25 --img-size 640 --batch-size "+batchsize.value+" --speed-up "+speedup.value+" --mode prune --finetune "+finetune.value
//     }
//
//
//     console.log("script.value: ", script.value)
//     scriptVisible.value = true;
//   }
//
//
// }

// var svgGroup
//以下直到onMounted的代码是把节点转移功能单独提出来
const testHtml = () =>{

  console.log("test: ", test)
}

// var viewerWidth = $(document).height();
// var viewerHeight = $(document).width();
// var duration = 750;
// console.log("fake viewerWidth: ", viewerWidth)
// console.log("fake viewerHeight: ", viewerHeight)
// var response = await request2.post(`/user/getModelZoo`, {});
// var root = response.data;

const treeRoot = ref()

// // click d
// function centerNode(source) {
//   console.log("source: ", source)
//   var zoomListener = d3.behavior
//       .zoom()
//       .scaleExtent([0.1, 3])
//       // .filter(function () {
//       //   return d3.event.ctrlKey;
//       // })
//       .on("zoom", zoom);
//   var scale = zoomListener.scale();
//   var x = -source.y0;
//   var y = -source.x0;
//   x = x * scale + viewerHeight / 8;
//   // x = x * scale + viewerHeight / 20;
//   y = y * scale + viewerHeight / 2;
//   d3.select('g').transition()
//       .duration(duration)
//       .attr("transform", "translate(" + x + "," + y + ")scale(" + scale + ")");
//   zoomListener.scale(scale);
//   zoomListener.translate([x, y]);
// }

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

//context
async function centerNodebyName(datasetName, modelName){
  //先注释掉，后面再开工


  //在跳转之前，先展开当前节点，在收缩其他节点
  var datasetNode = toggleByDataset(treeRoot.value, datasetName)

  console.log("datasetNode: ", datasetNode)

  // if (d3.event.defaultPrevented) return; // click suppressed



  await update(datasetNode);
  // centerNode(d);




  console.log("treeRoot: ", treeRoot)
  var targetNode = findNodeByDatasetAndModel(treeRoot.value, datasetName, modelName)

  console.log("targetNode: ", targetNode)

  var tryNode = d3.selectAll('.ghostCircle')
  console.log("tryNode: ", tryNode)
  // 使用 filter 方法来选择特定的元素
  const targetGhostCircle = tryNode.filter(function(d) {
    return (d.name === modelName && d.parent.name === datasetName) || (d.parent!=undefined && d.parent.name === modelName && d.parent.parent!=undefined && d.parent.parent.name === datasetName);
  });
  console.log("targetGhostCircle: ", targetGhostCircle)

  // d3.selectAll('.ghostCircle').attr('class', 'ghostCircle show');
  //
  // setTimeout(() => {
  //   d3.selectAll('.ghostCircle').attr('class', 'ghostCircle');
  // }, 1500);

  var tryLink = d3.selectAll('.link')
  console.log("tryLink: ", tryLink)

  const targetLink = tryLink.filter(function(d) {
    return d.source.name === modelName && d.source.parent.name === datasetName;
  });
  console.log("targetLink: ", targetLink)


  centerNode(targetNode)

  // targetGhostCircle.attr('class', 'ghostCircle show');
  // targetLink.attr('class', 'templink');

  setTimeout(() => {
    targetGhostCircle.attr('class', 'ghostCircle show');
    targetLink.attr('class', 'templink');
  }, 200);


  setTimeout(() => {
    targetGhostCircle.attr('class', 'ghostCircle');
    targetLink.attr('class', 'link');
  }, 1500);
}

function findNodeByDatasetAndModel(node, datasetName, modelName) {
  if (node.name === datasetName) {
    // Check if the current node matches the dataset name
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        var child = node.children[i];
        if (child.name === modelName) {
          return child; // Found the model under the specified dataset
        }
      }
    }
  }

  if (node.children) {
    for (var i = 0; i < node.children.length; i++) {
      var result = findNodeByDatasetAndModel(node.children[i], datasetName, modelName);
      if (result) {
        return result;
      }
    }
  }

  return null; // Node not found
}

// function toggleByDataset(node, datasetName) {
//   var datasetNode
//   for (var i = 0; i < node.children.length; i++) {
//     if (node.children[i] === datasetName) {
//       if (!node.children[i].children) {
//         toggleChildren(node.children[i]);
//       }
//     } else {
//       if (node.children[i].children) {
//         toggleChildren(node.children[i]);
//       }
//     }
//   }
//   return datasetNode
// }

function toggleByDataset(node, datasetName) {
  var datasetNode
  for (var i = 0; i < node.children.length; i++) {
    console.log("node.children[i]: ", node.children[i])
    if (node.children[i].name === datasetName){
      console.log("找到了数据集节点")
      datasetNode = node.children[i]
      if(!node.children[i].children){
        console.log("所要求的数据集节点没有孩子，需要扩展出来")
        toggleChildren(node.children[i]);
        // update(node.children[i]);
      }
    }else{
      console.log("这不是要找的数据集节点")
      if(node.children[i].children){
        console.log("该节点有孩子，需要抑制")
        toggleChildren(node.children[i]);
        // update(node.children[i]);
      }
    }
  }
  return datasetNode

  // if (node.name === datasetName) {
  //   // Check if the current node matches the dataset name
  //   return node
  // }
  //
  // if (node.children) {
  //   for (var i = 0; i < node.children.length; i++) {
  //     var result = toggleByDataset(node.children[i], datasetName);
  //     if (result) {
  //       return result;
  //     }
  //   }
  // }

  // return null; // Node not found
}

//迁移标注
var json;
var root;
// var tree;
var maxLabelLength = 0;
var treeData;
var totalNodes = 0;
// variables for drag/drop
var selectedNode = null;
var draggingNode = null;
// panning variables
var panSpeed = 200;
var panBoundary = 20; // Within 20px from edges will pan when dragging.
// Misc. variables
var i = 0;
var duration = 750;
// var root;

// size of the diagram
var viewerWidth = $(document).height();
var viewerHeight = $(document).width();
console.log("real viewerWidth: ", viewerWidth)
console.log("real viewerHeight: ", viewerHeight)

var tree = d3.layout.tree()
    .size([viewerHeight, viewerWidth]);

console.log("tree: ", tree)
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
// sort the tree according to the node names

function sortTree() {
  console.log("执行了此函数")
  console.log(json)
  tree.sort(function(a, b) {
    return b.name.toLowerCase() < a.name.toLowerCase() ? 1 : -1;
  });
}
// define the zoomListener which calls the zoom function on the "zoom" event constrained within the scaleExtents
const zoomListener = d3.behavior
    .zoom()
    .scaleExtent([0.1, 3])
    // .filter(function () {
    //   return d3.event.ctrlKey;
    // })
    .on("zoom", zoom);

// Function to center node when clicked/dropped so node doesn't get lost when collapsing/moving with large amount of children.

function centerNode(source) {
  var scale = zoomListener.scale();
  var x = -source.y0;
  var y = -source.x0;
  x = x * scale + viewerHeight / 8;
  // x = x * scale + viewerHeight / 20;
  y = y * scale + viewerHeight / 2;
  d3.select('g').transition()
      .duration(duration)
      .attr("transform", "translate(" + x + "," + y + ")scale(" + scale + ")");
  zoomListener.scale(scale);
  zoomListener.translate([x, y]);
}



function zoom() {
  // if (d3.event.sourceEvent.ctrlKey) {
  //   svgGroup.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
  // }
  var svgGroup = d3.select("#tree-container").select("svg").select("g")
  svgGroup.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

function pan(domNode, direction) {
  var speed = panSpeed;
  var svgGroup = d3.select("#tree-container").select("svg").select("g")
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


//context
function initiateDrag(d, domNode) {
  var svgGroup = d3.select("#tree-container").select("svg").select("g")
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
    if (d.target.id == draggingNode.id) {
      return true;
    }
    return false;
  }).remove();

  dragStarted = null;
}

// 选择tree-container元素
const container = d3.select('#tree-container');

// 检查是否存在子元素，如果有则删除
if (!container.empty()) {
  container.select('svg').remove();
}


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
        // now remove the element from the parent, and insert it into the new elements children
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

// Function to update the temporary connector indicating dragging affiliation
var updateTempConnector = function() {
  var svgGroup = d3.select("#tree-container").select("svg").select("g")
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


function endDrag() {
  selectedNode = null;
  d3.selectAll('.ghostCircle').attr('class', 'ghostCircle');
  d3.select(domNode).attr('class', 'node');
  // now restore the mouseover event or we won't be able to drag a 2nd time
  d3.select(domNode).select('.ghostCircle').attr('pointer-events', '');
  updateTempConnector();
  if (draggingNode !== null) {
    update(root);
    centerNode(draggingNode);
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

function update(source) {
  // Compute the new height, function counts total children of root node and sets tree height accordingly.
  // This prevents the layout looking squashed when new nodes are made visible or looking sparse when nodes are removed
  // This makes the layout more consistent.
  var svgGroup = d3.select("#tree-container").select("svg").select("g")
  console.log("update in click!")
  console.log("source:", source)
  console.log("source.text:", source.text)
  console.log("source._children:", source._children)
  console.log("source.children:", source.children)

  // if(!source.children){
  //   console.log("update in click!")
  // }

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

  // Compute the new tree layout.
  nodes = tree.nodes(root).reverse();
  var links = tree.links(nodes);

  // Set widths between levels based on maxLabelLength.
  nodes.forEach(function(d) {
    d.y = (d.depth * (maxLabelLength * 10)); //maxLabelLength * 10px
    // alternatively to keep a fixed scale one can set a fixed depth per level
    // Normalize for fixed-depth by commenting out below line
    // d.y = (d.depth * 500); //500px per level.
  });

  // Update the nodes…
  var node = svgGroup.selectAll("g.node")
      .data(nodes, function(d) {
        return d.id || (d.id = ++i);
      });

  // Enter any new nodes at the parent's previous position.
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
      .attr('class', 'nodeCircle')
      .attr("r", 0)
      .style("stroke", "black")
      .style("stroke-width", "1.5px")
      .style("fill", function(d) {
        return d._children ? "lightsteelblue" : "#fff";
      });

  nodeEnter.append("circle")
      .attr('class', 'nodeCircleBorder')
      .attr("r", 0)
      .style("stroke", "rgba(121, 80, 173, 0.5)")
      .style("stroke-width", function(d) {
        if (d.status==='done')
          return "6px";
        else
          return "0";
      })
      .style("fill", "none")


  // click(
  nodeEnter.append("circle")
      .attr('class', 'nodeCircleBorderFailed')
      .attr("r", 0)
      .style("stroke", "#FC7272")
      .style("stroke-width", function(d) {
        if (d.status==='verfailed')
          return "6px";
        else
          return 0;
      })
      .style("fill", "none")


  nodeEnter.append("circle")
      .attr('class', 'nodeCircleBorderUnknown')
      .attr("r", 0)
      .style("stroke", "#808080")
      .style("stroke-width", function(d) {
        if (d.status==='unknown')
          return "6px";
        else
          return 0;
      })
      .style("fill", "none")

  nodeEnter.append("circle")
      .attr('class', 'nodeCircleBorderUnequiped')
      .attr("r", 0)
      .style("stroke", "#FFA722")
      .style("stroke-width", function(d) {
        if (d.status==='unequiped')
          return "6px";
        else
          return 0;
      })
      .style("fill", "none")




  // .style("pointer-events", "none");

  // nodeEnter.append("circle")
  //     .attr('class', 'nodeCircleOuter') // 为外圆添加一个类名
  //     .attr("r", 0)
  //     .style("stroke", "#7950AD") // 外圆颜色为#7950AD
  //     .style("stroke-width", "2px") // 设置外圆线宽为2px
  //     .style("fill", "none"); // 外圆不填充颜色

  nodeEnter.append("text")
      .attr("x", function(d) {
        return d.children || d._children ? -10 : 10;
      })
      .attr("dy", ".35em")
      .attr('class', 'nodeText')
      // .attr('style', 'font-family: Arial;')
      .attr("text-anchor", function(d){
        return d.children || d._children ? "end" : "start";
      })
      .attr("transform", function(d) {
        if(d.name=='VGG19'){
          console.log("找到了VGG19！")
          console.log("d.children", d.children)
          console.log("d._children", d._children)
        }
        console.log("d.name: ", d.name)
        return d.children || d._children ? "rotate(-90)" : "rotate(-30)";
      })
      // .attr("transform", "rotate(-90)")
      .text(function(d) {
        console.log("文字名称: ", d.name)
        return d.name=="Upload" ? "Add a new model" : (d.name=="CIFAR10" ? "C10" : d.name);
      })
      .style("fill-opacity", 0)
      .style("color", "black")
      .style("font-size", "16px")
      .style("font-family", "Arial");

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
  node.select('text')
      .attr("x", function(d) {
        // console.log("文字名称: ", d.name)
        // console.log("d.name.length: ", d.name.length)
        var len = d.name=="CIFAR10" ? 3 : d.name=="CIFAR100" ? 4 : d.name=="ImageNet" ? 2 : d.name=="PowerGrid" ? 4 : d.name.length;


        return d.children || d._children ? len*8 : 30;
        // return d.children || d._children ? -30 : 30;
      })
      .attr("y", function(d) {
        return d.children || d._children ? -35 : 0;
      })
      .attr("text-anchor", function(d) {
        return d.children || d._children ? "end" : "start";
      })
      .text(function(d) {
        // console.log("文字名称: ", d.name)
        return d.name=="Upload" ? "Upload" : d.name=="CIFAR10" ? "C10" : d.name=="CIFAR100" ? "C100" : d.name=="ImageNet" ? "IN" : d.name=="PowerGrid" ? "Grid" : d.name;
        // return d.name=='Upload' ? "Upload" : d.name;
      });

  console.log("!!!", node.select("circle.nodeCircleBorder"))
  node.select("circle.nodeCircleBorder").attr("r", 24)

  console.log("!!!", node.select("circle.nodeCircleBorderFailed"))
  node.select("circle.nodeCircleBorderFailed").attr("r", 24)

  console.log("!!!", node.select("circle.nodeCircleBorderUnknown"))
  node.select("circle.nodeCircleBorderUnknown").attr("r", 24)

  console.log("!!!", node.select("circle.nodeCircleBorderUnequiped"))
  node.select("circle.nodeCircleBorderUnequiped").attr("r", 24)



  // Change the circle fill depending on whether it has children and is collapsed
  node.select("circle.nodeCircle")
      .attr("r", 20.5) /*<><><><><><><><><><><><><><><><><><><><><><><>THIS IS DETERMINING RADIUS */
      .style("fill", function(d) {
        // console.log("d:",d)
        // console.log("d._children:",d._children)
        if(d.type==="upload"){
          return "url(#upload)";
        }else if(d.type==="pretrained"){
          return "url(#pretrain)";
        }else if(d.type==="usr"){
          return "url(#usr)";
        }else if(d.type==="conv"){
          return "url(#conv)";
        }else if(d.type==="yolo"){
          return "url(#yolo)";
        }else if(d.type==="transformer"){
          return "url(#transformer)";
        }else if(d.type==="vgg"){
          return "url(#vgg)";
        }else if(d.type==="resnet"){
          return "url(#resnet)";
        }else{
          if(d.name==="Model Zoo"){
            return "url(#hl)";
          }else if(d.name==="PowerGrid Dataset"){
            return "url(#grid)";
          }else if(d.name==="ImageNet"){
            return "url(#classification)";
          }else if(d.name==="CIFAR10"){
            return "url(#cifar)";
          }else if(d.name==="CIFAR100"){
            return "url(#imgnet)";
          }else if(d.name==="COCO"){
            return "url(#coco)";
          }else if(d.name==="SchemaNet"){
            return "url(#zhf)";
          }else if(d.name==="Dr. Huang"){
            return "url(#hqh)";
          }else if(d.name==="局部解释"){
            return "url(#local)";
          }else if(d.name==="全局解释"){
            return "url(#global2)";
          }else if(d.name==="事后解释性分析"){
            return "url(#post-hoc)";
          }else if(d.name==="可解释建模"){
            return "url(#ad-hoc)";
          }else if(d.name==="注意力机制"){
            return "url(#attention2)";
          }else if(d.name==="神经树"){
            return "url(#tree)";
          }else if(d.name==="概念响应"){
            return "url(#tcav)";
          }else if(d.name==="归因方法"){
            return "url(#saliency)";
          }else if(d.name==="概念原型"){
            return "url(#prototype)";
          }else{
            return "url(#img1)";
          }
        }
        // d._children ? "lightsteelblue" : "url(#img1)";

      });

  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
      .duration(duration)
      .attr("transform", function(d) {
        return "translate(" + d.y + "," + d.x + ")";
      });

  // Fade the text in
  nodeUpdate.select("text")
      .style("fill-opacity", 1);

  // Transition exiting nodes to the parent's new position.
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

  // Enter any new links at the parent's previous position.
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

  // Transition links to their new position.
  link.transition()
      .duration(duration)
      .attr("d", diagonal);

  // Transition exiting nodes to the parent's new position.
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

var overCircle = function(d) {
  selectedNode = d;
  updateTempConnector();
};
var outCircle = function(d) {
  selectedNode = null;
  updateTempConnector();
};


async function click(d) {
  console.log("click d: ", d)
  centerNode(d);
  if(d.type=='pretrained' || d.type=='usr'){
    radio1.value = 'wosl'  //要不要sparse learing
    criterion.value = ''  //重要性指标
    batchsize.value = 0
    client155_form.value = 'Bar'
    speedup.value = ''
    finetune.value = ''
    epoch.value = null
    client.value = ''
    iterative_steps.value = ''
    sl_total_epochs.value = ''
    scriptVisible.value = false
    if(d.parent.parent.name=='CIFAR100' || d.parent.parent.name=='CIFAR10'){
      PrunedialogVisible.value = true
      // console.log("d.type", d.type)
      if(d.type==='pretrained'){
        modelType.value = "Publicly pretrained model"
        modelTypeSimple.value = "Pretrain"
      }else if(d.type==='usr'){
        modelType.value = "User trained model"
        modelTypeSimple.value = d.name
      }

      console.log("d.path", d.path)
      modelPath.value = d.path
      console.log("d.acc", d.acc)
      modelAcc.value = d.acc
      console.log("d.params", d.params)
      modelParams.value = d.params
      console.log("d.flops", d.flops)
      modelFlops.value = d.flops
      console.log("d.parent.name", d.parent.name)
      modelName.value = d.parent.name
      console.log("d.parent.parent.name", d.parent.parent.name)
      if(d.parent.parent.name==="CIFAR10"||d.parent.parent.name==="CIFAR100"||d.parent.parent.name==="ImageNet"){
        modelDataset.value = d.parent.parent.name + " (Classification)"
        modelDatasetSimple.value = d.parent.parent.name
      }else if(d.parent.parent.name==="COCO"){
        modelDataset.value = d.parent.parent.name + " (Detection)"
        modelDatasetSimple.value = d.parent.parent.name
      }
      console.log("modelDataset.value", modelDataset.value)

      structureBeforePruned.value = '/nfs/lhl/Torch-Pruning/benchmarks/model_before_pruned/test/'+
          d.parent.parent.name.toLowerCase()+'_'+d.parent.name.toLowerCase().replace('(tiny)','').replace('-','_')+'_'+'Pretrained.log'
      console.log("structureBeforePruned", structureBeforePruned.value)
      // await axios
      //     .post(`/user/getStructureBeforePruned`, {
      //     })
      //     .then((response) => {
      //       let ranks = response.data.data.ranklistinfo
      //       console.log("response.data.data", response.data.data)
      //       console.log("ranks: ", ranks)
      //       servers.value = ranks
      //     })
      //     .catch((errors) => {
      //       console.log('error', errors)
      //     })


      // ElMessage.success("选择了预训练模型！")
    }else if(d.parent.parent.name=='ImageNet'){
      ImageNetPrunedialogVisible.value = true
      console.log("d.type", d.type)
      if(d.parent.name.includes('hf')){
        INtype.value = 'hf';
      }else if(d.parent.name.includes('timm')){
        INtype.value = 'timm';
      }else{
        INtype.value = 'cnn';
      }

      if(d.model_name=='ImageNet_ResNet50_Pretrained' || d.model_name=='ImageNet_DenseNet121_Pretrained'){
        lr.value = 0.08
      }else if(d.model_name=='ImageNet_MobileNetV2_Pretrained'){
        lr.value = 0.045
      }else if(d.model_name=='ImageNet_VGG19-BN_Pretrained' || d.model_name=='ImageNet_VGG16-BN_Pretrained'){
        lr.value = 0.01
      }
      // radio1.value = 'wosl'
      // criterion.value = ''
      // batchsize.value = 0
      // speedup.value = ''
      // finetune.value = ''
      // scriptVisible.value = false

      if(d.type==='pretrained'){
        modelType.value = "Publicly pretrained model"
        modelTypeSimple.value = "Pretrain"
      }else if(d.type==='usr'){
        modelType.value = "User trained model"
        modelTypeSimple.value = d.name
      }

      console.log("d.path", d.path)
      modelPath.value = d.path
      console.log("d.acc", d.acc)
      modelAcc.value = d.acc
      console.log("d.params", d.params)
      modelParams.value = d.params
      console.log("d.flops", d.flops)
      modelFlops.value = d.flops
      console.log("d.parent.name", d.parent.name)
      modelName.value = d.parent.name
      console.log("d.parent.parent.name", d.parent.parent.name)
      if(d.parent.parent.name==="CIFAR10"||d.parent.parent.name==="CIFAR100"||d.parent.parent.name==="ImageNet"){
        modelDataset.value = d.parent.parent.name + " (Classification)"
        modelDatasetSimple.value = d.parent.parent.name
      }else if(d.parent.parent.name==="COCO"){
        modelDataset.value = d.parent.parent.name + " (Detection)"
        modelDatasetSimple.value = d.parent.parent.name
      }

      structureBeforePruned.value = '/nfs/lhl/Torch-Pruning/benchmarks/model_before_pruned/test/'+
          d.parent.parent.name.toLowerCase()+'_'+d.parent.name.toLowerCase().replace('(tiny)','').replace('-','_')+'_'+'Pretrained.log'
      console.log("structureBeforePruned", structureBeforePruned.value)
    }else if(d.parent.parent.name=='COCO'){
      // radio1.value = 'wosl'  //要不要sparse learing
      // criterion.value = ''  //重要性指标
      // batchsize.value = 0
      // speedup.value = ''
      // finetune.value = ''
      // scriptVisible.value = false
      PruneCOCOdialogVisible.value = true
      console.log("d.type", d.type)
      if(d.type==='pretrained'){
        modelType.value = "Publicly pretrained model"
        modelTypeSimple.value = "Pretrain"
      }else if(d.type==='usr'){
        modelType.value = "User trained model"
        modelTypeSimple.value = d.name
      }

      console.log("d.path", d.path)
      modelPath.value = d.path
      console.log("d.acc", d.acc)
      modelAcc.value = d.acc
      console.log("d.params", d.params)
      modelParams.value = d.params
      console.log("d.flops", d.flops)
      modelFlops.value = d.flops
      console.log("d.parent.name", d.parent.name)
      modelName.value = d.parent.name
      console.log("d.parent.parent.name", d.parent.parent.name)
      if(d.parent.parent.name==="CIFAR10"||d.parent.parent.name==="CIFAR100"||d.parent.parent.name==="ImageNet"){
        modelDataset.value = d.parent.parent.name + " (Classification)"
        modelDatasetSimple.value = d.parent.parent.name
      }else if(d.parent.parent.name==="COCO"){
        modelDataset.value = d.parent.parent.name + " (Detection)"
        modelDatasetSimple.value = d.parent.parent.name
      }
      console.log("modelDataset.value", modelDataset.value)

      structureBeforePruned.value = '/nfs/lhl/Torch-Pruning/benchmarks/model_before_pruned/test/'+
          d.parent.parent.name.toLowerCase()+'_'+d.parent.name.toLowerCase().replace('(tiny)','').replace('-','_')+'_'+'Pretrained.log'


      console.log("structureBeforePruned", structureBeforePruned.value)
    }else{
      console.log("标记d.parent.parent.name: ", d.parent.parent.name)
    }

    //gpuChartRef
    await request.post('/algorithm/gpuInfoList')
        .then((response)=>{
          console.log(response)
          let originGPUs=response.data.data
          console.log("originGPUs: ", originGPUs)
          gpuInfos.value = originGPUs
          for(let i=0; i<originGPUs.length; i++){
            let option = {
              tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b} : {c}MiB ({d}%)",
                confine: false,
                appendToBody: true,
                // position: function(point, e, dom, size) {
                //   // 1.计算出绘制canvas的容器（dom.parentNode的值）相对于页面顶部的高度。注意需要由相对于浏览器窗口上部的距离 加上 页面卷曲的高度 来计算。
                //   var top = dom.parentNode.getBoundingClientRect().top + (window.scrollY ? window.scrollY : window.pageYOffset)
                //   // 2.计算出canvas外容器相对与浏览器窗口的左侧的距离
                //   var left = dom.parentNode.getBoundingClientRect().left
                //   // 3.因为tooltip内容过多，canvas已经放不下tooltip。所以需要改变tooltip的定位方式为fixed。
                //   dom.style.position = 'fixed'
                //   // 4.计算出left
                //   var resultLeft = point[0] + left + 5 + dom.clientWidth > document.body.clientWidth ? document.body.clientWidth - dom.clientWidth - 20 : point[0] + left + 5
                //   // 5.计算出top
                //   var resultTop = (point[1] + top + dom.clientHeight) < document.body.clientHeight ? point[1] + dom.parentNode.getBoundingClientRect().top : dom.parentNode.getBoundingClientRect().top - dom.clientHeight + point[1]
                //   // 6.返回位置数据 [left, top]
                //   return [resultLeft, resultTop]
                // },

              },
              color:['#ef6567', '#3BA272'],
              series : [
                {
                  name:originGPUs[i].name+'显存信息',
                  type: 'pie' ,
                  radius: '70%',
                  data: [
                    {value: originGPUs[i].tot_memory - originGPUs[i].remain_memory,  name:'已用显存'},
                    {value: originGPUs[i].remain_memory,  name:'剩余显存'},
                  ],
                  center: ["50%", "50%"],  // 调整饼图中心点位置
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: "rgba(0, 0, 0, 0.5)",
                    },
                  },
                }
              ]
            }
            optionList.push(option);
          }
          // gpuChart_


          // gpuRemainMem.value = originGPUs.remain_memory
          // gpuTotMem.value = originGPUs.tot_memory
          // console.log("gpuRemainMem: ", gpuRemainMem.value)
          // console.log("gpuTotMem: ", gpuTotMem.value)
        })
        .catch((error)=>{
          console.error(error)
        })

  }else if(d.type=='upload'){
    ckpt.value = ''
    ckptUploaded.value = false
    uploadType.value = ''
    modelName.value = d.parent.name
    usrModelName.value = ''
    console.log("d.parent.parent.name", d.parent.parent.name)
    if(d.parent.parent.name==="CIFAR10"||d.parent.parent.name==="CIFAR100"||d.parent.parent.name==="ImageNet"){
      structureBeforePruned.value = '/nfs/lhl/Torch-Pruning/benchmarks/model_before_pruned/test/'+
          d.parent.parent.name.toLowerCase()+'_'+d.parent.name.toLowerCase().replace('(tiny)','').replace('-','_')+'_'+'Pretrained.log'
      modelDataset.value = d.parent.parent.name + " (Classification)"
      modelDatasetSimple.value = d.parent.parent.name
    }else if(d.parent.parent.name==="COCO"){
      modelDataset.value = d.parent.parent.name + " (Detection)"
      modelDatasetSimple.value = d.parent.parent.name
    }
    console.log("modelName.value: ", modelName.value)
    console.log("modelDatasetSimple.value: ", modelDatasetSimple.value)
    UploadVisible.value = true
  }else{
    if (d3.event.defaultPrevented) return; // click suppressed
    d = toggleChildren(d);
    update(d);
    centerNode(d);
  }
  // console.log("测试", d);
  // d3.event.stopPropagation();
}

function contextmenu(d) {
  // d3.select(domNode).select('.ghostCircle').attr('pointer-events', 'none');
  // d3.selectAll('.ghostCircle').attr('class', 'ghostCircle show');
  // d3.select(domNode).attr('class', 'node activeDrag');
  domNode = this;
  console.log("domNode: ", domNode)
  console.log("d3.select(domNode): ", d3.select(domNode))


  d3.select(domNode).selectAll('.ghostCircle').attr('class', 'ghostCircle show');

  // 等待半秒钟
  setTimeout(() => {
    d3.select(domNode).selectAll('.ghostCircle').attr('class', 'ghostCircle');
  }, 1500); // 500毫秒等待时间

  event.preventDefault();
  console.log("d.name", d.name);
  if(d.name==="可解释性"){
    showDialog_interp();
  }if(d.name==="可解释建模"){
    showDialog_atenhoc();
  }if(d.name==="事后解释性分析"){
    showDialog_posthoc();
  }if(d.name==="局部解释"){
    showDialog_local();
  }if(d.name==="全局解释"){
    showDialog_global();
  }if(d.name==="注意力机制"){
    showDialog_attention();
  }if(d.name==="神经树"){
    showDialog_tree();
  }if(d.name==="引用概念"){
    showDialog_intro_concept();
  }if(d.name==="Constituent Attention"){
    showDialog_intro_Constituent();
  }
}

//把onmounted里的重复变量提出来，函数也提出来

onMounted(async () => {

//   //初始化图表
// // let myChart = echarts.init(document.getElementById('gpuChart') );
//   let myChart = echarts.init(ctx.$refs.gpuChartRef);
// // gpuChartRef
// //配置图表的参数
//   let option = {
//     tooltip: {
//       trigger: "item",
//       formatter: "{a} <br/>{b} : {c} ({d}%)",
//     },
//     color:['#ef6567', '#3BA272'],
//     series : [
//       {
//         name:'GPU显存信息',
//         type: 'pie' ,
//         radius: '90%',
//         data: [
//           {value: 40,  name:'已用显存'},
//           {value: 60,  name:'剩余显存'},
//         ],
//         // center: ["40%", "60%"],
//         emphasis: {
//           itemStyle: {
//             shadowBlur: 10,
//             shadowOffsetX: 0,
//             shadowColor: "rgba(0, 0, 0, 0.5)",
//           },
//         },
//       }
//     ]
//   };
// //使用配置项显示图表
//   myChart.setOption(option);



  try {
    const response = await request2.post(`/user/getModelZoo`, {});
    json = response.data;
    console.log("json: ", json);
  } catch (error) {
    console.log('error', error);
  }
  console.log('json', json)

  treeRoot.value = json;
  treeData = json;


// Call visit function to establish maxLabelLength
  visit(treeData, function(d) {
    totalNodes++;
    maxLabelLength = Math.max(d.name.length, maxLabelLength);

  }, function(d) {
    return d.children && d.children.length > 0 ? d.children : null;
  });
// Sort the tree initially incase the JSON isn't in a sorted order.
  sortTree();

// TODO: Pan function, can be better implemented.

// define the baseSvg, attaching a class for styling and the zoomListener
  //这个无法移到外面
  var baseSvg = d3.select("#tree-container").append("svg")
      .attr("width", viewerWidth)
      .attr("height", viewerHeight)
      .attr("class", "overlay")
      .call(zoomListener);

  console.log("baseSvg: ", baseSvg)


/////////////////////////////////////////////////
///////////////// IMAGE DEFS ////////////////////
/////////////////////////////////////////////////

  d3.select('svg').append('defs').append("pattern")
      .attr("id", "img1")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/tool2.jpg")
      .attr("x", -10)
      .attr("y", -14)
      .attr("width", 60)
      .attr("height", 62);

  d3.select('svg').append('defs').append("pattern")
      .attr("id", "grid")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/grid.png")
      .attr("x", -10)
      .attr("y", -14)
      .attr("width", 60)
      .attr("height", 62);

  d3.select('svg').append('defs').append("pattern")
      .attr("id", "local")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/local2.jpg")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 40)
      .attr("height", 40);

  d3.select('svg').append('defs').append("pattern")
      .attr("id", "post-hoc")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/post-hoc.png")
      .attr("x", 0)
      .attr("y", 1)
      .attr("width", 40)
      .attr("height", 40);

  d3.select('svg').append('defs').append("pattern")
      .attr("id", "ad-hoc")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/ad-hoc.png")
      .attr("x", 0)
      .attr("y", -9)
      .attr("width", 60)
      .attr("height", 60);

  d3.select('svg').append('defs').append("pattern")
      .attr("id", "attention2")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/attention2.jpg")
      .attr("x", -5)
      .attr("y", -13)
      .attr("width", 60)
      .attr("height", 60);

  d3.select('svg').append('defs').append("pattern")
      .attr("id", "prototype")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/prototype.jpg")
      .attr("x", 0)
      .attr("y", -13)
      .attr("width", 60)
      .attr("height", 60);

  d3.select('svg').append('defs').append("pattern")
      .attr("id", "concept")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/concept.png")
      .attr("x", 2)
      .attr("y", 0)
      .attr("width", 40)
      .attr("height", 40);

  baseSvg.append('defs').append("pattern")
      .attr("id", "classification")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/classification.jpg")
      .attr("x", 0)
      .attr("y", -10)
      .attr("width", 60)
      .attr("height", 60);

  baseSvg.append('defs').append("pattern")
      .attr("id", "upload")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/upload.png")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 40)
      .attr("height", 40);

  baseSvg.append('defs').append("pattern")
      .attr("id", "pretrain")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/pre.png")
      .attr("x", 2)
      .attr("y", 0)
      .attr("width", 40)
      .attr("height",40);

  baseSvg.append('defs').append("pattern")
      .attr("id", "usr")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/usr.png")
      .attr("x", 3)
      .attr("y", 0)
      .attr("width", 40)
      .attr("height",40);

  baseSvg.append('defs').append("pattern")
      .attr("id", "conv")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/conv.png")
      .attr("x", -4)
      .attr("y", -2)
      .attr("width", 49)
      .attr("height",44);

  baseSvg.append('defs').append("pattern")
      .attr("id", "vgg")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/vgg.png")
      .attr("x", 2)
      .attr("y", 1)
      .attr("width", 45)
      .attr("height",40);

  baseSvg.append('defs').append("pattern")
      .attr("id", "resnet")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/ResNet.png")
      .attr("x", -10)
      .attr("y", 0)
      .attr("width", 60)
      .attr("height",40);

  baseSvg.append('defs').append("pattern")
      .attr("id", "transformer")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/Transformer.jpg")
      .attr("x", -4)
      .attr("y", -4)
      .attr("width", 49)
      .attr("height",49);

  baseSvg.append('defs').append("pattern")
      .attr("id", "yolo")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/yolo.jpg")
      .attr("x", -4)
      .attr("y", -2)
      .attr("width", 49)
      .attr("height",45);

  baseSvg.append('defs').append("pattern")
      .attr("id", "cifar")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/cifar.jpg")
      .attr("x", 0)
      .attr("y", -5)
      .attr("width", 60)
      .attr("height",60);

  baseSvg.append('defs').append("pattern")
      .attr("id", "imgnet")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/imgnet.jpg")
      .attr("x", -10)
      .attr("y", -5)
      .attr("width", 60)
      .attr("height",60);

  baseSvg.append('defs').append("pattern")
      .attr("id", "coco")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/coco.jpg")
      .attr("x", -10)
      .attr("y", -10)
      .attr("width", 60)
      .attr("height",60);

  d3.select('svg').append('defs').append("pattern")
      .attr("id", "proxy")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/proxy.png")
      .attr("x", -8)
      .attr("y", -10)
      .attr("width", 60)
      .attr("height", 60);

  d3.select('svg').append('defs').append("pattern")
      .attr("id", "disturbance")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/disturb.png")
      .attr("x", 3)
      .attr("y", 4)
      .attr("width", 35)
      .attr("height", 35);



  baseSvg.append('defs').append("pattern")
      .attr("id", "zebra")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/zebra.jpg")
      .attr("x", -10)
      .attr("y", -10)
      .attr("width", 60)
      .attr("height", 60);

  baseSvg.append('defs').append("pattern")
      .attr("id", "gradient2")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/gradient2.jpg")
      .attr("x", -10)
      .attr("y", -10)
      .attr("width", 60)
      .attr("height", 60);


  baseSvg.append('defs').append("pattern")
      .attr("id", "saliency")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/saliency.jpg")
      .attr("x", -10)
      .attr("y", -5)
      .attr("width", 60)
      .attr("height", 64);

  baseSvg.append('defs').append("pattern")
      .attr("id", "tcav")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/tcav.jpg")
      .attr("x", -12)
      .attr("y", -3)
      .attr("width", 60)
      .attr("height",50);

  baseSvg.append('defs').append("pattern")
      .attr("id", "tree")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/tree.jpg")
      .attr("x", 0)
      .attr("y", -8)
      .attr("width", 60)
      .attr("height",50);

  d3.select('svg').append('defs').append("pattern")
      .attr("id", "global2")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/global2.jpg")
      .attr("x", -10)
      .attr("y", -10)
      .attr("width", 60)
      .attr("height", 62);

  d3.select('svg').append('defs').append("pattern")
      .attr("id", "hl")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/vision.jpg")
      .attr("x", -10)
      .attr("y", -10)
      .attr("width", 60)
      .attr("height", 60);

  d3.select('svg').append('defs').append("pattern")
      .attr("id", "xmq")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/xmq.jpg")
      .attr("x", -10)
      .attr("y", -14)
      .attr("width", 60)
      .attr("height", 60);

  d3.select('svg').append('defs').append("pattern")
      .attr("id", "zhf")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/zhf.jpg")
      .attr("x", -10)
      .attr("y", -14)
      .attr("width", 60)
      .attr("height", 60);

  d3.select('svg').append('defs').append("pattern")
      .attr("id", "hqh")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", "25")
      .attr("height", "25")
      .append("image")
      .attr("xlink:href", "http://10.214.242.155:7996/img/background/hqh.jpg")
      .attr("x", 0)
      .attr("y", -10)
      .attr("width", 60)
      .attr("height", 60);

  console.log("d3.select('svg'):",d3.select('svg'))

  // d3.select('svg').append('defs')
  //     .append("pattern")
  //     .attr("id", "img1")
  //     .attr("patternUnits", "userSpaceOnUse") // 设置图案单位为用户坐标系统
  //     .attr("width", "100%") // 相对于用户坐标系，定义图像相对宽度为100%
  //     .attr("height", "100%") // 相对于用户坐标系，定义图像相对高度为100%
  //     .append("image")
  //     .attr("xlink:href", "http://10.214.242.155:7996/img/background/tool.jpg")
  //     .attr("x", 0)
  //     .attr("y", 0)
  //     .attr("width", "100%") // 图片元素实际宽度为100%用户坐标系统的宽度
  //     .attr("height", "100%"); // 图片元素实际高度为100%用户坐标系统的高度




// Toggle children on click.
  // click suppressed
  // var clicked = false;
  // var clickTimeout;

  // function click(d) {
  //   if (!clicked) {
  //     clicked = true;
  //
  //     // 使用setTiemout来等待300ms
  //     clickTimeout = setTimeout(function() {
  //       // 单击操作逻辑
  //       console.log("Single Click");
  //
  //       // 将clicked重置为false
  //       clicked = false;
  //     }, 300); // 等待300毫秒
  //
  //   } else {
  //     // 取消定时器
  //     clearTimeout(clickTimeout);
  //     clicked = false;
  //
  //     // 双击操作逻辑
  //     console.log("Double Click");
  //   }
  // }

//await






// Append a group which holds all nodes and which the zoom Listener can act upon.
  baseSvg.append("g");

// Define the root
  root = treeData;
  root.x0 = viewerHeight / 2;
  root.y0 = 0;

// Layout the tree initially and center on the root node.
  toggleByDataset(root, "null");
  update(root);
  centerNode(root);

});


function checkFile(file) {
  // const isCSV = file.type === 'text/csv';
  const isSizeValid = file.size / 1024 / 1024 <= 1000; // Convert size from bytes to kilobytes
  // if (!isCSV) {
  //   ElMessage.error('Please upload a CSV file.')
  // }
  if (!isSizeValid) {
    ElMessage.error('Please upload a checkpoint file with a size less than 1GB.')
  }
  checkCsv.value = isSizeValid;
  return isSizeValid;
}

function checkFile2(file) {
  const isCSV = file.type === 'text/csv';
  const isSizeValid = file.size / 1024 <= 500; // Convert size from bytes to kilobytes
  if (!isCSV) {
    ElMessage.error('Please upload a CSV file.')
  }
  if (!isSizeValid) {
    ElMessage.error('Please upload a CSV file with a size less than 500KB.')
  }
  checkCsv2.value = isCSV && isSizeValid;
  return isCSV && isSizeValid;
}

function checkFilePython(file) {
  const isPy = file.name.toLowerCase().endsWith('.py');
  const isSizeValid = file.size / 1024 <= 500; // Convert size from bytes to kilobytes
  if (!isPy) {
    ElMessage.error('Please upload a python file.')
  }
  if (!isSizeValid) {
    ElMessage.error('Please upload a python file with a size less than 500KB.')
  }
  checkPython.value = isPy && isSizeValid;
  return isPy && isSizeValid;
}




// function handleUploadSuccess(response) {
//   ElMessage.success('File uploaded successfully.')
// }
//
// function handleUploadError(err) {
//   ElMessage.error('File upload failed.')
// }

// const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
//   // console.log(uploadFileList);
//   // const index=uploadFileList.value.findIndex((e)=>{return e===uploadFile})
//   console.log(uploadFile, uploadFiles);
// };
// const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
//   dialogImageUrl.value = uploadFile.url!;
//   dialogVisible.value = true;
//   // console.log("dialogImageUrl.value: ", dialogImageUrl.value)
// };
// 都不需要了
// const handleChange1: UploadProps["onChange"] = (file, fileList) => {
//   uploadFileList.value = fileList;
//   console.log("uploadRef.value: ", uploadRef.value)
//   console.log("uploadFileList.value: ", uploadFileList.value)
//   console.log("checkCsv.value: ", checkCsv.value)
//   uploadCkpt('aaaxiba!')
//   //
//   // if(checkCsv.value){
//   //   uploadCkpt('aaaxiba!')
//   // }
// };
// const handleChange2: UploadProps["onChange"] = (file, fileList) => {
//   uploadFileList2.value = fileList;
//   console.log("uploadFileList2.value:", uploadFileList2.value)
//   console.log("checkCsv2.value: ", checkCsv2.value)
//   if(checkCsv2.value){
//     uploadCsv('lerf')
//   }
// };
// const handleChange3: UploadProps["onChange"] = (file, fileList) => {
//   uploadFileList3.value = fileList;
//   console.log("uploadFileList3.value:", uploadFileList3.value)
//   console.log("checkPython.value: ", checkPython.value)
//   if(checkPython.value){
//     uploadPython()
//   }
// };
//
// async function uploadCkpt(type){
//   let param = new FormData();
//   console.log("uploadFileList: ", uploadFileList);
//   uploadFileList.value.forEach(
//       (val, index) => {
//         param.append("pictures", val.raw);
//         console.log("test", val.raw);
//       }
//   );
//   console.log("datasetId: ", store.state.datasetId);
//   param.append("datasetId", store.state.datasetId);
//   let config = {
//     baseURL: "/api",
//     //baseURL: "http://localhost:7996",
//     timeout: 30000,
//     headers: {
//       "Content-Type": "multipart/form-data" //设置headers
//     }
//   };
//   console.log("param: ", param);
//   await axios
//       .post("/data/uploadCkpts", param, config)
//       .then(res => {
//         console.log("res: ", res);
//         if (res.status === 200) {
//           console.log("yes");
//           let arr = res.data.data.imgpath.split("/")
//           ckpt.value = '/nfs/lhl/Torch-Pruning/benchmarks/usr_model/'+arr[arr.length - 1]
//           console.log("ckpt.value: ", ckpt.value);
//           uploadRef.value.clearFiles();
//           uploadFileList.value = [];
//           ckptUploaded.value = true;
//           ElMessage.success('Model uploaded successfully.')
//         }else{
//           ElMessage.error('Model upload failed.')
//         }
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   // console.log("uploadFileList: ", uploadFileList);
// }

const handleUploadSuccess = (response, uploadFile) =>{
  console.log("response: ", response);
  let arr = response.split("/")
  console.log("arr: ", arr);
  ckpt.value = '/nfs/lhl/Torch-Pruning/benchmarks/usr_model/'+arr[arr.length - 1]
  console.log("ckpt.value: ", ckpt.value);
  ElMessage.success('Model uploaded successfully.')
}

const handleUploadFailed = (response, uploadFile) =>{
  ElMessage.error('Model upload failed.')
}
//
// async function uploadCsv(type){
//   let param = new FormData();
//   if(type=='morf'){
//     console.log("uploadFileList: ", uploadFileList);
//     uploadFileList.value.forEach(
//         (val, index) => {
//           param.append("pictures", val.raw);
//           console.log("test", val.raw);
//         }
//     );
//   }else if(type=='lerf'){
//     console.log("uploadFileList2: ", uploadFileList2);
//     uploadFileList2.value.forEach(
//         (val, index) => {
//           param.append("pictures", val.raw);
//           console.log("test", val.raw);
//         }
//     );
//   }
//   console.log("datasetId: ", store.state.datasetId);
//   param.append("datasetId", store.state.datasetId);
//   let config = {
//     baseURL: "/api",
//     //baseURL: "http://localhost:7996",
//     timeout: 30000,
//     headers: {
//       "Content-Type": "multipart/form-data" //设置headers
//     }
//   };
//   console.log("param: ", param);
//   await axios
//       .post("/data/uploadCsvs", param, config)
//       .then(res => {
//         console.log("res: ", res);
//         if (res.status === 200) {
//           console.log("yes");
//           if(type=='morf'){
//             let arr = res.data.data.imgpath.split("/")
//             morf.value = arr[arr.length - 1]
//             console.log("morf.value: ", morf.value);
//             uploadRef.value.clearFiles();
//             uploadFileList.value = [];
//             morfUploaded.value = true;
//             ElMessage.success('Morf file uploaded successfully.')
//           }else if(type=='lerf'){
//             let arr = res.data.data.imgpath.split("/")
//             lerf.value = arr[arr.length - 1]
//             console.log("lerf.value: ", lerf.value);
//             uploadRef2.value.clearFiles();
//             uploadFileList2.value = [];
//             lerfUploaded.value = true;
//             ElMessage.success('Lerf file uploaded successfully.')
//           }
//         }else{
//           ElMessage.error('File upload failed.')
//         }
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   // console.log("uploadFileList: ", uploadFileList);
// }
//
// async function uploadPython(){
//   let param = new FormData();
//   console.log("uploadFileList3: ", uploadFileList3);
//   uploadFileList3.value.forEach(
//       (val, index) => {
//         param.append("pictures", val.raw);
//         console.log("test", val.raw);
//       }
//   );
//   console.log("datasetId: ", store.state.datasetId);
//   param.append("datasetId", store.state.datasetId);
//   let config = {
//     baseURL: "/api",
//     //baseURL: "http://localhost:7996",
//     timeout: 30000,
//     headers: {
//       "Content-Type": "multipart/form-data" //设置headers
//     }
//   };
//   console.log("param: ", param);
//   await axios
//       .post("/data/uploadCsvs", param, config)
//       .then(res => {
//         console.log("res: ", res);
//         if (res.status === 200) {
//           console.log("yes");
//           let arr = res.data.data.imgpath.split("/")
//           pythonValue.value = arr[arr.length - 1]
//           console.log("pythonValue.value: ", pythonValue.value);
//           uploadRef3.value.clearFiles();
//           uploadFileList3.value = [];
//           pythonUploaded.value = true;
//           ElMessage.success('File uploaded successfully.')
//         }else{
//           ElMessage.error('File upload failed.')
//         }
//       })
//       .catch(err => {
//         console.log(err);
//       });
// }


async function getUsrRank(){
  if(userQuery.value === ''){
    ElMessage.error('Please input the name of your attribution algorithm!')
  }else if(morfUploaded.value == false){
    ElMessage.error('Please upload your morf result!')
  }else if(lerfUploaded.value == false){
    ElMessage.error('Please upload your lerf result!')
  }else{
    ElMessage.success('Information complete, processing......')
    resultLoading.value = true
    await axios
        .post(`/user/getUsrRank`, {
        })
        .then((response) => {
          let ranks = response.data.data.ranklistinfo
          console.log("response.data.data", response.data.data)
          console.log("ranks: ", ranks)
          servers.value = ranks
        })
        .catch((errors) => {
          console.log('error', errors)
        })

    let temp = {
      morfpath: "/nfs3-p1/duanjr/meta-score-attribution-hollylee/data/user_upload/" + morf.value,
      lerfpath: "/nfs3-p1/duanjr/meta-score-attribution-hollylee/data/user_upload/" + lerf.value,
    };
    console.log("请求体：", temp);
    await axios
        .post(`/user/getUsrRank2`, temp)
        .then((response) => {
          let ranks = response.data.data.ranklistinfo
          console.log("response.data.data", response.data.data)
          console.log("ranks: ", ranks)
          servers2.value = ranks
          for (let i = 0; i < servers2.value.length; i++) {
            // const element = servers2.value[i];
            // 检查username是否为"The User"
            if (servers2.value[i].username === "The User") {
              // 如果是，则修改contributor、institute和algorithm字段
              servers2.value[i].username = store.state.username;
              servers2.value[i].institute = store.state.institute;
              servers2.value[i].name = userQuery.value;

              score.value = servers2.value[i].score;
              rank.value = servers2.value[i].ranking;
            }
          }

        })
        .catch((errors) => {
          console.log('error', errors)
        })

    resultShow.value = true
    resultLoading.value = false
  }
}


async function SubmitAlgorithm(){
  if(userQuery.value === ''){
    ElMessage.error('Please input the name of your attribution algorithm!')
  }else if(morfUploaded.value == false){
    ElMessage.error('Please upload your morf result!')
  }else if(lerfUploaded.value == false){
    ElMessage.error('Please upload your lerf result!')
  }else if(Email.value == ''){
    ElMessage.error('Please provide your email address!')
  }else if(Infos.value == ''){
    ElMessage.error('Please complete information about your algorithm!')
  }else{
    if(pythonUploaded.value === true){
      ElMessage.success('You choose to submit your algorithm file.')
    }else{
      ElMessage.warning('You choose not to submit your algorithm file.')
    }
    ElMessage.success('Information complete, submitting your algorithm......')
    resultLoading.value = true
    let pythonPath = ''
    if(pythonValue.value==''){
      pythonPath = 'Not Provided'
    }else{
      pythonPath = "/nfs3-p1/duanjr/meta-score-attribution-hollylee/data/user_upload/" + pythonValue.value
    }
    let temp1 = {
      username: store.state.username,
      name: userQuery.value,
      score: score.value,
      institute: store.state.institute,
      ranking: rank.value,
      morfPath: "/nfs3-p1/duanjr/meta-score-attribution-hollylee/data/user_upload/" + morf.value,
      lerfPath: "/nfs3-p1/duanjr/meta-score-attribution-hollylee/data/user_upload/" + lerf.value,
      pythonPath: pythonPath,
      email: Email.value,
      info: Infos.value,
    };
    console.log("temp1: ", temp1)
    await axios
        .post(`/user/SubmitAlgorithm`, temp1)
        .then((response) => {
          // console.log("temp1: ", temp1)
          if (response.status === 200){
            ElMessage.success('Upload algorithm successfully!')
          }else{
            ElMessage.error('Upload algorithm failed!')
          }
        })
        .catch((errors) => {
          // console.log("temp1: ", temp1)
          ElMessage.success('Upload algorithm failed!')
          console.log('error', errors)
        })
    // resultShow.value = true
    resultLoading.value = false
  }
}

function DetermineUser() {
  console.log("确认用户信息")
  console.log("权限: ", store.state.access)
  let temp = {
    username: store.state.username,
    password: 23333,
  };
  console.log(temp);
  request
      .post("/user/findNoPass", temp)
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          console.log("确认成功")
          const userInfo = res.data.data.userInfo
          store.commit('setInstitute', userInfo.institute)
          console.log("userInfo.institute: ", userInfo.institute)
          console.log("store.state.institute: ", store.state.institute)
        } else{
          console.log("确认失败")
        }
      })
      .catch((err) => {
        console.log((err));
      });

}

DetermineUser()
// ();
// defineExpose({DetermineUser})
// export { DetermineUser };
</script>

<style lang="scss" scoped>

$sidebar-footer-height: 230px;
$sidebar-header-height: 100px;

#tree-container {
  //transform-origin: top; /* 设置变换的原点在顶部 */
  //-webkit-transform-origin: top;
  //-moz-transform-origin: top;
  //-ms-transform-origin: top;
  //-o-transform-origin: top;


  //transform: rotate(90deg);
  //-webkit-transform: rotate(90deg);
  //-moz-transform: rotate(90deg);
  //-ms-transform: rotate(90deg);
  //-o-transform: rotate(90deg);
  transform: rotate(90deg) translateX(-2%); /* 旋转并向上移动 */
  -webkit-transform: rotate(90deg) translateX(-2%);
  -moz-transform: rotate(90deg) translateX(-2%);
  -ms-transform: rotate(90deg) translateX(-2%);
  -o-transform: rotate(90deg) translateX(-2%);
  overflow: hidden;
  //overflow-x: visible;
  //overflow-y: visible;


  //position: absolute; /* 添加绝对定位 */
  //top: 0; /* 把 #tree-container 定位到 .holly 的顶部 */
  //left: 0; /* 如果需要，可以调整 left 属性来控制左侧位置 */


  width: 100%;
}

.layout {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/*.holly{*/
/*  background-color: white;*/
/*  overflow: visible;*/
/*}*/

.holly{
  background-color: white;
  overflow: hidden !important;
  width: 100%;
  height: 100%;
  //position: relative;
}

//.el-menu{
//  overflow: scroll;
//}

.el-menu-item{
  /*color: #0a53be;*/
  font-size: 14px;
  /*font-family: Arial;*/
}

.menu-suffix {
  //display: inline-block;
  padding: 5px;
  opacity: 1;
  transition: opacity 0.3s;
}

//.menu-suffix {
//  opacity: 0;
//}

.badge {
  display: inline-block;
  padding: 0.25em 0.4em;
  font-size: 75%;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;
  color: #fff;
  background-color: #6c757d;

&.primary {
   background-color: #ab2dff;
 }

&.secondary {
   background-color: #079b0b;
 }
}

.sidebar-footer {
  height: $sidebar-footer-height;
  min-height: $sidebar-footer-height;
  display: flex;
  align-items: center;
  padding: 0 20px;
  > span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}


.footer-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 0.8em;
  padding: 20px 0;
  border-radius: 8px;
  width: 180px;
  min-width: 190px;
  margin: 0 auto;
  background-color: #162d4a;
  img.react-logo {
    width: 40px;
    height: 40px;
    margin-bottom: 10px;
  }
  a {
    color: #fff;
    font-weight: 600;
    margin-bottom: 10px;
  }
}

.sidebar-header {
  height: $sidebar-header-height;
  min-height: $sidebar-header-height;
  display: flex;
  align-items: center;
  padding: 0 15px;
  > span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

.pro-sidebar-logo {
  display: flex;
  align-items: center;

  > div {
    width: 35px;
    min-width: 35px;
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


.el-menu-vertical-demo:not(.el-menu--collapse) {
  max-height: 100%;
}

.toggle-button{
  /*添加背景颜色*/
  background-color: #706D6D;
  /*设置文本大小*/
  font-size:10px;
  /*设置文本行高*/
  line-height:24px;
  /*设置文本颜色*/
  color:#fff;
  /*设置文本居中*/
  text-align: center;
  /*设置文本间距*/
  letter-spacing: 0.2em;
  /*设置鼠标悬浮变小手效果*/
  cursor:pointer;
}

.circle-icon {
  display: inline-block;
  width: 24px; /* 调整圆圈的大小 */
  height: 24px; /* 调整圆圈的大小 */
  background-color: #ccc; /* 圆圈的背景颜色 */
  border-radius: 50%; /* 使元素呈现为圆形 */
  text-align: center;
  line-height: 24px; /* 垂直居中文本 */
  overflow: hidden; /* 隐藏溢出内容 */
  //margin-right: 10px;
}

.circle-icon img {
  max-width: 150%; /* 使图片适应圆圈大小 */
  max-height: 150%; /* 使图片适应圆圈大小 */
  vertical-align: middle; /* 垂直居中图片 */
}

.sidebar-collapser {
  transition: left, right, 0.3s;
  position: fixed;
  left: 210px;
  top: 100px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #00829f;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  transform: translateX(50%);
  z-index: 111;
  cursor: pointer;
  color: white;
  box-shadow: 1px 1px 4px #0c1e35;
}

.sidebar-collapsed {
  transition: left, right, 0.3s;
  position: fixed;
  left: 42px;
  top: 100px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #00829f;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  transform: translateX(50%);
  z-index: 111;
  cursor: pointer;
  color: white;
  box-shadow: 1px 1px 4px #0c1e35;
}

//.link {
//  fill: none;
//  stroke: #7950AD;
//  stroke-width: 1.5px;
//}
//
//.templink {
//  fill: none;
//  /*stroke: red;*/
//  stroke: #FFCCCC;
//  stroke-width: 3px;
//}




</style>