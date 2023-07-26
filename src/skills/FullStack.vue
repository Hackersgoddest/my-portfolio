<template>
  <n-space justify="center" size="large" align="baseline">
    <figure class="flex flex-col justify-center items-center" v-for="item in fullStackSkills" :key="item.name">
      <n-text class="text-white">{{ item.name }}</n-text>
      <n-icon size="40" v-html="item.svg"></n-icon>
    </figure>
  </n-space>
</template>

<script setup>
import skillsSvgs  from '../svg.js'
import { NIcon, NSpace, NText } from 'naive-ui';

const fullStackSkills = [...skillsSvgs.frontEnd, ...skillsSvgs.backEnd].reduce((accumulator, currentValue) => {
  if (!accumulator.some(obj => obj.name === currentValue.name)) {
    accumulator.push(currentValue);
  }
  return accumulator;
}, []);
</script>

<style scoped>
</style>