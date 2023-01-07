<template>
  <div class="mx-auto max-w-screen-xl container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-10 lg:px-5">
    <div class="flex justify-center items-center h-52 px-2 sm:px-10 shadow-2xl bg-gradient-to-r from-white to-sky-500 rounded">
      <figure class="flex flex-col justify-center items-center">
        <internet-icon class="w-9 text-white mb-4 md:mb-0" />
        <figcaption class="text-gray-800 font-semibold text-center text-lg md:text-xl">Web App Development</figcaption>
        <p class="text-gray-700 text-center">I develop both backend and frontend web applications</p>
      </figure>
    </div>
    <div class="flex justify-center items-center h-52 px-2 sm:px-10 shadow-2xl bg-gradient-to-r from-indigo-500 to-white rounded">
      <figure class="flex flex-col justify-center items-center">
        <phone-icon class="w-9 text-white mb-4 md:mb-0" />
        <figcaption class="text-gray-800 font-semibold text-center text-lg md:text-xl">Mobile App Development</figcaption>
        <p class="text-gray-700 text-center">I develop both both hybrid and native mobile application for
          android and ios</p>
      </figure>
    </div>
    <div class="flex justify-center items-center h-52 px-2 sm:px-10 shadow-2xl bg-gradient-to-r from-white to-blue-500 rounded">
      <figure class="flex flex-col justify-center items-center">
        <desktop-icon class="w-9 text-white mb-4 md:mb-0" />
        <figcaption class="text-gray-800 font-semibold text-center text-lg md:text-xl">Desktop App Development</figcaption>
        <p class="text-gray-700 text-center">I develop desktop applications for windows in Java</p>
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