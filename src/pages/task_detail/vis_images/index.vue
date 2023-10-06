<!--  Copyright 2020 Zhejiang Lab. All Rights Reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================
-->

<template>
  <b-row>
    <b-col lg="6" v-for="data in image_datas" :key="data.title">
      <basic-image :data="data" />
    </b-col>
  </b-row>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { closeDialog } from "@/store/utils";
import BasicImage from "./basic_image/index.vue";
import * as d3 from "d3";
export default {
  name: "VisImages",
  components: {
    BasicImage
  },
  computed: mapState("task_detail", {
    image_datas: state => {
      const vis_data = state.vis_data;
      return vis_data.filter(obj => obj.data_type == "image");
    }
  })
};
</script>