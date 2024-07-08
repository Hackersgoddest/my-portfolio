<template>
  <div class="bg-[#101014] flex justify-center fixed">
    <div class="container flex w-full max-w-screen-xl px-5">
      <nav class="flex w-full justify-between h-16 items-center">
        <div class="flex items-center flex-1">
          <n-gradient-text gradient="linear-gradient(90deg, white 0%, gray 50%, green 100%)"
            class="font-medium text-lg lg:text-xl">
            Frank Oppong Konadu
          </n-gradient-text>
        </div>
        <!-- For Desktop -->
        <div class="justify-end items-center hidden lg:flex">
          <n-menu v-model:value="activeMenuKey" mode="horizontal" :options="menuOptions" responsive
            :theme-overrides="darkTheme" :on-update:value="(key, item) => updateActiveMenuKey(key)" />
        </div>
        <!-- For Tablet -->
        <div class="justify-end items-center hidden md:flex lg:hidden">
          <n-menu v-model:value="activeMenuKey" mode="horizontal" :options="mdMenuOptions" responsive
            :theme-overrides="darkTheme" :on-update:value="(key, item) => updateActiveMenuKey(key)" />
        </div>
        <!-- For Mobile -->
        <div :class="[openMenu ? 'translate-x-0' : 'translate-x-[-100%]']"
          class="block absolute left-0 top-16 bg-[#101014] w-full transition-transform md:hidden">
          <n-menu v-model:value="activeMenuKey" mode="vertical" :options="menuOptions" responsive
            :theme-overrides="darkTheme" :on-update:value="(key, item) => updateActiveMenuKey(key)" />
        </div>
      </nav>
    </div>
    <n-button strong secondary circle color="#a3a3a3" @click="openMenu = !openMenu"
      class="absolute top-2.5 right-2 outline-none md:hidden">
      <template #icon class="z-10">
        <n-icon v-if="!openMenu" size="24" :component="MenuSharp" />
        <n-icon v-else size="24" :component="Close" />
      </template>
    </n-button>
  </div>
</template>

<script setup>
import { darkTheme } from 'naive-ui'
import { onMounted, onUnmounted, ref, h } from "vue";
import { NGradientText, NButton, NIcon, NMenu } from "naive-ui";
import { Close, MenuSharp, HomeOutline, FolderOutline, LinkOutline, BriefcaseOutline, CodeOutline } from "@vicons/ionicons5";

const emit = defineEmits(["scrollToSection"]);

const activeMenuKey = ref("home");
const openMenu = ref(false);

function updateActiveMenuKey(key) {
  activeMenuKey.value = key;
  openMenu.value = false;
  emit('scrollToSection', key)
}

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions = [
  {
    label: "Home",
    key: "home",
    icon: renderIcon(HomeOutline),
  },
  {
    label: "Services",
    key: "services",
    icon: renderIcon(BriefcaseOutline),
  },
  {
    label: "Skills",
    key: "skills",
    icon: renderIcon(CodeOutline)
  },
  {
    label: "Portfolio",
    key: "portfolio",
    icon: renderIcon(FolderOutline)
  },
  {
    label: "Contact",
    key: "contact",
    icon: renderIcon(LinkOutline)
  },
];

const mdMenuOptions = menuOptions.map((option) => ({
  label: option.label,
  key: option.key,
}))

const handleScroll = () => {
  const sectionRefs = menuOptions.map((_, index) =>
    document.getElementById(menuOptions[index].label)
  );
  for (let i = sectionRefs.length - 1; i >= -1; i--) {
    const section = sectionRefs[i];
    if (section) {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.5) {
        activeMenuKey.value = menuOptions[i].key;
        break;
      }
    }
  }
};


onMounted(() => {
  handleScroll();
  window.addEventListener("wheel", handleScroll, { passive: true });
  window.addEventListener("touchmove", handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("touchmove", handleScroll);
});
</script>

<style scoped></style>
