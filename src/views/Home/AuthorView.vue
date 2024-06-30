<template>
  <div class="container mx-auto w-full max-w-screen-xl px-5">
    <div class="relative flex items-start justify-start flex-col gap-3">
      <n-tag round :bordered="false" strong>
        Software Developer
        <template #icon>
          <n-icon :component="Code" />
        </template>
      </n-tag>
      <n-text class="text-white text-lg font-medium md:text-xl">Frank Oppong Konadu</n-text>
      <n-text class="text-white text-sm md:text-base">I am a passionate software developer with
        {{ new Date().getFullYear() - 2022 }} years of experience
      </n-text>
      <span class="location__container">
        <div class="text-gray-400 flex items-baseline h-6 leading-7">
          <n-icon size="14" v-html="skillsSvgs.Home[0].svg"></n-icon>
          <span class="pl-1">Accra - Ghana | Remote</span>
        </div>
      </span>
      <n-space align="center" class="my-1">
        <n-button ghost round class="text-white" @click.passive="$emit('scrollToSection')">
          My Porfolio
        </n-button>
        <a href="https://drive.google.com/file/d/1vokKezr3mUj57Cze3UFYRU3keZvanRA7/view?usp=sharing" target="_blank">
          <n-button round ghost icon-placement="right" class="text-white">
            <template #icon>
              <n-icon size="14" v-html="skillsSvgs.Home[1].svg"></n-icon>
            </template>
            My CV
          </n-button>
        </a>
      </n-space>
      <div class="flex order-5 mt-1">
        <n-text class="mr-3 text-4xl text-white leading-9 order-0">{{ new Date().getFullYear() - 2022 }}+</n-text>
        <div class="flex flex-col justify-center">
          <n-text class="text-gray-400 text-xs">YEARS</n-text>
          <n-text class="text-gray-400 text-xs">EXPERIENCE</n-text>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { NText, NIcon, NButton, NSpace, NTag } from "naive-ui";
import skillsSvgs from "../../assets/svgs/svg";
import { Code } from "@vicons/ionicons5"
</script>

<style scoped></style>
