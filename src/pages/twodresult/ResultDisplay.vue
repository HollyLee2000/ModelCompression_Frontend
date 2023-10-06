<template>
  <div style="display: grid; place-items: center;">
    <h2>缺陷检测结果展示-局部</h2>
  </div>
  <div v-if="show">
    <el-row :gutter="12">
      <el-col :span="8" v-for="(item,index) in tableData.slice((cur_page - 1) * pageSize, cur_page * pageSize)" :key="item.id">
        <el-card :body-style="{ padding: '0px' }" style="width: 580px;height: 480px">
          <el-image
              style="width: 550px; height: 400px"           
              :src="`http://${this.pictures.value[index].pictureUrl}`"
              :preview-src-list="[`http://${this.pictures.value[index].pictureUrl}`]"
          > 
          </el-image>
          <div style="padding: 6px;">
            <span class="my">检测结果</span>
            <div class="bottom clearfix">
              <el-button type="primary" plain @click="dialogClick(item)" class="button">详细信息</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <br/>
    <div style="display: grid; place-items: center;" class="block">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="cur_page"
          :page-size="6"
          layout="prev, pager, next"
          :total="listLength"
      >
      </el-pagination>
    </div>
    <!--弹出详细信息-->
    <el-dialog
        :draggable="true"
        v-model="dialogVisible"
        :append-to-body="true"
        width="50%"
        :before-close="handleClose">
      <el-descriptions
        class="margin-top"
        title="检测详情"
        :column="3"
        :size="size"
        border
      >
      <template #extra>
        <el-button type="primary">设置</el-button>
      </template>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <user />
            </el-icon>
            图片格式
          </div>
        </template>
        {{ tableData[this.index-1].type }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <iphone />
            </el-icon>
            图片大小
          </div>
        </template>
        {{ tableData[this.index-1].size }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <location />
            </el-icon>
            地址
          </div>
        </template>
        {{ tableData[this.index-1].address }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <tickets />
            </el-icon>
            是否存在裂缝
          </div>
        </template>
        <el-tag size="small" v-if="tableData[this.index-1].isCrack">是</el-tag>
        <el-tag size="small" v-else>否</el-tag>
      </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <iphone />
              </el-icon>
              裂缝长度
            </div>
          </template>
          {{ tableData[this.index-1].length }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <location />
              </el-icon>
              裂缝宽度
            </div>
          </template>
          {{ tableData[this.index-1].width }}
        </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <tickets />
            </el-icon>
            图片编号
          </div>
        </template>
        {{ tableData[this.index-1].number }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <office-building />
            </el-icon>
            检测时间
          </div>
        </template>
        {{ tableData[index-1].time }}
      </el-descriptions-item>
      </el-descriptions>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">确定</el-button>
        </span>
      </template>
    </el-dialog>
</template>

<style scoped>
.my {
  display: block;
  align-content: center;
}
.bottom {
  margin-top: 6px;
  line-height: 6px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.dialog-footer button:first-child {
  margin-right: 10px;
}

</style>

<script>
import {ref} from "vue";
import request from "../../api";
import store from '@/store'

const result=ref()
export default {
  data() {
    return {
      show:false,
      listLength:6,
      dialogVisible: false,
      size:ref(''),
      total:60,
      cur_page:1,
      pageSize:6,
      index:0,
      tableData:[],
      pictures:ref([])
    }
  },
  methods: {
    getPathFun() {
      if(this.$route.path === '/twodresult')
      {
        request.post('/algorithm/getResults',{"modelName": store.state.showHistoryRecordName})
          .then(res=> {
            this.tableData=res.data.data
        })
        request.post('/data/getPictures',{"datasetId": store.state.showHistoryDatasetId})
          .then(res=> {
            result.value=res.data.data.pictures
            this.pictures.value=res.data.data.pictures
            this.show=true
            this.listLength=this.pictures.value.length
          })
          .catch(err=> {
            console.log(err)
          })
      }
    },
    dialogClick(item) {
      this.dialogVisible = true
      this.index = item.index
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          // eslint-disable-next-line no-unused-vars
          .then((_) => {
            done()
          })
          // eslint-disable-next-line no-unused-vars
          .catch((_) => {})
    },
    handleSizeChange(val) {
      this.pageSize=val
    },
    handleCurrentChange(val) {
      this.cur_page=val;
    }
  },
  mounted: function () {
    this.getPathFun()
  },
  watch: {
    '$route':'getPathFun'
  }
}
</script>