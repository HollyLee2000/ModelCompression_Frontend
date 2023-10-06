<template>
  <div class="video-container">
    <video
        class="video"
        type="video/mp4"
        controls
        controlslist="nodownload"
        :poster="poster_src"
        :src="path"
        style="width:100%; height:100%; object-fit:fill"
    ></video>
  </div>
</template>

<script>
export default{
  data() {
    return{
      path: "http://vjs.zencdn.net/v/oceans.mp4",
      poster_path:"",

    }
  },
}
</script>

<style scoped>
.video-container{
  width: 950px;
  height: 400px;
}
</style>
