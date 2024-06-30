<template>
  <div class="flex justify-center bg-[#101014]">
    <div
      class="w-full max-w-screen-lg container flex justify-center items-center pb-12 sm:pb-20"
    >
      <div class="container mx-auto mt-1">
        <n-tabs
          :animated="true"
          type="bar"
          size="large"
          trigger="hover"
          justify-content="center"
          :tab-style="`color: #79787b`"
        >
          <n-tab-pane
            name="frontend"
            tab="Frontend"
            class="text-center text-white"
          >
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
  </div>
</template>
<script setup>
import { NTabs, NTabPane } from "naive-ui";
import FrontEnd from "./FrontEnd.vue";
import BackEnd from "./BackEnd.vue";
import FullStack from "./FullStack.vue";
</script>
