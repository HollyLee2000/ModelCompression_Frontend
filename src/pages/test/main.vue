<template>
  <ChildVue ref="childRef" />
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
import ChildVue from "./child.vue";

const childRef = ref();
console.log(childRef.value); // undefined

onMounted(() => {
  console.log(childRef.value); // Proxy {…}
  // 调用子组件方法
  childRef.value.foo(); // foo
});
</script>

<style>
</style>