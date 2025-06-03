<template>
  <MenuBar class="menu-bar" @scroll-to-section="scrollToSection" />
  <n-back-top
    :bottom="50"
    :theme-overrides="darkTheme"
    :visibility-height="10"
    :style="{
      transition: 'all .3s cubic-bezier(.4, 0, .2, 1)',
    }"
  />
  <n-space vertical :size="80" id="Home" class="w-full min-w-80 bg-[#101014]">
    <HomeView @scroll-to-section="scrollToSection" ref="home" />
    <ServiceView ref="services" />
    <SkillsView ref="skills" />
    <PortfolioView ref="portfolio" />
    <ContactView ref="contact" />
    <Footer />
  </n-space>
</template>

<script setup>
import { ref } from "vue";
import { NSpace, NBackTop, darkTheme } from "naive-ui";
import MenuBar from "./views/MenuBar.vue";
import HomeView from "./views/Home/HomeView.vue";
import ServiceView from "./views/service/ServiceView.vue";
import SkillsView from "./views/skills/SkillsView.vue";
import PortfolioView from "./views/portfolio/PortfolioView.vue";
import ContactView from "./views/contact/ContactView.vue";
import Footer from "./views/Footer.vue";

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
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.menu-bar {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 40;
}
</style>
