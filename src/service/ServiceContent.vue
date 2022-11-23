<template>
    <n-grid class="bg-gray-100" cols="20 s:20 m:22 l:24 xl:24 2xl:24" responsive="screen">
    <n-gi class="hidden md:block"></n-gi>
    <n-gi class="hidden lg:block"></n-gi>
    <n-gi :span="20">
      <div class="flex justify-evenly flex-wrap gap-8">
        <div class="w-72 sm:w-80 lg:min-w-[30%] flex justify-start items-center h-52 px-2 sm:px-10 bg-gray-800 rounded">
          <figure class="flex flex-col items-center md:items-start">
            <internet-icon class="w-9 text-white mb-4 md:mb-0" />
            <figcaption class="text-white font-bold text-lg md:text-xl">Web App Development</figcaption>
            <p class="text-white text-center md:text-start">I develop both backend and frontend web applications</p>
          </figure>
        </div>
        <div class="w-72 sm:w-80 lg:min-w-[30%] flex justify-start items-center h-52 px-2 sm:px-10 bg-gray-800 rounded">
          <figure class="flex flex-col items-center md:items-start">
            <phone-icon class="w-9 text-white mb-4 md:mb-0"  />
            <figcaption class="text-white font-bold text-lg md:text-xl">Mobile App Development</figcaption>
            <p class="text-white text-center md:text-start">I develop both both hybrid and native mobile application for android and ios</p>
          </figure>
        </div>
        <div class="w-72 sm:w-80 lg:min-w-[30%] flex justify-start items-center h-52 px-2 sm:px-10 bg-gray-800 rounded">
          <figure class="flex flex-col items-center md:items-start">
            <desktop-icon class="w-9 text-white mb-4 md:mb-0" />
            <figcaption class="text-white font-bold text-lg md:text-xl">Desktop App Development</figcaption>
            <p class="text-white text-center md:text-start">I develop desktop applications for windows in Java</p>
          </figure>
        </div>
      </div>
    </n-gi>
    <n-gi class="hidden md:block"></n-gi>
    <n-gi class="hidden lg:block "></n-gi>
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