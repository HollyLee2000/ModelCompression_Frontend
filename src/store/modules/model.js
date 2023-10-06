import request from '@/utils/request'

// initial state
const state = {
  errors: '',
  my_models: []
}

// getters
const getters = {
}

// actions
const actions = {
  getMyModels ({ commit, state }) {
    request.get(`/api/model/models`, {
    })
      .then((response) => {
        const models = response.data
        console.log('get my models')
        commit('setMyModels', models)
      })
      .catch((errors) => {
        console.log('error', errors)
        commit('setMyModels', [])
        commit('setErrors', errors)
      })
  }
}

const mutations = {
  setErrors (state, errors) {
    state.errors = errors
  },
  setMyModels (state, models) {
    state.my_models = models
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
