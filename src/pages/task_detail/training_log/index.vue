<!--  Copyright 2020 Zhejiang Lab. All Rights Reserved.
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
-->

<template>
  <div style="height: 500px; overflow-y: scroll; background: #f8f9fa; padding: 10px;">
    <div v-for="(item,index) in log_data" :key="index">
      <p style="marginTop: -12px">
        {{item}}
        <!--[-->
        <!--<span class="text-info" v-if="item[1]==0">INFO</span>-->
        <!--<span class="text-warning" v-if="item[1]==1">WARNING</span>-->
        <!--<span class="text-danger" v-if="item[1]==2">ERROR</span>-->
        <!--]-->
        <!--[-->
        <!--<span class="text-secondary">{{item[0]}}</span>-->
        <!--]-->
        <!--<span class="text-secondary">{{item[2]}}</span>-->
      </p>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {closeDialog} from '@/store/utils'

export default {
  name: 'TraingLog',
  computed: mapState('task_detail', {
    log_data: (state) => state.log_data
  })
}
</script>
