<template>
<div class="flex justify-center px-4 bg-[#101014]">
  
    <div
      class="w-full max-w-screen-xl flex justify-center gap-8 xl:gap-12 flex-wrap"
    >
      <div
        class="flex justify-center items-center h-52 px-2 sm:px-10 bg-[#212121] rounded shadow-sm w-full sm:w-fit max-w-96"
        v-for="service in serviceOptions"
        :key="service.title"
      >
        <figure class="flex flex-col justify-center items-center">
          <n-icon size="40" color="#18A058" :component="service.icon" />
          <figcaption class="text-white font-bold text-center text-base md:text-lg mt-2 mb-0">
            {{ service.title }}
          </figcaption>
          <n-p class="text-[#727174] text-center mt-[6px]">{{ service.description }}</n-p>
        </figure>
      </div>
    </div>
</div>
</template>

<script setup>
import {
  GlobeOutline as InternetIcon,
  PhonePortraitOutline as PhoneIcon,
  DesktopOutline as DesktopIcon,
} from "@vicons/ionicons5";
import { NIcon, NP } from "naive-ui";
import { shallowRef } from "vue";

const serviceOptions = shallowRef([
  {
    title: "Web App Development",
    description: "I develop both backend and frontend web applications",
    icon: InternetIcon
  },
  {
    title: "Mobile App Development",
    description:
      "I develop both hybrid and native mobile application for android and ios",
    icon: PhoneIcon
  },
  {
    title: "Desktop App Development",
    description: "I develop desktop applications for windows in Java",
    icon: DesktopIcon
  },
]);
</script>
