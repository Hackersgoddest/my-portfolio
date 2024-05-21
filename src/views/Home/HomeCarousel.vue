<template>
  <div class="relative">
    <div class="absolute bg-black bg-opacity-50 left-0 top-0 w-full h-screen z-10"></div>
    <n-carousel show-arrow autoplay>
    <img
      class="carousel-img"
      src="/frank_one.jpeg"
    >
    <img
      class="carousel-img"
      src="frank_two.jpg"
      style="object-position: center 20px"
    >
    <img
      class="carousel-img"
      src="/frank_three.jpg"
    >
    <img
      class="carousel-img "
      src="/frank_four.jpeg"
    >
    <template #arrow="{ prev, next }">
      <div class="custom-arrow z-20">
        <button type="button" class="custom-arrow--left" @click="prev">
          <n-icon><ArrowBack /></n-icon>
        </button>
        <button type="button" class="custom-arrow--right" @click="next">
          <n-icon><ArrowForward /></n-icon>
        </button>
      </div>
    </template>
    <template #dots="{ total, currentIndex, to }">
      <ul class="custom-dots z-20">
        <li
          v-for="index of total"
          :key="index"
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
import { NIcon, NCarousel } from "naive-ui";
</script>

<style scoped>
.carousel-img {
  width: 100%;
  height: 725px;
  object-fit: cover;
  object-position: center;
  background-attachment: fixed;
}

@media only screen and (max-width: 1025px) {
  .carousel-img {
    height: 600px;
    object-position: center;
  }
}

@media only screen and (min-width: 1026px) and (max-width: 1281px) {
  .carousel-img {
    height: 700px;
  }
}
.custom-arrow {
  display: flex;
  position: absolute;
  bottom: 25px;
  right: 10px;
}

.custom-arrow button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  margin-right: 12px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.3);
  border-width: 0;
  border-radius: 8px;
  transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.custom-arrow button:hover {
  background-color: rgba(0, 0, 0, 0.5);
}

.custom-arrow button:active {
  transform: scale(0.95);
  transform-origin: center;
}

.custom-dots {
  display: flex;
  margin: 0;
  padding: 0;
  position: absolute;
  bottom: 20px;
  left: 20px;
}

.custom-dots li {
  display: inline-block;
  width: 12px;
  height: 4px;
  margin: 0 3px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.4);
  transition: width 0.3s, background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.custom-dots li.is-active {
  width: 40px;
  background: #fff;
}
</style>