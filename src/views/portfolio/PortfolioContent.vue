<template>
  <div
    class="bg-[#101014] mx-auto max-w-screen-xl container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-10 lg:px-5"
  >
    <div
      class="flex bg-[#212121] rounded shadow-sm"
      v-for="project in portfolioOptions"
      :key="project.title"
    >
      <figure class="flex flex-col rounded-t-2xl w-full">
        <img
          @click="showModal = true"
          :src="project.images[0]"
          class="rounded-t-2xl h-40 hover:cursor-pointer"
        />
        <figcaption class="flex flex-col gap-8 p-4">
          <div>
            <div class="flex justify-between">
              <n-h3 class="text-white m-0">{{ project.title }}</n-h3>
              <n-button
                strong
                dashed
                round
                type="tertiary"
                size="small"
                class="text-[#fff]"
                @click="showModal = true"
              >
                details
              </n-button>
              <n-modal
                transform-origin="center"
                v-model:show="showModal"
                class="custom-card w-full lg:w-[80%]"
                preset="card"
                :title="project.title"
                :bordered="false"
              >
                <div class="flex gap-4 w-full flex-wrap">
                  <n-carousel show-arrow autoplay class="flex flex-1 w-full">
                    <n-image
                      v-for="image in project.images"
                      :key="image"
                      class="carousel-img"
                      :src="image"
                    />
                    <template #arrow="{ prev, next }">
                      <div class="custom-arrow">
                        <button
                          type="button"
                          class="custom-arrow--left"
                          @click="prev"
                        >
                          <n-icon><ArrowBack /></n-icon>
                        </button>
                        <button
                          type="button"
                          class="custom-arrow--right"
                          @click="next"
                        >
                          <n-icon><ArrowForward /></n-icon>
                        </button>
                      </div>
                    </template>
                    <template #dots="{ total, currentIndex, to }">
                      <ul class="custom-dots">
                        <li
                          v-for="index of total"
                          :key="index"
                          :class="{ ['is-active']: currentIndex === index - 1 }"
                          @click="to(index - 1)"
                        />
                      </ul>
                    </template>
                  </n-carousel>
                  <div class="flex flex-col md:w-1/2">
                    <n-p
                      class="text-[#727174]"
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
                          {{ link.name}}
                        </n-button>
                      </a>
                    </template>
                  </div>
                </div>
              </n-modal>
            </div>
            <n-button
              text
              class="text-[#727174]"
              @click="showModal = true"
              v-html="truncateText(project.description, 5) + '...'"
            ></n-button>
          </div>
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
  NP,
  NSpace,
  NTag,
  NImage,
  NH3,
  NButton,
  NModal,
  NCarousel,
} from "naive-ui";
import { OpenOutline, ArrowBack, ArrowForward } from "@vicons/ionicons5";
import { shallowRef } from "vue";
import { truncateText } from "../../filters";
import { ref } from "vue";

let showModal = ref(false);
const portfolioOptions = shallowRef([
  {
    title: "Eban Register(Web Admin)",
    description: `<p>An Electronic attendance system with employee and membership management modules. 70 organizations has enrolled on the platform since it's deployment in december 2020. The system allows employees or members of organizations to take attendance with their phone by:</br><ul><li>Scanning a QR-Code</li><li>Using their GPS</li><li>Scanning an NFC tag</li></ul></p>`,
    images: [
      "https://res.cloudinary.com/jolsoft/image/upload/v1634246757/portfolio/eban-admin/eban-admin-screen-1_zmjbnx.png",
      "https://res.cloudinary.com/jolsoft/image/upload/v1634247513/portfolio/eban-admin/eban-admin-screen-2_pcvgyu.png",
      "https://res.cloudinary.com/jolsoft/image/upload/v1634248046/portfolio/eban-admin/eban-admin-screen-3_licoyr.png",
    ],
    tools: ["VueJs", "Bootstrap", "FeatherJs", "Typescript", "more"],
    links: [{name: "LINK", link: "https://www.ebanregister.com/"}],
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
    links: [{name: "GITHUB", link: "https://github.com/Hackersgoddest/promptopia"}],
  },
]);
</script>

<style scoped>
.carousel-img {
  width: 100%;
  height: 400px;
  object-fit: fill;
}

@media screen and (max-width: 767px) {
  .carousel-img {
    height: 300px;
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
  color: #101014;
  background-color: rgba(202, 197, 197, 0.1);
  border-width: 0;
  border-radius: 8px;
  transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.custom-arrow button:hover {
  background-color: rgba(134, 122, 122, 0.2);
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
  background-color: rgba(71, 70, 70, 0.4);
  transition: width 0.3s, background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.custom-dots li.is-active {
  width: 40px;
  background: #242425;
}
</style>
