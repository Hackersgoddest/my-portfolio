<template>
  <n-grid :cols="24">
    <n-gi :span="2"></n-gi>
    <n-gi :span="20">
      <div class="main-container">
        <div class="notification">
          <figure>
            <internet-icon />
            <figcaption>Web App Development</figcaption>
            <p>I develop both backend and frontend web applications</p>
          </figure>
        </div>
        <div class="notification">
          <figure>
            <phone-icon />
            <figcaption>Mobile App Development</figcaption>
            <p>I develop both both hybrid and native mobile application for android and ios</p>
          </figure>
        </div>
        <div class="notification">
          <figure>
            <desktop-icon />
            <figcaption>Desktop App Development</figcaption>
            <p>I develop desktop applications for windows in Java</p>
          </figure>
        </div>
      </div>
    </n-gi>
    <n-gi :span="2"></n-gi>
  </n-grid>


</template>

<script setup>
import {
  GlobeOutline as InternetIcon,
  PhonePortraitOutline as PhoneIcon,
  DesktopOutline as DesktopIcon
} from "@vicons/ionicons5";
import { NGrid, NGi } from "naive-ui";
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