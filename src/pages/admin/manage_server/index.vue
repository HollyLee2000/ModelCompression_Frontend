<template>
  <div>
<!--    <b-row align-h="start" v-show="!isEditing" :style="style.down">-->
<!--    </b-row>-->
<!--    <b-row v-show="isEditing" align-h="end" :style="style.down">-->
<!--      <b-col lg="2" cols="3">-->
<!--        <b-button block variant="success" @click="isEditing=false;unselectAll()">取消</b-button>-->
<!--      </b-col>-->
<!--      <b-col lg="2" cols="3">-->
<!--        <b-button block variant="danger" @click="isEditing=false; deleteServers();unselectAll();">删除</b-button>-->
<!--      </b-col>-->
<!--    </b-row>-->
<!--    <b-modal-->
<!--        :title="updateDialogTitle"-->
<!--        no-close-on-backdrop-->
<!--        no-close-on-esc-->
<!--        :visible="is_update_dialog_open"-->
<!--        ok-title="确定"-->
<!--        cancel-title="取消"-->
<!--        @close="closeUpdateDialog"-->
<!--        @ok="closeUpdateDialog();postServer(server_info)"-->
<!--        @cancel="closeUpdateDialog"-->
<!--        :title-class="{style: {fontSize:'50px'}}"-->
<!--    >-->
<!--      <b-form>-->
<!--        <b-row>-->
<!--          <b-col cols="12">-->
<!--            <b-form-group label="名字：" label-cols-md="3" label-align="right">-->
<!--              <b-form-input v-model="server_info.username" type="text"></b-form-input>-->
<!--            </b-form-group>-->
<!--          </b-col>-->
<!--          <b-col cols="12">-->
<!--            <b-form-group label="密码：" label-cols-md="3" label-align="right">-->
<!--              <b-form-input v-model="server_info.password" type="password"></b-form-input>-->
<!--            </b-form-group>-->
<!--          </b-col>-->
<!--          <b-col cols="12">-->
<!--            <b-form-group label="确认密码：" label-cols-md="3"  label-align="right">-->
<!--              <b-form-input v-model="server_info.password2" type="password"></b-form-input>-->
<!--            </b-form-group>-->
<!--          </b-col>-->
<!--        </b-row>-->
<!--      </b-form>-->
<!--    </b-modal>-->






    <div class="mb-2 flex items-center text-sm">
      <el-radio-group v-model="type" class="ml-4" @change="resetForm">
        <el-radio label="QualitativeComparison" size="large">Published result</el-radio>
        <el-radio label="QuantitativeLeaderBoard" size="large">Leaderboard</el-radio>
      </el-radio-group>
    </div>

<!--    Any-->
    <div style="display: inline-block;" v-if="type==='QualitativeComparison'">
      <el-select v-model="dataset" class="forSearchHistory" placeholder="Select Dataset" size="large" @change="getQualitativeComparison">
        <el-option
            v-for="item in optionList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>


        <el-select v-model="model" class="forSearchHistory" placeholder="Select Model" size="large" @change="getQualitativeComparison">
          <el-option
              v-for="item in modelList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>


      <el-button class="SearchReset" type="warning" size="large" plain @click="resetForm">Reset</el-button>
    </div>





    <div style="display: inline-block" v-else>
      <el-select v-model="dataset" class="forSearchHistory" placeholder="Select Dataset" size="large" @change="getLeaderboard">
        <el-option
            v-for="item in optionListLeaderboard"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>

      <el-select v-model="model" class="forSearchHistory" placeholder="Select Model" size="large" @change="getLeaderboard">
        <el-option
            v-for="item in modelListLeaderboard"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>

      <el-select v-model="speed" class="forSearchHistory" placeholder="Speed up" size="large">
        <el-option
            v-for="item in speedlist"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      <el-button class="SearchReset" type="warning" size="large" plain @click="resetForm">Reset</el-button>


    </div>






    <b-table
        striped
        hover
        responsive
        :items="servers"
        :fields="isEditing? fieldsEditing: fields"
        :current-page="currentPage"
        :per-page="perPage"
        outlined
        v-if="type==='QualitativeComparison'"
    >
      <template v-slot:cell(source)="data">
        <a :href="data.value" target="_blank">link</a>
      </template>
      <template v-slot:cell(notes)="data">
        <span v-if="data.value==='N/A'">N/A</span>
        <el-button v-else @click="generateNotes(data.value)" plain>notes</el-button>
      </template>
    </b-table>


    <b-table
        striped
        hover
        responsive
        :items="leaderboards"
        :fields="speed === '4X' ? leaderboardfields2 : speed === '8X' ? leaderboardfields3 : leaderboardfields1"
        :current-page="currentPage"
        :per-page="perPage"
        outlined
        v-else
    >
      <template v-slot:cell(speedUp)="data">
        <span v-if="speed===''">2X</span>
        <span v-else>{{speed}}</span>
      </template>
      <template v-slot:cell(source)="data">
        <a :href="data.value" target="_blank">link</a>
      </template>
      <template v-slot:cell(notes)="data">
        <span v-if="data.value==='N/A'">N/A</span>
        <el-button v-else @click="generateNotes(data.value)" plain>notes</el-button>
      </template>
    </b-table>

    <b-pagination
        v-model="currentPage"
        :total-rows="servers.length"
        :per-page="perPage"
        align="right"
        :style="style.pagination"
        v-if="type==='QualitativeComparison'"
    ></b-pagination>

    <b-pagination
        v-model="currentPage"
        :total-rows="leaderboards.length"
        :per-page="perPage"
        align="right"
        :style="style.pagination"
        v-else
    ></b-pagination>





    <b-modal
        title="算力机管理"
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
import {postServer, getServers, deleteServers, getCurrentrank, getQualitativeComparison, getLeaderboard} from './manage_server'
import {
  closeDialog,
  closeUpdateDialog,
  setIsUpdateDialogOpen
} from '@/utils/index'
import {Search} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";

export default {
  name: 'ManageServer',
  data () {
    return {
      server_info: {
        username: '',
        password: '',
        password2: ''
      },
      perPage: 12,
      currentPage: 1,
      updateDialogTitle: '新建算力机',
      fields: [
        {
          key: 'dataset',
          label: 'Dataset',
          class: 'text-center'
        },
        {
          key: 'model',
          label: 'Model',
          sortable: true,
          class: 'text-center'
        },
        {
          key: 'year',
          label: 'Year',
          sortable: true,
          class: 'text-center'
        },
        {
          key: 'name',
          label: 'Algorithm',
          sortable: true,
          class: 'text-center'
        },
        {
          key: 'base',
          label: 'Baseline',
          class: 'text-center'
        },
        {
          key: 'pruned',
          label: 'Pruned',
          stickyColumn: true,
          class: 'text-center'
        },
        {
          key: 'accChange',
          label: 'ΔAcc',
          class: 'text-center'
        },
        {
          key: 'speedUp',
          label: 'Speed up',
          class: 'text-center'
        },
        {
          key: 'source',
          label: 'Source',
          class: 'text-center',
          // formatter: (value) => {
          //   return `<a href="${value}" target="_blank">${value}</a>`;
          // }
        },
        {
          key: 'notes',
          label: 'Notes',
          class: 'text-center'
        }
      ],
      leaderboardfields1:[
        {
          key: 'dataset',
          label: 'Dataset',
          class: 'text-center'
        },
        {
          key: 'model',
          label: 'Model',
          sortable: true,
          class: 'text-center'
        },
        {
          key: 'year',
          label: 'Year',
          sortable: true,
          class: 'text-center'
        },
        {
          key: 'name',
          label: 'Algorithm',
          sortable: true,
          class: 'text-center'
        },
        {
          key: 'base',
          label: 'Baseline',
          class: 'text-center'
        },
        {
          key: 'pruned2',
          label: 'Pruned',
          stickyColumn: true,
          class: 'text-center'
        },
        {
          key: 'accChange2',
          label: 'ΔAcc',
          class: 'text-center'
        },
        {
          key: 'speedUp',
          label: 'Speed up',
          class: 'text-center'
        },
        {
          key: 'source',
          label: 'Source',
          class: 'text-center',
          // formatter: (value) => {
          //   return `<a href="${value}" target="_blank">${value}</a>`;
          // }
        },
        {
          key: 'notes',
          label: 'Notes',
          class: 'text-center'
        }
      ],

      leaderboardfields2:[
        {
          key: 'dataset',
          label: 'Dataset',
          class: 'text-center'
        },
        {
          key: 'model',
          label: 'Model',
          sortable: true,
          class: 'text-center'
        },
        {
          key: 'year',
          label: 'Year',
          sortable: true,
          class: 'text-center'
        },
        {
          key: 'name',
          label: 'Algorithm',
          sortable: true,
          class: 'text-center'
        },
        {
          key: 'base',
          label: 'Baseline',
          class: 'text-center'
        },
        {
          key: 'pruned4',
          label: 'Pruned',
          stickyColumn: true,
          class: 'text-center'
        },
        {
          key: 'accChange4',
          label: 'ΔAcc',
          class: 'text-center'
        },
        {
          key: 'speedUp',
          label: 'Speed up',
          class: 'text-center'
        },
        {
          key: 'source',
          label: 'Source',
          class: 'text-center',
          // formatter: (value) => {
          //   return `<a href="${value}" target="_blank">${value}</a>`;
          // }
        },
        {
          key: 'notes',
          label: 'Notes',
          class: 'text-center'
        }
      ],

      leaderboardfields3:[
        {
          key: 'dataset',
          label: 'Dataset',
          class: 'text-center'
        },
        {
          key: 'model',
          label: 'Model',
          sortable: true,
          class: 'text-center'
        },
        {
          key: 'year',
          label: 'Year',
          sortable: true,
          class: 'text-center'
        },
        {
          key: 'name',
          label: 'Algorithm',
          sortable: true,
          class: 'text-center'
        },
        {
          key: 'base',
          label: 'Baseline',
          class: 'text-center'
        },
        {
          key: 'pruned6',
          label: 'Pruned',
          stickyColumn: true,
          class: 'text-center'
        },
        {
          key: 'accChange6',
          label: 'ΔAcc',
          class: 'text-center'
        },
        {
          key: 'speedUp',
          label: 'Speed up',
          class: 'text-center'
        },
        {
          key: 'source',
          label: 'Source',
          class: 'text-center',
          // formatter: (value) => {
          //   return `<a href="${value}" target="_blank">${value}</a>`;
          // }
        },
        {
          key: 'notes',
          label: 'Notes',
          class: 'text-center'
        }
      ],


      optionList: [
        {
          value: "ImageNet",
          label: "ImageNet"
        }, {
          value: "CIFAR10",
          label: "CIFAR10"
        }, {
          value: "CIFAR100",
          label: "CIFAR100"
        }
      ],
      optionListLeaderboard: [
        {
          value: "CIFAR100",
          label: "CIFAR100"
        }
      ],


      modelList: [
        {
          value: "MobileNet-v1",
          label: "MobileNet-v1"
        }, {
          value: "MobileNet-v2",
          label: "MobileNet-v2"
        }, {
          value: "ResNet-50",
          label: "ResNet-50"
        }, {
          value: "VGG16",
          label: "VGG16"
        }, {
          value: "ResNet-56",
          label: "ResNet-56"
        }, {
          value: "VGG19",
          label: "VGG19"
        }, {
          value: "DenseNet-121",
          label: "DenseNet-121"
        }, {
          value: "ViT-B/16",
          label: "ViT-B/16"
        }, {
          value: "ResNeXt-50",
          label: "ResNeXt-50"
        }


      ],
      modelListLeaderboard: [
        {
          value: "ResNet-18",
          label: "ResNet-18"
        }
      ],
      speedlist: [
        {
          value: "2X",
          label: "2X"
        },
        {
          value: "4X",
          label: "4X"
        },
        {
          value: "8X",
          label: "8X"
        }
      ],
      type: 'QualitativeComparison',
      dataset: '',
      model: '',
      speed: '',
      isEditing: false,
      style: {
        pagination: {
          marginTop: '20px'
        },
        down: {
          marginBottom: '20px'
        }
      },
      errors: '',
      servers: [],
      leaderboards: [],
      is_dialog_open: false,
      dialog_content: '',
      is_update_dialog_open: false,
      rua: 'red'
    }
  },
  computed: {
    fieldsEditing: function () {
      let res = [{key: 'selected', label: '', class: 'text-center'}]
      return res.concat(this.fields)
    }
  },
  methods: {
    openDetailPage (id) {
      // window.open('/server_detail/' + id)
      const serverDetailUrl = this.$router.resolve({
        name: 'Server Detail',
        params: { server_id: id }
      }).href;

      window.open(serverDetailUrl);
    },
    generateNotes(note){
      ElMessage({
        showClose: true,
        message: note,
        type: 'warning',
        duration: 6000
      })
    },
    resetForm(){
      this.dataset = ''
      this.model = ''
      this.speed = ''
      this.currentPage = 1
      if(this.type==='QualitativeComparison'){
        this.getQualitativeComparison()
      }else{
        this.getLeaderboard()
      }
    },
    getServers,
    getCurrentrank,
    deleteServers,
    postServer,
    getQualitativeComparison,
    getLeaderboard,
    select (item) {
      item.selected = !item.selected
    },
    unselectAll () {
      this.servers.forEach((server) => (server.selected = false))
    },
    cleanForm: function () {
      this.server_info = {
        username: '',
        password: '',
        password2: ''
      }
    },
    closeDialog,
    closeUpdateDialog,
    setIsUpdateDialogOpen
  },
  mounted () {
    console.log('mounte server')
    // this.getServers()
    // this.getCurrentrank()
    this.getQualitativeComparison()
    this.getLeaderboard()
  }
}
</script>
<!--<style  scoped>-->
<!--.dd{-->

<!--}-->
<!--</style>-->