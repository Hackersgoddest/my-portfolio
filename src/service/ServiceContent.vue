<template>
  <div class="mx-auto max-w-screen-xl container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 md:px-5">
    <div class="flex justify-start items-center h-52 px-2 sm:px-10 bg-gray-800 rounded">
      <figure class="flex flex-col items-center md:items-start">
        <internet-icon class="w-9 text-white mb-4 md:mb-0" />
        <figcaption class="text-white font-bold text-lg md:text-xl">Web App Development</figcaption>
        <p class="text-white text-center md:text-start">I develop both backend and frontend web applications</p>
      </figure>
    </div>
    <div class="flex justify-start items-center h-52 px-2 sm:px-10 bg-gray-800 rounded">
      <figure class="flex flex-col items-center md:items-start">
        <phone-icon class="w-9 text-white mb-4 md:mb-0" />
        <figcaption class="text-white font-bold text-lg md:text-xl">Mobile App Development</figcaption>
        <p class="text-white text-center md:text-start">I develop both both hybrid and native mobile application for
          android and ios</p>
      </figure>
    </div>
    <div class="flex justify-start items-center h-52 px-2 sm:px-10 bg-gray-800 rounded">
      <figure class="flex flex-col items-center md:items-start">
        <desktop-icon class="w-9 text-white mb-4 md:mb-0" />
        <figcaption class="text-white font-bold text-lg md:text-xl">Desktop App Development</figcaption>
        <p class="text-white text-center md:text-start">I develop desktop applications for windows in Java</p>
      </figure>
    </div>
  </div>
</template>

<script setup>
import {
  GlobeOutline as InternetIcon,
  PhonePortraitOutline as PhoneIcon,
  DesktopOutline as DesktopIcon
} from "@vicons/ionicons5";
import { NGrid, NGi } from "naive-ui";
</script>