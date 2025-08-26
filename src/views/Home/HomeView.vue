<template>
  <div class="relative">
    <div
      class="absolute bg-black bg-opacity-50 inset-0 z-10 w-full h-[90vh] xs:h-[80vh] sm:h-screen flex items-center"
    >
      <div class="w-full mx-auto max-w-screen-xl px-5">
        <div
          class="w-full relative flex items-start justify-start flex-col gap-3"
        >
          <n-tag round :bordered="false" strong>
            Software Developer
            <template #icon>
              <n-icon :component="Code" />
            </template>
          </n-tag>
          <n-text class="text-white text-lg font-medium md:text-xl"
            >Frank Oppong Konadu</n-text
          >
          <n-text class="text-white text-sm md:text-base"
            >I am a passionate software developer with
            {{ new Date().getFullYear() - 2022 }} years of experience
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
              @click.passive="$emit('scrollToSection', 'portfolio')"
            >
              My Porfolio
            </n-button>
            <a
              href="https://drive.google.com/file/d/1tBSfx_AfZZuRClB5g4H_SD2xrE70lqlr/view?usp=sharing"
              target="_blank"
            >
              <n-button round ghost icon-placement="right" class="text-white">
                <template #icon>
                  <n-icon size="14" v-html="skillsSvgs.Home[1].svg"></n-icon>
                </template>
                My CV
              </n-button>
            </a>
          </n-space>
          <div class="flex order-5 mt-1">
            <n-text class="mr-3 text-4xl text-white leading-9 order-0"
              >{{ new Date().getFullYear() - 2022 }}+</n-text
            >
            <div class="flex flex-col justify-center">
              <n-text class="text-gray-400 text-xs">YEARS</n-text>
              <n-text class="text-gray-400 text-xs">EXPERIENCE</n-text>
            </div>
          </div>
        </div>
      </div>
    </div>
    <n-carousel show-arrow autoplay>
      <img
        v-for="(image, index) in images"
        key="index"
        :class="image.class"
        :src="image.src"
      />
      <template #arrow="{ prev, next }">
        <div class="custom-arrow z-20">
          <button
            type="button"
            class="custom-arrow--btn hover:bg-[#00000080]"
            @click="prev"
          >
            <n-icon>
              <ArrowBack />
            </n-icon>
          </button>
          <button
            type="button"
            class="custom-arrow--btn hover:bg-[#00000080]"
            @click="next"
          >
            <n-icon>
              <ArrowForward />
            </n-icon>
          </button>
        </div>
      </template>
      <template #dots="{ total, currentIndex, to }">
        <ul class="custom-dots z-20">
          <li
            v-for="index of total"
            :key="index"
            class="custom-dots--li"
            :class="{ ['is-active']: currentIndex === index - 1 }"
            @click="to(index - 1)"
          />
        </ul>
      </template>
    </n-carousel>
  </div>
</template>

<script setup>
import { ArrowBack, ArrowForward } from "@vicons/ionicons5";
import { NCarousel, NText, NIcon, NButton, NSpace, NTag } from "naive-ui";
import skillsSvgs from "../../assets/svgs/svg";
import { Code } from "@vicons/ionicons5"

const images = [
  {src: "https://res.cloudinary.com/dfm07q3n0/image/upload/v1734487611/frank_one_ei67ny.jpg", class: "h-[90vh] xs:h-[80vh] sm:h-screen w-full object-cover"},
  {src: "https://res.cloudinary.com/dfm07q3n0/image/upload/v1734487654/frank_three_r9jvfd.jpg", class: "h-[90vh] xs:h-[80vh] sm:h-screen w-full object-cover"},
  {src: "https://res.cloudinary.com/dfm07q3n0/image/upload/v1734487678/frank_four_hiqps6.jpg", class: "h-[90vh] xs:h-[80vh] sm:h-screen w-full object-cover"},
];
</script>

<style scoped>
.custom-arrow {
  @apply flex absolute bottom-6 right-3;
}

.custom-arrow--btn {
  @apply inline-flex items-center w-7 h-7 mr-3 justify-center text-white bg-[#0000004d] rounded-lg border-0 transition cursor-pointer;
}

.custom-dots {
  @apply flex m-0 p-0 absolute bottom-5 left-5;
}

.custom-dots--li {
  @apply inline-block w-3 h-1 my-0 mx-[3px] rounded bg-[#ffffff66] transition cursor-pointer;
}

.custom-dots li.is-active {
  width: 40px;
  background: #fff;
}
</style>
