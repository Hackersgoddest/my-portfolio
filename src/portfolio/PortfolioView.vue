<template>
  <main>
    <PortfolioHeader id="Portfolio" ref="Portfolio" />
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
