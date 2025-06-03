<template>
  <div class="max-w-screen-xl mx-auto px-5">
    <n-tabs :animated="true" type="bar" size="large" trigger="hover" justify-content="center"
      :theme-overrides="customTabsTheme">
      <n-tab-pane name="frontend" tab="Frontend" class="text-center text-white">
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
</template>
<script setup>
import { NTabs, NTabPane } from "naive-ui";
import FrontEnd from "./FrontEnd.vue";
import BackEnd from "./BackEnd.vue";
import FullStack from "./FullStack.vue";

const customTabsTheme = {
  tabTextColorBar: '#ffffff', // Default tab text color for bar type (inactive)
  tabTextColorActiveBar: '#18A058', // Active tab text color for bar type
  tabTextColorHoverBar: '#ffffff', // Tab text color on hover for bar type
  barColor: '#18A058', // Color of the active bar indicator
};
</script>
