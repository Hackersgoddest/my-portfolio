<template>
  <section class="relative min-h-screen overflow-hidden">
    <!-- Hero overlay -->
    <div class="absolute inset-0 z-10 bg-gradient-to-br from-black/60 via-black/50 to-transparent">
      <div class="container-custom h-screen flex items-center">
        <div class="max-w-4xl">
          <!-- Status badge -->
          <div class="hero-tag animate-fade-in-scale mb-6">
            <n-tag 
              round 
              :bordered="false" 
              type="success"
              size="large"
              class="text-caption font-medium px-4 py-2"
            >
              <template #icon>
                <n-icon :component="Code" size="16" />
              </template>
              Software Developer
            </n-tag>
          </div>

          <!-- Main heading -->
          <div class="hero-name animate-fade-in-up mb-6" style="animation-delay: 0.2s">
            <h1 class="text-h1 text-white font-bold mb-4">
              Hi, I'm <span class="gradient-text">Frank Oppong Konadu</span>
            </h1>
            <p class="hero-description text-body-lg text-gray-300 max-w-2xl leading-relaxed">
              A passionate full-stack developer with {{ new Date().getFullYear() - 2022 }}+ years of experience 
              creating digital solutions that make a difference. I specialize in modern web technologies 
              and love turning ideas into reality.
            </p>
          </div>

          <!-- Location -->
          <div class="hero-location animate-fade-in-up mb-8" style="animation-delay: 0.4s">
            <div class="inline-flex items-center glass-card px-4 py-2 rounded-full">
              <n-icon size="16" :component="skillsData.personal[0].icon" class="text-green-400 mr-2"></n-icon>
              <span class="text-caption text-gray-300">Accra, Ghana • Available Worldwide</span>
            </div>
          </div>

          <!-- CTA Buttons -->
          <div class="hero-buttons animate-fade-in-up flex flex-wrap gap-4 mb-12" style="animation-delay: 0.6s">
            <n-button
              type="primary"
              size="large"
              round
              class="btn-primary text-base font-medium px-8 py-3 shadow-lg"
              @click.passive="$emit('scrollToSection', 'portfolio')"
            >
              View My Work
            </n-button>
            
            <a
              href="https://drive.google.com/file/d/1VL6bg9-IDgQjeOILcW3j-2SRQPhiezsK/view?usp=sharing"
              target="_blank"
              class="inline-block"
            >
              <n-button 
                secondary
                size="large"
                round
                icon-placement="right"
                class="text-base font-medium px-8 py-3"
                :style="{
                  '--n-border': '1px solid rgba(52, 211, 153, 0.3)',
                  '--n-border-hover': '1px solid rgba(52, 211, 153, 0.6)',
                  '--n-border-pressed': '1px solid rgba(52, 211, 153, 0.8)',
                  '--n-color': 'transparent',
                  '--n-color-hover': 'rgba(52, 211, 153, 0.1)',
                  '--n-color-pressed': 'rgba(52, 211, 153, 0.2)',
                  '--n-text-color': 'rgb(52, 211, 153)',
                  '--n-text-color-hover': 'rgb(52, 211, 153)',
                  '--n-text-color-pressed': 'rgb(52, 211, 153)',
                }"
              >
                <template #icon>
                  <n-icon size="16" :component="skillsData.personal[1].icon"></n-icon>
                </template>
                Download CV
              </n-button>
            </a>
          </div>

          <!-- Experience badge -->
          <div class="hero-experience animate-fade-in-up" style="animation-delay: 0.8s">
            <div class="inline-flex items-center glass-card px-6 py-4 rounded-xl">
              <div class="text-3xl font-bold text-green-400 mr-4">
                {{ new Date().getFullYear() - 2022 }}+
              </div>
              <div class="text-left">
                <div class="text-caption text-gray-400">YEARS</div>
                <div class="text-caption text-gray-400">EXPERIENCE</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Scroll indicator -->
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div class="flex flex-col items-center text-white/70">
            <span class="text-caption mb-2">Scroll</span>
            <div class="w-px h-8 bg-gradient-to-b from-white/70 to-transparent"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Background carousel -->
    <n-carousel 
      show-arrow 
      autoplay
      :autoplay-duration="6000"
      class="absolute inset-0"
    >
      <img
        v-for="(image, index) in images"
        key="index"
        :class="image.class"
        :src="image.src"
      />
      <template #arrow="{ prev, next }">
        <div class="flex absolute bottom-6 right-3 z-20">
          <button
            type="button"
            class="inline-flex items-center w-7 h-7 mr-3 justify-center text-white bg-[#0000004d] rounded-lg border-0 transition cursor-pointer hover:bg-[#00000080]"
            @click="prev"
          >
            <n-icon>
              <ArrowBack />
            </n-icon>
          </button>
          <button
            type="button"
            class="inline-flex items-center w-7 h-7 mr-3 justify-center text-white bg-[#0000004d] rounded-lg border-0 transition cursor-pointer hover:bg-[#00000080]"
            @click="next"
          >
            <n-icon>
              <ArrowForward />
            </n-icon>
          </button>
        </div>
      </template>
      <template #dots="{ total, currentIndex, to }">
        <ul class="flex m-0 p-0 absolute bottom-5 left-5 z-20">
          <li
            v-for="index of total"
            :key="index"
            class="inline-block w-3 h-1 my-0 mx-[3px] rounded bg-[#ffffff66] transition cursor-pointer"
            :class="{ 'w-10 bg-white': currentIndex === index - 1 }"
            @click="to(index - 1)"
          />
        </ul>
      </template>
    </n-carousel>
  </section>
</template>

<script setup>
import { ArrowBack, ArrowForward } from "@vicons/ionicons5";
import { NCarousel, NText, NIcon, NButton, NSpace, NTag } from "naive-ui";
import skillsData from "../../data/skills";
import { Code } from "@vicons/ionicons5"

const images = [
  {src: "https://res.cloudinary.com/dfm07q3n0/image/upload/v1734487611/frank_one_ei67ny.jpg", class: "h-[90vh] xs:h-[80vh] sm:h-screen w-full object-cover"},
  {src: "https://res.cloudinary.com/dfm07q3n0/image/upload/v1734487654/frank_three_r9jvfd.jpg", class: "h-[90vh] xs:h-[80vh] sm:h-screen w-full object-cover"},
  {src: "https://res.cloudinary.com/dfm07q3n0/image/upload/v1734487678/frank_four_hiqps6.jpg", class: "h-[90vh] xs:h-[80vh] sm:h-screen w-full object-cover"},
];
</script>
