<template>
<!--  <div>-->
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




<!--  <div style="display: flex;">-->

<!--    <div>-->

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
      <el-select v-model="Leaderboardsetting" class="forSearchHistory" placeholder="LeaderBoard" size="large" @change="getLeaderboard">
        <el-option
            v-for="item in ListLeaderboard"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
        />
      </el-select>


      <el-select v-model="speed" class="forSearchHistory" placeholder="Speed-up" size="large">
        <el-option
            v-for="item in speedlist"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>

      <el-select v-model="regularizer" class="forSearchHistory" placeholder="Regularizer setting" size="large">
        <el-option
            v-for="item in regularizerList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>

      <el-button class="SearchReset" type="warning" size="large" plain @click="resetForm">Reset</el-button>


    </div>
<!--    </div>-->

<!--    <div v-if="type==='QuantitativeLeaderBoard'" style="display: flex; margin-left: 20px">-->
<!--      <div style="display: flex; flex-direction: column;">-->
<!--        <text>Importance</text>-->
<!--        <text>Importance</text>-->
<!--        <text>Importance</text>-->
<!--      </div>-->
<!--    </div>-->

<!--  </div>-->






    <b-table
        striped
        hover
        responsive
        :items="serversWithCalculatedPruned"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        outlined
        v-if="type==='QualitativeComparison'"
    >
      <template v-slot:cell(source)="data">
        <a :href="data.value" target="_blank">link</a>
      </template>
      <template v-slot:cell(name)="data">
        <a :href="data.value.split('_split_')[1]" target="_blank">{{data.value.split('_split_')[0]}}</a>
      </template>
      <template v-slot:cell(notes)="data">
        <span v-if="data.value==='N/A'">N/A</span>
        <el-button v-else @click="generateNotes(data.value)" plain>info</el-button>
      </template>
    </b-table>

<!--    speed === '4X' ? leaderboardfields2 : speed === '8X' ? leaderboardfields3 : leaderboardfields1-->
    <b-table
        striped
        hover
        responsive
        :items="leaderboardsWithCalculatedPruned"
        :fields="leaderboardfields"
        :current-page="currentPage"
        :per-page="perPage"
        outlined
        v-else
    >
      <template v-slot:cell(rank)="data">
        {{data.index+1}}
      </template>
      <template v-slot:cell(name)="data">
        <a v-if="data.value.split('_split_')[0]!=='Hessian'" :href="data.value.split('_split_')[1]" target="_blank">{{data.value.split('_split_')[0]}}</a>
        <a v-else :href="data.value.split('_split_')[1]" target="_blank">{{data.value.split('_split_')[0]}}*</a>
      </template>

      <template v-slot:cell(accChange)="data">
        <text v-if="data.value>0">{{"+" + data.value}}</text>
        <text v-else>{{data.value}}</text>
      </template>

      <template v-slot:cell(pruneTime)="data">
        <text v-if="data.value===null">N/A</text>
        <text v-else>{{data.value}}s</text>
      </template>

      <template v-slot:cell(sparseTime)="data">
        <text v-if="data.value===null">N/A</text>
        <text v-else>{{data.value}}s</text>
      </template>

      <template v-slot:cell(regularizer)="data">
        <a v-if="data.value!=='N/A' && data.value.split('_split_')[0]!=='GroupLASSO'" :href="data.value.split('_split_')[1]" target="_blank">{{data.value.split('_split_')[0]}}</a>
        <a v-else-if="data.value.split('_split_')[0]==='GroupLASSO'" :href="data.value.split('_split_')[1]" target="_blank">{{data.value.split('_split_')[0]}}*</a>
        <text v-else>N/A</text>
      </template>


      <template v-slot:cell(notice)="data">
        <span v-if="data.value==='N/A'">N/A</span>
        <el-button v-else @click="generateNotes(data.value)" plain>info</el-button>
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

<!--    </div>-->

<!--  </div>-->





<!--    <b-modal-->
<!--        title="算力机管理"-->
<!--        no-close-on-esc-->
<!--        no-close-on-backdrop-->
<!--        ok-only-->
<!--        :visible="is_dialog_open"-->
<!--        ok-title="确定"-->
<!--        @close="closeDialog"-->
<!--        @ok="closeDialog"-->
<!--        :title-class="{style: {fontSize:'50px'}}"-->
<!--    >-->
<!--      <div class="text-center">{{dialog_content}}</div>-->
<!--    </b-modal>-->
<!--  </div>-->
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

function parseParamsChange(change) {
  console.log("change.split(' ')", change.split(' '))
  const [numStr, MM, percentStr] = change.split(' ');
  const num = parseFloat(numStr);
  // const [tool1, tool2] = percentStr.split('(');
  // const [percent_start, percent_end] = tool2.split('(');
  // console.log("percentStr.slice(1, -2): ", percentStr.slice(1, -2))
  console.log("percent: ", percentStr.split('(')[1].split('%')[0])
  const percent = parseFloat(percentStr.split('(')[1].split('%')[0]);
  return [num, percent];
}
function buildParamsChange(num, percent) {
  return `${num.toFixed(2)} M (${percent.toFixed(2)}%)`;
}

function getAverageParamsChange(change1, change2, change3) {
  const [num1, percent1] = parseParamsChange(change1);
  const [num2, percent2] = parseParamsChange(change2);
  const [num3, percent3] = parseParamsChange(change3);
  const averageNum = (num1 + num2 + num3) / 3;
  const averagePercent = (percent1 + percent2 + percent3) / 3;
  return buildParamsChange(averageNum, averagePercent);
}

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
          class: 'text-center'
        },
        {
          key: 'year',
          label: 'Year',
          class: 'text-center'
        },
        {
          key: 'name',
          label: 'Algorithm',
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
          key: 'notes',
          label: 'Notice',
          class: 'text-center'
        }
        // formatter: (value) => {
        //   return `<a href="${value}" target="_blank">${value}</a>`;
        // }
      ],
      leaderboardfields:[
        {
          key: 'rank',
          label: 'Rank',
          class: 'text-center'
        },
        {
          key: 'name',
          label: 'Importance',
          class: 'text-center'
        },
        {
          key: 'regularizer',
          label: 'Regularizer',
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
          key: 'paramsChange',
          label: 'Pruning ratio',
          class: 'text-center'
        },
        {
          key: 'pruneTime',
          label: 'Step time',
          class: 'text-center',
        },
        {
          key: 'sparseTime',
          label: 'Reg time',
          class: 'text-center',
        },
        {
          key: 'notice',
          label: 'Notice',
          class: 'text-center'
        },
        // {
        //   key: 'regularizerLink',
        //   label: 'RegularizerLink',
        //   class: 'text-center',
        //   // formatter: (value) => {
        //   //   return `<a href="${value}" target="_blank">${value}</a>`;
        //   // }
        // }
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

      mapList: {
        "ImageNet - ResNet-50": {
          "dataset": "ImageNet",
          "model": "ResNet-50"
        },
        "ImageNet - VGG19-BN": {
          "dataset": "ImageNet",
          "model": "VGG19-BN"
        },
        "CIFAR100 - ResNet-18": {
          "dataset": "CIFAR100",
          "model": "ResNet-18"
        },
        "CIFAR100 - VGG19": {
          "dataset": "CIFAR100",
          "model": "VGG19"
        }
      },
      ListLeaderboard: [
        {
          value: "ImageNet - ResNet-18",
          label: "ImageNet - ResNet18 (11.69 M)",
          disabled: true
        },
        {
          value: "ImageNet - ViT-Small",
          label: "ImageNet - ViT-Small (22.05 M)",
          disabled: true
        },
        {
          value: "ImageNet - ViT-Base",
          label: "ImageNet - ViT-Base (86.57 M)",
          disabled: true
        },
        {
          value: "ImageNet - ResNet-50",
          label: "ImageNet - ResNet-50 (optional, 25.58 M)",
          disabled: true
        },
        {
          value: "CIFAR100 - ResNet-18",
          label: "CIFAR100 - ResNet18-Without collapse protection (11.22 M)"
        },
        {
          value: "CIFAR100 - ResNet-18-Local prune",
          label: "CIFAR100 - ResNet18-Local prune (11.22 M)",
          disabled: true
        },
        {
          value: "CIFAR100 - ResNet-18-Real",
          label: "CIFAR100 - ResNet18 (11.22 M)",
          disabled: true
        },
        {
          value: "CIFAR100 - VGG19",
          label: "CIFAR100 - VGG19-Without collapse protection (20.09 M)",
        },
        {
          value: "CIFAR100 - VGG19-Local prune",
          label: "CIFAR100 - VGG19-Local prune (20.09 M)",
          disabled: true
        },
        {
          value: "CIFAR100 - VGG19-Real",
          label: "CIFAR100 - VGG19 (20.09 M)",
          disabled: true
        },
        {
          value: "CIFAR100 - ResNet-50",
          label: "CIFAR100 - ResNet-50-Without collapse protection (25.16 M)",
          disabled: true
        },
        {
          value: "CIFAR100 - ResNet-50-Local prune",
          label: "CIFAR100 - ResNet-50-Local prune (25.16 M)",
          disabled: true
        },
        {
          value: "CIFAR100 - ResNet-50-Real",
          label: "CIFAR100 - ResNet-50 (25.16 M)",
          disabled: true
        },
        {
          value: "COCO - YOLOv8M",
          label: "COCO - YOLOv8M (25.9 M)",
          disabled: true
        },
        {
          value: "AGNews - LSTM",
          label: "AGNews - LSTM (-- M)",
          disabled: true
        },
        {
          value: "PPI - GAT",
          label: "PPI - GAT (-- M)",
          disabled: true
        }
      ],
      regularizer: '',
      regularizerList:[
        {
          value: 1,
          label: "With sparsity regularizer"
        },
        {
          value: 0,
          label: "Without sparsity regularizer"
        },
        {
          value: 2,
          label: "Compare sparsity regularizer only"
        }
      ],
      speedlist: [
        {
          value: "2X",
          label: "2X (↓50%)"
        },
        {
          value: "4X",
          label: "4X (↓75%)"
        },
        {
          value: "8X",
          label: "8X (↓87.5%)"
        },
        {
          value: "Average",
          label: "Average"
        }
      ],
      type: 'QualitativeComparison',
      dataset: '',
      model: '',
      speed: '',
      Leaderboardsetting:'',
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
    },
    serversWithCalculatedPruned(){
      return this.servers.map(item => ({
        ...item,
        name: item.name + "_split_" + item.source,
      }))
    },
    leaderboardsWithCalculatedPruned() {
      let cal_leaderboard = this.leaderboards.map(item => ({
        ...item,
        pruned: this.speed === 'Average' ? ((parseFloat(item.pruned2) + parseFloat(item.pruned4) + parseFloat(item.pruned6)) / 3).toFixed(2) :
            this.speed === '4X' ? item.pruned4 : this.speed === '8X' ? item.pruned6 : item.pruned2,
        paramsChange: this.speed === '4X' ? item.paramsChange4 : this.speed === '8X' ? item.paramsChange6 : this.speed === 'Average'? getAverageParamsChange(item.paramsChange2, item.paramsChange4, item.paramsChange6) : item.paramsChange2,
        regularizer: item.regularizer===null?'N/A':item.regularizer + "_split_" + item.regularizerLink,
        name: item.name + "_split_" + item.prunerLink,
        accChange: this.speed === 'Average' ? (((parseFloat(item.pruned2) - parseFloat(item.base)) + (parseFloat(item.pruned4) - parseFloat(item.base)) + (parseFloat(item.pruned6) - parseFloat(item.base))) / 3).toFixed(2) :
            this.speed === '4X' ? (parseFloat(item.pruned4) - parseFloat(item.base)).toFixed(2) : this.speed === '8X' ? (parseFloat(item.pruned6) - parseFloat(item.base)).toFixed(2) : (parseFloat(item.pruned2) - parseFloat(item.base)).toFixed(2),
      })).sort((a, b) => parseFloat(b.accChange) - parseFloat(a.accChange)); //按照accChange由大到小进行排序
      if (this.regularizer === 0) {
        return cal_leaderboard.filter(item => item.regularizer === 'N/A');
      } else if (this.regularizer === 1 || this.regularizer === '') {
        return cal_leaderboard;
      }else{
        return cal_leaderboard.filter(item => item.regularizer !== 'N/A')
      }
    },
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
      this.Leaderboardsetting = ''
      this.regularizer = ''
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