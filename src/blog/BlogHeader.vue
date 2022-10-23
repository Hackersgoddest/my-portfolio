<template>
<div class="first-column">
  <n-button strong quaternary="" type="success" size="large">
      BLOGS
    </n-button>
<p class="bold">My Latest Blogs</p>
<p class="small">I have begun my journey as blog writing.</p>
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
  margin: 50px 0 80px;
  padding-top: 50px;
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
