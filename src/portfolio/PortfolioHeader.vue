<template>
<div class="first-column">
  <n-button strong quaternary="" type="success" size="large">
      PORTFOLIO
    </n-button>
<p class="bold">My Latest Projects</p>
<p class="small">These are the some of my lastest projects.</p>
</div>
</template>
<script setup>
import { NButton } from "naive-ui";

</script>
<style scoped>
.first-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgb(255, 255, 255);
  margin: 0 0 80px;
}

.n-button:hover {
  cursor: context-menu;
}
.bold {
  font-size: 25px;
  margin: 0;
}

.small {
font-size: 16px;
color: #434446;
}
</style>
