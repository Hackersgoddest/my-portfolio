<template>
  <div class=" container mx-auto max-w-screen-xl px-5">
    <div class="relative flex items-start justify-start flex-col">
      <button class="shadow-2xl px-2 py-1 mb-1 sm:mb-2 outline-none rounded text-white text-base font-semibold bg-gradient-to-r from-gray-500 to-gray-900 cursor-auto">
        Software Developer
      </button>
      <p class="text-white text-xl font-semibold md:text-2xl">I am Frank Oppong Konadu</p>
      <p class="text-white text-sm md:text-base mt-3.5">I am a passionate software developer with a year of experience
      </p>
      <span class="location__container">
        <div class="text-gray-400 flex items-baseline h-6 leading-7 mt-2">
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 384 512" class="mr-1"
            height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z">
            </path>
          </svg>Accra - Ghana | Remote
        </div>
      </span>
      <div class="mt-6 text-sm h-9">
        <a @mouseover="Portfolio" @mouseout="out" class="px-6 py-2 rounded-full font-bold mr-4 transition-colors duration-1000 ease-in-out"
          :class="onPortfolio ? 'color-white' : 'color-green'" href="#portfolio">My Portfilio</a>
        <a @mouseover="CV" @mouseout="out" class="cv px-6 py-2 rounded-full font-bold transition-colors duration-1000 ease-in-out"
          :class="onCv ? 'color-white' : 'color-green'" href="#">My CV
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="ml-2"
            height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M464 480H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48zM128 120c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zm0 96c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zm0 96c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zm288-136v-32c0-6.627-5.373-12-12-12H204c-6.627 0-12 5.373-12 12v32c0 6.627 5.373 12 12 12h200c6.627 0 12-5.373 12-12zm0 96v-32c0-6.627-5.373-12-12-12H204c-6.627 0-12 5.373-12 12v32c0 6.627 5.373 12 12 12h200c6.627 0 12-5.373 12-12zm0 96v-32c0-6.627-5.373-12-12-12H204c-6.627 0-12 5.373-12 12v32c0 6.627 5.373 12 12 12h200c6.627 0 12-5.373 12-12z">
            </path>
          </svg>
        </a>
      </div>
      <div class="flex order-5 mt-1">
        <p class="mr-3 text-4xl text-white leading-9 order-0">1+</p>
        <div class="flex flex-col justify-center">
          <p class="text-gray-400 text-xs">YEARS</p>
          <P class="text-gray-400 text-xs">EXPERIENCE</P>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from "vue";

let onPortfolio = ref(true);
let onCv = ref(false);

function Portfolio() {
  onCv.value = false;
  onPortfolio.value = true;
}

function CV() {
  onPortfolio.value = false;
  onCv.value = true;
}


</script>

<style scoped>
.color-white {
  color: white;
  background-color: rgba(2, 10, 12, 0.5);
  /* transition: background-color 0.3s ease-in-out 0.3s, color 0.3s ease-in-out 0.3s; */
}

.color-green {
  background-color: white;
  color: rgb(2, 10, 12);
  /* transition: background-color 0.3s ease-in-out 0.3s, color 0.3s ease-in-out 0.3s; */
}

.cv svg {
  margin-left: 8px;
  margin-bottom: 4px;
  display: inline-block;
  vertical-align: middle;
  align-content: center;
  width: 1em;
  height: 1em;
}
</style>