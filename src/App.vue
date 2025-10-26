<template>
  <!-- Loading Screen -->
  <div 
    v-if="!isLoaded" 
    class="fixed inset-0 z-50 bg-[#101014] flex items-center justify-center"
  >
    <div class="text-center">
      <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-green mx-auto mb-4"></div>
      <div class="text-white text-lg font-medium">Loading Portfolio...</div>
      <div class="text-gray-400 text-sm mt-2">Initializing animations</div>
    </div>
  </div>

  <!-- Main Content -->
  <div 
    v-show="isLoaded"
    :class="{ 'opacity-0': !isLoaded, 'opacity-100': isLoaded }"
    class="transition-opacity duration-500"
  >
    <MenuBar class="navbar w-full fixed top-0 z-40" @scroll-to-section="scrollToSection" />
    <n-back-top
      :bottom="50"
      :theme-overrides="customBackTopTheme"
      :visibility-height="10"
      :style="{
        transition: 'all .3s cubic-bezier(.4, 0, .2, 1)',
        zIndex: '9999',
      }"
    />
    <n-space vertical :size="80" id="Home" class="w-full min-w-80 bg-[#101014]">
      <HomeSection @scroll-to-section="scrollToSection" ref="home" />
      <ServiceSection ref="services" />
      <SkillsSection ref="skills" />
      <PortfolioSection ref="portfolio" />
      <ContactSection ref="contact" />
      <Footer />
    </n-space>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { NSpace, NBackTop } from "naive-ui";
import { useScrollAnimations } from "./composables/useScrollAnimations";
import MenuBar from "./components/MenuBar.vue";
import HomeSection from "./components/sections/HomeSection.vue";
import LoadingSection from "./components/LoadingSection.vue";
// Lazy load non-critical sections for better performance
import { defineAsyncComponent } from 'vue';

const ServiceSection = defineAsyncComponent({
  loader: () => import("./components/sections/ServiceSection.vue"),
  loadingComponent: LoadingSection,
  delay: 200
});

const SkillsSection = defineAsyncComponent({
  loader: () => import("./components/sections/SkillsSection.vue"),
  loadingComponent: LoadingSection,
  delay: 200
});

const PortfolioSection = defineAsyncComponent({
  loader: () => import("./components/sections/PortfolioSection.vue"),
  loadingComponent: LoadingSection,
  delay: 200
});

const ContactSection = defineAsyncComponent({
  loader: () => import("./components/sections/ContactSection.vue"),
  loadingComponent: LoadingSection,
  delay: 200
});

const Footer = defineAsyncComponent({
  loader: () => import("./components/Footer.vue"),
  loadingComponent: LoadingSection,
  delay: 200
});

// Initialize scroll animations
const { isLoaded } = useScrollAnimations();

const customBackTopTheme = {
  iconColor: '#ffffff', // Default icon color
  iconColorHover: '#18A058', // Icon color on hover
  iconColorPressed: '#18A058', // Icon color when pressed
  color: 'rgba(16, 16, 20, 0.8)', // Background color
  colorHover: 'rgba(24, 160, 88, 0.2)', // Background color on hover
  colorPressed: 'rgba(24, 160, 88, 0.3)', // Background color when pressed
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)', // Shadow
  boxShadowHover: '0 4px 16px rgba(24, 160, 88, 0.3)', // Shadow on hover
  borderRadius: '50%', // Border radius
};

let openMenu = ref(false);
const home = ref(null);
const services = ref(null);
const skills = ref(null);
const portfolio = ref(null);
const contact = ref(null);

const scrollToSection = (activeMenuKey) => {
  let targetElement = null;

  if (activeMenuKey === "home") targetElement = home.value.$el;
  else if (activeMenuKey === "services") targetElement = services.value.$el;
  else if (activeMenuKey === "skills") targetElement = skills.value.$el;
  else if (activeMenuKey === "portfolio") targetElement = portfolio.value.$el;
  else if (activeMenuKey === "contact") targetElement = contact.value.$el;

  if (targetElement) {
    const elementPosition = targetElement.offsetTop;
    const offsetPosition = elementPosition - 80;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }

  openMenu.value = false;
};
</script>
