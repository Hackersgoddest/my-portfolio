<template>
  <MenuBar class="menu-bar" />
  <div class="margin-from-menu" id="home">
    <HomeView />
    <ServiceView />
    <SkillsView />
    <PortfolioView />
    <BlogView />
  </div>

</template>

<script setup>
import MenuBar from './MenuBar.vue';
import HomeView from './Home/HomeView.vue';
import ServiceView from './service/ServiceView.vue';
import SkillsView from './skills/SkillsView.vue';
import PortfolioView from './portfolio/PortfolioView.vue';
import BlogView from './blog/BlogView.vue';

</script>
<style scoped>
.menu-bar {
  position: fixed;
  background-color: white;
  z-index: 20;
}

.margin-from-menu {
  padding-top: 60px;
}
</style>
