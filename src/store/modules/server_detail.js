import request from '@/utils/request'
import {parseTime, convertArray2String} from '@/utils/index'
import {setIsDialogOpen, setDialogContent} from '@/store/utils'

// initial state
const state = {
  server_details: {
    username: '',
    last_login: '',
    worker_info: {
      driver_version: '',
      cuda_version: '',
      worker_infos: []
    }
  }
}

// getters
const getters = {}

// actions
const actions = {
  getServerDetails: function ({commit, state}, server_id) {
    console.log('get server details', server_id)
    request.get(`/api/admin/server_details`, {
      params: {
        server_id: server_id
      }
    })
      .then((response) => {
        let server_details = response.data
        server_details.last_login = parseTime(server_details.last_login)
        console.log(server_details)
        commit('setServerDetails', server_details)
      }).catch((errors) => {
        console.log('error', errors)
        commit('setServerDetails', {})
      })
  }
}

const mutations = {
  setServerDetails (state, server_details) {
    state.server_details = server_details
  },
  setIsDialogOpen,
  setDialogContent
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
