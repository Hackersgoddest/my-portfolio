<template>
  <n-grid class="bg-gray-100 sm:pb-0" cols="20 s:20 m:22 l:24 xl:24 2xl:24" responsive="screen">
  <n-gi class="hidden md:block"></n-gi>
  <n-gi class="hidden lg:block"></n-gi>
  <n-gi :span="20">
    <div class="flex justify-evenly flex-wrap gap-8">
      <div class="w-72 sm:w-80 flex justify-start items-center h-52 pl-10 bg-gray-800 rounded">
        
      </div>
      <div class="w-72 sm:w-80 flex justify-start items-center h-52 pl-10 bg-gray-800 rounded">
       
      </div>
      <div class="w-72 sm:w-80 flex justify-start items-center h-52 pl-10 bg-gray-800 rounded">
       
      </div>
    </div>
  </n-gi>
  <n-gi class="hidden md:block"></n-gi>
  <n-gi class="hidden lg:block"></n-gi>
</n-grid>

</template>

<script setup>
import { NGrid, NGi } from "naive-ui";
</script>
