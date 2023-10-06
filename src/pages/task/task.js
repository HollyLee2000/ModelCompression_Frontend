import request from '@/utils/request'
import store from '@/store'

import { hasDuplicates } from '@/utils/index'
import {ElMessage} from "element-plus";

export const getReorgOptions = function () {
  request.get(`/api/task/reorg_task_options`, {
  })
    .then((response) => {
      console.log('reorgOptions', response)
      this.options = response.data
    })
    .catch((errors) => {
      console.log('error', errors)
      this.options = {}
      this.errors = errors
    })
}
export const createReorgTasks = function (task_info) {
  task_info.username = store.state.username
  let new_task_info = Object.assign({}, task_info)
  console.log(this.options)
  console.log(task_info)
  // transfer to arrays, for dev.
  // if (new_task_info.algorithms !== null) {
  //   new_task_info.args = this.options.algorithms.find(algorithm => (algorithm.id) === new_task_info.algorithm).args
  // }
  // if (!Array.isArray(new_task_info.datasets)) { new_task_info.datasets = [new_task_info.datasets] }
  // if (!Array.isArray(new_task_info.models)) { new_task_info.models = [new_task_info.models] }

  if (new_task_info.tasks === '') {
    console.log("new_task_info.tasks为空")
    ElMessage.error('请选择要创建的任务类别')
  } else if (new_task_info.name === '') {
      ElMessage.error('请给自己的任务起个名字')
  }else if (!new_task_info.datasets) {
      ElMessage.error('请选择一个数据集')
  }else if (!new_task_info.depth) {
      ElMessage.error('请选择原型树的高度')
  }else if (!new_task_info.epoch) {
      ElMessage.error('请选择训练的迭代次数')
  }else if (!new_task_info.proto_dim) {
      ElMessage.error('请选择原型层的特征维度')
  }else {
    console.log('the created task', new_task_info)
    request.post(`/api/task/reorg_prototree_tasks`, {
      task_info: new_task_info
    })
      .then((response) => {
        console.log('create ReorgTasks', response)
        this.is_dialog_open = true
        this.dialog_content = '创建成功'
      })
      .catch((errors) => {
        console.log('error', errors)
        this.errors = errors
          ElMessage.error('创建失败任务！:', errors)
        // this.is_dialog_open = true
        // this.dialog_content = '创建失败! ' + errors
      })
  }
}
export const getReorgTasks = function () {
  console.log("store.state.username", store.state.username)
    let user_name = store.state.username
    console.log("user_name", user_name)
  request.get(`/api/task/reorg_prototree_tasks`, {
      params: {
          user_name: user_name
      }
  })
    .then((response) => {
      console.log('ReorgTasks', response.data)
      let tasks = response.data
      for (let t of tasks) {
        console.log('task', t)
      }
      this.reorg_tasks = tasks
    })
    .catch((errors) => {
      console.log('error', errors)
      this.reorg_tasks = []
      this.errors = errors
    })
}
export const deleteReorgTasks = function (task_ids) {
  console.log('tasks', task_ids)
    let user_name = store.state.username
  request.delete(`/api/task/reorg_prototree_tasks`, {
      params: {
          user_name: user_name
      }
  })
    .then((response) => {
      console.log('delete success')
      this.is_dialog_open = true
      this.dialog_content = '删除成功'
      this.getReorgTasks()
    })
    .catch((errors) => {
      console.log('delete failure')
      this.errors = errors
      this.is_dialog_open = true
      this.dialog_content = '删除失败'
      this.getReorgTasks()
    })
}
