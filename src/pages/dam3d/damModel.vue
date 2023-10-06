<template>
  <div>
    <el-col>
      <dam-info id="info-container"></dam-info>
    </el-col>

    <el-col>
      <div id="out-container">
        <el-row>
          <el-divider></el-divider>
          <el-select>
            <el-option>
            </el-option>
          </el-select>
          <el-button>查看</el-button>
          <div class="progress">
            <el-progress :text-inside="true" :stroke-width="26" :percentage="loadedData" style="color: blue"></el-progress>
          </div>
        </el-row>
        <div id="container"></div>
      </div>
    </el-col>

  </div>
</template>

<script>
import * as THREE from 'three'
// 控制器
import {  OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
//加载器
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// eslint-disable-next-line no-unused-vars
var scene = null, model;

import damInfo from './damInfo'
export default {
  data() {
    return {
      loadedData: 70,
      renderer: null,
      camera: null,
      orbitControls: null,
    }
  },
  components: {
    damInfo,
  },
  mounted() {
    this.init();
    this.loadModel();
    this.animate();
  },

  //后续还要在beforeUnmount中进行销毁
  beforeUnmount() {
    scene = null;
    this.renderer = null;
    this.camera = null;
    this.orbitControls = null;
    model = null;
  },
  methods: {
    init() {
      let container = document.getElementById('container');
      let w = container.clientWidth;
      console.log("宽度" + w);
      let h = container.clientHeight;
      console.log("高度" + h);
      this.camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 5000);
      //this.camera = image THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
      // 相机的位置要大于几何体的尺寸
      this.camera.position.set(100, 500, 500);
      scene = new THREE.Scene();
      this.renderer = new THREE.WebGLRenderer({
        // 抗锯齿性
        antialias: true
      });
      // 设置背景色
      this.renderer.setClearColor('#ffffff',1.0);
      //this.renderer.setSize(window.innerWidth,window.innerHeight);
      this.renderer.setSize(w, h);
      container.appendChild(this.renderer.domElement);

      // 环境光不能用来投射阴影，因为它没有方向。
      var ambientLight = new THREE.AmbientLight(0xcccccc);
      scene.add(ambientLight);
      // 初始化轨道控制器
      // 需要配合animate，不断循环渲染，达到用鼠标旋转物体的作用。
      this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
      this.orbitControls.enableDamping = true;
      // 窗口大小自适应
      window.addEventListener('resize',this.onWindowResize,false);
    },
    animate() {
      setTimeout(()=>{
        // model.rotation.x += 0.01;
        // model.rotation.y += 0.01;
        // model.rotation.z += 0.01;
      },500)
      this.orbitControls.update();
      requestAnimationFrame(this.animate);
      this.renderer.render(scene, this.camera);
    },
    onWindowResize(){
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth,window.innerHeight);
    },
    loadModel(){
      const loader = new GLTFLoader();
      // 路径要注意，默认是从public读取的，模型文件必须放在public下，并且路径前的public要省略
      loader.load( 'models/gltf/tank/scene.gltf', gltf=> {
        // 设置模型尺寸
        model = gltf.scene;
        model.scale.set(0.7,0.7,0.7);
        model.position.set(0, 0, 0);
        scene.add(model);

      }, (xhr)=>{
        console.log('加载完成的百分比' + (xhr.total) + '%');
        console.log(xhr);
        console.log(xhr.loaded);
        if(this.loadedData == 100) {
          document.getElementById('prgress').style.visibility = 'hidden';
        }
      }, error=>{
        console.error( error );
      } );
    }
  }
}
</script>

<style scoped>
#info-container {
  margin-top: 10%;
  margin-right: 20px;
  float: left;
}
/* 进度条 */
.progress{
  margin-top: 5px;
  margin-left: 200px;
  z-index: 10;
  width: 20%;
}
#out-container {
  float: right;
}
#container {
  margin-top: 10px;
  margin-right: 20px;
  width: 1400px;
  height: 850px;
}

</style>
