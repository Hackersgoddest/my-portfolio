<template>
  <div class="bg-[#101014] flex justify-center fixed">
    <div class="container flex w-full max-w-screen-xl px-5">
      <nav class="flex w-full justify-between h-16 items-center">
        <div class="flex items-center flex-1">
          <n-gradient-text
            gradient="linear-gradient(90deg, white 0%, gray 50%, green 100%)"
            class="font-medium text-lg lg:text-xl"
          >
            Frank Oppong Konadu
          </n-gradient-text>
        </div>
        <!-- For Desktop and Tablet -->
        <div class="hidden md:flex justify-end items-center">
          <n-menu
            v-model:value="activeMenuKey"
            mode="horizontal"
            :options="mdMenuOptions"
            responsive
            :theme-overrides="customMenuTheme"
            :on-update:value="(key, item) => updateActiveMenuKey(key)"
          />
        </div>
        <!-- For Mobile -->
        <n-button
          strong
          secondary
          circle
          color="#a3a3a3"
          @click="openMenu = !openMenu"
          class="outline-none md:hidden"
        >
          <template #icon>
            <n-icon size="24" :component="MenuSharp" />
          </template>
        </n-button>
        <n-drawer
          v-model:show="openMenu"
          :width="'100%'"
          class="md:hidden bg-[#101014]"
          :theme-overrides="darkTheme"
        >
          <n-drawer-content title="Menu" closable header-class="bg-[#101014]">
            <n-menu
              v-model:value="activeMenuKey"
              mode="vertical"
              :options="menuOptions"
              responsive
              :theme-overrides="customMenuTheme"
              :on-update:value="(key) => updateActiveMenuKey(key)"
            />
          </n-drawer-content>
        </n-drawer>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { darkTheme } from "naive-ui";
import { onMounted, onUnmounted, ref, h } from "vue";
import {
  NGradientText,
  NButton,
  NIcon,
  NMenu,
  NDrawer,
  NDrawerContent,
} from "naive-ui";
import {
  MenuSharp,
  HomeOutline,
  FolderOutline,
  LinkOutline,
  BriefcaseOutline,
  CodeOutline,
} from "@vicons/ionicons5";

const customMenuTheme = {
  itemTextColor: '#ffffff', // Default text color
  itemTextColorHover: '#18A058', // Text color on hover
  itemTextColorActive: '#18A058', // Active item text color
  itemColorHover: 'rgba(24, 160, 88, 0.1)', // Background color on hover
  itemColorActive: 'rgba(24, 160, 88, 0.2)', // Active item background color
  itemIconColor: '#a3a3a3', // Default icon color
  itemIconColorHover: '#18A058', // Icon color on hover
  itemIconColorActive: '#18A058', // Active icon color
  dividerColor: '#2d2d2d', // Divider color (for vertical menu)
  arrowColor: '#a3a3a3', // Arrow color for submenus
  arrowColorHover: '#18A058', // Arrow color on hover
}


const emit = defineEmits(["scrollToSection"]);

const activeMenuKey = ref("home");
const openMenu = ref(false);

function updateActiveMenuKey(key) {
  activeMenuKey.value = key;
  openMenu.value = false;
  emit("scrollToSection", key);
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
    icon: renderIcon(CodeOutline),
  },
  {
    label: "Portfolio",
    key: "portfolio",
    icon: renderIcon(FolderOutline),
  },
  {
    label: "Contact",
    key: "contact",
    icon: renderIcon(LinkOutline),
  },
];

const mdMenuOptions = menuOptions.map((option) => ({
  label: option.label,
  key: option.key,
}));

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
