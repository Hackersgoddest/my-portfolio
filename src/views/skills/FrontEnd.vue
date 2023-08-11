<template>
  <n-space justify="center" size="large" align="baseline">
    <figure
      class="flex flex-col justify-center items-center"
      v-for="item in skillsSvgs.frontEnd"
      :key="item.name"
    >
      <n-text class="text-white">{{ item.name }}</n-text>
      <n-icon size="40" v-html="item.svg"></n-icon>
    </figure>
  </n-space>
</template>

<script setup>
import skillsSvgs from "../../assets/svgs/svg";
import { NIcon, NSpace, NText } from "naive-ui";
</script>

<style scoped></style>
