<template>
  <n-grid
    class="max-w-screen-xl mx-auto px-5"
    cols="1 s:2 m:3"
    responsive="screen"
    :x-gap="32"
    :y-gap="32"
    :item-responsive="true"
  >
    <n-grid-item v-for="service in serviceOptions" :key="service.title">
      <div
        class="flex justify-center items-center h-52 px-2 sm:px-10 bg-[#212121] rounded shadow-sm w-full"
      >
        <figure class="flex flex-col justify-center items-center">
          <n-icon size="40" color="#18A058" :component="service.icon" />
          <figcaption
            class="text-white font-bold text-center text-base md:text-lg mt-2 mb-0"
          >
            {{ service.title }}
          </figcaption>
          <n-p class="text-[#727174] text-center mt-[6px]">{{
            service.description
          }}</n-p>
        </figure>
      </div>
    </n-grid-item>
  </n-grid>
</template>

<script setup>
import {
  GlobeOutline as InternetIcon,
  PhonePortraitOutline as PhoneIcon,
  DesktopOutline as DesktopIcon,
} from "@vicons/ionicons5";
import { NIcon, NP, NGrid, NGridItem } from "naive-ui";
import { shallowRef } from "vue";

const serviceOptions = shallowRef([
  {
    title: "Web App Development",
    description: "I develop both backend and frontend web applications",
    icon: InternetIcon,
  },
  {
    title: "Mobile App Development",
    description:
      "I develop both hybrid and native mobile application for android and ios",
    icon: PhoneIcon,
  },
  {
    title: "Desktop App Development",
    description: "I develop desktop applications for windows in C#",
    icon: DesktopIcon,
  },
]);
</script>
