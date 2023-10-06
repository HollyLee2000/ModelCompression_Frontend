<template>

  <b-container>
    <b-col>
      <b-row>
        <b-col class="mt-1" md="2">算力机名称：</b-col>
        <b-col class="mt-1" md="4">
          <span>{{server_details.username}}</span>
        </b-col>
        <b-col class="mt-1" md="2">上次登录：</b-col>
        <b-col class="mt-1" md="4">
          <span>{{server_details.last_login}}</span>
        </b-col>
        <b-col class="mt-1" md="2">驱动版本：</b-col>
        <b-col class="mt-1" md="4">
          <i v-if="!server_details.worker_info.driver_version">未知</i>
          <span v-else>{{server_details.worker_info.driver_version}}</span>
        </b-col>
        <b-col class="mt-1" md="2">CUDA版本：</b-col>
        <b-col class="mt-1" md="4">
          <i v-if="!server_details.worker_info.cuda_version">未知</i>
          <span v-else>{{server_details.worker_info.cuda_version}}</span>
        </b-col>
      </b-row>
    </b-col>
    <b-row>
      <b-col lg="6" v-for="data in scalar_datas" :key="data.title">
        <basic-scalar :data="data"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {closeDialog} from '@/store/utils'
import {mapState, mapActions, mapMutations} from 'vuex'
import {bisect, drawToolTip, getValidHTMLID} from '@/utils/vis_task'
import {parseTime} from '@/utils/index'
import BasicScalar from './basic_scalar/index.vue'
import * as d3 from 'd3v5'


export default {
  name: 'ServerDetail',
  components: {
    BasicScalar
  },
  computed: {
    svg_id: function () {
      return `server_scalar`
    },
    ...mapState('server_detail', {
      server_details: (state) => state.server_details,
      scalar_datas: function (state) {
        let dateParse = d3.timeParse('%Y/%m/%d %H:%M:%S')
        let ret = []
        let len = state.server_details.worker_info.worker_infos.length
        let gpu_id = 0
        let worker_infos = state.server_details.worker_info.worker_infos
        // memory
        let memory = {}
        memory['title'] = '占用显存(MiB)'
        memory['data_type'] = 'scalar'
        let memory_data = []
        for (let i = 0; i < len; i++) {
          let memory_read = worker_infos[i]['gpus_info'][gpu_id]['memory']
          let memory_val = parseInt(memory_read.substr(0, memory_read.search('MiB')))
          memory_data.push(([dateParse(parseTime(worker_infos[i].time)), i, memory_val, memory_read]))
        }
        memory['data'] = memory_data
        ret.push(memory)
        // utilization
        let utilization = {}
        utilization['title'] = 'GPU使用率(%)'
        utilization['data_type'] = 'scalar'
        let utilization_data = []
        for (let i = 0; i < len; i++) {
          let utilization_read = worker_infos[i]['gpus_info'][gpu_id]['utilization']
          let utilization_val = parseInt(utilization_read.substr(0, utilization_read.search('%')))
          utilization_data.push(([dateParse(parseTime(worker_infos[i].time)), i, utilization_val, utilization_read]))
        }
        utilization['data'] = utilization_data
        ret.push(utilization)
        // fan
        let fan = {}
        fan['title'] = '风扇转速(%)'
        fan['data_type'] = 'scalar'
        let fan_data = []
        for (let i = 0; i < len; i++) {
          let fan_speed = worker_infos[i]['gpus_info'][gpu_id]['fan']
          let fan_val = parseInt(fan_speed.substr(0, fan_speed.search('%')))
          fan_data.push(([dateParse(parseTime(worker_infos[i].time)), i, fan_val, fan_speed]))
        }
        fan['data'] = fan_data
        ret.push(fan)
        // temp
        let temp = {}
        temp['title'] = '温度(°C)'
        temp['data_type'] = 'scalar'
        let temp_data = []
        for (let i = 0; i < len; i++) {
          let temp_read = worker_infos[i]['gpus_info'][gpu_id]['temp']
          let temp_val = parseInt(temp_read.substr(0, temp_read.search('C')))
          temp_data.push(([dateParse(parseTime(worker_infos[i].time)), i, temp_val, temp_read]))
        }
        temp['data'] = temp_data
        ret.push(temp)
        // perf
        let perf = {}
        perf['title'] = '性能状态(P)'
        perf['data_type'] = 'scalar'
        let perf_data = []
        for (let i = 0; i < len; i++) {
          let perf_read = worker_infos[i]['gpus_info'][gpu_id]['perf']
          let perf_val = parseInt(perf_read.substr(1))
          perf_data.push(([dateParse(parseTime(worker_infos[i].time)), i, perf_val, perf_read]))
        }
        perf['data'] = perf_data
        ret.push(perf)
        // pwr
        let pwr = {}
        pwr['title'] = '能耗(W)'
        pwr['data_type'] = 'scalar'
        let pwr_data = []
        for (let i = 0; i < len; i++) {
          let pwr_read = worker_infos[i]['gpus_info'][gpu_id]['pwr']
          let pwr_val = parseInt(pwr_read.substr(0, pwr_read.search('W')))
          pwr_data.push(([dateParse(parseTime(worker_infos[i].time)), i, pwr_val, pwr_read]))
        }
        pwr['data'] = pwr_data
        ret.push(pwr)
        console.log(ret)
        return ret
      }
    })
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    this.$store.dispatch('server_detail/getServerDetails', to.params.server_id)
    next()
  },
  methods: {
    ...mapMutations('server_detail', ['setIsDialogOpen', 'setDialogContent']),
    closeDialog
  },
  mounted () {
    this.$store.dispatch(
      'server_detail/getServerDetails',
      this.$route.params.server_id
    )

    this.interval_id = setInterval(
      function () {
        console.log('interval')
        this.$store.dispatch(
          'server_detail/getServerDetails',
          this.$route.params.server_id
        )
      }.bind(this),
      10000
    )
  },
  beforeDestroy () {
    clearInterval(this.interval_id)
  }
}
</script>
