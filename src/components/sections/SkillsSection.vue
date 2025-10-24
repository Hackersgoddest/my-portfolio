<template>
  <section class="bg-[#101014]">
    <Header
      :title="title"
      :description="description"
      id="Skills"
    />
    
    <!-- Skills Content -->
    <div class="max-w-screen-xl mx-auto px-5">
      <n-tabs :animated="true" type="bar" size="large" trigger="hover" justify-content="center"
        :theme-overrides="customTabsTheme">
        <n-tab-pane name="frontend" tab="Frontend" class="text-center text-white">
          <DisplaySkill :skillName="skillsSvgs.frontEnd" />
        </n-tab-pane>
        <n-tab-pane name="backend" tab="Backend" class="text-center">
          <DisplaySkill :skillName="skillsSvgs.backEnd" />
        </n-tab-pane>
        <n-tab-pane name="fullstack" tab="Fullstack" class="text-center">
          <DisplaySkill :skillName="fullStackSkills" />
        </n-tab-pane>
      </n-tabs>
    </div>
  </section>
</template>

<script setup>
import { shallowRef } from "vue";
import { NTabs, NTabPane } from "naive-ui";
import Header from "../Header.vue";
import DisplaySkill from "../DisplaySkill.vue";
import skillsSvgs from "../../assets/svgs/svg";

const title = shallowRef("SKILLS");
const description = shallowRef("The Stack I Work With");

const customTabsTheme = {
  tabTextColorBar: '#ffffff', // Default tab text color for bar type (inactive)
  tabTextColorActiveBar: '#18A058', // Active tab text color for bar type
  tabTextColorHoverBar: '#ffffff', // Tab text color on hover for bar type
  barColor: '#18A058', // Color of the active bar indicator
};

// Combine frontend and backend skills for fullstack, removing duplicates
const fullStackSkills = [...skillsSvgs.frontEnd, ...skillsSvgs.backEnd].reduce(
  (accumulator, currentValue) => {
    if (!accumulator.some((obj) => obj.name === currentValue.name)) {
      accumulator.push(currentValue);
    }
    return accumulator;
  },
  []
);
</script>

<style scoped>
</style>
