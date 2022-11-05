<template>
<div class="first-column">
  <n-button strong quaternary="" type="success" size="large">
      CONTACT
    </n-button>
<p class="bold">CHECK ME OUT</p>
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
  padding: 100px 0 50px;
}

.n-button:hover {
  cursor: context-menu;
}
.bold {
  font-size: 25px;
  margin: 0;
}

</style>
