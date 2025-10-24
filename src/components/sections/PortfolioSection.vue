<template>
  <section class="bg-[#101014]">
    <Header :title="title" :description="description" id="Portfolio" />
    
    <!-- Portfolio Content -->
    <n-grid
      class="max-w-screen-xl mx-auto px-5"
      cols="1 s:2 m:3"
      responsive="screen"
      :x-gap="32"
      :y-gap="32"
      :item-responsive="true"
    >
      <n-grid-item v-for="project in portfolioOptions" :key="project.title">
        <n-card
          :title="project.title"
          size="large"
          :bordered="false"
          :theme-overrides="darkTheme"
          class="rounded-lg bg-[#212121]"
          :header-style="{
            padding: '23px 32px 0px'
          }"
        >
          <template #cover>
            <img
              @click="() => (project.showModal = true)"
              :src="project.images[0]"
              class="rounded-t-2xl hover:cursor-pointer h-48"
            />
          </template>
          <template #header-extra>
            <n-button
              strong
              dashed
              round
              size="small"
              class="text-neutral-200"
              @click="() => (project.showModal = true)"
            >
              details
            </n-button>
          </template>
            <n-modal
              transform-origin="center"
              v-model:show="project.showModal"
              class="custom-card w-full max-md:h-screen md:m-4 lg:m-auto lg:w-[80%] max-w-screen-xl"
            >
              <n-card
                :title="project.title"
                :content-style="{
                  background: '#212121',
                  borderRadius: '0 0 4px 4px',
                }"
                :header-style="{
                  background: '#212121',
                  borderRadius: '4px 4px 0 0',
                  padding: '19px 24px 10px',
                  color: '#ffffff',
                }"
                class="rounded-md"
                :bordered="false"
                :theme-overrides="darkTheme"
              >
                <template #header-extra>
                  <n-button
                    @click="project.showModal = false"
                    size="small"
                    dashed
                    circle
                    color="#a3a3a3"
                  >
                    <template #icon>
                      <n-icon size="20" :component="Close" />
                    </template>
                  </n-button>
                </template>
                <div class="flex gap-4 flex-wrap mt-2">
                  <n-carousel show-arrow autoplay class="flex flex-1">
                    <n-image
                      v-for="image in project.images"
                      class="md:min-h-80"
                      :key="image"
                      :src="image"
                    />
                    <template #arrow="{ prev, next }">
                      <div class="flex absolute bottom-4 right-3 gap-2">
                        <n-icon-wrapper
                          :size="28"
                          :border-radius="10"
                          class="inline-flex items-center justify-center text-[#101014] bg-[#CAC5C51A] rounded-lg border-0 transition cursor-pointer hover:bg-[#867A7A33]"
                          @click="prev"
                        >
                          <n-icon :size="18" :component="ArrowBack" />
                        </n-icon-wrapper>
                        <n-icon-wrapper
                          :size="28"
                          :border-radius="10"
                          class="inline-flex items-center justify-center text-[#101014] bg-[#CAC5C51A] rounded-lg border-0 transition cursor-pointer hover:bg-[#867A7A33]"
                          @click="next"
                        >
                          <n-icon :size="18" :component="ArrowForward" />
                        </n-icon-wrapper>
                      </div>
                    </template>
                    <template #dots="{ total, currentIndex, to }">
                      <ul class="flex m-0 p-0 absolute bottom-5 left-5">
                        <li
                          v-for="index of total"
                          :key="index"
                          class="inline-block w-3 h-1 my-0 mx-[3px] rounded bg-[#47464666] transition cursor-pointer active:w-10 active:bg-[#242425] z-10"
                          :class="{ 'w-10 bg-[#242425]': currentIndex === index - 1 }"
                          @click="to(index - 1)"
                        />
                      </ul>
                    </template>
                  </n-carousel>
                  <div class="flex flex-col md:w-1/2">
                    <n-p
                      class="text-neutral-400 mb-5"
                      v-html="project.description"
                    ></n-p>
                    <n-space class="mb-5">
                      <n-tag
                        round
                        :bordered="false"
                        type="success"
                        v-for="tool in project.tools"
                        :key="tool"
                      >
                        {{ tool }}
                      </n-tag>
                    </n-space>
                    <template v-for="link in project.links" :key="link.name">
                      <a :href="`${link.link}`" target="_blank">
                        <n-button type="success" class="w-28">
                          <template #icon>
                            <n-icon>
                              <open-outline />
                            </n-icon>
                          </template>
                          {{ link.name }}
                        </n-button>
                      </a>
                    </template>
                  </div>
                </div>
              </n-card>
            </n-modal>
          <n-space vertical :size="16">
            <n-button
              text
              class="text-[#727174]"
              @click="project.showModal = true"
              v-html="truncateText(project.description, 40)"
            ></n-button>
            <n-space>
              <n-tag
                round
                :bordered="false"
                type="success"
                v-for="tool in project.tools"
                :key="tool"
              >
                {{ tool }}
              </n-tag>
            </n-space>
            <n-space vertical :size="16">
              <template v-for="link in project.links" :key="link.name">
                <a :href="`${link.link}`" target="_blank" class="w-full flex">
                  <n-button type="success" class="w-full flex flex-1">
                    <template #icon>
                      <n-icon>
                        <open-outline />
                      </n-icon>
                    </template>
                    {{ link.name }}
                  </n-button>
                </a>
              </template>
            </n-space>
          </n-space>
        </n-card>
      </n-grid-item>
    </n-grid>
  </section>
</template>

<script setup>
import {
  NIcon,
  NIconWrapper,
  NP,
  NSpace,
  NTag,
  NImage,
  NH3,
  NButton,
  NModal,
  NCard,
  NCarousel,
  NGrid,
  NGridItem,
  darkTheme,
} from "naive-ui";
import { OpenOutline, ArrowBack, ArrowForward, Close } from "@vicons/ionicons5";
import { truncateText } from "../../utils/text";
import Header from "../Header.vue";
import { shallowRef, ref } from "vue";

const title = shallowRef('PORTFOLIO');
const description = shallowRef('My Latest Projects');

const portfolioOptions = ref([
  {
    title: "Eban Register",
    description: `<p>An Electronic attendance system with employee and membership management modules. 70 organizations has enrolled on the platform since it's deployment in december 2020. The system allows employees or members of organizations to take attendance with their phone by:</br><ul><li>Scanning a QR-Code</li><li>Using their GPS</li><li>Scanning an NFC tag</li></ul></p>`,
    images: [
      "https://res.cloudinary.com/jolsoft/image/upload/v1634246757/portfolio/eban-admin/eban-admin-screen-1_zmjbnx.png",
      "https://res.cloudinary.com/jolsoft/image/upload/v1634247513/portfolio/eban-admin/eban-admin-screen-2_pcvgyu.png",
      "https://res.cloudinary.com/jolsoft/image/upload/v1634248046/portfolio/eban-admin/eban-admin-screen-3_licoyr.png",
    ],
    tools: ["VueJs", "Bootstrap", "FeatherJs", "Typescript", "more"],
    links: [{ name: "LINK", link: "https://www.ebanregister.com/" }],
    showModal: ref(false),
  },
  {
    title: "Promptopia",
    description: `<p>Promptopia is an open-source AI prompting tool for modern world to discover, create and share creative prompts. The application allows one to:</br><ul><li>Discover AI prompts</li><li>Create AI prompts</li><li>Edit AI prompts</li><li>Delete AI prompts</li></ul></p>`,
    images: [
      "https://res.cloudinary.com/dfm07q3n0/image/upload/v1734491174/login_d2wlty.png",
      "https://res.cloudinary.com/dfm07q3n0/image/upload/v1734491191/homepage_abswnc.png",
      "https://res.cloudinary.com/dfm07q3n0/image/upload/v1734491206/profile_glj8lb.png",
    ],
    tools: ["NextJs", "Tailwind", "DaisyUI", "Typescript", "more"],
    links: [
      { name: "GITHUB", link: "https://github.com/Hackersgoddest/promptopia" },
    ],
    showModal: ref(false),
  },
  {
  title: "E-VotePro",
  description: `<p>A comprehensive voting system built using C# Windows Forms and MySQL, designed to facilitate secure, efficient, and transparent elections. Perfect for educational institutions, organizations, and small-scale elections. The system features:</br><ul><li>Secure user authentication for students and admins</li><li>Real-time voting results and analytics</li><li>Comprehensive admin dashboard for election management</li><li>Candidate management system</li></ul></p>`,
  images: [
    "https://res.cloudinary.com/dfm07q3n0/image/upload/v1748968512/Screenshot_2025-06-03_at_4.30.45_PM_iygotw.png",
    "https://res.cloudinary.com/dfm07q3n0/image/upload/v1748968505/Screenshot_2025-06-03_at_4.30.30_PM_bqnl7e.png",
    "https://res.cloudinary.com/dfm07q3n0/image/upload/v1748968497/Screenshot_2025-06-03_at_4.30.18_PM_xma9og.png"
  ],
  tools: ["C#", "Windows Forms", ".NET", "MySQL", "more"],
  links: [
    { name: "GITHUB", link: "https://github.com/Hackersgoddest/E-VotePro" }
  ],
  showModal: ref(false),
},
]);
</script>
