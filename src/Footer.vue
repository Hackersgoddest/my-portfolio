<template>
  <n-grid class="bg-gray-400" cols="20 s:20 m:22 l:24 xl:24 2xl:24" responsive="screen">
    <n-gi class="first-span"></n-gi>
    <n-gi class="second-span"></n-gi>
    <n-gi class="is-end menu" :span="20">
      <div class="flex justify-end items-center h-16">
        <span class="text-sm sm:text-base mr-2 sm:mr-5 font-semibold text-teal-900">Oppong Frank Konadu</span>
        <span class="text-xs sm:text-sm font-medium flex items-center mr-1 sm:mr-5 text-teal-900"><span class="text-base sm:text-xl font-semibold">&copy;</span>2022. All Rights Reserved</span>
      </div>
    </n-gi>
    <n-gi class="first-span"></n-gi>
    <n-gi class="second-span"></n-gi>
  </n-grid>

</template>

<script setup>
import { NGi, NGrid } from 'naive-ui';
</script>