<template>
<div class="first-column">
  <n-button strong quaternary="" type="success" size="large">
      SERVICES
    </n-button>
<p class="bold">What i Offer</p>
<p class="small">I develop web and mobile apps for all platform</p>
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
  background: rgb(240, 240, 240, 0.4);
  margin: 0;
  padding: 150px 0 80px;
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
