<template>
  <MenuBar class="w-full fixed top-0 z-40" @scroll-to-section="scrollToSection" />
  <n-back-top
    :bottom="50"
    :theme-overrides="customBackTopTheme"
    :visibility-height="10"
    :style="{
      transition: 'all .3s cubic-bezier(.4, 0, .2, 1)',
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
</template>

<script setup>
import { ref } from "vue";
import { NSpace, NBackTop } from "naive-ui";
import MenuBar from "./components/MenuBar.vue";
import HomeSection from "./components/sections/HomeSection.vue";
import ServiceSection from "./components/sections/ServiceSection.vue";
import SkillsSection from "./components/sections/SkillsSection.vue";
import PortfolioSection from "./components/sections/PortfolioSection.vue";
import ContactSection from "./components/sections/ContactSection.vue";
import Footer from "./components/Footer.vue";

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
