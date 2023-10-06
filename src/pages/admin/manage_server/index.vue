<template>
  <div>
    <b-row align-h="start" v-show="!isEditing" :style="style.down">
    </b-row>
    <b-row v-show="isEditing" align-h="end" :style="style.down">
      <b-col lg="2" cols="3">
        <b-button block variant="success" @click="isEditing=false;unselectAll()">取消</b-button>
      </b-col>
      <b-col lg="2" cols="3">
        <b-button block variant="danger" @click="isEditing=false; deleteServers();unselectAll();">删除</b-button>
      </b-col>
    </b-row>
    <b-modal
        :title="updateDialogTitle"
        no-close-on-backdrop
        no-close-on-esc
        :visible="is_update_dialog_open"
        ok-title="确定"
        cancel-title="取消"
        @close="closeUpdateDialog"
        @ok="closeUpdateDialog();postServer(server_info)"
        @cancel="closeUpdateDialog"
        :title-class="{style: {fontSize:'50px'}}"
    >
      <b-form>
        <b-row>
          <b-col cols="12">
            <b-form-group label="名字：" label-cols-md="3" label-align="right">
              <b-form-input v-model="server_info.username" type="text"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group label="密码：" label-cols-md="3" label-align="right">
              <b-form-input v-model="server_info.password" type="password"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group label="确认密码：" label-cols-md="3"  label-align="right">
              <b-form-input v-model="server_info.password2" type="password"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </b-modal>

    <b-table
        striped
        hover
        responsive
        :items="servers"
        :fields="isEditing? fieldsEditing: fields"
        :current-page="currentPage"
        :per-page="perPage"
        outlined
    >
      <template v-slot:cell(online)="row">
        <div class="h2 mb-0">
          <b-icon icon="circle-fill" variant="success" v-if="row.item.online === true"></b-icon>
          <b-icon icon="circle-fill" variant="danger" v-if="row.item.online === false"></b-icon>
        </div>
      </template>
    </b-table>

    <b-pagination
        v-model="currentPage"
        :total-rows="servers.length"
        :per-page="perPage"
        align="right"
        :style="style.pagination"
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
import {postServer, getServers, deleteServers, getCurrentrank} from './manage_server'
import {
  closeDialog,
  closeUpdateDialog,
  setIsUpdateDialogOpen
} from '@/utils/index'

export default {
  name: 'ManageServer',
  data () {
    return {
      server_info: {
        username: '',
        password: '',
        password2: ''
      },
      perPage: 8,
      currentPage: 1,
      updateDialogTitle: '新建算力机',
      fields: [
        {
          key: 'ranking',
          label: 'Ranking',
          class: 'text-center'
        },
        {
          key: 'username',
          label: 'contributor',
          sortable: true,
          class: 'text-center'
        },
        {
          key: 'institute',
          label: 'institute',
          sortable: true,
          class: 'text-center'
        },
        {
          key: 'name',
          label: 'algorithm',
          class: 'text-center'
        },
        {
          key: 'score',
          label: 'metascore',
          stickyColumn: true,
          class: 'text-center'
        }
      ],
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
    getServers,
    getCurrentrank,
    deleteServers,
    postServer,
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
    this.getCurrentrank()
  }
}
</script>
