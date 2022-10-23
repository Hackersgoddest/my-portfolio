<template>
  <div class="first-column">
    <n-button strong quaternary="" type="success" size="large">
      SKILLS
    </n-button>
    <p class="bold">The Stack I Work With</p>
    <n-grid :cols="24">
      <n-gi :span="2"></n-gi>
      <n-gi :span="20">
        <n-tabs type="bar" size="large" trigger="hover" justify-content="center">
          <n-tab-pane name="frontend" tab="Frontend" class="center-content">
            <FrontEnd />
          </n-tab-pane>
          <n-tab-pane name="backend" tab="Backend" class="center-content">
            <BackEnd />
          </n-tab-pane>
          <n-tab-pane name="fullstack" tab="Fullstack" class="center-content">
            <FullStack />
          </n-tab-pane>
        </n-tabs>
      </n-gi>
      <n-gi :span="2"></n-gi>
    </n-grid>

  </div>
</template>
<script setup>
import { NButton, NTabs, NTabPane, NGrid, NGi } from "naive-ui";
import FrontEnd from "./FrontEnd.vue";
import BackEnd from "./BackEnd.vue";
import FullStack from "./FullStack.vue";

</script>
<style scoped>
.first-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgb(255, 255, 255);
  margin: 100px 0 0;
  padding-top: 50px;
}

.n-button:hover {
  cursor: context-menu;
}

.bold {
  font-size: 25px;
  margin-top: 0;
}

.center-content {
  text-align: center;
}
</style>
