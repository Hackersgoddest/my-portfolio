<template>
  <div class="bg-[#101014] flex justify-center fixed">
    <div class="container flex w-full max-w-screen-xl px-5">
      <nav class="flex w-full justify-between h-16 items-center">
        <div class="flex items-center">
          <n-gradient-text
            gradient="linear-gradient(90deg, white 0%, gray 50%, green 100%)"
            class="font-medium text-lg lg:text-xl"
          >
            Frank Oppong Konadu
          </n-gradient-text>
        </div>
        <ul
          :class="[openMenu ? 'translate-x-0' : 'translate-x-[-100%]']"
          class="block absolute left-0 top-16 bg-[#101014] w-full transition-transform pb-3 pl-2 pr-4 sm:px-0 sm:translate-x-0 sm:w-auto sm:static gap-2 sm:inline-flex sm:items-center sm:pb-0"
        >
          <li v-for="(section, index) in sections" :key="index">
            <n-a
              @click.passive="$emit('scrollToSection', section, index)"
              class="hover:text-[#57e9b1] block px-3 py-1 mb-2 sm:mb-0 rounded-md text-sm font-medium transition-colors duration-500 ease-in-out"
              :class="{
                'bg-[#18A0581F] text-[#57e9b1]': isActiveSection(index),
              }"
              >{{ section }}
            </n-a>
          </li>
        </ul>
      </nav>
    </div>
    <button
      @click="$emit('toggleMenu', !openMenu)"
      class="absolute top-2.5 right-2 outline-none"
    >
      <template
        v-show="!openMenu"
        class="bar inline-flex items-center rounded-md px-1 py-2 hover:bg-[#18A0581F] z-10 sm:hidden w-10 flex-col justify-center transition-colors duration-1000 ease-in-out"
      >
        <div class="bg-gray-400 h-0.5 w-4 mb-1 rounded-xl"></div>
        <div class="bg-gray-400 h-0.5 w-4 mb-1 rounded-xl"></div>
        <div class="bg-gray-400 h-0.5 w-4 mb-0 rounded-xl"></div>
      </template>
      <template
        v-show="openMenu"
        class="bar inline-flex items-center rounded-md px-1 py-2 hover:bg-[#18A0581F] z-10 sm:hidden w-10 flex-col justify-center"
      >
        <div class="h-0.5 rounded-xl mb-1"></div>
        <div
          class="bg-gray-400 h-0.5 w-4 rounded-xl -rotate-45 translate-y-[1px]"
        ></div>
        <div class="bg-gray-400 h-0.5 w-4 mb-1 rounded-xl rotate-45"></div>
      </template>
    </button>
  </div>
</template>

<script setup>
import { watch, onMounted, onUnmounted } from "vue";
import { NA, NGradientText } from "naive-ui";

const props = defineProps(["openMenu", "activeSectionIndex"]);
const emit = defineEmits(["updateActiveSectionIndex", "scrollToSection"]);

const sections = ["Home", "Services", "Skills", "Portfolio", "Contact"];

const handleScroll = () => {
  const sectionRefs = sections.map((_, index) =>
    document.getElementById(sections[index])
  );
  for (let i = sectionRefs.length - 1; i >= 0; i--) {
    const rect = sectionRefs[i].getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.5) {
      emit("updateActiveSectionIndex", i);
      break;
    }
  }
};

watch(
  () => props.activeSectionIndex,
  () => {
    isActiveSection(props.activeSectionIndex);
  }
);

const isActiveSection = (index) => {
  return props.activeSectionIndex === index;
};

onMounted(() => {
  window.addEventListener("wheel", handleScroll, { passive: true });
  window.addEventListener("touchmove", handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("touchmove", handleScroll);
});
</script>

<style scoped>
.bar:hover div {
  background-color: #18a058;
}
</style>
