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
    <b-row>
      <b-col class="mt-1" md="2">任务名称：</b-col>
      <b-col class="mt-1" md="4">
        <i v-if="!task_details.name">无名称</i>
        <span v-else>{{task_details.name}}</span>
      </b-col>
      <b-col class="mt-1" md="2">处理者：</b-col>
      <b-col class="mt-1" md="4">{{task_details.processor}}</b-col>
      <b-col class="mt-1" md="2">权限：</b-col>
      <b-col class="mt-1" md="4">
        <i v-if="task_details.processor=='ATLAS'">ALTAS私有</i>
        <span v-else>AIX {{task_details.is_public?"公开": "私有"}}</span>
      </b-col>

      <b-col class="mt-1" md="2">算法：</b-col>
      <b-col class="mt-1" md="4">
        <i v-if="!task_details.algorithms">AIX算法</i>
        <span v-else>ATLAS {{task_details.algorithms.alg_name}}</span>
      </b-col>

      <b-col class="mt-1" md="2">视觉任务：</b-col>
      <b-col class="mt-1" md="4">{{task_details.tasks}}</b-col>
      <b-col class="mt-1" md="2">创建时间：</b-col>
      <b-col class="mt-1" md="4">{{task_details.created_time}}</b-col>
      <b-col class="mt-1" md="2">任务状态:</b-col>
      <b-col class="mt-1" md="4">{{task_state}}</b-col>
      <b-col class="mt-1" md="2">开始时间：</b-col>
      <b-col class="mt-1" md="4">{{task_details.started_time}}</b-col>
      <b-col class="mt-1" md="2">数据集：</b-col>
      <b-col class="mt-1" md="4">{{task_details.datasets}}</b-col>
      <b-col class="mt-1" md="2">完成时间：</b-col>
      <b-col class="mt-1" md="4">{{task_details.completed_time}}</b-col>
      <b-col class="mt-1" v-if="Number(task_details.progress)==1" md="4">{{task_details.score}}</b-col>
    </b-row>

    <b-row v-if="task_details.algorithm">
      <b-col class="mt-1" md="2">算法：</b-col>
      <b-col class="mt-1">{{task_details.algorithm}}</b-col>
    </b-row>

    <b-row>
      <b-col class="mt-1" md="2">模型：</b-col>
      <b-col class="mt-1">{{task_details.models}}</b-col>
    </b-row>

    <!--<b-row v-if="task_details.algorithms">-->
      <!--<b-col class="mt-1" md="2">算法字段：</b-col>-->
      <!--<b-col>-->
        <!--<b-badge-->
          <!--v-for="field in task_details.algorithms.fields"-->
          <!--:key="field.id"-->
          <!--style="marginRight: 2px"-->
          <!--variant="info"-->
        <!--&gt;{{field.field_name}}: {{field.field_value}}</b-badge>-->
      <!--</b-col>-->
    <!--</b-row>-->

    <b-row>
      <b-col class="mt-1" md="2">训练进度：</b-col>
      <b-col class="mt-1">
        <b-progress
          :style="{marginTop:'7px',marginBottom:'0px'}"
          :animated="Number(task_details.progress)!=1"
          :value="task_details.progress"
          :max="1"
          :precision="2"
          :variant="task_details.runtime_error?'danger':'success'"
          show-progress
        ></b-progress>
      </b-col>
    </b-row>

    <b-row>
      <b-col class="mt-1" md="2">备注：</b-col>
      <b-col class="mt-1">
        <i v-if="!task_details.info">无备注</i>
        <span v-else>{{task_details.info}}</span>
      </b-col>
    </b-row>

    <hr />

    <b-row align="end">
      <b-col>
        <b-button
          v-if="task_details.url"
          variant="outline-success"
          @click="download(task_details.url)"
          :style="styles.methodBtn"
        >下载</b-button>
        <b-button
          variant="outline-danger"
          @click="deleteReorgTasks([task_details.id])"
          :style="styles.methodBtn"
        >删除</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapActions} from 'vuex'
import { download } from '@/utils/index'

export default {
  name: 'BasicTaskInfo',
  data: () => {
    return {
      AIX_status: {
        INIT: '初始化',
        WAITING: '等待中',
        TRAINING: '进行中',
        FINISHED: '完成'
      },
      styles: {
        methodBtn: {
          marginLeft: '5px',
          marginRight: '5px'
        }
      }
    }
  },
  computed: {
    ...mapState('task_detail', {
      task_details: (state) => state.task_details
    }),
    task_state: function () {
      if (this.task_details.processor === 'VIPA') {
        if ('state' in this.task_details && this.task_details.state === 'failed') { return '失败' }
        if ('url' in this.task_details) return '完成'
        if (this.task_details.progress === 0) return '等待中'
        else return '进行中'
      } else if (this.task_details.processor === 'AIX') {
        return this.AIX_status[this.task_details.status]
      }
      return 'invalid processor'
    }
  },
  methods: {
    ...mapActions('task_detail', ['deleteReorgTasks']),
    download
  }
}
</script>
