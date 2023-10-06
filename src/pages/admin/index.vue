<template>
<!--  <el-container>-->
<!--    <el-col :span="24">-->
<!--      <el-menu class="el-menu-demo" mode="horizontal" router>-->
<!--        <el-menu-item index="ManageServer">算力机管理</el-menu-item>-->
<!--      </el-menu>-->
<!--      <div class="pt-4">-->
<!--        <router-view></router-view>-->
<!--      </div>-->
<!--    </el-col>-->
<!--  </el-container>-->
  <b-container>
    <b-col>
<!--      <b-nav tabs>-->
<!--        <b-nav-item active-class="active" :to="{name: 'ManageServer'}">算力机管理</b-nav-item>-->
<!--      </b-nav>-->
      <div class="pt-4">
        <router-view></router-view>
      </div>
      <!-- </div> -->
    </b-col>
  </b-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Admin',
  computed: {
    ...mapState({
      is_staff: (state) => state.auth.is_staff
    })
  }
}
</script>
