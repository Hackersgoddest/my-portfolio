<template>
  <div
    class="bg-[#101014] mx-auto max-w-screen-xl container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-10 lg:px-5"
  >
    <div
      class="flex justify-center items-center h-52 px-2 sm:px-10 bg-gradient-to-r from-[#0d0d0e] to-[#0f0f14] rounded shadow-2xl brightness-200"
      v-for="service in portfolioOptions"
      :key="service.title"
    >
      <figure class="flex flex-col justify-center items-center">
        <n-icon size="40" color="#57e9b1" :component="service.icon" />
        <figcaption class="text-white font-bold text-center text-base md:text-lg mt-2 mb-0">
          {{ service.title }}
        </figcaption>
        <n-p class="text-gray-300 text-center mt-[6px]">{{ service.description }}</n-p>
      </figure>
    </div>
  </div>
</template>

<script setup>
import {
  BuildOutline as BuildIcon
} from "@vicons/ionicons5";
import { NIcon, NP } from "naive-ui";
import { shallowRef } from "vue";

const portfolioOptions = shallowRef([
  {
    title: "Project 1",
    description: "",
    icon: BuildIcon
  },
  {
    title: "Project 2",
    description:
      "",
    icon: BuildIcon
  },
  {
    title: "Project 3",
    description: "",
    icon: BuildIcon
  },
]);
</script>
