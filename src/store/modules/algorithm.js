import request from '@/utils/request'

// initial state
const state = {
  errors: '',
  my_algorithms: []
}

// getters
const getters = {
}

// actions
const actions = {
  getMyAlgorithms ({ commit, state }) {
    request.get(`/api/algorithm/algorithms`, {
    })
      .then((response) => {
        const algorithms = response.data
        console.log('get my algorithms')
        commit('setMyAlgorithms', algorithms)
      })
      .catch((errors) => {
        console.log('error', errors)
        commit('setMyAlgorithms', [])
        commit('setErrors', errors)
      })
  }
}

const mutations = {
  setErrors (state, errors) {
    state.errors = errors
  },
  setMyAlgorithms (state, algorithms) {
    state.my_algorithms = algorithms
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
