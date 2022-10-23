<template>
  <n-grid :cols="24">
    <n-gi :span="2"></n-gi>
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
    <n-gi :span="2"></n-gi>
  </n-grid>


</template>

<script setup>

</script>

<style scoped>
.main-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.notification {
  background-color: #dee0e2;
  border-radius: 5px;
  width: 400px;
  height: 200px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: space-evenly;
  margin-bottom: 20px;
  /* padding: 10px; */
}

figure svg {
  width: 40px;
}

figcaption {
  font-size: 20px;
  font-weight: 700;
  color: rgb(136, 131, 131);
}

p {
  font-size: 16px;
}
</style>