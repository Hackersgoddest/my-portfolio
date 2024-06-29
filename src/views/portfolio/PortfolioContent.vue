<template>
  <div
    class="bg-[#101014] mx-auto max-w-screen-xl container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-10 lg:px-5">
    <div class="flex bg-[#212121] rounded shadow-sm" v-for="project in portfolioOptions" :key="project.title">
      <figure class="flex flex-col rounded-t-2xl w-full">
        <img @click="() => project.showModal = true" :src="project.images[0]"
          class="rounded-t-2xl h-40 hover:cursor-pointer" />
        <figcaption class="flex flex-col gap-8 p-4">
          <div>
            <div class="flex justify-between">
              <n-h3 class="text-white m-0">{{ project.title }}</n-h3>
              <n-button strong dashed round size="small" class="text-neutral-200"
                @click="() => project.showModal = true">
                details
              </n-button>
              <n-modal transform-origin="center" v-model:show="project.showModal"
                class="custom-card w-full max-md:h-screen md:m-4 lg:m-auto lg:w-[80%] max-w-screen-xl">
                <n-card :content-style="{ background: '#212121' }" :header-style="{ background: '#212121' }"
                  :bordered="false">
                  <template #header>
                    <n-h3 class="text-neutral-400 m-0">{{ project.title }}</n-h3>
                  </template>
                  <template #header-extra>
                    <n-button @click="project.showModal = false" size="small" dashed circle color="#a3a3a3">
                      <template #icon>
                        <n-icon size="20" :component="Close" />
                      </template>
                    </n-button>
                  </template>
                  <div class="flex gap-4 flex-wrap mt-4 lg:mt-2">
                    <n-carousel show-arrow autoplay class="flex flex-1">
                      <n-image v-for="image in project.images" class="md:min-h-80" :key="image" :src="image" />
                      <template #arrow="{ prev, next }">
                        <div class="custom-arrow">
                          <n-icon-wrapper :size="28" :border-radius="10" class="custom-arrow--btn hover:bg-[#867A7A33]"
                            @click="prev">
                            <n-icon :size="18" :component="ArrowBack" />
                          </n-icon-wrapper>
                          <n-icon-wrapper :size="28" :border-radius="10" class="custom-arrow--btn hover:bg-[#867A7A33]"
                            @click="next">
                            <n-icon :size="18" :component="ArrowForward" />
                          </n-icon-wrapper>
                        </div>
                      </template>
                      <template #dots="{ total, currentIndex, to }">
                        <ul class="custom-dots">
                          <li v-for="index of total" :key="index"
                            class="custom-dots--li active:w-10 active:bg-[#242425] z-10"
                            :class="{ ['is-active']: currentIndex === index - 1 }" @click="to(index - 1)" />
                        </ul>
                      </template>
                    </n-carousel>
                    <div class="flex flex-col md:w-1/2">
                      <n-p class="text-neutral-400 mb-5" v-html="project.description"></n-p>
                      <n-space class="mb-5">
                        <n-tag round :bordered="false" type="success" v-for="tool in project.tools" :key="tool">
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
            </div>
            <n-button text class="text-[#727174]" @click="project.showModal = true"
              v-html="truncateText(project.description, 40)"></n-button>
          </div>
          <n-space>
            <n-tag round :bordered="false" type="success" v-for="tool in project.tools" :key="tool">
              {{ tool }}
            </n-tag>
          </n-space>
          <div class="flex w-full gap-2">
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
          </div>
        </figcaption>
      </figure>
    </div>
  </div>
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
} from "naive-ui";
import { OpenOutline, ArrowBack, ArrowForward, Close } from "@vicons/ionicons5";
import { truncateText } from "../../filters";
import { ref } from "vue";

const portfolioOptions = ref([
  {
    title: "Eban Register(Web Admin)",
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
      "/login.png",
      "/homepage.png",
      "/profile.png",
    ],
    tools: ["NextJs", "Tailwind", "DaisyUI", "Typescript", "more"],
    links: [{ name: "GITHUB", link: "https://github.com/Hackersgoddest/promptopia" }],
    showModal: ref(false),
  },
]);
</script>

<style scoped>
.custom-arrow {
  @apply flex absolute bottom-4 right-3 gap-2;
}

.custom-arrow--btn {
  @apply inline-flex items-center justify-center text-[#101014] bg-[#CAC5C51A] rounded-lg border-0 transition cursor-pointer;
}

.custom-dots {
  @apply flex m-0 p-0 absolute bottom-5 left-5;
}

.custom-dots--li {
  @apply inline-block w-3 h-1 my-0 mx-[3px] rounded bg-[#47464666] transition cursor-pointer;
}

.custom-dots li.is-active {
  width: 40px;
  background: #242425;
}
</style>
