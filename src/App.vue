<template>
  <!-- Loading Screen -->
  <div
    v-if="!isLoaded"
    class="fixed inset-0 z-50 bg-surface flex items-center justify-center"
  >
    <div class="text-center font-mono">
      <div class="text-lg text-fg">
        <span class="text-primary-green">&lt;</span>hackersgoddest<span class="text-primary-green">/&gt;</span>
      </div>
      <div class="mt-2 text-sm text-fg-subtle">booting portfolio<span class="loading-dots"></span></div>
    </div>
  </div>

  <!-- Main Content -->
  <div
    v-show="isLoaded"
    :class="{ 'opacity-0': !isLoaded, 'opacity-100': isLoaded }"
    class="transition-opacity duration-500"
  >
    <MenuBar class="navbar w-full fixed top-0 z-40" @scroll-to-section="scrollToSection" />
    <BackToTop />
    <div id="Home" class="textured-surface flex w-full min-w-80 flex-col gap-20 bg-surface">
      <HomeSection @scroll-to-section="scrollToSection" ref="home" />
      <ServiceSection ref="services" />
      <SkillsSection ref="skills" />
      <PortfolioSection ref="portfolio" />
      <ContactSection ref="contact" />
      <Footer @scroll-to-section="scrollToSection" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type ComponentPublicInstance } from "vue";
import { useScrollAnimations } from "./composables/useScrollAnimations";
import MenuBar from "./components/MenuBar.vue";
import BackToTop from "./components/BackToTop.vue";
import HomeSection from "./components/sections/HomeSection.vue";
import LoadingSection from "./components/LoadingSection.vue";
// Lazy load non-critical sections for better performance
import { defineAsyncComponent } from 'vue';

type SectionKey = "home" | "services" | "skills" | "portfolio" | "contact";
type SectionRef = ComponentPublicInstance | null;

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

const home = ref<SectionRef>(null);
const services = ref<SectionRef>(null);
const skills = ref<SectionRef>(null);
const portfolio = ref<SectionRef>(null);
const contact = ref<SectionRef>(null);

const sectionRefs: Record<SectionKey, typeof home> = {
  home,
  services,
  skills,
  portfolio,
  contact,
};

const scrollToSection = (activeMenuKey: string) => {
  const targetElement = sectionRefs[activeMenuKey as SectionKey]?.value?.$el as HTMLElement | undefined;

  if (targetElement) {
    const elementPosition = targetElement.offsetTop;
    const offsetPosition = elementPosition - 80;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};
</script>
