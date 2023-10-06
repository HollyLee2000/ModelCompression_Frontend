<template>
  <div>
    <b-table
      striped
      hover
      responsive
      :items="reorg_tasks"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      outlined
      sort-by="-started_time"
    >
      <template v-slot:cell(name)="row">
        <i v-if="!row.item.name">空</i>
        <span v-else>{{row.item.name}}</span>
      </template>
      <template v-slot:cell(created_time)="row">{{parseTime(row.item.created_time)}}</template>
      <template v-slot:cell(started_time)="row">{{parseTime(row.item.started_time)}}</template>
      <template v-slot:cell(completed_time)="row">{{parseTime(row.item.completed_time)}}</template>
      <template v-slot:cell(tasks)="row">{{row.item.tasks.length? row.item.tasks.reduce(convertArray2String): '--'}}
      </template>
      <template v-slot:cell(datasets)="row">{{row.item.datasets.length? row.item.datasets.reduce(convertArray2String):
        '--'}}
      </template>
      <template v-slot:cell(progress)="row">
        <span v-if="is_failed(row.item)">失败</span>
        <span v-else-if="parseTime(row.item.completed_time) === '--'">等待训练完成</span>
        <span v-else>训练完成!</span>
<!--        <b-progress-->
<!--          v-else-->
<!--          :style="{marginTop:'7px',marginBottom:'7px', }"-->
<!--          :animated="Number(row.value)!=1"-->
<!--          :value="row.value"-->
<!--          :max="1"-->
<!--          :precision="2"-->
<!--          :variant="row.item.runtime_error?'danger':'success'"-->
<!--          show-progress-->
<!--        ></b-progress>-->
      </template>
      <template v-slot:cell(url)="row">
        <div style="white-space: nowrap">
<!--          <b-button-->
<!--            variant="outline-primary"-->
<!--            size="sm"-->
<!--            @click="openDetailPage(row.item.id)"-->
<!--            :style="style.methodBtn"-->
<!--          >详情-->
<!--          </b-button>-->

          <b-button
            :disabled="!row.value"
            :variant="row.value? 'outline-success': 'outline-secondary'"
            size="sm"
            @click="mention_download()"
            :style="row.value? style.methodBtn: style.disabledMethodBtn"
          >下载
          </b-button>
          <b-button
            variant="outline-danger"
            size="sm"
            :style="style.methodBtn"
            @click="deleteReorgTasks([row.item.id])"
          >删除
          </b-button>
        </div>
      </template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="reorg_tasks.length"
      :per-page="perPage"
      align="right"
      :style="style.pagination"
    ></b-pagination>
    <b-modal
      title="我的任务"
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
</template>

<script>
import {download, openDetailPage, parseTime, convertArray2String, closeDialog} from '@/utils/index'
import {getReorgTasks, deleteReorgTasks} from '../task'
import {ElMessage} from "element-plus";

export default {
  name: 'MyTasks',
  data () {
    return {
      perPage: 10,
      currentPage: 1,
      fields: [
        {
          key: 'tasks',
          label: '种类',
          sortable: true,
          class: 'text-center'
        },
        {
          key: 'name',
          label: '名称',
          sortable: true,
          class: 'text-center'
        },
        {
          key: 'datasets',
          label: '数据集',
          sortable: true,
          class: 'text-center'
        },
        {
          key: 'created_time',
          label: '创建时间',
          sortable: true,
          class: 'text-center'
        },
        {
          key: 'started_time',
          label: '开始时间',
          sortable: true,
          class: 'text-center'
        },
        {
          key: 'completed_time',
          label: '完成时间',
          sortable: true,
          class: 'text-center'
        },
        {
          key: 'progress',
          label: '进度',
          class: 'text-center'
        },
        {
          key: 'url',
          label: '操作',
          class: 'text-center table-method',
          stickyColumn: true
        }
      ],
      style: {
        pagination: {
          marginTop: '20px'
        },
        row: {
          marginTop: '20px'
        },
        methodBtn: {
          marginLeft: '5px',
          marginRight: '5px'
        },
        disabledMethodBtn: {
          marginLeft: '5px',
          marginRight: '5px',
          cursor: 'default'
        }
      },
      errors: '',
      reorg_tasks: [],
      is_dialog_open: false,
      dialog_content: ''
    }
  },
  methods: {
    getReorgTasks,
    deleteReorgTasks,
    closeDialog,
    is_failed (info) {
      return ('state' in info && info.state === 'failed')
    },
    openDetailPage,
    download,
    parseTime,
    convertArray2String,
    mention_download(){
      ElMessage.warning('请在完成训练后到对应的原型树页面选择自己的模型下载')
    }
  },
  mounted () {
    this.getReorgTasks()
  }
}
</script>
