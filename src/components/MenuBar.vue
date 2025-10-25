<template>
  <div 
    :class="[
      'glass-card backdrop-blur-md flex justify-center fixed w-full z-50 transition-all duration-300',
      isScrolled ? 'shadow-lg' : ''
    ]"
    style="top: 0; position: fixed;"
  >
    <div class="container flex w-full max-w-screen-xl px-5">
      <nav class="flex w-full justify-between h-16 items-center">
        <div class="flex items-center flex-1">
          <n-text
            class="text-white text-lg lg:text-xl magnetic-hover cursor-pointer"
          >
            Frank Oppong Konadu
          </n-text>
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
            <n-icon class="text-[#a3a3a3] hover:text-[#18A058] hover:transition-colors hover:duration-700 hover:ease-in-out" size="24" :component="MenuSharp" />
          </template>
        </n-button>
        <n-drawer
          v-model:show="openMenu"
          :width="'100%'"
          class="md:hidden"
          :theme-overrides="customDrawerTheme"
        >
          <n-drawer-content title="Menu" closable :header-style="{ borderBottomColor: '#2d2d2d' }">
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
import { onMounted, onUnmounted, ref, h } from "vue";
import {
  NText,
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

const customDrawerTheme = {
  color: '#101014', // Drawer background color
  headerColor: '#101014', // Header background color
  footerColor: '#101014', // Footer background color
  bodyColor: '#101014', // Body background color
  titleTextColor: '#ffffff', // Title text color
  closeIconColor: '#ffffff', // Close icon color
  closeIconColorHover: '#18A058', // Close icon color on hover
  closeIconColorPressed: '#18A058', // Close icon color when pressed
  resizableTriggerColor: '#2d2d2d', // Resizable trigger color
};


const emit = defineEmits(["scrollToSection"]);

const activeMenuKey = ref("home");
const openMenu = ref(false);
const isScrolled = ref(false);

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
  // Update navbar scroll state
  isScrolled.value = window.scrollY > 50;
  
  // Update active menu based on section visibility using scroll position
  const scrollPosition = window.scrollY + 150; // Add offset for navbar height
  
  // Get all sections
  const allSections = document.querySelectorAll('section');
  
  let currentSection = 'home'; // Default to home
  
  allSections.forEach((section, index) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionBottom = sectionTop + sectionHeight;
    
    // Map sections to menu keys based on their order
    const sectionKeys = ['home', 'services', 'skills', 'portfolio', 'contact'];
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      if (sectionKeys[index]) {
        currentSection = sectionKeys[index];
      }
    }
  });
  
  // Update active menu key if it changed
  if (activeMenuKey.value !== currentSection) {
    activeMenuKey.value = currentSection;
  }
};

onMounted(() => {
  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("touchmove", handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("touchmove", handleScroll);
});
</script>
