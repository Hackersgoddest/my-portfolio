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
  background-color: rgba(128, 128, 128, 0.05);
  margin: 0;
  padding: 150px 0 80px;
}

@media only screen and (max-width: 500px) {
  .first-column{
    padding-top: 100px;
  }
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
text-align: center;
}
</style>
