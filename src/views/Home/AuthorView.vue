<template>
  <div class="container mx-auto max-w-screen-xl px-5">
    <div class="relative flex items-start justify-start flex-col gap-3">
      <n-button
        color="#fff"
        dashed
        size="small"
        ghost
        class="shadow-sm px-2 py-1 mb-1 hover:cursor-auto font-mono"
      >
        Software Developer
      </n-button>
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
        <n-button
          ghost
          round
          class="text-white"
          @click.passive="$emit('scrollToSection')"
        >
          My Porfolio
        </n-button>
        <n-button
          round
          ghost
          icon-placement="right"
          class="text-white"
        >
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
