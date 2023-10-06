<template>
  <div>
    <b-form>
      <b-row>
        <b-col md="12">
          <b-form-group label="类别：" label-cols-sm="3" label-cols-lg="1" label-align="right" inline>
            <b-form-radio
                v-for="item in options.tasks"
                :key="item.id"
                :value="item.id"
                v-model="task_info.tasks"
                name="selectedTask"
                button
                button-variant="outline-primary"
                :style="style.checkbox"
            >{{ item.name }}
            </b-form-radio>
          </b-form-group>
        </b-col>


<!--        <b-col md="12">-->
<!--          <b-form-group label="类别：" label-cols-sm="3" label-cols-lg="1" label-align="right">-->
<!--            <b-form-checkbox-->
<!--              v-for="item in options.tasks"-->
<!--              :key="item.id"-->
<!--              :value="item.id"-->
<!--              v-model="task_info.tasks"-->
<!--              button-->
<!--              button-variant="outline-primary"-->
<!--              :style="style.checkbox"-->
<!--            >{{item.name}}-->
<!--            </b-form-checkbox>-->
<!--          </b-form-group>-->
<!--        </b-col>-->

        <b-col md="12">
          <b-form-group label="名称：" label-cols-sm="3" label-cols-lg="1" label-align="right">
            <el-input v-model="task_info.name" type="text" placeholder="请输入自己的模型名称"></el-input>
          </b-form-group>
        </b-col>
        <!--        <b-col md="12">-->
        <!--          <b-form-group label="算法：" label-cols-sm="3" label-cols-lg="1" label-align="right">-->
        <!--            <el-select v-model="task_info.algorithm" style="width: 100%" placeholder="请选择" clearable filterable>-->
        <!--                <el-option-->
        <!--                    v-for="item in currentAlgorithms"-->
        <!--                    :key="item.id"-->
        <!--                    :label="item.name"-->
        <!--                    :value="item.id"-->
        <!--                />-->
        <!--            </el-select>-->
        <!--          </b-form-group>-->
        <!--        </b-col>-->
        <b-col md="12">
          <b-form-group label="数据集：" label-cols-sm="3" label-cols-lg="1" label-align="right">
            <el-select v-model="task_info.datasets" style="width: 100%" placeholder="请选择" clearable filterable>
              <el-option
                  v-for="item in currentDatasets"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
              />
            </el-select>
          </b-form-group>
        </b-col>
        <b-col md="12">
          <b-form-group label="树的高度：" label-cols-sm="3" label-cols-lg="1" label-align="right">
            <el-select v-model="task_info.depth" style="width: 100%" placeholder="请选择" clearable filterable>
              <el-option
                  v-for="item in options.depth"
                  :key="item.val"
                  :label="item.val"
                  :value="item.val"
              />
            </el-select>
          </b-form-group>
        </b-col>
        <b-col md="12">
          <b-form-group label="迭代次数：" label-cols-sm="3" label-cols-lg="1" label-align="right">
            <el-select v-model="task_info.epoch" style="width: 100%" placeholder="请选择" clearable filterable>
              <el-option
                  v-for="item in options.epoch"
                  :key="item.val"
                  :label="item.val"
                  :value="item.val"
              />
            </el-select>
          </b-form-group>
        </b-col>

        <b-col md="12">
          <b-form-group label="原型维度：" label-cols-sm="3" label-cols-lg="1" label-align="right">
            <el-select v-model="task_info.proto_dim" style="width: 100%" placeholder="请选择" clearable filterable>
              <el-option
                  v-for="item in options.proto_dim"
                  :key="item.val"
                  :label="item.val"
                  :value="item.val"
              />
            </el-select>
          </b-form-group>
        </b-col>

        <b-col md="12">
          <b-form-group :label="'备注：'" label-cols-sm="3" label-cols-lg="1" label-align="right">
            <el-input type="textarea" v-model="task_info.info" placeholder="请键入模型其它信息（可选，但是还不支持中文）" rows="5"></el-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-button
        block
        @click="createReorgTasks(task_info)"
        variant="primary"
        :style="style.submitBtn"
      >开始训练！
      </b-button>
    </b-form>

    <b-card title="分布式训练选项" bg-variant="light" v-if="currentAlgorithm!=null && currentAlgorithm.is_support_ddp===true" fluid>
      <b-form-group
        label="并行训练："
        label-cols-sm="2"
        label-align-sm="right"
      >
          <b-form-checkbox
            v-model="task_info.ddp_config.ddp_training"
            :value="true"
            :unchecked-value="false"
            class="pt-2"
          >是</b-form-checkbox>
      </b-form-group>
      <b-form-group
        v-if="task_info.ddp_config.ddp_training===true"
        label="并行数："
        label-cols-sm="2"
        label-align-sm="right">
        <b-form-input
            v-if="task_info.ddp_config.ddp_training===true"
            v-model="task_info.ddp_config.ddp_num"
            type="number">ddd</b-form-input>
      </b-form-group>
    </b-card>

    <br>

    <b-card title="高级选项" sub-title="选填" bg-variant="light" v-if="currentAlgorithm!=null" fluid>
      <b-form-group
        v-for="field in currentAlgorithm.args"
        :key="field.name"
        label-cols-sm="2"
        :label="field.name"
        :description="field.description"
        label-align-sm="right"
      >
        <b-form-input v-model="field.value"></b-form-input>
      </b-form-group>
    </b-card>

    <b-modal
      title="新建任务"
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
import {closeDialog} from '@/utils/index'
import {getReorgOptions, createReorgTasks} from '../task'
// import store from '@/store'

export default {
  name: 'CreateTask',
  data: function () {
    return {
      task_ds: null,
      task_info: {
        tasks: '',
        name: '',
        info: '',
        username: '',
        proto_dim: null,
        depth: null,
        epoch: null,
        datasets: null,
        models: [],
        algorithm: null,
        args: [],
        ddp_config: {
          ddp_training: false,
          ddp_num: 1
        }
      },
      style: {
        title: {
          fontSize: '20px'
        },
        pagination: {
          marginTop: '20px'
        },
        submitBtn: {
          marginTop: '20px',
          marginBottom: '20px'
        },
        checkbox: {
          marginLeft: '0px',
          marginRight: '10px',
          marginTop: '5px',
          marginBottom: '5px'
        },
        teacher_model_btn: {
          marginRight: '20px'
        }
      },
      options: {
        tasks: {
          0:{
            id: "ProtPTree",
            name: "原型神经树",
          },
          1:{
            id: "SeBoW",
            name: "自搜索神经树",
          }
        },
        datasets: {
          0:{
            id: "CUB-2011",
            name: "CUB-2011",
          },
          1:{
            id: "Stanford CARS",
            name: "Stanford CARS",
          },
          2:{
            id: "Cifar10",
            name: "Cifar10",
          },
          3:{
            id: "Cifar100",
            name: "Cifar100",
          }
        },
        depth: {
          0:{
            val: 8,
          },
          1:{
            val: 9,
          },
          2:{
            val: 10,
          }
        },
        epoch: {
          0:{
            val: 100,
          },
          1:{
            val: 150,
          },
          2:{
            val: 200,
          },
          3:{
            val: 250,
          },
          4:{
            val: 300,
          }
        },
        proto_dim: {
          0:{
            val: 128,
          },
          1:{
            val: 256,
          },
          2:{
            val: 512,
          },
          3:{
            val: 1024,
          }
        }
      },
      errors: '',
      is_dialog_open: false,
      dialog_content: ''
    }
  },
  computed: {
    currentAlgorithm () {
      if (this.task_info.algorithm === null || this.task_info.algorithm === undefined) return null
      console.log(this.options.algorithms.find((algorithm) => algorithm.id === this.task_info.algorithm))
      return this.options.algorithms.find(
        (algorithm) => algorithm.id === this.task_info.algorithm
      )
    },
    currentDatasets () {
      if (this.options.datasets === null || this.options.datasets === undefined) return []
      if (this.task_info.tasks.length === 0) return this.options.datasets
      let all_tasks = new Set(this.task_info.tasks)
      return this.options.datasets.filter(function (item, index, self) {
        let ts = new Set(item['task'])
        for (let key of all_tasks) {
          if (!ts.has(key)) { return false }
        }
        return true
      })
    },
    currentAlgorithms () {
      if (this.options.algorithms === null || this.options.algorithms === undefined) return []
      if (this.task_info.tasks.length === 0) return this.options.algorithms
      let all_tasks = new Set(this.task_info.tasks)
      return this.options.algorithms.filter(function (item, index, self) {
        let ts = new Set(item['task'])
        for (let key of all_tasks) {
          if (!ts.has(key)) { return false }
        }
        return true
      })
    }
  },
  methods: {
    closeDialog,
    getReorgOptions,
    createReorgTasks,
    getCriteria (search_list) {
      // Compute the search criteria
      return search_list.trim().toLowerCase()
    },

    onDatasetClick ({item, addTag}) {
      addTag(item.name)
      this.dataset_search = ''
    },
    onAlgorithmClick ({item, addTag}) {
      addTag(item.name)
      this.algorithm_search = ''
    },

    availableItems (search, selectedItems, allItems) {
      const criteria = this.getCriteria(search)
      const candidates = allItems.filter(
        (candi) => selectedItems.indexOf(candi.name) === -1
      )
      if (criteria) {
        return candidates.filter(
          (candi) => candi.name.toLowerCase().indexOf(criteria) > -1
        )
      }
      return candidates
    }
  },
  mounted () {
    // this.getReorgOptions()
  }
}
</script>
