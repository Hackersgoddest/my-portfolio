<template>
    <n-grid cols="20 s:20 m:22 l:24 xl:24 2xl:24" responsive="screen">
    <n-gi class="first-span"></n-gi>
    <n-gi class="second-span"></n-gi>
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
    <n-gi class="first-span"></n-gi>
    <n-gi class="second-span"></n-gi>
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

.n-grid {
  background: rgb(240, 240, 240, 0.4);
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

figure svg {
  width: 40px;
}

@media only screen and (max-width: 700px) {
  .notification {
    width: 300px;
    height: 230px;
  }

  figure svg {
    width: 35px;
    height: 30px;
  }
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