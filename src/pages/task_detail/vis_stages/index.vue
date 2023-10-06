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
  <div>
    <div class="container" v-cloak>
      <p v-show="finished_stage.length>0">已完成的步骤（{{finished_stage.length}}）</p>
      <ul class="list-group">
        <li class="list-group-item" v-for="step in finished_stage" :key="step.id">
          <span style="text-decoration: line-through; opacity: 50%">Step{{step.id}}-{{step.text}}</span>
        </li>
      </ul>
    </div>
    <br />
    <div class="container" v-cloak>
      <p v-show="remain_stage.length>0">未完成的步骤（{{remain_stage.length}}）</p>
      <ul class="list-group">
        <li
          class="list-group-item"
          v-for="step in remain_stage"
          :key="step.id"
        >Step{{step.id}}: {{step.text}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "VisStages",
  computed: {
    ...mapState("task_detail", {
      remain_stage: (state) => {
        return state.stage.filter(function (step) {
          return !step.complete;
        });
      },
      finished_stage: (state) => {
        return state.stage.filter(function (step) {
          return step.complete;
        });
      },
    }),
  },
};
</script>
<style scoped>
.finished {
  text-decoration: line-through;
}
</style>