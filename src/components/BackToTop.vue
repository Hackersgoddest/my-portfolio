<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 scale-75 translate-y-2"
    enter-to-class="opacity-100 scale-100 translate-y-0"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 scale-100 translate-y-0"
    leave-to-class="opacity-0 scale-75 translate-y-2"
  >
    <button
      v-if="visible"
      type="button"
      aria-label="Back to top"
      @click="scrollToTop"
      class="fixed bottom-6 right-6 z-60 flex h-11 w-11 items-center justify-center rounded-full border border-border/20 dark:border-border/10 bg-surface-elevated/80 text-fg-muted shadow-lg backdrop-blur-md transition-colors duration-200 hover:border-primary-green/40 hover:text-primary-green"
    >
      <ArrowUp :size="18" />
    </button>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { ArrowUp } from "@lucide/vue";

const visible = ref(false);

const handleScroll = () => {
  visible.value = window.scrollY > 400;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => window.addEventListener("scroll", handleScroll, { passive: true }));
onUnmounted(() => window.removeEventListener("scroll", handleScroll));
</script>
