import request from '@/utils/request'

// initial state
const state = {
  errors: '',
  my_datasets: []
}

// getters
const getters = {
}

// actions
const actions = {
  getMyDatasets ({ commit, state }) {
    request.get(`/api/dataset/datasets`, {
    })
      .then((response) => {
        const datasets = response.data
        console.log('get my datasets')
        commit('setMyDatasets', datasets)
      })
      .catch((errors) => {
        console.log('error', errors)
        commit('setMyDatasets', [])
        commit('setErrors', errors)
      })
  }
}

const mutations = {
  setErrors (state, errors) {
    state.errors = errors
  },
  setMyDatasets (state, datasets) {
    state.my_datasets = datasets
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
