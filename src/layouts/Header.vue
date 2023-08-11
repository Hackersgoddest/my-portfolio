<template>
  <div
    class="flex flex-col justify-center items-center bg-[#101014] pt-20 pb-20"
  >
    <n-h4 class="text-green-300 mb-1"> {{ title }} </n-h4>
    <n-p class="text-xl font-normal mb-1 text-white">{{ description }}</n-p>
  </div>
</template>
<script setup>
import { NP, NH4 } from "naive-ui";
defineProps({
  title: String,
  description: String,
});
</script>
