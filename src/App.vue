<template>
  <MenuBarOne class="menu-bar" />
  <div id="home" class="bg-gray-100">
    <HomeView />
    <ServiceView />
    <SkillsView />
    <PortfolioView />
    <ContactView />
    <Footer />
  </div>

</template>

<script setup>
import MenuBarOne from './MenuBarOne.vue';
import HomeView from './Home/HomeView.vue';
import ServiceView from './service/ServiceView.vue';
import SkillsView from './skills/SkillsView.vue';
import PortfolioView from './portfolio/PortfolioView.vue';
import ContactView from './contact/ContactView.vue';
import Footer from "./Footer.vue";


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
