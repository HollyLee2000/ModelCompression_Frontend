/** Copyright 2020 Zhejiang Lab. All Rights Reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================
*/

import request from '@/utils/request'

// initial state
const state = {
  errors: '',
  metric_names: [],
  graphs: {}
}

// getters
const getters = {
}

// actions
const actions = {
  getMetricNames ({ dispatch, commit, state }) {
    request.get(`/api/visualization/metric_names`, {
    })
      .then((response) => {
        console.log('get metric_names success')
        const metric_names = response.data
        console.log(response.data)
        commit('setMetricNames', metric_names)
      })
      .catch((errors) => {
        console.log('error', errors)
        commit('setMetricNames', [])
        commit('setErrors', errors)
      })
  },
  getGraphs ({ commit, state }, metric_names) {
    console.log('get graph', metric_names)
    request.get(`/api/visualization/graph`, {
      params: {
        metric_names: metric_names
      }
    })
      .then((response) => {
        console.log('get graph success')
        console.log(response.data)
        commit('setGraphs', response.data.data)
      })
      .catch((errors) => {
        console.log('error', errors)
        commit('setGraphs', {})
        commit('setErrors', errors)
      })
  }
}

const mutations = {
  setErrors (state, errors) {
    state.errors = errors
  },
  setGraphs (state, graphs) {
    state.graphs = graphs
  },
  setMetricNames (state, metric_names) {
    state.metric_names = metric_names
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
