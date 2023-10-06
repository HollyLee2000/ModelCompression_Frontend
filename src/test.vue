<template>
  <div class="sidebar">
<el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
         text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
  <!-- 第一层 -->
  <template v-for="item in items">
    <!-- 如果第一层有子菜单，则继续循环 -->
    <template v-if="item.subs">
      <el-submenu :index="item.index" :key="item.index">
        <template slot="title">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.title }}</span>
        </template>
        <!-- 第二层 -->
        <template v-for="subItem in item.subs">
          <!-- 如果第二层有子菜单，则继续循环 -->
          <template v-if="subItem.subs">
            <el-submenu :index="subItem.index" :key="subItem.index">
              <template slot="title">
                <i :class="item.icon"></i>
                <span slot="title">{{ subItem.title }}</span>
              </template>
              <!-- <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">{{ threeItem.title }}</el-menu-item> -->
              <!-- 第三层 -->
              <template v-for="subItem2 in subItem.subs">
                <!-- 如果第三层有子菜单，则继续循环 -->
                <template v-if="subItem2.subs">
                  <el-submenu :index="subItem2.index" :key="subItem2.index">
                    <template slot="title">
                      <i :class="item.icon"></i>
                      <span slot="title">{{ subItem2.title }}</span>
                    </template>
                    <!-- <el-menu-item v-for="(fourItem,i) in subItem2.subs" :key="i" :index="fourItem.index">{{ fourItem.title }}</el-menu-item> -->
                    <!-- 第四层 -->
                    <template v-for="subItem3 in subItem2.subs">
                      <!-- 如果第四层有子菜单，则继续循环 -->
                      <template v-if="subItem3.subs">
                        <el-submenu :index="subItem3.index" :key="subItem3.index">
                          <template slot="title">
                            <!-- <i :class="item.icon"></i> -->
                            <!-- <span slot="title">{{ subItem2.title }}</span> -->
                            {{ subItem3.title }}
                          </template>
                          <el-menu-item v-for="(fiveItem,i) in subItem3.subs" :key="i" :index="fiveItem.index">{{ fiveItem.title }}</el-menu-item>
                        </el-submenu>
                      </template>
                      <!-- 如果第四层没有子菜单 -->
                      <el-menu-item v-else :index="subItem3.index" :key="subItem3.index">{{ subItem3.title }}</el-menu-item>
                    </template>
                  </el-submenu>
                </template>
                <!-- 如果第三层没有子菜单 -->
                <el-menu-item v-else :index="subItem2.index" :key="subItem2.index">{{ subItem2.title }}</el-menu-item>
              </template>
            </el-submenu>
          </template>
          <!-- 如果第二层没有子菜单 -->
          <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
        </template>
      </el-submenu>
    </template>
    <!-- 如果第一层没有子菜单 -->
    <template v-else>
      <el-menu-item :index="item.index" :key="item.index">
        <i :class="item.icon"></i>
        <span slot="title">{{ item.title }}</span>
      </el-menu-item>
    </template>
  </template>
</el-menu>
</div>
</template>

<script>
import bus from '../common/bus';
export default {
  data() {
    return {
      collapse: false,
      items: [{
        icon: 'el-icon-lx-home',
        index: 'dashboard',
        title: '系统首页'
      },
        {
          icon: 'el-icon-lx-cascades',
          index: 'table',
          title: '基础表格'
        },
        {
          icon: 'el-icon-lx-copy',
          index: 'tabs',
          title: 'tab选项卡'
        },
        {
          icon: 'el-icon-lx-calendar',
          index: '3',
          title: '表单相关',
          subs: [{
            index: 'form',
            title: '基本表单'
          },
            {
              index: '3-2',
              title: '三级菜单',
              subs: [{
                index: 'editor',
                title: '富文本编辑器'
              },
                {
                  index: 'markdown',
                  title: 'markdown编辑器'
                },
                {
                  index: '3-2-1',
                  title: '四级菜单',
                  subs: [{
                    index: 'music',
                    title: '网易云时间'
                  },
                    {
                      index:'math',
                      title:'数学时间'
                    },{
                      index: '3-2-1-1',
                      title: '五级菜单',
                      subs: [{
                        index:'english',
                        title:'英语时间'
                      }, {
                        index:'show',
                        title:'展示时间'
                      }]
                    }]
                }
              ]
            },
            {
              index: 'upload',
              title: '文件上传'
            }
          ]
        },
        {
          icon: 'el-icon-lx-emoji',
          index: 'icon',
          title: '自定义图标'
        },
        {
          icon: 'el-icon-pie-chart',
          index: 'charts',
          title: 'schart图表'
        },
        {
          icon: 'el-icon-rank',
          index: '6',
          title: '拖拽组件',
          subs: [{
            index: 'drag',
            title: '拖拽列表'
          },
            {
              index: 'dialog',
              title: '拖拽弹框'
            }
          ]
        },
        {
          icon: 'el-icon-lx-global',
          index: 'i18n',
          title: '国际化功能'
        },
        {
          icon: 'el-icon-lx-warn',
          index: '7',
          title: '错误处理',
          subs: [{
            index: 'permission',
            title: '权限测试'
          },
            {
              index: '404',
              title: '404页面'
            }
          ]
        },
        {
          icon: 'el-icon-lx-redpacket_fill',
          index: '/donate',
          title: '支持作者'
        }
      ]
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace('/', '');
    }
  },
  // created() {
  // // 通过 Event Bus 进行组件间通信，来折叠侧边栏,这里接收的是header.vue那边的数据collapse
  // bus.$on('collapse', msg => {
  // console.log("sidebar.vue",msg);
  // this.collapse = msg;
  // // 这里是向home.vue发送数据collapse-content
  // bus.$emit('collapse-content', msg);
  // });
  // }
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}

.sidebar::-webkit-scrollbar {
  width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}

.sidebar>ul {
  height: 100%;
}
</style>```