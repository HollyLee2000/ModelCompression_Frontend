<template style="text-align: center">
  <div class="datasetPreview" v-loading="resultLoading">
    <div v-if='ispreview' style="text-align: center">
      <h1 style="margin-top: 20px">Meta-rank Datasets</h1>


      <div class="previewer" style="margin-bottom: 30px">
        <el-row>
          <el-col :span="4"/>
          <el-col :span="16">
            <el-row class="demo-image">
              <el-col :span="6" v-for="(item,index) in NWPU" class="blockpublic">
                <el-image
                    style="width: 80%; height: 80%; margin-top: 40px;"
                    :fit="'fill'"
                    :initial-index="index"
                    :preview-src-list="NWPU.map(x=>'http://'+x)"
                    :src="`http://${item}`"
                />
              </el-col>
              <el-col :span="6" class="blockpublic">
                <div class="dataintro" />
                <span>NWPU-RESISC45</span>
                <br>
                <el-button class="lookdata" @click="checkOut(10007)" type="warning" plain>Data Details</el-button>
                <!--                <br>-->
                <!--                <el-button class="lookdata" @click="checkOut(10002)" type="success" plain>查看数据集</el-button>-->
                <br>
                <el-button class="dataintro" @click="showDialogNWPU" type="success" plain>Introduction</el-button>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="4"/>
        </el-row>
      </div>




      <div class="previewer" style="margin-bottom: 30px">
        <el-row>
          <el-col :span="4"/>
          <el-col :span="16">
            <el-row class="demo-image">
              <el-col :span="6" v-for="(item,index) in ImageNetList" class="blockpublic">
                <el-image
                    style="width: 80%; height: 80%; margin-top: 40px;"
                    :fit="'fill'"
                    :initial-index="index"
                    :preview-src-list="ImageNetList.map(x=>'http://'+x)"
                    :src="`http://${item}`"
                />
              </el-col>
              <el-col :span="6" class="blockpublic">
                <div class="dataintro" />
                <span>ImageNet</span>
                <br>
                <el-button class="lookdata" @click="checkOut(10002)" type="warning" plain>Data Details</el-button>
                <!--                <br>-->
                <!--                <el-button class="lookdata" @click="checkOut(10002)" type="success" plain>查看数据集</el-button>-->
                <br>
                <el-button class="dataintro" @click="showDialog2" type="success" plain>Introduction</el-button>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="4"/>
        </el-row>
      </div>

      <div class="previewer" style="margin-bottom: 30px">
        <el-row>
          <el-col :span="4"/>
          <el-col :span="16">
            <el-row class="demo-image">
              <el-col :span="6" v-for="(item,index) in Food101" class="blockpublic">
                <el-image
                    style="width: 80%; height: 80%; margin-top: 40px;"
                    :fit="'fill'"
                    :initial-index="index"
                    :preview-src-list="Food101.map(x=>'http://'+x)"
                    :src="`http://${item}`"
                />
              </el-col>
              <el-col :span="6" class="blockpublic">
                <div class="dataintro" />
                <span>Food-101</span>
                <br>
                <el-button class="lookdata" @click="checkOut(10008)" type="warning" plain>Data Details</el-button>
                <!--                <br>-->
                <!--                <el-button class="lookdata" @click="checkOut(10002)" type="success" plain>查看数据集</el-button>-->
                <br>
                <el-button class="dataintro" @click="showDialogFood101" type="success" plain>Introduction</el-button>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="4"/>
        </el-row>
      </div>

      <div class="previewer" style="margin-bottom: 30px">
        <el-row>
          <el-col :span="4"/>
          <el-col :span="16">
            <el-row class="demo-image">
              <el-col :span="6" v-for="(item,index) in Place365" class="blockpublic">
                <el-image
                    style="width: 80%; height: 80%; margin-top: 40px;"
                    :fit="'fill'"
                    :initial-index="index"
                    :preview-src-list="Place365.map(x=>'http://'+x)"
                    :src="`http://${item}`"
                />
              </el-col>
              <el-col :span="6" class="blockpublic">
                <div class="dataintro" />
                <span>Place365</span>
                <br>
                <el-button class="lookdata" @click="checkOut(10009)" type="warning" plain>Data Details</el-button>
                <!--                <br>-->
                <!--                <el-button class="lookdata" @click="checkOut(10002)" type="success" plain>查看数据集</el-button>-->
                <br>
                <el-button class="dataintro" @click="showDialogPlace365" type="success" plain>Introduction</el-button>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="4"/>
        </el-row>
      </div>


      <el-dialog class="scrollable" v-model="dialogVisibleNWPU" style="width:30%; height:50%; text-align: center; overflow: auto;"
                 :draggable="true" @close="dialogVisibleNWPU = false" :append-to-body="true" title="Introduction for NWPU-RESISC45"  >
        <div class="dialog-container">
          <div class="language-switch">
            <el-tabs v-model="activeTab" type="border-card" class="demo-tabs" :stretch=true>
              <el-tab-pane label="中文" name="cn">
                <div style="text-align: left; margin-bottom: 10px">
                  &emsp;&emsp;NWPU-RESISC45数据集是西北工业大学创建的一个用于遥感图像场景分类（RESISC）的公开基准数据集。该数据集包含31,500张图像，涵盖了45个场景类别，每个类别有700张图像。这45个场景类别包括飞机、机场、棒球场、篮球场、海滩、桥梁、灌木丛、教堂、圆形农田、云、商业区、高密度住宅、沙漠、森林、高速公路、高尔夫球场、地面径赛场、港口、工业区、交叉口、岛屿、湖泊、草地、中等密度住宅、移动住宅公园、山脉、立交桥、宫殿、停车场、铁路、火车站、矩形农田、河流、环形交叉口、跑道、海冰、船只、雪山、稀疏住宅、体育场、储罐、网球场、平台、热电站和湿地。
                </div>
              </el-tab-pane>
              <el-tab-pane label="English" name="en">
                <div style="text-align: left; margin-bottom: 10px">
                  &emsp;&emsp;NWPU-RESISC45 dataset is a publicly available benchmark for REmote Sensing Image Scene Classification (RESISC), created by Northwestern Polytechnical University (NWPU). This dataset contains 31,500 images, covering 45 scene classes with 700 images in each class. These 45 scene classes include airplane, airport, baseball diamond, basketball court, beach, bridge, chaparral, church, circularfarmland, cloud, commercial area, dense residential, desert, forest, freeway, golf course, ground track field, harbor, industrial area, intersection, island, lake, meadow, medium residential, mobile home park, mountain, overpass, palace, parking lot, railway, railway station, rectangular farmland, river, roundabout, runway, sea ice, ship, snowberg, sparse residential, stadium, storage tank, tennis court, terrace, thermal power station, and wetland.
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-dialog>

      <el-dialog class="scrollable" v-model="dialogVisibleFood101" style="width:30%; height:50%; text-align: center; overflow: auto;"
                 :draggable="true" @close="dialogVisibleFood101 = false" :append-to-body="true" title="Introduction for Food-101"  >
        <div class="dialog-container">
          <div class="language-switch">
            <el-tabs v-model="activeTab" type="border-card" class="demo-tabs" :stretch=true>
              <el-tab-pane label="中文" name="cn">
                <div style="text-align: left; margin-bottom: 10px">
                  &emsp;&emsp;Food-101引入了一个具有101个食品类别的挑战性数据集，包含101,000张图像。对于每个类别，提供了250张经过手动标注的测试图像以及750张训练图像。训练图像并未进行清理，因此仍然包含一些噪声，这主要表现为强烈的颜色以及可能的错误标签。所有图像都被缩放到最大边长为512像素。
                </div>
              </el-tab-pane>
              <el-tab-pane label="English" name="en">
                <div style="text-align: left; margin-bottom: 10px">
                  &emsp;&emsp;Food-101 introduces a challenging data set of 101 food categories, with 101'000 images. For each class, 250 manually reviewed test images are provided as well as 750 training images. On purpose, the training images were not cleaned, and thus still contain some amount of noise. This comes mostly in the form of intense colors and sometimes wrong labels. All images were rescaled to have a maximum side length of 512 pixels.
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-dialog>



      <el-dialog class="scrollable" v-model="dialogVisiblePlace365" style="width:30%; height:50%; text-align: center; overflow: auto;"
                 :draggable="true" @close="dialogVisiblePlace365 = false" :append-to-body="true" title="Introduction for Place365"  >
        <div class="dialog-container">
          <div class="language-switch">
            <el-tabs v-model="activeTab" type="border-card" class="demo-tabs" :stretch=true>
              <el-tab-pane label="中文" name="cn">
                <div style="text-align: left; margin-bottom: 10px">
                  &emsp;&emsp;Places数据集是根据人类视觉认知原理设计的。其目标是构建一个可用于训练人工系统进行高层次视觉理解任务的核心视觉知识库，诸如场景上下文、物体识别、动作和事件预测以及心理理论推断等任务。Places的语义类别是按其功能定义的，标签代表了环境的入口级别。举例来说，数据集具有不同类别的卧室、街道等，因为在家庭卧室、酒店卧室或托儿所中，人们的行为方式不同，对接下来可能发生的事情也有不同的预测。
                  <br>
                  &emsp;&emsp;Places数据集包含了超过1000万张图像，涵盖了400多个独特的场景类别。该数据集每个类别有5000至30000张训练图像，与现实世界中的出现频率一致。通过卷积神经网络（CNN），Places数据集可以用于学习各种场景识别任务的深度场景特征，旨在在以场景为中心的benchmark上建立新的最先进性能。
                </div>
              </el-tab-pane>
              <el-tab-pane label="English" name="en">
                <div style="text-align: left; margin-bottom: 10px">
                  &emsp;&emsp;The Places dataset is designed following principles of human visual cognition. The goal is to build a core of visual knowledge that can be used to train artificial systems for high-level visual understanding tasks, such as scene context, object recognition, action and event prediction, and theory-of-mind inference. The semantic categories of Places are defined by their function: the labels represent the entry-level of an environment. To illustrate, the dataset has different categories of bedrooms, or streets, etc, as one does not act the same way, and does not make the same predictions of what can happen next, in a home bedroom, an hotel bedroom or a nursery.
                <br>
                  &emsp;&emsp;In total, Places contains more than 10 million images comprising 400+ unique scene categories. The dataset features 5000 to 30,000 training images per class, consistent with real-world frequencies of occurrence. Using convolutional neural networks (CNN), Places dataset allows learning of deep scene features for various scene recognition tasks, with the goal to establish new state-of-the-art performances on scene-centric benchmarks..
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-dialog>


      <!--      background: url('http://pruning.vipazoo.cn/api/img/background/background_overallpreview.jpg') no-repeat 0% 20%/ cover;-->
      <el-dialog class="scrollable" v-model="dialogVisible" style="width:30%; height:50%; text-align: center; overflow: auto;"
                 :draggable="true" @close="dialogVisible = false" :append-to-body="true" title="Introduction for CIFAR"  >
        <div class="dialog-container">
          <div class="language-switch">
            <el-tabs v-model="activeTab" type="border-card" class="demo-tabs" :stretch=true>
              <el-tab-pane label="中文" name="cn">
                <div style="text-align: left; margin-bottom: 10px">
                  &emsp;&emsp;CIFAR(<b>C</b>anadian <b>I</b>nstitute for <b>A</b>dvanced <b>R</b>esearch)数据集是一个接近普适物体的小型彩色图像数据集，非常适合用于测试各种图像分类算法，是计算机视觉领域最广泛使用的经典数据集之一。其规模较小(每个图片的尺寸仅为32 × 32)、训练速度较快，便于研究人员在其上进行实验和研究。该数据集是由加拿大计算机科学家Geoffrey Hinton和他的学生Alex Krizhevsky、Vinod Nair和在2009年整理创建的。CIFAR数据集本质是从“tiny images”（8000万张小图数据集）中精炼剥离出来的一部分，然而后者由于涉及到了一些具有攻击性的内容，被彻底下架，也不允许已经下载的学术同仁传播。
                </div>
                <el-image
                    style="width: 100%; height: 100%"
                    :fit="'scale-down'"
                    class="image"
                    :preview-src-list="['http://pruning.vipazoo.cn/api/img/background/hinton.jpg']"
                    :src="`http://pruning.vipazoo.cn/api/img/background/hinton.jpg`"
                />
                <div style="text-align: left; margin: 10px 0;">
                  &emsp;&emsp;CIFAR-10一共包含10 个类别的RGB 彩色图片：飞机（airplane）、汽车（automobile）、鸟类（bird）、猫（cat）、鹿（deer）、狗（dog）、蛙类（frog）、马（horse）、船（ship）和卡车（truck）。每个图片的尺寸为32 × 32 ，每个类别有6000个图像，数据集中一共有50000 张训练图片和10000 张测试图片。
                </div>
                <el-image
                    style="width: 100%; height: 100%"
                    :fit="'scale-down'"
                    class="image"
                    :preview-src-list="['http://pruning.vipazoo.cn/api/img/background/cifar-10.png']"
                    :src="`http://pruning.vipazoo.cn/api/img/background/cifar-10.png`"
                />
                <div style="text-align: left; margin: 10px 0;">
                  &emsp;&emsp;CIFAR-100则包含了100个类。每个类有600张大小为32×32的彩色图像，其中500张作为训练集，100张作为测试集。对于每一张图像，它有fine_labels和coarse_labels两个标签，分别代表图像的细粒度和粗粒度标签，对应下图中的classes和superclass。也就是说，CIFAR-100数据集是分层次的、多粒度的。
                </div>
                <el-image
                    style="width: 100%; height: 100%"
                    :fit="'scale-down'"
                    class="image"
                    :preview-src-list="['http://pruning.vipazoo.cn/api/img/background/cifar-100.png']"
                    :src="`http://pruning.vipazoo.cn/api/img/background/cifar-100.png`"
                />
                <div style="text-align: left">CIFAR数据集官网: <el-link href="https://www.cs.toronto.edu/~kriz/cifar.html" target="_blank" type="primary">https://www.cs.toronto.edu/~kriz/cifar.html</el-link></div>

              </el-tab-pane>
              <el-tab-pane label="English" name="en">
                <div style="text-align: left; margin-bottom: 10px">
                  &emsp;&emsp;The CIFAR(<b>C</b>anadian <b>I</b>nstitute for <b>A</b>dvanced <b>R</b>esearch) dataset is a small, colored image dataset of nearly universal objects that is ideal for testing various image classification algorithms. It is one of the most widely used classic datasets in the field of computer vision. The dataset is relatively small, with each image being only 32×32 in size, and training speeds are fast, making it easy for researchers to conduct experiments and studies. The dataset was curated and created by Canadian computer scientist Geoffrey Hinton and his students Alex Krizhevsky and Vinod Nair in 2009. The CIFAR dataset is essentially a refined subset of the "tiny images" dataset of 80 million small images, but the latter was completely removed from circulation due to its inclusion of some aggressive content, and it is not allowed to be shared by academics who have already downloaded it.
                </div>
                <el-image
                    style="width: 100%; height: 100%"
                    :fit="'scale-down'"
                    class="image"
                    :preview-src-list="['http://pruning.vipazoo.cn/api/img/background/hinton-10.jpg']"
                    :src="`http://pruning.vipazoo.cn/api/img/background/hinton.jpg`"
                />
                <div style="text-align: left; margin: 10px 0;">
                  &emsp;&emsp;CIFAR-10 consists of RGB color images of 10 classes: airplanes, automobiles, birds, cats, deer, dogs, frogs, horses, ships, and trucks. Each image is 32x32 in size, and there are 6000 images per class, making a total of 50000 training images and 10000 test images in the dataset.
                </div>
                <el-image
                    style="width: 100%; height: 100%"
                    :fit="'scale-down'"
                    class="image"
                    :preview-src-list="['http://pruning.vipazoo.cn/api/img/background/cifar-10.png']"
                    :src="`http://pruning.vipazoo.cn/api/img/background/cifar-10.png`"
                />
                <div style="text-align: left; margin: 10px 0;">
                  &emsp;&emsp;CIFAR-100, on the other hand, contains 100 classes, with 600 images per class. Each image is a colored 32×32 picture, with 500 images used for training and 100 images used for testing. Each image has two labels: fine_labels and coarse_labels, representing the fine-grained and coarse-grained labels of the image, respectively, corresponding to the "classes" and "superclass" shown in the figure below. In other words, the CIFAR-100 dataset is hierarchical and multi-granular.
                </div>
                <el-image
                    style="width: 100%; height: 100%"
                    :fit="'scale-down'"
                    class="image"
                    :preview-src-list="['http://pruning.vipazoo.cn/api/img/background/cifar-100.png']"
                    :src="`http://pruning.vipazoo.cn/api/img/background/cifar-100.png`"
                />
                <div style="text-align: left">The official website of CIFAR dataset: <el-link href="https://www.cs.toronto.edu/~kriz/cifar.html" target="_blank" type="primary">https://www.cs.toronto.edu/~kriz/cifar.html</el-link></div>

              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-dialog>

      <el-dialog class="scrollable" v-model="dialogVisible2" style="width:30%; height:50%; text-align: center; overflow: auto;"
                 :draggable="true" @close="dialogVisible2 = false" :append-to-body="true" title="Introduction for ImageNet"  >
        <div class="dialog-container">
          <div class="language-switch">
            <el-tabs v-model="activeTab" type="border-card" class="demo-tabs" :stretch=true>
              <el-tab-pane label="中文" name="cn">
                <div style="text-align: left; margin-bottom: 10px">
                  &emsp;&emsp;ImageNet是一个由斯坦福大学的李飞飞教授带领创建的大型图像数据集，旨在解决机器学习中过拟合和泛化的问题，促进计算机图像识别技术的发展。该数据集最初于2007年开始手动建立，当时拥有超过100万张图像，并按照WordNet层次结构组织，每个节点由成百上千个图像来描述，涵盖了大部分生活中会看到的图片类别。2009年，ImageNet以论文的形式发布，2016年，ImageNet数据集已经超过1,400万张图片，包含14,197,122张图片和21,841个Synset索引。Synset是WordNet层次结构中的一个节点，又是一组同义词集合。直到现在，ImageNet仍是深度学习领域中图像分类、检测、定位最常用的数据集之一，作为算法性能的基准，对于深度学习的发展和推动具有举足轻重的地位。
                </div>
                <el-image
                    style="width: 100%; height: 100%"
                    :fit="'scale-down'"
                    class="image"
                    :preview-src-list="['http://pruning.vipazoo.cn/api/img/background/feifei2.jpeg']"
                    :src="`http://pruning.vipazoo.cn/api/img/background/feifei2.jpeg`"
                />
                <div style="text-align: left; margin: 10px 0;">
                  &emsp;&emsp;ILSVRC（<b>L</b>arge <b>S</b>cale <b>V</b>isual <b>R</b>ecognition <b>C</b>hallenge）是曾经每年开展的基于ImageNet数据集的比赛（即从ImageNet数据集中抽取部分样本作为比赛的数据集），其中最常用的是2012年的数据集，记为ILSVRC2012。该数据集拥有1000个分类，每个分类约有1000张图片，用于训练的图片总数约为120万张，并含有5万张图片作为验证集，10万张图片作为测试集。因此，ILSVRC这个词既可以用来指代比赛，也可以用来特指数据集。ILSVRC比赛包括图像分类、目标定位、目标检测、视频目标检测和场景分类等多个方面。ILSVRC竞赛中诞生了许多成功的图像识别方法，其中很多是深度学习方法，例如AlexNet、VGG、GoogLeNet和ResNet等耳熟能详的深度学习网络模型。
                </div>
                <el-image
                    style="width: 100%; height: 100%"
                    :fit="'scale-down'"
                    class="image"
                    :preview-src-list="['http://pruning.vipazoo.cn/api/img/background/ISVRC.jpg']"
                    :src="`http://pruning.vipazoo.cn/api/img/background/ISVRC.jpg`"
                />
                <div style="text-align: left; margin: 10px 0;">
                  &emsp;&emsp;可以说， ImageNet数据集和ILSVRC竞赛大大促进了计算机视觉技术和深度学习的发展，在深度学习的浪潮中占有举足轻重的地位。因此，每年的ILSVRC比赛都备受关注，其结果也受到广泛关注和讨论。直到2017年完成了最后一届ILSVRC竞赛。当人类肉眼分类错误率为5.1%时，网络的图像识别错误率已经达到约 2.9%。此时在算法层面已经刷得过拟合，将竞赛继续下去的意义不大（本身imagenet的图片就存在噪声，网络已经基本把训练集的噪声都拟合了）。图像感知的时代开始落幕，图像认知和理解的时代缓缓开始。
                </div>
                <el-image
                    style="width: 100%; height: 100%"
                    :fit="'scale-down'"
                    class="image"
                    :preview-src-list="['http://pruning.vipazoo.cn/api/img/background/imgnet_end.jpg']"
                    :src="`http://pruning.vipazoo.cn/api/img/background/imgnet_end.jpg`"
                />
                <div style="text-align: left">ImageNet数据集和ILSVRC竞赛官网: <el-link href="https://www.image-net.org/" target="_blank" type="primary">https://www.image-net.org/</el-link></div>

              </el-tab-pane>
              <el-tab-pane label="English" name="en">
                <div style="text-align: left; margin-bottom: 10px">
                  &emsp;&emsp;ImageNet is a large image dataset created under the leadership of Professor Fei-Fei Li at Stanford University, aimed at addressing the problems of overfitting and generalization in machine learning and promoting the development of computer vision technology. The dataset was initially manually constructed in 2007, containing over one million images organized according to the WordNet hierarchical structure, with each node described by hundreds or thousands of images, covering most of the categories of images seen in everyday life. In 2009, ImageNet was published as a paper, and by 2016, the dataset had grown to over 14 million images, containing 14,197,122 images and 21,841 Synset indexes. Synset is a node in the WordNet hierarchical structure and is a set of synonyms. Even today, ImageNet remains one of the most commonly used datasets in the field of deep learning for image classification, detection, and localization, serving as a benchmark for algorithm performance and playing a crucial role in the development and advancement of deep learning.
                </div>
                <el-image
                    style="width: 100%; height: 100%"
                    :fit="'scale-down'"
                    class="image"
                    :preview-src-list="['http://pruning.vipazoo.cn/api/img/background/feifei2.jpeg']"
                    :src="`http://pruning.vipazoo.cn/api/img/background/feifei2.jpeg`"
                />
                <div style="text-align: left; margin: 10px 0;">
                  &emsp;&emsp;ILSVRC（<b>L</b>arge <b>S</b>cale <b>V</b>isual <b>R</b>ecognition <b>C</b>hallenge） is an annual competition based on the ImageNet dataset, where a subset of the dataset is selected for the competition. The most commonly used subset is the 2012 dataset, known as ILSVRC2012, which contains 1,000 categories, each with approximately 1,000 images. The total number of images used for training is about 1.2 million, with 50,000 images as the validation set and 100,000 images as the test set. Therefore, the term ILSVRC refers to both the competition and the dataset itself. The ILSVRC competition includes various aspects, such as image classification, object localization, object detection, video object detection, and scene classification. Many successful image recognition methods have been developed through the ILSVRC competition, including many deep learning methods such as AlexNet, VGG, GoogLeNet, and ResNet.
                </div>
                <el-image
                    style="width: 100%; height: 100%"
                    :fit="'scale-down'"
                    class="image"
                    :preview-src-list="['http://pruning.vipazoo.cn/api/img/background/ISVRC.jpg']"
                    :src="`http://pruning.vipazoo.cn/api/img/background/ISVRC.jpg`"
                />
                <div style="text-align: left; margin: 10px 0;">
                  &emsp;&emsp;It can be said that the ImageNet dataset and ILSVRC competition have greatly promoted the development of computer vision technology and deep learning and have played a crucial role in the wave of deep learning. Therefore, the results of the annual ILSVRC competition are widely watched and discussed. The last ILSVRC competition was completed in 2017, where the error rate of the network's image recognition had reached approximately 2.9% when the human error rate was 5.1%. Continuing the competition would not have been meaningful, as the algorithms were already overfitting, and the noise in the ImageNet images had already been largely incorporated into the training set. The era of image perception is coming to an end, and the era of image cognition and understanding is slowly beginning.
                </div>
                <el-image
                    style="width: 100%; height: 100%"
                    :fit="'scale-down'"
                    class="image"
                    :preview-src-list="['http://pruning.vipazoo.cn/api/img/background/imgnet_end.jpg']"
                    :src="`http://pruning.vipazoo.cn/api/img/background/imgnet_end.jpg`"
                />
                <div style="text-align: left">The official website for ImageNet dataset and ILSVRC competition: <el-link href="https://www.image-net.org/" target="_blank" type="primary">https://www.image-net.org/</el-link></div>

              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-dialog>

      <el-dialog class="scrollable" v-model="dialogVisible3" style="width:30%; height:50%; text-align: center; overflow: auto;"
                 :draggable="true" @close="dialogVisible3 = false" :append-to-body="true" title="Introduction for VOC"  >
        <div class="dialog-container">
          <div class="language-switch">
            <el-tabs v-model="activeTab" type="border-card" class="demo-tabs" :stretch=true>
              <el-tab-pane label="中文" name="cn">
                <div style="text-align: left; margin-bottom: 10px">
                  &emsp;&emsp;PASCAL VOC挑战赛（The PASCAL Visual Object Classes）是一个世界级的计算机视觉挑战赛，PASCAL全称：Pattern Analysis, Statical Modeling and Computational Learning，是一个由欧盟资助的网络组织。
                  很多优秀的计算机视觉模型比如分类，定位，检测，分割，动作识别等模型都是基于PASCAL VOC挑战赛及其数据集上推出的，尤其是一些目标检测模型（比如大名鼎鼎的R-CNN系列，以及后面的YOLO，SSD等）。
                  PASCAL VOC从2005年开始举办挑战赛，每年的内容都有所不同，从最开始的分类，到后面逐渐增加检测，分割，人体布局，动作识别（Object Classification、Object Detection、Object Segmentation、Human Layout、Action Classification）等内容，数据集的容量以及种类也在不断的增加和改善。该项挑战赛催生出了一大批优秀的计算机视觉模型（尤其是以深度学习技术为主的）。
                </div>
                <el-image
                    style="width: 100%; height: 100%"
                    :fit="'scale-down'"
                    class="image"
                    :preview-src-list="['http://pruning.vipazoo.cn/api/img/background/voc1.png']"
                    :src="`http://pruning.vipazoo.cn/api/img/background/voc1.png`"
                />
                <el-image
                    style="width: 100%; height: 100%"
                    :fit="'scale-down'"
                    class="image"
                    :preview-src-list="['http://pruning.vipazoo.cn/api/img/background/voc2.png']"
                    :src="`http://pruning.vipazoo.cn/api/img/background/voc2.png`"
                />
                <el-image
                    style="width: 100%; height: 100%"
                    :fit="'scale-down'"
                    class="image"
                    :preview-src-list="['http://pruning.vipazoo.cn/api/img/background/voc3.png']"
                    :src="`http://pruning.vipazoo.cn/api/img/background/voc3.png`"
                />
                <div style="text-align: left; margin: 10px 0;">
                  &emsp;&emsp;我们知道在 ImageNet挑战赛上涌现了一大批优秀的分类模型，而PASCAL挑战赛上则是涌现了一大批优秀的目标检测和分割模型，这项挑战赛已于2012年停止举办了，但是研究者仍然可以在其服务器上提交预测结果以评估模型的性能。虽然近期的目标检测或分割模型更倾向于使用MS COCO数据集，但是这丝毫不影响 PASCAL VOC数据集的重要性，毕竟PASCAL对于目标检测或分割类型来说属于先驱者的地位。对于现在的研究者来说比较重要的两个年份的数据集是 PASCAL VOC 2007 与 PASCAL VOC 2012，这两个数据集频频在现在的一些检测或分割类的论文当中出现。
                </div>
                <ul style="text-align: left">
                  <li>
                    <el-link href="http://host.robots.ox.ac.uk/pascal/VOC/" target="_blank" type="primary">PASCAL主页</el-link>与<el-link href="http://host.robots.ox.ac.uk:8080/leaderboard/main_bootstrap.php" target="_blank" type="primary">排行榜</el-link>（榜上已几乎看不到传统的视觉模型了，全是基于深度学习的）。
                  </li>
                  <li>
                    <el-link href="https://link.zhihu.com/?target=http%3A//host.robots.ox.ac.uk/pascal/VOC/voc2007/" target="_blank" type="primary">PASCAL VOC 2007 挑战赛主页</el-link>，<el-link href="https://link.zhihu.com/?target=http%3A//host.robots.ox.ac.uk/pascal/VOC/voc2012/" target="_blank" type="primary">PASCAL VOC 2012 挑战赛主页</el-link>与<el-link href="https://link.zhihu.com/?target=http%3A//host.robots.ox.ac.uk%3A8080/" target="_blank" type="primary">PASCAL VOC Evaluation Server</el-link>。
                  </li>
                </ul>
                <div style="text-align: left; margin-bottom: 10px">
                  &emsp;&emsp;PASCAL VOC 数据集的20个类别及其层级结构：
                </div>
                <el-image
                    style="width: 100%; height: 100%"
                    :fit="'scale-down'"
                    class="image"
                    :preview-src-list="['http://pruning.vipazoo.cn/api/img/background/voc4.png']"
                    :src="`http://pruning.vipazoo.cn/api/img/background/voc4.png`"
                />
                <ul style="text-align: left">
                  <li>
                    2005年：还只有4个类别： bicycles, cars, motorbikes, people. Train/validation/test共有图片1578 张，包含2209 个已标注的目标objects.
                  </li>
                  <li>
                    <b>2007年 ：在这一年PASCAL VOC初步建立成一个完善的数据集。类别扩充到20类，Train/validation/test共有9963张图片，包含24640 个已标注的目标objects.</b>
                    <br>
                    <b>07年之前的数据集中test部分都是公布的，但是之后的都没有公布。</b>
                  </li>
                  <li>
                    2009年：从这一年开始，通过在前一年的数据集基础上增加新数据的方式来扩充数据集。比如09年的数据集是包含了08年的数据集的，也就是说08年的数据集是09年的一个子集，以后每年都是这样的扩充方式，直到2012年；09年之前虽然每年的数据集都在变大（08年比07年略少），但是每年的数据集都是不一样的，也就是说每年的数据集都是互斥的，没有重叠的图片。
                  </li>
                  <li>
                    <b>2012年：从09年到11年，数据量仍然通过上述方式不断增长，11年到12年，用于分类、检测和person layout 任务的数据量没有改变。主要是针对分割和动作识别，完善相应的数据子集以及标注信息。</b>
                  </li>
                </ul>
                <div style="text-align: left; margin: 10px 0;">
                  &emsp;&emsp;对于分类和检测来说，也就是下图所示的发展历程，相同颜色的代表相同的数据集：
                </div>
                <el-image
                    style="width: 100%; height: 100%"
                    :fit="'scale-down'"
                    class="image"
                    :preview-src-list="['http://pruning.vipazoo.cn/api/img/background/voc5.png']"
                    :src="`http://pruning.vipazoo.cn/api/img/background/voc5.png`"
                />
                <div style="text-align: left; margin: 10px 0;">
                  &emsp;&emsp;分割任务的数据集变化略有不同：
                </div>
                <ul style="text-align: left">
                  <li>
                    VOC 2012用于分类和检测的数据包含 2008-2011年间的所有数据，并与VOC2007互斥。
                  </li>
                  <li>
                    VOC 2012用于分割的数据中train+val包含 2007-2011年间的所有数据，test包含2008-2011年间的数据，没有包含07年的是因为07年的test数据已经公开了。
                  </li>
                </ul>
                <div style="text-align: left; margin: 10px 0;">
                  &emsp;&emsp;<b>数据集总体的统计情况（包含测试集）:</b>
                </div>
                <el-image
                    style="width: 100%; height: 100%"
                    :fit="'scale-down'"
                    class="image"
                    :preview-src-list="['http://pruning.vipazoo.cn/api/img/background/voc6.png']"
                    :src="`http://pruning.vipazoo.cn/api/img/background/voc6.png`"
                />



              </el-tab-pane>
              <el-tab-pane label="English" name="en">
                <div style="text-align: left; margin-bottom: 10px">
                  &emsp;&emsp;The PASCAL Visual Object Classes (VOC) Challenge is a world-class computer vision competition. PASCAL stands for Pattern Analysis, Statistical Modeling, and Computational Learning, and it is a network organization funded by the European Union. Many outstanding computer vision models, such as classification, localization, detection, segmentation, and action recognition models, are based on the PASCAL VOC challenge and its datasets, particularly some object detection models (such as the famous R-CNN series, as well as later models like YOLO and SSD). The PASCAL VOC challenge has been held since 2005, and the content varies from year to year, from the initial classification to the gradual addition of detection, segmentation, human layout, and action recognition (object classification, object detection, object segmentation, human layout, and action classification). The size and variety of the datasets are constantly increasing and improving. This challenge has produced a large number of excellent computer vision models, especially those based on deep learning techniques.
                </div>
                <el-image
                    style="width: 100%; height: 100%"
                    :fit="'scale-down'"
                    class="image"
                    :preview-src-list="['http://pruning.vipazoo.cn/api/img/background/voc1.png']"
                    :src="`http://pruning.vipazoo.cn/api/img/background/voc1.png`"
                />
                <el-image
                    style="width: 100%; height: 100%"
                    :fit="'scale-down'"
                    class="image"
                    :preview-src-list="['http://pruning.vipazoo.cn/api/img/background/voc2.png']"
                    :src="`http://pruning.vipazoo.cn/api/img/background/voc2.png`"
                />
                <el-image
                    style="width: 100%; height: 100%"
                    :fit="'scale-down'"
                    class="image"
                    :preview-src-list="['http://pruning.vipazoo.cn/api/img/background/voc3.png']"
                    :src="`http://pruning.vipazoo.cn/api/img/background/voc3.png`"
                />
                <div style="text-align: left; margin: 10px 0;">
                  &emsp;&emsp;We know that a large number of excellent classification models emerged in the ImageNet Challenge, while a large number of excellent object detection and segmentation models emerged in the PASCAL Challenge, which was discontinued in 2012, but researchers can still submit prediction results on its server to evaluate model performance. Although recent object detection or segmentation models tend to use the MS COCO dataset, this does not diminish the importance of the PASCAL VOC dataset, as PASCAL has a pioneering status for object detection or segmentation. The two important years of datasets for current researchers are PASCAL VOC 2007 and PASCAL VOC 2012, which frequently appear in papers on detection or segmentation.
                </div>
                <ul style="text-align: left">
                  <li>
                    <el-link href="http://host.robots.ox.ac.uk/pascal/VOC/" target="_blank" type="primary">PASCAL homepage </el-link>and <el-link href="http://host.robots.ox.ac.uk:8080/leaderboard/main_bootstrap.php" target="_blank" type="primary">its ranking board</el-link> (Traditional visual models are almost absent from the ranking board, with all of them being based on deep learning).
                  </li>
                  <li>
                    <el-link href="https://link.zhihu.com/?target=http%3A//host.robots.ox.ac.uk/pascal/VOC/voc2007/" target="_blank" type="primary">PASCAL VOC 2007 challenge homepage</el-link>，<el-link href="https://link.zhihu.com/?target=http%3A//host.robots.ox.ac.uk/pascal/VOC/voc2012/" target="_blank" type="primary">PASCAL VOC 2012 challenge homepage</el-link> and <el-link href="https://link.zhihu.com/?target=http%3A//host.robots.ox.ac.uk%3A8080/" target="_blank" type="primary">PASCAL VOC Evaluation Server</el-link>。
                  </li>
                </ul>
                <div style="text-align: left; margin-bottom: 10px">
                  &emsp;&emsp;The 20 categories and their hierarchical structure of the PASCAL VOC dataset:
                </div>
                <el-image
                    style="width: 100%; height: 100%"
                    :fit="'scale-down'"
                    class="image"
                    :preview-src-list="['http://pruning.vipazoo.cn/api/img/background/voc4.png']"
                    :src="`http://pruning.vipazoo.cn/api/img/background/voc4.png`"
                />
                <ul style="text-align: left">
                  <li>
                    In 2005, there were only four categories in the PASCAL VOC dataset: bicycles, cars, motorbikes, and people. There were a total of 1578 images in the train/validation/test sets, which included 2209 annotated objects.
                  </li>
                  <li>
                    <b>In 2007, the PASCAL VOC dataset was established as a comprehensive dataset. The number of categories was expanded to 20, and there were a total of 9963 images in the train/validation/test sets, which included 24640 annotated objects.</b>
                    <br>
                    <b>Before 2007, the test portion of the PASCAL VOC dataset was publicly available, but after that year, it was no longer released to the public.</b>
                  </li>
                  <li>
                    Starting from 2009, the PASCAL VOC dataset was expanded by adding new data to the previous year's dataset. For example, the 2009 dataset included the 2008 dataset, meaning that the 2008 dataset was a subset of the 2009 dataset. This expansion method continued every year until 2012. Before 2009, although the dataset grew in size every year (with 2008 having slightly fewer images than 2007), each year's dataset was different, meaning that the datasets were mutually exclusive with no overlapping images.
                  </li>
                  <li>
                    <b>In 2012, the PASCAL VOC dataset continued to grow in size from 2009 to 2011 using the aforementioned method. From 2011 to 2012, there was no change in the amount of data used for classification, detection, and person layout tasks. However, the dataset was further improved with additional subsets and annotation information for segmentation and action recognition tasks.</b>
                  </li>
                </ul>
                <div style="text-align: left; margin: 10px 0;">
                  &emsp;&emsp;For classification and detection, which is represented in the following timeline, datasets of the same color represent the same dataset:
                </div>
                <el-image
                    style="width: 100%; height: 100%"
                    :fit="'scale-down'"
                    class="image"
                    :preview-src-list="['http://pruning.vipazoo.cn/api/img/background/voc5.png']"
                    :src="`http://pruning.vipazoo.cn/api/img/background/voc5.png`"
                />
                <div style="text-align: left; margin: 10px 0;">
                  &emsp;&emsp;The changes to the dataset for segmentation tasks are slightly different:
                </div>
                <ul style="text-align: left">
                  <li>
                    The VOC 2012 dataset for classification and detection tasks included all data from 2008 to 2011, and was mutually exclusive with the VOC 2007 dataset.
                  </li>
                  <li>
                    The VOC 2012 dataset for segmentation tasks included all data from 2007 to 2011 in the train+val set, and data from 2008 to 2011 in the test set. The reason why the VOC 2007 data was not included is that the test data from 2007 had already been made public.
                  </li>
                </ul>
                <div style="text-align: left; margin: 10px 0;">
                  &emsp;&emsp;<b>The overall statistical information of the dataset (including the test set):</b>
                </div>
                <el-image
                    style="width: 100%; height: 100%"
                    :fit="'scale-down'"
                    class="image"
                    :preview-src-list="['http://pruning.vipazoo.cn/api/img/background/voc6.png']"
                    :src="`http://pruning.vipazoo.cn/api/img/background/voc6.png`"
                />
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-dialog>

      <el-dialog class="scrollable" v-model="dialogVisible4" style="width:30%; height:50%; text-align: center; overflow: auto;"
                 :draggable="true" @close="dialogVisible4 = false" :append-to-body="true" title="Introduction for COCO"  >
        <div class="dialog-container">
          <div class="language-switch">
            <el-tabs v-model="activeTab" type="border-card" class="demo-tabs" :stretch=true>
              <el-tab-pane label="中文" name="cn">
                <div style="text-align: left; margin-bottom: 10px">
                  &emsp;&emsp;MS COCO（Microsoft Common Objects in Context）起源于微软于2014年出资标注的Microsoft COCO数据集，与ImageNet竞赛一样，被视为是计算机视觉领域最受关注和最权威的比赛之一。
                  COCO数据集是一个大型的、丰富的物体检测，分割和字幕数据集。这个数据集以scene understanding为目标，主要从复杂的日常场景中截取，图像中的目标通过精确的segmentation进行位置的标定。图像包括91类目标，328000影像和2500000个label。目前为止有语义分割的最大数据集，提供的类别有80类，有超过33万张图片，其中20万张有标注，整个数据集中个体的数目超过150万个。
                </div>
                <el-image
                    style="width: 100%; height: 100%"
                    :fit="'scale-down'"
                    class="image"
                    :preview-src-list="['http://pruning.vipazoo.cn/api/img/background/coco1.png']"
                    :src="`http://pruning.vipazoo.cn/api/img/background/coco1.png`"
                />
                <div style="text-align: left; margin: 10px 0;">
                  &emsp;&emsp;当ImageNet竞赛停办后，COCO竞赛就成为是目标识别、检测等领域的一个最权威、最重要的标杆，也是目前该领域在国际上唯一能汇集Google、微软、Facebook以及国内外众多顶尖院校和优秀创新企业共同参与的大赛。
                  该数据集主要解决3个问题：目标检测，目标之间的上下文关系，目标的2维上的精确定位。COCO数据集有91类，虽然比ImageNet和SUN类别少，但是每一类的图像多，这有利于获得更多的每类中位于某种特定场景的能力，对比PASCAL VOC，其有更多类和图像。
                  <br>
                  <br>
                  <b>COCO数据集可以应用到的Task：</b>
                </div>
                <ul style="text-align: left">
                  <li>
                    目标检测（object detection），使用 bounding box 或者 object segmentation (也称为instance segmentation)将不同的目标进行标定。
                    <br>
                    <br>
                    <el-image
                        style="width: 100%; height: 100%"
                        :fit="'scale-down'"
                        class="image"
                        :preview-src-list="['http://pruning.vipazoo.cn/api/img/background/coco2.png']"
                        :src="`http://pruning.vipazoo.cn/api/img/background/coco2.png`"
                    />
                  </li>
                  <li>
                    Densepose（密集姿势估计），DensePose任务涉及同时检测人、分割他们的身体并将属于人体的所有图像像素映射到身体的3D表面。用于不可控条件下的密集人体姿态估计。
                    <br>
                    <br>
                    <el-image
                        style="width: 100%; height: 100%"
                        :fit="'scale-down'"
                        class="image"
                        :preview-src-list="['http://pruning.vipazoo.cn/api/img/background/coco3.png']"
                        :src="`http://pruning.vipazoo.cn/api/img/background/coco3.png`"
                    />
                  </li>
                  <li>
                    Key-points detection（关键点检测），在任意姿态下对人物的关键点进行定位，该任务包含检测行人及定位到行人的关键点。
                    <br>
                    <br>
                    <el-image
                        style="width: 100%; height: 100%"
                        :fit="'scale-down'"
                        class="image"
                        :preview-src-list="['http://pruning.vipazoo.cn/api/img/background/coco4.png']"
                        :src="`http://pruning.vipazoo.cn/api/img/background/coco4.png`"
                    />
                  </li>
                  <li>
                    Stuff Segmentation，语义分割中针对stuff class类的分割。（草，墙壁，天空等）
                    <br>
                    <br>
                    <el-image
                        style="width: 100%; height: 100%"
                        :fit="'scale-down'"
                        class="image"
                        :preview-src-list="['http://pruning.vipazoo.cn/api/img/background/coco5.png']"
                        :src="`http://pruning.vipazoo.cn/api/img/background/coco5.png`"
                    />
                  </li>
                  <li>
                    Panoptic Segmentation（全景分割）。其目的是生成丰富且完整的连贯场景分割，这是实现自主驾驶或增强现实等真实世界视觉系统的重要一步。
                    <br>
                    <br>
                    <el-image
                        style="width: 100%; height: 100%"
                        :fit="'scale-down'"
                        class="image"
                        :preview-src-list="['http://pruning.vipazoo.cn/api/img/background/coco6.png']"
                        :src="`http://pruning.vipazoo.cn/api/img/background/coco6.png`"
                    />
                  </li>
                  <li>
                    image captioning（图像标题生成），根据图像生成一段文字。
                    <br>
                    <br>
                    <el-image
                        style="width: 100%; height: 100%"
                        :fit="'scale-down'"
                        class="image"
                        :preview-src-list="['http://pruning.vipazoo.cn/api/img/background/coco7.png']"
                        :src="`http://pruning.vipazoo.cn/api/img/background/coco7.png`"
                    />
                  </li>
                </ul>

                <div style="text-align: left">COCO数据集官网: <el-link href="http://cocodataset.org" target="_blank" type="primary">http://cocodataset.org</el-link></div>
              </el-tab-pane>
              <el-tab-pane label="English" name="en">
                <div style="text-align: left; margin-bottom: 10px">
                  &emsp;&emsp;MS COCO (Microsoft Common Objects in Context) originated from the Microsoft COCO dataset, which was annotated by Microsoft in 2014. Similar to the ImageNet competition, it is considered one of the most prestigious and highly regarded competitions in the field of computer vision. The COCO dataset is a large and rich object detection, segmentation, and captioning dataset. The dataset aims for scene understanding and is primarily captured from complex everyday scenes. The location of the objects in the images is marked with precise segmentation. The dataset includes 91 object categories, 328,000 images, and 2,500,000 labels. It is currently the largest dataset for semantic segmentation, providing 80 categories with over 330,000 images, of which 200,000 are annotated. The total number of individuals in the dataset exceeds 1.5 million.
                </div>
                <el-image
                    style="width: 100%; height: 100%"
                    :fit="'scale-down'"
                    class="image"
                    :preview-src-list="['http://pruning.vipazoo.cn/api/img/background/coco1.png']"
                    :src="`http://pruning.vipazoo.cn/api/img/background/coco1.png`"
                />
                <div style="text-align: left; margin: 10px 0;">
                  &emsp;&emsp;After the ImageNet competition was discontinued, the COCO competition became the most authoritative and important benchmark in the field of target recognition, detection, and other related areas. It is currently the only international competition that brings together Google, Microsoft, Facebook, many top universities and excellent innovative companies from home and abroad. The dataset mainly addresses three problems: target detection, context between targets, and precise 2D localization of targets. The COCO dataset has 91 categories, although fewer than ImageNet and SUN, each category has more images, which is advantageous for obtaining more abilities for each category in a specific scene. Compared to PASCAL VOC, COCO has more categories and images.
                  <br>
                  <br>
                  <b>Tasks that COCO dataset can be applied to:</b>
                </div>
                <ul style="text-align: left">
                  <li>
                    Object detection, which uses bounding boxes or object segmentation (also known as instance segmentation) to label different objects.
                    <br>
                    <br>
                    <el-image
                        style="width: 100%; height: 100%"
                        :fit="'scale-down'"
                        class="image"
                        :preview-src-list="['http://pruning.vipazoo.cn/api/img/background/coco2.png']"
                        :src="`http://pruning.vipazoo.cn/api/img/background/coco2.png`"
                    />
                  </li>
                  <li>
                    DensePose, which involves detecting people, segmenting their bodies, and mapping all image pixels belonging to the human body to the 3D surface of the body. It is used for dense human pose estimation under uncontrolled conditions.
                    <br>
                    <br>
                    <el-image
                        style="width: 100%; height: 100%"
                        :fit="'scale-down'"
                        class="image"
                        :preview-src-list="['http://pruning.vipazoo.cn/api/img/background/coco3.png']"
                        :src="`http://pruning.vipazoo.cn/api/img/background/coco3.png`"
                    />
                  </li>
                  <li>
                    Key-points detection, which locates the key points of a person in any pose. This task involves detecting pedestrians and locating their key points.
                    <br>
                    <br>
                    <el-image
                        style="width: 100%; height: 100%"
                        :fit="'scale-down'"
                        class="image"
                        :preview-src-list="['http://pruning.vipazoo.cn/api/img/background/coco4.png']"
                        :src="`http://pruning.vipazoo.cn/api/img/background/coco4.png`"
                    />
                  </li>
                  <li>
                    Stuff Segmentation, which refers to segmentation of stuff classes in semantic segmentation. (such as grass, walls, sky, etc.)
                    <br>
                    <br>
                    <el-image
                        style="width: 100%; height: 100%"
                        :fit="'scale-down'"
                        class="image"
                        :preview-src-list="['http://pruning.vipazoo.cn/api/img/background/coco5.png']"
                        :src="`http://pruning.vipazoo.cn/api/img/background/coco5.png`"
                    />
                  </li>
                  <li>
                    Panoptic Segmentation, which aims to generate rich and complete coherent scene segmentation, is an important step towards achieving real-world visual systems such as autonomous driving or augmented reality.
                    <br>
                    <br>
                    <el-image
                        style="width: 100%; height: 100%"
                        :fit="'scale-down'"
                        class="image"
                        :preview-src-list="['http://pruning.vipazoo.cn/api/img/background/coco6.png']"
                        :src="`http://pruning.vipazoo.cn/api/img/background/coco6.png`"
                    />
                  </li>
                  <li>
                    Image captioning, which generates a piece of text based on an image.
                    <br>
                    <br>
                    <el-image
                        style="width: 100%; height: 100%"
                        :fit="'scale-down'"
                        class="image"
                        :preview-src-list="['http://pruning.vipazoo.cn/api/img/background/coco7.png']"
                        :src="`http://pruning.vipazoo.cn/api/img/background/coco7.png`"
                    />
                  </li>
                </ul>
                <div style="text-align: left">The official website for COCO dataset: <el-link href="http://cocodataset.org" target="_blank" type="primary">http://cocodataset.org</el-link></div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-dialog>


      <el-dialog class="scrollable" v-model="dialogVisible5" style="width:30%; height:50%; text-align: center; overflow: auto;"
                 :draggable="true" @close="dialogVisible5 = false" :append-to-body="true" title="Introduction for CUB"  >
        <div class="dialog-container">
          <div class="language-switch">
            <el-tabs v-model="activeTab" type="border-card" class="demo-tabs" :stretch=true>
              <el-tab-pane label="中文" name="cn">
                <div style="text-align: left; margin-bottom: 10px">
                  &emsp;&emsp;CUB-200-2011（Caltech-UCSD Birds-200-2011）数据集是最广泛用于细粒度视觉分类任务的数据集。该数据集由加州大学欧文分校的计算机科学系创建，包含来自200种鸟类的大约11,788张图像，其中5,994张用于训练，5,794张用于测试。每个类别的图像数量不同，但平均每个类别有约60张图像。
                </div>
                <el-image
                    style="width: 100%; height: 100%"
                    :fit="'scale-down'"
                    class="image"
                    :preview-src-list="['http://pruning.vipazoo.cn/api/img/background/cub1.jpeg']"
                    :src="`http://pruning.vipazoo.cn/api/img/background/cub1.jpeg`"
                />
                <div style="text-align: left; margin: 10px 0;">
                  &emsp;&emsp;每个图像都有对应的标注信息，包括鸟类名称、图像ID、物种ID、辅助信息（如地理位置、相机设置等）等。数据集中的图像来自于在线鸟类图片库和一些个人的收集。文本信息来自Reed等人。他们通过收集细致的自然语言描述来扩展CUB-200-2011数据集。每张图像收集了十个单句描述。自然语言描述通过亚马逊机械土耳其（AMT）平台收集，要求至少包含10个单词，不包含子类别和动作的任何信息。除了基本的分类任务外，该数据集还可用于学习鸟类特征的表示，以及探索多样性和视角变化等方面的问题。
                </div>
                <div style="text-align: left">CUB数据集主页: <el-link href="http://www.vision.caltech.edu/datasets/cub_200_2011/" target="_blank" type="primary">http://www.vision.caltech.edu/datasets/cub_200_2011/</el-link></div>

                <!--                <div style="text-align: left; margin: 10px 0;">-->
                <!--                  <el-link href="" target="_blank" type="primary">CUB数据集主页</el-link>-->
                <!--                </div>-->



              </el-tab-pane>
              <el-tab-pane label="English" name="en">
                <div style="text-align: left; margin-bottom: 10px">
                  &emsp;&emsp;The CUB-200-2011 (Caltech-UCSD Birds-200-2011) dataset is the most widely-used dataset for fine-grained visual categorization task. The dataset was created by the Department of Computer Science at the University of California, Irvine and contains approximately 11,788 images from 200 different bird species, including 5,994 for training and 5,794 for testing. The number of images per category varies, but on average there are about 60 images per category.
                </div>
                <el-image
                    style="width: 100%; height: 100%"
                    :fit="'scale-down'"
                    class="image"
                    :preview-src-list="['http://pruning.vipazoo.cn/api/img/background/cub1.jpeg']"
                    :src="`http://pruning.vipazoo.cn/api/img/background/cub1.jpeg`"
                />
                <div style="text-align: left; margin: 10px 0;">
                  &emsp;&emsp;Each image in the dataset is accompanied by corresponding annotation information, including the bird species name, image ID, species ID, and auxiliary information such as geographic location and camera settings. The images in the dataset come from online bird image libraries and some personal collections. The textual information comes from Reed et al.. They expand the CUB-200-2011 dataset by collecting fine-grained natural language descriptions. Ten single-sentence descriptions are collected for each image. The natural language descriptions are collected through the Amazon Mechanical Turk (AMT) platform, and are required at least 10 words, without any information of subcategories and actions. In addition to basic classification tasks, this dataset can also be used for learning representations of bird features and exploring issues such as diversity and changes in perspective.
                </div>
                <div style="text-align: left">CUB dataset homepage: <el-link href="http://www.vision.caltech.edu/datasets/cub_200_2011/" target="_blank" type="primary">http://www.vision.caltech.edu/datasets/cub_200_2011/</el-link></div>

              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-dialog>


      <el-dialog class="scrollable" v-model="dialogVisible6" style="width:30%; height:50%; text-align: center; overflow: auto;"
                 :draggable="true" @close="dialogVisible6 = false" :append-to-body="true" title="Introduction for CARS"  >
        <div class="dialog-container">
          <div class="language-switch">
            <el-tabs v-model="activeTab" type="border-card" class="demo-tabs" :stretch=true>
              <el-tab-pane label="中文" name="cn">
                <div style="text-align: left; margin-bottom: 10px">
                  &emsp;&emsp;斯坦福汽车数据集包含196种车型，总共有16,185张图片，均为从后方拍摄。数据被分成了近乎50-50的训练/测试集，其中有8,144张训练图片和8,041张测试图片。分类通常按照制造商、型号和年份进行。这些图像的尺寸为360×240。
                </div>
                <el-image
                    style="width: 100%; height: 100%"
                    :fit="'scale-down'"
                    class="image"
                    :preview-src-list="['http://pruning.vipazoo.cn/api/img/background/cars.jpg']"
                    :src="`http://pruning.vipazoo.cn/api/img/background/cars.jpg`"
                />
                <div style="text-align: left">CARS数据集主页: <el-link href="https://ai.stanford.edu/~jkrause/cars/car_dataset.html" target="_blank" type="primary">https://ai.stanford.edu/~jkrause/cars/car_dataset.html</el-link></div>

                <!--                <div style="text-align: left; margin: 10px 0;">-->
                <!--                  <el-link href="" target="_blank" type="primary">CUB数据集主页</el-link>-->
                <!--                </div>-->



              </el-tab-pane>
              <el-tab-pane label="English" name="en">
                <div style="text-align: left; margin-bottom: 10px">
                  &emsp;&emsp;The Stanford Cars dataset consists of 196 classes of cars with a total of 16,185 images, taken from the rear. The data is divided into almost a 50-50 train/test split with 8,144 training images and 8,041 testing images. Categories are typically at the level of Make, Model, Year. The images are 360×240.
                </div>
                <el-image
                    style="width: 100%; height: 100%"
                    :fit="'scale-down'"
                    class="image"
                    :preview-src-list="['http://pruning.vipazoo.cn/api/img/background/cars.jpg']"
                    :src="`http://pruning.vipazoo.cn/api/img/background/cars.jpg`"
                />
                <div style="text-align: left">CARS dataset homepage: <el-link href="https://ai.stanford.edu/~jkrause/cars/car_dataset.html" target="_blank" type="primary">https://ai.stanford.edu/~jkrause/cars/car_dataset.html</el-link></div>

              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-dialog>


    </div>






    <!--    style="background: linear-gradient(transparent,#78E9E8 100%);"-->
    <div v-else>
      <!--      <el-icon @click="backDatasetPreview" style="display: flex" size="50px"><Back/></el-icon>-->
      <h1>{{chosen}} Examples</h1>
      <div class="myCenter3">
        <div class="myCenter2">
          <div class="myCenter">
            <!--        <el-row>-->
            <!--          <el-col :span="7"/>-->
            <!--          <el-col :span="10">-->




            <el-row>
              <el-col :span="4" v-for="(item,index) in showList">
                <div class="fixedpreview2">
                  <el-image
                      :src="`http://${item}`"
                      :preview-src-list="showList.map(x=>'http://'+x)"
                      :initial-index="index"
                      style="width: 100%; height: 100%"
                      :fit="'fill'"
                  />
                </div>
              </el-col>
            </el-row>



            <div class="foot">
              <el-pagination
                  v-model:current-page="listPage"
                  :page-size="imageNumber"
                  :pager-count="7"
                  layout="prev, pager, next"
                  :total="Number(`${fileList2.length}`)"
                  @current-change="updateShowList2"
                  hide-on-single-page
              />
              <el-button @click="backPreview" type="warning" plain>Back to Preview</el-button>
            </div>


          </div>

        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import ImagePreviewer from "./components/imagePreviewer.vue";
import {router} from '@/router'
import {Back} from "@element-plus/icons-vue"
import {useStore} from "vuex";
import {reactive, toRefs, ref} from "vue";
import request from "../../api/index";
import {Search} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
const listPage = ref(1), imageNumber = ref(30);
const resultLoading = ref(false);
const store = useStore();
const user = store.state.username;
const ispreview = ref(true)
const dialogFormVisible = ref(false);
const form = reactive({
  datasetName: "",
  public: true,
  username: user
});

const dialogVisible = ref(false);
const dialogVisible2 = ref(false);
const dialogVisible3 = ref(false);
const dialogVisible4 = ref(false);
const dialogVisible5 = ref(false);
const dialogVisible6 = ref(false);
const dialogVisibleNWPU = ref(false);
const dialogVisibleFood101 = ref(false);
const dialogVisiblePlace365 = ref(false);

const activeTab = ref('en')
// const cnIntroduction = ref('Cifar数据集是一个用于图像分类的经典数据集，由10个类别的60,000张32x32彩色图像组成。每个类别有6,000张图像。其中50,000张用于训练，10,000张用于测试。该数据集是由加拿大计算机科学家Alex Krizhevsky、Vinod Nair和Geoffrey Hinton在2009年创建的。这个数据集非常适合用于测试各种图像分类算法，是计算机视觉领域最广泛使用的数据集之一。由于其规模较小，因此训练速度较快，也便于研究人员在其上进行实验和研究。')
// const enIntroduction = ref('The Cifar dataset is a classic dataset for image classification, consisting of 60,000 32x32 color images in 10 classes. There are 6,000 images per class. 50,000 images are used for training and 10,000 images are used for testing. The dataset was created by Canadian computer scientists Alex Krizhevsky, Vinod Nair, and Geoffrey Hinton in 2009. This dataset is very suitable for testing various image classification algorithms and is one of the most widely used datasets in the field of computer vision. Due to its small size, it trains relatively quickly and is also easy for researchers to experiment and study on.')



const refreshShowDataset=ref(true)
const currentPageList = ref([]);
const nowPage = ref(1), datasetNumber = ref(3);
const showList = ref([]), showList2 = ref([]), pictureShowList=ref([]), listPreview = ref([]);
const CifarList = ref([]), ImageNetList = ref([]), vocList = ref([]), cocoList = ref([]);
const NWPU = ref([]), Food101 = ref([]), Place365=ref([])
const fileList = ref(['pruning.vipazoo.cn/api/Cifar/0_1740.jpg','pruning.vipazoo.cn/api/Cifar/3_10557.jpg','pruning.vipazoo.cn/api/Cifar/7_18534.jpg',
  'pruning.vipazoo.cn/api/originalImgNet/n01798484/n01798484_14557.JPEG','pruning.vipazoo.cn/api/originalImgNet/n01491361/n01491361_3683.JPEG',
  'pruning.vipazoo.cn/api/originalImgNet/n01440764/n01440764_6628.JPEG','pruning.vipazoo.cn/api/originalVOC/2007_000648.jpg',
  'pruning.vipazoo.cn/api/originalVOC/2007_005086.jpg','pruning.vipazoo.cn/api/originalVOC/2007_000836.jpg','pruning.vipazoo.cn/api/cocoimg/000000165012.jpg',
  'pruning.vipazoo.cn/api/cocoimg/000000189617.jpg','pruning.vipazoo.cn/api/cocoimg/000000308175.jpg','pruning.vipazoo.cn/api/CUB/014_Indigo_Bunting/Indigo_Bunting_0004_13195.jpg'
  ,'pruning.vipazoo.cn/api/CUB/038_Great_Crested_Flycatcher/Great_Crested_Flycatcher_0024_29516.jpg','pruning.vipazoo.cn/api/CUB/028_Brown_Creeper/Brown_Creeper_0075_24947.jpg',
  'pruning.vipazoo.cn/api/CARS/00009.jpg','pruning.vipazoo.cn/api/CARS/00082.jpg','pruning.vipazoo.cn/api/CARS/00246.jpg','pruning.vipazoo.cn/api/NWPU/cloud/cloud_048.jpg',
  'pruning.vipazoo.cn/api/NWPU/river/river_036.jpg','pruning.vipazoo.cn/api/NWPU/snowberg/snowberg_125.jpg','pruning.vipazoo.cn/api/Food101/beef_carpaccio/65324.jpg',
  'pruning.vipazoo.cn/api/Food101/ceviche/25779.jpg','pruning.vipazoo.cn/api/Food101/frozen_yogurt/196013.jpg','pruning.vipazoo.cn/api/Place365/arcade/00000008.jpg',
  'pruning.vipazoo.cn/api/Place365/beach_house/00000002.jpg', 'pruning.vipazoo.cn/api/Place365/childs_room/00000111.jpg']);


// /nfs3-p2/duanjr/places365_standard/train/arcade/00000008.jpg
// /nfs3-p2/duanjr/places365_standard/train/beach_house/00000002.jpg
// /nfs3-p2/duanjr/places365_standard/train/childs_room/00000111.jpg
// /nfs/lhl/datasets/food-101/food-101/train/frozen_yogurt/196013.jpg
// /nfs/lhl/datasets/food-101/food-101/train/ceviche/25779.jpg
// /nfs/lhl/datasets/food-101/food-101/train/beef_carpaccio/65324.jpg
// /nfs/lhl/datasets/NWPU-RESISC45_dataset/train/river/river_036.jpg
// /nfs/lhl/datasets/NWPU-RESISC45_dataset/train/snowberg/snowberg_125.jpg
// /nfs/lhl/datasets/NWPU-RESISC45_dataset/train/cloud/cloud_048.jpg

const chosen = ref("")
const fileList2 = ref([])
const cubList = ref([])
const carList = ref([])
const searchOption = ref("getUserDatasets"), searchContent = ref("");
const optionList = [
  {
    value: "blurredFindDatasetByName",
    label: "数据集名称(模糊搜索)"
  }, {
    value: "getUserDatasets",
    label: "用户名(精确搜索)"
  }
];
const pictureDataInfosList = ref([]),datasetInfoList = ref([]);

function showDialog() {
  console.log("进来了")
  dialogVisible.value = true;
}

function showDialog2() {
  console.log("进来了")
  dialogVisible2.value = true;
}

function showDialogFood101(){
  console.log("进来了")
  dialogVisibleFood101.value = true;
}

function showDialogPlace365(){
  console.log("进来了")
  dialogVisiblePlace365.value = true;
}

function showDialogNWPU() {
  console.log("进来了")
  dialogVisibleNWPU.value = true;
}

function showDialog3() {
  console.log("进来了")
  dialogVisible3.value = true;
}

function showDialog4() {
  console.log("进来了")
  dialogVisible4.value = true;
}

function showDialog5() {
  console.log("进来了")
  dialogVisible5.value = true;
}

function showDialog6() {
  console.log("进来了")
  dialogVisible6.value = true;
}

//下面是公开数据集的预览
async function realRefreshImages(option){  //图像池的刷新
  await getImgPoolInfos(option);
  updatePoolList();
}

async function getImgPoolInfos(option){
  let requestUrl = "/dataset/" + option;
  await request.post(requestUrl)
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

const updatePoolList = () => {
  CifarList.value[0] = fileList.value[0]
  CifarList.value[1] = fileList.value[1]
  CifarList.value[2] = fileList.value[2]
  ImageNetList.value[0] = fileList.value[3]
  ImageNetList.value[1] = fileList.value[4]
  ImageNetList.value[2] = fileList.value[5]
  vocList.value[0] = fileList.value[6]
  vocList.value[1] = fileList.value[7]
  vocList.value[2] = fileList.value[8]
  cocoList.value[0] = fileList.value[9]
  cocoList.value[1] = fileList.value[10]
  cocoList.value[2] = fileList.value[11]
  cubList.value[0] = fileList.value[12]
  cubList.value[1] = fileList.value[13]
  cubList.value[2] = fileList.value[14]
  carList.value[0] = fileList.value[15]
  carList.value[1] = fileList.value[16]
  carList.value[2] = fileList.value[17]
  NWPU.value[0] = fileList.value[18]
  NWPU.value[1] = fileList.value[19]
  NWPU.value[2] = fileList.value[20]
  Food101.value[0] = fileList.value[21]
  Food101.value[1] = fileList.value[22]
  Food101.value[2] = fileList.value[23]
  Place365.value[0] = fileList.value[24]
  Place365.value[1] = fileList.value[25]
  Place365.value[2] = fileList.value[26]
  // console.log("CifarList.value", CifarList.value);
};
updatePoolList();
// realRefreshImages("getPublicpreview");

//结束公开数据集预览

function checkOut(datasetId){
  console.log(datasetId);
  if(datasetId===10001){
    chosen.value = "Cifar"
  }if(datasetId===10002){
    chosen.value = "ImageNet"
  }if(datasetId===10003){
    chosen.value = "VOC"
  }if(datasetId===10004){
    chosen.value = "COCO"
  }if(datasetId===10005){
    chosen.value = "CUB"
  }if(datasetId===10006){
    chosen.value = "CARS"
  }if(datasetId===10007){
    chosen.value = "NWPU-RESISC45"
  }if(datasetId===10008){
    chosen.value = "Food-101"
  }if(datasetId===10009){
    chosen.value = "Place365"
  }

  // store.commit("modifyDatasetId", Number(datasetId));
  // store.commit("modifyImageList", );
  // console.log();
  // router.push("datasetInDetail");
  refreshImages("getPublicDetail", datasetId);  //在指定的毫秒后调用函数
  setTimeout(()=>{
    ispreview.value = false;
  },100)
}

async function refreshImages(option, datasetId) {
  // console.log(option);
  await getDatasetInfos(option, datasetId);
  updateShowList2();
}

async function getDatasetInfos(option, datasetId) {
  let requestUrl = "/dataset/" + option, requestData = {};
  requestData["datasetId"] = datasetId;
  resultLoading.value = true
  await request.post(requestUrl, requestData)
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          // console.log(22222);
          // let {datasetInfo, pictureDataInfos} = res.data.data;
          fileList2.value = res.data.data;
          // datasetInformation.value = (datasetInfo);  //不知道这玩意儿有没有用
          // console.log(pictureDataInfos,datasetInfo)
          // console.log(fileList.value, datasetInformation.value);
        } else {
          console.log("err request");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  // console.log(2212432, fileList2);
  resultLoading.value = false
}

const updateShowList2 = () => {
  showList.value = (fileList2.value.slice((listPage.value - 1) * imageNumber.value,
      Math.min(fileList2.value.length, listPage.value * imageNumber.value)));
  console.log("showList.value", showList.value);
  //
  // const start = (listPage.value - 1) * imageNumber.value;
  // const end = start + imageNumber.value;
  // currentPageList.value = showList.value.slice(start, end);

  // listPreview.value = (showList.value.map((e) => {
  //   return "http://" + e;
  // }));
  // listPreview.value = (showList2.value.map((e) => {
  //   return "http://" + e["pictureUrl"];
  // }));
  // // console.log("store.state.datasetId", store.state.datasetId)
  // console.log("listPreview.value", listPreview.value)
};

const backPreview = () => {
  setTimeout(()=>{
    ispreview.value = true;
  },50)
}

</script>

<style scoped>
li{
  margin: 10px 0;
}

/*!* 定义滚动条的样式 *!*/
/*.scrollable::-webkit-scrollbar {*/
/*  width: 10px;*/
/*}*/

/*!* 定义滚动条滑块的样式 *!*/
/*.scrollable::-webkit-scrollbar-thumb {*/
/*  background-color: #888;*/
/*  border-radius: 5px;*/
/*}*/

/*!* 定义滚动条轨道的样式 *!*/
/*.scrollable::-webkit-scrollbar-track {*/
/*  background-color: #eee;*/
/*}*/
.language-switch {
  margin-bottom: 20px;
}

/*.close-button {*/
/*  align-self: flex-end;*/
/*}*/
.dialog-container {
  /*position: fixed;*/
  /*top: 0;*/
  /*left: 0;*/
  width: 100%;
  height: 100%;
  /*background-color: aquamarine;*/
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.lookdata{
  margin: 20px 0;
}
.dataintro{
  margin-bottom: 100px;
}
.demo-image{
  /*background: url("http://pruning.vipazoo.cn/api/img/background/background_preview.jpg") no-repeat 0% 20%/ cover;*/
  background: linear-gradient(transparent, #E7E7E7 100%);
}
.demo-image .blockpublic {
  padding: 0;
  height: 300px;
  text-align: center;
  /*border: 2px solid white;*/
  /*cursor:pointer;*/

  /*!*padding: 30px 0;*!*/
  /*text-align: center;*/
  /*!*border: solid 1px var(--el-border-color);*!*/
  /*border: none;*/
  /*display: inline-block;*/
  /*width: 10%;*/
  /*box-sizing: border-box;*/
  /*vertical-align: top;*/
}
.previewer{
  display: flex;
  flex-direction: column;
}
.foot{
  display: flex;
  justify-content: center;
}
.myCenter{
  /*width: 60%;*/
  /*text-align: center;*/
  display: flex;
  /*justify-content: center;*/
  flex-direction: column;
}
.myCenter2{
  width: 40%;
  /*text-align: center;*/

  /*flex-direction: column;*/
}
.myCenter3{
  display: flex;
  justify-content: center;
}
.search {
  /*padding: 30px 0;*/
  /*text-align: center;*/
  display: inline-block;
  /*box-sizing: border-box;*/
  /*vertical-align: top;*/
  /*margin: 20px;*/
  /*word-spacing: 20px;*/
  /*max-height: 10px;*/
}
.datasetPreview {
  text-align: center;
}
/*.el-main{*/
/*  background-image: linear-gradient(transparent,#fff 100%),url("http://pruning.vipazoo.cn/api/img/background/background_purple.jpg");*/
/*}*/
.forSearch {
  margin: 10px;
  display: inline-block;

}
.fixedpreview{
  /*text-align: center;*/
  margin: auto;
  width: 280px;
  height: 280px;
  /*padding-top: 10px;*/
}

/*为了让fixedpreview垂直的伪元素*/
.fixedpreview::before{
  content:'';
  width:0;
  height:100%;
  display:inline-block;
  position:relative;
  vertical-align:middle;
  /*background:#f00;*/
}
.fixedpreview2{
  border: 2px solid white;
  /*border-style: solid;*/
  /*border-width: 1px 2px;*/
  /*border-color: white;*/
  width: 114px;
  height: 114px;
  cursor:pointer;
}
/*.fixedpreview2 {*/
/*  border-left-width: 2px;*/
/*  border-right-width: 2px;*/
/*  border-top-width: 1px;*/
/*  border-bottom-width: 1px;*/
/*  cursor: pointer;*/
/*}*/
</style>