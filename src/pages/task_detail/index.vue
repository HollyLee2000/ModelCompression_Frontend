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
  <b-container>
    <b-col>
      <b-nav tabs>
        <b-nav-item active-class="active" :to="{name: 'Basic Task Info'}">任务信息</b-nav-item>
        <b-nav-item active-class="active" :to="{name: 'Training Log'}" v-if="log_data.length>0">日志</b-nav-item>
        <b-nav-item
          active-class="active"
          :to="{name: 'Vis Scalars'}"
          v-if="data_types.has('scalar')"
        >曲线图</b-nav-item>
        <b-nav-item
          active-class="active"
          :to="{name: 'Vis Images'}"
          v-if="data_types.has('image')"
        >预览</b-nav-item>
        <b-nav-item active-class="active" :to="{name: 'Vis Stages'}" v-if="stage.length>0">训练流程</b-nav-item>
      </b-nav>
      <div class="pt-4">
        <router-view></router-view>
        <b-modal
          title="任务"
          no-close-on-esc
          no-close-on-backdrop
          ok-only
          :visible="is_dialog_open"
          ok-title="确定"
          @close="closeDialog"
          @ok="closeDialog"
          :title-class="{style: {fontSize:'50px'}}"
        >
          <div class="text-center">{{dialog_content}}</div>
        </b-modal>
      </div>
    </b-col>
  </b-container>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { closeDialog } from '@/store/utils'

export default {
  name: 'TaskDetail',
  data: function () {
    return {
      style: {
        title: {
          fontSize: '20px'
        }
      },
      interval_id: null
    }
  },
  computed: mapState('task_detail', {
    data_types: (state) => {
      const current_types = new Set(state.vis_data.map((obj) => obj.data_type))
      return current_types
    },
    log_data: (state) => state.log_data,
    stage: (state) => state.stage,
    is_dialog_open: (state) => state.is_dialog_open,
    dialog_content: (state) => state.dialog_content
  }),
  methods: {
    ...mapMutations('task_detail', ['setIsDialogOpen', 'setDialogContent']),
    closeDialog
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    this.$store.dispatch('task_detail/getTaskDetails', to.params.task_id)
    next()
  },
  mounted () {
    this.$store.dispatch(
      'task_detail/getTaskDetails',
      this.$route.params.task_id
    )

    this.interval_id = setInterval(
      function () {
        console.log('interval')
        this.$store.dispatch(
          'task_detail/getTaskDetails',
          this.$route.params.task_id
        )
      }.bind(this),
      10000
    )
    // this.$store.commit("task_detail/setIntervalID", interval_id);
  },
  beforeDestroy () {
    clearInterval(this.interval_id)
  }
}
</script>
