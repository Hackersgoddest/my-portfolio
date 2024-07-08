<template>
  <div class="relative">
    <div class="absolute bg-black bg-opacity-50 inset-0 z-10"></div>
    <n-carousel show-arrow autoplay>
      <img v-for="(src, index) in images" key="index"
        class="h-[600px] lg:h-[700px] xl:h-[725px] w-full object-cover object-center bg-fixed"
        :style="[index == 1 && { objectPosition: 'center 20px' }]" :src="src">
      <template #arrow="{ prev, next }">
        <div class="custom-arrow z-20">
          <button type="button" class="custom-arrow--btn hover:bg-[#00000080]" @click="prev">
            <n-icon>
              <ArrowBack />
            </n-icon>
          </button>
          <button type="button" class="custom-arrow--btn hover:bg-[#00000080]" @click="next">
            <n-icon>
              <ArrowForward />
            </n-icon>
          </button>
        </div>
      </template>
      <template #dots="{ total, currentIndex, to }">
        <ul class="custom-dots z-20">
          <li v-for="index of total" :key="index" class="custom-dots--li"
            :class="{ ['is-active']: currentIndex === index - 1 }" @click="to(index - 1)" />
        </ul>
      </template>
    </n-carousel>
  </div>
</template>

<script setup>
import { ArrowBack, ArrowForward } from "@vicons/ionicons5";
import { NIcon, NCarousel } from "naive-ui";

const images = ['/frank_one.jpeg', '/frank_two.jpg', '/frank_three.jpg', '/frank_four.jpeg'];
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