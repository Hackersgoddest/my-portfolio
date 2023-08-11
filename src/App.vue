<template>
  <MenuBar
    class="menu-bar"
    :open-menu="openMenu"
    :active-section-index="activeSectionIndex"
    @scroll-to-section="scrollToSection"
    @toggle-menu="toggleMenu"
    @updateActiveSectionIndex="updateActiveSectionIndex"
  />
  <div id="Home" class="bg-gray-100">
    <HomeView ref="home" />
    <ServiceView ref="services" />
    <SkillsView ref="skills" />
    <PortfolioView ref="portfolio" />
    <ContactView ref="contact" />
    <Footer />
  </div>
</template>

<script setup>
import { ref } from "vue";
import MenuBar from "./views/MenuBar.vue";
import HomeView from "./views/Home/HomeView.vue";
import ServiceView from "./views/service/ServiceView.vue";
import SkillsView from "./views/skills/SkillsView.vue";
import PortfolioView from "./views/portfolio/PortfolioView.vue";
import ContactView from "./views/contact/ContactView.vue";
import Footer from "./views/Footer.vue";

let openMenu = ref(false);
let activeSectionIndex = ref(0);

const home = ref(null);
const services = ref(null);
const skills = ref(null);
const portfolio = ref(null);
const contact = ref(null);

const toggleMenu = (value) => {
  openMenu.value = value;
};

const scrollToSection = (sectionName, index) => {
  if(sectionName === 'Home') home.value.$el.scrollIntoView({ behavior: "smooth" });
  else if(sectionName === 'Services') services.value.$el.scrollIntoView({ behavior: "smooth" });
  else if(sectionName === 'Skills') skills.value.$el.scrollIntoView({ behavior: "smooth" });
  else if (sectionName === "Portfolio") portfolio.value.$el.scrollIntoView({ behavior: "smooth" });
  else if(sectionName === 'Contact') contact.value.$el.scrollIntoView({ behavior: "smooth" });
  console.log(contact.value.$el)
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
