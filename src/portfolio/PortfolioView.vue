<template>
    <PortfolioHeader id="portfolio" />
    <PortfolioContent class="portfolio-content" />
</template>

<script setup>
import PortfolioHeader from './PortfolioHeader.vue';
import PortfolioContent from './PortfolioContent.vue';
</script>

<style scoped>

@media only screen and (max-width: 500px) {
  .portfolio-content{
    padding-bottom: 50px;
  }
}


</style>