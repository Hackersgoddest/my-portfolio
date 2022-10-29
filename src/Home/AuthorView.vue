<template>
    <n-grid cols="22 s:22 m:23 l:24 xl:24 2xl:24" responsive="screen">
    <n-gi class="first-span"></n-gi>
    <n-gi class="second-span"></n-gi>
    <n-gi class="author" :span="20">
      <!-- <p class="author__title">Software Developer</p> -->
      <n-button strong secondary type="success" size="large">
      Software Developer
    </n-button>
      <p class="author__name">I am Frank Oppong Konadu</p>
      <p class="author__interest">I am passionate software developer with a year of experience</p>
      <span class="location__container">
        <div class="current__location">
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 384 512" class="mr-1"
            height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z">
            </path>
          </svg>Accra - Ghana | Remote
        </div>
      </span>
      <div class="qualification__container">
        <a @mouseover="Portfolio" @mouseout="out" class="portfolio"
          :class="onPortfolio? 'color-white' : 'color-green'" href="#portfolio">My Portfilio</a>
        <a @mouseover="CV" @mouseout="out" class="cv"
          :class="onCv? 'color-white' : 'color-green'" href="#">My CV
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="ml-2"
            height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M464 480H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48zM128 120c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zm0 96c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zm0 96c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zm288-136v-32c0-6.627-5.373-12-12-12H204c-6.627 0-12 5.373-12 12v32c0 6.627 5.373 12 12 12h200c6.627 0 12-5.373 12-12zm0 96v-32c0-6.627-5.373-12-12-12H204c-6.627 0-12 5.373-12 12v32c0 6.627 5.373 12 12 12h200c6.627 0 12-5.373 12-12zm0 96v-32c0-6.627-5.373-12-12-12H204c-6.627 0-12 5.373-12 12v32c0 6.627 5.373 12 12 12h200c6.627 0 12-5.373 12-12z">
            </path>
          </svg>
        </a>
      </div>
      <div class="experience">
        <p class="exp__1">1+</p>
        <div class="exp__2">
          <p>YEARS</p>
          <P>EXPERIENCE</P>
        </div>
      </div>
    </n-gi>
  </n-grid>
</template>

<script setup>
import { NGrid, NGi, NButton } from "naive-ui";
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
.n-button {
  cursor: context-menu;
}
.author__name {
  margin: 20px 0 0 0;
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 2.5rem;
}

@media only screen and (max-width: 600px) {
  .author__name {
    font-size: 1.2rem;
  }
}

.author__interest {
  margin: 1rem 0 0 0;
  color: white;
}

.location__container {
  height: 32px;
  display: flex;
  width: 100%;
  align-items: center;
}

.current__location {
  margin: 8px 0 0 0;
  height: 24px;
  color: #9CA3AF;
  line-height: 1.7rem;
}

.current__location svg {
  margin-right: 4px;
  width: 16px;
}

.qualification__container {
  margin-top: 2.25rem;
  height: 35px;
  font-size: .875rem;
}


.qualification__container .color-white {
  padding: 8px 24px;
  /* border: 1px solid #34D399; */
  text-decoration: none;
  border-radius: 50px;
  color: white;
  font-weight: 700;
  line-height: 1.25rem;
  margin-right: 1rem;
  background-color: rgba(52, 53, 52, 0.3);
  transition: background-color 0.3s ease-in-out 0.3s, color 0.3s ease-in-out 0.3s;
}

.qualification__container .color-green {
  padding: 8px 24px;
  background-color: rgba(24, 160, 88, 0.2);
  color: #18A058;
  transition: background-color 0.3s ease-in-out 0.3s, color 0.3s ease-in-out 0.3s;
  text-align: center;
  text-decoration: none;
  font-weight: 700;
  line-height: 1.25rem;
  margin-right: 1rem;
  border-radius: 50px;
  /* border: 1px solid #374151; */
}

.qualification__container .cv svg {
  margin-left: 8px;
  margin-bottom: 4px;
  display: inline-block;
  vertical-align: middle;
  align-content: center;
  width: 1em;
  height: 1em;
}

.experience {
  display: flex;
  order: 5;
  margin-top: 2.25rem;
}

.experience .exp__1 {
  order: 0;
  margin: 0 0.75rem 0 0;
  font-size: 2.25rem;
  line-height: 2.5rem;
  color: white;
}

.experience .exp__2 {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.experience .exp__2 p {
  margin: 0;
  font-size: 0.75rem;
  color: #9CA3AF;
}


</style>