<template>
  <MenuBar class="menu-bar" />
  <div id="home">
    <HomeView />
    <ServiceView />
    <SkillsView />
    <PortfolioView />
    <ContactView />
    <Footer />
  </div>

</template>

<script setup>
import MenuBar from './MenuBar.vue';
import HomeView from './Home/HomeView.vue';
import ServiceView from './service/ServiceView.vue';
import SkillsView from './skills/SkillsView.vue';
import PortfolioView from './portfolio/PortfolioView.vue';
import ContactView from './contact/ContactView.vue';
import Footer from "./Footer.vue";


</script>
<style>
* {
  box-sizing: border-box;
}

.menu-bar {
  overflow: hidden;
  width: 100%;
  border-top: 0;
  position: fixed;
  top: 0;
  background-color: white;
  z-index: 40;
}



@media only screen and (max-width: 1025px) {
  .first-span, .second-span {
  display: none;
}
.avatar, .author {
  margin-left: 10px;
}

.menu {
  margin-right: 10px;
}

}


@media only screen and (max-width: 1281px) {
  .second-span {
  display: none;
}

}



</style>
