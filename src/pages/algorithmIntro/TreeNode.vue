<template>
  <div class="tree-node">
    <el-button v-on:click="showId">{{label}}<br>{{label_cn}}</el-button>
    <div v-if="open" class="tree-children">
      <TreeNode
          v-for="(child,index) in children"
          v-bind:key="child.id"
          v-bind:label="child.label"
          v-bind:label_cn="child.label_cn"
          v-bind:level="level+1"
          v-bind:id="child.id"
          v-bind:children="child.children"
          v-bind:last-child="index===children.length-1"
      ></TreeNode>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { ElMessageBox } from "element-plus";

export default {
  name: "TreeNode",
  props: {
    level: Number,
    id: Number,
    label: String,
    label_cn: String,
    children: Array,
    lastChild: Boolean,
  },
  setup(props) {
    const state = reactive({
      open: true,
    });

    function showId() {
      ElMessageBox.alert(`节点${props.id}被点击了`);
    }
    return {
      ...state,
      showId,
    };
  },
};
</script>

<style scoped>
.tree-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px;
  position: relative; /* 新增的样式 */
}

.tree-node::after {
  content: ""; /* 新增的样式 */
  display: block; /* 新增的样式 */
  position: absolute; /* 新增的样式 */
  top: 100%; /* 新增的样式 */
  left: 50%; /* 新增的样式 */
  width: 1px; /* 新增的样式 */
  height: calc(100% - 14px); /* 新增的样式 */
  background: #333; /* 新增的样式 */
  transform: translateX(-50%); /* 新增的样式 */
  z-index: -1; /* 新增的样式 */
}

.tree-node:last-child::after {
  display: none; /* 新增的样式 */
}

.tree-children {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 10px;
  position: relative; /* 新增的样式 */
  padding-left: 30px; /* 新增的样式 */
}

.tree-children::before {
  content: ""; /* 新增的样式 */
  display: block; /* 新增的样式 */
  position: absolute; /* 新增的样式 */
  top: 0; /* 新增的样式 */
  left: -15px; /* 新增的样式 */
  width: 1px; /* 新增的样式 */
  height: calc(100% + 14px); /* 新增的样式 */
  background: #333; /* 新增的样式 */
}
</style>
