<template>
  <div>
    <button @click="showDialog">展示Cifar数据集介绍</button>
    <el-dialog :visible.sync="dialogVisible" width="80%" title="Cifar数据集介绍">
      <div class="dialog-container">
        <div class="language-switch">
          <el-tabs v-model="activeTab">
            <el-tab-pane label="中文" name="cn">
              <div v-html="cnIntroduction"></div>
            </el-tab-pane>
            <el-tab-pane label="English" name="en">
              <div v-html="enIntroduction"></div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="close-button">
          <el-button type="text" icon="el-icon-close" @click="dialogVisible = false"></el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      activeTab: 'cn',
      cnIntroduction: `Cifar数据集是一个用于图像分类的经典数据集，由10个类别的60,000张32x32彩色图像组成。每个类别有6,000张图像。其中50,000张用于训练，10,000张用于测试。该数据集是由加拿大计算机科学家Alex Krizhevsky、Vinod Nair和Geoffrey Hinton在2009年创建的。

      这个数据集非常适合用于测试各种图像分类算法，是计算机视觉领域最广泛使用的数据集之一。由于其规模较小，因此训练速度较快，也便于研究人员在其上进行实验和研究。`,
      enIntroduction: `The Cifar dataset is a classic dataset for image classification, consisting of 60,000 32x32 color images in 10 classes. There are 6,000 images per class. 50,000 images are used for training and 10,000 images are used for testing. The dataset was created by Canadian computer scientists Alex Krizhevsky, Vinod Nair, and Geoffrey Hinton in 2009.

      This dataset is very suitable for testing various image classification algorithms and is one of the most widely used datasets in the field of computer vision. Due to its small size, it trains relatively quickly and is also easy for researchers to experiment and study on.`
    };
  },
  methods: {
    showDialog() {
      this.dialogVisible = true;
    }
  }
};
</script>

<style>
.dialog-container {
  display: flex;
  flex-direction: column;
}

.language-switch {
  margin-bottom: 20px;
}

.close-button {
  align-self: flex-end;
}
</style>