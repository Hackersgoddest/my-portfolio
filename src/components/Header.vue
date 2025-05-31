<template>
  <div class="max-w-screen-xl mx-auto flex flex-col items-center pb-10 px-5">
    <n-h4 class="text-[#18A058] mb-1"> {{ title }} </n-h4>
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
