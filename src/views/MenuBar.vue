<template>
  <div class="bg-[#101014] flex justify-center fixed">
    <div class="container flex w-full max-w-screen-xl px-5">
      <nav class="flex w-full justify-between h-16 items-center">
        <div class="flex items-center">
          <n-gradient-text gradient="linear-gradient(90deg, white 0%, gray 50%, green 100%)"
            class="font-medium text-lg lg:text-xl">
            Frank Oppong Konadu
          </n-gradient-text>
        </div>
        <ul :class="[openMenu ? 'translate-x-0' : 'translate-x-[-100%]']"
          class="block absolute left-0 top-16 bg-[#101014] w-full transition-transform pb-3 pl-2 pr-4 sm:px-0 sm:translate-x-0 sm:w-auto sm:static gap-2 sm:inline-flex sm:items-center sm:pb-0">
          <li v-for="(section, index) in sections" :key="index">
            <n-a @click.passive="$emit('scrollToSection', section, index)"
              class="hover:text-[#57e9b1] block px-3 py-1 mb-2 sm:mb-0 rounded-md text-sm font-medium transition-colors duration-500 ease-in-out"
              :class="{
          'bg-[#18A0581F] text-[#57e9b1]': isActiveSection(index),
        }">{{ section }}
            </n-a>
          </li>
        </ul>
      </nav>
    </div>
    <n-button quaternary circle @click="$emit('toggleMenu', !openMenu)" class="absolute top-2.5 right-2 outline-none sm:hidden">
      <template #icon class="z-10">
        <n-icon v-if="!openMenu" color="#fff" size="30" :component="MenuSharp" />
        <n-icon v-else size="30" color="#fff" :component="Close" />
      </template>
    </n-button>
  </div>
</template>

<script setup>
import { watch, onMounted, onUnmounted } from "vue";
import { NA, NGradientText, NButton, NIcon } from "naive-ui";
import { Close, MenuSharp } from "@vicons/ionicons5";

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
</style>
