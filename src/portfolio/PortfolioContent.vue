<template>
  <n-grid cols="20 s:20 m:22 l:24 xl:24 2xl:24" responsive="screen">
  <n-gi class="first-span"></n-gi>
  <n-gi class="second-span"></n-gi>
  <n-gi :span="20">
    <div class="main-container">
      <div class="notification">
       
      </div>
      <div class="notification">
        
      </div>
      <div class="notification">
        
      </div>
    </div>
  </n-gi>
  <n-gi class="first-span"></n-gi>
  <n-gi class="second-span"></n-gi>
</n-grid>


</template>

<script setup>

import { NGrid, NGi } from "naive-ui";
</script>

<style scoped>

.n-grid {
  background-color: rgba(128, 128, 128, 0.05);
}
.main-container {
display: flex;
flex-wrap: wrap;
justify-content: space-evenly;
}

.notification {
background-color: #dee0e2;
border-radius: 5px;
width: 350px;
height: 200px;
display: flex;
flex-direction: column;
justify-content: space-evenly;
margin-bottom: 20px;
}


@media only screen and (max-width: 700px) {
  .notification {
    width: 300px;
    height: 230px;
  }
}

</style>