<template>
  <header
    :class="[
      'relative flex w-full justify-center transition-colors duration-300',
      isScrolled ? 'border-b border-border/20 dark:border-border/10 bg-surface/80 backdrop-blur-xl' : 'border-b border-transparent bg-transparent',
    ]"
  >
    <!-- Scroll progress -->
    <div class="absolute inset-x-0 top-0 h-px bg-fg/5">
      <div class="h-full bg-primary-green transition-[width] duration-150" :style="{ width: scrollProgress + '%' }" />
    </div>

    <div class="container mx-auto flex w-full max-w-7xl px-4 sm:px-6">
      <nav class="flex h-14 w-full items-center justify-between short-screen:h-11 sm:h-18">
        <button
          type="button"
          @click="navigate('home')"
          class="font-mono text-base font-medium text-fg sm:text-lg"
        >
          <span class="text-primary-green">&lt;</span>hackersgoddest<span class="text-primary-green">/&gt;</span>
        </button>

        <div class="flex items-center gap-2">
          <button
            type="button"
            @click="toggleTheme"
            :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
            class="flex h-8 w-8 items-center justify-center rounded-lg border border-border/20 dark:border-border/10 text-fg-subtle transition-colors duration-200 hover:border-border/20 hover:text-fg"
          >
            <Sun v-if="theme === 'dark'" :size="14" />
            <Moon v-else :size="14" />
          </button>

          <button
            type="button"
            @click="paletteOpen = true"
            class="flex items-center gap-2.5 rounded-lg border border-border/20 dark:border-border/10 px-3 py-1.5 font-mono text-sm text-fg-subtle transition-colors duration-200 hover:border-border/20 hover:text-fg"
          >
            <Search :size="14" />
            <span class="hidden xs:inline">{{ activeMenuLabel }}</span>
            <kbd class="hidden items-center gap-0.5 rounded border border-border/20 dark:border-border/10 px-1.5 py-0.5 text-[10px] text-fg-faint sm:flex">
              {{ modifierKey }}K
            </kbd>
          </button>
        </div>
      </nav>
    </div>

    <CommandPalette v-model:open="paletteOpen" @navigate="navigate" />
  </header>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { Search, Sun, Moon } from "@lucide/vue";
import CommandPalette from "./CommandPalette.vue";
import sections from "../data/navigation";
import { useActiveSection } from "../composables/useActiveSection";
import { useTheme } from "../composables/useTheme";

const emit = defineEmits<{ scrollToSection: [key: string] }>();

const sectionKeys = sections.map((s) => s.key);
const { activeKey, isScrolled, scrollProgress } = useActiveSection(sectionKeys);
const { theme, toggleTheme } = useTheme();

const paletteOpen = ref(false);

const activeMenuLabel = computed(
  () => sections.find((s) => s.key === activeKey.value)?.label ?? "Menu"
);

const modifierKey = computed(() =>
  typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform) ? "⌘" : "Ctrl+"
);

function navigate(key: string) {
  emit("scrollToSection", key);
}

function handleKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    paletteOpen.value = !paletteOpen.value;
  }
}

onMounted(() => window.addEventListener("keydown", handleKeydown));
onUnmounted(() => window.removeEventListener("keydown", handleKeydown));
</script>
