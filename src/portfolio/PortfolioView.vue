<template>
  <main>
    <PortfolioHeader id="portfolio" />
    <PortfolioContent />
  </main>
</template>
<script setup>
import PortfolioHeader from "./PortfolioHeader.vue";
import PortfolioContent from "./PortfolioContent.vue";
</script>
<style scoped>
main {
    background-color: #101014;
}
</style>
