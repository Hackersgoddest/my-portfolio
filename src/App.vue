<template>
  <MenuBarOne
    class="menu-bar"
    :open-menu="openMenu"
    :active-section-index="activeSectionIndex"
    @scroll-to-section="scrollToSection"
    @toggle-menu="toggleMenu"
    @updateActiveSectionIndex="updateActiveSectionIndex"
  />
  <div id="Home" class="bg-gray-100" ref="Home">
    <HomeView />
    <ServiceView />
    <SkillsView />
    <PortfolioView />
    <ContactView />
    <Footer />
  </div>
</template>

<script setup>
import { ref } from "vue";
import MenuBarOne from "./MenuBarOne.vue";
import HomeView from "./Home/HomeView.vue";
import ServiceView from "./service/ServiceView.vue";
import SkillsView from "./skills/SkillsView.vue";
import PortfolioView from "./portfolio/PortfolioView.vue";
import ContactView from "./contact/ContactView.vue";
import Footer from "./Footer.vue";

let openMenu = ref(false);
let activeSectionIndex = ref(0);

const sections = {
  Home: ref(null),
  Services: ref(null),
  Skills: ref(null),
  Portfolio: ref(null),
  Contact: ref(null),
};

const toggleMenu = (value) => {
  openMenu.value = value;
};

const scrollToSection = (sectionName, index) => {
  const sectionRef = sections[sectionName];
  if (sectionRef && sectionRef.value) {
    sectionRef.value.scrollIntoView({ behavior: "smooth" });
  }
  openMenu.value = false;
  activeSectionIndex.value = index;
};

const updateActiveSectionIndex = (index) => {
  activeSectionIndex.value = index;
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
  background-color: white;
  z-index: 40;
}
</style>
