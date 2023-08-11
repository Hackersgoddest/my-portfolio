<template>
  <div class="container mx-auto max-w-screen-xl px-5">
    <div class="relative flex items-start justify-start flex-col gap-3">
      <n-text
        class="shadow-2xl px-2 py-1 mb-1 sm:mb-2 outline-none rounded text-white text-sm"
      >
        <n-gradient-text type="success" class="font-mono font-semibold"
          >Software Developer</n-gradient-text
        >
      </n-text>
      <n-text class="text-white text-lg font-medium md:text-xl"
        >Frank Oppong Konadu</n-text
      >
      <n-text class="text-white text-sm md:text-base"
        >I am a passionate software developer with a year of experience
      </n-text>
      <span class="location__container">
        <div class="text-gray-400 flex items-baseline h-6 leading-7">
          <n-icon size="14" v-html="skillsSvgs.Home[0].svg"></n-icon>
          <span class="pl-1">Accra - Ghana | Remote</span>
        </div>
      </span>
      <n-space align="center" class="my-1">
        <n-button type="success" strong ghost round> My Porfolio </n-button>
        <n-button strong ghost round icon-placement="right" color="#fff">
          <template #icon>
            <n-icon size="14" v-html="skillsSvgs.Home[1].svg"></n-icon>
          </template>
          <a
            href="https://drive.google.com/file/d/1aVsyfJdYw4dNsF9rwsEVnGPV62DRS8Xo/view?usp=sharing"
            target="_blank"
          >
            My CV
          </a>
        </n-button>
      </n-space>
      <div class="flex order-5 mt-1">
        <n-text class="mr-3 text-4xl text-white leading-9 order-0">1+</n-text>
        <div class="flex flex-col justify-center">
          <n-text class="text-gray-400 text-xs">YEARS</n-text>
          <n-text class="text-gray-400 text-xs">EXPERIENCE</n-text>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { NText, NGradientText, NIcon, NButton, NSpace } from "naive-ui";
import skillsSvgs from "../../assets/svgs/svg";
</script>

<style scoped></style>
