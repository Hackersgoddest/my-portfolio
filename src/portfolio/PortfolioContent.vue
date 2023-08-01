<template>
  <div
    class="bg-[#101014] mx-auto max-w-screen-xl container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-10 lg:px-5"
  >
    <div
      class="flex bg-gradient-to-r from-[#0d0d0e] to-[#0f0f14] rounded shadow-2xl"
      v-for="project in portfolioOptions"
      :key="project.title"
    >
      <figure class="flex flex-col rounded-t-2xl w-full">
        <n-image :src="project.images[0]" class="rounded-t-2xl h-40" />
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
                class="custom-card w-full md:w-3/4"
                preset="card"
                title="Eban Register"
                :bordered="false"
              >
                <d class="flex gap-4 w-full flex-wrap">
                  <n-carousel show-arrow autoplay class="flex flex-1">
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
                    <n-h3>{{ project.title }}</n-h3>
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
                    <n-p
                      class="text-[#727174]"
                      v-html="project.description"
                    ></n-p>
                    <a :href="`${project.links[0]}`" target="_blank">
                      <n-button type="success" class="w-28 text-green-700">
                        <template #icon>
                          <n-icon>
                            <open-outline />
                          </n-icon>
                        </template>
                        LINK
                      </n-button>
                    </a>
                  </div>
                </d>
              </n-modal>
            </div>
            <n-p
              class="text-[#727174] m-0"
              v-html="truncateText(project.description, 5) + '...'"
            ></n-p>
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
          <a :href="`${project.links[0]}`" target="_blank" class="w-full">
            <n-button type="primary" ghost class="w-full">
              <template #icon>
                <n-icon>
                  <open-outline />
                </n-icon>
              </template>
              LINK
            </n-button>
          </a>
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
  NCard,
  NImage,
  NH3,
  NButton,
  NModal,
  NCarousel,
} from "naive-ui";
import { OpenOutline, ArrowBack, ArrowForward } from "@vicons/ionicons5";
import { shallowRef } from "vue";
import { truncateText } from "../filters";
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
    links: ["https://www.ebanregister.com/"],
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
