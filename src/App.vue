<template>
  <MenuBar class="menu-bar"
    @scroll-to-section="scrollToSection" 
  />
  <div id="Home" class="w-full min-w-80">
    <HomeView @scroll-to-section="scrollToSection" ref="home" />
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
const home = ref(null);
const services = ref(null);
const skills = ref(null);
const portfolio = ref(null);
const contact = ref(null);

const scrollToSection = (activeMenuKey) => {
  if (activeMenuKey === "home")
    home.value.$el.scrollIntoView({ behavior: "smooth" });
  else if (activeMenuKey === "services")
    services.value.$el.scrollIntoView({ behavior: "smooth" });
  else if (activeMenuKey === "skills")
    skills.value.$el.scrollIntoView({ behavior: "smooth" });
  else if (activeMenuKey === "portfolio")
    portfolio.value.$el.scrollIntoView({ behavior: "smooth" });
  else if (activeMenuKey === "contact")
    contact.value.$el.scrollIntoView({ behavior: "smooth" });
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
