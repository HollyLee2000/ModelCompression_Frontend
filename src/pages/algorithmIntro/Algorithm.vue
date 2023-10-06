<template>
  <div class="container">
    <h1 class="bigtitle" style="color: #3F3A64; ">
      Get Started
<!--      <div style="margin-bottom: 10px;"/>-->
    </h1>
    <!-- 一个Unit代码一个块，包括小标题，代码，图片，具体代码以下样例 -->
    <!-- 替换图片路径就行,其他不用动 -->
    <div class="unit">
      <div class="unit-title jiange">Schematic Diagram of Attribution and Meta Evaluation</div>
      <!-- 替换图片路径就行,其他不用动 -->
      <div class="unit-img-box-holly">
        <img src="./static/image/MetaRank_overview.png" class="unit-img-holly" style="margin-bottom: 20px;">
      </div>
      <div class="unit-text">
<!--        The schematic diagram of attribution~(I) and evaluation~(II and III).<br>-->
        (I) <code>AM</code> represents the attribution method. The dashed arrow means the process of attribution. A higher attribution value is associated with a darker color of the small square in <code>Saliency Map</code>.<br>
        (II) <code>Ordered Sequence</code> refers to the arrangement of pixels based on their attribution values. <code>Remove</code> indicates removing the features from the original image according to the ordered sequence.<br>
        (III) <code>&Delta; acc</code> denotes the decline of model performance after removing features. A higher <code>&Delta; acc</code> indicates a better attribution method.
      </div>

      <!-- 粘贴代码就行，注意要格式，多出来的空格和回车也会被读到代码框中, -->
    </div>

    <div class="unit">
      <div class="unit-title jiange">The Meta-rank Framework.</div>
      <!-- 替换图片路径就行,其他不用动 -->
      <div class="unit-img-box">
        <img src="./static/image/MetaRank_Framework.png" class="unit-img" style="margin-bottom: 20px;">
      </div>
      <div class="unit-text">
        <!--        The schematic diagram of attribution~(I) and evaluation~(II and III).<br>-->
        <code>EF</code> means the environmental factor. <code>MoRF</code> and <code>LeRF</code> are the ways
        of pixel masking. <code>A</code> represents the attribution method and <code>T</code> represents the task.
        <code>&alpha;</code> indicates the meta score of every method. Multiple environmental factors combine
        to generate different tasks. Attribution methods are tested on these tasks, and their outcomes are
        subsequently fed into the calculation module (<code>History Fusion</code>) of Meta-rank. Ultimately,
        after all data is analyzed, a unified leaderboard is obtained.
      </div>

      <!-- 粘贴代码就行，注意要格式，多出来的空格和回车也会被读到代码框中, -->
    </div>

    <div class="unit">
      <div class="unit-title jiange">Package Installation</div>

      <div class="unit-text">Create an environment for MetaScore:</div>
      <div class="unit-code">
                    <pre class="hljs"><code class="language-python">conda create -n metascore python=<span class="hljs-number">3.7.16</span>
conda activate metascore</code></pre>
      </div>


      <div class="unit-text">MetaScore support Installation by pip. Installation by Source code or Conda is in developing.
        In order to ensure a lightweight installation package,
        only the necessary components of MetaScore are included in our installation packages,
        other installation dependencies need to be installed first, as specified below.</div>

      <br>Required Dependencies:

      <div class="unit-code">
                    <pre class="hljs"><code class="language-python">captum==<span class="hljs-number">1.6.0</span>
matplotlib==<span class="hljs-number">3.5.3</span>
numpy==<span class="hljs-number">1.21.6</span>
pandas==<span class="hljs-number">1.3.5</span>
timm==<span class="hljs-number">0.9.2</span></code></pre>
      </div>


      <div class="unit-text">In addition to the above dependency packages, PyTorch is needed,
        we recommend you to follow the instructions from <a href="https://pytorch.org/">PyTorch</a> official website.
        The minimum version required is as follows (and GPU version is recommended):</div>
      <div class="unit-code">
                        <pre class="hljs"><code class="language-python">torch==<span class="hljs-number">1.13.1+cu113 %(GPU)</span>
torchvision==<span class="hljs-number">0.14.1</span></code></pre>
      </div>
    </div>

    <div class="unit-text">Finally, clone MetaScore project: </div>
    <div class="unit-code">
      <pre class="hljs"><code class="language-python">git clone ......</code></pre></div>

    <div class="unit">
      <div class="unit-title jiange">Task Process</div>
      <div class="unit-text">This section will introduce a simple process about MetaScore, including "Download datasets and checkpoints", "Compute acc/base ratios" and "Compute MetaScore".
<!--        <br>-->
<!--        In "Load Data", DGLD support multiple data import methods, including-->
<!--        <a href="https://pytorch-geometric.readthedocs.io/en/latest/">PyTorch Geometric</a>,-->
<!--        <a href="https://www.dgl.ai/">DGL</a> and custom data.-->
<!--        DGLD combines the process of data load and anomaly injection. Except for some basic datasets-->
<!--        (including "Cora", "Citeseer", "Pubmed", "BlogCatalog", "Flickr", "ogbn-arxiv" and "ACM"), DGLD also accept custom data.<br>-->

<!--        In anomaly detection, DGLD inject the abnormal node in two methods, structural and contextual, by two parameters - p and k.-->
<!--        Following is an example showing that a few lines of codes are sufficient to load and inject.<br>-->
      </div>

      <div class="unit-text" style="font-style: italic">Download the following datasets, and you only need to obtain the validation set or test set for computation. Place them in the <strong>'data'</strong> directory of the MetaScore project:</div>
      Imagenet-1K (ILSVR2012):
      <br>
      &emsp;&emsp;Homepage: <el-link href="https://image-net.org/challenges/LSVRC/2012/index.php" target="_blank" type="primary">https://image-net.org/challenges/LSVRC/2012/index.php</el-link>
      <br>
      &emsp;&emsp;Validation set download: <el-link href="https://image-net.org/data/ILSVRC/2012/ILSVRC2012_img_val.tar" type="primary">https://image-net.org/data/ILSVRC/2012/ILSVRC2012_img_val.tar</el-link>
      <br>
      &emsp;&emsp;<span style="font-style: italic">Place the validation set in ./data/ILSVRC2012/val</span>
      <br>
      Food-101:
      <br>
      &emsp;&emsp;Homepage: <el-link href="https://data.vision.ee.ethz.ch/cvl/datasets_extra/food-101/" target="_blank" type="primary">https://data.vision.ee.ethz.ch/cvl/datasets_extra/food-101/</el-link>
      <br>
      &emsp;&emsp;Train and test set download: <el-link href="http://data.vision.ee.ethz.ch/cvl/food-101.tar.gz" type="primary">http://data.vision.ee.ethz.ch/cvl/food-101.tar.gz</el-link>
      <br>
      &emsp;&emsp;<span style="font-style: italic">Place the test set in ./data/Food-101/test</span>
      <br>
      Place365:
      <br>
      &emsp;&emsp;Homepage: <el-link href="http://places2.csail.mit.edu/" target="_blank" type="primary">http://places2.csail.mit.edu/</el-link>
      <br>
      &emsp;&emsp;Fill out the form to obtain access to the dataset: <el-link href="http://places2.csail.mit.edu/download.html" target="_blank" type="primary">http://places2.csail.mit.edu/download.html</el-link>
      <br>
      &emsp;&emsp;Train and validation set download: <el-link href="http://data.csail.mit.edu/places/places365/places365standard_easyformat.tar" type="primary">http://data.csail.mit.edu/places/places365/places365standard_easyformat.tar</el-link>
      <br>
      &emsp;&emsp;<span style="font-style: italic">Place the validation set in ./data/places365_standard/val</span>
      <br>
      NWPU-RESISC45:
      <br>
      &emsp;&emsp;Homepage: <el-link href="http://www.escience.cn/people/JunweiHan/NWPU-RESISC45.html" target="_blank" type="primary">http://www.escience.cn/people/JunweiHan/NWPU-RESISC45.html</el-link>
      <br>
      &emsp;&emsp;If you can't access the above link, you can download the dataset via OneDrive or BaiduNetDisk: <el-link href="https://gcheng-nwpu.github.io/#Datasets" target="_blank" type="primary">https://gcheng-nwpu.github.io/#Datasets</el-link>
      <br>
      &emsp;&emsp;<span style="font-style: italic">Place the test set in ./data/NWPU-RESISC45/test</span>



      <div class="unit-text" style="font-style: italic">Download the checkpoints place them in the <strong>'ckpt'</strong> directory of the MetaScore project:</div>
      <el-link href="http://10.214.242.155:7996/Checkpoints/train/dsnwpu_resisc45_resnet18/00000/best.pth" type="primary">NWPU-RESISC45-resnet18</el-link>
      <br>
      <el-link href="http://10.214.242.155:7996/Checkpoints/train/dsnwpu_resisc45_inceptionv4/00000/best.pth" type="primary">NWPU-RESISC45-inceptionv4</el-link>
      <br>
      <el-link href="http://10.214.242.155:7996/Checkpoints/train/dsnwpu_resisc45_vgg19/00000/best.pth" type="primary">NWPU-RESISC45-vgg19</el-link>
      <br>
      <el-link href="http://10.214.242.155:7996/Checkpoints/train/dsfood_resnet18/00000/best.pth" type="primary">Food101-resnet18</el-link>
      <br>
      <el-link href="http://10.214.242.155:7996/Checkpoints/train/dsfood_inceptionv4/00000/best.pth" type="primary">Food101-inceptionv4</el-link>
      <br>
      <el-link href="http://10.214.242.155:7996/Checkpoints/train/dsfood_vgg19/00000/best.pth" type="primary">Food-101-vgg19</el-link>
      <br>
      <el-link href="http://10.214.242.155:7996/Checkpoints/train/dsimagenet_resnet18/00000/best.pth" type="primary">Imagenet-1K-resnet18</el-link>
      <br>
      <el-link href="http://10.214.242.155:7996/Checkpoints/train/dsimagenet_inceptionv4/00000/best.pth" type="primary">Imagenet-1K-inceptionv4</el-link>
      <br>
      <el-link href="http://10.214.242.155:7996/Checkpoints/train/dsimagenet_vgg19/00000/best.pth" type="primary">Imagenet-1K-vgg19</el-link>
      <br>
      <el-link href="http://10.214.242.155:7996/Checkpoints/resnet18_places365.pth.tar" type="primary">Place365-resnet18</el-link>
      <br>
      <el-link href="http://10.214.242.155:7996/Checkpoints/resnet50_places365.pth.tar" type="primary">Place365-resnet50</el-link>

      <div class="unit-text" style="font-style: italic">Follow these steps to <strong>import your attribution algorithm</strong>:</div>
      <ul>
        <li class="unit-text">Import your algorithm in attribution.py. Here we import Occlusion from captum library for an example.</li>
        <div class="unit-code">
          <pre v-highlight><code class="language-python">from captum.attr import Occlusion  # import your own attribution algorithm</code></pre>
        </div>
        <li class="unit-text">Modify line 198 of attribution.py, and pass your own attribution algorithm into function `perform_interp_usrAlgo`</li>
        <div class="unit-code">
          <pre v-highlight><code class="language-python">for i, mega in enumerate(dl):
    if args.UsrAlgo:  # evaluate user-defined attribution algorithm
        attr = runner.perform_interp_usrAlgo(mega, m, args.arch, Occlusion)  # Pass your algorithm
        sal_maps.append(attr)
    else:   # evaluate existing attribution algorithm
        attr = runner.perform_interp(mega, m, args.arch)
        sal_maps.append(attr)</code></pre>
        </div>
        <li class="unit-text">Finally, modify the perform_saliency_usrAlgo function in saliency_utils.py to fit your attribution algorithm. Here we follow the implementation for attribution methods in the Captum library, where we passed the interpretable model to the attribution method to create an instance of the attribution method. Then, we called the `attribute` method of that instance to obtain the attribution results. You can adapt this to fit the implementation style of your algorithm, as long as you are able to obtain the attribution results. The results should be attributions with respect to each input feature, with the same size as the provided inputs, and each value provids the coefficient of the corresponding interpretale feature.</li>
        <div class="unit-code">
          <pre v-highlight><code class="language-python"># Modify this function to fit your attribution algorithm.
def perform_saliency_usrAlgo(patch_master, net, m, inp, pred, orig_inp, mn, usrAlgo):
    net = net.cuda()
    inp = inp.cuda()
    pred = pred.cuda()

    # Here we pass the Occasion method for an example. Modify these to fit your attribution algorithm.
    saliency = usrAlgo(net)
    attr = saliency.attribute(inp, target=pred, strides = (3,8,8), sliding_window_shapes=(3,15,15))

    attr_return = attr.cpu().detach().clone()
    # cleanup
    del attr

    ch.cuda.empty_cache()
    return attr_return</code></pre>
        </div>

      </ul>





      <div class="unit-text" style="font-style: italic">If you want to participate in our ranking, run the following command to compute the acc/base ratios of 22 tasks. The results will be saved in <strong>./evaluation</strong>:</div>
      <div class="unit-code">
        <pre v-highlight><code class="language-bash">task="nwpuresisc45_resnet18 nwpuresisc45_inceptionv4 nwpuresisc45_vgg19
food_resnet18 food_inceptionv4 food_vgg19
imagenet_resnet18 imagenet_inceptionv4 imagenet_vgg19
places365_resnet18 places365_resnet50"

path=(
    "./ckpt/nwpu_resisc45_resnet18.pth"
    "./ckpt/nwpu_resisc45_inceptionv4.pth"
    "./ckpt/nwpu_resisc45_vgg19.pth"
    "./ckpt/food_resnet18.pth"
    "./ckpt/food_inceptionv4.pth"
    "./ckpt/food_vgg19.pth"
    "./ckpt/imagenet_resnet18.pth"
    "./ckpt/imagenet_inceptionv4.pth"
    "./ckpt/imagenet_vgg19.pth"
    "./ckpt/resnet18_places365.pth.tar"
    "./ckpt/resnet50_places365.pth.tar"
)

cnt=0
for TASK in $task
do
    IFS="_" read -r DATA ARCH &lt&lt&lt "$TASK"
    for i in Your_Algorithm
    do
    python attribution.py   --gpu_id 0 \
                            --arch $ARCH \
                            --dataset $DATA \
                            --out-dir ./evaluation/$TASK/$i \
                            --skip-random \
                            --methods $i \
                            --methods $i\_reverse \
                            --patch_size 2 \
                            --filler-values 0 0 0 \
                            --skip-factor 0.1 \
                            --ckpt ./evaluation/$TASK/$i \
                            --pth ${path[$cnt]} \
                            --UsrAlgo True
    done
    ((cnt++))
done</code></pre></div>

      <div class="unit-text">Then, run the following command to get morf and lerf result. The output will be saved in <strong>./results</strong>:</div>

      <div class="unit-code">
        <pre v-highlight><code class="language-bash">task="nwpuresisc45_resnet18 nwpuresisc45_inceptionv4 nwpuresisc45_vgg19
      food_resnet18 food_inceptionv4 food_vgg19
      imagenet_resnet18 imagenet_inceptionv4 imagenet_vgg19
      places365_resnet18 places365_resnet50"

method="Your_Algorithm"

python create_or_clear.py       --output_morf ./results/new_morf.csv \
                                --output_lerf ./results/new_lerf.csv

for TASK in $task
do
    python get_result.py        --task $TASK \
                                --dir ./evaluation/$TASK/$method \
                                --output_morf ./results/new_morf.csv \
                                --output_lerf ./results/new_lerf.csv
done</code></pre></div>
      <div class="unit-text">Finally, run the following command to compute your MetaScore and Meta-Rank.</div>
      <div class="unit-code">
        <pre v-highlight><code class="language-bash">python generate_result.py       --origin_morf ./results/origin/morf.csv \
                                --origin_lerf ./results/origin/lerf.csv \
                                --new_morf ./results/new_morf.csv \
                                --new_lerf ./results/new_lerf.csv \
                                --output ./results/result.csv

python meta_compute.py          --rank_result ./results/result.csv</code></pre></div>
      <div class="unit-text">The results will be presented in the following form:</div>
      <div class="unit-code">
        <pre v-highlight><code class="language-bash">task_num: 22
Author                     Institute                            Algorithm               MetaScore   Ranking
Mukund Sundararajan        Google                               Integrated Gradient     2.198907          1
Avanti Shrikumar           Stanford University                  DeepLift                0.658166          2
Avanti Shrikumar           Stanford University                  Input x Gradient        0.645719          3
Karen Simonyan             Oxford                               Saliency                0.3469136         4
You                        --                                   --                      0.1715079         5
Sebastian Bach             Fraunhofer Heinrich Hertz Institute  LPR                     0.0668604         6
Jost Tobias Springenberg   University of Freiburg               Guided Backpropagation  -0.1847573        7
Ramprasaath R. Selvaraju   Georgia Institute of Technology      Guided Grad-Cam         -1.193227         8
Matthew D. Zeiler          New York University                  Deconvolution           -2.710090         9</code></pre></div>






      <div class="unit-text">You can submit your resluts and algorithm to participant in the ranking: </div>
      <div style="display: flex; justify-content: left;">
        <el-button size="large" style="margin: 10px 0 10px 0;" type="warning" @click="$router.push('/cifar')" plain>submit</el-button>
      </div>
      <div class="unit-text">To obtain quicker feedback, you can also test your MetaScore and Meta-Rank on a small number of tasks, but these results cannot be included in the rankings.
        Please select the tasks below and generate the script.</div>

      <div>
        <el-checkbox v-model="checked1" label="nwpuresisc45_resnet18" size="large" border />
        <el-checkbox v-model="checked2" label="nwpuresisc45_inceptionv4" size="large" border />
        <el-checkbox v-model="checked3" label="nwpuresisc45_vgg19" size="large" border />
        <el-checkbox v-model="checked4" label="food_resnet18" size="large" border />
        <el-checkbox v-model="checked5" label="food_inceptionv4" size="large" border />
        <el-checkbox v-model="checked6" label="food_vgg19" size="large" border />
        <el-checkbox v-model="checked7" label="imagenet_resnet18" size="large" border />
        <el-checkbox v-model="checked8" label="imagenet_inceptionv4" size="large" border />
        <el-checkbox v-model="checked9" label="imagenet_vgg19" size="large" border />
        <el-checkbox v-model="checked10" label="places365_resnet18" size="large" border />
        <el-checkbox v-model="checked11" label="places365_resnet50" size="large" border />
      </div>

      <div style="display: flex; justify-content: left;">
        <el-button size="large" style="margin: 10px 0 10px 0;" type="warning" @click="showMyScript" plain>generate script</el-button>
      </div>


    <div v-show="showScript">
      <div class="unit-code">
        <div class="unit-text">Here is the script generated for you to test MetaScore on a subset of tasks. The results from this script might slightly differ from testing on all tasks.
        </div>


        <pre class="hljs"><code class="language-python">task="<span v-if="checked1">nwpuresisc45_resnet18 </span><span v-if="checked2">nwpuresisc45_inceptionv4 </span><span v-if="checked3">nwpuresisc45_vgg19</span><span v-if="checked1||checked2||checked3"><br></span><span v-if="checked4">food_resnet18 </span><span v-if="checked5">food_inceptionv4 </span><span v-if="checked6">food_vgg19</span><span v-if="checked4||checked5||checked6"><br></span><span v-if="checked7">imagenet_resnet18 </span><span v-if="checked8">imagenet_inceptionv4 </span><span v-if="checked9">imagenet_vgg19</span><span v-if="checked7||checked8||checked9"><br></span><span v-if="checked10">places365_resnet18 </span><span v-if="checked11">places365_resnet50</span>"

path=(
    <span v-if="checked1">"./ckpt/nwpu_resisc45_resnet18.pth"</span><span v-if="checked1"><br></span><span v-if="checked2">    "./ckpt/nwpu_resisc45_inceptionv4.pth"</span><span v-if="checked2"><br></span><span v-if="checked3">    "./ckpt/nwpu_resisc45_vgg19.pth"</span><span v-if="checked3"><br></span><span v-if="checked4">    "./ckpt/food_resnet18.pth"</span><span v-if="checked4"><br></span><span v-if="checked5">    "./ckpt/food_inceptionv4.pth"</span><span v-if="checked5"><br></span><span v-if="checked6">    "./ckpt/food_vgg19.pth"</span><span v-if="checked6"><br></span><span v-if="checked7">    "./ckpt/imagenet_resnet18.pth"</span><span v-if="checked7"><br></span><span v-if="checked8">    "./ckpt/imagenet_inceptionv4.pth"</span><span v-if="checked8"><br></span><span v-if="checked9">    "./ckpt/imagenet_vgg19.pth"</span><span v-if="checked9"><br></span><span v-if="checked10">    "./ckpt/resnet18_places365.pth.tar"</span><span v-if="checked10"><br></span><span v-if="checked11">    "./ckpt/resnet50_places365.pth.tar"</span><span v-if="checked11"><br></span>)

cnt=0
for TASK in $task
do
    IFS="_" read -r DATA ARCH &lt&lt&lt "$TASK"
    for i in Your_Algorithm
    do
    python attribution.py   --gpu_id 0 \
                            --arch $ARCH \
                            --dataset $DATA \
                            --out-dir ./evaluation/$TASK/$i \
                            --skip-random \
                            --methods $i \
                            --methods $i\_reverse \
                            --patch_size 2 \
                            --filler-values 0 0 0 \
                            --skip-factor 0.1 \
                            --ckpt ./evaluation/$TASK/$i \
                            --pth ${path[$cnt]} \
                            --UsrAlgo True
    done
    ((cnt++))
done

method="Your_Algorithm"

python create_or_clear.py       --output_morf ./results/new_morf.csv \
                                --output_lerf ./results/new_lerf.csv

for TASK in $task
do
    python get_result.py        --task $TASK \
                                --dir ./evaluation/$TASK/$method \
                                --output_morf ./results/new_morf.csv \
                                --output_lerf ./results/new_lerf.csv
done

python generate_result.py       --origin_morf ./results/origin/morf.csv \
                                --origin_lerf ./results/origin/lerf.csv \
                                --new_morf ./results/new_morf.csv \
                                --new_lerf ./results/new_lerf.csv \
                                --output ./results/result.csv \
                                --chosen_task <span v-if="checked1">nwpuresisc45_resnet18 </span><span v-if="checked2">nwpuresisc45_inceptionv4 </span><span v-if="checked3">nwpuresisc45_vgg19 </span><span v-if="checked4">food_resnet18 </span><span v-if="checked5">food_inceptionv4 </span><span v-if="checked6">food_vgg19 </span><span v-if="checked7">imagenet_resnet18 </span><span v-if="checked8">imagenet_inceptionv4 </span><span v-if="checked9">imagenet_vgg19 </span><span v-if="checked10">places365_resnet18 </span><span v-if="checked11">places365_resnet50</span>

python meta_compute.py          --rank_result ./results/result.csv</code></pre></div>
    </div>





<!--      <div class="unit-code">-->
<!--                    <pre class="hljs"><code class="language-python">gnd_dataset = GraphNodeAnomalyDectionDataset("Cora", p = 15, k = 50)-->
<!--g = gnd_dataset[0]-->
<!--label = gnd_dataset.anomaly_label</code></pre>-->
<!--      </div>-->
<!--      You can print DGL.graph to get more information about graph.-->
<!--      <div class="unit-code">-->
<!--        <pre class="hljs"><code class="language-python">print(g)</code></pre>-->
<!--      </div>-->
<!--      In "Model preform", DGLD supports basic methods. DGLD supports some basic methods. It's easy to construct and train model.-->
<!--      Function <span class="hlword">fit</span> need parameters to specify number of epoch and device. For gpu, device should input a int,-->
<!--      while a string 'cpu' for cpu.-->
<!--      <div class="unit-code">-->
<!--                    <pre class="hljs"><code class="language-python">model = CoLA(in_feats = g.ndata['feat'].shape[1])-->
<!--model.fit(g, num_epoch = 5, device = 0)</code></pre>-->
<!--      </div>-->

<!--      Finally, get the anomaly score by function predict. Split_auc will return different auc scores for separative anomaly type-->
<!--      and global anomaly. Function predict need parameters to specify graph and test rounds. At the point, "Evaluation" is done.-->
<!--      <div class="unit-code">-->
<!--                    <pre class="hljs"><code class="language-python">result = model.predict(g, auc_test_rounds=2)-->
<!--print(split_auc(label, result))</code></pre>-->
<!--      </div>-->
<!--      DGLD also supports command line to run model. Basic parameters involve dataset, num_epoch, auc_test_rounds-->
<!--      and logdir(for file saved). More detail is in utils.py in model folder.-->
<!--      <div class="unit-code">-->
<!--        <pre class="hljs"><code class="language-python">python main_cola.py &#45;&#45;dataset Cora &#45;&#45;num_epoch 5 &#45;&#45;auc_test_rounds 5 &#45;&#45;logdir tmp</code></pre>-->
<!--      </div>-->
    </div>


  </div>

  <div class="footer" id="footer" style="margin-top: 150px">
    <nav class="navbar navbar-expand-lg" style="background-color: rgb(245, 247, 250)" id="footer-navbar">
      <div class="container-fluid custom-container">
        <div class="container text-center">
          <div class="row2">
            <div class="col footer-team">
              <h2>META-RANK TEAM</h2>
            </div>
          </div>
          <div class="row2">
            <div class="col footer-school">
              Zhejiang University
            </div>
          </div>
          <div class="row2">
            <div class="col footer-name">
              JiaRui Duan, Jie Song, Haoling Li, Mingli Song
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
  /*background-image: url('http://10.214.242.155:7996/img/background/algorithm2.jpg');*/
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