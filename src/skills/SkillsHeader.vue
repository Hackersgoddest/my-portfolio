<template>
  <div class="flex flex-col justify-center items-center bg-gray-100 pt-40 pb-12 sm:pb-20">
    <button class="cursor-auto hover:bg-none text-base p-2 text-green-700 font-semibold">
      SKILLS
    </button>
    <p class="text-2xl font-normal text-center">The Stack I Work With</p>
    <div class="container mx-auto mt-1">
        <n-tabs type="bar" size="large" trigger="hover" justify-content="center">
          <n-tab-pane name="frontend" tab="Frontend" class="text-center">
            <FrontEnd />
          </n-tab-pane>
          <n-tab-pane name="backend" tab="Backend" class="text-center">
            <BackEnd />
          </n-tab-pane>
          <n-tab-pane name="fullstack" tab="Fullstack" class="text-center">
            <FullStack />
          </n-tab-pane>
        </n-tabs>
    </div>

  </div>
</template>
<script setup>
import { NTabs, NTabPane } from "naive-ui";
import FrontEnd from "./FrontEnd.vue";
import BackEnd from "./BackEnd.vue";
import FullStack from "./FullStack.vue";

</script>
